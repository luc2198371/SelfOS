import {
  addDays,
  differenceInDays,
  format,
  parseISO,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";
import type { ISODate } from "@/types";

export const TODAY_ISO: ISODate = "2026-05-06";

export function toISODate(d: Date): ISODate {
  return format(d, "yyyy-MM-dd");
}

export function fromISO(d: ISODate): Date {
  return parseISO(d);
}

export function todayDate(): Date {
  return startOfDay(parseISO(TODAY_ISO));
}

export function daysAgoISO(n: number, base: Date = todayDate()): ISODate {
  return toISODate(subDays(base, n));
}

export function daysFromISO(n: number, base: Date = todayDate()): ISODate {
  return toISODate(addDays(base, n));
}

export function rangeISO(days: number, base: Date = todayDate()): ISODate[] {
  return Array.from({ length: days }, (_, i) =>
    toISODate(subDays(base, days - 1 - i))
  );
}

export function daysSince(d: ISODate, base: Date = todayDate()): number {
  return differenceInDays(base, parseISO(d));
}

export function thisMonday(base: Date = todayDate()): Date {
  return startOfWeek(base, { weekStartsOn: 1 });
}

export function fmtLong(d: ISODate): string {
  return format(parseISO(d), "EEEE, MMMM d, yyyy");
}

export function fmtMed(d: ISODate): string {
  return format(parseISO(d), "MMM d, yyyy");
}

export function fmtDayMon(d: ISODate): string {
  return format(parseISO(d), "MMM d");
}

export function fmtTime(d: string): string {
  return format(parseISO(d), "HH:mm");
}

export function fmtYear(d: ISODate): string {
  return format(parseISO(d), "yyyy");
}

export function fmtWeekday(d: ISODate): string {
  return format(parseISO(d), "EEE");
}

export function quarterLabel(d: Date = todayDate()): string {
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `${d.getFullYear()}-Q${q}`;
}
