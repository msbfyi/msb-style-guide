import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./input.js";

const meta: Meta = {
  title: "Components/Input",
  component: "msb-input",
  argTypes: {
    label: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "search", "url"],
    },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
  },
  parameters: {
    docs: {
      description: {
        component: "Focus = Energy. From Style Guide v3 §07 — Input.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-input
      style="max-width:320px"
      label=${args.label}
      type=${args.type}
      placeholder=${args.placeholder}
      ?required=${args.required}
      ?disabled=${args.disabled}
    ></msb-input>
  `,
};
