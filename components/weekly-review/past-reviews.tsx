import { fmtLong } from "@/lib/date";
import type { WeeklyReview } from "@/types";

interface PastReviewsProps {
  reviews: WeeklyReview[];
}

const fields: { key: keyof WeeklyReview; label: string }[] = [
  { key: "wentWell", label: "What went well" },
  { key: "wentWrong", label: "What went wrong" },
  { key: "learned", label: "What I learned" },
  { key: "hardestHabit", label: "Hardest habit" },
  { key: "proudOf", label: "Proud of" },
  { key: "improveNextWeek", label: "Improve next week" },
  { key: "nextWeekFocus", label: "Next week's focus" },
];

export function PastReviews({ reviews }: PastReviewsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[1.05rem] text-ink">Past reviews</h2>
        <span className="font-mono text-[0.7rem] text-muted/70">
          {reviews.length} weeks
        </span>
      </div>
      <div className="space-y-3">
        {reviews.map((r) => (
          <details key={r.id} className="card-zed group">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <div>
                <div className="label-zed">Week of</div>
                <div className="font-mono text-[0.95rem] text-ink mt-1">
                  {fmtLong(r.weekStart)}
                </div>
              </div>
              <span className="font-mono text-[0.66rem] text-muted/70 uppercase tracking-wider group-open:hidden">
                expand
              </span>
              <span className="font-mono text-[0.66rem] text-muted/70 uppercase tracking-wider hidden group-open:inline">
                collapse
              </span>
            </summary>
            <div className="mt-5 space-y-4">
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70 mb-1">
                    {label}
                  </div>
                  <div className="font-sans text-[0.95rem] leading-relaxed text-ink">
                    {(r as unknown as Record<string, string>)[key as string] ||
                      "—"}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
