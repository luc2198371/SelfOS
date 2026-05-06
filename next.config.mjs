/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force the WASM SWC build to be tried first. On Termux/Android (and a few
  // other non-tier-1 platforms) the native SWC binary isn't published or
  // doesn't load, and Next will otherwise try to download it at runtime and
  // 404 on the npm registry. With this flag set, Next loads
  // @next/swc-wasm-nodejs (in `dependencies`) and never reaches the native
  // path. Slightly slower than native SWC, faster than Babel.
  experimental: {
    useWasmBinary: true,
  },
};

export default nextConfig;
