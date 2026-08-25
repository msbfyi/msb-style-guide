import type { TestRunnerConfig } from "@storybook/test-runner";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getStoryContext } from "@storybook/test-runner";

// Baseline screenshots live in .storybook/__image_snapshots__/, committed
// to the repo. Diffs on failure land alongside them. Run `npm run
// test:visual:update` locally to (re)generate baselines after an
// intentional visual change, then commit the updated PNGs.
const customSnapshotsDir = `${process.cwd()}/.storybook/__image_snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Skip visual snapshots for stories that assert their own DOM state
    // via a play function (interaction tests) — those already fail loudly
    // on their own terms, and several of them deliberately mutate global
    // state (document.documentElement, localStorage) mid-test in ways
    // that would make a screenshot comparison meaningless/flaky.
    if (storyContext.parameters?.test?.skipVisualSnapshot) {
      return;
    }

    // Scope the screenshot to the story's own rendered root, not the
    // whole page — a small/thin component (e.g. the 1.5px divider line)
    // disappearing is a tiny fraction of a full-page screenshot's pixels,
    // easily hiding under any reasonable percentage threshold. Scoped to
    // just the component, the same regression is a large fraction of a
    // much smaller frame instead.
    const image = await page.locator("#storybook-root").screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: 15,
      failureThresholdType: "pixel",
    });
  },
};

export default config;
