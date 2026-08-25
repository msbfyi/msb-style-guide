import { expect, fixture, html } from "@open-wc/testing";
import "./stamp.js";
import type { MsbStamp } from "./stamp.js";

describe("msb-stamp", () => {
  it("defaults the label to 'Warning'", async () => {
    const el = await fixture<MsbStamp>(html`<msb-stamp></msb-stamp>`);
    expect(el.shadowRoot!.querySelector(".sl")?.textContent).to.equal("Warning");
  });

  it("renders a custom label and slotted body copy", async () => {
    const el = await fixture<MsbStamp>(
      html`<msb-stamp label="Notice">Body copy here.</msb-stamp>`,
    );
    expect(el.shadowRoot!.querySelector(".sl")?.textContent).to.equal("Notice");
    const slot = el.shadowRoot!.querySelector(".sb slot") as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true })[0]?.textContent).to.equal(
      "Body copy here.",
    );
  });
});
