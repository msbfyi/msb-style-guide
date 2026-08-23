import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferHost } from "../../internal/chamfer.js";

/**
 * A notice stamp: a filled Romantic label block beside a mono-set
 * body message.
 *
 * @slot - Body copy.
 */
@customElement("msb-stamp")
export class MsbStamp extends LitElement {
  static styles = [
    chamferHost,
    css`
      :host {
        --vs-chamfer: 16px;
        display: grid;
        grid-template-columns: auto 1fr;
        width: 100%;
        overflow: hidden;
        background: var(--paper, #f5f5f0);
      }
      .sl {
        background: var(--romantic, #b71c2a);
        color: var(--light, #f5f5f0);
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 700;
        font-size: 11px;
        padding: 14px 16px;
        display: grid;
        place-items: center;
        text-align: center;
      }
      .sb {
        padding: 13px 18px;
        font-family: var(--mono, monospace);
        font-size: 12px;
        line-height: 1.6;
        color: var(--muted, #3b1f2b);
      }
      @media (max-width: 500px) {
        :host {
          grid-template-columns: 1fr;
        }
        .sl {
          text-align: left;
          place-items: start;
        }
      }
    `,
  ];

  /** Label text in the filled block. */
  @property() label = "Warning";

  render() {
    return html`
      <div class="sl">${this.label}</div>
      <div class="sb"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-stamp": MsbStamp;
  }
}
