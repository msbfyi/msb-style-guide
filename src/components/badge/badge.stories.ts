import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./badge.js";

const meta: Meta = {
  title: "Components/Badge",
  component: "msb-badge",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "energy", "romantic", "tranquil", "gold"],
    },
  },
  args: { variant: "default" },
  parameters: {
    docs: {
      description: {
        component: "Chamfer 6 · status. From Style Guide v3 §07 — Badges.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`<msb-badge variant=${args.variant}>Label</msb-badge>`,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <msb-badge>Essence</msb-badge>
      <msb-badge variant="energy">Trusted</msb-badge>
      <msb-badge variant="romantic">Live</msb-badge>
      <msb-badge variant="tranquil">Listening</msb-badge>
      <msb-badge variant="gold">Premium</msb-badge>
    </div>
  `,
};
