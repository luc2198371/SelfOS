import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalEntries } from "@/lib/mock";
import { fmtMed } from "@/lib/date";
import { Badge } from "@/components/ui/badge";

export function JournalPreviewCard() {
  const latest = journalEntries[0];
  if (!latest) return null;

  const preview =
    latest.body.length > 220 ? latest.body.slice(0, 220).trimEnd() + "…" : latest.body;

  return (
    <Link
      href={`/journal/${latest.id}`}
      className="card-zed group block hover:bg-surface-2 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="label-zed">Latest journal</div>
        <ArrowRight className="h-3.5 w-3.5 text-muted/60 group-hover:text-accent transition-colors" />
      </div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="font-mono text-[0.72rem] text-muted">
          {fmtMed(latest.date)}
        </span>
        <Badge variant="muted">{latest.mood}</Badge>
        {latest.tags.slice(0, 2).map((t) => (
          <Badge key={t} variant="default">
            #{t}
          </Badge>
        ))}
      </div>
      {latest.title && (
        <div className="font-mono text-[1rem] text-ink mb-2">{latest.title}</div>
      )}
      <p className="text-[0.92rem] leading-relaxed text-muted line-clamp-4 whitespace-pre-line">
        {preview}
      </p>
    </Link>
  );
}
