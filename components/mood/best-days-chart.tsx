import { ZedBarChart } from "@/components/charts/bar-chart";
import type { DailyCheckin } from "@/types";

interface BestDaysChartProps {
  checkins: DailyCheckin[];
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function BestDaysChart({ checkins }: BestDaysChartProps) {
  const sums = Array.from({ length: 7 }, () => ({ total: 0, count: 0 }));
  for (const c of checkins) {
    const d = new Date(c.date + "T00:00:00").getDay(); // 0 = Sun
    const idx = (d + 6) % 7; // shift so Mon = 0
    sums[idx].total += c.mood;
    sums[idx].count += 1;
  }
  const data = days.map((label, i) => ({
    label,
    value: sums[i].count === 0 ? 0 : +(sums[i].total / sums[i].count).toFixed(2),
  }));

  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="label-zed">Best days of the week</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            avg mood per weekday
          </div>
        </div>
      </div>
      <ZedBarChart data={data} height={180} yDomain={[0, 5]} highlightMax />
    </div>
  );
}
