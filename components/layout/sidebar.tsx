"use client";

import Link from "next/link";
import { Hexagon } from "lucide-react";
import { SidebarLink } from "./sidebar-link";
import { navGroups } from "./nav-config";
import { user } from "@/lib/mock";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full flex-col bg-bg border-r border-line overflow-hidden">
      {/* Brand / identity row */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-line shrink-0">
        <div className="grid place-items-center h-7 w-7 rounded-sm border border-line-strong">
          <Hexagon className="h-3.5 w-3.5 text-accent" strokeWidth={1.6} />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="font-mono text-[0.82rem] text-ink truncate">
            life.os
          </div>
          <div className="font-mono text-[0.66rem] text-muted truncate">
            ~/{user.name.toLowerCase()}
          </div>
        </div>
      </div>

      {/* Nav tree */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.id}>
            <div className="px-3 pb-1.5 text-[0.62rem] tracking-[0.18em] text-muted/70 font-mono">
              {group.label}
            </div>
            <div className="flex flex-col gap-px">
              {group.items.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  status={item.status}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer note */}
      <div className="px-4 py-3 border-t border-line text-[0.66rem] font-mono text-muted/70 leading-relaxed shrink-0">
        <div>private. for {user.name.toLowerCase()}.</div>
        <div className="mt-1">
          <Link
            href="/timeline"
            onClick={onNavigate}
            className="hover:text-ink transition-colors"
          >
            ↳ open the story
          </Link>
        </div>
      </div>
    </aside>
  );
}
