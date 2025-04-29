import React from 'react'
import { Button } from '../../../components/ui/button'
import { calculateTotal } from '@/lib/utils'
import { useCheckout } from '@/hooks/use-checkout'
import { CartProduct } from '@/lib/types'

function Checkout({ products }: { products: CartProduct[] }) {
    const { isPending, handleCheckout } = useCheckout()

    return (
        <div className='mt-7 md:mt-0 border border-gray-400 h-auto p-3 rounded-lg'>
            <div className='flex items-center justify-between my-5'>
                <p>Grand total</p>
                <span className='font-bold'>${calculateTotal(products)}</span>
            </div>
            <Button
                onClick={() => handleCheckout(products)}
                disabled={isPending}
                className='w-full py-6'
            >
                {isPending ? 'Processing...' : 'Checkout now'}
            </Button>
        </div>
    )
}

export default Checkout
