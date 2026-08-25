import { expect, fixture, html } from "@open-wc/testing";
import "./badge.js";
import type { MsbBadge } from "./badge.js";

describe("msb-badge", () => {
  it("defaults to the default variant", async () => {
    const el = await fixture<MsbBadge>(html`<msb-badge>Label</msb-badge>`);
    expect(el.variant).to.equal("default");
    expect(el.getAttribute("variant")).to.equal("default");
  });

  it("reflects the variant property to an attribute", async () => {
    const el = await fixture<MsbBadge>(
      html`<msb-badge variant="energy">Label</msb-badge>`,
    );
    expect(el.variant).to.equal("energy");
    expect(el.getAttribute("variant")).to.equal("energy");
  });

  it("renders slotted content", async () => {
    const el = await fixture<MsbBadge>(html`<msb-badge>Trusted</msb-badge>`);
    expect(el.textContent?.trim()).to.equal("Trusted");
  });
});
