import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { goals, nextMilestone } from "@/lib/mock";
import { fmtMed, daysSince } from "@/lib/date";
import { Progress } from "@/components/ui/progress";

export function NextMilestoneCard() {
  const m = nextMilestone();
  if (!m) return null;
  const goal = goals.find((g) => g.id === m.goalId);
  const daysAway = -daysSince(m.targetDate);

  return (
    <Link
      href="/goals"
      className="card-zed group block hover:bg-surface-2 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="label-zed">Next milestone</div>
        <ArrowRight className="h-3.5 w-3.5 text-muted/60 group-hover:text-accent transition-colors" />
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="grid place-items-center h-8 w-8 rounded-sm border border-line shrink-0 mt-0.5">
          <Target className="h-3.5 w-3.5 text-muted" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[0.95rem] text-ink leading-tight">
            {m.title}
          </div>
          {goal && (
            <div className="text-[0.78rem] text-muted leading-relaxed mt-1">
              {goal.title}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[0.72rem] mb-1.5">
        <span className="text-muted">{fmtMed(m.targetDate)}</span>
        <span className="text-ink tabular">
          {daysAway > 0 ? `in ${daysAway} days` : "today"}
        </span>
      </div>
      {goal && <Progress value={goal.progress} />}
    </Link>
  );
}
