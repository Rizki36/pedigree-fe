import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateServiceErrorMessage(error: any) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return "Something went wrong, please try again later";
}
