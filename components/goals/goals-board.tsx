"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoalCard } from "./goal-card";
import { GoalDetailSheet } from "./goal-detail-sheet";
import type { Goal, GoalHorizon } from "@/types";

interface GoalsBoardProps {
  goals: Goal[];
}

const buckets: { key: GoalHorizon; label: string; help: string }[] = [
  { key: "now", label: "NOW", help: "this week / month" },
  { key: "soon", label: "SOON", help: "this year" },
  { key: "future", label: "FUTURE", help: "3 — 5 years" },
  { key: "dream", label: "DREAM", help: "lifetime" },
];

export function GoalsBoard({ goals }: GoalsBoardProps) {
  const [openGoal, setOpenGoal] = useState<Goal | null>(null);

  return (
    <>
      <div className="flex items-center justify-end mb-2">
        <Button variant="primary">
          <Plus className="h-4 w-4" /> New goal
        </Button>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {buckets.map((b) => {
          const items = goals.filter((g) => g.horizon === b.key);
          return (
            <div key={b.key} className="space-y-3">
              <div className="flex items-baseline justify-between px-1">
                <div className="font-mono text-[0.7rem] tracking-[0.2em] text-ink">
                  {b.label}
                </div>
                <div className="font-mono text-[0.66rem] text-muted/70">
                  {b.help}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="rounded-md border border-dashed border-line p-5 text-center font-mono text-[0.78rem] text-muted/70">
                    nothing yet
                  </div>
                ) : (
                  items.map((g) => (
                    <GoalCard key={g.id} goal={g} onClick={() => setOpenGoal(g)} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <GoalDetailSheet
        goal={openGoal}
        onOpenChange={(open) => !open && setOpenGoal(null)}
      />
    </>
  );
}
