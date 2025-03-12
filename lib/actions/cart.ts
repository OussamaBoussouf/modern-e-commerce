'use server'

import prisma from '@/services/db/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { CartProduct } from '../types'

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

        await prisma.cartProduct.delete({
            where: {
                cartId_productId: {
                    productId,
                    cartId,
                },
            },
        })

        return { message: 'success' }
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const getProductsInCart = async () => {
    try {
        const { userId } = await auth()

        const cartId = cookies().get('cartId')?.value

        if (!cartId) return null

        if (userId) {
            const cart = await prisma.cart.findUnique({
                where: {
                    id: cartId,
                    userId,
                },
                include: {
                    products: {
                        include: {
                            product: true,
                        },
                    },
                },
            })
            return cart
        } else {
            const cart = await prisma.cart.findUnique({
                where: {
                    id: cartId,
                },
                include: {
                    products: {
                        include: {
                            product: true,
                        },
                    },
                },
            })

            return cart
        }
    } catch (error: any) {
        console.error(error)
        return error
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

export const mergeTwoCarts = async (
    userCartId: string,
    guestCartId: string
) => {
    const anonymousUserItemsInCart = await prisma.cart.findUnique({
        where: {
            id: guestCartId,
        },
        include: {
            products: true,
        },
    })

    const connectedUserItemsInCart = await prisma.cart.findUnique({
        where: {
            id: userCartId,
        },
        include: {
            products: true,
        },
    })

    const productsId: Record<string, CartProduct> = {}

    connectedUserItemsInCart?.products.forEach((product) => {
        productsId[product.productId] = product
    })

    anonymousUserItemsInCart?.products.forEach(
        async (productInAnonymousCart) => {
            const productExistInCart =
                productsId[productInAnonymousCart.productId]

            if (productExistInCart) {
                const targetedProduct = await prisma.product.findUnique({
                    where: {
                        id: productInAnonymousCart.productId,
                    },
                })

                const stockLimitExceeded =
                    productExistInCart.quantity +
                        productInAnonymousCart.quantity >
                    targetedProduct!.stock

                await prisma.cartProduct.update({
                    where: {
                        cartId_productId: {
                            cartId: userCartId,
                            productId: productInAnonymousCart.productId,
                        },
                    },
                    data: {
                        quantity: stockLimitExceeded
                            ? targetedProduct!.stock
                            : {
                                  increment: productInAnonymousCart.quantity,
                              },
                    },
                })
            } else {
                await prisma.cartProduct.create({
                    data: {
                        ...productInAnonymousCart,
                        cartId: userCartId,
                    },
                })
            }
        }
    )

    //
    const deleteProductsFromGuestCart = prisma.cartProduct.deleteMany({
        where: {
            cartId: guestCartId,
        },
    })
    const deleteGuestCart = prisma.cart.delete({
        where: {
            id: guestCartId,
        },
    })
    await prisma.$transaction([deleteProductsFromGuestCart, deleteGuestCart])
}

export const manageCartQuantity = async ({
    operation,
    productId,
}: {
    operation: string
    productId: string
}) => {
    try {
        const cartId = cookies().get('cartId')!.value

        const product = await prisma.cartProduct.findUnique({
            where: {
                cartId_productId: {
                    productId,
                    cartId,
                },
            },
        })

        if (operation === 'increment') {
            //INCREMENT PRODUCT QUANTITY IN CART ----------------
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
        } else {
            //REMOVE PRODUCT FROM CART WHEN IT REACHS ONE --------------
            if (product?.quantity === 1) {
                await prisma.cartProduct.delete({
                    where: {
                        cartId_productId: {
                            productId,
                            cartId,
                        },
                    },
                })

                return
            }
            //DECREMENT PRODUCT QUANTITY IN CART ----------------
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
