'use client'

import { useDecrementQty, useIncrementQty } from '@/hooks/cart'
import { CartProduct } from '@/lib/types'
import React from 'react'

function ManageCartQuantity({ product }: { product: CartProduct }) {
    const increment = useIncrementQty()
    const decrement = useDecrementQty()

    return (
        <ul>
            <li className='font-semibodl'>{product.product.name}</li>
            <li className='flex items-center'>
                <span className='me-2'>Qty:</span>
                <div className='flex items-center gap-2 '>
                    <button
                        onClick={() => decrement.mutate(product)}
                        className='active:scale-75 h-5 w-5 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer'
                    >
                        -
                    </button>
                    <span className='w-2 flex items-center justify-center'>
                        {product.quantity}
                    </span>
                    <button
                        disabled={product.quantity === product.product.stock}
                        onClick={() =>
                            increment.mutate({
                                productId: product.productId,
                                cartId: product.cartId,
                            })
                        }
                        className={`active:scale-75 h-5 w-5 flex items-center justify-center bg-black text-white rounded-full ${
                            product.quantity === product.product.stock
                                ? 'bg-gray-300 hover:cursor-not-allowed'
                                : 'bg-black hover:cursor-pointer'
                        }`}
                    >
                        +
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default ManageCartQuantity
