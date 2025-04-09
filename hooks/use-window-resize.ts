import { useEffect, useState } from 'react'

export const useWindowResize = () => {
    const [windowDimension, setWindowDimension] = useState<{
        width: number | undefined
        height: number | undefined
    }>({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        function throttle(func : (...rest:any[]) => void, delay: number) {
            let shouldWait = false
            let waitingArgs : any[] | null
            const timeoutFunc = () => {
                if (waitingArgs == null) {
                    shouldWait = false
                } else {
                    func(...waitingArgs)
                    waitingArgs = null
                    setTimeout(timeoutFunc, delay)
                }
            }

            return function (...args: any[]) {
                if (shouldWait) {
                    waitingArgs = args
                    return
                }

                func(...args)
                shouldWait = true

                setTimeout(timeoutFunc, delay)
            }
        }

        function handleResize() {
            setWindowDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        const handleResizeThrottled = throttle(handleResize, 1000)

        window.addEventListener('resize', handleResizeThrottled)

        return () => window.addEventListener('resize', handleResizeThrottled)
    }, [])

   

    return { width: windowDimension.width, height: windowDimension.height }
}
