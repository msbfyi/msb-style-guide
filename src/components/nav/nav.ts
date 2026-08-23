import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

/**
 * A navigation rail. Place `<a>` elements in the default slot; mark
 * the current page with the `active` attribute on that anchor.
 *
 * @slot - Navigation `<a>` links. Add the `active` attribute to the
 *   current page's link.
 */
@customElement("msb-nav")
export class MsbNav extends LitElement {
  static styles = [
    chamferRules(".brand"),
    chamferRules("::slotted(a)"),
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        align-items: center;
      }
      .brand {
        --vs-chamfer: 11px;
        font-family: var(--display, sans-serif);
        font-size: 14px;
        padding: 9px 18px;
        background: var(--ink, #1b2a52);
        color: var(--paper, #f5f5f0);
      }
      ::slotted(a) {
        --vs-chamfer: 11px;
        --vs-stroke: var(--ink, #1b2a52);
        text-decoration: none;
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--ink, #1b2a52);
        padding: 9px 17px;
        transition:
          background 0.12s,
          color 0.12s;
      }
      ::slotted(a[active]) {
        background: var(--energy, #2e7d52);
        color: var(--light, #f5f5f0);
        --vs-stroke: var(--energy, #2e7d52);
      }
    `,
  ];

  /** Brand chip text, rendered before the slotted links. */
  @property() brand = "";

  render() {
    return html`
      ${this.brand ? html`<span class="brand">${this.brand}</span>` : null}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-nav": MsbNav;
  }
}
