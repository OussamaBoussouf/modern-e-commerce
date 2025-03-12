import { useClerk } from '@clerk/nextjs'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import React from 'react'

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

export default SignOutBtn
