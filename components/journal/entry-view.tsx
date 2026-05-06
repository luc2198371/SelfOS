import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import type { JournalEntry } from "@/types";
import { Badge } from "@/components/ui/badge";
import { fmtLong, fmtTime } from "@/lib/date";

interface EntryViewProps {
  entry: JournalEntry;
}

export function EntryView({ entry }: EntryViewProps) {
  const lines = entry.body.split("\n");

  return (
    <article className="space-y-7">
      <Link
        href="/journal"
        className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-3 w-3" /> back to journal
      </Link>

      <header className="space-y-3 max-w-3xl">
        <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 flex items-center gap-2">
          {fmtLong(entry.date)}
          <span className="text-muted/30">·</span>
          {fmtTime(entry.createdAt)}
          {entry.favorite && (
            <>
              <span className="text-muted/30">·</span>
              <span className="inline-flex items-center gap-1 text-accent">
                <Star className="h-3 w-3" fill="currentColor" strokeWidth={1} />
                favorite
              </span>
            </>
          )}
        </div>
        {entry.title && (
          <h1 className="font-mono text-h1 text-ink leading-tight">
            {entry.title}
          </h1>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="muted">{entry.mood}</Badge>
          {entry.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[0.7rem] text-muted/80 uppercase tracking-wider"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Editor-style line-numbered body */}
      <div className="card-zed max-w-3xl p-0 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr] gap-0">
          <div
            aria-hidden
            className="select-none text-right py-6 pl-5 pr-3 border-r border-line bg-bg/40"
          >
            {lines.map((_, i) => (
              <div
                key={i}
                className="font-mono text-[0.7rem] tabular text-muted/40 leading-[1.7]"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div className="py-6 px-5">
            {lines.map((line, i) => (
              <p
                key={i}
                className="font-sans text-[0.98rem] leading-[1.7] text-ink whitespace-pre-wrap"
              >
                {line || " "}
              </p>
            ))}
          </div>
        </div>
      </div>

      {entry.prompts && entry.prompts.length > 0 && (
        <div className="card-zed max-w-3xl space-y-4">
          <div className="label-zed">Answered prompts</div>
          {entry.prompts.map((p, i) => (
            <div key={i} className="space-y-1">
              <div className="font-sans text-[0.88rem] italic text-muted">
                {p.question}
              </div>
              <div className="font-sans text-[0.95rem] text-ink leading-relaxed">
                {p.answer}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
