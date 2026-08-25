import { expect, fixture, html } from "@open-wc/testing";
import "./entry.js";
import type { MsbEntry } from "./entry.js";

describe("msb-entry", () => {
  it("renders the title link, href, and date", async () => {
    const el = await fixture<MsbEntry>(
      html`<msb-entry href="/blog/post" label="A Post" date="May 29"></msb-entry>`,
    );
    const link = el.shadowRoot!.querySelector<HTMLAnchorElement>(".ttl")!;
    expect(link.getAttribute("href")).to.equal("/blog/post");
    expect(link.textContent?.trim()).to.equal("A Post");
    expect(el.shadowRoot!.querySelector(".dt")?.textContent).to.equal("May 29");
  });

  it("hides the update chip by default and shows it when hasUpdate is set", async () => {
    const withoutUpdate = await fixture<MsbEntry>(html`<msb-entry></msb-entry>`);
    const withUpdate = await fixture<MsbEntry>(html`<msb-entry hasUpdate></msb-entry>`);
    // Boolean, not the node itself — see button.test.ts's comment on this.
    expect(withoutUpdate.shadowRoot!.querySelector(".upd") === null).to.be.true;
    expect(withUpdate.shadowRoot!.querySelector(".upd")?.textContent).to.equal("Update");
  });

  it("prefers slotted content over the label property for the title", async () => {
    const el = await fixture<MsbEntry>(
      html`<msb-entry label="Ignored">Real Title</msb-entry>`,
    );
    // Deliberately not asserting on `.shadowRoot.querySelector('.ttl').textContent`
    // here: `.textContent` walks the literal DOM tree, and a slot's own
    // fallback children are always structurally present there regardless
    // of whether they're actually being *rendered* (assigned light-DOM
    // content lives outside the shadow tree entirely and is only visually
    // composed in) — so that assertion would silently pass by reading the
    // ignored fallback text back out, never actually verifying which one
    // is really being displayed. assignedNodes() reflects the real,
    // rendered composition.
    const slot = el.shadowRoot!.querySelector("a.ttl slot") as HTMLSlotElement;
    const assigned = slot.assignedNodes({ flatten: true });
    expect(assigned).to.have.length(1);
    expect(assigned[0].textContent?.trim()).to.equal("Real Title");
  });
});
