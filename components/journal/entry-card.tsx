import Link from "next/link";
import { Star } from "lucide-react";
import type { JournalEntry } from "@/types";
import { Badge } from "@/components/ui/badge";
import { fmtMed } from "@/lib/date";
import { cn } from "@/lib/utils";

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const preview =
    entry.body.length > 180
      ? entry.body.slice(0, 180).trimEnd() + "…"
      : entry.body;

  return (
    <Link
      href={`/journal/${entry.id}`}
      className="card-zed block hover:bg-surface-2 transition-colors group"
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="font-mono text-[0.72rem] text-muted">
          {fmtMed(entry.date)}
        </span>
        <div className="flex items-center gap-1.5">
          {entry.favorite && (
            <Star
              className="h-3 w-3 text-accent"
              fill="currentColor"
              strokeWidth={1}
            />
          )}
          <Badge variant="muted">{entry.mood}</Badge>
        </div>
      </div>

      {entry.title && (
        <div className="font-mono text-[1rem] text-ink leading-snug mb-2 line-clamp-1">
          {entry.title}
        </div>
      )}

      <p
        className={cn(
          "text-[0.92rem] leading-relaxed text-muted line-clamp-3 whitespace-pre-line",
          "group-hover:text-ink transition-colors"
        )}
      >
        {preview}
      </p>

      {entry.tags.length > 0 && (
        <div className="flex items-center gap-1 mt-3 flex-wrap">
          {entry.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[0.66rem] text-muted/80 uppercase tracking-wider"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
