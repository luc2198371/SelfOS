import { PageHeader } from "@/components/layout/page-header";
import { HabitRow } from "@/components/habits/habit-row";
import { MonthlyHeatmap } from "@/components/habits/monthly-heatmap";
import { InsightsCard } from "@/components/habits/insights-card";
import { NewHabitButton } from "@/components/habits/new-habit-button";
import { habits, habitLogs } from "@/lib/mock";

export default function HabitsPage() {
  const active = habits.filter((h) => !h.archivedAt);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Habits"
        description="The small choices, repeated. The streaks are not the point — the person you become while keeping them is."
        action={<NewHabitButton />}
      />

      <div className="card-zed p-0 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[minmax(0,1.5fr)_auto_auto_auto] items-center gap-3 sm:gap-5 py-2.5 px-3 sm:px-4 border-b border-line">
          <div className="label-zed">Habit</div>
          <div className="label-zed hidden sm:block">Last 7 days</div>
          <div className="label-zed text-right hidden sm:block">30d</div>
          <div className="label-zed text-right">Streak</div>
        </div>
        <div className="divide-y divide-line">
          {active.map((h) => (
            <HabitRow key={h.id} habit={h} logs={habitLogs} />
          ))}
        </div>
      </div>

      <section className="grid gap-3 lg:grid-cols-2">
        <MonthlyHeatmap />
        <InsightsCard />
      </section>
    </div>
  );
}
