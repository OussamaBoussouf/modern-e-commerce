import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value) params.delete(name);
    else params.set(name, value);

    if (name === "page") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return { setQueryString: createQueryString };
};
