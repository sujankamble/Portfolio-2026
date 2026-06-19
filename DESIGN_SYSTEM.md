# Design System Reference

> This file is the styling and layout reference for all future features and updates to this portfolio. Always consult this before adding or modifying any UI.

---

## Colors

### Dark Mode (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0608` | Page background |
| `--surface` | `#141014` | Card / panel background |
| `--surface2` | `#1a1018` | Nested surface |
| `--ink` | `rgba(255,255,255,0.95)` | Primary text |
| `--ink2` | `rgba(255,255,255,0.82)` | Body text |
| `--ink3` | `rgba(255,255,255,0.62)` | Secondary text |
| `--ink4` | `rgba(255,255,255,0.40)` | Captions / meta |
| `--border` | `rgba(255,255,255,0.08)` | Dividers / borders |
| `--orange` | `#FF6B35` | Accent / CTA |

### Light Mode (`body.light-mode`)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F2F5FF` | Card background |
| `--surface2` | `#E5EAFF` | Nested surface |
| `--ink` | `#142C49` | Primary text (Navy) |
| `--ink2` | `rgba(20,44,73,0.85)` | Body text |
| `--ink3` | `rgba(20,44,73,0.65)` | Secondary text |
| `--ink4` | `rgba(20,44,73,0.50)` | Captions / meta |
| `--border` | `rgba(20,44,73,0.14)` | Dividers |
| `--orange` | `#2A6DFF` | Accent (blue in light) |

### Case Study Accent Colors
| Case | Dark | Light |
|---|---|---|
| Banking 1 | `#811c81` | `#6a1a7a` |
| Banking 2 | `#9b2d9b` | `#7b2489` |
| Audit | `#3a8a26` | `#2a6e1a` |
| No-Code | `#e69138` | `#b5711f` |
| MES | `#0070c0` | `#0058a0` |

---

## Typography

| Role | Family | Weight | Size |
|---|---|---|---|
| Body / UI | `DM Sans` | 300–600 | Base 16px |
| Display headings | `DM Serif Display` | 400 (regular + italic) | `clamp(32px, 5.5vw, 76px)` |
| Eyebrow labels | `DM Sans` | 400 | 11px, letter-spacing 0.12em, uppercase |
| Hero sub | `DM Sans` | 300 | 17px |

Google Fonts import (already in `index.html`):
```
DM+Sans:ital,opsz,wght@0,9..40,200..600;1,9..40,300;1,9..40,400
DM+Serif+Display:ital@0;1
```

---

## Spacing & Layout

- Page max-width: `1200px` centered, horizontal padding `52px` desktop / `24px` mobile
- Section vertical padding: `80–120px`
- Card gap: `24px`
- Border-radius: `14px` for cards, `100px` for pills

---

## Theme Toggle Pattern

- Toggle `body.light-mode` class on `<body>`
- Persist to `localStorage('theme')` — `'light'` or `'dark'`
- Read on mount in `Nav.jsx` `useEffect`
- Fire `window.dispatchEvent(new Event('themechange'))` after toggle so particle canvas can reinit colors
- Sun/moon icon swap controlled by CSS: `.icon-moon { display: block }` / `.icon-sun { display: none }` — reversed in `body.light-mode`

---

## Animation Patterns

### Scroll Reveal
- Add class `reveal` (fade up), `reveal-left`, or `reveal-scale` to elements
- `IntersectionObserver` in `useScrollReveal()` hook adds `visible` class when in viewport
- For staggered children: wrap in `stagger-wrap`, children get `stagger-child`
- CSS keyframes: `fadeUp`, `scanline` defined in `global.css`

### Page transitions
- `AnimatePresence mode="wait"` in `App.jsx` wraps all routes
- Each page fades in/out with framer-motion (keep it simple — `opacity 0→1→0`)

### Particle canvas
- Runs in `Hero.jsx` via `useRef` + `useEffect`
- Listens for `window` event `'themechange'` to reinit particle colors

### Flipboard word shuffle (`#wordShuffle`)
- Runs in `Hero.jsx` useEffect
- Cycles: `['experiences', 'clarity', 'systems', 'decisions']`
- CSS keyframes: `flipIn`, `flipOut` in `global.css`

---

## Component Naming Conventions

| Class prefix | Usage |
|---|---|
| `.cs-*` | Case study components |
| `.cs-hero-*` | Case study hero section |
| `.pcf-*` | Project card full (home work section) |
| `.am-*` | About me page |
| `.nav-*` | Navigation |
| `.hero-*` | Home hero section |
| `.wsl-*` | Work section label |
| `.test-*` | Testimonial card |
| `.cps-*` | Case project summary |

---

## File Structure

```
src/
  components/
    Nav/          — Nav.jsx (theme toggle, router, mobile drawer)
    Hero/         — Hero.jsx (particle canvas, word shuffle)
    Cursor/       — Cursor.jsx (custom cursor)
    WorkSection/  — legacy (merged into HomePage)
    CaseStudy/    — legacy layout components
  pages/
    HomePage.jsx  — Hero + work cards + skills + stats + testimonials + contact
    AboutPage.jsx — dangerouslySetInnerHTML from HTML design file
    cases/        — Banking1/2, Audit, NoCode, MES pages
  hooks/
    useGlobalEffects.js — useScrollReveal(), useCursor()
  styles/
    global.css    — All styles extracted from portfolio_39.html (DO NOT split further)
public/
  images/         — Extracted project images (project-0.jpg … project-4.jpg)
  docs/           — resume.pdf goes here
```

---

## Updating This Project

1. **Adding a new case study**: Create `src/pages/cases/NewCasePage.jsx`, add HTML content via `dangerouslySetInnerHTML`, wire nav/pagination `useEffect`. Add route in `App.jsx`. Add project card in `HomePage.jsx`'s `WORK_HTML`.
2. **Editing existing content**: Modify the HTML string in the relevant page's `CASE_HTML` or `WORK_HTML` constant.
3. **New styles**: Add to `global.css`. Follow the `--ink` / `--bg` / `--surface` token system. Always add a `body.light-mode` override for any new color.
4. **Replacing project images**: Drop new images in `public/images/` and update the `src` attributes in `HomePage.jsx` `WORK_HTML`.

---

## Recent Changes Log

### Banking App Part 2 (Product Page Redesign)
- Define section: added `cs-subsection-bg` background to the "Research Team Collaboration" box and to the "Product Page Anatomy" framework group (Identified Products & Sub-products, products grid, approach note).
- Develop section: renamed "Designing for Confidence The Loan Product Experience" to "The Loan Product Experience"; added `cs-subsection-bg` to "Loan Workflow Step by Step"; added `cs-subsection-bg` to "Educational Content Strategy".
- Deliver section: added `cs-subsection-bg` to "Product Page Anatomy Replicable Across All Product Types"; restyled `.anatomy-item` to match `.dp-item` (purple tint, padding, bullet dots via `.anatomy-item-dot`); removed the divider line under column labels; top-aligned the two columns and removed the `.design-principles` extra top margin; removed the closing pull-quote.

### Audit Platform
- Project Overview: changed "My Role" to "UX Designer" with new paragraph; replaced Outcomes with 100% / 70% / Reduced.
- The Brief: removed the 4-tile metrics row, "Active participation in meetings" and "Distilled insights from user research" role-pills, and the closing quote; replaced the intro paragraph with new copy; restored a single "objective" paragraph in a single-column `.objective-block` to remove dead right-column space; updated three role-pill descriptions (Contextual Interviews, Wireframes & high-fidelity designs, Documented UX guidelines).
- Discovery: updated chapter hook and intro/outro paragraphs; removed the closing pull-quote.
- Define: updated the intro paragraph; removed the "This wasn't bureaucracy..." paragraph.
- Develop: updated chapter hook and copy; removed the "But a north star only works..." paragraph; removed the closing pull-quote.
- Deliver: updated chapter hook and ownership paragraph; removed the entire "Analytics Centre Modules Owned" grid.
- Reflect: updated intro paragraph; wrapped "Key Learnings" in `cs-subsection-bg`; removed the closing pull-quote.

### About Page
- Added corner radius to the profile polaroid image; top-aligned the hero photo column with the "Sujan Kamble" heading (via `.apaper-hero-right { margin-top: 64px }`, reset on mobile).
- Removed the "PUNE · INDIA · UX" stamp.
- Removed the red ruled line under "What I do" card titles.
- Removed FigJam, Zeplin, and InVision from "Tools I play with".

