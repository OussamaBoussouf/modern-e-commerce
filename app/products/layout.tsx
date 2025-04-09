import SortBy from '@/app/products/_components/sort-by'
import SideBarFilter from '@/containers/all-products/SideBarFilter'
import React, { Suspense } from 'react'

function FilterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="h-[400px] relative w-full bg-fixed bg-cover bg-no-repeat bg-center bg-[url('../assets/images/headphone-product.jpg')]">
                <h2 className='absolute drop-shadow-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-9xl md:text-[12rem] tracking-wider text-white font-bold'>
                    Shop
                </h2>
            </section>
            <section className='container mx-auto py-10 px-3'>
                <div className='border-b-[1px] pb-6 flex justify-between items-center'>
                    <h2 className='text-xl md:text-3xl font-bold'>
                        Give All You Need
                    </h2>
                    <SortBy />
                </div>
                <div className='flex flex-col md:flex-row gap-x-8 py-10'>
                    <SideBarFilter />
                    <div className='w-full'>
                        <Suspense>{children}</Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FilterLayout
