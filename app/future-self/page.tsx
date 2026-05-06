import { PageHeader } from "@/components/layout/page-header";
import { HorizonCard } from "@/components/future-self/horizon-card";
import { IdealDayTimeline } from "@/components/future-self/ideal-day-timeline";
import { ValuesRulesCard } from "@/components/future-self/values-rules-card";
import { LetterCard } from "@/components/future-self/letter-card";
import { LegacyStatement } from "@/components/future-self/legacy-statement";
import { WriteLetterButton } from "@/components/future-self/write-letter-button";
import { futureSelfStatements, idealDay, journalEntries, user } from "@/lib/mock";
import { JOURNAL_TAG_LETTER_TO_FUTURE, JOURNAL_TAG_LETTER_FROM_PAST } from "@/lib/constants";

export default function FutureSelfPage() {
  const byHorizon = (h: string) => futureSelfStatements.find((s) => s.horizon === h);

  // Most recent letter of each kind
  const letters = [...journalEntries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  const letterTo = letters.find((e) =>
    e.tags.includes(JOURNAL_TAG_LETTER_TO_FUTURE)
  );
  const letterFrom = letters.find((e) =>
    e.tags.includes(JOURNAL_TAG_LETTER_FROM_PAST)
  );

  return (
    <div className="space-y-7">
      <PageHeader
        title="Future Self"
        description="The kind of person you're becoming. Three horizons, an ideal day, the rules you're keeping for yourself, and letters across time."
        action={<WriteLetterButton />}
      />

      <section className="grid gap-3 lg:grid-cols-3">
        <HorizonCard
          label="One year"
          caption="next twelve months"
          statement={byHorizon("1y")}
        />
        <HorizonCard
          label="Five years"
          caption="the medium horizon"
          statement={byHorizon("5y")}
        />
        <HorizonCard
          label="Ten years"
          caption="the long view"
          statement={byHorizon("10y")}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <IdealDayTimeline blocks={idealDay} />
        <div className="space-y-3">
          <ValuesRulesCard
            label="Values"
            caption="what you steer by"
            items={user.values}
          />
          <ValuesRulesCard
            label="Personal rules"
            caption="how you live them out"
            items={user.personalRules}
          />
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <LetterCard
          label="Letter to future me"
          caption="latest"
          entry={letterTo}
          emptyText="Nothing here yet. Use the cyan button at the top to write one."
        />
        <LetterCard
          label="Letter from past me"
          caption="latest"
          entry={letterFrom}
          emptyText="Past letters appear here once you tag a journal entry letter:from-past-me."
        />
      </section>

      <LegacyStatement statement={byHorizon("legacy")} />
    </div>
  );
}
