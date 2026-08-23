import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferHost } from "../../internal/chamfer.js";
import { burst } from "../../internal/ornaments.js";

/**
 * The "dispatch plate": a fixed Dramatic-cobalt panel with a bled
 * starburst ornament, a kicker, a large issue value, and sub copy.
 * Stays cobalt in both light and dark themes — only its keyline
 * changes (see Style Guide v3 §08, rule i: "a colour plate is a fixed
 * field, not a themed surface").
 *
 * @slot - Sub copy, rendered below the issue value.
 */
@customElement("msb-dispatch")
export class MsbDispatch extends LitElement {
  static styles = [
    chamferHost,
    css`
      :host {
        --vs-chamfer: 16px;
        --vs-stroke: var(--plate-stroke, var(--dramatic, #1a3a8f));
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        width: 100%;
        padding: 24px;
        background: var(--dramatic, #1a3a8f);
        color: var(--light, #f5f5f0);
      }
      .st {
        position: absolute;
        right: -30px;
        top: -30px;
        width: 122px;
        color: rgba(245, 245, 240, 0.12);
        pointer-events: none;
      }
      .st svg {
        display: block;
        width: 100%;
      }
      .k {
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.22em;
        font-weight: 600;
        font-size: 11px;
        color: var(--essence, #e8b98a);
        position: relative;
        z-index: 1;
      }
      .iss {
        font-family: var(--display, sans-serif);
        font-size: 30px;
        line-height: 1;
        letter-spacing: -0.035em;
        position: relative;
        z-index: 1;
      }
      .sb {
        font-size: 13.5px;
        line-height: 1.5;
        color: var(--essence, #e8b98a);
        position: relative;
        z-index: 1;
      }
    `,
  ];

  /** Small uppercase label above the issue value. */
  @property() kicker = "Current issue";

  /** The large display value (e.g. a date). */
  @property() issue = "";

  render() {
    return html`
      <span class="st" aria-hidden="true"
        >${svg`<svg viewBox="-100 -100 200 200">${burst}</svg>`}</span
      >
      <span class="k">${this.kicker}</span>
      <span class="iss">${this.issue}</span>
      <span class="sb"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-dispatch": MsbDispatch;
  }
}
