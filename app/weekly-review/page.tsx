import { PageHeader } from "@/components/layout/page-header";
import { ReviewForm } from "@/components/weekly-review/review-form";
import { PastReviews } from "@/components/weekly-review/past-reviews";
import { weeklyReviews } from "@/lib/mock";

export default function WeeklyReviewPage() {
  return (
    <div className="space-y-7 max-w-4xl">
      <PageHeader
        title="Weekly Review"
        description="Seven questions, every Sunday. Even two-sentence answers count. The point is the showing up."
      />
      <ReviewForm />
      <PastReviews reviews={weeklyReviews} />
    </div>
  );
}
