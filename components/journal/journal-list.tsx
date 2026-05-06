"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EntryCard } from "./entry-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { JournalEntry } from "@/types";

interface JournalListProps {
  entries: JournalEntry[];
}

export function JournalList({ entries }: JournalListProps) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites" | "tag">("all");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const e of entries) e.tags.forEach((t) => set.add(t));
    return Array.from(set);
  }, [entries]);

  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = entries;
    if (filter === "favorites") list = list.filter((e) => e.favorite);
    if (filter === "tag" && tag) list = list.filter((e) => e.tags.includes(tag));
    if (q) {
      const t = q.toLowerCase();
      list = list.filter(
        (e) =>
          e.body.toLowerCase().includes(t) ||
          e.title?.toLowerCase().includes(t) ||
          e.tags.some((tag) => tag.toLowerCase().includes(t))
      );
    }
    return list;
  }, [entries, filter, q, tag]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your own words…"
            className="pl-8 font-sans"
          />
        </div>
        <Tabs
          value={filter}
          onValueChange={(v) => {
            setFilter(v as "all" | "favorites" | "tag");
            if (v !== "tag") setTag(null);
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="tag">By tag</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filter === "tag" && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={`font-mono text-[0.7rem] px-2 py-0.5 rounded-sm border transition-colors ${
                tag === t
                  ? "border-accent text-ink bg-accent/10"
                  : "border-line text-muted hover:text-ink hover:border-line-strong"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-md border border-dashed border-line p-10 text-center font-mono text-[0.85rem] text-muted">
          Nothing matches. Try fewer words.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EntryCard key={e.id} entry={e} />
          ))}
        </div>
      )}
    </div>
  );
}
