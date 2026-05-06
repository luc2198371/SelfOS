"use client";

import { useState } from "react";
import type { LifeCategory } from "@/types";
import { CategoryCard } from "./category-card";
import { CategoryDetailSheet } from "./category-detail-sheet";

interface CategoriesBoardProps {
  categories: LifeCategory[];
}

export function CategoriesBoard({ categories }: CategoriesBoardProps) {
  const [open, setOpen] = useState<LifeCategory | null>(null);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.key} category={c} onClick={() => setOpen(c)} />
        ))}
      </div>

      <CategoryDetailSheet
        category={open}
        onOpenChange={(o) => !o && setOpen(null)}
      />
    </>
  );
}
