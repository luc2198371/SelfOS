import type { LifeCategory } from "@/types";
import { ZedBarChart } from "@/components/charts/bar-chart";

interface ScoresOverviewProps {
  categories: LifeCategory[];
}

export function ScoresOverview({ categories }: ScoresOverviewProps) {
  const data = categories.map((c) => ({
    label: c.label,
    value: c.currentScore,
  }));

  const avg =
    categories.reduce((acc, c) => acc + c.currentScore, 0) /
    Math.max(1, categories.length);

  const high = categories.reduce((a, b) =>
    b.currentScore > a.currentScore ? b : a
  );
  const low = categories.reduce((a, b) =>
    b.currentScore < a.currentScore ? b : a
  );

  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div>
          <div className="label-zed">All ten · current scores</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            scale of 1 to 10
          </div>
        </div>
        <div className="flex items-baseline gap-6">
          <div className="text-right">
            <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
              avg
            </div>
            <div className="stat-zed text-[1.4rem] leading-none">
              {avg.toFixed(1)}
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
              highest
            </div>
            <div className="font-mono text-[0.85rem] text-ink">{high.label}</div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
              lowest
            </div>
            <div className="font-mono text-[0.85rem] text-ink">{low.label}</div>
          </div>
        </div>
      </div>
      <ZedBarChart data={data} height={180} yDomain={[0, 10]} highlightMax />
    </div>
  );
}
