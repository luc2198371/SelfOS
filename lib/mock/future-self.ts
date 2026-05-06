import type { FutureSelfStatement, IdealDayBlock } from "@/types";
import { TODAY_ISO } from "@/lib/date";

export const futureSelfStatements: FutureSelfStatement[] = [
  {
    id: "fs_1y",
    horizon: "1y",
    body: `By next May I want to have shipped this dashboard, run a half-marathon, finished 24 books, and become someone who answers texts within a day. Quieter mornings. Less reaction. A weekly call with each parent.`,
    updatedAt: `${TODAY_ISO}T08:00:00`,
  },
  {
    id: "fs_5y",
    horizon: "5y",
    body: `A small home I'm proud of in a city I've chosen on purpose. A side project that supports itself. A few deep friendships I've kept the work in. A body that still does what I ask of it. A library I've actually read.`,
    updatedAt: `${TODAY_ISO}T08:00:00`,
  },
  {
    id: "fs_10y",
    horizon: "10y",
    body: `A father who is patient. A partner who is present. Work that I would do anyway. A practice — writing, building, walking — that I have kept long enough to be unmistakably mine. Fewer opinions, more attention.`,
    updatedAt: `${TODAY_ISO}T08:00:00`,
  },
  {
    id: "fs_ideal",
    horizon: "ideal-day",
    body: `Wake up before the sun. Black coffee, no phone. Two hours of writing or building, the kind that disappears time. Long walk. Lunch at home, slowly. An afternoon of harder work — the calls, the decisions. Run before dinner. Cook with someone I love. Read in bed until I can't.`,
    updatedAt: `${TODAY_ISO}T08:00:00`,
  },
  {
    id: "fs_legacy",
    horizon: "legacy",
    body: `That the people closest to me felt seen, not managed. That I made a few things — words, software, dinners — that someone is still using or quoting after I'm gone. That my children, if I have them, never had to wonder whether I was paying attention.`,
    updatedAt: `${TODAY_ISO}T08:00:00`,
  },
];

/**
 * Ideal day timeline. 24 hours; only the rows we've defined are shown,
 * the rest render as muted "—" placeholders so the structure stays honest.
 */
export const idealDay: IdealDayBlock[] = [
  { hour: 5, activity: "Wake up. Coffee. No phone for an hour." },
  { hour: 6, activity: "Write or build — the deep work block." },
  { hour: 8, activity: "Long walk while the city wakes up." },
  { hour: 9, activity: "Slow breakfast. Re-read what I wrote yesterday." },
  { hour: 10, activity: "Calls / harder decisions / what I've been avoiding." },
  { hour: 13, activity: "Lunch at home, no screens." },
  { hour: 14, activity: "Second deep block — the unglamorous parts of the work." },
  { hour: 17, activity: "Run, even if short. Move the body before the mind closes." },
  { hour: 18, activity: "Cook with someone I love." },
  { hour: 20, activity: "Conversation. Or one episode. Not both." },
  { hour: 21, activity: "Read in bed until I can't." },
];
