import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./nav.js";

const meta: Meta = {
  title: "Components/Nav",
  component: "msb-nav",
  parameters: {
    docs: {
      description: {
        component:
          "Rail · active link = Energy fill. From Style Guide v3 §07 — Navigation. Mark the current page's `<a>` with the `active` attribute.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <msb-nav brand="msb.fyi">
      <a href="#" active>Blog</a>
      <a href="#">Notes</a>
      <a href="#">Projects</a>
      <a href="#">Now</a>
    </msb-nav>
  `,
};
