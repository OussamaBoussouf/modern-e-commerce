import ProductCard from '@/components/product/product-item'
import PaginationComponent from '@/components/common/pagination'
import { Product } from '@/lib/types'
import { CircleX } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'All Products',
}

async function ProductsPage({
    searchParams,
}: {
    searchParams: {
        sort?: string
        price?: string
        category?: string
        page?: string
        search?: string
    }
}) {
    const res = await fetch(`${process.env.HOST_NAME}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sort: searchParams.sort,
            price: searchParams.price,
            category: searchParams.category,
            page: searchParams.page,
            search: searchParams.search,
        }),
        cache: 'no-store',
    })

    if (!res.ok) throw new Error('Something went wrong')

    const { products, pageInfo } = await res.json()

    if (products.length === 0) {
        return (
            <div className='rounded-lg w-full flex flex-col gap-1 justify-center items-center h-96 bg-slate-100'>
                <CircleX size={30} color='red' />
                <p className='text-2xl'>No products found</p>
                <p className='text-gray-400'>
                    We found no search results for these filters.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-8'>
                {products?.map((product: Omit<Product, 'subImages'>) => (
                    <ProductCard key={product.id} props={product} />
                ))}
            </div>
            {pageInfo ? <PaginationComponent pageInfo={pageInfo} /> : null}
        </>
    )
}

export default ProductsPage
