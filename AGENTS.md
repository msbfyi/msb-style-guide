# Agent instructions — msb-style-guide

Shared source of truth for AI coding tools working in this repo.
`CLAUDE.md` just points here.

## What this is

`@msbfyi/style-guide` — Lit web components implementing the Vital
Spring design system (from `Style Guide v3.html`), documented and
previewed via Storybook, deployed to Cloudflare Pages.

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

- **Unit tests** (`npm test`) catch structural/logic bugs in a
  component's own shadow DOM — slot fallback behavior, property
  reflection, state changes. `card.test.ts` in particular is worth
  reading before writing a new slot-fallback pattern elsewhere: it
  documents two real gotchas discovered the hard way — `::slotted()`
  never matches a slot's own fallback content, and asserting
  `.to.be.null` on a value that might be a real (non-null) DOM node
  can make chai hang for minutes constructing the failure message
  instead of failing fast. Prefer `expect(x === null).to.be.true` over
  `expect(x).to.be.null` whenever `x` could be a DOM node.
- **Interaction tests** (Storybook `play` functions, run by
  `test:storybook`) catch bugs unit tests can't reach — real click
  events, real `slotchange` timing, cross-shadow-boundary event
  composition — in the same environment a consumer would actually use
  the component.
- **Visual regression** (also `test:storybook`, via
  `jest-image-snapshot`) catches rendering bugs that don't throw and
  don't fail an assertion: unreadable text, a component collapsing to
  zero size, a layout running inline instead of stacking. Every one of
  those happened in this repo's Storybook and was only caught by a
  human looking at a screenshot, before this existed. Screenshots are
  scoped to `#storybook-root` (the story's own rendered element), not
  the full page — a full-page screenshot dilutes a small component's
  regression to well under any sane percentage threshold; a thin
  divider line disappearing is a tiny fraction of a full page but a
  large fraction of the component's own bounding box.
- **Lint** (`eslint-plugin-lit`, `eslint-plugin-wc`) catches Lit/
  custom-element-specific mistakes generic TypeScript linting won't.

## Conventions

- **Every component** gets a `.ts` (implementation) and
  `.stories.ts` (CSF3) under `src/components/<name>/`, and is
  re-exported from `src/index.ts`.
- **Chamfer geometry** (the clipped-corner keyline used almost
  everywhere) lives once in `src/internal/chamfer.ts` — use
  `chamferHost` for a component whose `:host` itself is the visual
  box, `chamferRules(selector)` for an internal native element
  (`button`, `input`) or a slotted one (`::slotted(a)`). Don't
  re-derive the clip-path polygon math per component.
- **Design tokens** live only in `src/tokens/tokens.css`, loaded once
  globally by the consumer (custom properties pierce shadow DOM).
  Components reference tokens with fallback values
  (`var(--ink, #1b2a52)`) so they degrade gracefully if a consumer
  forgets to load the sheet, but never hardcode a color without also
  referencing the token.
- **The starburst ornament** (`<msb-dispatch>`) is inlined via
  `src/internal/ornaments.ts`, not a document-level `<use href="#…">`
  — `<use>` idref lookups don't cross a shadow boundary, and per-
  component inlining is the correct workaround, not a shortcut to
  "fix" later.
- **Custom element tag prefix is `msb-`** — don't introduce a
  different prefix for new components.
- **MDX docs** (the brand-book reference material — palette,
  typography, patterns, era, tokens, etc.) live in `src/docs/`, titled
  `Docs/<Name>`. Component stories live beside their component and are
  titled `Components/<Name>`.

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
