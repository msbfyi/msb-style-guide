import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./badge.css";

const meta: Meta = {
  title: "Patterns/Badge",
  parameters: {
    docs: {
      description: {
        component:
          "Chamfer sm · status. Plain markup — no custom element. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html` <span class="msb-badge msb-chamfer msb-chamfer--sm">Label</span> `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <span class="msb-badge msb-chamfer msb-chamfer--sm">Essence</span>
      <span class="msb-badge msb-badge--energy msb-chamfer msb-chamfer--sm">Trusted</span>
      <span class="msb-badge msb-badge--romantic msb-chamfer msb-chamfer--sm">Live</span>
      <span class="msb-badge msb-badge--tranquil msb-chamfer msb-chamfer--sm"
        >Listening</span
      >
      <span class="msb-badge msb-badge--gold msb-chamfer msb-chamfer--sm">Premium</span>
    </div>
  `,
};
