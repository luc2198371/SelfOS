"use client";

import { useState } from "react";
import { Mail, Save } from "lucide-react";
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

export function WriteLetterButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Letter to me, one year from now");
  const [body, setBody] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Mail className="h-4 w-4" />
          Write to future self
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Letter to future you</DialogTitle>
          <DialogDescription>
            Saves as a journal entry tagged{" "}
            <span className="font-mono text-ink">letter:to-future-self</span>.
            You&rsquo;ll find it again under Journal and on this page.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="The version of you reading this in a year is the same person — just on the other side of some hard thing. What do you want them to remember?"
              className="min-h-[220px] font-sans leading-relaxed"
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
            type="button"
            className="border-accent/40 text-accent hover:text-ink hover:bg-accent/10"
            onClick={() => {
              setOpen(false);
              setBody("");
            }}
          >
            <Save className="h-4 w-4" />
            Save letter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
