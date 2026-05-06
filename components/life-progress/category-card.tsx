"use client";

import { ChevronRight } from "lucide-react";
import type { LifeCategory } from "@/types";
import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: LifeCategory;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const gap = +(category.goalScore - category.currentScore).toFixed(1);
  const sparkData = category.history.map((h) => ({ value: h.score }));

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
        <div className="space-y-0.5 min-w-0">
          <div className="label-zed">{category.label}</div>
          <p className="text-[0.78rem] text-muted leading-snug line-clamp-2">
            {category.description}
          </p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-muted/60 group-hover:text-ink transition-colors shrink-0 mt-1" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="stat-zed text-[1.8rem] leading-none">
          {category.currentScore.toFixed(1)}
        </span>
        <span className="font-mono text-[0.78rem] text-muted">
          / {category.goalScore.toFixed(1)}
        </span>
        <span
          className={cn(
            "ml-auto font-mono text-[0.66rem] uppercase tracking-wider",
            gap <= 0 ? "text-accent" : "text-muted/70"
          )}
        >
          {gap <= 0 ? "on track" : `+${gap.toFixed(1)} to go`}
        </span>
      </div>

      <Sparkline data={sparkData} height={28} yDomain={[0, 10]} />

      {category.currentFocus && (
        <div className="font-sans text-[0.85rem] text-muted leading-relaxed line-clamp-2 pt-1 border-t border-line">
          ↳ {category.currentFocus}
        </div>
      )}
    </button>
  );
}
