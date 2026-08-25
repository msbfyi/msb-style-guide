# Agent instructions — msb-style-guide

Shared source of truth for AI coding tools working in this repo.
`CLAUDE.md` just points here.

## What this is

`@msbfyi/style-guide` — the Vital Spring design system (from
`Style Guide v3.html`), documented and previewed via Storybook,
deployed to Cloudflare. Mostly a **CSS pattern library**: plain
classes on plain HTML, under `src/patterns/`, no JS. One real Lit web
component, `<msb-mode-toggle>` (`src/components/mode-toggle/`), for
the one piece of the system that's genuinely stateful. See
`src/docs/AddingPatterns.mdx` before adding either kind — it covers
the naming convention, chamfer composition, and (importantly) which
tier something belongs in.

## Never push directly to `main`

Every change goes through a branch and a PR, even a one-line fix.
Check `git branch --show-current` before `git push`; if it's `main`,
branch first.

## Commands

- `npm install`
- `npm run storybook` — dev server, `localhost:6006`
- `npm run build` — library build to `dist/`
- `npm run build-storybook` — static Storybook to `storybook-static/`
- `npm run typecheck`
- `npm run lint` / `npm run lint:fix`
- `npm run format` / `npm run format:check` — Prettier
- `npm test` — component unit tests (`@web/test-runner` +
  `@open-wc/testing`, real Chromium, one `<name>.test.ts` beside each
  component)
- `npm run test:storybook` — builds Storybook, serves it, runs
  `@storybook/test-runner`: executes every story's `play` function
  (interaction tests) and a visual-regression screenshot comparison
  against the baselines in `.storybook/__image_snapshots__/`
- `npm run test:storybook:update` — same, but regenerates the visual
  baselines instead of comparing against them. **Never run this
  locally and commit the result** — a locally-generated (e.g. macOS)
  baseline renders text with different hinting/anti-aliasing than the
  `storybook-tests` job's Linux Chromium, and will fail CI on every
  text-bearing component even with zero real visual change (this
  happened in PR #1 and stayed broken, unnoticed, until PR #6). Use
  the **`Update visual snapshots`** GitHub Actions workflow instead
  (`gh workflow run update-visual-snapshots.yml`, or the Actions tab)
  — it regenerates baselines on `ubuntu-latest`, the same environment
  `storybook-tests` actually runs in, and opens a PR with the result
  for you to review before merging.

## Testing philosophy — read this before skipping any of it

Every one of these layers exists because a specific real bug shipped
past the previous layer during this repo's early development:

- **Unit tests** (`npm test`) catch structural/logic bugs in a real
  web component's own shadow DOM — slot fallback behavior, property
  reflection, state changes. Only applies to `mode-toggle` now (the
  one Lit component); CSS patterns have no `.test.ts` since there's no
  behavior to test. One gotcha discovered the hard way, worth
  remembering if this repo ever gets a second stateful component:
  asserting `.to.be.null` on a value that might be a real (non-null)
  DOM node can make chai hang for minutes constructing the failure
  message instead of failing fast. Prefer `expect(x === null).to.be.true`
  over `expect(x).to.be.null` whenever `x` could be a DOM node —
  `mode-toggle.test.ts`'s `.to.be.null` checks are all on plain
  strings, not nodes, so they're safe as written; don't copy that
  pattern onto a DOM-node assertion without switching forms.
- **Interaction tests** (Storybook `play` functions, run by
  `test:storybook`) catch bugs unit tests can't reach — real click
  events, real `slotchange` timing, cross-shadow-boundary event
  composition — in the same environment a consumer would actually use
  the component. Only meaningful for `mode-toggle`; CSS patterns have
  nothing to interact with.
- **Visual regression** (also `test:storybook`, via
  `jest-image-snapshot`) catches rendering bugs that don't throw and
  don't fail an assertion: unreadable text, a pattern collapsing to
  zero size, a layout running inline instead of stacking. Every one of
  those happened in this repo's Storybook and was only caught by a
  human looking at a screenshot, before this existed. Screenshots are
  scoped to `#storybook-root` (the story's own rendered element), not
  the full page — a full-page screenshot dilutes a small pattern's
  regression to well under any sane percentage threshold; a thin
  divider line disappearing is a tiny fraction of a full page but a
  large fraction of the pattern's own bounding box. This is now the
  primary safety net for the CSS pattern library, since there's no
  unit-testable behavior to check instead.
- **Lint** (`eslint-plugin-lit`, `eslint-plugin-wc`) catches Lit/
  custom-element-specific mistakes generic TypeScript linting won't —
  only reaches `mode-toggle.ts` now, since it's the only `.ts` file
  left that touches either plugin's rules.

## Conventions

See `src/docs/AddingPatterns.mdx` for the full authoring guide (file
structure, naming, chamfer composition, what used to be JS and isn't
anymore). Summary:

- **Patterns** (the CSS-only majority) are `src/patterns/<name>.css` +
  `src/patterns/<name>.stories.ts`, titled `Patterns/<Name>` in
  Storybook, classes prefixed `msb-` — no `.ts` implementation file,
  no re-export from `src/index.ts` (nothing to import).
- **The one real component** (`mode-toggle`) keeps the original shape:
  `.ts` + `.stories.ts` + `.test.ts` under `src/components/<name>/`,
  re-exported from `src/index.ts`, titled `Components/<Name>`. If
  something new genuinely needs runtime state or events, it goes here,
  not in `src/patterns/`.
- **Chamfer geometry** has two independent copies of the same polygon
  math, because the two tiers can't share a mixin: `src/patterns/
_chamfer.css` (plain CSS, `.msb-chamfer`/`--sm`/`--lg` classes to
  compose) for patterns, and `src/internal/chamfer.ts` (Lit `css`
  chunks, `chamferHost`/`chamferRules`) for `mode-toggle`. Don't
  re-derive the polygon math a third time anywhere else.
- **Design tokens** live only in `src/tokens/tokens.css`, loaded once
  globally by the consumer (custom properties pierce shadow DOM too,
  so this file serves both tiers unmodified). Reference tokens with
  fallback values (`var(--ink, #1b2a52)`) so things degrade gracefully
  if a consumer forgets to load the sheet, but never hardcode a color
  without also referencing the token.
- **Custom element tag prefix is `msb-`** for `mode-toggle` and any
  future real component; CSS pattern classes use the same `msb-`
  prefix for the same reason (collision avoidance), just without the
  tag semantics.
- **MDX docs** (the brand-book reference material — palette,
  typography, ornament, era, tokens, etc., plus `AddingPatterns.mdx`)
  live in `src/docs/`, titled `Docs/<Name>`.

## Local git hooks (lefthook)

`npm install` runs `lefthook install` automatically (`prepare` script).
Pre-commit runs lint + format on staged files, and **hard-blocks any
commit touching `.storybook/__image_snapshots__/*.png`** — see "Visual
regression" above for why that can only ever come from the
`update-visual-snapshots.yml` workflow, never a local run. Pre-push
runs `typecheck` and `test`. It deliberately does not run
`test:storybook` — same reasoning, that suite's baselines are only
valid when generated and compared on the same environment, and a local
pre-push hook is the wrong place to try.

## Commit messages — required, this is enforced by CI

**Use [Conventional Commits](https://www.conventionalcommits.org/).**
Same setup as msb-blog: [release-please](https://github.com/googleapis/release-please)
(`.github/workflows/release-please.yml`) parses commit history on
every push to `main` to generate `CHANGELOG.md` and cut version tags.
A commit that doesn't follow this format is silently invisible to it.

- `fix: ...` → patch
- `feat: ...` → minor
- `feat!: ...` or a `BREAKING CHANGE:` footer → major
- `design: ...` → tracked, shown in the changelog (for changes to the
  design system itself — tokens, chamfer geometry, palette — as
  distinct from component code)
- `docs:`, `chore:`, `refactor:`, `test:`, `ci:`, `build:` → tracked
  but hidden from the changelog

## Beta status

`release-please-config.json` has `"prerelease": true` /
`"prerelease-type": "beta"` — every release right now lands as
`0.x.y-beta.N`, not a stable version. **Do not flip `prerelease` to
`false`** unless the user explicitly asks to graduate to a full
release; this is a deliberate, standing instruction, not a default to
"fix" once things look stable.
