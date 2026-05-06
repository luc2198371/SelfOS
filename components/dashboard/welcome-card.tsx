import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { user } from "@/lib/mock";
import { fmtLong, TODAY_ISO, daysSince } from "@/lib/date";

export function WelcomeCard() {
  const days = daysSince(user.startedTracking);

  return (
    <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
      <div className="space-y-2 max-w-2xl">
        <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80">
          {fmtLong(TODAY_ISO)}
        </div>
        <h1 className="font-mono text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-tight text-ink">
          Welcome back, {user.name}.
          <br />
          <span className="text-muted">Here&rsquo;s your life right now.</span>
        </h1>
        <p className="text-[0.92rem] text-muted leading-relaxed pt-1">
          You&rsquo;ve been tracking for{" "}
          <span className="text-ink font-mono tabular">{days}</span> days. Small
          choices compound. Today is one of them.
        </p>
      </div>

      {/* The single cyan CTA on this page */}
      <Button
        asChild
        variant="primary"
        size="lg"
        className="self-start md:self-end"
      >
        <Link href="/today">
          Quick check-in
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
}
