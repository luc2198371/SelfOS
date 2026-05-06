import {
  BatteryMedium,
  Compass,
  Flame,
  Smile,
} from "lucide-react";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MainGoalCard } from "@/components/dashboard/main-goal-card";
import { JournalPreviewCard } from "@/components/dashboard/journal-preview-card";
import { NextMilestoneCard } from "@/components/dashboard/next-milestone-card";
import { QuoteCard } from "@/components/dashboard/quote-card";
import { StreakCells } from "@/components/dashboard/streak-cells";
import { WeeklyProgressCard } from "@/components/dashboard/weekly-progress-card";
import { RadialProgress } from "@/components/charts/radial-progress";
import { user, todayCheckin, habits, habitLogs } from "@/lib/mock";
import { todayCompletionPct } from "@/lib/streak";

const moodLabel: Record<number, string> = {
  1: "Low",
  2: "Meh",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export default function DashboardPage() {
  const { done, scheduled, pct } = todayCompletionPct(habits, habitLogs);

  return (
    <div className="space-y-7">
      <WelcomeCard />

      {/* Headline metrics */}
      <section className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Mood"
          value={moodLabel[todayCheckin.mood]}
          hint={`${todayCheckin.mood} of 5`}
          icon={Smile}
        />
        <MetricCard
          label="Energy"
          value={todayCheckin.energy}
          unit="/10"
          hint={`Sleep · ${todayCheckin.sleepHours}h`}
          icon={BatteryMedium}
        />
        <MetricCard
          label="Habits today"
          value={`${pct}`}
          unit="%"
          hint={`${done}/${scheduled} scheduled`}
          icon={Flame}
        />
        <MetricCard
          label="Life score"
          value={user.lifeScore}
          unit="/100"
          hint="rolling 30-day index"
          icon={Compass}
        />
      </section>

      {/* Primary row */}
      <section className="grid gap-3 lg:grid-cols-3">
        {/* Life score ring */}
        <div className="card-zed flex flex-col items-center justify-center text-center gap-3 lg:col-span-1">
          <div className="label-zed self-start">How life is going</div>
          <div className="py-1">
            <RadialProgress
              value={user.lifeScore}
              size={172}
              thickness={6}
              label="life score"
              sublabel="0 — 100"
            />
          </div>
          <p className="text-[0.85rem] text-muted leading-relaxed max-w-xs">
            A weighted blend of your last 30 days of mood, energy, habits, and
            momentum on goals.
          </p>
        </div>

        <MainGoalCard />

        <div className="space-y-3 lg:col-span-1">
          <NextMilestoneCard />
          <QuoteCard />
        </div>
      </section>

      {/* Secondary row */}
      <section className="grid gap-3 lg:grid-cols-2">
        <WeeklyProgressCard />
        <StreakCells days={28} />
      </section>

      {/* Journal preview */}
      <section className="grid gap-3">
        <JournalPreviewCard />
      </section>
    </div>
  );
}
