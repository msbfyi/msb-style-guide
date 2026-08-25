import { expect, fixture, html } from "@open-wc/testing";
import "./dispatch.js";
import type { MsbDispatch } from "./dispatch.js";

describe("msb-dispatch", () => {
  it("defaults to display:flex column stacking — regression guard for the story bug that overrode this to display:block and ran the kicker/issue/sub copy together inline", async () => {
    const el = await fixture<MsbDispatch>(html`<msb-dispatch></msb-dispatch>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal("flex");
    expect(style.flexDirection).to.equal("column");
  });

  it("defaults the kicker to 'Current issue'", async () => {
    const el = await fixture<MsbDispatch>(html`<msb-dispatch></msb-dispatch>`);
    expect(el.shadowRoot!.querySelector(".k")?.textContent).to.equal("Current issue");
  });

  it("renders the issue value and slotted sub copy", async () => {
    const el = await fixture<MsbDispatch>(
      html`<msb-dispatch issue="07/26/2026">Sub copy here.</msb-dispatch>`,
    );
    expect(el.shadowRoot!.querySelector(".iss")?.textContent).to.equal("07/26/2026");
    const sb = el.shadowRoot!.querySelector(".sb slot") as HTMLSlotElement;
    expect(sb.assignedNodes({ flatten: true })[0]?.textContent).to.equal(
      "Sub copy here.",
    );
  });
});
