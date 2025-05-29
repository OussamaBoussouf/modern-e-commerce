'use client'

import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchQuery } from '@/hooks/use-search-query'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function PriceSlider({
    defaultMaxPrice,
}: {
    defaultMaxPrice: number | undefined
}) {
    const { setQueryString } = useSearchQuery()
    const searchParams = useSearchParams()
    const [price, setPrice] = useState(
        parseInt(
            searchParams.get('price') || defaultMaxPrice?.toString() || '0'
        )
    )
    const debouncedPriceValue = useDebounce(price, 500)

    useEffect(() => {
        setQueryString('price', price)
    }, [debouncedPriceValue])

    const handlePriceChange = (e: number[]) => setPrice(e[0])

    return (
        <>
            <span className='block mb-2'>$0 - ${price}</span>
            <Slider
                value={[price]}
                max={defaultMaxPrice}
                step={1}
                onValueChange={handlePriceChange}
            />
        </>
    )
}

export default PriceSlider
