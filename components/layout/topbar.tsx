"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Command as CommandIcon } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useCommandPalette } from "@/components/command/use-command-palette";
import { titleByPath } from "./nav-config";

export function Topbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useCommandPalette();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  // Build editor-style breadcrumb path
  const segments = pathname.split("/").filter(Boolean);
  const path = segments.length === 0 ? "~" : `~/${segments.join("/")}`;

  const meta = titleByPath[pathname] ?? {
    title: segments[0]?.replace(/-/g, " ") ?? "Dashboard",
  };

  return (
    <div className="h-14 shrink-0 flex items-center gap-3 px-4 md:px-6 border-b border-line bg-bg/95 backdrop-blur-sm sticky top-0 z-30">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden grid place-items-center h-8 w-8 rounded-sm border border-line text-muted hover:text-ink hover:bg-surface-2 transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" />
      </button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-bg border-line">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Path breadcrumb */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="path-zed truncate">{path}</span>
        <span className="text-muted/40 hidden sm:inline">·</span>
        <span className="font-mono text-[0.78rem] text-muted truncate hidden sm:inline capitalize">
          {meta.title}
        </span>
      </div>

      {/* Command-K trigger */}
      <button
        type="button"
        onClick={open}
        className="group inline-flex items-center gap-2 h-8 px-2.5 rounded-sm border border-line text-muted hover:text-ink hover:border-line-strong transition-colors text-[0.78rem] font-mono"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search & jump</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 rounded-sm border border-line text-[0.66rem] text-muted">
          {isMac ? (
            <CommandIcon className="h-2.5 w-2.5" />
          ) : (
            <span>Ctrl</span>
          )}
          <span>K</span>
        </kbd>
      </button>
    </div>
  );
}
