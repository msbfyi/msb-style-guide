import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./lockup.css";

const meta: Meta = {
  title: "Patterns/Lockup",
  parameters: {
    docs: {
      description: {
        component:
          "The primary mark. Write out one .msb-lockup__block per letter, cycling the 3 modifier classes in order. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div class="msb-lockup">
      <div class="msb-lockup__blocks">
        <span class="msb-lockup__block msb-lockup__block--1 msb-chamfer">M</span>
        <span class="msb-lockup__block msb-lockup__block--2 msb-chamfer">S</span>
        <span class="msb-lockup__block msb-lockup__block--3 msb-chamfer">B</span>
        <span class="msb-lockup__domain">.fyi</span>
      </div>
      <span class="msb-lockup__name">Michael Sean Becker</span>
    </div>
  `,
};

export const MarkOnly: Story = {
  render: () => html`
    <div class="msb-lockup">
      <div class="msb-lockup__blocks">
        <span class="msb-lockup__block msb-lockup__block--1 msb-chamfer">M</span>
        <span class="msb-lockup__block msb-lockup__block--2 msb-chamfer">S</span>
        <span class="msb-lockup__block msb-lockup__block--3 msb-chamfer">B</span>
        <span class="msb-lockup__domain">.fyi</span>
      </div>
    </div>
  `,
};
