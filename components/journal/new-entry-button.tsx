"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { journalPrompts } from "@/lib/mock";

export function NewEntryButton() {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [promptIdx, setPromptIdx] = useState(0);

  const prompt = useMemo(() => journalPrompts[promptIdx], [promptIdx]);

  // Cycle the prompt every time the dialog reopens
  useEffect(() => {
    if (open) setPromptIdx((i) => (i + 1) % journalPrompts.length);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Plus className="h-4 w-4" /> New entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New entry</DialogTitle>
          <DialogDescription>
            For you. Nothing leaves this device in the MVP.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-line bg-surface-2/40 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
                Prompt
              </span>
              <button
                type="button"
                onClick={() =>
                  setPromptIdx((i) => (i + 1) % journalPrompts.length)
                }
                className="text-muted hover:text-ink transition-colors"
                aria-label="New prompt"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
            <div className="font-sans text-[0.95rem] text-ink italic">
              {prompt}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Title (optional)</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A line you'd remember by"
            />
          </div>

          <div className="space-y-2">
            <Label>Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the honest thing first. Edit later — or don't."
              className="min-h-[180px] font-sans leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. morning, work, family"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            type="button"
          >
            Discard
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
              setBody("");
              setTitle("");
              setTags("");
            }}
            type="button"
            className="border-accent/40 text-accent hover:text-ink hover:bg-accent/10"
          >
            Save entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
