import { defineConfig } from "vite";

// A second build, alongside the main one in vite.config.ts: this one
// bundles `lit` in rather than marking it external, producing a single
// self-contained ES module a plain `<script type="module" src="...">`
// can load directly — no import map, no bundler, no separate `lit`
// install needed in the consumer. That's the whole point: the main
// build is for bundler-based consumers (who'd otherwise end up with
// two copies of lit if this one were used instead); this one is for
// consumers like a plain Eleventy site with no JS build step at all.
export default defineConfig({
  build: {
    lib: {
      entry: "src/components/mode-toggle/mode-toggle.ts",
      formats: ["es"],
      fileName: () => "mode-toggle.standalone.js",
    },
    outDir: "dist",
    emptyOutDir: false, // the main build already populated dist/
    sourcemap: true,
  },
});
