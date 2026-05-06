import type { JournalEntry } from "@/types";
import { daysAgoISO } from "@/lib/date";

export const journalEntries: JournalEntry[] = [
  {
    id: "j_001",
    date: daysAgoISO(0),
    createdAt: `${daysAgoISO(0)}T08:14:00`,
    title: "A quieter morning",
    body: `Slept early, woke up before the alarm. The first hour without the phone is starting to feel less like discipline and more like protection — like I'm refusing to let the day's noise in until I've put my own thoughts down.

I noticed something: I've been measuring days by what I produced, not by who I was while I was producing it. Today I want to try the opposite. The output will follow.`,
    mood: "good",
    tags: ["morning", "phone", "intent"],
    favorite: true,
  },
  {
    id: "j_002",
    date: daysAgoISO(1),
    createdAt: `${daysAgoISO(1)}T22:40:00`,
    body: `Had a hard conversation with M. tonight. Old pattern: I went silent instead of saying the small honest thing early. By the time I spoke, the small honest thing had grown into a small unfair thing.

Lesson, again: the cost of saying it now is always less than the cost of saying it later.`,
    mood: "meh",
    tags: ["relationships", "patterns"],
    prompts: [
      {
        question: "What mistake did I repeat?",
        answer: "Going quiet instead of saying the small honest thing.",
      },
      { question: "What did I learn?", answer: "Speak earlier. Always earlier." },
    ],
  },
  {
    id: "j_003",
    date: daysAgoISO(2),
    createdAt: `${daysAgoISO(2)}T21:05:00`,
    title: "Run day",
    body: `Ran 11km. Felt good for the first 7, hard for the last 4. The last 4 are where I learn things about myself the first 7 don't teach.`,
    mood: "great",
    tags: ["running", "body"],
    favorite: true,
  },
  {
    id: "j_004",
    date: daysAgoISO(4),
    createdAt: `${daysAgoISO(4)}T19:30:00`,
    body: `Spent way too long on my phone. I can already feel where this leads — irritated tomorrow, late to bed, low mood by the afternoon. Writing it down so I see the pattern in the data later. The pattern is the punishment.`,
    mood: "low",
    tags: ["phone", "mood", "warning"],
  },
  {
    id: "j_005",
    date: daysAgoISO(6),
    createdAt: `${daysAgoISO(6)}T07:50:00`,
    title: "Sunday review",
    body: `What I'm proud of this week: I journaled five days in a row. I read every night before bed. I called dad on Wednesday for no reason.

What I want next week: less noise. One real conversation. A long walk on Saturday with no agenda.`,
    mood: "good",
    tags: ["weekly", "review", "calm"],
  },
  {
    id: "j_006",
    date: daysAgoISO(8),
    createdAt: `${daysAgoISO(8)}T20:12:00`,
    body: `A good day at work. The kind where I forgot to check the time. I want more of those — and I think they happen when the problem is slightly too hard for me, not too easy. File that away.`,
    mood: "great",
    tags: ["work", "flow"],
  },
  {
    id: "j_007",
    date: daysAgoISO(10),
    createdAt: `${daysAgoISO(10)}T22:55:00`,
    body: `Felt anxious for no clear reason. Slept poorly the night before; ate badly today. Maybe the reason is just that.`,
    mood: "meh",
    tags: ["anxiety", "sleep"],
  },
  {
    id: "j_008",
    date: daysAgoISO(13),
    createdAt: `${daysAgoISO(13)}T18:40:00`,
    title: "On building things",
    body: `I think the reason I keep starting projects and abandoning them isn't laziness. It's that I want the version that already exists in my head, not the embarrassing first draft I have to actually make. Naming this so I can stop letting it stop me.`,
    mood: "ok",
    tags: ["building", "fear", "honesty"],
    favorite: true,
  },
  {
    id: "j_009",
    date: daysAgoISO(16),
    createdAt: `${daysAgoISO(16)}T07:10:00`,
    body: `Birthday morning. 28 today. I felt the usual quiet panic for about ten minutes and then it lifted. The list of things I want to do with this year is shorter than last year. That feels right.`,
    mood: "good",
    tags: ["birthday", "age"],
  },
  {
    id: "j_010",
    date: daysAgoISO(19),
    createdAt: `${daysAgoISO(19)}T23:00:00`,
    body: `Finished the book. The kind of book that makes me sit still for a minute after the last page. I want to write something that does that, even if only for one person.`,
    mood: "great",
    tags: ["books", "writing"],
  },
  {
    id: "j_011",
    date: daysAgoISO(23),
    createdAt: `${daysAgoISO(23)}T14:20:00`,
    body: `Rough morning. Lost an hour to a stupid loop in my head — comparison, mostly. Walked it off. It's fine. The walking is the practice.`,
    mood: "meh",
    tags: ["comparison", "walk"],
  },
  {
    id: "j_012",
    date: daysAgoISO(28),
    createdAt: `${daysAgoISO(28)}T21:00:00`,
    body: `Quiet weekend with people I love. Cooked. Read on the couch. I don't have to make a story out of this one — it was already enough.`,
    mood: "great",
    tags: ["weekend", "family"],
  },
  {
    id: "j_013",
    date: daysAgoISO(34),
    createdAt: `${daysAgoISO(34)}T08:30:00`,
    body: `Started using a real journal again. Pen and paper, then this. Two passes. The first one is honest, the second one is for me later.`,
    mood: "ok",
    tags: ["habit", "writing"],
  },
  {
    id: "j_014",
    date: daysAgoISO(40),
    createdAt: `${daysAgoISO(40)}T11:11:00`,
    title: "Reset",
    body: `Six weeks of tracking. Looking back, the numbers are honest in a way memory isn't. Mood is up. Sleep is up. Stress is down. The small choices are compounding the way I half-believed they would.`,
    mood: "great",
    tags: ["data", "compound"],
  },
];

export const journalPrompts: string[] = [
  "What did I do well today?",
  "What made me proud?",
  "What made me stressed?",
  "What mistake did I repeat?",
  "What did I learn?",
  "What should I stop doing?",
  "What should I do more?",
  "What kind of person was I today?",
];
