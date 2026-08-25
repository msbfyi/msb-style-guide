import { expect, fixture, html } from "@open-wc/testing";
import "./lockup.js";
import type { MsbLockup } from "./lockup.js";

describe("msb-lockup", () => {
  it("renders one .blk block per character of initials, in order", async () => {
    const el = await fixture<MsbLockup>(html`<msb-lockup initials="MSB"></msb-lockup>`);
    const blocks = el.shadowRoot!.querySelectorAll(".blk");
    expect(blocks).to.have.length(3);
    expect([...blocks].map((b) => b.textContent)).to.deep.equal(["M", "S", "B"]);
  });

  it("renders the domain suffix", async () => {
    const el = await fixture<MsbLockup>(
      html`<msb-lockup initials="MSB" domain=".fyi"></msb-lockup>`,
    );
    expect(el.shadowRoot!.querySelector(".dom")?.textContent).to.equal(".fyi");
  });

  it("omits the name label when name is empty", async () => {
    const el = await fixture<MsbLockup>(
      html`<msb-lockup initials="MSB" name=""></msb-lockup>`,
    );
    // Boolean, not the node itself — see button.test.ts's comment on this.
    expect(el.shadowRoot!.querySelector(".nm") === null).to.be.true;
  });

  it("renders the name label when set", async () => {
    const el = await fixture<MsbLockup>(
      html`<msb-lockup initials="MSB" name="Michael Sean Becker"></msb-lockup>`,
    );
    expect(el.shadowRoot!.querySelector(".nm")?.textContent).to.equal(
      "Michael Sean Becker",
    );
  });

  it("cycles block color variants for more than three characters instead of erroring", async () => {
    const el = await fixture<MsbLockup>(html`<msb-lockup initials="MSBX"></msb-lockup>`);
    const blocks = el.shadowRoot!.querySelectorAll(".blk");
    expect(blocks).to.have.length(4);
  });
});
