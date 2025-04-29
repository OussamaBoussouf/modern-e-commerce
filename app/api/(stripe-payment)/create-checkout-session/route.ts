import { CartProduct, SingleProduct } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { createStripeCheckoutSession } from '@/services/payment/stripeService'

export async function POST(req: NextRequest) {
    try {
        const purchasedProducts: SingleProduct | CartProduct[] =
            await req.json()

        const session = await createStripeCheckoutSession(purchasedProducts)

        return NextResponse.json({ url: session.url })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message)
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}
