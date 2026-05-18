"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/types";

interface TopCardProps {
  item: ContentItem;
  index?: number;
}

/* Gradient stroke colors matching Figma exactly */
const STROKE_STOPS = [
  { offset: "2%",  color: "#5f3a0d" },
  { offset: "37%", color: "#f1bf36" },
  { offset: "68%", color: "#5f3a0d" },
  { offset: "100%",color: "#f1bf36" },
];

const EASE_SPRING_POP = [0.34, 1.56, 0.64, 1] as const;

export function TopCard({ item, index = 0 }: TopCardProps) {
  const rank     = item.rank ?? 1;
  const gradId   = `rank-stroke-${rank}`;
  /* Figma: Top Numbers 168×130, at x=-84 relative to card (272×376).
     Slot = 340px, card right-aligned → card left at x=68.
     Number left in slot coords = 68 - 84 = -16 (bleeds 16px into prev slot). */
  const SLOT_W   = 340;
  const CARD_W   = 272;
  const CARD_H   = 376;
  const NUM_W    = 168;
  const NUM_H    = 130;
  const NUM_BTM  = 16;
  const NUM_LEFT = (SLOT_W - CARD_W) - 84; // = -16

  return (
    <motion.div
      whileHover="hover"
      className="group relative shrink-0 cursor-pointer"
      style={{
        width:  SLOT_W,
        height: CARD_H + 20, // +20 for top padding (y=20 in Figma)
        /* Each slot stacks in z-index order so later slots paint over earlier ones,
           making each card's number appear in front of the previous card */
        isolation: "isolate",
      }}
    >
      {/* ── Poster card — fixed outer container clips the scale ── */}
      <div
        className="absolute rounded-[8px] overflow-hidden"
        style={{ width: CARD_W, height: CARD_H, right: 0, top: 20 }}
      >
        {/* Inner motion.div scales within the clipped container */}
        <motion.div
          variants={{ hover: { scale: 1.03 }, initial: { scale: 1 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Poster */}
          {item.posterImg ? (
            <img src={item.posterImg} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: item.posterCss }} />
          )}

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "128px 128px",
            }}
          />

          {/* Bottom scrim */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "50%",
              background: "linear-gradient(to top, rgba(8,9,10,0.9) 0%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Dark overlay — CSS group-hover, inside clip container */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>


      {/* ── Number — pops in on scroll with spring overshoot ── */}
      <motion.div
        className="absolute"
        style={{
          width:  NUM_W,
          height: NUM_H,
          left:   NUM_LEFT,
          bottom: NUM_BTM,
        }}
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_SPRING_POP, delay: index * 0.08 }}
      >
        {/* SVG text — gradient stroke + faint fill */}
        <svg
          width={NUM_W}
          height={NUM_H}
          viewBox={`0 0 ${NUM_W} ${NUM_H}`}
          overflow="visible"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              {STROKE_STOPS.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>

          {/* Outer glow pass */}
          <text
            x={NUM_W / 2}
            y={NUM_H - 4}
            textAnchor="middle"
            fontFamily="var(--font-dm-sans), DM Sans, sans-serif"
            fontWeight="900"
            fontSize={160}
            fill="none"
            stroke="#f1bf36"
            strokeWidth="6"
            strokeOpacity="0.12"
            paintOrder="stroke"
          >
            {rank}
          </text>

          {/* Main pass — gradient stroke + 30% opacity fill */}
          <text
            x={NUM_W / 2}
            y={NUM_H - 4}
            textAnchor="middle"
            fontFamily="var(--font-dm-sans), DM Sans, sans-serif"
            fontWeight="900"
            fontSize={160}
            fill="rgba(247,248,248,0.50)"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            paintOrder="stroke fill"
          >
            {rank}
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
