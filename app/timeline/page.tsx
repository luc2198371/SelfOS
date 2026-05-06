import { PageHeader } from "@/components/layout/page-header";
import { Timeline } from "@/components/timeline/timeline";
import { timelineEvents } from "@/lib/mock";

export default function TimelinePage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Life Timeline"
        description="The story so far. Achievements, failures, places, people, decisions, lessons. Click any moment to read it again."
      />
      <Timeline events={timelineEvents} />
    </div>
  );
}
