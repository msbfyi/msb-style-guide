import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * The "ball & rod" separator: a horizontal rule made of dot—line—
 * diamond—line—dot, all closed shapes (passes the design system's
 * end-point rule for ornament).
 */
@customElement("msb-divider")
export class MsbDivider extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    .line {
      flex: 1;
      height: 1.5px;
      background: var(--ink, #1b2a52);
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--ink, #1b2a52);
      flex: none;
    }
    .dia {
      width: 11px;
      height: 11px;
      background: var(--romantic, #b71c2a);
      transform: rotate(45deg);
      flex: none;
    }
  `;

  render() {
    return html`
      <span class="dot"></span>
      <span class="line"></span>
      <span class="dia"></span>
      <span class="line"></span>
      <span class="dot"></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-divider": MsbDivider;
  }
}
