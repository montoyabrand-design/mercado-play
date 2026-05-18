# Floating Pill Navbar — Design Spec
**Date:** 2026-05-18
**Status:** Approved

## Overview

Replace the current full-width fixed navbar with a scroll-triggered two-state header. At the top of the page the existing full-width transparent nav is shown. After scrolling past a threshold the nav exits upward and a smaller frosted-glass pill floats down from above, staying centered at the top of the viewport.

## Behavior

### Scroll threshold
- Trigger at `80px` scrolled (up from the current `40px`), giving the hero enough room before the transition fires.
- Scrolling back above `80px` reverses the sequence.

### Phase 1 — full nav exit
- Current full-width nav slides up: `y: 0 → -80px`, `opacity: 1 → 0`
- Duration: `300ms`, easing: `EASE_CIN` (`[0.25, 0.46, 0.45, 0.94]`)

### Phase 2 — pill entrance
- Pill slides down from above: `y: -20px → 0`, `opacity: 0 → 1`
- Delay: `100ms` after Phase 1 starts (overlap slightly for fluidity)
- Duration: `350ms`, easing: `EASE_OUT` (`[0.16, 1, 0.3, 1]`)

### Reverse (scroll back to top)
- Pill exits: `y: 0 → -20px`, `opacity: 1 → 0`, `250ms`, `EASE_CIN`
- Full nav re-enters: `y: -80px → 0`, `opacity: 0 → 1`, `300ms`, `EASE_OUT`

## Pill Anatomy

### Positioning
- `position: fixed`, `top: var(--spacing-sp4)` (16px), `left: 0`, `right: 0`
- `max-width: 760px`, `margin: 0 auto`
- `z-index: 50`

### Shape & surface
- `border-radius: var(--radius-full)` (9999px)
- `height: 56px`
- Background: `var(--glass-nav-bg)` — new token, defined as `rgba(8,9,10,0.72)` (see Design Tokens below)
- `backdrop-filter: blur(24px)`, `-webkit-backdrop-filter: blur(24px)`
- Border: `1px solid rgba(255,255,255,0.08)` — frosted edge definition, no existing token covers this opacity level, kept as-is
- Box shadow: `0 8px 32px rgba(0,0,0,0.4)` — lifts the pill off the page

### Internal layout
Three-zone row, same structure as the current navbar:
- **Left:** Meli Play logo (`height: 32px` — slightly reduced from 40px to fit 56px pill height comfortably)
- **Center:** Nav links — same 5 items (`Home`, `Películas`, `Series`, `Lista`, `Círculos`), same font (`font-ui`, `16px`, `font-medium`)
- **Right:** User avatar (`size: 32px` — reduced from 36px)
- Internal horizontal padding: `var(--spacing-sp5)` (24px) on each side

### Nav link active/hover states inside pill
Preserve existing Figma-spec behavior:
- **Active:** `border-bottom: 2px solid var(--color-brand-500)` + radial glow from below (slightly reduced spread so it doesn't bleed the pill edge)
- **Hover:** `border-bottom: 2px solid rgba(247,248,248,0.40)` + reduced radial glow
- **Default:** no stroke, no fill

## Design Tokens

### New token (add to `:root` in `globals.css`)
```css
--glass-nav-bg: rgba(8, 9, 10, 0.72);
```
This is `--color-bg-base` at 72% opacity. Defined separately so the glass treatment is a named pattern rather than a magic value.

### Existing tokens used
| Property | Token | Value |
|---|---|---|
| Pill border-radius | `--radius-full` | 9999px |
| Top offset | `--spacing-sp4` | 16px |
| Internal padding | `--spacing-sp5` | 24px |
| Active link color | `--color-brand-500` | #f1c036 |
| Link text color | `--color-text-secondary` | #f7f8f8 |
| Base bg color (glass) | `--color-bg-base` | #08090a |

## Implementation

### File changes
- `src/components/layout/Navbar.tsx` — only file changed
- `src/app/globals.css` — add `--glass-nav-bg` to `:root`

### Component structure
Two named sub-components inside `Navbar.tsx`, both rendered inside `AnimatePresence`:
- `<FullNav>` — current full-width behavior, shown when `!scrolled`
- `<PillNav>` — new floating pill, shown when `scrolled`

Both share the same nav items array, active/hover logic, and motion constants already in the file. The existing `scrolled` state and scroll listener are reused without changes.

No new files, no new dependencies.

## Reference
- Vercel marketing navbar — scroll-triggered pill with logo + links + CTA in one capsule
- Framer website navbar — morph-on-scroll (Option A we considered but didn't choose)
