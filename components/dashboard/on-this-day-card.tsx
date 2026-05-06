import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fmtMed, TODAY_ISO } from "@/lib/date";
import { journalEntries, timelineEvents } from "@/lib/mock";

/**
 * Pulls journal entries and timeline events whose MM-DD matches today's MM-DD
 * but in earlier years. Pure derivation — no extra mock data needed.
 */
function todayMonthDay(): string {
  return TODAY_ISO.slice(5); // "MM-DD"
}

export function OnThisDayCard() {
  const md = todayMonthDay();
  const yearNow = TODAY_ISO.slice(0, 4);

  const journalMatches = journalEntries.filter(
    (e) => e.date.slice(5) === md && e.date.slice(0, 4) < yearNow
  );
  const timelineMatches = timelineEvents.filter(
    (t) => t.date.slice(5) === md && t.date.slice(0, 4) < yearNow
  );
  const hasAny = journalMatches.length + timelineMatches.length > 0;

  return (
    <div className="card-zed flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="label-zed">On this day</div>
        <Clock className="h-3.5 w-3.5 text-muted/70" strokeWidth={1.5} />
      </div>

      {!hasAny ? (
        <p className="font-sans text-[0.92rem] text-muted leading-relaxed">
          Nothing in the archive for {md} yet. The longer you keep this, the
          more this card will fill up.
        </p>
      ) : (
        <ul className="space-y-3">
          {timelineMatches.slice(0, 2).map((t) => (
            <li key={t.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge variant="default">{t.kind.replace("-", " ")}</Badge>
                <span className="font-mono text-[0.7rem] text-muted/80">
                  {fmtMed(t.date)}
                </span>
              </div>
              <Link
                href="/timeline"
                className="font-mono text-[0.92rem] text-ink hover:text-accent transition-colors leading-snug"
              >
                {t.title}
              </Link>
              <p className="text-[0.85rem] text-muted line-clamp-2 leading-relaxed">
                {t.story}
              </p>
            </li>
          ))}
          {journalMatches.slice(0, 2).map((e) => (
            <li key={e.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge variant="muted">journal</Badge>
                <span className="font-mono text-[0.7rem] text-muted/80">
                  {fmtMed(e.date)}
                </span>
              </div>
              <Link
                href={`/journal/${e.id}`}
                className="font-mono text-[0.92rem] text-ink hover:text-accent transition-colors leading-snug"
              >
                {e.title ?? `Entry from ${fmtMed(e.date)}`}
              </Link>
              <p className="text-[0.85rem] text-muted line-clamp-2 leading-relaxed">
                {e.body}
              </p>
            </li>
          ))}
          <li>
            <Link
              href="/timeline"
              className="inline-flex items-center gap-1 font-mono text-[0.78rem] text-muted hover:text-ink transition-colors"
            >
              open the archive
              <ArrowRight className="h-3 w-3" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
