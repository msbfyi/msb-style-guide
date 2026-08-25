import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./input.css";

const meta: Meta = {
  title: "Patterns/Input",
  parameters: {
    docs: {
      description: {
        component:
          "A labeled text input. A real <label>/<input> pair, styled — native form behavior, no JS wrapper. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <label class="msb-field">
      <span class="msb-field__label">Email</span>
      <input
        class="msb-field__input msb-chamfer"
        type="email"
        placeholder="you@msb.fyi"
      />
    </label>
  `,
};
