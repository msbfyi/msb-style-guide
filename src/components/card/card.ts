import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { chamferHost } from "../../internal/chamfer.js";
import "../badge/badge.js";
import type { BadgeVariant } from "../badge/badge.js";

/**
 * A pattern-cover card: an optional cover area (with an optional
 * pinned badge over it), a body, and a footer row.
 *
 * The simple-content properties (`heading`, `body`, `pinLabel`,
 * `footerLeft`, `footerRight`) cover the common case and are what
 * Storybook's Controls panel drives. Each has a matching named slot
 * for full custom markup — a slot with actual assigned content always
 * wins over the property-driven fallback.
 *
 * @slot cover - Cover content (e.g. an image, or a patterned `<div>`).
 *   No property equivalent — covers are visual, not simple text.
 * @slot pin - Positioned top-left over the cover. Falls back to an
 *   `<msb-badge>` built from `pinLabel`/`pinVariant` if not provided.
 * @slot body - Body content. Falls back to `heading`/`body`. Named
 *   deliberately, not the default slot — a named slot only receives
 *   nodes explicitly marked `slot="body"`, so it can't be accidentally
 *   "occupied" by stray whitespace text nodes between sibling elements
 *   in the light DOM (which the unnamed default slot always is, since
 *   whitespace text nodes can't carry a `slot` attribute and so always
 *   fall through to the default slot — silently suppressing its
 *   fallback content even when you never intended to provide any).
 * @slot footer - Footer row, `justify-content: space-between`. Falls
 *   back to `footerLeft`/`footerRight`. The footer strip hides itself
 *   entirely when there's neither slotted content nor a fallback value
 *   — unlike `pin`, it has its own background/border, so an empty one
 *   would otherwise render as a visible blank bar.
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
      .bd ::slotted(h3),
      .bd h4 {
        font-family: var(--display, sans-serif);
        font-size: 16px;
        letter-spacing: -0.01em;
        margin: 0;
      }
      .bd ::slotted(p),
      .bd p {
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
      /* .ft{display:flex} above is an author rule, which beats the
         UA stylesheet's [hidden]{display:none} regardless of
         specificity (author origin always wins over UA origin) — so
         hidden has to be re-asserted here to actually take effect. */
      .ft[hidden] {
        display: none;
      }
    `,
  ];

  /** Fallback heading, rendered in the "body" slot if nothing is assigned. */
  @property() heading = "";

  /** Fallback body text, rendered alongside `heading`. */
  @property() body = "";

  /** Fallback pin badge label. Empty string renders no pin. */
  @property({ attribute: "pin-label" }) pinLabel = "";

  /** Fallback pin badge variant. */
  @property({ attribute: "pin-variant" }) pinVariant: BadgeVariant = "romantic";

  /** Fallback footer left-side text. */
  @property({ attribute: "footer-left" }) footerLeft = "";

  /** Fallback footer right-side text. */
  @property({ attribute: "footer-right" }) footerRight = "";

  // Tracks whether the "footer" slot has real assigned content, so the
  // footer strip (which — unlike .pin — has its own background/border
  // and so is visibly present even empty) can hide itself when there's
  // neither slotted content nor a footerLeft/footerRight fallback.
  // Can't determine this from properties alone: a consumer using the
  // real slot instead of the fallback properties never touches
  // footerLeft/footerRight at all.
  @state() private footerHasSlotted = false;

  private get showFooter() {
    return Boolean(this.footerLeft || this.footerRight || this.footerHasSlotted);
  }

  private handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.footerHasSlotted = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <div class="cov">
        <slot name="cover"></slot>
        <span class="pin">
          <slot name="pin">
            ${this.pinLabel
              ? html`<msb-badge variant=${this.pinVariant}>${this.pinLabel}</msb-badge>`
              : null}
          </slot>
        </span>
      </div>
      <div class="bd">
        <slot name="body">
          ${this.heading ? html`<h4>${this.heading}</h4>` : null}
          ${this.body ? html`<p>${this.body}</p>` : null}
        </slot>
      </div>
      <div class="ft" ?hidden=${!this.showFooter}>
        <slot name="footer" @slotchange=${this.handleFooterSlotChange}>
          ${this.footerLeft || this.footerRight
            ? html`<span>${this.footerLeft}</span><span>${this.footerRight}</span>`
            : null}
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-card": MsbCard;
  }
}
