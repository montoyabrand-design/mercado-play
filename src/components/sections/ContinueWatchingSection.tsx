"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContentItem } from "@/types";
import { HorizontalScrollRow } from "@/components/ui/HorizontalScrollRow";
import { ContinueWatchingCard } from "@/components/cards/ContinueWatchingCard";

interface ContinueWatchingSectionProps {
  items: ContentItem[];
}

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function ContinueWatchingSection({ items }: ContinueWatchingSectionProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <section>
      <motion.div
        className="flex items-center justify-between mb-6 px-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: EASE_OUT_SMOOTH }}
      >
        <h2 className="font-display font-bold text-white" style={{ fontSize: 32 }}>
          Continuar Viendo
        </h2>
        <button className="font-ui text-[13px] font-medium text-[#767676] hover:text-[#f1c036] transition-colors duration-200 cursor-pointer">
          Ver todo →
        </button>
      </motion.div>

      <div ref={rowRef}>
        <HorizontalScrollRow gap={16}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_SMOOTH, delay: i * 0.07 }}
            >
              <ContinueWatchingCard item={item} />
            </motion.div>
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
