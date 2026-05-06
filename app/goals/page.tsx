import { PageHeader } from "@/components/layout/page-header";
import { GoalsBoard } from "@/components/goals/goals-board";
import { goals } from "@/lib/mock";

export default function GoalsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Goals & Dreams"
        description="From this week to a lifetime. Click any card to open the why, the obstacles, and the lessons."
      />
      <GoalsBoard goals={goals} />
    </div>
  );
}
