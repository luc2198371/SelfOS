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

Next.js compiles with SWC. On Termux/Android arm64 (and a couple of other
non-tier-1 platforms) the native SWC binary isn't published for every Next
patch version, and Next's runtime fallback tries to download it from npm and
404s. To avoid that, this project:

- Pins `@next/swc-wasm-nodejs` in `dependencies` (not devDependencies, so
  `NODE_ENV=production` installs still pick it up).
- Sets `experimental.useWasmBinary: true` in `next.config.mjs` so Next loads
  the WASM build first and never reaches the native-download path.
- Loads JetBrains Mono + Inter via a `<link>` tag in `app/layout.tsx`
  instead of `next/font`, since `next/font` has rough edges with WASM SWC.

If you're on a platform where the native SWC binary works (most
desktops/CI), nothing changes — Next will still take the WASM path due to
the flag, just a touch slower than native. Remove the
`experimental.useWasmBinary` line if you want native SWC speed.

