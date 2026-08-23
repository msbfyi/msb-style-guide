import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferHost } from "../../internal/chamfer.js";

export type BadgeVariant = "default" | "energy" | "romantic" | "tranquil" | "gold";

/**
 * A small status/label chip. Chamfer 6 (the "under 30px tall"
 * treatment). Five fills matching the palette's semantic roles.
 *
 * @slot - Badge label content.
 */
@customElement("msb-badge")
export class MsbBadge extends LitElement {
  static styles = [
    chamferHost,
    css`
      :host {
        --vs-chamfer: 6px;
        --vs-stroke: var(--essence, #e8b98a);
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 11px;
        font-weight: 700;
        padding: 5px 13px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        line-height: 1.3;
        background: var(--essence, #e8b98a);
        color: var(--formal, #1b2a52);
      }
      :host([variant="energy"]) {
        background: var(--energy, #2e7d52);
        color: var(--light, #f5f5f0);
        --vs-stroke: var(--energy, #2e7d52);
      }
      :host([variant="romantic"]) {
        background: var(--romantic, #b71c2a);
        color: var(--light, #f5f5f0);
        --vs-stroke: var(--romantic, #b71c2a);
      }
      :host([variant="tranquil"]) {
        background: var(--tranquil, #00897b);
        color: var(--light, #f5f5f0);
        --vs-stroke: var(--tranquil, #00897b);
      }
      :host([variant="gold"]) {
        background: var(--gold, #bfa060);
        color: var(--formal, #1b2a52);
        --vs-stroke: var(--gold, #bfa060);
      }
    `,
  ];

  /** Visual variant. */
  @property({ reflect: true }) variant: BadgeVariant = "default";

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-badge": MsbBadge;
  }
}
