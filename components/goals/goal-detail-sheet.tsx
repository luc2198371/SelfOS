"use client";

import { Calendar, Target } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { fmtLong } from "@/lib/date";
import type { Goal } from "@/types";

interface GoalDetailSheetProps {
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
}

export function GoalDetailSheet({ goal, onOpenChange }: GoalDetailSheetProps) {
  return (
    <Sheet open={!!goal} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto bg-surface"
      >
        {goal && (
          <div className="space-y-6">
            <SheetHeader>
              <div className="label-zed">{goal.horizon} · {goal.category}</div>
              <SheetTitle>{goal.title}</SheetTitle>
              <SheetDescription>
                Status: <span className="text-ink">{goal.status.replace("-", " ")}</span>
                {goal.deadline && (
                  <>
                    {" · "}deadline{" "}
                    <span className="text-ink">{fmtLong(goal.deadline)}</span>
                  </>
                )}
              </SheetDescription>
            </SheetHeader>

            {goal.kind !== "binary" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[0.78rem]">
                  <span className="label-zed">Progress</span>
                  <span className="text-ink tabular">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>
            )}

            <Section icon={Target} title="Why it matters">
              <p className="text-ink leading-relaxed">{goal.whyItMatters}</p>
            </Section>

            {goal.nextAction && (
              <Section icon={Calendar} title="Next action">
                <p className="text-ink leading-relaxed">{goal.nextAction}</p>
              </Section>
            )}

            {goal.obstacles.length > 0 && (
              <Section title="Obstacles">
                <ul className="space-y-1.5">
                  {goal.obstacles.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[0.92rem] text-ink leading-relaxed"
                    >
                      <span className="font-mono text-muted/60 shrink-0 tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {goal.lessons.length > 0 && (
              <Section title="Lessons learned">
                <ul className="space-y-2">
                  {goal.lessons.map((l, i) => (
                    <li
                      key={i}
                      className="text-[0.92rem] leading-relaxed text-muted italic border-l border-line-strong pl-3"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Separator />

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">{goal.category}</Badge>
              <Badge variant="muted">{goal.horizon}</Badge>
              <Badge variant="muted">{goal.kind}</Badge>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 label-zed">
        {Icon && <Icon className="h-3 w-3" />}
        {title}
      </div>
      {children}
    </div>
  );
}
