import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./dispatch.js";

const meta: Meta = {
  title: "Components/Dispatch Plate",
  component: "msb-dispatch",
  argTypes: {
    kicker: { control: "text" },
    issue: { control: "text" },
  },
  args: {
    kicker: "Current issue",
    issue: "07/26/2026",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Cobalt · starburst bleed. From Style Guide v3 §07 — Dispatch plate. Stays cobalt in both themes; only the keyline swaps (§08, rule i).",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <msb-dispatch
      style="max-width:420px;display:block"
      kicker=${args.kicker}
      issue=${args.issue}
    >
      Essence for the kicker and the sub, optic white for the headline. The
      plate keeps its colour in both themes.
    </msb-dispatch>
  `,
};
