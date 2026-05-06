"use client";

import { useState } from "react";
import { Sliders, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { LifeCategory } from "@/types";

interface ScoresDialogProps {
  categories: LifeCategory[];
}

export function ScoresDialog({ categories }: ScoresDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.key, c.currentScore]))
  );
  const [saved, setSaved] = useState(false);

  function set(k: string, v: number) {
    setValues((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Sliders className="h-4 w-4" /> Update scores
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Update scores</DialogTitle>
          <DialogDescription>
            How does each part of your life feel right now? 1 is grim, 10 is the
            best version. Don&rsquo;t overthink it — first instinct usually has it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {categories.map((c) => (
            <div key={c.key} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.85rem] text-ink">
                  {c.label}
                </span>
                <span className="font-mono text-[0.82rem] text-ink tabular">
                  {values[c.key].toFixed(1)}
                  <span className="text-muted ml-1">/ 10</span>
                </span>
              </div>
              <Slider
                value={[values[c.key]]}
                onValueChange={(v) => set(c.key, v[0] ?? 0)}
                min={0}
                max={10}
                step={0.5}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="border-accent/40 text-accent hover:text-ink hover:bg-accent/10"
            onClick={() => {
              setSaved(true);
              window.setTimeout(() => {
                setOpen(false);
                setSaved(false);
              }, 800);
            }}
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved" : "Save scores"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
