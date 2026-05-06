import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function pct(n: number, total: number): number {
  if (total <= 0) return 0;
  return clamp(Math.round((n / total) * 100), 0, 100);
}

export function formatNumber(n: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-US", opts).format(n);
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
