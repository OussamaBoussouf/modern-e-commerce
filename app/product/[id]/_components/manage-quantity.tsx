import React, { Dispatch, SetStateAction } from 'react'

function ManageQuantity({
    quantity,
    setQuantity,
}: {
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}) {
    return (
        <div className='flex items-center gap-5 bg-white p-1 w-fit rounded-full'>
            <button
                className='active:scale-75 h-8 w-8 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer'
                onClick={() => setQuantity((prev) => prev - 1)}
                disabled={quantity === 1}
            >
                -
            </button>
            <span className='w-2 flex items-center justify-center'>
                {quantity}
            </span>
            <button
                className='active:scale-75 h-8 w-8 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer'
                onClick={() => setQuantity((prev) => prev + 1)}
            >
                +
            </button>
        </div>
    )
}

export default ManageQuantity
