import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./entry.js";

const meta: Meta = {
  title: "Components/Index Entry",
  component: "msb-entry",
  argTypes: {
    href: { control: "text" },
    label: { control: "text" },
    date: { control: "text" },
    hasUpdate: { control: "boolean" },
  },
  args: {
    href: "#",
    label: "Experimentation with Slashpages",
    date: "May 29",
    hasUpdate: true,
  },
  parameters: {
    docs: {
      description: {
        component: "Date · update chip. From Style Guide v3 §07 — Index entry.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-entry
      href=${args.href}
      label=${args.label}
      date=${args.date}
      ?hasUpdate=${args.hasUpdate}
    ></msb-entry>
  `,
};
