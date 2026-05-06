import { PageHeader } from "@/components/layout/page-header";
import { JournalList } from "@/components/journal/journal-list";
import { NewEntryButton } from "@/components/journal/new-entry-button";
import { journalEntries } from "@/lib/mock";

export default function JournalPage() {
  const sorted = [...journalEntries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return (
    <div className="space-y-7">
      <PageHeader
        title="Journal"
        description="What you actually thought, in your own words. The most honest data this app collects."
        action={<NewEntryButton />}
      />
      <JournalList entries={sorted} />
    </div>
  );
}
