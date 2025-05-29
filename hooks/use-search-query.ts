import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSearchQuery = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = (name: string, value: number | string) => {
        const params = new URLSearchParams(searchParams)

        if (!value) params.delete(name)
        else
            params.set(
                name,
                typeof value === 'string' ? value : value.toString()
            )

        if (name === 'page') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }

        router.replace(`${pathname}?${params}`, {
            scroll: false,
        })
    }

    return { setQueryString: createQueryString }
}
