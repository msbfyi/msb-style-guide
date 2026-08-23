import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

/**
 * An index entry: a title link, a date, and an optional "Update"
 * chip — the row used to list posts.
 */
@customElement("msb-entry")
export class MsbEntry extends LitElement {
  static styles = [
    chamferRules(".upd"),
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }
      .top {
        display: flex;
        gap: 12px;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .ttl {
        font-size: 19px;
        font-weight: 700;
        line-height: 1.28;
        letter-spacing: -0.015em;
        text-decoration: none;
        color: var(--ink, #1b2a52);
        font-family: var(--body, sans-serif);
      }
      .ttl:hover {
        color: var(--link-h, #b71c2a);
      }
      .meta {
        display: flex;
        gap: 7px;
        align-items: center;
      }
      .dt {
        font-family: var(--mono, monospace);
        font-size: 11.5px;
        color: var(--muted, #3b1f2b);
        white-space: nowrap;
      }
      .upd {
        --vs-chamfer: 6px;
        --vs-stroke: var(--energy, #2e7d52);
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-weight: 700;
        font-size: 10px;
        padding: 4px 11px;
        background: var(--energy, #2e7d52);
        color: var(--light, #f5f5f0);
      }
    `,
  ];

  /** Link target for the title. */
  @property() href = "";

  /** Entry title. */
  @property() label = "";

  /** Date string, rendered in mono. */
  @property() date = "";

  /** Shows the "Update" chip. */
  @property({ type: Boolean }) hasUpdate = false;

  render() {
    return html`
      <div class="top">
        <a class="ttl" href=${this.href}
          ><slot>${this.label}</slot></a
        >
        <span class="meta">
          <span class="dt">${this.date}</span>
          ${this.hasUpdate ? html`<span class="upd">Update</span>` : null}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-entry": MsbEntry;
  }
}
