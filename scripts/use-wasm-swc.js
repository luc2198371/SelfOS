// Forces Next.js to take its WASM-first SWC loading path during startup.
//
// Why: on Termux/Android arm64 (and a few other platforms), Next.js's default
// startup tries to load the native SWC binary. When the binary isn't installed
// and the npm registry returns 404 for that platform's prebuilt (which is the
// case for `@next/swc-android-arm64@14.2.15`), Next crashes before it ever
// reads `next.config.mjs`, so `experimental.useWasmBinary` doesn't help.
//
// In `node_modules/next/dist/build/swc/index.js`, the WASM-first path is taken
// if `process.versions.webcontainer` is truthy — a WebContainer-specific
// shortcut. Setting it here at preload time forces that path on any platform.
//
// We only set it when the `@next/swc-wasm-nodejs` package is actually present,
// so it's a no-op on platforms where the native binary works fine.
//
// Wired into `dev`/`build`/`start`/`lint` via NODE_OPTIONS in package.json.
try {
  require.resolve("@next/swc-wasm-nodejs");
  if (!process.versions.webcontainer) {
    Object.defineProperty(process.versions, "webcontainer", {
      value: "forced",
      writable: false,
      enumerable: true,
      configurable: true,
    });
  }
} catch {
  // WASM package not installed; let Next try its normal native path.
}
