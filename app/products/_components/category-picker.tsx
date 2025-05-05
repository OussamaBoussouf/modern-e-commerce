'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useSearchQuery } from '@/hooks/use-search-query'
import { useSearchParams } from 'next/navigation'

const CATEGORIES = [
    {
        name: 'All',
        value: '',
    },
    {
        name: 'Wired headphones',
        value: 'wired',
    },
    {
        name: 'Wireless headphones',
        value: 'wireless',
    },
    {
        name: 'True wireless earbuds',
        value: 'earbuds',
    },
]

function CategoryPicker() {
    const { setQueryString } = useSearchQuery()
    const searchParams = useSearchParams()
    const selectedCategory = searchParams.get('category') ?? ''

    return (
        <>
            <RadioGroup defaultValue='category' className='space-y-4 mt-2'>
                {CATEGORIES.map((category) => (
                    <div
                        key={category.name}
                        className='flex items-center space-x-2'
                    >
                        <RadioGroupItem
                            value={category.value}
                            id={category.name}
                            checked={selectedCategory == category.value && true}
                            onClick={() =>
                                setQueryString('category', category.value)
                            }
                        />
                        <Label htmlFor={category.name}>{category.name}</Label>
                    </div>
                ))}
            </RadioGroup>
        </>
    )
}

export default CategoryPicker
