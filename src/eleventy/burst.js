// The dispatch plate's starburst ornament, as a raw <g> string — see
// src/patterns/dispatch.stories.ts for the source of truth this is
// copied from (kept in sync by hand; it's small and static, not worth
// a build step to share between a .ts story file and this plain-JS
// plugin). Inlined per-call rather than emitted once as a shared
// <defs> sprite referenced via <use> — a shortcode is called an
// unknown number of times across unknown templates, so there's no
// single "top of page" moment to guarantee the sprite already exists
// by the time a given call renders. The duplication cost is a few
// hundred bytes of static HTML per use, at build time — not worth
// engineering around.
export const BURST_SVG = `<svg viewBox="-100 -100 200 200" fill="currentColor">
  <rect x="-2.5" y="-96" width="5" height="96"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(30)"></rect>
  <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(60)"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(90)"></rect>
  <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(120)"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(150)"></rect>
  <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(180)"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(210)"></rect>
  <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(240)"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(270)"></rect>
  <rect x="-2.5" y="-96" width="5" height="96" transform="rotate(300)"></rect>
  <rect x="-2" y="-64" width="4" height="64" transform="rotate(330)"></rect>
  <circle cx="0" cy="0" r="15"></circle>
</svg>`;
