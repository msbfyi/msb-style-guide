import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card.js";
import "../badge/badge.js";

const meta: Meta = {
  title: "Components/Card",
  component: "msb-card",
  argTypes: {
    heading: { control: "text" },
    body: { control: "text" },
    pinLabel: { control: "text", description: "Empty string renders no pin." },
    pinVariant: {
      control: "select",
      options: ["default", "energy", "romantic", "tranquil", "gold"],
    },
    footerLeft: { control: "text" },
    footerRight: { control: "text" },
  },
  args: {
    heading: "The Spectator Shoe",
    body: "Two-tone, hard boundary, no blending. The harlequin principle in shoe form.",
    pinLabel: "New",
    pinVariant: "romantic",
    footerLeft: "Field note",
    footerRight: "04",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Pattern cover. From Style Guide v3 §07 — Card. The Controls below drive the simple-content properties (heading/body/pin/footer); each also has a matching named slot for full custom markup, which always wins over the property fallback — see the CustomSlots story.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-card
      heading=${args.heading}
      body=${args.body}
      pin-label=${args.pinLabel}
      pin-variant=${args.pinVariant}
      footer-left=${args.footerLeft}
      footer-right=${args.footerRight}
    >
      <div
        slot="cover"
        style="width:100%;height:100%;background:repeating-conic-gradient(var(--everyday) 0 25%, var(--paper) 0 50%) 0 0/20px 20px"
      ></div>
    </msb-card>
  `,
};

export const NoPinOrFooter: Story = {
  args: { pinLabel: "", footerLeft: "", footerRight: "" },
  render: (args) => html`
    <msb-card heading=${args.heading} body=${args.body}>
      <div
        slot="cover"
        style="width:100%;height:100%;background:repeating-conic-gradient(var(--everyday) 0 25%, var(--paper) 0 50%) 0 0/20px 20px"
      ></div>
    </msb-card>
  `,
};

export const CustomSlots: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Fully slotted, bypassing every fallback property — for when the simple content properties aren't enough.",
      },
    },
  },
  render: () => html`
    <msb-card>
      <div
        slot="cover"
        style="width:100%;height:100%;background:repeating-conic-gradient(var(--everyday) 0 25%, var(--paper) 0 50%) 0 0/20px 20px"
      ></div>
      <msb-badge slot="pin" variant="tranquil">Custom</msb-badge>
      <h3 slot="body">A slotted &lt;h3&gt; instead of &lt;h4&gt;</h3>
      <p slot="body">Any markup is valid here — this isn't limited to a single paragraph.</p>
      <span slot="footer">Left</span>
      <span slot="footer">Right</span>
    </msb-card>
  `,
};
