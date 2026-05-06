import { ComingSoon } from "@/components/layout/coming-soon";

export default function FutureSelfPage() {
  return (
    <ComingSoon
      title="Future Self"
      description="The kind of person you're trying to become."
      bullets={[
        "Your 1-year, 5-year, and 10-year self. Your ideal day.",
        "Values, personal rules, dream lifestyle.",
        "Letter to your future self. Letter from your past self. Legacy statement.",
      ]}
    />
  );
}
