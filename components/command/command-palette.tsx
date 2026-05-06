"use client";

import { useRouter } from "next/navigation";
import {
  CalendarCheck2,
  CalendarDays,
  Compass,
  FileClock,
  Flame,
  GitBranch,
  HomeIcon,
  NotebookPen,
  Plus,
  Target,
  Telescope,
  Users,
  Map as MapIcon,
  Lightbulb,
  Footprints,
  HandCoins,
  Sparkles,
  Settings,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommandPalette } from "./use-command-palette";

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const router = useRouter();

  const go = (href: string) => {
    router.push(href);
    close();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={(v) => (v ? null : close())}>
      <CommandInput placeholder="Search & jump…" />
      <CommandList>
        <CommandEmpty>Nothing here. Try “journal” or “habit”.</CommandEmpty>

        <CommandGroup heading="QUICK ACTIONS">
          <CommandItem onSelect={() => go("/today")}>
            <Plus />
            <span>Quick check-in</span>
            <CommandShortcut>⏎</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => go("/journal")}>
            <NotebookPen />
            <span>New journal entry</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/goals")}>
            <Target />
            <span>Add a goal</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/habits")}>
            <CalendarCheck2 />
            <span>Add a habit</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/timeline")}>
            <GitBranch />
            <span>Add a timeline event</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/weekly-review")}>
            <FileClock />
            <span>Open weekly review</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="JUMP TO">
          <CommandItem onSelect={() => go("/")}>
            <HomeIcon />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/today")}>
            <Flame />
            <span>Today</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/habits")}>
            <CalendarCheck2 />
            <span>Habits</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/goals")}>
            <Target />
            <span>Goals & Dreams</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/journal")}>
            <NotebookPen />
            <span>Journal</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/timeline")}>
            <GitBranch />
            <span>Life Timeline</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/weekly-review")}>
            <FileClock />
            <span>Weekly Review</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="COMING SOON">
          <CommandItem onSelect={() => go("/life-progress")}>
            <Compass />
            <span>Life Progress</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/mood")}>
            <Sparkles />
            <span>Mood & Patterns</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/skills")}>
            <Lightbulb />
            <span>Skills & Learning</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/health")}>
            <Footprints />
            <span>Health & Body</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/finance")}>
            <HandCoins />
            <span>Finance</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/relationships")}>
            <Users />
            <span>Relationships</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/travel")}>
            <MapIcon />
            <span>Travel & Memories</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/future-self")}>
            <Telescope />
            <span>Future Self</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/year-in-review")}>
            <CalendarDays />
            <span>Year in Review</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <Settings />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
