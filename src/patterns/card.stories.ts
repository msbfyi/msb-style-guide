import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card.css";
import "./badge.css";

const meta: Meta = {
  title: "Patterns/Card",
  parameters: {
    docs: {
      description: {
        component:
          "A pattern-cover card. Omit .msb-card__footer entirely (not just leave it empty) when there's no footer content — see the NoPinOrFooter story. From Style Guide v3 §07.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <article class="msb-card msb-chamfer msb-chamfer--lg">
      <div
        class="msb-card__cover"
        style="background:repeating-conic-gradient(#1b2a52 0% 25%, #f5f5f0 0% 50%) 0 / 20px 20px"
      >
        <span class="msb-card__pin">
          <span class="msb-badge msb-badge--romantic msb-chamfer msb-chamfer--sm"
            >New</span
          >
        </span>
      </div>
      <div class="msb-card__body">
        <h4 class="msb-card__heading">The Spectator Shoe</h4>
        <p class="msb-card__text">
          Two-tone, hard boundary, no blending. The harlequin principle in shoe form.
        </p>
      </div>
      <div class="msb-card__footer">
        <span>Field Note</span>
        <span>04</span>
      </div>
    </article>
  `,
};

export const ImageCover: Story = {
  render: () => html`
    <article class="msb-card msb-chamfer msb-chamfer--lg">
      <div class="msb-card__cover">
        <img src="https://picsum.photos/seed/msb-card/600/400" alt="" />
      </div>
      <div class="msb-card__body">
        <h4 class="msb-card__heading">Photo cover</h4>
        <p class="msb-card__text">
          A plain &lt;img&gt; auto-fills the cover area — no sizing CSS needed.
        </p>
      </div>
    </article>
  `,
};

export const NoPinOrFooter: Story = {
  render: () => html`
    <article class="msb-card msb-chamfer msb-chamfer--lg">
      <div class="msb-card__cover" style="background:#1b2a52"></div>
      <div class="msb-card__body">
        <h4 class="msb-card__heading">No pin, no footer</h4>
        <p class="msb-card__text">
          .msb-card__pin and .msb-card__footer are both just omitted from the markup.
        </p>
      </div>
    </article>
  `,
};
