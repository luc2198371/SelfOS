import { ComingSoon } from "@/components/layout/coming-soon";

export default function LifeProgressPage() {
  return (
    <ComingSoon
      title="Life Progress"
      description="Ten life categories, scored, charted, and noted over time."
      bullets={[
        "Health, Career, Money, Knowledge, Discipline, Relationships, Mindset, Faith, Creativity, Adventure.",
        "Each category: current score / goal score / current focus / charted history.",
        "Improvement notes you actually want to reread.",
      ]}
    />
  );
}
