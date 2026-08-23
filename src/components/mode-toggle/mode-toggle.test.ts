import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "./mode-toggle.js";
import type { MsbModeToggle } from "./mode-toggle.js";

describe("msb-mode-toggle", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.removeItem("msb-theme");
    } catch {
      /* ignore */
    }
  });

  it("starts in auto mode with no persisted preference", async () => {
    const el = await fixture<MsbModeToggle>(html`<msb-mode-toggle></msb-mode-toggle>`);
    const buttons = el.shadowRoot!.querySelectorAll("button");
    const pressed = [...buttons].find((b) => b.getAttribute("aria-pressed") === "true");
    expect(pressed?.textContent?.trim()).to.equal("Auto");
    expect(document.documentElement.hasAttribute("data-theme")).to.be.false;
  });

  it("applies data-theme to <html> and persists to localStorage when not manual", async () => {
    const el = await fixture<MsbModeToggle>(html`<msb-mode-toggle></msb-mode-toggle>`);
    const darkButton = [...el.shadowRoot!.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Dark",
    )!;
    darkButton.click();
    expect(document.documentElement.getAttribute("data-theme")).to.equal("dark");
    expect(localStorage.getItem("msb-theme")).to.equal("dark");
  });

  it("removes the persisted key when switching back to auto", async () => {
    const el = await fixture<MsbModeToggle>(html`<msb-mode-toggle></msb-mode-toggle>`);
    const buttons = el.shadowRoot!.querySelectorAll("button");
    const [lightBtn, autoBtn] = [
      [...buttons].find((b) => b.textContent?.trim() === "Light")!,
      [...buttons].find((b) => b.textContent?.trim() === "Auto")!,
    ];
    lightBtn.click();
    expect(localStorage.getItem("msb-theme")).to.equal("light");
    autoBtn.click();
    expect(localStorage.getItem("msb-theme")).to.be.null;
    expect(document.documentElement.hasAttribute("data-theme")).to.be.false;
  });

  it("reads a previously persisted preference on connect", async () => {
    localStorage.setItem("msb-theme", "dark");
    const el = await fixture<MsbModeToggle>(html`<msb-mode-toggle></msb-mode-toggle>`);
    const pressed = [...el.shadowRoot!.querySelectorAll("button")].find(
      (b) => b.getAttribute("aria-pressed") === "true",
    );
    expect(pressed?.textContent?.trim()).to.equal("Dark");
    expect(document.documentElement.getAttribute("data-theme")).to.equal("dark");
  });

  it("with manual set, never touches the document or localStorage, only fires the event", async () => {
    const el = await fixture<MsbModeToggle>(
      html`<msb-mode-toggle manual></msb-mode-toggle>`,
    );
    const darkButton = [...el.shadowRoot!.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Dark",
    )!;
    const eventPromise = oneEvent(el, "msb-mode-change");
    darkButton.click();
    const { detail } = await eventPromise;
    expect(detail.mode).to.equal("dark");
    expect(document.documentElement.hasAttribute("data-theme")).to.be.false;
    expect(localStorage.getItem("msb-theme")).to.be.null;
  });
});
