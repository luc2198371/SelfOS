"use client";

import { GitBranch, Flame, Calendar } from "lucide-react";
import { quarterLabel, todayDate, fmtLong, TODAY_ISO, daysSince } from "@/lib/date";
import { user } from "@/lib/mock";
import { habits } from "@/lib/mock/habits";
import { habitLogs } from "@/lib/mock/habit-logs";
import { streakFor } from "@/lib/streak";

export function StatusBar() {
  // Compute the longest current streak across all habits — gives a single
  // "I'm on a roll" signal at the bottom of every screen.
  const top = habits
    .map((h) => ({ h, s: streakFor(h, habitLogs) }))
    .sort((a, b) => b.s - a.s)[0];

  const days = daysSince(user.startedTracking);
  const qLabel = quarterLabel(todayDate());

  return (
    <div className="hidden md:flex items-center gap-4 h-7 px-4 border-t border-line bg-bg text-[0.66rem] font-mono text-muted/80">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3 w-3" />
        {fmtLong(TODAY_ISO)}
      </span>
      <span className="text-muted/30">|</span>
      <span className="inline-flex items-center gap-1.5">
        <Flame className="h-3 w-3" />
        {top ? `${top.s}-day streak · ${top.h.name.toLowerCase()}` : "no streak"}
      </span>
      <span className="text-muted/30">|</span>
      <span className="inline-flex items-center gap-1.5">
        <GitBranch className="h-3 w-3" />
        {qLabel}
      </span>
      <span className="ml-auto inline-flex items-center gap-2">
        <span className="text-muted/60">tracking</span>
        <span className="text-ink tabular">{days}</span>
        <span className="text-muted/60">days</span>
      </span>
    </div>
  );
}
