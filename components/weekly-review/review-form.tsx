"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { thisMonday, fmtLong, toISODate } from "@/lib/date";

const QUESTIONS: { key: string; question: string; placeholder?: string }[] = [
  {
    key: "wentWell",
    question: "What went well this week?",
    placeholder: "Specific is better. Even one line is enough.",
  },
  {
    key: "wentWrong",
    question: "What went wrong?",
    placeholder: "No defending. Just the honest version.",
  },
  {
    key: "learned",
    question: "What did I learn?",
    placeholder: "The kind of thing you'd want to find again next year.",
  },
  {
    key: "hardestHabit",
    question: "What habit was hardest?",
    placeholder: "And the smallest thing that would have helped.",
  },
  {
    key: "proudOf",
    question: "What am I proud of?",
    placeholder: "It can be quiet and small.",
  },
  {
    key: "improveNextWeek",
    question: "What should I improve next week?",
    placeholder: "One thing. Smaller than you think.",
  },
  {
    key: "nextWeekFocus",
    question: "What is my main focus next week?",
    placeholder: "If you can only do one thing, this is it.",
  },
];

export function ReviewForm() {
  const monday = thisMonday();
  const [vals, setVals] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function update(k: string, v: string) {
    setVals((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  }

  return (
    <div className="card-zed space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="label-zed">Week of</div>
          <div className="font-mono text-[0.95rem] text-ink">
            {fmtLong(toISODate(monday))}
          </div>
        </div>
        <span className="font-mono text-[0.66rem] text-muted/70 uppercase tracking-wider">
          7 questions
        </span>
      </div>

      <div className="space-y-5">
        {QUESTIONS.map((q, i) => (
          <div key={q.key} className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.7rem] tabular text-muted/60 mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Label className="font-sans font-normal text-[0.95rem] text-ink normal-case tracking-normal">
                {q.question}
              </Label>
            </div>
            <Textarea
              value={vals[q.key] ?? ""}
              onChange={(e) => update(q.key, e.target.value)}
              placeholder={q.placeholder}
              className="min-h-[80px] border-line ml-0 sm:ml-7"
            />
          </div>
        ))}
      </div>

      <div className="divider-zed pt-5 flex items-center justify-between gap-3">
        <div className="font-mono text-[0.78rem] text-muted">
          {saved ? "Saved." : "Autosaves while you type."}
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2200);
          }}
        >
          <Save className="h-4 w-4" />
          Save review
        </Button>
      </div>
    </div>
  );
}
