/**
 * @msbfyi/style-guide — the Vital Spring design system.
 *
 * Most of this system is a **CSS pattern library**, not JavaScript:
 * plain classes (`.msb-card`, `.msb-badge--energy`, ...) applied to
 * plain HTML, documented under "Patterns" in Storybook. Load
 * `@msbfyi/style-guide/tokens.css` and `@msbfyi/style-guide/patterns.css`
 * once, globally — no JS import needed for any of that, and no
 * flash-of-undefined-element risk since there's no custom element to
 * upgrade.
 *
 * This module (the one JS entry point) exists only for the one piece
 * of the system that's genuinely stateful: `<msb-mode-toggle>`.
 * Importing it registers that one custom element.
 */

export { MsbModeToggle } from "./components/mode-toggle/mode-toggle.js";
export type { ThemeMode } from "./components/mode-toggle/mode-toggle.js";
