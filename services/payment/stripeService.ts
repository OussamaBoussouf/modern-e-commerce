import { CartProduct, SingleProduct } from '@/lib/types'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const createStripeCheckoutSession = async (
    purchasedProducts: SingleProduct | CartProduct[]
) => {
    try {
        return await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: Array.isArray(purchasedProducts)
                ? purchasedProducts.map((product) => ({
                      price: product.productId,
                      quantity: product.quantity,
                  }))
                : [
                      {
                          price: purchasedProducts.id,
                          quantity: purchasedProducts.quantity,
                      },
                  ],
            success_url: `${process.env.HOST_NAME}/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.HOST_NAME}/`,
        })
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

const handleSuccessfulStripePayment = async (paymentIntent: any) => {
    try {
        const checkoutSessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent,
        })

        if (!checkoutSessions.data.length) {
            throw new Error(
                'No checkout session found for this payment intent',
                paymentIntent.id
            )
        }

        const sessionId = checkoutSessions.data[0]
        return await stripe.checkout.sessions.listLineItems(sessionId.id)
    } catch (error) {
        console.error(error)
        throw new Error('Error occured while processing items')
    }
}

export { stripe, createStripeCheckoutSession, handleSuccessfulStripePayment }
