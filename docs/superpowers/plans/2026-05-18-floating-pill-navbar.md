# Floating Pill Navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fixed full-width navbar with a two-state scroll-triggered header — transparent full-width at the top, frosted-glass floating pill after 80px of scroll.

**Architecture:** Two sub-components (`FullNav`, `PillNav`) rendered inside `AnimatePresence` in the existing `Navbar.tsx`. A shared `NavLinks` sub-component is extracted to avoid duplication. A single new CSS token (`--glass-nav-bg`) is added to `globals.css`. No new files, no new dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, Framer Motion v12, Tailwind v4 (`@theme` tokens in globals.css)

---

## File Map

| File | Change |
|---|---|
| `src/app/globals.css` | Add `--glass-nav-bg` to `:root` |
| `src/components/layout/Navbar.tsx` | Full rewrite — extract `NavLinks`, add `FullNav` + `PillNav`, wire `AnimatePresence` |

---

### Task 1: Add `--glass-nav-bg` CSS token

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the token to `:root`**

Open `src/app/globals.css`. Find the `:root {` block (it starts around line 67, after the `@theme` block). Add the new token:

```css
:root {
  --gradient-brand:         linear-gradient(135deg, #fdf5bf 0%, #f1bf34 100%);
  --gradient-numbers:       linear-gradient(to bottom, #fdf5bf 0%, #f1bf34 100%);
  --gradient-scrim-bottom:  linear-gradient(to top, #08090a 0%, transparent 100%);
  --gradient-overlay-dark:  linear-gradient(to bottom, transparent 0%, rgba(8,9,10,0.85) 100%);
  --gradient-vignette:      linear-gradient(to right, #08090a 0%, transparent 60%);
  --glass-nav-bg:           rgba(8, 9, 10, 0.72);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "Add --glass-nav-bg token for frosted pill navbar"
```

---

### Task 2: Add Framer Motion import and extract `NavLinks`

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add `motion` and `AnimatePresence` to imports**

Replace the top of `src/components/layout/Navbar.tsx` with:

```tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CIN = [0.25, 0.46, 0.45, 0.94] as const;
```

- [ ] **Step 2: Add `NavLinks` sub-component**

After the existing style constants (`SELECTED_STYLE`, `HOVER_STYLE`, `DEFAULT_STYLE`) and before the `Navbar` export, add:

```tsx
function NavLinks() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onMouseEnter={() => setHovered(item.label)}
          onMouseLeave={() => setHovered(null)}
          className="font-ui text-[16px] font-medium transition-all duration-200"
          style={{
            color:   "var(--color-text-secondary)",
            padding: "12px 16px",
            ...(pathname === item.href
              ? SELECTED_STYLE
              : hovered === item.label
              ? HOVER_STYLE
              : DEFAULT_STYLE),
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "Extract NavLinks sub-component; add Framer Motion imports"
```

---

### Task 3: Build `FullNav` component

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add `FullNav` after `NavLinks`**

```tsx
function FullNav() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.3, ease: EASE_CIN }}
    >
      <div className="max-w-[1280px] mx-auto px-10 h-[64px] flex items-center justify-between">
        <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 40, width: "auto" }} />
        <NavLinks />
        <Avatar border="white" size={36} src="/img/User Avatar.png" alt="User" />
      </div>
    </motion.header>
  );
}
```

Note: `FullNav` is always transparent — it only renders when `scrollY < 80px` so the frosted-glass-on-scroll effect is no longer needed.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "Add FullNav motion component"
```

---

### Task 4: Build `PillNav` component

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add `PillNav` after `FullNav`**

```tsx
function PillNav() {
  return (
    <motion.div
      className="fixed left-0 right-0 z-50 flex justify-center"
      style={{ top: "var(--spacing-sp4)", pointerEvents: "none" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth:            760,
          width:               "100%",
          height:              56,
          margin:              "0 var(--spacing-sp5)",
          borderRadius:        "var(--radius-full)",
          background:          "var(--glass-nav-bg)",
          backdropFilter:      "blur(24px)",
          WebkitBackdropFilter:"blur(24px)",
          border:              "1px solid rgba(255,255,255,0.08)",
          boxShadow:           "0 8px 32px rgba(0,0,0,0.4)",
          padding:             "0 var(--spacing-sp5)",
          pointerEvents:       "auto",
        }}
      >
        <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 32, width: "auto" }} />
        <NavLinks />
        <Avatar border="white" size={32} src="/img/User Avatar.png" alt="User" />
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "Add PillNav frosted-glass pill component"
```

---

### Task 5: Wire up `AnimatePresence` in `Navbar`

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Replace the `Navbar` export entirely**

Replace the existing `export function Navbar()` with:

```tsx
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled ? <PillNav key="pill-nav" /> : <FullNav key="full-nav" />}
    </AnimatePresence>
  );
}
```

Note: `AnimatePresence` default mode (`"sync"`) allows exit and enter to overlap simultaneously. The 100ms `delay` on `PillNav`'s `animate` transition creates the natural stagger without blocking.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- At page top: full-width transparent navbar is visible
- Scroll past 80px: full nav slides up and disappears, pill slides down from above
- Scroll back to top: pill exits up, full nav returns
- Active link (Home) shows yellow underline in both states
- Hover states work in both states
- Logo, links, and avatar are all visible in the pill

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "Wire AnimatePresence; switch scroll threshold to 80px"
```

---

### Task 6: Push to GitHub

- [ ] **Step 1: Push**

```bash
git push
```

Expected: Vercel picks up the push and deploys automatically.
