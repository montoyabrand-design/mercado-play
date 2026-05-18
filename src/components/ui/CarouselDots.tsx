"use client";

import { motion } from "framer-motion";

interface CarouselDotsProps {
  count: number;
  current: number;
  onChange: (index: number) => void;
}

export function CarouselDots({ count, current, onChange }: CarouselDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          animate={{ width: i === current ? 48 : 8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2 rounded-full cursor-pointer"
          style={{
            background:
              i === current
                ? "linear-gradient(90deg, #fdf5bf 0%, #f1bf34 100%)"
                : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}
