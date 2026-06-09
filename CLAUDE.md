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

10. **No scroll-indicator elements in case studies.** The `cps-scroll-indicator` / `cps-scroll-pill` / `cps-scroll-arrow` component has been permanently removed from all case studies and its CSS deleted from `global.css`. Do **not** re-add it. When adding new case study pages or chapters, omit this element entirely — the custom cursor pill (`.cps-cursor`) on desktop and normal page scrolling on mobile are sufficient.

11. **Git workflow.** Develop on the assigned feature branch
    (`claude/happy-faraday-r8hncd` at time of writing), commit there, push to
    the feature branch, then push to `main` (`git push origin <branch>:main`).
    This auto-triggers the GitHub Pages deploy via `.github/workflows/deploy.yml`.
    Never commit a fix directly to `main` first — always land it on the feature
    branch and merge forward.

    **Verified commits.** Always ensure `git config user.email noreply@anthropic.com`
    and `git config user.name Claude` are set before committing. If the stop-hook
    reports unverified commits, run:
    ```
    git rebase --exec "git commit --amend --no-edit --reset-author" origin/<branch>
    git push origin <branch> && git push origin <branch>:main --force
    ```

    **Push conflicts on main.** If `git push origin <branch>:main` is rejected
    (403 / fetch first), run `git pull origin main --rebase` then retry the push.

12. **No em dashes in user-facing copy.** Em dashes (—) are banned from all
    rendered text across pages and case studies. Use a comma, colon, or rewrite
    the sentence instead. The only exception is JS/CSS code comments which are
    never rendered.

---

## Image Conventions

### Case study artifact images (`cs-artifact` sections)
Use this pattern to replace a placeholder with a real image:
```html
<div class="cs-artifact reveal">
  <img src="/Portfolio-2026/images/Filename.png" alt="Description" class="cs-artifact-img" />
</div>
```
- **Scale-down images** (e.g. evaluation screens, flow diagrams) use a targeted
  `max-width` selector in `global.css`:
  ```css
  .cs-artifact img[src*="Keyword"]{max-width:72%;margin:0 auto;border:.5px solid rgba(255,255,255,.08);border-radius:0;}
  body.light-mode .cs-artifact img[src*="Keyword"]{border-color:rgba(0,0,0,.12);}
  ```
- Do **not** apply `border-radius` to artifact images — it crops screenshot corners.

### Dual-theme card images (`.dual-theme` / `.theme-card` sections)
Use `.theme-img-wrap` + `.theme-img` — **not** the cs-artifact pattern:
```html
<div class="theme-img-wrap">
  <img src="/Portfolio-2026/images/Filename.png" alt="Description" class="theme-img" />
</div>
```
CSS rules (already in `global.css`):
```css
.theme-img-wrap { width:100%; aspect-ratio:4/3; display:flex; align-items:center;
  justify-content:center; overflow:hidden; background:rgba(20,12,18,.5);
  padding:16px; box-sizing:border-box; }
.theme-img { width:100%; height:100%; object-fit:contain; object-position:center;
  display:block; border-radius:0; border:.5px solid rgba(255,255,255,.12); }
body.light-mode .theme-img-wrap { background:rgba(240,240,245,1); }
body.light-mode .theme-img { border-color:rgba(0,0,0,.15); }
```
- `aspect-ratio:4/3` on the wrap keeps the card height consistent with the old placeholders.
- `object-fit:contain` centres the image without cropping — never use `object-fit:cover` here.
- The 16px padding on all sides gives the image breathing room within the card.

### MES Application — hostile-split section (3-column layout)
The `.hostile-split` grid uses **3 columns** at ≥1280px, 2 at 1025–1280px, 1 at ≤1024px.
Three card variants exist: `.hostile-side.before` (red tint), `.hostile-side.pillars` (dark),
`.hostile-side.after` (blue tint). Their list item components are `.mes-before-item` and
`.mes-after-item` respectively — do not mix these classes.

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
- [ ] **No em dashes in rendered copy** — use commas or colons instead
- [ ] **Images not corner-cropped** — do not apply `border-radius` to screenshot/
      artifact images; set `border-radius:0` explicitly if overriding a base rule
- [ ] **Git author verified** — commits use `noreply@anthropic.com`; fix with
      rebase `--reset-author` if the stop-hook flags unverified commits
- [ ] **Git workflow followed** — committed to the feature branch first, pushed,
      then pushed to `main` (never the reverse)
- [ ] **Verified via diff/code reading** — not via unauthorized browser automation

---

## Reference

- `DESIGN_SYSTEM.md` — colors, typography, spacing, component naming, file structure
- `src/styles/global.css` — all tokens (`:root`, `body.light-mode`) and styles live here
- `src/hooks/useGlobalEffects.js` — scroll reveal, accordion, side-nav, cursor effects

