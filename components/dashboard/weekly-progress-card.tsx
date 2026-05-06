import { fmtWeekday, rangeISO } from "@/lib/date";
import { dailyCheckins } from "@/lib/mock/today";
import { ZedAreaChart } from "@/components/charts/area-chart";

export function WeeklyProgressCard() {
  const last7 = rangeISO(7);
  const data = last7.map((d) => {
    const c = dailyCheckins.find((x) => x.date === d);
    // Composite "wellbeing index" = (mood*2 + energy + (10-stress) + focus) / 5
    const score = c
      ? Math.round(((c.mood * 2 + c.energy + (10 - c.stress) + c.focus) / 5) * 10) / 10
      : 0;
    return { label: fmtWeekday(d), value: score };
  });

  const avg =
    data.reduce((acc, d) => acc + d.value, 0) / Math.max(1, data.length);

  return (
    <div className="card-zed">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <div className="label-zed">This week</div>
          <div className="font-mono text-[0.78rem] text-muted">
            wellbeing index · daily
          </div>
        </div>
        <div className="text-right">
          <div className="stat-zed text-[1.4rem] leading-none">
            {avg.toFixed(1)}
          </div>
          <div className="font-mono text-[0.66rem] text-muted">avg / 10</div>
        </div>
      </div>
      <ZedAreaChart data={data} height={160} yDomain={[0, 10]} unit="" />
    </div>
  );
}
