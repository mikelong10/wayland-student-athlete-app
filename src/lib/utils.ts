import { createHash } from "crypto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function generateUniqueId(inputString: string) {
  const hash = createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex");
}

export const phoneRegex = new RegExp(
  /^(\+?0?1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);

export function formatPhoneNumber(input: string): string {
  // Extract digits from the input string
  const digits = input.replace(/\D/g, "");

  let formattedNumber = "";
  // given number already has US country code
  if (digits.length > 10) {
    formattedNumber = "+" + digits;
  } else {
    // Append the country code "+1" to the extracted digits
    formattedNumber = "+1" + digits;
  }

  return formattedNumber;
}
