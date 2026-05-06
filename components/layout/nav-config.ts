import {
  CalendarCheck2,
  CalendarDays,
  CircleDashed,
  Compass,
  FileClock,
  Flame,
  Footprints,
  GitBranch,
  HandCoins,
  Heart,
  HomeIcon,
  Lightbulb,
  type LucideIcon,
  Map as MapIcon,
  NotebookPen,
  Settings as SettingsIcon,
  Sparkles,
  Target,
  Telescope,
  Users,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  status?: "mvp" | "soon";
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    id: "present",
    label: "PRESENT",
    items: [
      { href: "/", label: "Dashboard", icon: HomeIcon, status: "mvp" },
      { href: "/today", label: "Today", icon: Flame, status: "mvp" },
      { href: "/habits", label: "Habits", icon: CalendarCheck2, status: "mvp" },
      { href: "/goals", label: "Goals & Dreams", icon: Target, status: "mvp" },
    ],
  },
  {
    id: "reflection",
    label: "REFLECTION",
    items: [
      {
        href: "/journal",
        label: "Journal",
        icon: NotebookPen,
        status: "mvp",
      },
      {
        href: "/weekly-review",
        label: "Weekly Review",
        icon: FileClock,
        status: "mvp",
      },
      {
        href: "/year-in-review",
        label: "Year in Review",
        icon: CalendarDays,
        status: "soon",
      },
      {
        href: "/future-self",
        label: "Future Self",
        icon: Telescope,
        status: "mvp",
      },
    ],
  },
  {
    id: "journey",
    label: "JOURNEY",
    items: [
      { href: "/timeline", label: "Life Timeline", icon: GitBranch, status: "mvp" },
      { href: "/travel", label: "Travel & Memories", icon: MapIcon, status: "soon" },
      { href: "/relationships", label: "Relationships", icon: Users, status: "soon" },
    ],
  },
  {
    id: "growth",
    label: "GROWTH",
    items: [
      { href: "/life-progress", label: "Life Progress", icon: Compass, status: "mvp" },
      { href: "/mood", label: "Mood & Patterns", icon: Sparkles, status: "mvp" },
      { href: "/skills", label: "Skills & Learning", icon: Lightbulb, status: "soon" },
      { href: "/health", label: "Health & Body", icon: Footprints, status: "soon" },
      { href: "/finance", label: "Finance", icon: HandCoins, status: "soon" },
    ],
  },
  {
    id: "system",
    label: "—",
    items: [
      { href: "/settings", label: "Settings", icon: SettingsIcon, status: "mvp" },
    ],
  },
];

export const titleByPath: Record<string, { title: string; description?: string }> = {
  "/": {
    title: "Dashboard",
    description: "Your life, right now.",
  },
  "/today": {
    title: "Today",
    description: "The check-in you open every morning.",
  },
  "/habits": {
    title: "Habits",
    description: "Small choices, repeated, in the right direction.",
  },
  "/goals": {
    title: "Goals & Dreams",
    description: "From this week to a lifetime.",
  },
  "/journal": {
    title: "Journal",
    description: "What you actually thought, in your own words.",
  },
  "/timeline": {
    title: "Life Timeline",
    description: "The story so far.",
  },
  "/weekly-review": {
    title: "Weekly Review",
    description: "Seven questions, every Sunday.",
  },
  "/life-progress": {
    title: "Life Progress",
    description: "Ten categories, scored over time.",
  },
  "/mood": {
    title: "Mood & Patterns",
    description: "The shape of your inner weather.",
  },
  "/future-self": {
    title: "Future Self",
    description: "Who you're becoming.",
  },
  "/settings": {
    title: "Settings",
    description: "The few knobs worth keeping.",
  },
};

// Heart icon imported for completeness (used elsewhere)
export const _ = { Heart, CircleDashed };
