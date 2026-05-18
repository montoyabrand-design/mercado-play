"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DrawerReaction } from "@/types";

interface FloatingReactionsProps {
  reactions: DrawerReaction[];
  hidden?: boolean;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number; /* horizontal offset within the zone */
  scale: number;
}

export function FloatingReactions({ reactions, hidden = false }: FloatingReactionsProps) {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const counterRef = useRef(0);

  const emojiPool = reactions.length > 0
    ? reactions.map((r) => r.emoji)
    : ["🔥", "❤️", "🤯", "🍿"];

  useEffect(() => {
    const schedule = () => {
      /* Each emoji appears every 2–6 seconds */
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        const id = counterRef.current++;
        const x = Math.random() * 48 - 24; /* ±24px horizontal drift */
        const scale = 0.9 + Math.random() * 0.4;

        setEmojis((prev) => [...prev, { id, emoji, x, scale }]);

        /* Remove after animation completes (3.5s) */
        setTimeout(() => {
          setEmojis((prev) => prev.filter((e) => e.id !== id));
        }, 3500);

        schedule();
      }, delay);
    };

    const t = setTimeout(() => schedule(), 1500);
    return () => clearTimeout(t);
  }, [emojiPool.join("")]);

  if (hidden) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{ bottom: 90, right: 24, width: 80, height: 200 }}
    >
      <AnimatePresence>
        {emojis.map((e) => (
          <motion.div
            key={e.id}
            className="absolute bottom-0"
            style={{ right: 0, fontSize: 28, lineHeight: 1 }}
            initial={{ opacity: 0, y: 0, x: e.x, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-0, -80, -160, -200],
              x: [e.x, e.x + 8, e.x - 4, e.x + 2],
              scale: [0.5, e.scale, e.scale * 0.9, 0.7],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.2, ease: "easeOut", times: [0, 0.15, 0.7, 1] }}
          >
            {e.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
