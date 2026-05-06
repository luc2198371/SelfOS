import { Check, Flame, X } from "lucide-react";
import type { Habit, HabitLog } from "@/types";
import { rangeISO, fmtWeekday } from "@/lib/date";
import { isScheduled, streakFor, consistency } from "@/lib/streak";
import { cn } from "@/lib/utils";

interface HabitRowProps {
  habit: Habit;
  logs: HabitLog[];
}

export function HabitRow({ habit, logs }: HabitRowProps) {
  const days = rangeISO(7);
  const streak = streakFor(habit, logs);
  const cons = consistency(habit, logs, 30);

  return (
    <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[minmax(0,1.5fr)_auto_auto_auto] items-center gap-3 sm:gap-5 py-3 px-3 sm:px-4 hover:bg-surface-2 transition-colors group">
      {/* Name + cadence */}
      <div className="min-w-0">
        <div className="font-mono text-[0.92rem] text-ink truncate flex items-center gap-2">
          {habit.name}
          {habit.isAvoid && (
            <span className="inline-flex items-center gap-0.5 text-[0.66rem] text-muted/80 px-1 border border-line rounded-sm uppercase tracking-wider">
              <X className="h-2.5 w-2.5" /> avoid
            </span>
          )}
        </div>
        <div className="font-mono text-[0.7rem] text-muted/80 mt-0.5">
          {habit.cadence.kind === "daily" && "every day"}
          {habit.cadence.kind === "weekdays" && "weekdays"}
          {habit.cadence.kind === "n-per-week" &&
            `${habit.cadence.n}× per week`}
          {habit.cadence.kind === "custom" && "custom days"}
          {habit.category && (
            <>
              <span className="text-muted/30 mx-1.5">·</span>
              {habit.category}
            </>
          )}
        </div>
      </div>

      {/* 7-day grid */}
      <div className="hidden sm:flex items-center gap-1">
        {days.map((d) => {
          const log = logs.find((l) => l.habitId === habit.id && l.date === d);
          const date = new Date(d + "T00:00:00");
          const scheduled = isScheduled(habit, date);
          const done = log?.value === 1;
          return (
            <div
              key={d}
              className="flex flex-col items-center gap-1"
              title={`${fmtWeekday(d)} · ${done ? "done" : scheduled ? "missed" : "off"}`}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-sm border grid place-items-center transition-colors",
                  done
                    ? "bg-accent border-accent"
                    : scheduled
                      ? "bg-surface-2 border-line-strong"
                      : "border-line/40 bg-transparent"
                )}
              >
                {done && (
                  <Check className="h-3 w-3 text-[color:var(--color-on-accent)]" />
                )}
              </div>
              <span className="font-mono text-[0.6rem] text-muted/70">
                {fmtWeekday(d).slice(0, 1)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Consistency */}
      <div className="hidden sm:block text-right">
        <div className="font-mono text-[0.85rem] tabular text-ink">{cons}%</div>
        <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/80">
          30d
        </div>
      </div>

      {/* Streak */}
      <div className="text-right">
        <div className="inline-flex items-center gap-1 font-mono text-[0.85rem] tabular text-ink">
          <Flame
            className={cn("h-3 w-3", streak > 0 ? "text-accent" : "text-muted/60")}
          />
          {streak}
        </div>
        <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/80">
          streak
        </div>
      </div>
    </div>
  );
}
