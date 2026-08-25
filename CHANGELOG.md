# Changelog

## [0.2.0-beta.1](https://github.com/msbfyi/msb-style-guide/compare/v0.2.0-beta...v0.2.0-beta.1) (2026-08-25)


### ⚠ BREAKING CHANGES

* <msb-badge>, <msb-button>, <msb-card>, <msb-dispatch>, <msb-divider>, <msb-entry>, <msb-input>, <msb-lockup>, <msb-nav>, and <msb-stamp> no longer exist as custom elements. Use the equivalent .msb-<name> CSS classes on plain HTML instead — see each pattern's Storybook page or src/docs/AddingPatterns.mdx.

### Features

* split into a CSS pattern library, keep one web component ([#14](https://github.com/msbfyi/msb-style-guide/issues/14)) ([97d5308](https://github.com/msbfyi/msb-style-guide/commit/97d5308247d6ba1bea13211417de9f86503fe835))


### Bug Fixes

* chamfer breaks on &lt;button&gt; — self-referential custom property ([#18](https://github.com/msbfyi/msb-style-guide/issues/18)) ([bf940ec](https://github.com/msbfyi/msb-style-guide/commit/bf940ecf699be9dd4c4272520390adf94920316d))
* deploy to the actual Cloudflare Worker, not Pages ([#11](https://github.com/msbfyi/msb-style-guide/issues/11)) ([ca04e8e](https://github.com/msbfyi/msb-style-guide/commit/ca04e8e1334d6238f1d96d4f82c6df26d8f2ec99))
* don't fail storybook-tests on a story with no baseline yet ([#16](https://github.com/msbfyi/msb-style-guide/issues/16)) ([d4a2f7a](https://github.com/msbfyi/msb-style-guide/commit/d4a2f7a532b7e7d4ceea4884a1ff1a82b1620161))
* pin Wrangler 4 for assets-only Worker deploy support ([#13](https://github.com/msbfyi/msb-style-guide/issues/13)) ([8bb4ca2](https://github.com/msbfyi/msb-style-guide/commit/8bb4ca242f0d39984066e03e3da7915f24a3056f))
* update-visual-snapshots missed brand-new baselines entirely ([#15](https://github.com/msbfyi/msb-style-guide/issues/15)) ([3585abc](https://github.com/msbfyi/msb-style-guide/commit/3585abc9adbae2b7e01a8a87bb49de83181bd66c))

## [0.2.0-beta](https://github.com/msbfyi/msb-style-guide/compare/v0.1.0...v0.2.0-beta) (2026-08-25)


### ⚠ BREAKING CHANGES

* initial setup — release-please, doc fixes, HTML addon, full testing ([#1](https://github.com/msbfyi/msb-style-guide/issues/1))

### Features

* initial component library — 11 components, tokens, Storybook docs ([1aeb7cc](https://github.com/msbfyi/msb-style-guide/commit/1aeb7cccd90bf072bcc3a3560715ce93bbc89364))
* initial setup — release-please, doc fixes, HTML addon, full testing ([#1](https://github.com/msbfyi/msb-style-guide/issues/1)) ([c7fd674](https://github.com/msbfyi/msb-style-guide/commit/c7fd674faa576d748fbade9a7e723c9c31f35c59))


### Bug Fixes

* malformed YAML blocking update-visual-snapshots.yml entirely ([#8](https://github.com/msbfyi/msb-style-guide/issues/8)) ([5c550ff](https://github.com/msbfyi/msb-style-guide/commit/5c550ffaf7d7d1a889770ed023b947b54d12dac5))
* release-please computing a real 1.0.0 instead of a beta prerelease ([#6](https://github.com/msbfyi/msb-style-guide/issues/6)) ([990e8cd](https://github.com/msbfyi/msb-style-guide/commit/990e8cd7ab71b1c733cd19f40460fcb81d23609f))
* update-visual-snapshots's own commit blocked by its own lefthook guard ([#9](https://github.com/msbfyi/msb-style-guide/issues/9)) ([ee3dc8b](https://github.com/msbfyi/msb-style-guide/commit/ee3dc8b9f9d54233c8e776e299adbda074cea76a))

## Changelog

_No releases yet — this repo is on `0.x.y-beta.N` prereleases. See
`AGENTS.md` for the beta-status note: don't graduate to a stable
release without explicit sign-off._
