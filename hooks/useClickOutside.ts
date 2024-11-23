import { RefObject, useEffect } from "react"


export const useClickOutside = (ref: RefObject<HTMLElement> , callback : () => void) => {
    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)){
                callback();
            }
        }

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);

        return () => {
            document.removeEventListener("mousedown", handler);
            document.addEventListener('touchstart', handler);
        };

    }, [ref]);
}