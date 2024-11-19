import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function summary(value: string, length: number) {
  if (value === null) {
    return;
  }

  if (value.length > length) {
    return value.substring(0, length)+ '...';
  }

  return value;
}
