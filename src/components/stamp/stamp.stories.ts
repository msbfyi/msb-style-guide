import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./stamp.js";

const meta: Meta = {
  title: "Components/Notice Stamp",
  component: "msb-stamp",
  argTypes: { label: { control: "text" } },
  args: { label: "Warning" },
  parameters: {
    docs: {
      description: {
        component:
          "Romantic label · mono body. From Style Guide v3 §07 — Notice stamp.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-stamp style="max-width:480px" label=${args.label}>
      This site is a constant work in progress and many things will break as
      I experiment.
    </msb-stamp>
  `,
};
