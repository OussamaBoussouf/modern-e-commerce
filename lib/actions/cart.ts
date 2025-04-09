'use server'

import prisma from '@/services/db/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { CartProduct } from '../types'
import {
    deleteCart,
    deleteProductFromCart,
    deleteProductsFromCart,
    getCartItems,
} from '../prisma'

export const addProductToCart = async (product: {
    productId: string
    unitPrice: number
    quantity: number
}) => {
    try {
        const { productId, unitPrice, quantity } = product

        const client = await clerkClient()

        const { userId } = await auth()

        const cartId = await getOrCreateCartId()

        const exceededStockLimit = await isGreaterThanStockLimit(
            productId,
            cartId,
            quantity
        )

        if (exceededStockLimit)
            throw new Error("You can't exceed the stock limit of this product")

        if (userId) {
            const user = await client.users.getUser(userId)
            const clientCartId = user.publicMetadata.cartId

            if (!clientCartId) {
                Promise.all([
                    await client.users.updateUserMetadata(userId, {
                        publicMetadata: {
                            cartId: cartId,
                        },
                    }),
                    await linkCartToUser(userId, cartId),
                ])
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

        return { message: 'Product has been added successfully' }
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const removeProductFromCart = async (productId: string) => {
    try {
        const cartId = cookies().get('cartId')!.value

        await deleteProductFromCart(cartId, productId)

        return { message: 'success' }
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const getProductsInCart = async () => {
    try {
        const cartId = cookies().get('cartId')?.value

        if (!cartId) return null

        return await getCartItems(cartId)
    } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}

export const linkCartToUser = async (userId: string, cartId: string) => {
    try {
        const client = await clerkClient()
        Promise.all([
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    cartId,
                },
            }),
            await prisma.cart.update({
                where: {
                    id: cartId,
                },
                data: {
                    userId,
                },
            }),
        ])
    } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}

export const mergeGuestCartWithLoggedInUserCart = async (
    userCartId: string,
    guestCartId: string
) => {
    const [itemsInGuestCart, itemsInLoggedInUserCart] = await Promise.all([
        await getCartItems(guestCartId),
        await getCartItems(userCartId),
    ])

    const productsId: Record<string, CartProduct> = {}

    itemsInLoggedInUserCart!.products.forEach((product) => {
        productsId[product.productId] = product
    })

    for (let i = 0; i < itemsInGuestCart!.products.length; i++) {
        const product = itemsInGuestCart!.products[i]
        const productExistInUserCart = productsId[product.productId]

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

export const incrementQuantity = async (productId: string, cartId: string) => {
    try {
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
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const decrementQuantity = async (
    productId: string,
    cartId: string,
    quantity: number
) => {
    try {
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
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const clearCart = async (cartId: string) => {
    try {
        await deleteProductsFromCart(cartId)
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

//HELPER FUNCTIONS -----------------
const getOrCreateCartId = async () => {
    try {
        let cartId = cookies().get('cartId')?.value

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
        throw new Error('Something went wrong while creating cartId')
    }
}

const isGreaterThanStockLimit = async (
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
        if (
            product &&
            productExistInCart.quantity + quantity <= product.stock
        ) {
            return false
        }

        return true
    }
}
