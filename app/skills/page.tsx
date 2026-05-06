import { ComingSoon } from "@/components/layout/coming-soon";

export default function SkillsPage() {
  return (
    <ComingSoon
      title="Skills & Learning"
      description="What you're learning, what you've mastered, what you want to."
      bullets={[
        "Skills with current and target levels, practice hours, resources.",
        "Books read, courses completed, projects built, certifications earned.",
        "Notes you actually want to reread.",
      ]}
    />
  );
}
