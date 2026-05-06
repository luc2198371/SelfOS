"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewHabitButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [cadence, setCadence] = useState<"daily" | "weekdays" | "n">("daily");
  const [n, setN] = useState(3);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Plus className="h-4 w-4" />
          New habit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New habit</DialogTitle>
          <DialogDescription>
            Pick something small. The smaller, the more it sticks.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Habit</Label>
            <Input
              autoFocus
              placeholder="e.g. Read 10 pages"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Cadence</Label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["daily", "Every day"],
                  ["weekdays", "Weekdays"],
                  ["n", "N×/week"],
                ] as const
              ).map(([k, lbl]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setCadence(k)}
                  className={`h-9 rounded-md border font-mono text-[0.78rem] transition-colors ${
                    cadence === k
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-line text-muted hover:text-ink hover:bg-surface-2"
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
          {cadence === "n" && (
            <div className="space-y-2">
              <Label>How many days a week?</Label>
              <Input
                type="number"
                min={1}
                max={7}
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 1)}
                className="font-mono w-24"
              />
            </div>
          )}
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
            onClick={() => {
              setOpen(false);
              setName("");
            }}
            type="button"
            className="border-accent/40 text-accent hover:text-ink hover:bg-accent/10"
          >
            Save habit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
