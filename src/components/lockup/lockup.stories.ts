import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./lockup.js";

const meta: Meta = {
  title: "Components/Lockup",
  component: "msb-lockup",
  argTypes: {
    initials: { control: "text" },
    domain: { control: "text" },
    name: { control: "text" },
  },
  args: {
    initials: "MSB",
    domain: ".fyi",
    name: "Michael Sean Becker",
  },
  parameters: {
    docs: {
      description: {
        component: "Primary mark. From Style Guide v3 §07 — Lockup.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-lockup
      initials=${args.initials}
      domain=${args.domain}
      name=${args.name}
    ></msb-lockup>
  `,
};

export const MarkOnly: Story = {
  render: () => html`<msb-lockup initials="MSB" domain=".fyi"></msb-lockup>`,
};
