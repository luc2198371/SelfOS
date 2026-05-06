import { rangeISO, fmtDayMon } from "@/lib/date";
import { habits, habitLogs } from "@/lib/mock";
import { todayCompletionPct } from "@/lib/streak";
import { cn } from "@/lib/utils";

/**
 * Shows the last N days as cells. Cell shade reflects the proportion of
 * scheduled habits completed that day. Editor-feel "contribution graph".
 */
export function StreakCells({ days = 28 }: { days?: number }) {
  const dates = rangeISO(days);
  const cells = dates.map((d) => {
    const date = new Date(d + "T00:00:00");
    const { pct } = todayCompletionPct(habits, habitLogs, date);
    return { d, pct };
  });

  function shade(pct: number): string {
    if (pct === 0) return "bg-surface-2 border-line";
    if (pct < 30) return "bg-accent/10 border-accent/20";
    if (pct < 60) return "bg-accent/20 border-accent/30";
    if (pct < 85) return "bg-accent/40 border-accent/50";
    return "bg-accent/70 border-accent";
  }

  return (
    <div className="card-zed">
      <div className="flex items-center justify-between mb-4">
        <div className="label-zed">Last {days} days</div>
        <div className="font-mono text-[0.66rem] text-muted/80 flex items-center gap-1.5">
          <span>less</span>
          <span className="h-2 w-2 rounded-sm bg-surface-2 border border-line" />
          <span className="h-2 w-2 rounded-sm bg-accent/20 border border-accent/30" />
          <span className="h-2 w-2 rounded-sm bg-accent/40 border border-accent/50" />
          <span className="h-2 w-2 rounded-sm bg-accent/70 border border-accent" />
          <span>more</span>
        </div>
      </div>
      <div className="grid grid-cols-14 gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(days, 14)}, minmax(0,1fr))` }}>
        {cells.map((c) => (
          <div
            key={c.d}
            title={`${fmtDayMon(c.d)} · ${c.pct}%`}
            className={cn(
              "aspect-square rounded-[3px] border transition-colors",
              shade(c.pct)
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[0.66rem] text-muted/80">
        <span>{fmtDayMon(dates[0])}</span>
        <span>{fmtDayMon(dates[dates.length - 1])}</span>
      </div>
    </div>
  );
}
