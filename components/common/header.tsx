'use client'

import { ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'

import {
    SignInButton,
    SignedIn,
    SignedOut,
    useClerk,
    useUser,
} from '@clerk/nextjs'
import SearchBar from '@/components/search-bar'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
    linkCartToUser,
    mergeGuestCartWithLoggedInUserCart,
} from '@/lib/actions/cart'
import { useCart } from '@/hooks/cart'

const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All products' },
]

function Header() {
    const queryClient = useQueryClient()
    const { user } = useUser()

    useEffect(() => {
        const setCartId = async () => {
            try {
                const guestCartIdExists = Cookies.get('cartId')
                const loggedInUserCartId = user!.publicMetadata.cartId as
                    | string
                    | null

                if (guestCartIdExists) {
                    if (!loggedInUserCartId) {
                        await linkCartToUser(user!.id, guestCartIdExists)
                        queryClient.invalidateQueries({ queryKey: ['cart'] })
                    } else if (guestCartIdExists !== loggedInUserCartId) {
                        await mergeGuestCartWithLoggedInUserCart(
                            loggedInUserCartId,
                            guestCartIdExists
                        )
                        Cookies.set('cartId', loggedInUserCartId)
                        queryClient.invalidateQueries({ queryKey: ['cart'] })
                    }
                } else if (loggedInUserCartId) {
                    Cookies.set('cartId', loggedInUserCartId)
                    queryClient.invalidateQueries({ queryKey: ['cart'] })
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (user) setCartId()
    }, [user])

    return (
        <header className='my-2'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-[auto_minmax(1fr, 500px)_auto] grid-rows-2 gap-2 md:grid-rows-1 px-3'>
                    {/* LOGO PLUS NAV */}
                    <div className='flex items-center gap-5 col-span-2 md:col-span-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            aria-label='Lucide Store logo'
                            viewBox='0 0 35 35'
                            height='30'
                            width='30'
                            className='fill-black dark:fill-white h-[30px] w-[30px]'
                        >
                            <path d='M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z'></path>
                            <path d='M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z'></path>
                        </svg>
                        <nav>
                            <ul className='flex items-center gap-5'>
                                {links.map((link, index) => (
                                    <li
                                        key={index}
                                        className='text-sm text-slate-400 hover:text-black'
                                    >
                                        <Link href={link.href}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    {/* SEARCH BAR */}
                    <div className='row-start-2 col-span-3 md:row-start-1 md:col-start-2 md:col-span-1'>
                        <SearchBar />
                    </div>
                    {/* USER & BASKET BUTTON */}
                    <ul className='col-start-3 justify-self-end gap-3 flex items-center '>
                        <li className='inline-flex items-center'>
                            <SignedOut>
                                <SignInButton>
                                    <UserRound
                                        className='cursor-pointer'
                                        size='20'
                                    />
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <SignOutBtn />
                            </SignedIn>
                        </li>
                        <li className='relative'>
                            <ShoppingCartButton />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header

//
function ShoppingCartButton() {
    const { data } = useCart()

    return (
        <div className='relative'>
            <Link href='/cart' className='gap-2'>
                <ShoppingCart size='20' />
            </Link>
            <span className='absolute flex justify-center items-center w-4 h-4 -top-1 -right-2 rounded-full bg-black text-white text-[0.8rem]'>
                {data ? data.products?.length : 0}
            </span>
        </div>
    )
}

//
function SignOutBtn() {
    const queryClient = useQueryClient()
    const { signOut } = useClerk()

    const handleLogout = () => {
        signOut()
        Cookies.remove('cartId')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    return (
        <button
            onClick={handleLogout}
            type='button'
            className='text-sm text-white border-indigo-300 border-[1px]  bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-md py-1 px-3 active:scale-95'
        >
            Sing Out
        </button>
    )
}
