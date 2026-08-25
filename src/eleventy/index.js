// Eleventy plugin: shortcodes that emit the correct markup + classes
// for each pattern in @msbfyi/style-guide's CSS pattern library — see
// AddingPatterns.mdx for the class reference these generate. This is
// the actual source of truth for *structure*, not just style: a
// consumer calling {% msbLockup %} always gets the current, correct
// per-letter block classes and chamfer composition, instead of every
// consumer hand-copying that structure into its own templates (which
// drifts — the exact problem this plugin exists to avoid).
//
// Usage (an Eleventy project's .eleventy.js):
//   import styleGuidePlugin from "@msbfyi/style-guide/eleventy";
//   eleventyConfig.addPlugin(styleGuidePlugin);
// Also load the CSS separately — this plugin only emits markup, it
// doesn't touch tokens.css/patterns.css. See the package README.
import { BURST_SVG } from "./burst.js";

/** Minimal HTML-escaping for text interpolated into these templates —
 * shortcode arguments are usually front-matter-authored text (a post
 * title, a name), not attacker input, but "Tips & Tricks" unescaped
 * still produces invalid HTML, so this is a correctness fix, not just
 * a security one. */
function esc(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

export default function styleGuideEleventyPlugin(eleventyConfig) {
  /** {% msbLockup initials="MSB", domain=".fyi", name="..." %} */
  eleventyConfig.addShortcode(
    "msbLockup",
    (initials = "MSB", domain = ".fyi", name = "") => {
      const blocks = initials
        .split("")
        .map((letter, i) => {
          const n = (i % 3) + 1;
          return `<span class="msb-lockup__block msb-lockup__block--${n} msb-chamfer">${esc(letter)}</span>`;
        })
        .join("");
      return [
        `<div class="msb-lockup">`,
        `<div class="msb-lockup__blocks">${blocks}<span class="msb-lockup__domain">${esc(domain)}</span></div>`,
        name ? `<span class="msb-lockup__name">${esc(name)}</span>` : "",
        `</div>`,
      ].join("");
    },
  );

  /** {% msbBadge "Trusted", "energy" %} — variant is optional. */
  eleventyConfig.addShortcode("msbBadge", (label, variant = "") => {
    const variantClass = variant ? ` msb-badge--${variant}` : "";
    return `<span class="msb-badge${variantClass} msb-chamfer msb-chamfer--sm">${esc(label)}</span>`;
  });

  /**
   * {% msbButton "Get in touch", { variant: "primary", href: "/contact/", dot: true } %}
   * Renders <a> when href is given, otherwise a real <button>.
   */
  eleventyConfig.addShortcode("msbButton", (label, opts = {}) => {
    const { variant = "primary", href, type = "button", dot = false } = opts;
    const variantClass = variant !== "primary" ? ` msb-btn--${variant}` : "";
    const dotSpan = dot ? `<span class="msb-btn__dot"></span>` : "";
    const inner = `${dotSpan}${esc(label)}`;
    return href
      ? `<a class="msb-btn${variantClass} msb-chamfer" href="${esc(href)}">${inner}</a>`
      : `<button class="msb-btn${variantClass} msb-chamfer" type="${esc(type)}">${inner}</button>`;
  });

  /** {% msbDivider %} — fixed markup, no arguments. */
  eleventyConfig.addShortcode(
    "msbDivider",
    () =>
      `<div class="msb-divider" role="separator"><span class="msb-divider__dot"></span><span class="msb-divider__line"></span><span class="msb-divider__diamond"></span><span class="msb-divider__line"></span><span class="msb-divider__dot"></span></div>`,
  );

  /** {% msbStamp "Warning" %}Body copy.{% endmsbStamp %} */
  eleventyConfig.addPairedShortcode(
    "msbStamp",
    (content, label = "Warning") =>
      `<div class="msb-stamp"><div class="msb-stamp__label">${esc(label)}</div><div class="msb-stamp__body">${content}</div></div>`,
  );

  /**
   * {% msbDispatch { kicker: "Current issue", issue: "No. 04" } %}
   * Sub copy goes here.
   * {% enddispatch %}
   */
  eleventyConfig.addPairedShortcode("msbDispatch", (content, opts = {}) => {
    const { kicker = "Current issue", issue = "" } = opts;
    return [
      `<div class="msb-dispatch msb-chamfer msb-chamfer--lg">`,
      `<span class="msb-dispatch__burst" aria-hidden="true">${BURST_SVG}</span>`,
      `<span class="msb-dispatch__kicker">${esc(kicker)}</span>`,
      `<span class="msb-dispatch__issue">${esc(issue)}</span>`,
      `<span class="msb-dispatch__sub">${content}</span>`,
      `</div>`,
    ].join("");
  });

  /** {% msbEntry { href: "/blog/x/", title: "...", date: "May 29", hasUpdate: true } %} */
  eleventyConfig.addShortcode("msbEntry", (opts = {}) => {
    const { href = "#", title = "", date = "", hasUpdate = false } = opts;
    return [
      `<div class="msb-entry"><div class="msb-entry__top">`,
      `<a class="msb-entry__title" href="${esc(href)}">${esc(title)}</a>`,
      `<span class="msb-entry__meta"><span class="msb-entry__date">${esc(date)}</span>`,
      hasUpdate
        ? `<span class="msb-entry__update msb-chamfer msb-chamfer--sm">Update</span>`
        : "",
      `</span></div></div>`,
    ].join("");
  });
}
