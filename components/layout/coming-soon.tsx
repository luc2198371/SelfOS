import Link from "next/link";
import { CircleDashed } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "./page-header";

interface ComingSoonProps {
  title: string;
  description: string;
  bullets?: string[];
}

export function ComingSoon({ title, description, bullets = [] }: ComingSoonProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title={title} description={description} />

      <Card className="p-8">
        <div className="flex items-start gap-4">
          <div className="grid place-items-center h-9 w-9 rounded-sm border border-line shrink-0">
            <CircleDashed className="h-4 w-4 text-muted" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="label-zed">Coming soon</div>
            <p className="text-ink leading-relaxed">
              This page is part of the full vision but not in the v1.0 MVP.
              The route is reserved so the navigation stays honest while
              the rest of the dashboard takes shape.
            </p>
            {bullets.length > 0 && (
              <ul className="space-y-1.5 pt-2">
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[0.88rem] text-muted leading-relaxed"
                  >
                    <span className="text-muted/40 font-mono shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-3">
              <Link
                href="/"
                className="font-mono text-[0.82rem] text-muted hover:text-ink transition-colors"
              >
                ← back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
