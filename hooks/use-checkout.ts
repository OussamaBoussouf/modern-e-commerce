import { useState } from 'react'
import { toast } from './use-toast'
import { CartProduct, SingleProduct } from '@/lib/types'
import { useAuth } from '@clerk/nextjs'

export const useCheckout = () => {
    const [isPending, setIsPending] = useState(false)
    const { isSignedIn } = useAuth()

    const handleCheckout = async (products: SingleProduct | CartProduct[]) => {
        setIsPending(true)
        try {
            if (!isSignedIn)
                throw new Error('You must be logged in to perofrom this action')

            //Check if the user picked one product and it is still in stock
            if (!Array.isArray(products) && products.stock === 0)
                throw new Error('This product is out of stock.')

            //Check the stock of all the selected products is available
            if (Array.isArray(products)) {
                products.forEach((product) => {
                    const productInfo = product.product
                    if (productInfo.stock === 0) {
                        throw new Error(
                            `The product : "${productInfo.name}" is out of stock remove it from cart so you can preform checkout`
                        )
                    }
                })
            }

            const res = await fetch(
                `${process.env.HOST_NAME}/api/create-checkout-session`,
                {
                    method: 'POST',
                    body: JSON.stringify(products),
                }
            )

            const { url } = await res.json()
            window.location.href = url
        } catch (error: any) {
            console.error(error)

            setIsPending(false)

            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            })
        }
    }

    return { isPending, handleCheckout }
}
