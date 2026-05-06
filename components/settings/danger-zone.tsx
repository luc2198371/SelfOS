"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DangerZone() {
  return (
    <div className="card-zed space-y-4">
      <div className="flex items-center gap-2">
        <TriangleAlert className="h-3.5 w-3.5 text-muted" strokeWidth={1.6} />
        <span className="label-zed">Danger zone</span>
      </div>

      <div>
        <div className="font-mono text-[0.95rem] text-ink mb-1">
          Clear all data
        </div>
        <p className="text-[0.85rem] text-muted leading-relaxed">
          Wipes every entry, habit, goal, journal — everything. There is no
          undo. Locked until persistence ships, since right now there is
          nothing to clear.
        </p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0} className="inline-block">
            <Button variant="destructive" disabled>
              Clear all data
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>Available when sync ships</TooltipContent>
      </Tooltip>
    </div>
  );
}
