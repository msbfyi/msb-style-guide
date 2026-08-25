# Changelog

## [1.2.0](https://github.com/msbfyi/msb-style-guide/compare/v1.1.0...v1.2.0) (2026-08-25)


### Features

* Eleventy shortcodes plugin — markup, not just CSS, as shared source of truth ([#32](https://github.com/msbfyi/msb-style-guide/issues/32)) ([02ca4fc](https://github.com/msbfyi/msb-style-guide/commit/02ca4fc77236664774e024d85e4373e0fb6d93bf))

## [1.1.0](https://github.com/msbfyi/msb-style-guide/compare/v1.0.3...v1.1.0) (2026-08-25)


### Features

* standalone mode-toggle build for no-bundler consumers ([#30](https://github.com/msbfyi/msb-style-guide/issues/30)) ([e8398fc](https://github.com/msbfyi/msb-style-guide/commit/e8398fcdadf6370d760d12fd112a488f33504dd9))

## [1.0.3](https://github.com/msbfyi/msb-style-guide/compare/v1.0.2...v1.0.3) (2026-08-25)


### Bug Fixes

* NODE_AUTH_TOKEN presence was silently pre-empting OIDC entirely ([#28](https://github.com/msbfyi/msb-style-guide/issues/28)) ([1990c29](https://github.com/msbfyi/msb-style-guide/commit/1990c29a4c33e3a47b9ad0f67ecebfa59336e402))

## [1.0.2](https://github.com/msbfyi/msb-style-guide/compare/v1.0.1...v1.0.2) (2026-08-25)


### Bug Fixes

* upgrade npm explicitly — Node 22's bundled npm is too old for Trusted Publishing ([#26](https://github.com/msbfyi/msb-style-guide/issues/26)) ([baa9969](https://github.com/msbfyi/msb-style-guide/commit/baa9969c7768cda4e075a9c2d8a3a5902b9af5a2))

## [1.0.1](https://github.com/msbfyi/msb-style-guide/compare/v1.0.0...v1.0.1) (2026-08-25)


### Bug Fixes

* publish inline on release_created + switch to npm Trusted Publishing ([#24](https://github.com/msbfyi/msb-style-guide/issues/24)) ([6a1a8f5](https://github.com/msbfyi/msb-style-guide/commit/6a1a8f54abdc808d8e7a5c701c9f409a9ca20ccc))

## [1.0.0](https://github.com/msbfyi/msb-style-guide/compare/v0.2.0-beta.1...v1.0.0) (2026-08-25)


### ⚠ BREAKING CHANGES

* graduate from beta to 1.0.0 ([#20](https://github.com/msbfyi/msb-style-guide/issues/20))

### Features

* publish to npm on release ([#23](https://github.com/msbfyi/msb-style-guide/issues/23)) ([ac0abd4](https://github.com/msbfyi/msb-style-guide/commit/ac0abd4803f1b843f4bad9827d019d778d648505))


### Bug Fixes

* keep plain vX.Y.Z release tags, not component-prefixed ([#22](https://github.com/msbfyi/msb-style-guide/issues/22)) ([8f4e76c](https://github.com/msbfyi/msb-style-guide/commit/8f4e76ccbf1a8672a0ccc8df12cd307609d725fd))


### Chores

* graduate from beta to 1.0.0 ([#20](https://github.com/msbfyi/msb-style-guide/issues/20)) ([39a580d](https://github.com/msbfyi/msb-style-guide/commit/39a580d645d3a3990a443db543adde6df0fb1b45))

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
