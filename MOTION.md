# Mercado Play — Motion Design System

## Philosophy

**Cinematic weight.** Every animation belongs in a film trailer — deliberate, purposeful, never decorative. Motion communicates hierarchy: the hero commands attention, content rows surface gracefully, interactions reward precision.

Three principles:
1. **Orchestrated entrances** — sections don't just appear, they arrive
2. **Depth over flatness** — parallax and z-axis cues create a sense of space
3. **Restraint at rest, expressiveness in motion** — nothing animates unless triggered by scroll or interaction

---

## Shared Eases

| Name | Cubic Bezier | Use |
|------|-------------|-----|
| `cinematic` | `[0.25, 0.46, 0.45, 0.94]` | Slide transitions, content reveals |
| `spring-pop` | `[0.34, 1.56, 0.64, 1]` | Rank numbers, badge entrances (slight overshoot) |
| `ease-out-smooth` | `[0.16, 1, 0.3, 1]` | Card row stagger, header slides |

---

## Animation Catalogue

### 1. Hero Carousel

**Backdrop crossfade + scale** (`HeroCarousel.tsx`)
- Outgoing slide: `opacity 1→0, scale 1→1.04` over 900ms `easeInOut`
- Incoming slide: `opacity 0→1, scale 0.97→1` over 900ms `easeInOut`
- Creates a cinematic "zoom-cut" feel on slide transition

**Backdrop scroll parallax** (`HeroCarousel.tsx`)
- Uses `useScroll` + `useTransform` scoped to the hero `<section>` ref
- Backdrop `y` transforms from `0` to `-180px` as user scrolls `0→720px`
- Image appears to recede into the background as content overlaps

**Title logo blur-in** (`HeroCarousel.tsx`)
- Triggers on each slide activation (keyed by `item.id`)
- `filter: blur(8px), opacity: 0, y: -8` → `blur(0px), opacity: 1, y: 0`
- Duration: 700ms, ease: `cinematic`, delay: 100ms after slide starts
- Matches the anamorphic lens-focus feel of film title cards

**Content metadata stagger** (`HeroCarousel.tsx`)
- Title, social proof row, and CTA buttons each animate as separate layers
- Stagger delay: `0ms / 150ms / 280ms` from slide activation
- Each: `opacity: 0, y: 12` → `opacity: 1, y: 0`, 400ms `ease-out-smooth`

**Ambient glow pulse** (`HeroCarousel.tsx`)
- The bottom vignette overlay breathes: `opacity 0.85→1→0.85`
- Loop: 4s, `ease: "easeInOut"`, `repeat: Infinity`
- Subliminal — only noticeable on prolonged viewing

---

### 2. Section Reveals (Scroll-Driven)

**Section headers** (`ContinueWatchingSection`, `RecommendedSection`, `TopTenSection`)
- `opacity: 0, x: -20` → `opacity: 1, x: 0`
- Duration: 500ms, ease: `ease-out-smooth`
- Trigger: `whileInView`, `once: true`, `margin: "-80px"`

**Card rows — staggered opacity** (all sections)
- Each card: `opacity: 0` → `opacity: 1`
- Stagger: 60ms between cards
- Duration per card: 500ms, ease: `ease-out-smooth`
- Controlled by `useInView` on the row ref, not variant propagation
- Only `opacity` (no `y` translate) inside scroll containers to avoid clipping

---

### 3. Continue Watching

**Progress bar fill on entry** (`ContinueWatchingCard.tsx`)
- On card enters viewport: fill animates `width: 0%` → `width: {progress}%`
- Duration: 900ms, ease: `ease-out-smooth`
- Delay: 200ms (after card itself fades in)
- Uses `whileInView` on the fill `motion.div`, `once: true`

---

### 4. Top 10

**Rank number pop-in** (`TopCard.tsx`)
- Triggers when card scrolls into view
- `opacity: 0, scale: 0.6, y: 10` → `opacity: 1, scale: 1, y: 0`
- Duration: 600ms, ease: `spring-pop` (slight overshoot gives kinetic feel)
- Stagger applied from parent `TopTenSection` via index-based delay
- Result: numbers appear to "stamp" into place in sequence

---

### 5. Sponsored Banner

**Ken Burns background** (`SponsoredBanner.tsx`)
- Background image continuously pans: `scale: 1` → `scale: 1.08`
- Duration: 12s, ease: `linear`, `repeat: Infinity, repeatType: "mirror"`
- Runs while section is mounted — creates an atmospheric "breathing" scene

**Left CTA entrance** (`SponsoredBanner.tsx`)
- `opacity: 0, x: -30` → `opacity: 1, x: 0`
- Duration: 600ms, ease: `ease-out-smooth`, delay: 100ms
- Trigger: `whileInView`, `once: true`

**Cards row entrance** (`SponsoredBanner.tsx`)
- `opacity: 0, x: 30` → `opacity: 1, x: 0`
- Duration: 600ms, ease: `ease-out-smooth`, delay: 250ms
- Creates a gentle converging motion from both sides

---

## Implementation Notes

- All scroll triggers use Framer Motion `useInView` / `whileInView` — no custom scroll listeners
- Parallax uses `useScroll` + `useTransform` scoped to the hero section ref (not `window`)
- Ken Burns and glow pulse use `animate` with `repeat: Infinity` — run on mount
- CSS `group-hover` patterns are untouched — additive only
- `once: true` on all scroll triggers — animations don't replay on scroll-back
