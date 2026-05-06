import { notFound } from "next/navigation";
import { EntryView } from "@/components/journal/entry-view";
import { journalEntries } from "@/lib/mock";

export function generateStaticParams() {
  return journalEntries.map((e) => ({ id: e.id }));
}

export default function JournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = journalEntries.find((e) => e.id === params.id);
  if (!entry) notFound();
  return <EntryView entry={entry} />;
}
