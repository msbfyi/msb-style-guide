import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

export type ThemeMode = "light" | "auto" | "dark";

const STORAGE_KEY = "msb-theme";

/**
 * A segmented light/auto/dark control. Self-managing by default: on
 * connect it reads the persisted choice (if any) and applies it to
 * `<html data-theme>`, and every click updates both the DOM and
 * `localStorage`. Set `manual` to opt out and just listen for
 * `msb-mode-change` instead — useful if the host app already owns
 * theme application.
 *
 * @fires msb-mode-change - `detail: { mode: ThemeMode }`
 */
@customElement("msb-mode-toggle")
export class MsbModeToggle extends LitElement {
  static styles = [
    chamferRules("button"),
    css`
      :host {
        display: inline-block;
      }
      .grp {
        display: flex;
        gap: 5px;
        padding: 4px;
      }
      button {
        font: inherit;
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-weight: 700;
        font-size: 10.5px;
        padding: 7px 13px;
        border: 0;
        background: transparent;
        color: var(--ink, #1b2a52);
        cursor: pointer;
        line-height: 1;
        --vs-chamfer: 6px;
        --vs-stroke: transparent;
      }
      button[aria-pressed="true"] {
        background: var(--ink, #1b2a52);
        color: var(--paper, #f5f5f0);
        --vs-stroke: var(--ink, #1b2a52);
      }
    `,
  ];

  /** When true, this component only emits events — it never touches
   * `document.documentElement` or `localStorage` itself. */
  @property({ type: Boolean, reflect: true }) manual = false;

  @state() private mode: ThemeMode = "auto";

  connectedCallback() {
    super.connectedCallback();
    if (this.manual) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable (private mode, SSR, etc.) — fall back to auto */
    }
    this.mode = saved === "light" || saved === "dark" ? saved : "auto";
    this.applyToDocument(this.mode);
  }

  private applyToDocument(mode: ThemeMode) {
    if (mode === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", mode);
    }
  }

  private select(mode: ThemeMode) {
    this.mode = mode;
    if (!this.manual) {
      this.applyToDocument(mode);
      try {
        mode === "auto"
          ? localStorage.removeItem(STORAGE_KEY)
          : localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        /* ignore */
      }
    }
    this.dispatchEvent(
      new CustomEvent("msb-mode-change", {
        detail: { mode },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const modes: { mode: ThemeMode; label: string }[] = [
      { mode: "light", label: "Light" },
      { mode: "auto", label: "Auto" },
      { mode: "dark", label: "Dark" },
    ];
    return html`
      <div class="grp" role="group" aria-label="Colour mode">
        ${modes.map(
          ({ mode, label }) => html`
            <button
              type="button"
              aria-pressed=${this.mode === mode}
              @click=${() => this.select(mode)}
            >
              ${label}
            </button>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-mode-toggle": MsbModeToggle;
  }
  interface HTMLElementEventMap {
    "msb-mode-change": CustomEvent<{ mode: ThemeMode }>;
  }
}
