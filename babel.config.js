// Force Next.js to compile with Babel instead of SWC.
//
// Why: the native SWC binary doesn't load on Termux/Android arm64 (and a few
// other non-tier-1 platforms), and the @next/swc-wasm-nodejs fallback is
// flaky on those same environments. Babel always works wherever Node runs.
//
// Trade-off: ~30–50% slower compile and a slightly larger build. For a
// private single-user dashboard that's fine.
//
// Note: when Babel is enabled, Next disables `next/font`, so we load fonts
// via a <link> tag in app/layout.tsx instead.
module.exports = {
  presets: ["next/babel"],
};
