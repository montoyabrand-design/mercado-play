"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContentItem } from "@/types";
import { TopCard } from "@/components/cards/TopCard";

interface TopTenSectionProps {
  items: ContentItem[];
  title: string;
}

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function TopTenSection({ items, title }: TopTenSectionProps) {
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
          {title}
        </h2>
        <button className="font-ui text-[13px] font-medium text-[#767676] hover:text-[#f1c036] transition-colors duration-200 cursor-pointer">
          Ver todo →
        </button>
      </motion.div>

      <div
        ref={rowRef}
        className="flex overflow-x-auto scrollbar-hide pr-10 pb-4"
        style={{ gap: 0 }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_SMOOTH, delay: i * 0.07 }}
          >
            <TopCard item={item} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
