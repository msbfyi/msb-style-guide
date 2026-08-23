# MSB Style Guide

Web component library for the **Vital Spring** design system —
msb.fyi's visual identity, extracted from `Style Guide v3.html` into
real, installable [Lit](https://lit.dev) custom elements with a hosted
[Storybook](https://storybook.js.org).

Source: [davidzyla.com — The Color of
Style](https://davidzyla.com/the-color-of-style/) (archetype: Vital
Spring), translated into a chamfered-corner, flat-field, no-gradient
component system.

## Install

```sh
npm install @msbfyi/style-guide
```

Load the design tokens once, globally — custom properties pierce the
shadow-DOM boundary, so this is the one thing every component depends
on from outside itself:

```html
<link rel="stylesheet" href="node_modules/@msbfyi/style-guide/dist/tokens.css" />
```

or in a bundler:

```js
import "@msbfyi/style-guide/tokens.css";
```

You'll also want the four Google Fonts the system uses (Krona One, DM
Sans, Barlow Condensed, JetBrains Mono) — see `.storybook/preview-head.html`
for the exact `<link>` tags.

## Use

```js
import "@msbfyi/style-guide"; // registers every custom element
```

```html
<msb-button variant="primary" dot>Get in touch</msb-button>

<msb-badge variant="energy">Trusted</msb-badge>

<msb-nav brand="msb.fyi">
  <a href="/blog" active>Blog</a>
  <a href="/notes">Notes</a>
</msb-nav>

<msb-mode-toggle></msb-mode-toggle>
```

Import only what you need instead, if you'd rather not register
everything:

```js
import { MsbButton, MsbBadge } from "@msbfyi/style-guide";
```

## Components

| Element             | From Style Guide v3 §07           |
| ------------------- | --------------------------------- |
| `<msb-lockup>`      | Lockup — primary mark             |
| `<msb-button>`      | Buttons — primary/secondary/dark  |
| `<msb-badge>`       | Badges — 5 status fills           |
| `<msb-nav>`         | Navigation rail                   |
| `<msb-input>`       | Labeled text input                |
| `<msb-card>`        | Pattern-cover card                |
| `<msb-divider>`     | Ball & rod separator              |
| `<msb-dispatch>`    | Dispatch plate                    |
| `<msb-stamp>`       | Notice stamp                      |
| `<msb-entry>`       | Index entry                       |
| `<msb-mode-toggle>` | Light/auto/dark segmented control |

Full API for each — props, slots, CSS parts — is documented in its
Storybook page.

## Develop

```sh
npm install
npm run storybook          # dev server at localhost:6006
npm run build               # library build -> dist/
npm run build-storybook     # static Storybook -> storybook-static/
npm run typecheck
npm run lint                # eslint-plugin-lit + eslint-plugin-wc + TS
npm run format               # prettier --write
npm test                     # component unit tests, real Chromium
npm run test:storybook       # interaction tests + visual regression
npm run test:storybook:update  # regenerate visual baselines after an
                                # *intentional* visual change
```

Full testing philosophy — what each layer catches, and two real gotchas
(chai hanging on DOM-node assertions, `::slotted()` vs. slot fallback
content) — is documented in `AGENTS.md`.

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

**This package is in beta.** Every release right now is a
`0.x.y-beta.N` prerelease (`release-please-config.json` has
`"prerelease": true`) — it stays that way until told otherwise, even
once things look stable.

## Scope notes

Still deliberately deferred: full `ElementInternals` form participation
on `<msb-input>`, and wiring this library into msb-blog itself (it's
still a standalone package — msb-blog runs its own separate, hand-
written CSS today).

## License

MIT
