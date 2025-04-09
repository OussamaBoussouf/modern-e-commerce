'use client'

import { Button } from '../ui/button'
import { useCheckout } from '@/hooks/use-checkout'

type BuyProductButtonProps = {
    id: string
    name: string
    price: number
    image: string
    stock: number
}

function BuyProductButton({
    id,
    name,
    price,
    image,
    stock,
}: BuyProductButtonProps) {
    const product = {
        quantity: 1,
        unitPrice: price,
        name,
        id,
        image,
        stock,
    }

    const { isPending, handleCheckout } = useCheckout()

    return (
        <Button
            className='flex-grow h-full'
            disabled={isPending}
            onClick={() => handleCheckout(product)}
        >
            {isPending ? 'Processing...' : 'Buy Now'}
        </Button>
    )
}

export default BuyProductButton
