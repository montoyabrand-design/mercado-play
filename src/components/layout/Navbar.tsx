"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";

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

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:          scrolled ? "rgba(8,9,10,0.88)" : "transparent",
        backdropFilter:      scrolled ? "blur(24px)"        : "none",
        WebkitBackdropFilter:scrolled ? "blur(24px)"        : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-10 h-[64px] flex items-center justify-between">
        {/* Meli Play logo */}
        <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 40, width: "auto" }} />

        {/* Nav links — gap-6 = 24px between items (matches Figma itemSpacing) */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              className="font-ui text-[16px] font-medium transition-all duration-200"
              style={{
                color:          "#f7f8f8",
                padding:        "12px 16px",
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

        {/* User avatar */}
        <Avatar border="white" size={36} src="/img/User Avatar.png" alt="User" />
      </div>
    </header>
  );
}
