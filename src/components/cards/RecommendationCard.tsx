"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/types";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { useDrawer } from "@/contexts/DrawerContext";

interface RecommendationCardProps {
  item: ContentItem;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  const firstWatcher = item.circleWatchers?.[0];
  const { open } = useDrawer();

  return (
    <motion.div
      whileHover="hover"
      className="group shrink-0 cursor-pointer"
      style={{ width: 288 }}
    >
      {/* Relative container — overflow-hidden clips the scale animation inside the border */}
      <div className="relative rounded-[8px] overflow-hidden" style={{ width: 288, height: 376 }}>

        {/* Poster with scale animation (Framer Motion) */}
        <motion.div
          variants={{ hover: { scale: 1.03 }, initial: { scale: 1 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 rounded-[8px] overflow-hidden"
        >
          {item.posterImg ? (
            <img src={item.posterImg} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
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
              height: "50%",
              background: "linear-gradient(to top, rgba(8,9,10,0.9) 0%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Dark overlay — CSS group-hover */}
        <div className="absolute inset-0 rounded-[8px] bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Comment bubble — top-left, x=4 y=4 matching Figma, shows on hover */}
        {firstWatcher && item.comment && (
          <div
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ top: 4, left: 4, width: 280 }}
          >
            <div className="flex items-center gap-1">
              {/* Single avatar */}
              <div
                className="shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 32,
                  height: 32,
                  border: "2px solid white",
                  boxShadow: "-4px 0 8px rgba(0,0,0,0.12)",
                }}
              >
                {firstWatcher.avatarImg ? (
                  <img src={firstWatcher.avatarImg} alt={firstWatcher.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ background: firstWatcher.avatarColor }}
                  >
                    {firstWatcher.initials}
                  </div>
                )}
              </div>

              {/* Frosted glass text bubble — color/bg/Opacity 2 + backdrop-blur */}
              <div
                className="flex-1 rounded-[4px] px-2 py-2"
                style={{
                  background: "rgba(247,248,248,0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <p
                  className="font-ui font-semibold text-[14px] leading-tight"
                  style={{ color: "#08090a" }}
                >
                  {item.comment}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Play icon — bottom-left x=8 y=344, 8px from bottom (spacing/2) */}
        <div
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ left: "var(--spacing-sp2)", bottom: "var(--spacing-sp2)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="6,3 6,21 21,12" fill="white" />
          </svg>
        </div>

        {/* Border ring — solid yellow, same pattern as ContinueWatchingCard */}
        <div
          className="absolute inset-0 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ border: "2px solid #f1c036" }}
        />
      </div>

      {/* Bottom details row */}
      <div className="flex items-center gap-2 mt-3" style={{ height: 40 }}>
        {item.circleWatchers && item.circleWatchers.length > 0 && (
          <>
            <AvatarStack watchers={item.circleWatchers} size={40} border="subtle" />
            <div className="flex flex-col justify-center min-w-0">
              <p className="font-ui text-[16px] text-[#767676] leading-tight">
                {item.circleCount ?? `${item.circleWatchers!.length} la están viendo`}
              </p>
              <motion.button
                whileHover="hovered"
                onClick={() => open(item)}
                className="relative font-ui text-[14px] font-semibold leading-tight cursor-pointer"
                style={{ color: "#f1c036" }}
              >
                Ver Más
                <motion.span
                  variants={{ hovered: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  className="absolute bottom-[-2px] left-0 right-0 h-[1.5px] origin-left"
                  style={{ background: "#f1c036" }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
