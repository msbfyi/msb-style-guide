import { expect, fixture, html } from "@open-wc/testing";
import "./input.js";
import type { MsbInput } from "./input.js";

describe("msb-input", () => {
  it("renders the label and forwards type/placeholder to the native input", async () => {
    const el = await fixture<MsbInput>(
      html`<msb-input
        label="Email"
        type="email"
        placeholder="you@example.com"
      ></msb-input>`,
    );
    expect(el.shadowRoot!.querySelector(".l")?.textContent).to.equal("Email");
    const input = el.shadowRoot!.querySelector("input")!;
    expect(input.type).to.equal("email");
    expect(input.placeholder).to.equal("you@example.com");
  });

  it("omits the label element entirely when label is empty", async () => {
    const el = await fixture<MsbInput>(html`<msb-input></msb-input>`);
    // Boolean, not the node itself — see button.test.ts's comment on this.
    expect(el.shadowRoot!.querySelector(".l") === null).to.be.true;
  });

  it("updates the value property when the user types, and it crosses the shadow boundary via the native composed input event", async () => {
    const el = await fixture<MsbInput>(html`<msb-input></msb-input>`);
    const input = el.shadowRoot!.querySelector("input")!;

    let observedValue: string | undefined;
    el.addEventListener("input", () => {
      observedValue = el.value;
    });

    input.value = "hello@example.com";
    input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));

    expect(el.value).to.equal("hello@example.com");
    expect(observedValue).to.equal("hello@example.com");
  });

  it("focus() focuses the internal native input", async () => {
    const el = await fixture<MsbInput>(html`<msb-input></msb-input>`);
    el.focus();
    expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector("input"));
  });
});
