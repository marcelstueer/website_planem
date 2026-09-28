// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static site: every route is rendered to HTML at build time into .output/public,
    // so the site can be hosted on classic webhosting without a Node/Worker server.
    pages: [
      { path: "/" },
      { path: "/leistungen" },
      { path: "/leistungen/mobilitaetskonzepte" },
      { path: "/leistungen/energieberatung" },
      { path: "/ueber-planem" },
      { path: "/aktuelles" },
      { path: "/kontakt" },
      { path: "/impressum" },
      { path: "/datenschutz" },
      { path: "/admin" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
