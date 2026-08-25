import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./entry.css";

const meta: Meta = {
  title: "Patterns/Index Entry",
  parameters: {
    docs: {
      description: {
        component:
          'A title link, a date, and an optional "Update" chip — the row used to list posts. From Style Guide v3 §07.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div class="msb-entry">
      <div class="msb-entry__top">
        <a class="msb-entry__title" href="#">Experimentation with Slashpages</a>
        <span class="msb-entry__meta">
          <span class="msb-entry__date">May 29</span>
          <span class="msb-entry__update msb-chamfer msb-chamfer--sm">Update</span>
        </span>
      </div>
    </div>
  `,
};
