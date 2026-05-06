export type ISODate = string; // "YYYY-MM-DD"
export type ISODateTime = string; // full ISO

export type Mood = "low" | "meh" | "ok" | "good" | "great";

export type LifeCategoryKey =
  | "health"
  | "career"
  | "money"
  | "knowledge"
  | "discipline"
  | "relationships"
  | "mindset"
  | "faith"
  | "creativity"
  | "adventure";

export interface User {
  name: string;
  startedTracking: ISODate;
  values: string[];
  personalRules: string[];
  lifeScore: number; // 0–100, derived
}

export interface DailyCheckin {
  date: ISODate;
  mood: 1 | 2 | 3 | 4 | 5;
  energy: number; // 0–10
  stress: number; // 0–10
  focus: number; // 0–10
  sleepHours: number;
  waterCups: number;
  topTasks: { id: string; text: string; done: boolean }[];
  mainGoalForDay?: string;
  workoutMinutes?: number;
  readingMinutes?: number;
  gratitude?: string;
  learnedToday?: string;
  improveTomorrow?: string;
}

export type HabitCadence =
  | { kind: "daily" }
  | { kind: "weekdays" }
  | { kind: "n-per-week"; n: number }
  | { kind: "custom"; days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[] };

export interface Habit {
  id: string;
  name: string;
  cadence: HabitCadence;
  category?: LifeCategoryKey;
  isAvoid?: boolean;
  createdAt: ISODate;
  archivedAt?: ISODate;
}

export interface HabitLog {
  habitId: string;
  date: ISODate;
  value: 1 | 0;
  note?: string;
}

export type GoalHorizon = "now" | "soon" | "future" | "dream";
export type GoalStatus =
  | "not-started"
  | "in-progress"
  | "paused"
  | "completed";
export type GoalKind = "binary" | "numeric" | "percent";

export interface Goal {
  id: string;
  title: string;
  category: LifeCategoryKey;
  horizon: GoalHorizon;
  kind: GoalKind;
  whyItMatters: string;
  deadline?: ISODate;
  progress: number; // 0–100
  nextAction?: string;
  obstacles: string[];
  lessons: string[];
  status: GoalStatus;
  createdAt: ISODate;
}

export interface JournalEntry {
  id: string;
  date: ISODate;
  createdAt: ISODateTime;
  title?: string;
  body: string;
  mood: Mood;
  tags: string[];
  prompts?: { question: string; answer: string }[];
  favorite?: boolean;
}

export interface LifeCategory {
  key: LifeCategoryKey;
  label: string;
  description: string;
  currentScore: number;
  goalScore: number;
  currentFocus: string;
  improvementNotes: string[];
  history: { date: ISODate; score: number }[];
}

export type TimelineEventKind =
  | "achievement"
  | "failure"
  | "lesson"
  | "place"
  | "person"
  | "decision"
  | "turning-point"
  | "travel"
  | "milestone";

export interface TimelineEvent {
  id: string;
  date: ISODate;
  title: string;
  kind: TimelineEventKind;
  story: string;
  lesson?: string;
  howItChangedMe?: string;
}

export interface WeeklyReview {
  id: string;
  weekStart: ISODate;
  wentWell: string;
  wentWrong: string;
  learned: string;
  hardestHabit: string;
  proudOf: string;
  improveNextWeek: string;
  nextWeekFocus: string;
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
}

export interface Milestone {
  id: string;
  title: string;
  goalId?: string;
  targetDate: ISODate;
  done?: boolean;
}
