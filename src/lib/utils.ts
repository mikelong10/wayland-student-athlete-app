import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: Date): string {
  const date = input.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const time = input.toLocaleTimeString("en-US", {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  return `${date} @ ${time}`;
}