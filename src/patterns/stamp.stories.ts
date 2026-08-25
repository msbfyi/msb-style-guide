import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./stamp.css";

const meta: Meta = {
  title: "Patterns/Notice Stamp",
  parameters: {
    docs: {
      description: {
        component:
          "A filled Romantic label block beside a mono-set body message. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div class="msb-stamp">
      <div class="msb-stamp__label">Warning</div>
      <div class="msb-stamp__body">
        This pattern has no default fallback text — always provide the body copy.
      </div>
    </div>
  `,
};
