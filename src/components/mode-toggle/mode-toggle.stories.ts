import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, waitFor } from "@storybook/test";
import { html } from "lit";
import "./mode-toggle.js";

const meta: Meta = {
  title: "Components/Mode Toggle",
  component: "msb-mode-toggle",
  parameters: {
    docs: {
      description: {
        component:
          "Chamfer 6 · segmented. From Style Guide v3 §07 — Mode toggle. Self-managing by default: writes `data-theme` to `<html>` and persists to `localStorage['msb-theme']`. Try it — this story's own preview theme will actually change.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`<msb-mode-toggle></msb-mode-toggle>`,
};

export const ClickingDarkAppliesTheTheme: Story = {
  render: () => html`<msb-mode-toggle></msb-mode-toggle>`,
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector("msb-mode-toggle")!;
    const darkButton = [...toggle.shadowRoot!.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Dark",
    )!;

    darkButton.click();

    await waitFor(() =>
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark"),
    );
    expect(darkButton.getAttribute("aria-pressed")).toBe("true");

    // Reset so this doesn't leak into whatever story renders next in the
    // same browsing session (test-runner navigates fresh per story, but
    // interactive local browsing in the Storybook UI doesn't).
    document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.removeItem("msb-theme");
    } catch {
      /* ignore */
    }
  },
  parameters: {
    // This play function mutates document.documentElement/localStorage —
    // global page state, not just this story's own DOM — which would
    // make a visual-regression screenshot comparison meaningless/flaky
    // for whatever story test-runner happens to visit next in the same
    // page. Skip the screenshot step for this one story only.
    test: { skipVisualSnapshot: true },
    docs: {
      description: {
        story:
          "Interaction test (not just a demo): clicks Dark and asserts `document.documentElement[data-theme]` actually changed. Run via `npm run test:storybook` or the Interactions panel.",
      },
    },
  },
};

export const Manual: Story = {
  render: () => html`
    <msb-mode-toggle
      manual
      @msb-mode-change=${(e: CustomEvent) => console.log("mode changed:", e.detail.mode)}
    ></msb-mode-toggle>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "With `manual`, the component only dispatches `msb-mode-change` — open the console to see it fire. It never touches the document itself.",
      },
    },
  },
};
