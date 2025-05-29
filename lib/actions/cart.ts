'use server'

import prisma from '@/services/db/db'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { CartProduct } from '../types'
import {
  deleteCart,
  deleteProductFromCart,
  deleteProductsFromCart,
  getCartItems,
} from '../prisma'
import { handleServerActionError } from '../utils'

export const addProductToCart = ({
  productId,
  unitPrice,
  quantity,
}: {
  productId: string
  unitPrice: number
  quantity: number
}) =>
  handleServerActionError(async () => {
    const { userId } = await auth()

    const cartId = await getOrCreateCartId()

    const isStockExceeded = await validateStock(productId, cartId, quantity)

    if (isStockExceeded)
      throw new Error('Requested quantity exceeds available stock.')

    if (userId) {
      const clientCartId = await getUserCart(userId)
      if (!clientCartId) {
        await prisma.cart.update({
          where: { id: cartId },
          data: { userId },
        })
      }
    }

    await prisma.cartProduct.upsert({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId,
        cartId,
        quantity,
        unitPrice,
      },
    })

    return { type: 'success', message: 'Product has been added successfully' }
  })

export const removeProductFromCart = (productId: string) =>
  handleServerActionError(async () => {
    const cartId = cookies().get('cartId')!.value
    await deleteProductFromCart(cartId, productId)
  })

export const getProductsInCart = async () => {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) return null

  const items = await getCartItems(cartId)

  return items
}

export const getUserCart = async (userId: string) => {
  const cartId = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  })
  return cartId?.id
}

export const getUserCartId = async () => {
  const guestCartId = cookies().get('cartId')?.value
  const { userId } = await auth()

  if (!userId) throw Error('Unauthorized')

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cart: { include: { products: true } } },
    })

    const userCart = user?.cart

    //CHECK WITHER USER HAS ITS OWN CART
    if (!guestCartId) return userCart?.id ?? null

    //CONVERT GUEST CART TO USER CART
    if (!userCart) {
      const { id } = await prisma.cart.update({
        where: { id: guestCartId },
        data: { userId },
      })
      return id
    }

    //MERGE BOTH CARTS
    //CHCECK USER'S CART IF IT IS EMPTY THEN MOVE THOSE ITEMS TO USER CART
    if (userCart.products.length === 0) {
      await prisma.cartProduct.updateMany({
        where: {
          cartId: guestCartId,
        },
        data: {
          cartId: userCart.id,
        },
      })

      await deleteCart(guestCartId)

      return userCart.id
    }

    await mergeGuestCartAndLoggedInUserCart(userCart.id, guestCartId)

    return userCart.id
  } catch (err) {
    console.error(err)
    return { error: (err as Error).message }
  }
}

export const incrementQuantity = (productId: string, cartId: string) =>
  handleServerActionError(async () => {
    await prisma.cartProduct.update({
      where: {
        cartId_productId: {
          productId,
          cartId,
        },
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })
  })

export const decrementQuantity = (
  productId: string,
  cartId: string,
  quantity: number
) =>
  handleServerActionError(async () => {
    if (quantity === 1) {
      await deleteProductFromCart(cartId, productId)
    } else {
      await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            productId,
            cartId,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      })
    }
  })

export const clearCart = async (cartId: string) => {
  await deleteProductsFromCart(cartId)
}

//HELPER FUNCTIONS -----------------
const getOrCreateCartId = async () => {
  try {
    const cartId = cookies().get('cartId')?.value

    if (!cartId) {
      const cart = await prisma.cart.create({
        data: {
          userId: null,
        },
      })

      cookies().set('cartId', cart.id)

      return cart.id
    }
    return cartId
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong while creating cartId')
  }
}

export const mergeGuestCartAndLoggedInUserCart = async (
  userCartId: string,
  guestCartId: string
) => {
  const [guestCartItems, userCartItems] = await Promise.all([
    getCartItems(guestCartId),
    getCartItems(userCartId),
  ])

  const userProducts: Record<string, CartProduct> = {}

  userCartItems?.products.forEach((product) => {
    userProducts[product.productId] = product
  })

  for (let i = 0; i < guestCartItems!.products.length; i++) {
    const product = guestCartItems!.products[i]
    const productExistInUserCart = userProducts[product.productId]

    if (productExistInUserCart) {
      await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: userCartId,
            productId: productExistInUserCart.productId,
          },
        },
        data: {
          quantity:
            productExistInUserCart.product.stock <
            product.quantity + productExistInUserCart.quantity
              ? productExistInUserCart.product.stock
              : { increment: product.quantity },
        },
      })
    } else {
      await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: guestCartId,
            productId: product.productId,
          },
        },
        data: {
          unitPrice: product.unitPrice,
          productId: product.productId,
          quantity: product.quantity,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          cartId: userCartId,
        },
      })
    }
  }

  //Delete guest cart along with the products inside it
  await deleteProductsFromCart(guestCartId)
  await deleteCart(guestCartId)
}

const validateStock = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  const productExistInCart = await prisma.cartProduct.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  })

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!productExistInCart) {
    if (product && product.stock >= quantity) {
      return false
    }

    return true
  } else {
    if (product && productExistInCart.quantity + quantity <= product.stock) {
      return false
    }

    return true
  }
}
