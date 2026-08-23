import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, fn } from "@storybook/test";
import { html } from "lit";
import "./button.js";

const meta: Meta = {
  title: "Components/Button",
  component: "msb-button",
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "dark"],
    },
    dot: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "primary",
    dot: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: "Chamfer 11 · 12/26 padding. From Style Guide v3 §07 — Buttons.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: (args) => html`
    <msb-button variant=${args.variant} ?dot=${args.dot} ?disabled=${args.disabled}
      >Primary</msb-button
    >
  `,
};

export const ClickFiresARealEvent: Story = {
  render: () => html`<msb-button>Click me</msb-button>`,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("msb-button")!;
    const onClick = fn();
    button.addEventListener("click", onClick);

    const inner = button.shadowRoot!.querySelector("button")!;
    inner.click();

    expect(onClick).toHaveBeenCalledOnce();
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">
      <msb-button variant="primary" dot>Primary</msb-button>
      <msb-button variant="secondary">Secondary</msb-button>
      <msb-button variant="dark" dot>Spotlight</msb-button>
      <msb-button variant="primary" disabled>Disabled</msb-button>
    </div>
  `,
};
