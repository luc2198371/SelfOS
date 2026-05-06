"use client";

import { ChevronRight, CircleDot, CircleDashed, CircleCheck, Pause } from "lucide-react";
import type { Goal } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fmtMed } from "@/lib/date";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "card-zed text-left w-full hover:bg-surface-2 transition-colors group",
        "flex flex-col gap-3"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <StatusIcon status={goal.status} />
          <div className="font-mono text-[0.95rem] leading-snug text-ink line-clamp-2">
            {goal.title}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted/60 group-hover:text-ink transition-colors shrink-0" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="default">{goal.category}</Badge>
        {goal.deadline && (
          <span className="font-mono text-[0.7rem] text-muted/80">
            {fmtMed(goal.deadline)}
          </span>
        )}
      </div>

      {goal.kind !== "binary" && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[0.7rem]">
            <span className="text-muted">progress</span>
            <span className="text-ink tabular">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} />
        </div>
      )}

      {goal.nextAction && (
        <div className="font-sans text-[0.85rem] text-muted line-clamp-2 leading-relaxed">
          ↳ {goal.nextAction}
        </div>
      )}
    </button>
  );
}

function StatusIcon({ status }: { status: Goal["status"] }) {
  const cls = "h-4 w-4 mt-0.5 shrink-0";
  switch (status) {
    case "completed":
      return <CircleCheck className={cn(cls, "text-accent")} />;
    case "in-progress":
      return <CircleDot className={cn(cls, "text-accent")} />;
    case "paused":
      return <Pause className={cn(cls, "text-muted")} />;
    default:
      return <CircleDashed className={cn(cls, "text-muted")} />;
  }
}
