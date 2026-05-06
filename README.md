# SelfOS — Life Journey Dashboard

A private, single-user personal dashboard for tracking life, growth, habits,
goals, reflection, and the long story of who you're becoming.

This is the **MVP (v1.0)**. It ships seven pages — Dashboard, Today, Habits,
Goals, Journal, Life Timeline, Weekly Review — plus stubs for the nine more
that will come in v1.1+.

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS 3** with CSS variables for design tokens
- **shadcn/ui** primitives, themed to the Zed Dev design system
- **Recharts** for charts (single accent + neutrals only)
- **lucide-react** icons
- **cmdk** command palette
- **date-fns** for dates
- All data is **static mock** for the MVP. Pages call `getX()`-style accessors
  so swapping in a real database is a mechanical change.

## Design system — "Zed Dev"

Editor-dark, warmer than pitch, glyph-sharp. The dashboard should feel like a
personal command center built inside a premium code editor.

- Background `#161614`, surfaces `#1D1D1B`, primary text `#E5E4DF`,
  secondary `#7B7A74`, accent `#5FB5D6` — and *only* these.
- No gradients. No drop shadows. Small radii (3 / 6 / 10px). Tight spacing
  (8 / 16 / 32).
- **JetBrains Mono** for headings, navigation, stats, labels.
- **Inter** for body, journal prose, and reflection text.
- Exactly **one cyan primary action per screen.** Active sidebar rail and
  progress fills also use cyan but very sparingly.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
npm run lint
```

## Structure

```
app/                      Routes (App Router)
  page.tsx                Dashboard
  today/                  Daily check-in
  habits/                 Habits + heatmap + insights
  goals/                  Now / Soon / Future / Dream
  journal/                Entry list, search, detail (line-numbered editor)
  timeline/               Vertical life timeline, expandable nodes
  weekly-review/          7-question review + past reviews
  ...                     9 more routes stubbed as <ComingSoon />
components/
  layout/                 Sidebar, topbar, status-bar, page-header
  command/                cmd-k palette + provider
  ui/                     shadcn primitives (themed)
  charts/                 Recharts wrappers + theme
  dashboard/, today/, habits/, goals/, journal/, timeline/, weekly-review/
lib/
  mock/                   ~6 weeks of realistic data
  date.ts                 date-fns helpers
  streak.ts               Streak / consistency from sparse logs
  utils.ts                cn(), clamp(), formatNumber()
types/
  domain.ts               All domain models
```

## Keyboard

`Cmd+K` / `Ctrl+K` opens the command palette anywhere.

## Notes on platforms

Next.js ships a native SWC binary for compilation. On Termux/Android arm64
(and a few other non-tier-1 platforms) that binary won't load, and even the
`@next/swc-wasm-nodejs` fallback can be flaky. This project ships a
`babel.config.js` with `next/babel`, which makes Next compile with Babel
instead. Slower compile, but works wherever Node runs.

A consequence of using Babel: `next/font` is disabled. So fonts (JetBrains
Mono + Inter) are loaded via a `<link>` tag in `app/layout.tsx` instead.
If you ever move to a platform where SWC works and want the speedup, just
delete `babel.config.js` and the project will use SWC again.

