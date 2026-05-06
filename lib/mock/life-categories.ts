import type { LifeCategory } from "@/types";
import { rangeISO } from "@/lib/date";

const dates = rangeISO(84); // last 12 weeks

function trend(start: number, end: number): { date: string; score: number }[] {
  return dates.map((d, i) => {
    const t = i / (dates.length - 1);
    const noise = ((i * 9301 + 49297) % 233280) / 233280 - 0.5;
    return { date: d, score: +(start + (end - start) * t + noise * 0.6).toFixed(1) };
  });
}

export const lifeCategories: LifeCategory[] = [
  {
    key: "health",
    label: "Health",
    description:
      "Body as base layer. Sleep, movement, food — in that order.",
    currentScore: 7.2,
    goalScore: 8.5,
    currentFocus: "Hold the running streak. Cook three meals a week.",
    improvementNotes: [
      "Sleep before midnight on weekdays.",
      "Strength training Tue/Fri.",
    ],
    history: trend(5.8, 7.2),
  },
  {
    key: "career",
    label: "Career",
    description: "Doing work I'm proud of. Building things that compound.",
    currentScore: 7.8,
    goalScore: 9.0,
    currentFocus: "Ship the dashboard. Pick the next big bet.",
    improvementNotes: ["Less reactive work. More deep work mornings."],
    history: trend(6.4, 7.8),
  },
  {
    key: "money",
    label: "Money",
    description: "Quiet, automated, unanxious.",
    currentScore: 6.4,
    goalScore: 8.0,
    currentFocus: "Six-month emergency fund. Then invest the surplus.",
    improvementNotes: ["Automate. Stop checking balances daily."],
    history: trend(5.6, 6.4),
  },
  {
    key: "knowledge",
    label: "Knowledge",
    description: "Read more than I scroll. Take notes I'd reread.",
    currentScore: 8.1,
    goalScore: 9.0,
    currentFocus: "Two books a month, real notes on each.",
    improvementNotes: ["Phone out of bedroom keeps the streak alive."],
    history: trend(6.5, 8.1),
  },
  {
    key: "discipline",
    label: "Discipline",
    description: "Small choices, repeated, in the right direction.",
    currentScore: 7.0,
    goalScore: 8.5,
    currentFocus: "Phone-free first hour. No scrolling in bed.",
    improvementNotes: [
      "Put phone in kitchen at night.",
      "Greyscale during work blocks.",
    ],
    history: trend(5.4, 7.0),
  },
  {
    key: "relationships",
    label: "Relationships",
    description: "The people I love deserve to be on my calendar, not just my mind.",
    currentScore: 7.4,
    goalScore: 8.5,
    currentFocus: "Call one person I love every week, no agenda.",
    improvementNotes: ["Birthday reminders the week before, not the day of."],
    history: trend(6.8, 7.4),
  },
  {
    key: "mindset",
    label: "Mindset",
    description: "Calm, curious, honest. The ground state I want.",
    currentScore: 6.8,
    goalScore: 8.5,
    currentFocus: "Less comparison. More attention to what's here.",
    improvementNotes: ["Reread Letters from a Stoic monthly."],
    history: trend(5.2, 6.8),
  },
  {
    key: "faith",
    label: "Faith / Spirit",
    description: "What I trust when nothing is certain.",
    currentScore: 5.6,
    goalScore: 7.5,
    currentFocus: "Practice gratitude as a discipline, not a mood.",
    improvementNotes: ["Three sentences each night, no exceptions."],
    history: trend(4.8, 5.6),
  },
  {
    key: "creativity",
    label: "Creativity",
    description: "Make things. Bad ones first.",
    currentScore: 6.5,
    goalScore: 8.0,
    currentFocus: "Write 200 words daily. Ship one small thing a month.",
    improvementNotes: ["Stop editing the first draft."],
    history: trend(5.6, 6.5),
  },
  {
    key: "adventure",
    label: "Adventure",
    description: "Unfamiliar places, on purpose.",
    currentScore: 6.0,
    goalScore: 8.0,
    currentFocus: "Plan one solo trip this year.",
    improvementNotes: ["Block the week before booking starts."],
    history: trend(4.8, 6.0),
  },
];
