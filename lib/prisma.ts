'use server'

import prisma from '@/services/db/db'

//----------------Cart--------------------
export const getCartItems = async (cartId: string) => {
    try {
        return await prisma.cart.findUnique({
            where: {
                id: cartId,
            },
            include: {
                products: {
                    orderBy: {
                        productId: 'desc',
                    },
                    include: {
                        product: {
                            select: {
                                stock: true,
                                image: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        })
    } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message)
    }
}

export const deleteProductsFromCart = async (cartId: string) => {
    await prisma.cartProduct.deleteMany({
        where: {
            cartId: cartId,
        },
    })
}

export const deleteProductFromCart = async (
    cartId: string,
    productId: string
) => {
    await prisma.cartProduct.delete({
        where: {
            cartId_productId: {
                cartId: cartId,
                productId: productId,
            },
        },
    })
}

export const deleteCart = async (cartId: string) => {
    await prisma.cart.delete({
        where: {
            id: cartId,
        },
    })
}
