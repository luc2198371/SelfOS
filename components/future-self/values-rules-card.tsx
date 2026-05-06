interface ValuesRulesCardProps {
  label: string;
  caption: string;
  items: string[];
}

export function ValuesRulesCard({ label, caption, items }: ValuesRulesCardProps) {
  return (
    <div className="card-zed">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="label-zed">{label}</div>
          <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70 mt-1">
            {caption}
          </div>
        </div>
        <span className="font-mono text-[0.66rem] text-muted/70 tabular">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="font-sans text-[0.92rem] text-muted italic">
          Nothing written here yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[0.92rem] text-ink leading-relaxed"
            >
              <span className="font-mono text-muted/60 shrink-0 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
