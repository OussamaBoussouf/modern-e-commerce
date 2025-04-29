'use client'

import { useCart } from '@/hooks/cart'
import EmptyCart from './empty-cart'
import CartItems from './cart-items'
import Checkout from './checkout'

function CartContainer() {
    const { data } = useCart()

    if (!data || data.products.length === 0) {
        return <EmptyCart />
    }

    return (
        <section className='container mx-auto py-10 px-3'>
            <div className='flex flex-col md:flex-row gap-10'>
                <div className='md:w-2/3 divide-y-[1px] divide-zinc-300 max-h-[500px] overflow-auto styled-scrollbar pe-3'>
                    <CartItems products={data.products} />
                </div>
                <div className='md:w-1/3'>
                    <Checkout products={data.products} />
                </div>
            </div>
        </section>
    )
}

export default CartContainer
