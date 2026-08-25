import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./divider.css";

const meta: Meta = {
  title: "Patterns/Divider",
  parameters: {
    docs: {
      description: {
        component:
          'The "ball & rod" separator. Fixed markup, no variants. From Style Guide v3 §07.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div class="msb-divider" role="separator">
      <span class="msb-divider__dot"></span>
      <span class="msb-divider__line"></span>
      <span class="msb-divider__diamond"></span>
      <span class="msb-divider__line"></span>
      <span class="msb-divider__dot"></span>
    </div>
  `,
};
