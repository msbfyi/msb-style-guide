# MSB Style Guide

[![CI](https://github.com/msbfyi/msb-style-guide/actions/workflows/ci.yml/badge.svg)](https://github.com/msbfyi/msb-style-guide/actions/workflows/ci.yml)

The **Vital Spring** design system — msb.fyi's visual identity,
extracted from `Style Guide v3.html` into a real, installable CSS
pattern library (plain classes, no JS, no shadow DOM) with a hosted
[Storybook](https://storybook.js.org). One piece — the light/auto/dark
toggle — is a real [Lit](https://lit.dev) web component, since it's
the only part of the system with genuine runtime state.

Source: [davidzyla.com — The Color of
Style](https://davidzyla.com/the-color-of-style/) (archetype: Vital
Spring), translated into a chamfered-corner, flat-field, no-gradient
component system.

## Install

```sh
npm install @msbfyi/style-guide
```

Load the design tokens and the pattern library once, globally — custom
properties pierce the shadow-DOM boundary (relevant for `mode-toggle`
below), and plain CSS classes just need to be on the page:

```html
<link rel="stylesheet" href="node_modules/@msbfyi/style-guide/dist/tokens.css" />
<link
  rel="stylesheet"
  href="node_modules/@msbfyi/style-guide/dist/patterns/patterns.css"
/>
```

or in a bundler:

```js
import "@msbfyi/style-guide/tokens.css";
import "@msbfyi/style-guide/patterns.css";
```

Only need one or two patterns? Import them individually instead of the
whole sheet: `@msbfyi/style-guide/patterns/badge.css`.

You'll also want the four Google Fonts the system uses (Krona One, DM
Sans, Barlow Condensed, JetBrains Mono) — see `.storybook/preview-head.html`
for the exact `<link>` tags.

## Use

Patterns are plain classes on plain HTML — no JS import needed:

```html
<button class="msb-btn msb-chamfer" type="button">Get in touch</button>

<span class="msb-badge msb-badge--energy msb-chamfer msb-chamfer--sm">Trusted</span>

<nav class="msb-nav">
  <span class="msb-nav__brand msb-chamfer">msb.fyi</span>
  <a class="msb-nav__link msb-chamfer" href="/blog" aria-current="page">Blog</a>
  <a class="msb-nav__link msb-chamfer" href="/notes">Notes</a>
</nav>
```

The one real component needs its JS imported to register the custom
element:

```js
import "@msbfyi/style-guide"; // registers <msb-mode-toggle>
```

```html
<msb-mode-toggle></msb-mode-toggle>
```

## Patterns & components

| Class / element     | From Style Guide v3 §07                                        |
| ------------------- | -------------------------------------------------------------- |
| `.msb-lockup`       | Lockup — primary mark                                          |
| `.msb-btn`          | Buttons — primary/secondary/dark                               |
| `.msb-badge`        | Badges — 5 status fills                                        |
| `.msb-nav`          | Navigation rail                                                |
| `.msb-field`        | Labeled text input                                             |
| `.msb-card`         | Pattern-cover card                                             |
| `.msb-divider`      | Ball & rod separator                                           |
| `.msb-dispatch`     | Dispatch plate                                                 |
| `.msb-stamp`        | Notice stamp                                                   |
| `.msb-entry`        | Index entry                                                    |
| `<msb-mode-toggle>` | Light/auto/dark segmented control — the one real web component |

Full markup for each — parts, variants, composition with the chamfer
utility — is documented in its Storybook page (`Patterns/<Name>` or
`Components/Mode Toggle`), and the authoring convention itself is in
`src/docs/AddingPatterns.mdx`.

## Eleventy shortcodes

For an [Eleventy](https://11ty.dev) site, `@msbfyi/style-guide/eleventy`
is a plugin exposing a shortcode per pattern — the package becomes the
source of truth for markup _structure_, not just CSS, so a consumer
never hand-copies the exact class list (and can't have it drift):

```js
// .eleventy.js
import styleGuidePlugin from "@msbfyi/style-guide/eleventy";
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(styleGuidePlugin);
}
```

```njk
{% msbLockup "MSB", ".fyi", "Michael Sean Becker" %}
{% msbBadge "Trusted", "energy" %}
{% msbButton "Get in touch", { variant: "primary", href: "/contact/" } %}
{% msbDivider %}
{% msbEntry { href: "/blog/x/", title: "A post", date: "May 29", hasUpdate: true } %}

{% msbStamp "Warning" %}Body copy.{% endmsbStamp %}
{% msbDispatch { kicker: "Current issue", issue: "No. 04" } %}Sub copy.{% enddispatch %}
```

Still load `tokens.css`/`patterns.css` separately — this plugin only
emits markup, it doesn't touch CSS. No shortcode for `mode-toggle`;
that one's a real web component, not a template snippet.

## Develop

```sh
npm install
npm run storybook          # dev server at localhost:6006
npm run build               # library build -> dist/
npm run build-storybook     # static Storybook -> storybook-static/
npm run typecheck
npm run lint                # eslint-plugin-lit + eslint-plugin-wc + TS
npm run format               # prettier --write
npm test                     # mode-toggle's unit tests, real Chromium
npm run test:storybook       # interaction tests + visual regression
npm run test:storybook:update  # regenerate visual baselines after an
                                # *intentional* visual change
```

Full testing philosophy — what each layer catches, why visual
regression is the primary safety net for the CSS pattern library, and
a real gotcha (chai hanging on DOM-node assertions) — is documented in
`AGENTS.md`.

## Design tokens

See the **Docs → Tokens** page in Storybook for the live token sheet,
or `src/tokens/tokens.css` directly. Palette and neutral values never
change between themes — only six semantic tokens (`--paper`, `--ink`,
`--muted`, `--hair-c`, `--link`, `--link-h`) swap for dark, plus one
library-specific addition, `--plate-stroke`, for fixed color plates
like `<msb-dispatch>` that keep their fill in both themes and only
swap their keyline.

## Versions

Same setup as [msb-blog](https://github.com/msbfyi/msb-blog): commits
follow [Conventional Commits](https://www.conventionalcommits.org/),
[release-please](https://github.com/googleapis/release-please) opens a
`chore(main): release ...` PR on every push to `main`, and merging that
PR cuts the release (tags it, updates `CHANGELOG.md`).

**`1.0.0` and stable.** Releases are plain semver now — a breaking
change bumps the major version.

## Scope notes

Still deliberately deferred: `.msb-field` is styling only, no
`ElementInternals` form-participation JS. [msb-blog](https://github.com/msbfyi/msb-blog)
already consumes `patterns.css` (see its own `AGENTS.md`) — that's the
first real external consumer, not just Storybook previewing itself.

## License

MIT
