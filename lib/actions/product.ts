'use server'

import prisma from '@/services/db/db'
import { cache } from 'react'
import Stripe from 'stripe'

export const getAllProducts = cache(async () => {
    try {
        const products = await prisma.product.findMany()
        return products
    } catch (error: any) {
        console.error(error.message)
        throw new Error(error.message)
    }
})

export const getNewArrivals = cache(async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 6,
        })
        return products
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
})

export const getSomeProducts = cache(async (take: number) => {
    try {
        const products = await prisma.product.findMany({
            take: take,
        })
        return products
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
})

export const updateProductsStockAfterSuccessfulPayment = async(
    lineItems: Stripe.Response<Stripe.ApiList<Stripe.LineItem>>
) => {
    try {
        for (let i = 0; i < lineItems.data.length; i++) {
            const item = lineItems.data[i]
            const productId = item.price?.id
            await prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    stock: {
                        decrement: item.quantity!,
                    },
                },
            })
        }
    } catch (error) {
        console.error(error)
        throw 'Something went wrong while updating products in DB'
    }
}
