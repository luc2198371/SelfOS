import type { IdealDayBlock } from "@/types";
import { pad2 } from "@/lib/utils";

interface IdealDayTimelineProps {
  blocks: IdealDayBlock[];
}

export function IdealDayTimeline({ blocks }: IdealDayTimelineProps) {
  const byHour = new Map<number, string>();
  for (const b of blocks) byHour.set(b.hour, b.activity);

  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="label-zed">An ideal day</div>
          <div className="font-mono text-[0.78rem] text-muted mt-1">
            the shape, not the schedule
          </div>
        </div>
      </div>

      <ol className="space-y-0 divide-y divide-line">
        {Array.from({ length: 24 }, (_, h) => {
          const activity = byHour.get(h);
          const filled = !!activity;
          return (
            <li
              key={h}
              className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-1.5"
            >
              <span
                className={
                  "font-mono text-[0.72rem] tabular shrink-0 w-10 " +
                  (filled ? "text-ink" : "text-muted/30")
                }
              >
                {pad2(h)}:00
              </span>
              <span
                className={
                  "font-sans text-[0.92rem] leading-relaxed " +
                  (filled ? "text-ink" : "text-muted/30")
                }
              >
                {activity ?? "—"}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
