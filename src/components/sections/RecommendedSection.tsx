"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContentItem } from "@/types";
import { HorizontalScrollRow } from "@/components/ui/HorizontalScrollRow";
import { RecommendationCard } from "@/components/cards/RecommendationCard";

interface RecommendedSectionProps {
  items: ContentItem[];
}

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function RecommendedSection({ items }: RecommendedSectionProps) {
  const [filter, setFilter] = useState<"series" | "peliculas">("series");
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
          Recomendado Por Tu Círculo
        </h2>

        <div
          className="flex items-center p-1 rounded-full"
          style={{ background: "rgba(247,248,248,0.06)", border: "1px solid rgba(247,248,248,0.1)" }}
        >
          {(["series", "peliculas"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className="px-5 py-1.5 rounded-full font-ui text-[13px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: filter === opt ? "rgba(247,248,248,0.12)" : "transparent",
                color: filter === opt ? "#ffffff" : "#767676",
              }}
            >
              {opt === "series" ? "Series" : "Películas"}
            </button>
          ))}
        </div>
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
              <RecommendationCard item={item} />
            </motion.div>
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
