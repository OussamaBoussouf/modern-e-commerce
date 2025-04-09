'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearchQuery } from '@/hooks/use-search-query'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

function PaginationComponent({
    pageInfo,
}: {
    pageInfo: {
        pageCount: number
        next: number
        previous: number
    }
}) {
    const { setQueryString } = useSearchQuery()
    const searchParams = useSearchParams()

    const numberOfPages = useMemo(() => {
        const pages = []
        for (let i = 1; i <= pageInfo.pageCount; i++) {
            pages.push(i)
        }
        return pages
    }, [pageInfo.pageCount])

    return (
        <Pagination className='mt-10'>
            <PaginationContent className='flex items-center justify-between w-full'>
                <PaginationItem>
                    <PaginationPrevious
                        className={`${
                            pageInfo.previous
                                ? 'cursor-pointer'
                                : 'opacity-20 pointer-events-none'
                        }`}
                        onClick={() =>
                            setQueryString(
                                'page',
                                pageInfo.previous === 1
                                    ? ''
                                    : pageInfo.previous.toString()
                            )
                        }
                    />
                </PaginationItem>
                <div className='flex items-center'>
                    {numberOfPages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                className='cursor-pointer'
                                isActive={
                                    parseInt(
                                        searchParams.get('page') || '1'
                                    ) === page
                                }
                                onClick={() =>
                                    setQueryString(
                                        'page',
                                        page === 1 ? '' : page.toString()
                                    )
                                }
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </div>
                <PaginationItem>
                    <PaginationNext
                        className={`${
                            pageInfo.next
                                ? 'cursor-pointer'
                                : 'opacity-20 pointer-events-none'
                        }`}
                        onClick={() =>
                            setQueryString('page', pageInfo.next.toString())
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
