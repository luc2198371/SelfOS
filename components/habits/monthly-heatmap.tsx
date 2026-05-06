import { rangeISO, fmtDayMon } from "@/lib/date";
import { habits, habitLogs } from "@/lib/mock";
import { todayCompletionPct } from "@/lib/streak";
import { cn } from "@/lib/utils";

export function MonthlyHeatmap() {
  const dates = rangeISO(56); // 8 weeks
  const cells = dates.map((d) => {
    const date = new Date(d + "T00:00:00");
    const { pct } = todayCompletionPct(habits, habitLogs, date);
    return { d, pct, day: date.getDay() };
  });

  // Group by week of 7
  const weeks: { d: string; pct: number; day: number }[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  function shade(pct: number): string {
    if (pct === 0) return "bg-surface-2 border-line";
    if (pct < 30) return "bg-accent/10 border-accent/20";
    if (pct < 60) return "bg-accent/25 border-accent/35";
    if (pct < 85) return "bg-accent/45 border-accent/55";
    return "bg-accent/70 border-accent";
  }

  return (
    <div className="card-zed">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="label-zed">Last 8 weeks</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            % habits completed per day
          </div>
        </div>
        <div className="font-mono text-[0.66rem] text-muted/80 flex items-center gap-1.5">
          <span>0</span>
          <span className="h-2 w-2 rounded-sm bg-surface-2 border border-line" />
          <span className="h-2 w-2 rounded-sm bg-accent/25 border border-accent/35" />
          <span className="h-2 w-2 rounded-sm bg-accent/45 border border-accent/55" />
          <span className="h-2 w-2 rounded-sm bg-accent/70 border border-accent" />
          <span>100%</span>
        </div>
      </div>
      <div className="flex items-start gap-1.5 overflow-x-auto pb-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pt-0">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span
              key={i}
              className="font-mono text-[0.6rem] text-muted/60 h-3.5 leading-3.5"
            >
              {d}
            </span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((c) => (
              <div
                key={c.d}
                title={`${fmtDayMon(c.d)} · ${c.pct}%`}
                className={cn(
                  "h-3.5 w-3.5 rounded-[2px] border transition-colors",
                  shade(c.pct)
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
