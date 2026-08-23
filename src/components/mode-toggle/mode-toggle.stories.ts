import type { Meta, StoryObj } from "@storybook/web-components";
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

export const Manual: Story = {
  render: () => html`
    <msb-mode-toggle
      manual
      @msb-mode-change=${(e: CustomEvent) =>
        console.log("mode changed:", e.detail.mode)}
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
