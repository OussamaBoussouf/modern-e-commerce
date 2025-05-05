import { getAllProducts } from '@/lib/actions/product'
import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function SearchSuggestions({
    searchedValue,
    isVisible,
    setIsVisible,
}: {
    searchedValue: string
    isVisible: boolean
    setIsVisible: () => void
}) {
    const [products, setProducts] = useState<Product[] | undefined>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProducts()
                setProducts(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const filteredProducts = products?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchedValue.toLowerCase())
    )

    return (
        <div
            className={`styled-scrollbar shadow-2xl py-5 absolute ${
                isVisible
                    ? 'top-[110%] opacity-100 visible'
                    : 'top-[150%] opacity-0 invisible'
            } transition-all duration-800 w-full max-h-60 lg:max-h-96 overflow-auto bg-white z-20`}
        >
            {filteredProducts && filteredProducts.length !== 0 ? (
                <ul className='divide-y'>
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={setIsVisible}
                        >
                            <li className='py-2 cursor-pointer hover:bg-gray-100'>
                                <div className='flex items-center justify-between px-3 lg:px-6'>
                                    {/* IMAGE */}
                                    <div className='inline-flex items-center w-[280px]'>
                                        <Image
                                            src={product.image}
                                            width={60}
                                            height={60}
                                            alt={product.name}
                                            className='w-auto h-auto'
                                        />
                                        <p className='ms-4 text-sm'>
                                            {product.name}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p className='px-3 text-sm'>
                    There are no products that match{' '}
                    <span className='font-bold'>{searchedValue}</span>
                </p>
            )}
        </div>
    )
}

export default SearchSuggestions
