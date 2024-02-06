import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types"

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

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function timeUntil(dateString: string, now: string) {
  const todayDate = new Date(now);
  const futureDate = new Date(dateString);

  if (futureDate < todayDate) {
    return false;
  }

  const differenceInMilliseconds = futureDate.getTime() - todayDate.getTime();

  // Convert milliseconds to days and hours
  const daysLeft = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (daysLeft > 0) {
    return `Ends in ${daysLeft} days`;
  } else {
    return `Ends in ${hoursLeft} hours`;
  }
}

export function daysBetweenDates(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1).getTime();
  const secondDate = new Date(date2).getTime();

  const differenceInTime = Math.abs(secondDate - firstDate);

  const differenceInDays = Math.round(differenceInTime / oneDay);

  return differenceInDays;
}

export function getMaxDate(startDateTime: Date): Date {
  const newDate = new Date(startDateTime);
  newDate.setDate(newDate.getDate() + 30);
  return newDate;
}

export function formatDate(dateInput: Date): string {

  const date = new Date(dateInput);


  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const suffixes = ["st", "nd", "rd"];
  const relevantSuffix = (day < 4 || day > 20) && day % 10 <= 3 ? suffixes[day % 10 - 1] : "th";

  return `${monthNames[month]} ${day}${relevantSuffix}, ${year}`;
}

export function getLevelColor(level: number) {
  if (level >= 180) {
    return 9;
  } else if (level >= 160) {
    return 8;
  } else if (level >= 140) {
    return 7;
  } else if (level >= 120) {
    return 6;
  } else if (level >= 100) {
    return 5;
  } else if (level >= 80) {
    return 4;
  } else if (level >= 60) {
    return 3;
  } else if (level >= 40) {
    return 2;
  } else return 1;
}

export function getNextLevelPoints(points: number) {

  let base = 500;

  if (points < 500) {
    return 500;
  }

  while (base < points) {
    base = base + 500;
  }

  if (points % 500 == 0) {
    return base + 500;
  }

  return base;

}
