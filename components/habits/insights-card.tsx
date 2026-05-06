import { ArrowDown, ArrowUp, Flame } from "lucide-react";
import { habits, habitLogs } from "@/lib/mock";
import { consistency } from "@/lib/streak";
import { cn } from "@/lib/utils";

export function InsightsCard() {
  const stats = habits
    .filter((h) => !h.archivedAt)
    .map((h) => ({ h, c: consistency(h, habitLogs, 30) }))
    .sort((a, b) => b.c - a.c);

  const best = stats[0];
  const weakest = stats[stats.length - 1];
  const avg = Math.round(
    stats.reduce((acc, s) => acc + s.c, 0) / Math.max(1, stats.length)
  );

  return (
    <div className="card-zed">
      <div className="label-zed mb-4">Insights · last 30 days</div>
      <div className="space-y-3">
        <Row
          label="Strongest habit"
          name={best?.h.name ?? "—"}
          stat={`${best?.c ?? 0}%`}
          tone="up"
        />
        <Row
          label="Weakest habit"
          name={weakest?.h.name ?? "—"}
          stat={`${weakest?.c ?? 0}%`}
          tone="down"
        />
        <Row
          label="Overall consistency"
          name="across all habits"
          stat={`${avg}%`}
          tone="flat"
        />
      </div>

      <div className="divider-zed mt-5 pt-4">
        <div className="font-mono text-[0.72rem] text-muted leading-relaxed">
          The strongest habit usually carries the others. Stack the weakest one
          on top of the strongest, and watch what happens.
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  name,
  stat,
  tone,
}: {
  label: string;
  name: string;
  stat: string;
  tone: "up" | "down" | "flat";
}) {
  const Icon = tone === "up" ? ArrowUp : tone === "down" ? ArrowDown : Flame;
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="font-mono text-[0.66rem] text-muted/70 uppercase tracking-wider">
          {label}
        </div>
        <div className="font-mono text-[0.92rem] text-ink truncate">{name}</div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            tone === "up" && "text-accent",
            tone === "down" && "text-muted",
            tone === "flat" && "text-muted/80"
          )}
        />
        <span className="font-mono text-[0.95rem] tabular text-ink">{stat}</span>
      </div>
    </div>
  );
}
