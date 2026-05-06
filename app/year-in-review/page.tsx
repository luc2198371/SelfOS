import { ComingSoon } from "@/components/layout/coming-soon";

export default function YearInReviewPage() {
  return (
    <ComingSoon
      title="Year in Review"
      description="The honest account of a year, auto-generated from your data."
      bullets={[
        "Best moments and hardest moments. Biggest lessons.",
        "Books, music, films of the year. Goals completed.",
        "How you changed. What you want next year to be about.",
      ]}
    />
  );
}
