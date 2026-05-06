import { ComingSoon } from "@/components/layout/coming-soon";

export default function RelationshipsPage() {
  return (
    <ComingSoon
      title="Relationships"
      description="The people who matter, on your calendar — not just in your mind."
      bullets={[
        "Family, friends, mentors. Who you should check on this week.",
        "Last time you talked. Memories. Lessons each person taught you.",
        "Warm and human, not a CRM.",
      ]}
    />
  );
}
