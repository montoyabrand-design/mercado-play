"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CIN = [0.25, 0.46, 0.45, 0.94] as const;

const navItems = [
  { label: "Home",      href: "/"         },
  { label: "Películas", href: "/movies"   },
  { label: "Series",    href: "/series"   },
  { label: "Lista",     href: "/my-list"  },
  { label: "Círculos",  href: "/circulos" },
];

/* Figma Navlink: yellow bottom underline + white radial glow from below
   Selected — #f1c036 underline, opacity 0.5 glow
   Hover    — white/40 underline, opacity 0.30 glow
   Default  — no stroke, no fill */
const SELECTED_STYLE = {
  borderBottom: "2px solid #f1c036",
  background:   "radial-gradient(ellipse at 50% 130%, rgba(247,248,248,0.15) 0%, transparent 65%)",
};
const HOVER_STYLE = {
  borderBottom: "2px solid rgba(247,248,248,0.40)",
  background:   "radial-gradient(ellipse at 50% 130%, rgba(247,248,248,0.09) 0%, transparent 65%)",
};
const DEFAULT_STYLE = {
  borderBottom: "2px solid transparent",
  background:   "transparent",
};

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

function PillNav() {
  return (
    <motion.div
      className="fixed left-0 right-0 z-50 flex justify-center"
      style={{ top: "var(--spacing-sp2)", pointerEvents: "none" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth:             760,
          width:                "100%",
          height:               56,
          margin:               "0 var(--spacing-sp5)",
          borderRadius:         "var(--radius-md)",
          background:           "var(--glass-nav-bg)",
          backdropFilter:       "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border:               "1px solid rgba(255,255,255,0.08)",
          boxShadow:            "0 8px 32px rgba(0,0,0,0.4)",
          padding:              "0 var(--spacing-sp5)",
          pointerEvents:        "auto",
        }}
      >
        <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 32, width: "auto" }} />
        <NavLinks />
        <Avatar border="white" size={32} src="/img/User Avatar.png" alt="User" />
      </div>
    </motion.div>
  );
}

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
