import { PageHeader } from "@/components/layout/page-header";
import { ScoresOverview } from "@/components/life-progress/scores-overview";
import { CategoriesBoard } from "@/components/life-progress/categories-board";
import { ScoresDialog } from "@/components/life-progress/scores-dialog";
import { lifeCategories } from "@/lib/mock";

export default function LifeProgressPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Life Progress"
        description="The whole picture, scored and tracked over time. Click any category to read the focus and the notes you've left for yourself."
        action={<ScoresDialog categories={lifeCategories} />}
      />

      <ScoresOverview categories={lifeCategories} />
      <CategoriesBoard categories={lifeCategories} />
    </div>
  );
}
