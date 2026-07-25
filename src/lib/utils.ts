import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function formatCompactNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr+`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function calculateProgress(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  const pct = Math.round((raised / goal) * 100);
  return Math.min(pct, 100);
}
