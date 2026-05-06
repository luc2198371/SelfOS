import Link from "next/link";
import { ArrowUpRight, BatteryMedium, HeartPulse, Smile, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { MetricWithSparkline } from "@/components/mood/metric-with-sparkline";
import { MoodTrendChart } from "@/components/mood/mood-trend-chart";
import { EnergyBySleepChart } from "@/components/mood/energy-by-sleep-chart";
import { BestDaysChart } from "@/components/mood/best-days-chart";
import { InsightsCards } from "@/components/mood/insights-cards";
import { dailyCheckins } from "@/lib/mock";

const moodLabel: Record<number, string> = {
  1: "Low",
  2: "Meh",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export default function MoodPage() {
  // Last 7 + 42 days (mock has 42)
  const last7 = dailyCheckins.slice(-7);
  const all = dailyCheckins;

  const avg = (arr: number[]) =>
    arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

  const moodSpark = last7.map((c) => ({ value: c.mood }));
  const energySpark = last7.map((c) => ({ value: c.energy }));
  const stressSpark = last7.map((c) => ({ value: c.stress }));
  const focusSpark = last7.map((c) => ({ value: c.focus }));

  const latest = dailyCheckins[dailyCheckins.length - 1];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Mood & Patterns"
        description="The shape of your inner weather, seen across weeks. The numbers are honest in a way memory isn't."
        action={
          <Button asChild variant="primary">
            <Link href="/today">
              Today&rsquo;s check-in
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <section className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <MetricWithSparkline
          label="Mood now"
          value={moodLabel[latest.mood]}
          hint="last 7 days"
          icon={Smile}
          trend={moodSpark}
          yDomain={[1, 5]}
        />
        <MetricWithSparkline
          label="Energy"
          value={avg(last7.map((c) => c.energy)).toFixed(1)}
          unit="/10"
          hint="last 7 days"
          icon={BatteryMedium}
          trend={energySpark}
          yDomain={[0, 10]}
        />
        <MetricWithSparkline
          label="Stress"
          value={avg(last7.map((c) => c.stress)).toFixed(1)}
          unit="/10"
          hint="last 7 days"
          icon={HeartPulse}
          trend={stressSpark}
          yDomain={[0, 10]}
        />
        <MetricWithSparkline
          label="Focus"
          value={avg(last7.map((c) => c.focus)).toFixed(1)}
          unit="/10"
          hint="last 7 days"
          icon={Target}
          trend={focusSpark}
          yDomain={[0, 10]}
        />
      </section>

      <MoodTrendChart checkins={all} />

      <section className="grid gap-3 lg:grid-cols-2">
        <EnergyBySleepChart checkins={all} />
        <BestDaysChart checkins={all} />
      </section>

      <InsightsCards checkins={all} />
    </div>
  );
}
