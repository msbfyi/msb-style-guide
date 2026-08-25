import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./nav.css";

const meta: Meta = {
  title: "Patterns/Nav",
  parameters: {
    docs: {
      description: {
        component:
          'A navigation rail. Plain <a> links — mark the current page with aria-current="page" (also styleable via msb-nav__link--active). From Style Guide v3 §07.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <nav class="msb-nav">
      <span class="msb-nav__brand msb-chamfer">msb.fyi</span>
      <a class="msb-nav__link msb-chamfer" href="#" aria-current="page">Blog</a>
      <a class="msb-nav__link msb-chamfer" href="#">Now</a>
      <a class="msb-nav__link msb-chamfer" href="#">Links</a>
    </nav>
  `,
};
