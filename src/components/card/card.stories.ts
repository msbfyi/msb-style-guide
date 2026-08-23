import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card.js";
import "../badge/badge.js";

const meta: Meta = {
  title: "Components/Card",
  component: "msb-card",
  parameters: {
    docs: {
      description: {
        component: "Pattern cover. From Style Guide v3 §07 — Card.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <msb-card>
      <div
        slot="cover"
        style="width:100%;height:100%;background:repeating-conic-gradient(var(--everyday) 0 25%, var(--paper) 0 50%) 0 0/20px 20px"
      ></div>
      <msb-badge slot="pin" variant="romantic">New</msb-badge>
      <h4>The Spectator Shoe</h4>
      <p>
        Two-tone, hard boundary, no blending. The harlequin principle in shoe
        form.
      </p>
      <span slot="footer">Field note</span>
      <span slot="footer">04</span>
    </msb-card>
  `,
};
