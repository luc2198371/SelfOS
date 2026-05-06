import { ComingSoon } from "@/components/layout/coming-soon";

export default function TravelPage() {
  return (
    <ComingSoon
      title="Travel & Memories"
      description="Places, photos, and the quiet things you don't want to forget."
      bullets={[
        "Countries visited, cities lived in, favorite places.",
        "Trips planned and the bucket list you actually mean.",
        "“On this day” memories — what you wrote a year ago today.",
      ]}
    />
  );
}
