import type { FutureSelfStatement } from "@/types";

interface LegacyStatementProps {
  statement: FutureSelfStatement | undefined;
}

export function LegacyStatement({ statement }: LegacyStatementProps) {
  return (
    <div className="card-zed">
      <div className="label-zed mb-4">Legacy</div>
      {statement ? (
        <blockquote className="font-sans text-[1.1rem] leading-relaxed text-ink italic border-l border-line-strong pl-5 whitespace-pre-line">
          {statement.body}
        </blockquote>
      ) : (
        <p className="font-sans text-[0.92rem] text-muted italic">
          What you hope is left when you&rsquo;re not here to say it yourself.
        </p>
      )}
    </div>
  );
}
