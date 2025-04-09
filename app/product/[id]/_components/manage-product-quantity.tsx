'use client'

import { Product } from '@/lib/types'
import { useState } from 'react'
import AddProductButton from '../../../../components/common/add-product-button'
import BuyProductButton from '../../../../components/common/buy-product-button'
import ManageQuantity from '@/app/product/[id]/_components/manage-quantity'

function QuantityManager({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1)

    if (product?.stock === 0) {
        return (
            <p className='text-red-600 font-bold mt-5'>
                Currently Out Of Stock
            </p>
        )
    }

    return (
        <div>
            <div className='py-5'>
                <div className='flex items-center gap-5 bg-white p-1 w-fit mb-4 rounded-full'>
                    <ManageQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>
                <span>
                    Only{' '}
                    <span className='text-orange-400'>
                        {product?.stock} Items
                    </span>{' '}
                    Left! Dont miss it
                </span>
            </div>
            <div className='flex items-center gap-5 mt-3 h-12'>
                <BuyProductButton
                    image={product.image}
                    name={product.name}
                    stock={product.stock}
                    id={product.id}
                    price={product.price}
                />
                <AddProductButton
                    productId={product.id}
                    unitPrice={product.price}
                    quantity={quantity}
                    className='basis-1/2 h-full'
                />
            </div>
        </div>
    )
}

export default QuantityManager
