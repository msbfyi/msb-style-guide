import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

export type ButtonVariant = "primary" | "secondary" | "dark";

/**
 * A chamfered pill button in three variants: primary (Energy fill),
 * secondary (outline), dark (Dramatic fill, "spotlight"). Renders a
 * real `<button>` internally for correct focus/click/form semantics.
 *
 * @slot - Button label content.
 *
 * @csspart button - The internal native button element.
 */
@customElement("msb-button")
export class MsbButton extends LitElement {
  static styles = [
    chamferRules("button"),
    css`
      :host {
        display: inline-block;
      }
      button {
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 14px;
        font-weight: 700;
        padding: 12px 26px;
        border: 0;
        background: var(--energy, #2e7d52);
        color: var(--light, #f5f5f0);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 9px;
        transition:
          background 0.12s,
          color 0.12s;
        --vs-stroke: var(--energy, #2e7d52);
        font: inherit;
      }
      button:hover {
        background: var(--romantic, #b71c2a);
        --vs-stroke: var(--romantic, #b71c2a);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host([variant="secondary"]) button {
        background: transparent;
        color: var(--ink, #1b2a52);
        --vs-stroke: var(--ink, #1b2a52);
      }
      :host([variant="secondary"]) button:hover {
        background: var(--ink, #1b2a52);
        color: var(--paper, #f5f5f0);
      }
      :host([variant="dark"]) button {
        background: var(--dramatic, #1a3a8f);
        --vs-stroke: var(--dramatic, #1a3a8f);
      }
      .d {
        width: 9px;
        height: 9px;
        background: currentColor;
        transform: rotate(45deg);
        flex: none;
      }
    `,
  ];

  /** Visual variant. */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  /** Native button `type` attribute. */
  @property() type: "button" | "submit" | "reset" = "button";

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Shows the small rotated-square "dot" glyph before the label. */
  @property({ type: Boolean }) dot = false;

  render() {
    return html`
      <button part="button" type=${this.type} ?disabled=${this.disabled}>
        ${this.dot ? html`<span class="d"></span>` : null}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-button": MsbButton;
  }
}
