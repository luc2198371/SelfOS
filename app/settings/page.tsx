import { PageHeader } from "@/components/layout/page-header";
import { ProfileCard } from "@/components/settings/profile-card";
import { ThemeCard } from "@/components/settings/theme-card";
import { DataCard } from "@/components/settings/data-card";
import { DangerZone } from "@/components/settings/danger-zone";

export default function SettingsPage() {
  return (
    <div className="space-y-7 max-w-3xl">
      <PageHeader
        title="Settings"
        description="The few knobs worth keeping. Profile, theme, data, and the door marked don't push."
      />

      <ProfileCard />
      <ThemeCard />
      <DataCard />
      <DangerZone />
    </div>
  );
}
