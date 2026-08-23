import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./divider.js";

const meta: Meta = {
  title: "Components/Divider",
  component: "msb-divider",
  parameters: {
    docs: {
      description: {
        component: "Ball &amp; rod. From Style Guide v3 §07 — Divider.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`<msb-divider style="display:block"></msb-divider>`,
};
