import { NextRequest, NextResponse } from 'next/server'
import {
    handleSuccessfulStripePayment,
    stripe,
} from '@/services/payment/stripeService'
import { updateProductsStockAfterSuccessfulPayment } from '@/lib/actions/product'

const endpointSecret = process.env.WEBHOOK_SECRET_KEY as string

export async function POST(req: NextRequest) {
    // Get the signature sent by Stripe
    const signature = req.headers.get('stripe-signature')!

    if (!signature) {
        return NextResponse.json(
            { message: 'Missing stripe-signature header' },
            { status: 400 }
        )
    }

    //Read raw body as a buffer
    const body = await req.text()

    let event

    //Check if the request is issued from stripe
    if (endpointSecret) {
        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                endpointSecret
            )
        } catch (err: any) {
            console.log(
                `⚠️  Webhook signature verification failed.`,
                err.message
            )
            return NextResponse.json({ message: err.message }, { status: 400 })
        }
    }

    switch (event?.type) {
        case 'payment_intent.succeeded':
            const paymentIntentId = event.object.id
            try {
                const lineItems = await handleSuccessfulStripePayment(
                    paymentIntentId
                )
                await updateProductsStockAfterSuccessfulPayment(lineItems)
            } catch (error: any) {
                return NextResponse.json(
                    { message: error.message },
                    { status: 500 }
                )
            }
            break
        default:
            console.log(`Unhandled event type ${event?.type}.`)
    }

    return NextResponse.json(
        { message: 'Event has been handled successfully' },
        { status: 200 }
    )
}
