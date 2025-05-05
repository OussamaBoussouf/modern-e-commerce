import Image from 'next/image'
import ManageCartQuantity from './manage-cart-quantity'
import RemoveProductButton from './remove-product-button'
import { formatPrice } from '@/lib/utils'
import { CartProduct } from '@/lib/types'

function CartItems({ products }: { products: CartProduct[] }) {
    return (
        <>
            {products.map((product) => (
                <div
                    key={product.productId}
                    className='flex justify-between py-4'
                >
                    <div className='flex'>
                        <div className='rounded-md bg-zinc-100 me-3'>
                            <Image
                                src={product.product.image}
                                height='100'
                                width='100'
                                alt='headphone'
                            />
                        </div>
                        <ManageCartQuantity product={product} />
                    </div>
                    <div className='flex flex-col items-end'>
                        <RemoveProductButton productId={product.productId} />
                        <span className='mt-auto'>
                            ${formatPrice(product.quantity * product.unitPrice)}
                        </span>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CartItems
