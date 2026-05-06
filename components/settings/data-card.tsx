"use client";

import { useState } from "react";
import { Download, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DataCard() {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  async function handleExport() {
    setExporting(true);
    setExported(false);
    // Lazy-import the data so the export builder doesn't bloat the main bundle.
    const mod = await import("@/lib/mock");
    const payload = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      user: mod.user,
      dailyCheckins: mod.dailyCheckins,
      todayCheckin: mod.todayCheckin,
      habits: mod.habits,
      habitLogs: mod.habitLogs,
      goals: mod.goals,
      milestones: mod.milestones,
      journalEntries: mod.journalEntries,
      timelineEvents: mod.timelineEvents,
      lifeCategories: mod.lifeCategories,
      weeklyReviews: mod.weeklyReviews,
      futureSelfStatements: mod.futureSelfStatements,
      idealDay: mod.idealDay,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `selfos-export-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
    setExported(true);
    window.setTimeout(() => setExported(false), 2200);
  }

  return (
    <div className="card-zed space-y-5">
      <div className="label-zed">Data</div>

      <div className="space-y-3">
        <div>
          <div className="font-mono text-[0.95rem] text-ink mb-1">Export</div>
          <p className="text-[0.85rem] text-muted leading-relaxed">
            One JSON file with everything tracked here. For your records, your
            backups, or a future migration.
          </p>
        </div>
        <Button variant="primary" onClick={handleExport} disabled={exporting}>
          {exported ? (
            <>
              <Check className="h-4 w-4" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {exporting ? "Building…" : "Export everything"}
            </>
          )}
        </Button>
      </div>

      <div className="space-y-3 pt-4 border-t border-line">
        <div>
          <div className="font-mono text-[0.95rem] text-ink mb-1">Import</div>
          <p className="text-[0.85rem] text-muted leading-relaxed">
            Restore from a previous export. Available once a real persistence
            layer is wired up.
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="inline-block">
              <Button variant="secondary" disabled>
                <Upload className="h-4 w-4" />
                Import JSON
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Available when sync ships</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
