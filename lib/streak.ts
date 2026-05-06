import { subDays } from "date-fns";
import type { Habit, HabitLog, ISODate } from "@/types";
import { fromISO, todayDate, toISODate } from "./date";

/**
 * Whether `habit` is "scheduled" on the given Date per its cadence.
 */
export function isScheduled(habit: Habit, date: Date): boolean {
  const dow = date.getDay();
  switch (habit.cadence.kind) {
    case "daily":
      return true;
    case "weekdays":
      return dow >= 1 && dow <= 5;
    case "n-per-week":
      return true; // any day counts toward target
    case "custom":
      return habit.cadence.days.includes(dow as 0 | 1 | 2 | 3 | 4 | 5 | 6);
  }
}

/**
 * Streak ending at `endDate` (inclusive) — counts consecutive scheduled days
 * where a positive log exists. Days where the habit isn't scheduled are
 * skipped (don't break the streak).
 */
export function streakFor(
  habit: Habit,
  logs: HabitLog[],
  endDate: Date = todayDate(),
): number {
  const map = new Map<ISODate, 1 | 0>();
  for (const l of logs) if (l.habitId === habit.id) map.set(l.date, l.value);

  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = subDays(endDate, i);
    const iso = toISODate(d);
    if (iso < habit.createdAt) break;

    if (!isScheduled(habit, d)) continue;
    const v = map.get(iso);
    if (v === 1) streak += 1;
    else break;
  }
  return streak;
}

/** Best (longest) historical streak for a habit. */
export function bestStreak(habit: Habit, logs: HabitLog[]): number {
  const days = logs
    .filter((l) => l.habitId === habit.id && l.value === 1)
    .map((l) => l.date)
    .sort();
  if (days.length === 0) return 0;
  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = fromISO(days[i - 1]);
    const cur = fromISO(days[i]);
    const diff = (cur.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

/**
 * Consistency over the last `days` for the habit, expressed as
 * (positive logs on scheduled days) / (total scheduled days).
 */
export function consistency(
  habit: Habit,
  logs: HabitLog[],
  days = 30,
  endDate: Date = todayDate(),
): number {
  let scheduled = 0;
  let done = 0;
  const map = new Map<ISODate, 1 | 0>();
  for (const l of logs) if (l.habitId === habit.id) map.set(l.date, l.value);

  for (let i = 0; i < days; i++) {
    const d = subDays(endDate, i);
    const iso = toISODate(d);
    if (iso < habit.createdAt) continue;
    if (!isScheduled(habit, d)) continue;
    scheduled += 1;
    if (map.get(iso) === 1) done += 1;
  }
  return scheduled === 0 ? 0 : Math.round((done / scheduled) * 100);
}

/** % of habits completed today (out of those scheduled today). */
export function todayCompletionPct(
  habits: Habit[],
  logs: HabitLog[],
  date: Date = todayDate(),
): { done: number; scheduled: number; pct: number } {
  const iso = toISODate(date);
  let done = 0;
  let scheduled = 0;
  for (const h of habits) {
    if (h.archivedAt) continue;
    if (!isScheduled(h, date)) continue;
    scheduled += 1;
    const log = logs.find((l) => l.habitId === h.id && l.date === iso);
    if (log?.value === 1) done += 1;
  }
  const pct =
    scheduled === 0 ? 0 : Math.round((done / scheduled) * 100);
  return { done, scheduled, pct };
}
