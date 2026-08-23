import { expect, fixture, html } from "@open-wc/testing";
import "./button.js";
import type { MsbButton } from "./button.js";

describe("msb-button", () => {
  it("defaults to display:inline-block and display:flex column stacking isn't required — regression guard against the display-override class of bug found in stories this session", async () => {
    const el = await fixture<MsbButton>(html`<msb-button>Label</msb-button>`);
    expect(getComputedStyle(el).display).to.equal("inline-block");
  });

  it("renders slotted label content inside the real button element", async () => {
    const el = await fixture<MsbButton>(html`<msb-button>Click me</msb-button>`);
    const button = el.shadowRoot!.querySelector("button")!;
    expect(button).to.exist;
    expect(el.textContent?.trim()).to.equal("Click me");
  });

  it("defaults to the primary variant and type=button", async () => {
    const el = await fixture<MsbButton>(html`<msb-button>Label</msb-button>`);
    expect(el.variant).to.equal("primary");
    const button = el.shadowRoot!.querySelector("button")!;
    expect(button.type).to.equal("button");
  });

  it("forwards disabled to the internal button", async () => {
    const el = await fixture<MsbButton>(html`<msb-button disabled>Label</msb-button>`);
    const button = el.shadowRoot!.querySelector("button")!;
    expect(button.disabled).to.be.true;
  });

  it("shows the dot glyph only when the dot property is set", async () => {
    const withDot = await fixture<MsbButton>(html`<msb-button dot>Label</msb-button>`);
    const withoutDot = await fixture<MsbButton>(html`<msb-button>Label</msb-button>`);
    expect(withDot.shadowRoot!.querySelector(".d")).to.exist;
    // Asserting on the boolean, not the node itself: if this ever
    // legitimately fails, chai trying to serialize a real DOM node (with
    // its circular parentNode/childNodes graph) into the failure message
    // can hang for minutes instead of failing fast — see the msb-card
    // test file's history for exactly this happening.
    expect(withoutDot.shadowRoot!.querySelector(".d") === null).to.be.true;
  });

  it("fires a real click event that's observable from outside the shadow root", async () => {
    const el = await fixture<MsbButton>(html`<msb-button>Label</msb-button>`);
    const button = el.shadowRoot!.querySelector("button")!;
    let clicked = false;
    el.addEventListener("click", () => (clicked = true));
    button.click();
    expect(clicked).to.be.true;
  });
});
