"use client";

import { useState } from "react";
import {
  BookOpen,
  Check,
  Droplets,
  Dumbbell,
  HeartPulse,
  Moon,
  Save,
  Smile,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { todayCheckin, habits } from "@/lib/mock";
import { todayChecklistHabitIds, todayCheckState } from "@/lib/mock/habit-logs";
import { cn } from "@/lib/utils";

const moodLabels = ["Low", "Meh", "Okay", "Good", "Great"] as const;

export function TodayForm() {
  // All state is local — persistence is v2.0
  const [mood, setMood] = useState<number>(todayCheckin.mood);
  const [energy, setEnergy] = useState<number>(todayCheckin.energy);
  const [stress, setStress] = useState<number>(todayCheckin.stress);
  const [focus, setFocus] = useState<number>(todayCheckin.focus);
  const [sleepHours, setSleepHours] = useState<number>(todayCheckin.sleepHours);
  const [waterCups, setWaterCups] = useState<number>(todayCheckin.waterCups);
  const [workoutMinutes, setWorkoutMinutes] = useState<number>(0);
  const [readingMinutes, setReadingMinutes] = useState<number>(20);
  const [tasks, setTasks] = useState(todayCheckin.topTasks);
  const [habitDone, setHabitDone] = useState<Record<string, boolean>>(
    todayCheckState()
  );
  const [mainGoal, setMainGoal] = useState<string>(
    todayCheckin.mainGoalForDay ?? ""
  );
  const [gratitude, setGratitude] = useState<string>("");
  const [learned, setLearned] = useState<string>("");
  const [improve, setImprove] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  const checklistHabits = habits.filter((h) =>
    todayChecklistHabitIds.includes(h.id)
  );

  const habitsDoneCount = Object.values(habitDone).filter(Boolean).length;

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    setSaved(false);
  }

  function setTaskText(id: string, text: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
    setSaved(false);
  }

  function toggleHabit(id: string) {
    setHabitDone((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="space-y-6">
      {/* Headline check-in: mood + sliders */}
      <div className="card-zed space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="label-zed">Check-in</div>
            <div className="font-mono text-[0.78rem] text-muted mt-1">
              How are you, really?
            </div>
          </div>
          <Smile className="h-4 w-4 text-muted/70" strokeWidth={1.5} />
        </div>

        {/* Mood — 5-step segmented */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Mood</Label>
            <span className="font-mono text-[0.82rem] text-ink tabular">
              {moodLabels[mood - 1]}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {moodLabels.map((lbl, i) => {
              const v = i + 1;
              const active = v === mood;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setMood(v);
                    setSaved(false);
                  }}
                  className={cn(
                    "h-10 rounded-md border font-mono text-[0.78rem] transition-colors",
                    active
                      ? "border-accent text-ink bg-accent/10"
                      : "border-line text-muted hover:text-ink hover:bg-surface-2"
                  )}
                >
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>

        <SliderRow icon={Zap} label="Energy" value={energy} onChange={(v) => { setEnergy(v); setSaved(false); }} max={10} unit="/10" />
        <SliderRow icon={HeartPulse} label="Stress" value={stress} onChange={(v) => { setStress(v); setSaved(false); }} max={10} unit="/10" />
        <SliderRow icon={Target} label="Focus" value={focus} onChange={(v) => { setFocus(v); setSaved(false); }} max={10} unit="/10" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center gap-1.5"><Moon className="h-3 w-3" /> Sleep</Label>
            <Input
              type="number"
              min={0}
              max={14}
              step={0.5}
              value={sleepHours}
              onChange={(e) => { setSleepHours(parseFloat(e.target.value) || 0); setSaved(false); }}
              className="mt-2 font-mono"
            />
            <div className="font-mono text-[0.66rem] text-muted/80 mt-1">hours</div>
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Droplets className="h-3 w-3" /> Water</Label>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => {
                const filled = i < waterCups;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setWaterCups(filled && i + 1 === waterCups ? i : i + 1); setSaved(false); }}
                    className={cn(
                      "h-9 flex-1 rounded-sm border transition-colors",
                      filled
                        ? "bg-accent/30 border-accent/50"
                        : "bg-surface-2 border-line hover:border-line-strong"
                    )}
                    aria-label={`${i + 1} cup`}
                  />
                );
              })}
            </div>
            <div className="font-mono text-[0.66rem] text-muted/80 mt-1">{waterCups} / 8 cups</div>
          </div>
        </div>
      </div>

      {/* Top 3 tasks + main goal */}
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="card-zed space-y-4">
          <div className="label-zed">Top 3 tasks</div>
          <div className="space-y-2">
            {tasks.map((t, i) => (
              <div key={t.id} className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleTask(t.id)}
                  className={cn(
                    "mt-0.5 grid place-items-center h-5 w-5 rounded-sm border transition-colors shrink-0",
                    t.done
                      ? "bg-accent border-accent"
                      : "border-line-strong hover:border-accent"
                  )}
                  aria-label={`Toggle task ${i + 1}`}
                >
                  {t.done && (
                    <Check className="h-3 w-3 text-[color:var(--color-on-accent)]" />
                  )}
                </button>
                <span className="font-mono text-[0.7rem] tabular text-muted/70 mt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Input
                  value={t.text}
                  onChange={(e) => setTaskText(t.id, e.target.value)}
                  className={cn(
                    "border-0 bg-transparent px-0 h-auto py-1 text-[0.95rem]",
                    t.done && "line-through text-muted"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="card-zed space-y-3">
          <div className="label-zed">Main goal for today</div>
          <Textarea
            value={mainGoal}
            onChange={(e) => { setMainGoal(e.target.value); setSaved(false); }}
            placeholder="One sentence. The thing that, if you do it, today is a win."
            className="min-h-[120px] border-line"
          />
        </div>
      </div>

      {/* Habits, workout, reading */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="card-zed lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="label-zed">Today&rsquo;s habits</div>
            <span className="font-mono text-[0.72rem] text-muted">
              {habitsDoneCount}/{checklistHabits.length}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {checklistHabits.map((h) => {
              const on = !!habitDone[h.id];
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => toggleHabit(h.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                    on
                      ? "border-accent/50 bg-accent/5 text-ink"
                      : "border-line text-muted hover:text-ink hover:bg-surface-2"
                  )}
                >
                  <span
                    className={cn(
                      "grid place-items-center h-5 w-5 rounded-sm border shrink-0",
                      on ? "bg-accent border-accent" : "border-line-strong"
                    )}
                  >
                    {on && (
                      <Check className="h-3 w-3 text-[color:var(--color-on-accent)]" />
                    )}
                  </span>
                  <span className="font-mono text-[0.85rem] truncate">
                    {h.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-zed space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Dumbbell className="h-3 w-3" /> Workout</Label>
            <Input
              type="number"
              min={0}
              value={workoutMinutes}
              onChange={(e) => { setWorkoutMinutes(parseInt(e.target.value) || 0); setSaved(false); }}
              className="font-mono"
            />
            <div className="font-mono text-[0.66rem] text-muted/80">minutes</div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> Reading</Label>
            <Input
              type="number"
              min={0}
              value={readingMinutes}
              onChange={(e) => { setReadingMinutes(parseInt(e.target.value) || 0); setSaved(false); }}
              className="font-mono"
            />
            <div className="font-mono text-[0.66rem] text-muted/80">minutes</div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="card-zed space-y-5">
        <div className="label-zed">Reflection</div>
        <ReflectField
          label="What I'm grateful for"
          value={gratitude}
          onChange={(v) => { setGratitude(v); setSaved(false); }}
          placeholder="One small thing. Specific is better."
        />
        <ReflectField
          label="One thing I learned today"
          value={learned}
          onChange={(v) => { setLearned(v); setSaved(false); }}
          placeholder="A line you want to be able to find again next year."
        />
        <ReflectField
          label="One thing to improve tomorrow"
          value={improve}
          onChange={(v) => { setImprove(v); setSaved(false); }}
          placeholder="The smallest version of the change you mean."
        />
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="font-mono text-[0.78rem] text-muted">
          {saved ? "Saved locally · for you, no one else." : "Nothing leaves this screen."}
        </div>
        <Button variant="primary" size="lg" onClick={save}>
          <Save className="h-4 w-4" />
          {saved ? "Saved" : "Save today"}
        </Button>
      </div>
    </div>
  );
}

function SliderRow({
  icon: Icon,
  label,
  value,
  onChange,
  max,
  unit,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  unit?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1.5">
          <Icon className="h-3 w-3" /> {label}
        </Label>
        <span className="font-mono text-[0.82rem] text-ink tabular">
          {value}
          {unit && <span className="text-muted ml-0.5">{unit}</span>}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? 0)}
        max={max}
        step={1}
      />
    </div>
  );
}

function ReflectField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[72px] border-line"
      />
    </div>
  );
}
