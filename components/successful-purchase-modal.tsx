'use client'

import Image from 'next/image'
import checkIcon from '../assets/images/check-icon.png'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Confetti from 'react-confetti'
import { useWindowResize } from '@/hooks/use-window-resize'
import Cookies from 'js-cookie'
import Stripe from 'stripe'
import { clearCart } from '@/lib/actions/cart'
import { useQueryClient } from '@tanstack/react-query'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)

function SuccessfulPurchaseModal() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const { width, height } = useWindowResize()

    const sessionId = searchParams.get('session_id')

    const handleClick = () => {
        document.body.style.overflow = 'visible'
        const params = new URLSearchParams(searchParams.toString())
        params.delete('session_id')
        router.replace('/')
        setIsModalOpen(false)
    }

    useEffect(() => {
        const checkSession = async () => {
            const session = await stripe.checkout.sessions.retrieve(sessionId!)
            if (session.payment_status === 'paid') {
                document.body.style.overflow = 'hidden'
                const cartId = Cookies.get('cartId')!
                queryClient.invalidateQueries({ queryKey: ['cart'] })
                await clearCart(cartId)
                setIsModalOpen(true)
            }
        }
        if (sessionId) checkSession()
    }, [])

    if (!isModalOpen) return null

    return (
        <>
            <div
                ref={ref}
                onClick={handleClick}
                className='fixed inset-0 bg-[rgba(0,0,0,0.5)] w-full'
            ></div>
            <Confetti width={width} height={height} />
            <div className='z-50 p-10 flex flex-col items-center gap-y-5 max-w-96 w-[90%] bg-white rounded-lg text-center shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Image
                    src={checkIcon}
                    alt='check icon'
                    width='60'
                    height='60'
                    className='w-[60px] h-[60px] mx-auto'
                />
                <h3 className='font-bold text-2xl'>
                    Thank you for your purchase
                </h3>
                <p>We've received your order will ship in 5-7 business days.</p>
                <Button
                    variant='secondary'
                    className='mt-3'
                    onClick={handleClick}
                >
                    Continue Shopping
                </Button>
            </div>
        </>
    )
}

export default SuccessfulPurchaseModal
