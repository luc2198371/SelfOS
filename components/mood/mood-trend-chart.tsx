import { ZedAreaChart } from "@/components/charts/area-chart";
import { fmtDayMon } from "@/lib/date";
import type { DailyCheckin } from "@/types";

interface MoodTrendChartProps {
  checkins: DailyCheckin[];
}

export function MoodTrendChart({ checkins }: MoodTrendChartProps) {
  const data = checkins.map((c) => ({
    label: fmtDayMon(c.date),
    value: c.mood,
  }));
  const avg =
    checkins.reduce((acc, c) => acc + c.mood, 0) / Math.max(1, checkins.length);

  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="label-zed">Mood</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            last {checkins.length} days · 1 to 5
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
            avg
          </div>
          <div className="stat-zed text-[1.4rem] leading-none">
            {avg.toFixed(1)}
          </div>
        </div>
      </div>
      <ZedAreaChart data={data} height={180} yDomain={[1, 5]} />
    </div>
  );
}
