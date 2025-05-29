import Image from 'next/image'
import Link from 'next/link'
import emptyCart from '@/assets/images/empty-cart.png'

function EmptyCart() {
  return (
    <div className='h-[500px] grid place-content-center'>
      <Image src={emptyCart} width='300' height='300' alt='empty cart' />
      <div className='text-center'>
        <p className='mb-2'>You don&apos;t have any items in your cart.</p>
        <Link href='/products' className='text-red-400'>
          Explore our porducts
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
