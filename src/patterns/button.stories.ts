import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./button.css";

const meta: Meta = {
  title: "Patterns/Button",
  parameters: {
    docs: {
      description: {
        component:
          "A real <button> or <a>, styled — no custom element, no click-handling JS bundled with it. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => html`<button class="msb-btn msb-chamfer" type="button">Primary</button>`,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">
      <button class="msb-btn msb-chamfer" type="button">
        <span class="msb-btn__dot"></span>Primary
      </button>
      <button class="msb-btn msb-btn--secondary msb-chamfer" type="button">
        Secondary
      </button>
      <button class="msb-btn msb-btn--dark msb-chamfer" type="button">Spotlight</button>
      <button class="msb-btn msb-chamfer" type="button" disabled>Disabled</button>
    </div>
  `,
};
