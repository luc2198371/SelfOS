"use client";

import { useState } from "react";
import {
  Award,
  Compass,
  Flag,
  Footprints,
  Lightbulb,
  Map as MapIcon,
  MoveRight,
  Plus,
  TrendingDown,
  Users,
  Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TimelineEvent, TimelineEventKind } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { fmtLong, fmtMed, fmtYear } from "@/lib/date";

const iconForKind: Record<TimelineEventKind, LucideIcon> = {
  achievement: Award,
  failure: TrendingDown,
  lesson: Lightbulb,
  place: MapIcon,
  person: Users,
  decision: MoveRight,
  "turning-point": Compass,
  travel: Plane,
  milestone: Flag,
};

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [open, setOpen] = useState<TimelineEvent | null>(null);

  // Group by year, newest first
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const byYear: Record<string, TimelineEvent[]> = {};
  for (const e of sorted) {
    const y = fmtYear(e.date);
    byYear[y] ??= [];
    byYear[y].push(e);
  }

  return (
    <>
      <div className="flex items-center justify-end mb-2">
        <Button variant="primary">
          <Plus className="h-4 w-4" /> Add event
        </Button>
      </div>

      <div className="relative pl-7 sm:pl-9">
        {/* Vertical rail */}
        <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-line" />

        <div className="space-y-10">
          {Object.entries(byYear).map(([year, items]) => (
            <section key={year}>
              <div className="relative -ml-7 sm:-ml-9 mb-4 flex items-center gap-3">
                <div className="grid place-items-center h-5 w-5 sm:h-6 sm:w-6 rounded-sm border border-line-strong bg-bg ml-0.5 sm:ml-0">
                  <Footprints
                    className="h-3 w-3 text-muted"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="font-mono text-[1.05rem] tracking-tight text-ink">
                  {year}
                </div>
                <div className="flex-1 h-px bg-line" />
                <span className="font-mono text-[0.66rem] text-muted/70 uppercase tracking-wider">
                  {items.length} event{items.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((e) => {
                  const Icon = iconForKind[e.kind];
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setOpen(e)}
                      className="card-zed w-full text-left hover:bg-surface-2 transition-colors group relative"
                    >
                      {/* Node */}
                      <div className="absolute -left-7 sm:-left-9 top-7 grid place-items-center h-5 w-5 rounded-sm border border-line-strong bg-bg">
                        <Icon
                          className="h-3 w-3 text-muted group-hover:text-accent transition-colors"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[0.7rem] text-muted/80">
                              {fmtMed(e.date)}
                            </span>
                            <Badge variant="default">{e.kind.replace("-", " ")}</Badge>
                          </div>
                          <div className="font-mono text-[1rem] text-ink leading-snug">
                            {e.title}
                          </div>
                          <p className="text-[0.92rem] text-muted leading-relaxed line-clamp-2">
                            {e.story}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto bg-surface"
        >
          {open && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="label-zed">{open.kind.replace("-", " ")}</div>
                <SheetTitle>{open.title}</SheetTitle>
                <SheetDescription>{fmtLong(open.date)}</SheetDescription>
              </SheetHeader>

              <div className="space-y-2">
                <div className="label-zed">Story</div>
                <p className="text-ink leading-relaxed whitespace-pre-line">
                  {open.story}
                </p>
              </div>

              {open.lesson && (
                <div className="space-y-2">
                  <div className="label-zed">Lesson</div>
                  <p className="text-ink leading-relaxed italic border-l border-line-strong pl-3">
                    {open.lesson}
                  </p>
                </div>
              )}

              {open.howItChangedMe && (
                <div className="space-y-2">
                  <div className="label-zed">How it changed me</div>
                  <p className="text-ink leading-relaxed">
                    {open.howItChangedMe}
                  </p>
                </div>
              )}

              {/* Photo placeholder */}
              <div className="rounded-md border border-dashed border-line aspect-[16/10] grid place-items-center text-muted/60 font-mono text-[0.78rem]">
                [photo placeholder]
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
