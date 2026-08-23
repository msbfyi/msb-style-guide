import { esbuildPlugin } from "@web/dev-server-esbuild";

// No explicit `browsers` config — @web/test-runner's default Puppeteer-based
// Chrome launcher is sufficient for these DOM-level component tests. Visual
// regression (which needs real, consistent rendering) is handled separately
// by @storybook/test-runner + Playwright, not here.
export default {
  files: "src/**/*.test.ts",
  nodeResolve: true,
  // `tsconfig` is required explicitly — unlike Vite, esbuildPlugin's raw
  // transform() call doesn't auto-discover tsconfig.json, so without this
  // it defaults to TC39 standard decorators instead of the legacy/
  // experimental ones Lit's `@property()` etc. actually need, and every
  // component fails to even import ("Unsupported decorator location: field").
  plugins: [esbuildPlugin({ ts: true, target: "es2021", tsconfig: "tsconfig.json" })],
  concurrency: 4,
  testFramework: {
    config: {
      timeout: 5000,
    },
  },
  coverageConfig: {
    report: false,
  },
};
