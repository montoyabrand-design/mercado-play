"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/types";

interface ContinueWatchingCardProps {
  item: ContentItem;
}

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function ContinueWatchingCard({ item }: ContinueWatchingCardProps) {
  return (
    <div className="group shrink-0 cursor-pointer" style={{ width: 389 }}>

      {/* Thumbnail area */}
      <div className="relative" style={{ width: 389, height: 234 }}>

        {/* Clipped image container */}
        <div className="absolute inset-0 rounded-[8px] overflow-hidden">
          {item.posterImg ? (
            <img
              src={item.posterImg}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: item.posterCss }} />
          )}

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "128px 128px",
            }}
          />

          {/* Bottom scrim */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "40%",
              background: "linear-gradient(to top, rgba(8,9,10,0.7) 0%, transparent 100%)",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

          {/* Play icon — bottom-left */}
          <div
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ left: "var(--spacing-sp2)", bottom: "var(--spacing-sp2)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="6,3 6,21 21,12" fill="white" />
            </svg>
          </div>

          {/* Accent glow on top edge */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, ${item.accentColor}80, transparent 70%)` }}
          />
        </div>

        {/* Border ring */}
        <div
          className="absolute inset-0 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ border: "2px solid #f1c036" }}
        />
      </div>

      {/* Progress bar — fill animates in on scroll entry */}
      <div className="h-[3px] bg-white/10 rounded-full overflow-hidden mt-1" style={{ width: 389 }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #fdf5bf 0%, #f1bf34 100%)" }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${item.progress ?? 0}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE_OUT_SMOOTH, delay: 0.2 }}
        />
      </div>

      {/* Title */}
      <p className="font-ui font-semibold text-white mt-2 truncate" style={{ fontSize: 20 }}>
        {item.title}
      </p>
    </div>
  );
}
