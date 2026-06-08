# Claude Instructions — Portfolio 2026

> Read this before designing or fixing anything in this project. It captures the
> conventions and guardrails established across past sessions. `DESIGN_SYSTEM.md`
> remains the source of truth for tokens/colors/typography — this file covers
> *process*: how to work in this codebase safely and consistently.

---

## Standing Guidelines

1. **Design tokens, not literals.** Use the CSS custom properties already defined
   in `:root` (`global.css`) — color tokens (`--bg`, `--ink`, `--surface`, `--border`,
   `--orange`, etc.) and grid tokens (`--grid-columns`, `--grid-gutter`,
   `--grid-margin`). Never hardcode a color or container side-margin that already
   has a token. Add a `body.light-mode` override for any new color.

   **Per-case accent backgrounds — monochromatic tint pattern.** When a case
   study element needs a background/border tinted with that case's brand
   accent (e.g. `.cs-project-summary-wrap`, `.cs-pull-quote`, the
   `.chapter:first-of-type` "Brief" intro card), reuse the existing
   `--banking`/`--banking2`/`--audit`/`--nocode`/`--mes` hex tokens and their
   `*-rgb` triples (`--banking-rgb`, `--audit-rgb`, etc., `:root` ~line 12-14)
   layered as `rgba(var(--x-rgb), low-alpha)` washes over `var(--surface)` —
   a single-hue (monochromatic) tint progression, not a mix of adjacent hues.
   Note `--c`/`--cr` set inline on `.cs-hero`/`.cs-project-summary-wrap` are
   NOT inherited by `.chapter` (siblings, not ancestors) — to theme a chapter
   element per case, scope a `--case-c`/`--case-cr` pair via the page ID
   (`#case-audit .chapter:first-of-type{ --case-c:var(--audit); --case-cr:var(--audit-rgb); }`)
   rather than relying on inline custom-property inheritance.

2. **Grid system.** Page/section container horizontal padding should reference
   `var(--grid-margin)` so spacing scales automatically across breakpoints
   (12 columns desktop → 8 tablet → 6 "fat" columns mobile, switching at
   1280 / 1024 / 768 / 480px). Don't reintroduce hardcoded `52px`/`32px`/`24px`
   side margins on new top-level containers — use the token.

3. **Breakpoints in use:** primary `1280, 1024, 768, 480`; occasional edge cases
   `1279, 900, 767`. Reuse these rather than inventing new ones, and check both
   `min-width` and `max-width` queries already present for the component you're
   touching before adding a new media query.

4. **Theming.** Every new visual element must work in both dark (default) and
   `body.light-mode`. Toggle persists to `localStorage('theme')` and fires a
   `themechange` window event — don't bypass this pattern.

5. **Accessibility.** Maintain WCAG AA contrast (the `--ink*` tokens are
   pre-tuned for this — reuse them rather than introducing new text colors).
   Preserve focus states, `aria-label`s on icon-only buttons, and keyboard
   operability for any interactive element (nav, accordions, drawers, modals).

6. **Animation patterns.** Reuse existing mechanisms — `reveal`/`reveal-left`/
   `reveal-scale` + `useScrollReveal()`, `stagger-wrap`/`stagger-child`, the
   `.45s cubic-bezier(.16,1,.3,1)` accordion grid-row technique — instead of
   inventing new transition systems for similar effects.

7. **DOM-effects pattern.** Vanilla DOM logic (accordions, scroll-spy, side-nav
   sync) lives in `useGlobalEffects.js` as `useEffect`-based hooks operating on
   queried DOM nodes (the pages render via `dangerouslySetInnerHTML` from large
   `CASE_HTML`/`WORK_HTML` string constants) — don't mix in React state-driven
   re-renders for these without good reason; match the existing approach.

8. **Browser testing.** Do **not** launch Playwright/Chromium or any browser
   automation against the dev server unless the user explicitly authorizes it
   for that session. Verify changes via code reading and `git diff` review.

9. **No horizontal overflow on narrow viewports.** Any flex/grid layout with
   fixed-size or `flex-shrink:0` items (decorative numerals, pills, icons,
   badges) next to text content must let the text content shrink/wrap
   (`min-width:0` on the text's flex container, no `flex-shrink:0` on text
   elements). This bit us in the case-study chapter accordions — `.ch-num`
   (a 72px decorative numeral) sat beside `.chapter-title` with
   `flex-shrink:0`, which forced the title to its single-line max-content
   width and pushed the header past the viewport edge on mobile. When adding
   or editing any component with mixed fixed/text content, scale the
   fixed-size decorative elements down at the `768px`/`480px` breakpoints and
   verify nothing forces the page wider than `100vw`.

10. **Git workflow.** Develop on the assigned feature branch
   (`claude/nice-keller-hBADH` at time of writing), commit there, push, then
   merge into `main` and push `main` (this auto-triggers the GitHub Pages
   deploy via `.github/workflows/deploy.yml`). Never commit a fix directly to
   `main` first — always land it on the feature branch and merge forward.

---

## Verification Checklist — run this for EVERY feature or fix

Before considering a UI/styling change done, walk through this list and confirm
each item (note any intentional exceptions in your summary to the user):

- [ ] **Tokens used** — colors and container margins reference existing
      `:root` custom properties (`--ink*`, `--bg`, `--surface`, `--border`,
      `--orange`, `--grid-margin`, etc.), not new hardcoded values
- [ ] **Light + dark mode** — checked/edited both `body.light-mode` and the
      default (dark) styles; nothing relies on a color that only exists in one theme
- [ ] **All breakpoints** — verified the change at desktop (≥1280), tablet
      (1024/900), and mobile (768/480) widths; reused existing breakpoint values
- [ ] **Grid alignment** — new sections/containers use `var(--grid-margin)` /
      `var(--grid-gutter)` for side margins and gaps rather than one-off pixel values
- [ ] **Accessibility** — sufficient contrast (reuse `--ink*` tokens), keyboard
      operable, `aria-label`s present on icon/icon-only controls, focus visible
- [ ] **Existing patterns reused** — animation (`reveal*`, stagger, accordion
      transition), theme-toggle, and DOM-effects conventions followed rather than
      reinvented
- [ ] **No stray visual artifacts** — check for bleed-through borders/lines from
      fixed-position elements (nav, drawers, sticky bars) across all viewport widths
      and theme states (this bit us before with `.cs-hero-bar` and `.nav-mobile-drawer`)
- [ ] **No horizontal overflow on mobile** — flex/grid rows mixing fixed-size
      decorative elements (numerals, pills, icons) with text must let the text
      shrink/wrap (`min-width:0`, no `flex-shrink:0` on text); scale fixed
      elements down at `768px`/`480px` (this bit us with `.ch-num` vs
      `.chapter-title` in the case-study accordions)
- [ ] **Git workflow followed** — committed to the feature branch first, pushed,
      then merged to `main` and pushed (never the reverse)
- [ ] **Verified via diff/code reading** — not via unauthorized browser automation

---

## Reference

- `DESIGN_SYSTEM.md` — colors, typography, spacing, component naming, file structure
- `src/styles/global.css` — all tokens (`:root`, `body.light-mode`) and styles live here
- `src/hooks/useGlobalEffects.js` — scroll reveal, accordion, side-nav, cursor effects
