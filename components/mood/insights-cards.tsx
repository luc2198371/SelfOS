import { ArrowUp, ArrowDown, Lightbulb } from "lucide-react";
import type { DailyCheckin } from "@/types";

interface InsightsCardsProps {
  checkins: DailyCheckin[];
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Cheap pattern surfacing — derive 3 honest sentences from the data. */
function buildInsights(checkins: DailyCheckin[]): {
  text: string;
  tone: "up" | "down" | "neutral";
}[] {
  if (checkins.length < 7) return [];
  const out: { text: string; tone: "up" | "down" | "neutral" }[] = [];

  // 1) Stress peak weekday
  const stressByDay = Array.from({ length: 7 }, () => ({ total: 0, n: 0 }));
  for (const c of checkins) {
    const d = new Date(c.date + "T00:00:00").getDay();
    stressByDay[d].total += c.stress;
    stressByDay[d].n += 1;
  }
  const stressAvg = stressByDay.map((s) =>
    s.n === 0 ? 0 : s.total / s.n
  );
  const peakStressIdx = stressAvg.indexOf(Math.max(...stressAvg));
  if (Math.max(...stressAvg) > 0) {
    out.push({
      text: `Your stress peaks on ${days[peakStressIdx]}s.`,
      tone: "down",
    });
  }

  // 2) Sleep ↔ mood directional hint
  const above7 = checkins.filter((c) => c.sleepHours >= 7);
  const below7 = checkins.filter((c) => c.sleepHours < 7);
  if (above7.length > 0 && below7.length > 0) {
    const a = above7.reduce((acc, c) => acc + c.mood, 0) / above7.length;
    const b = below7.reduce((acc, c) => acc + c.mood, 0) / below7.length;
    const diff = +(a - b).toFixed(1);
    if (Math.abs(diff) >= 0.3) {
      out.push({
        text:
          diff > 0
            ? `Your mood is ${diff} points higher when you sleep 7+ hours.`
            : `Your mood is ${Math.abs(diff)} points lower on 7+ hour nights — worth a look.`,
        tone: diff > 0 ? "up" : "down",
      });
    }
  }

  // 3) Recent trend (last 14 days vs prior 14)
  if (checkins.length >= 28) {
    const recent = checkins.slice(-14);
    const prior = checkins.slice(-28, -14);
    const recAvg =
      recent.reduce((acc, c) => acc + c.mood, 0) / recent.length;
    const priAvg = prior.reduce((acc, c) => acc + c.mood, 0) / prior.length;
    const delta = +(recAvg - priAvg).toFixed(1);
    if (Math.abs(delta) >= 0.2) {
      out.push({
        text:
          delta > 0
            ? `Mood has trended up ${delta} points in the last two weeks.`
            : `Mood has dipped ${Math.abs(delta)} points in the last two weeks.`,
        tone: delta > 0 ? "up" : "down",
      });
    }
  }

  return out;
}

export function InsightsCards({ checkins }: InsightsCardsProps) {
  const insights = buildInsights(checkins);
  if (insights.length === 0) return null;

  return (
    <div className="card-zed">
      <div className="label-zed mb-4">Patterns worth noticing</div>
      <ul className="space-y-3">
        {insights.map((i, idx) => {
          const Icon =
            i.tone === "up" ? ArrowUp : i.tone === "down" ? ArrowDown : Lightbulb;
          return (
            <li key={idx} className="flex items-start gap-3">
              <Icon
                className={
                  "h-4 w-4 mt-0.5 shrink-0 " +
                  (i.tone === "up"
                    ? "text-accent"
                    : i.tone === "down"
                      ? "text-muted"
                      : "text-muted/80")
                }
                strokeWidth={1.6}
              />
              <span className="text-ink leading-relaxed">{i.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
