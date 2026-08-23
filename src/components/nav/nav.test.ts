import { expect, fixture, html } from "@open-wc/testing";
import "./nav.js";
import type { MsbNav } from "./nav.js";

describe("msb-nav", () => {
  it("renders no brand chip when brand is unset", async () => {
    const el = await fixture<MsbNav>(html`<msb-nav><a href="#">Home</a></msb-nav>`);
    // Boolean, not the node itself — see button.test.ts's comment on this.
    expect(el.shadowRoot!.querySelector(".brand") === null).to.be.true;
  });

  it("renders the brand chip when set", async () => {
    const el = await fixture<MsbNav>(
      html`<msb-nav brand="msb.fyi"><a href="#">Home</a></msb-nav>`,
    );
    expect(el.shadowRoot!.querySelector(".brand")?.textContent).to.equal("msb.fyi");
  });

  it("passes through slotted anchor links unmodified", async () => {
    const el = await fixture<MsbNav>(
      html`<msb-nav>
        <a href="/blog" active>Blog</a>
        <a href="/now">Now</a>
      </msb-nav>`,
    );
    const slot = el.shadowRoot!.querySelector("slot")!;
    const links = slot.assignedElements() as HTMLAnchorElement[];
    expect(links).to.have.length(2);
    expect(links[0].hasAttribute("active")).to.be.true;
    expect(links[1].hasAttribute("active")).to.be.false;
  });
});
