import { css, unsafeCSS } from "lit";

/**
 * The chamfer keyline treatment used across nearly every component in
 * this system: a clipped corner instead of a rounded one, with a
 * 1.5px stroke drawn by an inverted (evenodd) clip-path on a `::after`
 * pseudo-element rather than a real border (a real border can't
 * follow a clip-path).
 *
 * Two forms, because some components need the chamfer on `:host`
 * itself (badges, cards, stamps — purely presentational boxes) and
 * some need it on a native interactive element living inside shadow
 * DOM (a real `<button>`/`<input>`, for correct focus/click/form
 * semantics) or on slotted light-DOM children (`::slotted(a)`).
 *
 * Both read `--c` (size — 11px default, use 6px under 30px tall e.g.
 * badges, 16px for panels) and `--stroke` (keyline color, defaults to
 * `--ink`) so callers customize per-variant by setting those two
 * custom properties, not by copy-pasting the polygon math.
 */

const clipOuter = css`
  polygon(
    var(--c) 0,
    100% 0,
    100% calc(100% - var(--c)),
    calc(100% - var(--c)) 100%,
    0 100%,
    0 var(--c)
  )
`;

const clipStroke = css`
  polygon(
    evenodd,
    var(--c) 0,
    100% 0,
    100% calc(100% - var(--c)),
    calc(100% - var(--c)) 100%,
    0 100%,
    0 var(--c),
    var(--c) 0,
    calc(var(--c) + 0.6px) 1.5px,
    1.5px calc(var(--c) + 0.6px),
    1.5px calc(100% - 1.5px),
    calc(100% - var(--c) - 0.6px) calc(100% - 1.5px),
    calc(100% - 1.5px) calc(100% - var(--c) - 0.6px),
    calc(100% - 1.5px) 1.5px,
    calc(var(--c) + 0.6px) 1.5px
  )
`;

/** Chamfer applied to `:host` — for non-interactive wrapper components. */
export const chamferHost = css`
  :host {
    --c: var(--vs-chamfer, 11px);
    --stroke: var(--vs-stroke, var(--ink, #1b2a52));
    position: relative;
    clip-path: ${clipOuter};
  }
  :host::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: var(--stroke);
    clip-path: ${clipStroke};
  }
`;

/**
 * Chamfer applied to an arbitrary selector inside the shadow root
 * (e.g. `.btn`, `.field input`) or a slotted-light-DOM selector (e.g.
 * `::slotted(a)`). `selector` must be a fixed string you control —
 * never interpolate untrusted input here.
 */
export function chamferRules(selector: string) {
  const sel = unsafeCSS(selector);
  return css`
    ${sel} {
      --c: var(--vs-chamfer, 11px);
      --stroke: var(--vs-stroke, var(--ink, #1b2a52));
      position: relative;
      clip-path: ${clipOuter};
    }
    ${sel}::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: var(--stroke);
      clip-path: ${clipStroke};
    }
  `;
}
