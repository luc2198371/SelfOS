import { ComingSoon } from "@/components/layout/coming-soon";

export default function MoodPage() {
  return (
    <ComingSoon
      title="Mood & Patterns"
      description="The shape of your inner weather, surfaced over weeks."
      bullets={[
        "Mood, energy, stress, confidence, motivation, anxiety, focus.",
        "Cross-charts: mood × sleep, stress × habits, motivation trends.",
        "Best days of the week. Repeating emotional patterns.",
      ]}
    />
  );
}
