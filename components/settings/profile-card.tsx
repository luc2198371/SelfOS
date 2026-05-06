import { user } from "@/lib/mock";
import { fmtLong, daysSince } from "@/lib/date";

export function ProfileCard() {
  return (
    <div className="card-zed space-y-5">
      <div className="label-zed">Profile</div>

      <div className="flex items-start gap-4">
        <div className="grid place-items-center h-12 w-12 rounded-md border border-line-strong bg-surface-2 font-mono text-[1.2rem] text-ink shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0 space-y-0.5">
          <div className="font-mono text-[1rem] text-ink leading-tight">
            {user.name}
          </div>
          <div className="font-mono text-[0.78rem] text-muted">
            tracking since {fmtLong(user.startedTracking)}
          </div>
          <div className="font-mono text-[0.78rem] text-muted">
            <span className="text-ink tabular">{daysSince(user.startedTracking)}</span>{" "}
            days · life score{" "}
            <span className="text-ink tabular">{user.lifeScore}</span>/100
          </div>
        </div>
      </div>

      {user.values.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-line">
          <div className="label-zed">Values</div>
          <ul className="space-y-1.5">
            {user.values.map((v, i) => (
              <li
                key={i}
                className="flex gap-3 text-[0.92rem] text-ink leading-relaxed"
              >
                <span className="font-mono text-muted/60 shrink-0 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
