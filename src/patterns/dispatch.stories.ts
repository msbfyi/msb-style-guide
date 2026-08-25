import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./dispatch.css";

// The starburst sprite, defined once (see AddingPatterns.mdx — a real
// page includes this <svg><defs> once, not per-story). Each story
// here is its own isolated preview, so it's repeated per render.
const burstDefs = html`
  <svg width="0" height="0" style="position:absolute">
    <defs>
      <g id="msb-burst" fill="currentColor">
        <rect x="-2.5" y="-96" width="5" height="96"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(30)"></rect>
        <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(60)"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(90)"></rect>
        <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(120)"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(150)"></rect>
        <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(180)"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(210)"></rect>
        <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(240)"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(270)"></rect>
        <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(300)"></rect>
        <rect x="-2" y="-64" width="4" height="64" transform="rotate(330)"></rect>
        <circle cx="0" cy="0" r="15"></circle>
      </g>
    </defs>
  </svg>
`;

const meta: Meta = {
  title: "Patterns/Dispatch Plate",
  parameters: {
    docs: {
      description: {
        component:
          "A fixed Dramatic-cobalt panel. Stays cobalt in both themes — only its keyline changes. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    ${burstDefs}
    <div class="msb-dispatch msb-chamfer msb-chamfer--lg" style="max-width:320px">
      <span class="msb-dispatch__burst" aria-hidden="true">
        <svg viewBox="-100 -100 200 200"><use href="#msb-burst"></use></svg>
      </span>
      <span class="msb-dispatch__kicker">Current issue</span>
      <span class="msb-dispatch__issue">No. 04</span>
      <span class="msb-dispatch__sub"
        >A dispatch from the field, set in Barlow Condensed.</span
      >
    </div>
  `,
};
