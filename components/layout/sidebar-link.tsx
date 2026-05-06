"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  status?: "mvp" | "soon";
  onSelect?: () => void;
}

export function SidebarLink({
  href,
  label,
  icon: Icon,
  status,
  onSelect,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-2.5 px-3 py-1.5 text-[0.82rem] font-mono transition-colors",
        "text-muted hover:text-ink hover:bg-surface-2",
        active && "text-ink bg-surface-2 rail-accent"
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 shrink-0 transition-colors",
          active ? "text-accent" : "text-muted group-hover:text-ink"
        )}
      />
      <span className="truncate">{label}</span>
      {status === "soon" && (
        <span className="ml-auto text-[0.62rem] tracking-wider text-muted/70 uppercase">
          soon
        </span>
      )}
    </Link>
  );
}
