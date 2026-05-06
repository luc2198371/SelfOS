import type { DailyCheckin } from "@/types";
import { rangeISO, TODAY_ISO } from "@/lib/date";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function build(): DailyCheckin[] {
  const dates = rangeISO(42); // last 6 weeks
  const r = seeded(31);
  return dates.map((d, i) => {
    // Slight upward trend across the 6 weeks
    const trend = i / dates.length; // 0 → 1
    const moodBase = 2.8 + trend * 1.1 + r() * 1.2;
    const mood = Math.max(1, Math.min(5, Math.round(moodBase))) as 1 | 2 | 3 | 4 | 5;
    const energy = Math.max(2, Math.min(10, Math.round(5 + trend * 2 + (r() - 0.5) * 3)));
    const stress = Math.max(0, Math.min(10, Math.round(6 - trend * 2 + (r() - 0.5) * 3)));
    const focus = Math.max(2, Math.min(10, Math.round(5 + trend * 2 + (r() - 0.5) * 3)));
    const sleepHours = +(6 + r() * 2.4).toFixed(1);
    const waterCups = Math.round(4 + r() * 5);
    return {
      date: d,
      mood,
      energy,
      stress,
      focus,
      sleepHours,
      waterCups,
      topTasks: [],
    };
  });
}

export const dailyCheckins: DailyCheckin[] = build();

export const todayCheckin: DailyCheckin = {
  date: TODAY_ISO,
  mood: 4,
  energy: 7,
  stress: 4,
  focus: 7,
  sleepHours: 7.5,
  waterCups: 5,
  topTasks: [
    { id: "t1", text: "Ship the Life OS dashboard MVP", done: false },
    { id: "t2", text: "Run 5km after work", done: false },
    { id: "t3", text: "Call dad", done: true },
  ],
  mainGoalForDay: "Make real progress on the personal dashboard project.",
  workoutMinutes: 0,
  readingMinutes: 0,
  gratitude: "",
  learnedToday: "",
  improveTomorrow: "",
};
