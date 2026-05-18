# Meli Play — Design System Reference

Streaming platform design system for Meli Play (MercadoLibre). Dark-first, two-mode (Dark/Light), built in Figma with five token collections.

---

## Typefaces

| Role | Family | Variable |
|---|---|---|
| Display / Ranking | DM Sans | `font/family/display` |
| UI / Body / Labels | Geist | `font/family/ui` |

---

## Token Collections

### Primitives

Raw values. Not for direct use in components — always alias through Semantic tokens.

#### Neutral Scale

| Token | Hex |
|---|---|
| `neutral/0` | `#ffffff` |
| `neutral/50` | `#f7f8f8` |
| `neutral/100` | `#d9d9d9` |
| `neutral/300` | `#767676` |
| `neutral/400` | `#686868` |
| `neutral/600` | `#343434` |
| `neutral/700` | `#282828` |
| `neutral/750` | `#363636` |
| `neutral/950` | `#08090a` |
| `neutral/1000` | `#000000` |

#### Brand Scale

| Token | Hex |
|---|---|
| `brand/100` | `#fdf5bf` |
| `brand/200` | `#ffe76b` |
| `brand/400` | `#f1bf34` |
| `brand/500` | `#f1c036` |

#### Transparency Primitives

| Token | Value |
|---|---|
| `Transparency/Ghost` | `neutral/50` at 30% opacity — `#f7f8f84d` |
| `Transparency/Ghost 2` | `neutral/50` at 40% opacity — `#f7f8f866` |

---

### Semantic — Color

Mode-aware aliases. **Dark** is the primary mode.

#### Backgrounds

| Token | Dark | Light |
|---|---|---|
| `color/bg/base` | `neutral/950` `#08090a` | `neutral/0` `#ffffff` |
| `color/bg/surface` | `neutral/700` `#282828` | `neutral/100` `#d9d9d9` |
| `color/bg/surface-alt` | `neutral/600` `#343434` | `neutral/50` `#f7f8f8` |
| `color/bg/brand` | `brand/500` `#f1c036` | `brand/500` `#f1c036` |
| `color/bg/Opacity 1` | `Transparency/Ghost` 30% | `neutral/950` |
| `color/bg/Opacity 2` | `Transparency/Ghost 2` 40% | `neutral/1000` |

#### Elements (Text & Icons)

| Token | Dark | Light |
|---|---|---|
| `color/Elements/primary` | `neutral/0` | `neutral/950` |
| `color/Elements/secondary` | `neutral/50` | `neutral/600` |
| `color/Elements/tertiary` | `neutral/300` | `neutral/400` |
| `color/Elements/disabled` | `neutral/100` | `neutral/300` |
| `color/Elements/brand` | `brand/500` | `brand/500` |
| `color/Elements/on-brand` | `neutral/950` | `neutral/0` |
| `color/Elements/on-ghost` | `neutral/0` | `neutral/950` |

#### Borders

| Token | Dark | Light |
|---|---|---|
| `color/border/default` | `neutral/50` | `neutral/950` |
| `color/border/subtle` | `neutral/50` | `neutral/100` |
| `color/border/strong` | `neutral/50` | `neutral/600` |
| `color/border/brand` | `brand/500` | `brand/500` |
| `color/border/white` | `neutral/0` | `neutral/950` |
| `color/border/ghost` | `neutral/50` | `neutral/600` |

#### Surfaces (Component fills)

| Token | Dark | Light |
|---|---|---|
| `color/surface/brand` | `brand/500` | `brand/500` |
| `color/surface/ghost` | `Transparency/Ghost` | `neutral/950` |

#### Brand Gradient

| Token | Dark | Light |
|---|---|---|
| `color/brand/gradient-start` | `brand/100` `#fdf5bf` | `brand/100` |
| `color/brand/gradient-end` | `brand/400` `#f1bf34` | `brand/400` |

#### Overlay

| Token | Dark | Light |
|---|---|---|
| `color/overlay/dark` | `neutral/1000` | `neutral/1000` |

---

### Spacing

8-point scale with a fixed overlap value for avatar stacks.

| Token | Value |
|---|---|
| `spacing/1` | 4px |
| `spacing/2` | 8px |
| `spacing/3` | 12px |
| `spacing/4` | 16px |
| `spacing/5` | 24px |
| `spacing/6` | 32px |
| `spacing/7` | 40px |
| `spacing/8` | 48px |
| `spacing/9` | 64px |
| `spacing/10` | 80px |
| `spacing/overlap/avatar` | −8px |

---

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius/none` | 0px | Flush / full-bleed |
| `radius/sm` | 4px | Tags, badges, small chips |
| `radius/md` | 8px | Cards, inputs, containers |
| `radius/lg` | 16px | Large cards, modals |
| `radius/xl` | 24px | Sheets, overlays |
| `radius/2xl` | 32px | Hero containers |
| `radius/full` | 100px | Pills, avatars, circular elements |

---

### Typography

#### Font Sizes

| Token | Value |
|---|---|
| `font/size/2xs` | 12px |
| `font/size/xs` | 14px |
| `font/size/sm` | 16px |
| `font/size/md` | 20px |
| `font/size/xl` | 24px |
| `font/size/2xl` | 28px |
| `font/size/lg` | 32px |
| `font/size/3xl` | 40px |
| `font/size/4xl` | 48px |
| `font/size/5xl` | 56px |
| `font/size/6xl` | 64px |
| `font/size/7xl` | 80px |
| `font/size/display` | 160px |

#### Font Weights

| Token | Value |
|---|---|
| `font/weight/regular` | 400 |
| `font/weight/medium` | 500 |
| `font/weight/semibold` | 600 |
| `font/weight/bold` | 700 |
| `font/weight/black` | 900 |

#### Letter Spacing

| Token | Value |
|---|---|
| `font/tracking/tight` | −4% |
| `font/tracking/normal` | 0% |
| `font/tracking/wide` | 8% |

---

## Text Styles

Composite styles built from the Typography tokens above.

| Style | Family | Weight | Size | Tracking | Usage |
|---|---|---|---|---|---|
| `display/ranking` | DM Sans | Black 900 | 160px | 0% | Top-10 ranking numbers |
| `display/heading` | DM Sans | Bold 700 | 32px | −4% | Hero titles, section headings |
| `heading/md` | Geist | SemiBold 600 | 20px | 0% | Card titles, modal headings |
| `body/md-semibold` | Geist | SemiBold 600 | 16px | 0% | Emphasized body, CTAs |
| `body/md-regular` | Geist | Regular 400 | 16px | 8% | Body copy, descriptions |
| `label/sm-semibold` | Geist | SemiBold 600 | 14px | 0% | Labels, metadata |
| `label/sm-medium` | Geist | Medium 500 | 14px | 0% | Supporting labels, captions |

---

## Paint Styles (Gradients)

| Style | Type | Usage |
|---|---|---|
| `gradient/brand` | Linear | Primary button fill, brand accent |
| `Numbers` | Linear | Top-10 ranking numerals overlay |
| `gradient/vignette` | Linear | Image vignette edge fade |
| `gradient/scrim/bottom` | Linear | Bottom scrim over hero images |
| `gradient/overlay/dark` | Linear | Dark overlay on cards and thumbnails |

---

## Effect Styles

| Style | Usage |
|---|---|
| `elevation/sm` | Subtle drop shadow — floating elements |
| `elevation/sm-side` | Side-cast shadow — panels, drawers |
| `blur/background` | Frosted glass / backdrop blur — overlays, ghost CTAs |

---

## Components

### Icons

All icons are 24×24px components, single vector layer.

| Name | ID |
|---|---|
| `Icons/Play` | `49:195` |
| `Icons/bookmark` | `49:210` |
| `Icons/forward` | `49:229` |
| `Icons/plus` | `71:1081` |
| `Icons/chevron-down` | `49:243` |
| `Icons/arrow-right` | `93:1584` |

---

### Logo

Single component, 116×41px. Boolean operation union of wordmark and icon mark.

---

### Button

**Properties:** `Size` × `Hierarchy` × `Status` → 8 variants

| Property | Values |
|---|---|
| Size | `Large`, `Medium` |
| Hierarchy | `Primary`, `Ghost` |
| Status | `Default`, `Hover` |

#### Sizing & Spacing

| Size | Width | Height | H-Padding | V-Padding | Gap | Radius |
|---|---|---|---|---|---|---|
| Large | 122px | 42px | 16px | 12px | 8px | 100px (pill) |
| Medium | 101px | 32px | 12px | 8px | 4px | 100px (pill) |

#### Visual Rules

| Hierarchy | Fill | Stroke (Hover) | Icon | Label |
|---|---|---|---|---|
| Primary | `gradient/brand` | 1px INSIDE `color/border/brand` | Icons/Play | "Watch Now" |
| Ghost | `color/surface/ghost` at 30% | 1px INSIDE `color/border/ghost` | Icons/bookmark | "Save" |

- Ghost opacity: 30% (`Transparency/Ghost`)
- Hover state adds a 1px INSIDE stroke; no opacity change on the fill

---

### Navlink

**Property:** `Property 1` → 3 variants: `Default`, `Selected`, `Hover`

Used in the Header navigation bar. Text links with state-based visual treatment.

---

### Header

Single component, 1200×42px. Horizontal layout:
- **Logo** (left) — Logo component instance
- **Navigation Links Container** (center) — 5 Navlink instances
- **Avatar** (right) — 40×40 ellipse

---

### Avatar

**Property:** `Border` → 2 variants

| Variant | Stroke Color | Usage |
|---|---|---|
| `Border=White` | `color/border/white` | Hero sections, primary placement |
| `Border=Subtle` | `color/border/subtle` | Recommendation cards, secondary placement |

- Size: 40×40px, `radius/full` (renders as full circle)
- Fill: `color/bg/surface-alt` (fallback / empty state)
- Stroke: 2px INSIDE

---

### Avatar Stack

Single component. Horizontal auto-layout with 4 overlapping Avatar instances.

- Gap: `spacing/overlap/avatar` (−8px)
- No background fill

---

### Carousel Navigation

Single component, 118×8px. Pill-shaped active indicator + 3 dot indicators.

- Active dot: wide pill (48×8px)
- Inactive dots: 8×8px circles

---

### Watch Bar

**Property:** `Progress` → 3 variants: `70%`, `30%`, `20%`

Progress bar component shown on Continue Watching cards. Indicates watch progress.

---

### Continue Watching Card

**Property:** `Status` → 2 variants: `Default`, `Hover`

- Size: 882×300px
- Contains: thumbnail, Watch Bar, metadata, action buttons
- Hover state reveals additional controls

---

### Recommendation Card

**Property:** `Property 1` → 3 variants: `Default`, `Play Hover`, `Circles Hover`

- Size: 1232×460px
- Two distinct hover states: one revealing play affordance, one revealing avatar stack

---

### Top Card & Top Numbers

`Top Card` (272×376px) — image container for a ranked title.

`Top Numbers` — Component set, 10 variants (`Numbers=1` through `Numbers=10`).
- Ranking numeral uses `display/ranking` text style (DM Sans Black 160px)
- Numeral fill: `Numbers` gradient paint style at 30% opacity

---

### Footer

Single component, 1280×136px. Contains header row and links row.

---

## Design Decisions

- **Dark-first** — the UI is designed for dark environments (streaming context). Light mode is structurally defined but not the primary expression.
- **Yellow brand** — `brand/500` (#f1c036) is the sole accent color. Used sparingly on primary buttons, active states, and brand gradients.
- **Ghost pattern** — semi-transparent white surfaces (30%) with backdrop blur create depth without competing with content.
- **Pill buttons** — `radius/full` on all buttons enforces a soft, approachable feel consistent with media consumption UX.
- **Negative-gap stacking** — Avatar stacks use −8px overlap, directly tokenized, to match the social proof pattern seen across streaming and social platforms.
- **Two typefaces** — DM Sans for display/ranking (high visual impact, geometric) and Geist for all UI text (neutral, readable at small sizes).
