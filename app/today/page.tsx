import { PageHeader } from "@/components/layout/page-header";
import { TodayForm } from "@/components/today/today-form";
import { fmtLong, TODAY_ISO } from "@/lib/date";

export default function TodayPage() {
  return (
    <div className="space-y-7 max-w-5xl">
      <PageHeader
        title="Today"
        description={`${fmtLong(TODAY_ISO)}. The version of you that opens this every morning is the one this is for.`}
      />
      <TodayForm />
    </div>
  );
}
