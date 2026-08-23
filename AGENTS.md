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

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) —
same convention as msb-blog. No release automation is wired up here
yet (no release-please), so this is about clean history, not a CI
requirement, for now.
