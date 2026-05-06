import { Quote as QuoteIcon } from "lucide-react";
import { quoteOfTheDay } from "@/lib/mock";

export function QuoteCard() {
  const q = quoteOfTheDay();
  return (
    <div className="card-zed flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="label-zed">Reminder</div>
        <QuoteIcon className="h-3.5 w-3.5 text-muted/70" strokeWidth={1.5} />
      </div>
      <blockquote className="text-[1.05rem] leading-snug text-ink font-sans">
        &ldquo;{q.text}&rdquo;
      </blockquote>
      {q.author && (
        <div className="font-mono text-[0.72rem] text-muted/80 mt-auto">
          — {q.author}
        </div>
      )}
    </div>
  );
}
