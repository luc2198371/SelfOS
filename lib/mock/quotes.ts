import type { Quote } from "@/types";

export const quotes: Quote[] = [
  { id: "q1", text: "We are what we repeatedly do.", author: "Aristotle" },
  {
    id: "q2",
    text: "The obstacle is the way.",
    author: "Marcus Aurelius",
  },
  {
    id: "q3",
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
  },
  {
    id: "q4",
    text: "Your future is created by what you do today, not tomorrow.",
    author: "Robert Kiyosaki",
  },
  {
    id: "q5",
    text: "How we spend our days is, of course, how we spend our lives.",
    author: "Annie Dillard",
  },
  {
    id: "q6",
    text: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
  },
  {
    id: "q7",
    text: "The quality of your life is the quality of your relationships.",
    author: "Tony Robbins",
  },
  {
    id: "q8",
    text: "What we plant in the soil of contemplation, we shall reap in the harvest of action.",
    author: "Meister Eckhart",
  },
  {
    id: "q9",
    text: "Slow is smooth, smooth is fast.",
    author: "—",
  },
  {
    id: "q10",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    id: "q11",
    text: "The unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    id: "q12",
    text: "The best time to plant a tree was twenty years ago. The second best time is now.",
    author: "Chinese proverb",
  },
];

export function quoteOfTheDay(seed = 0): Quote {
  const today = new Date().toISOString().slice(0, 10);
  const sum = (today + seed).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return quotes[sum % quotes.length];
}
