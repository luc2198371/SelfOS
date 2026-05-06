import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { fmtMed } from "@/lib/date";
import type { JournalEntry } from "@/types";

interface LetterCardProps {
  label: string;
  caption: string;
  entry: JournalEntry | undefined;
  emptyText: string;
}

export function LetterCard({ label, caption, entry, emptyText }: LetterCardProps) {
  if (!entry) {
    return (
      <div className="card-zed flex flex-col gap-3 h-full">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="label-zed">{label}</div>
            <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70 mt-1">
              {caption}
            </div>
          </div>
          <Mail className="h-3.5 w-3.5 text-muted/60" strokeWidth={1.6} />
        </div>
        <p className="font-sans text-[0.92rem] text-muted italic leading-relaxed">
          {emptyText}
        </p>
      </div>
    );
  }

  const preview =
    entry.body.length > 280 ? entry.body.slice(0, 280).trimEnd() + "…" : entry.body;

  return (
    <Link
      href={`/journal/${entry.id}`}
      className="card-zed flex flex-col gap-3 h-full hover:bg-surface-2 transition-colors group"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-zed">{label}</div>
          <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70 mt-1">
            {caption} · {fmtMed(entry.date)}
          </div>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted/60 group-hover:text-accent transition-colors shrink-0" />
      </div>
      {entry.title && (
        <div className="font-mono text-[0.95rem] text-ink">{entry.title}</div>
      )}
      <p className="font-sans text-[0.92rem] leading-relaxed text-muted whitespace-pre-line line-clamp-6 group-hover:text-ink transition-colors">
        {preview}
      </p>
    </Link>
  );
}
