import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { chamferHost } from "../../internal/chamfer.js";

/**
 * A pattern-cover card: an optional cover area (with an optional
 * pinned badge over it), a body, and a footer row.
 *
 * @slot cover - Cover content (e.g. an image, or a patterned `<div>`).
 * @slot pin - Positioned top-left over the cover — typically an
 *   `<msb-badge>`.
 * @slot - Default slot: body content (heading + text).
 * @slot footer - Footer row content, laid out `justify-content:
 *   space-between`.
 */
@customElement("msb-card")
export class MsbCard extends LitElement {
  static styles = [
    chamferHost,
    css`
      :host {
        --vs-chamfer: 16px;
        display: block;
        width: 100%;
        max-width: 300px;
        background: var(--paper, #f5f5f0);
        overflow: hidden;
      }
      .cov {
        position: relative;
        height: 112px;
        border-bottom: 1.5px solid var(--ink, #1b2a52);
      }
      .pin {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .bd {
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .bd ::slotted(h4),
      .bd ::slotted(h3) {
        font-family: var(--display, sans-serif);
        font-size: 16px;
        letter-spacing: -0.01em;
        margin: 0;
      }
      .bd ::slotted(p) {
        font-size: 13px;
        color: var(--muted, #3b1f2b);
        line-height: 1.45;
        margin: 0;
      }
      .ft {
        padding: 11px 18px;
        border-top: 1.5px solid var(--ink, #1b2a52);
        background: var(--essence, #e8b98a);
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 10.5px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        color: var(--formal, #1b2a52);
      }
    `,
  ];

  render() {
    return html`
      <div class="cov">
        <slot name="cover"></slot>
        <span class="pin"><slot name="pin"></slot></span>
      </div>
      <div class="bd"><slot></slot></div>
      <div class="ft"><slot name="footer"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-card": MsbCard;
  }
}
