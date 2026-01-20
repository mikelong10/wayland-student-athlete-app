import { type ClassValue, clsx } from "clsx";
import { createHash } from "crypto";
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

// takes any phone number and turns it into +1XXXXXXXXXX
export function formatPhoneNumberForServer(input: string): string {
  // Extract digits from the input string
  const digits = input.replace(/\D/g, "");

  let formattedNumber = "";
  // given number already has US country code
  if (digits.length > 10) {
    formattedNumber = `+${digits}`;
  } else {
    // Append the country code "+1" to the extracted digits
    formattedNumber = `+1${digits}`;
  }

  return formattedNumber;
}

// takes +1XXXXXXXXXX and turns it into (XXX) XXX-XXXX
export function formatPhoneNumberForClient(phoneNumber: string): string {
  const match = phoneNumber.match(/^(\+\d{1})?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[2]}) ${match[3]}-${match[4]}`;
  } else {
    return phoneNumber;
  }
}

export function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove non-alphanumeric characters
    .split(" ")
    .join("-");
}

const isBrowser = () => typeof window !== "undefined";

export function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
