import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { chamferRules } from "../../internal/chamfer.js";

/**
 * A labeled text input. Wraps a real `<input>` — native `input`/
 * `change` events are composed and cross the shadow boundary
 * unmodified, so listen for them directly on this element.
 *
 * @csspart input - The internal native input element.
 */
@customElement("msb-input")
export class MsbInput extends LitElement {
  static styles = [
    chamferRules("input"),
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 7px;
        width: 100%;
      }
      .l {
        font-family: var(--cond, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 10.5px;
        font-weight: 600;
        color: var(--muted, #3b1f2b);
      }
      input {
        font-family: var(--body, sans-serif);
        font-size: 15px;
        padding: 12px 18px;
        border: 0;
        background: var(--paper, #f5f5f0);
        color: var(--ink, #1b2a52);
        outline: none;
        width: 100%;
        --vs-stroke: var(--ink, #1b2a52);
      }
      input:focus {
        --vs-stroke: var(--energy, #2e7d52);
        box-shadow: 0 0 0 3px rgba(46, 125, 82, 0.18);
      }
    `,
  ];

  @property() label = "";
  @property() type: "text" | "email" | "password" | "tel" | "search" | "url" = "text";
  @property() placeholder = "";
  @property() value = "";
  @property() name = "";
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query("input") private inputEl!: HTMLInputElement;

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  /** Focuses the internal input. */
  focus() {
    this.inputEl?.focus();
  }

  render() {
    return html`
      ${this.label ? html`<span class="l">${this.label}</span>` : null}
      <input
        part="input"
        type=${this.type}
        name=${this.name}
        placeholder=${this.placeholder}
        .value=${this.value}
        ?required=${this.required}
        ?disabled=${this.disabled}
        @input=${this.onInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "msb-input": MsbInput;
  }
}
