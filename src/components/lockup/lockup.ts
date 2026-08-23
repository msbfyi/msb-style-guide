import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

const BLOCK_STYLES = [
  { bg: "var(--romantic, #b71c2a)", fg: "var(--light, #f5f5f0)", rotate: "-3deg" },
  { bg: "var(--essence, #e8b98a)", fg: "var(--formal, #1b2a52)", rotate: "3deg" },
  { bg: "var(--energy, #2e7d52)", fg: "var(--light, #f5f5f0)", rotate: "-2deg" },
];

/**
 * The primary mark: a small run of tilted, chamfered letter blocks
 * (one per character of `initials`, cycling through the three block
 * colors) followed by a domain suffix and, optionally, a name label
 * underneath.
 */
@customElement("msb-lockup")
export class MsbLockup extends LitElement {
  static styles = [
    chamferRules(".blk"),
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        gap: 11px;
      }
      .blocks {
        display: flex;
        align-items: flex-end;
        gap: 7px;
      }
      .blk {
        width: 46px;
        aspect-ratio: 1 / 1.28;
        display: grid;
        place-items: center;
        font-family: var(--display, sans-serif);
        font-size: 23px;
        line-height: 1;
      }
      .dom {
        font-family: var(--display, sans-serif);
        font-size: 23px;
        letter-spacing: -0.03em;
        padding: 0 0 2px 5px;
        color: var(--ink, #1b2a52);
      }
      .nm {
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.24em;
        font-weight: 600;
        font-size: 12px;
        color: var(--muted, #3b1f2b);
      }
    `,
  ];

  /** Letters rendered as blocks, e.g. "MSB". */
  @property() initials = "MSB";

  /** Domain suffix rendered after the blocks. */
  @property() domain = ".fyi";

  /** Optional name label rendered below the mark. */
  @property() name = "";

  render() {
    const letters = this.initials.split("");
    return html`
      <div class="blocks">
        ${letters.map((letter, i) => {
          const style = BLOCK_STYLES[i % BLOCK_STYLES.length];
          return html`<span
            class="blk"
            style="background:${style.bg};color:${style.fg};transform:rotate(${style.rotate})"
            >${letter}</span
          >`;
        })}
        <span class="dom">${this.domain}</span>
      </div>
      ${this.name ? html`<span class="nm">${this.name}</span>` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-lockup": MsbLockup;
  }
}
