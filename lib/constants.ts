// Sentinel tags used to mark special-purpose JournalEntry rows that double as
// other features (so we don't introduce parallel types/editors/viewers).
export const JOURNAL_TAG_LETTER_TO_FUTURE = "letter:to-future-self";
export const JOURNAL_TAG_LETTER_FROM_PAST = "letter:from-past-me";

// Used by the Future Self page to find the canonical "letter to" / "letter from"
// entries. There can be many — we surface the most recent.
export const LETTER_TAGS = {
  toFuture: JOURNAL_TAG_LETTER_TO_FUTURE,
  fromPast: JOURNAL_TAG_LETTER_FROM_PAST,
} as const;
