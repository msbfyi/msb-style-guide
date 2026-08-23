import { svg } from "lit";

/**
 * The starburst ornament used by <vs-dispatch>. The original mockup
 * defines this once as a document-level <svg><defs><g id="burst">
 * and references it via <use href="#burst">, but `<use>` idref
 * lookups don't cross a shadow-DOM boundary — so every shadow-DOM
 * component that wants this ornament has to inline the path data
 * itself. This is the one copy; import it rather than redefining it.
 */
export const burst = svg`
  <g fill="currentColor">
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
  </g>
`;
