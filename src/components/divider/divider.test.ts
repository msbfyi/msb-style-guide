import { expect, fixture, html } from "@open-wc/testing";
import "./divider.js";
import type { MsbDivider } from "./divider.js";

describe("msb-divider", () => {
  it("defaults to display:flex — regression guard for the story bug that overrode this to display:block and made the whole component invisible", async () => {
    const el = await fixture<MsbDivider>(html`<msb-divider></msb-divider>`);
    expect(getComputedStyle(el).display).to.equal("flex");
  });

  it("renders the dot—line—diamond—line—dot sequence", async () => {
    const el = await fixture<MsbDivider>(html`<msb-divider></msb-divider>`);
    const children = [...el.shadowRoot!.children].map((c) => c.className);
    expect(children).to.deep.equal(["dot", "line", "dia", "line", "dot"]);
  });
});
