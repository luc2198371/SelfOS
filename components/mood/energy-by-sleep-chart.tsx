import { ZedBarChart } from "@/components/charts/bar-chart";
import type { DailyCheckin } from "@/types";

interface EnergyBySleepChartProps {
  checkins: DailyCheckin[];
}

const buckets: { label: string; min: number; max: number }[] = [
  { label: "<6h", min: 0, max: 6 },
  { label: "6–7h", min: 6, max: 7 },
  { label: "7–8h", min: 7, max: 8 },
  { label: "8h+", min: 8, max: 99 },
];

export function EnergyBySleepChart({ checkins }: EnergyBySleepChartProps) {
  const data = buckets.map((b) => {
    const matching = checkins.filter(
      (c) => c.sleepHours >= b.min && c.sleepHours < b.max
    );
    const avg =
      matching.length === 0
        ? 0
        : matching.reduce((acc, c) => acc + c.energy, 0) / matching.length;
    return { label: b.label, value: +avg.toFixed(1) };
  });

  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="label-zed">Energy by sleep</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            avg energy on days you slept this much
          </div>
        </div>
      </div>
      <ZedBarChart data={data} height={180} yDomain={[0, 10]} highlightMax />
    </div>
  );
}
