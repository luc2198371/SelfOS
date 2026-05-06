import { ComingSoon } from "@/components/layout/coming-soon";

export default function HealthPage() {
  return (
    <ComingSoon
      title="Health & Body"
      description="Awareness without obsession. The body as base layer."
      bullets={[
        "Weight, workouts, steps, sleep, water, meals, body measurements.",
        "Personal records and a quiet record of how the body is feeling.",
        "Charts that show trends, not numbers in isolation.",
      ]}
    />
  );
}
