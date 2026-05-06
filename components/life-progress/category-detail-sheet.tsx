"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ZedLineChart } from "@/components/charts/line-chart";
import { fmtMed } from "@/lib/date";
import type { LifeCategory } from "@/types";

interface CategoryDetailSheetProps {
  category: LifeCategory | null;
  onOpenChange: (open: boolean) => void;
}

export function CategoryDetailSheet({
  category,
  onOpenChange,
}: CategoryDetailSheetProps) {
  return (
    <Sheet open={!!category} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto bg-surface"
      >
        {category && (
          <div className="space-y-6">
            <SheetHeader>
              <div className="label-zed">{category.label}</div>
              <SheetTitle>
                {category.currentScore.toFixed(1)}
                <span className="text-muted text-[1rem] ml-1">
                  / {category.goalScore.toFixed(1)}
                </span>
              </SheetTitle>
              <SheetDescription>{category.description}</SheetDescription>
            </SheetHeader>

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[0.72rem]">
                <span className="label-zed">Toward goal</span>
                <span className="text-ink tabular">
                  {Math.round((category.currentScore / category.goalScore) * 100)}%
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  Math.round((category.currentScore / category.goalScore) * 100)
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="label-zed">Last 12 weeks</div>
              <div className="card-zed p-4">
                <ZedLineChart
                  data={category.history.map((h) => ({
                    label: fmtMed(h.date),
                    value: h.score,
                  }))}
                  height={160}
                  yDomain={[0, 10]}
                  showXAxis={false}
                  showYAxis
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="label-zed">Current focus</div>
              <p className="text-ink leading-relaxed">{category.currentFocus}</p>
            </div>

            {category.improvementNotes.length > 0 && (
              <div className="space-y-2">
                <div className="label-zed">Improvement notes</div>
                <ul className="space-y-1.5">
                  {category.improvementNotes.map((n, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[0.92rem] text-ink leading-relaxed"
                    >
                      <span className="font-mono text-muted/60 shrink-0 tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
