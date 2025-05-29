import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartProduct } from '../lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//ARTIFICIAL DELAY FOR HTTP REQUEST
export function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

//CREATE A SUMMARY FOR LONG TEXT
export function summary(value: string, length: number) {
  if (value === null) {
    return
  }

  if (value.length > length) {
    return value.substring(0, length) + '...'
  }

  return value
}

//CALCULATE TOTAL PRICE OF CART ITEMS
export function calculateTotal(products: CartProduct[]) {
  let total = 0
  for (const value of products) {
    total += value.product.price * value.quantity
  }
  return total.toFixed(2)
}

export const formatPrice = (value: number) => {
  return value.toFixed(2)
}

//

type ServerReturnType<T> =
  | { type: string; message: string }
  | undefined
  | null
  | T

export const handleServerActionError = async <T>(
  fn: () => Promise<T>
): Promise<ServerReturnType<T>> => {
  try {
    return await fn()
  } catch (err) {
    return { type: 'error', message: (err as Error).message }
  }
}
