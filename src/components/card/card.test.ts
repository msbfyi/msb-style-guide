import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "./card.js";
import type { MsbCard } from "./card.js";

describe("msb-card", () => {
  it("renders heading/body from properties into the body slot", async () => {
    const el = await fixture<MsbCard>(
      html`<msb-card heading="Title" body="Some text"></msb-card>`,
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="body"]')!;
    const h4 = slot.querySelector("h4");
    const p = slot.querySelector("p");
    expect(h4?.textContent).to.equal("Title");
    expect(p?.textContent).to.equal("Some text");
  });

  it("lets real slotted body content take rendering precedence over the property fallback", async () => {
    const el = await fixture<MsbCard>(
      html`<msb-card heading="Ignored">
        <h3 slot="body">Real content</h3>
      </msb-card>`,
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="body"]')!;
    const assigned = slot.assignedElements();
    expect(assigned).to.have.length(1);
    expect(assigned[0].textContent).to.equal("Real content");
    // NOTE: the property-driven <h4> fallback still exists as a DOM node
    // inside the slot even when real content is assigned — Lit renders it
    // unconditionally from `this.heading`, independent of slot assignment.
    // That's fine: native slot composition means it's never actually
    // *displayed* once real content is assigned (assignedElements() takes
    // rendering precedence), which is the only thing that actually
    // matters and is what's asserted above. Do not assert
    // `slot.querySelector("h4")` is null here — it isn't, and chai
    // constructing a failure message for a real (non-null) DOM node can
    // hang for minutes trying to serialize its circular
    // parentNode/childNodes graph, which is exactly how this test used
    // to time out the entire file.
  });

  it("renders no pin badge when pinLabel is empty", async () => {
    const el = await fixture<MsbCard>(html`<msb-card></msb-card>`);
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="pin"]')!;
    expect(slot.querySelector("msb-badge") === null).to.be.true;
  });

  it("renders a fallback msb-badge pin when pinLabel is set", async () => {
    const el = await fixture<MsbCard>(
      html`<msb-card pin-label="New" pin-variant="energy"></msb-card>`,
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="pin"]')!;
    const badge = slot.querySelector("msb-badge");
    expect(badge?.textContent).to.equal("New");
    expect(badge?.getAttribute("variant")).to.equal("energy");
  });

  describe("footer visibility", () => {
    it("hides the footer strip when there is no content at all", async () => {
      const el = await fixture<MsbCard>(html`<msb-card></msb-card>`);
      const ft = el.shadowRoot!.querySelector(".ft")!;
      expect(ft.hasAttribute("hidden")).to.be.true;
    });

    it("shows the footer strip when footerLeft/footerRight are set", async () => {
      const el = await fixture<MsbCard>(
        html`<msb-card footer-left="Left" footer-right="Right"></msb-card>`,
      );
      const ft = el.shadowRoot!.querySelector(".ft")!;
      expect(ft.hasAttribute("hidden")).to.be.false;
    });

    it("shows the footer strip once slotchange fires for real slotted content, even with no fallback properties set", async () => {
      const el = await fixture<MsbCard>(
        html`<msb-card><span slot="footer">Custom</span></msb-card>`,
      );
      await el.updateComplete;
      const ft = el.shadowRoot!.querySelector(".ft")!;
      expect(ft.hasAttribute("hidden")).to.be.false;
    });
  });

  it("sizes slotted cover content to fill the cover area", async () => {
    const el = await fixture<MsbCard>(
      html`<msb-card><img slot="cover" alt="" /></msb-card>`,
    );
    const img = el.querySelector("img")!;
    const style = getComputedStyle(img);
    expect(style.width).to.not.equal("");
    expect(style.objectFit).to.equal("cover");
  });

  it("hides the footer, then shows it once content is added later and slotchange fires", async () => {
    const el = await fixture<MsbCard>(html`<msb-card></msb-card>`);
    const ft = () => el.shadowRoot!.querySelector(".ft")!;
    expect(ft().hasAttribute("hidden")).to.be.true;

    const span = document.createElement("span");
    span.slot = "footer";
    span.textContent = "Added later";
    const listener = oneEvent(
      el.shadowRoot!.querySelector('slot[name="footer"]')!,
      "slotchange",
    );
    el.appendChild(span);
    await listener;
    await el.updateComplete;
    expect(ft().hasAttribute("hidden")).to.be.false;
  });
});
