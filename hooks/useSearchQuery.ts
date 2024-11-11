import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchQuery = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      };

    return { setQueryString : createQueryString};
}