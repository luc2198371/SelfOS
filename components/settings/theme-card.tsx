"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ThemeCard() {
  return (
    <div className="card-zed space-y-5">
      <div className="label-zed">Theme</div>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <div className="font-mono text-[0.95rem] text-ink">Dark mode</div>
          <p className="text-[0.85rem] text-muted leading-relaxed">
            The dashboard is built dark-first. Light theme will land in a future
            release — for now this toggle is locked.
          </p>
        </div>
        <Switch checked disabled className="shrink-0" />
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-line">
        <Moon className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-[0.78rem] text-ink">dark</span>
        <span className="text-muted/30">·</span>
        <Sun className="h-3.5 w-3.5 text-muted/40" />
        <span className="font-mono text-[0.78rem] text-muted/60">
          light · soon
        </span>
      </div>
    </div>
  );
}
