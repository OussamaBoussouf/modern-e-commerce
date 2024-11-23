
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BasketProduct } from "./types";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//ARTIFICIAL DELAY FOR HTTP REQUEST
export function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//SUBSTRING A LONG TEXT
export function summary(value: string, length: number) {
  if (value === null) {
    return;
  }

  if (value.length > length) {
    return value.substring(0, length) + "...";
  }

  return value;
}

//PICK NECESSARY PROPERTIES FROM AN OBJECT
export function pick(obj: Record<string, any>, ...props: any[]) {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}

//CALCULATE TOTAL PRICE OF PRODUCT
export function calculateTotal(products: BasketProduct[]) {
  let total = 0;
  for (const value of products) {
    total += value.price * value.quantity;
  }
  return total.toFixed(2);
}

export const formatPrice = (value: number) => {
  return value.toFixed(2);
}