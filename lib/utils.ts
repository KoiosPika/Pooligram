import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export function formatTimeAgo(dateString: Date) {
  const date = new Date(dateString).getTime();
  const now = new Date().getTime();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return 'Just now';
  }

  let interval = seconds / 31536000;
  if (interval > 1) {
      return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
      return Math.floor(interval) + "m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
      return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
      return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
      return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}
