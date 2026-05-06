import { ComingSoon } from "@/components/layout/coming-soon";

export default function FinancePage() {
  return (
    <ComingSoon
      title="Finance"
      description="Quiet, automated, unanxious. The fewest numbers that matter."
      bullets={[
        "Income, spending, saving, debt, investments, monthly budget.",
        "Emergency fund target. Worth-it purchases. Regret purchases.",
        "Privacy-first. The numbers are for you, no one else.",
      ]}
    />
  );
}
