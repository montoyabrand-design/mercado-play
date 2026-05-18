"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DrawerComment } from "@/types";

interface FloatingCommentsProps {
  comments: DrawerComment[];
  playing: boolean;
}

interface LiveComment {
  id: number;
  author: string;
  initials: string;
  avatarColor: string;
  avatarImg?: string;
  text: string;
}

/* Extended pool of live viewer comments that cycle in addition to item comments */
const EXTRA_COMMENTS: Omit<LiveComment, "id">[] = [
  { author: "Diego R.", initials: "D", avatarColor: "#0369a1", text: "La fotografía 🤩" },
  { author: "Fer M.",   initials: "F", avatarColor: "#059669", text: "Zimmer 🔥🔥🔥" },
  { author: "Tomás A.", initials: "T", avatarColor: "#d97706", text: "Épico total 🙌" },
  { author: "Nico B.",  initials: "N", avatarColor: "#dc2626", text: "Qué escena 😤" },
];

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

/* Reading-time dismissal: 200 wpm + 2s recognition buffer, clamped 4–8s */
function readMs(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.min(8000, Math.max(4000, (words / 200) * 60_000 + 2000));
}

export function FloatingComments({ comments, playing }: FloatingCommentsProps) {
  const [visible, setVisible] = useState<LiveComment[]>([]);
  const counterRef = useRef(0);
  const shownRef = useRef(0);
  const poolRef = useRef<Omit<LiveComment, "id">[]>([]);
  const playingRef = useRef(playing);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  /* Build a combined pool: item comments first, then extras */
  useEffect(() => {
    const itemPool = comments.map((c) => ({
      author: c.author,
      initials: c.initials,
      avatarColor: c.avatarColor,
      avatarImg: c.avatarImg,
      text: c.text,
    }));
    poolRef.current = [...itemPool, ...EXTRA_COMMENTS];
  }, [comments]);

  useEffect(() => {
    let poolIdx = 0;

    const schedule = () => {
      /* 10–12s cooldown between comments */
      const delay = 10000 + Math.random() * 2000;
      return setTimeout(() => {
        /* Session cap: max 5 comments per watch session */
        if (shownRef.current >= 5) return;

        /* Pause suppression: skip this tick and reschedule if not playing */
        if (!playingRef.current) { schedule(); return; }

        const pool = poolRef.current;
        if (!pool.length) { schedule(); return; }

        const raw = pool[poolIdx % pool.length];
        poolIdx++;
        shownRef.current++;
        const comment: LiveComment = { id: counterRef.current++, ...raw };

        setVisible((prev) => {
          /* Cap at 3 visible at once */
          const next = prev.length >= 3 ? prev.slice(1) : prev;
          return [...next, comment];
        });

        /* Reading-time-aware dismissal */
        setTimeout(() => {
          setVisible((prev) => prev.filter((c) => c.id !== comment.id));
        }, readMs(comment.text));

        schedule();
      }, delay);
    };

    /* Start first comment after 3s */
    const initial = setTimeout(() => {
      schedule();
    }, 3000);

    return () => clearTimeout(initial);
  }, []);

  return (
    <div
      className="absolute flex flex-col-reverse gap-2 pointer-events-none"
      style={{ top: 24, right: 24, width: 260 }}
    >
      <AnimatePresence mode="popLayout">
        {visible.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_OUT_SMOOTH }}
            className="flex items-start gap-2 self-end"
          >
            {/* Avatar */}
            <div
              className="shrink-0 rounded-full overflow-hidden flex items-center justify-center font-semibold text-white"
              style={{ width: 32, height: 32, fontSize: 12, background: c.avatarColor }}
            >
              {c.avatarImg ? (
                <img src={c.avatarImg} alt={c.author} className="w-full h-full object-cover" />
              ) : (
                c.initials
              )}
            </div>

            {/* Frosted glass bubble — author stacked above comment */}
            <div
              className="flex flex-col rounded-xl px-3 py-2"
              style={{
                background: "rgba(13,14,16,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                gap: 2,
              }}
            >
              <span className="font-ui leading-none" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                {c.author}
              </span>
              <span className="font-ui font-medium leading-snug" style={{ fontSize: 16, color: "#f7f8f8" }}>
                {c.text}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
