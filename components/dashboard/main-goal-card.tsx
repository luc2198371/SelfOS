import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { goals } from "@/lib/mock";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function MainGoalCard() {
  // The "main goal" = the in-progress 'now' goal closest to its deadline
  const main =
    goals
      .filter((g) => g.horizon === "now" && g.status === "in-progress")
      .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""))[0] ??
    goals.find((g) => g.status === "in-progress");

  if (!main) return null;

  return (
    <Link
      href="/goals"
      className="card-zed group block hover:bg-surface-2 transition-colors h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="label-zed">Main goal · now</div>
        <ArrowRight className="h-3.5 w-3.5 text-muted/60 group-hover:text-accent transition-colors" />
      </div>

      <div className="font-mono text-[1.05rem] leading-snug text-ink mb-2">
        {main.title}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="default">{main.category}</Badge>
        <Badge variant="muted">{main.status.replace("-", " ")}</Badge>
      </div>

      <p className="text-[0.88rem] text-muted leading-relaxed mb-4 line-clamp-2">
        {main.whyItMatters}
      </p>

      <div className="flex items-center justify-between font-mono text-[0.72rem] mb-1.5">
        <span className="text-muted">progress</span>
        <span className="text-ink tabular">{main.progress}%</span>
      </div>
      <Progress value={main.progress} />

      {main.nextAction && (
        <div className="mt-4 pt-3 border-t border-line">
          <div className="label-zed mb-1">Next action</div>
          <div className="text-[0.88rem] text-ink leading-relaxed">
            {main.nextAction}
          </div>
        </div>
      )}
    </Link>
  );
}
