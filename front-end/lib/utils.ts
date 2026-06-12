import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractDate = (date: string) :string => {
  return date[0].slice(0, 10).replace("-", "/").replace("-", "/")
}
