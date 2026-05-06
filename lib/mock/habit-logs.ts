import type { HabitLog, ISODate } from "@/types";
import { rangeISO, daysAgoISO } from "@/lib/date";
import { habits } from "./habits";

/**
 * Generate a realistic-looking sparse log spanning the last 90 days.
 * Each habit gets a stable seeded probability of completion plus a
 * recent uplift to give a sense of momentum. This is a one-time generator
 * so the data feels real but stays deterministic.
 */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const baseRates: Record<string, number> = {
  h_wake: 0.78,
  h_move: 0.85,
  h_read: 0.92,
  h_code: 0.7,
  h_journal: 0.66,
  h_sleep: 0.61,
  h_water: 0.74,
  h_noscroll: 0.55,
  h_skill: 0.6,
  h_family: 0.45,
};

function buildLogs(): HabitLog[] {
  const out: HabitLog[] = [];
  const dates: ISODate[] = rangeISO(90);

  habits.forEach((h, idx) => {
    const rand = seededRand(101 + idx * 7);
    const base = baseRates[h.id] ?? 0.7;

    dates.forEach((d, i) => {
      // Skip days before habit creation
      if (d < h.createdAt) return;

      // Recent days get a small uplift (last 14 days)
      const recent = i >= dates.length - 14 ? 0.07 : 0;

      // Reading streak: force last 12 days complete for h_read
      if (h.id === "h_read" && i >= dates.length - 12) {
        out.push({ habitId: h.id, date: d, value: 1 });
        return;
      }

      // Force a clean 5-day streak on h_journal recently
      if (h.id === "h_journal" && i >= dates.length - 5) {
        out.push({ habitId: h.id, date: d, value: 1 });
        return;
      }

      // Skip non-scheduled days for weekday-only / custom cadence
      const dow = new Date(d).getUTCDay();
      if (h.cadence.kind === "weekdays" && (dow === 0 || dow === 6)) return;

      const r = rand();
      const value = r < base + recent ? 1 : 0;
      // Sparse: only emit positive logs (most realistic for sparse-log model)
      if (value === 1) out.push({ habitId: h.id, date: d, value: 1 });
    });
  });

  return out;
}

export const habitLogs: HabitLog[] = buildLogs();

// Today's planned habit list for the Today page (subset for screen real-estate)
export const todayChecklistHabitIds: string[] = [
  "h_wake",
  "h_move",
  "h_read",
  "h_code",
  "h_journal",
  "h_water",
  "h_noscroll",
];

// Derive today's check state from the logs for the Today page
export function todayCheckState(today: ISODate = daysAgoISO(0)): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const id of todayChecklistHabitIds) {
    const log = habitLogs.find((l) => l.habitId === id && l.date === today);
    map[id] = log?.value === 1;
  }
  return map;
}
