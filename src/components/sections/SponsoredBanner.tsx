"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/types";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { RecommendationCard } from "@/components/cards/RecommendationCard";

interface SponsoredBannerProps {
  item: ContentItem;
  relatedItems: ContentItem[];
}

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function SponsoredBanner({ item, relatedItems }: SponsoredBannerProps) {
  return (
    <section
      className="w-full overflow-hidden relative"
      style={{ background: "#080909", height: 456 }}
    >
      {/* Background image — Ken Burns slow pan + left-to-right mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img/sponsored-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          opacity: 0.9,
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, transparent 62%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, transparent 62%)",
        }}
        animate={{ scale: 1.08 }}
        initial={{ scale: 1 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Figma gradient overlay — top+bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #08090a 5%, transparent 25.7%, #08090a 82.1%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-10 pt-20 flex items-start gap-0">

        {/* Left CTA — slides in from left */}
        <motion.div
          className="shrink-0 flex flex-col justify-center"
          style={{ width: 491 }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_SMOOTH, delay: 0.1 }}
        >
          {/* Paramount+ logo */}
          <div className="mb-5">
            <img src="/img/paramount-logo.png" alt="Paramount+" style={{ height: 28, width: "auto" }} />
          </div>

          <h2
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            Más historias para compartir
          </h2>

          <p className="font-ui text-[14px] text-white/50 mb-5 leading-relaxed" style={{ maxWidth: 380 }}>
            Al suscribirte obtienes un 15% OFF y accedes a mucho más contenido desde Meli Play.
          </p>

          {item.circleWatchers && item.circleWatchers.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <AvatarStack watchers={item.circleWatchers} size={26} border="subtle" />
              <p className="font-ui flex items-center gap-1.5" style={{ fontSize: "var(--text-ds-sm)", color: "var(--color-text-primary)" }}>
                {item.circleWatchers!.slice(0, 2).map((w) => w.name).join(" y ")}{" "}vieron
                <img src="/img/yellowjackets-logo.png" alt="Yellowjackets" style={{ height: 22, width: "auto", display: "inline-block" }} />
              </p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 h-[53px] px-6 rounded-full font-ui font-semibold text-[16px] text-[#08090a] cursor-pointer w-fit"
            style={{ background: "linear-gradient(135deg, #fdf5bf 0%, #f1bf34 100%)" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#08090a">
              <line x1="8" y1="2" x2="8" y2="14" stroke="#08090a" strokeWidth="2" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="#08090a" strokeWidth="2" />
            </svg>
            Suscribirse
          </motion.button>
        </motion.div>

        {/* Cards row — slides in from right */}
        <motion.div
          className="flex gap-4 overflow-x-auto scrollbar-hide pl-8"
          style={{ flex: 1 }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_SMOOTH, delay: 0.25 }}
        >
          {relatedItems.map((relItem) => (
            <RecommendationCard key={relItem.id} item={relItem} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
