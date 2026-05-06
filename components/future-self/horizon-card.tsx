import { fmtMed } from "@/lib/date";
import type { FutureSelfStatement } from "@/types";

interface HorizonCardProps {
  label: string;
  caption: string;
  statement: FutureSelfStatement | undefined;
}

export function HorizonCard({ label, caption, statement }: HorizonCardProps) {
  return (
    <div className="card-zed flex flex-col gap-3 h-full">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-zed">{label}</div>
          <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70 mt-1">
            {caption}
          </div>
        </div>
        {statement && (
          <span className="font-mono text-[0.66rem] text-muted/70">
            {fmtMed(statement.updatedAt.slice(0, 10))}
          </span>
        )}
      </div>
      {statement ? (
        <p className="font-sans text-[0.95rem] leading-relaxed text-ink whitespace-pre-line">
          {statement.body}
        </p>
      ) : (
        <p className="font-sans text-[0.92rem] leading-relaxed text-muted italic">
          Nothing here yet. Use the cyan button to start writing.
        </p>
      )}
    </div>
  );
}
