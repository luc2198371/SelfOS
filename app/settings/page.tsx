import { ComingSoon } from "@/components/layout/coming-soon";

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      description="The few knobs worth keeping — name, theme, export."
      bullets={[
        "Name, optional avatar.",
        "Dark / light theme toggle (dark is the default).",
        "Export everything as JSON whenever you want.",
      ]}
    />
  );
}
