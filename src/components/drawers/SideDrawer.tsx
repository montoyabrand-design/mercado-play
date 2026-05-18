"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrawer } from "@/contexts/DrawerContext";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Tag } from "@/components/ui/Tag";
import { ReactionPill } from "@/components/ui/ReactionPill";
import { DrawerComment } from "@/types";

const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;
const DRAWER_W = 460;

function CommentRow({ comment }: { comment: DrawerComment }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="shrink-0 rounded-full overflow-hidden flex items-center justify-center text-white font-semibold"
        style={{ width: 40, height: 40, fontSize: 14, background: comment.avatarColor }}
      >
        {comment.avatarImg ? (
          <img src={comment.avatarImg} alt={comment.author} className="w-full h-full object-cover" />
        ) : (
          comment.initials
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-ui font-semibold mb-0.5 leading-none"
          style={{ fontSize: 12, color: "#767676" }}
        >
          {comment.author}
        </p>
        <p className="font-ui font-medium leading-snug" style={{ fontSize: 16, color: "#f7f8f8" }}>
          "{comment.text}"
        </p>
      </div>
    </div>
  );
}

export function SideDrawer() {
  const { isOpen, item, close } = useDrawer();
  const [expanded, setExpanded] = useState(false);

  /* Reset expanded state whenever a new item opens */
  useEffect(() => {
    setExpanded(false);
  }, [item?.id]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(8,9,10,0.72)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />

          {/* Panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: DRAWER_W }}
            animate={{ x: 0 }}
            exit={{ x: DRAWER_W }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
            className="fixed right-0 top-0 bottom-0 z-50 overflow-y-auto overflow-x-hidden"
            style={{
              width: DRAWER_W,
              background: "#08090a",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* ── S1 Movie Overview ── pt:48 px:24 pb:32 gap:12 */}
            <motion.section
              className="relative flex flex-col"
              style={{ padding: "48px 24px 32px", gap: 12 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_SMOOTH, delay: 0.08 }}
            >
              {/* Close — absolute, 16px from top-right (matches Figma Icons/x at x:420 y:16) */}
              <button
                onClick={close}
                className="absolute flex items-center justify-center rounded-full cursor-pointer transition-colors duration-150 hover:bg-white/10"
                style={{ top: 16, right: 16, width: 24, height: 24 }}
                aria-label="Cerrar"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Frame 58: meta + title, gap:4 */}
              <div className="flex flex-col" style={{ gap: 4 }}>
                {/* Meta row: 12px / 500 / gray */}
                <p className="font-ui font-medium" style={{ fontSize: 12, color: "#767676" }}>
                  {item.year}&nbsp;&nbsp;•&nbsp;&nbsp;{item.genres[0]}&nbsp;&nbsp;•&nbsp;&nbsp;{item.duration}
                </p>

                {/* Title: DM Sans Bold 32px / #f7f8f8 */}
                <h2
                  className="font-display font-bold leading-tight"
                  style={{ fontSize: 32, color: "#f7f8f8", letterSpacing: "-0.02em" }}
                >
                  {item.title}{item.subtitle ? ` ${item.subtitle}` : ""}
                </h2>
              </div>

              {/* Description */}
              <p className="font-ui leading-relaxed" style={{ fontSize: 16, color: "#f7f8f8" }}>
                {item.description}
              </p>

              {/* Expanded details: director + cast */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_SMOOTH }}
                    className="overflow-hidden flex flex-col"
                    style={{ gap: 16 }}
                  >
                    {item.director && (
                      <div className="flex flex-col" style={{ gap: 2 }}>
                        <p className="font-ui font-medium uppercase tracking-widest" style={{ fontSize: 11, color: "#767676", letterSpacing: "0.1em" }}>
                          Director
                        </p>
                        <p className="font-ui" style={{ fontSize: 16, color: "#f7f8f8" }}>
                          {item.director}
                        </p>
                      </div>
                    )}
                    {item.cast && item.cast.length > 0 && (
                      <div className="flex flex-col" style={{ gap: 2 }}>
                        <p className="font-ui font-medium uppercase tracking-widest" style={{ fontSize: 11, color: "#767676", letterSpacing: "0.1em" }}>
                          Reparto
                        </p>
                        <p className="font-ui" style={{ fontSize: 16, color: "#f7f8f8", lineHeight: 1.6 }}>
                          {item.cast.join(", ")}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Leer Más / Leer Menos toggle */}
              <motion.button
                whileHover="hovered"
                onClick={() => setExpanded((v) => !v)}
                className="relative font-ui font-semibold cursor-pointer self-start"
                style={{ fontSize: 14, color: "#f1c036" }}
              >
                {expanded ? "Leer Menos" : "Leer Más"}
                <motion.span
                  variants={{ hovered: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  className="absolute bottom-[-1px] left-0 right-0 h-[1px] origin-left"
                  style={{ background: "#f1c036" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.button>
            </motion.section>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />

            {/* ── S2 Circle Activity ── pt:32 px:24 pb:32, sub-frames gap:32 */}
            {item.circleWatchers && item.circleWatchers.length > 0 && (
              <motion.section
                className="flex flex-col"
                style={{ padding: "32px 24px", gap: 32 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_SMOOTH, delay: 0.16 }}
              >
                {/* Frame 60: section header + avatar row, gap:12 */}
                <div className="flex flex-col" style={{ gap: 12 }}>
                  {/* "Reacciones de tu círculo": Geist SemiBold 20px / #ffffff */}
                  <p className="font-ui font-semibold" style={{ fontSize: 20, color: "#ffffff" }}>
                    Reacciones de tu círculo
                  </p>
                  {/* Reco Row */}
                  <div className="flex items-center gap-3">
                    <AvatarStack watchers={item.circleWatchers} size={40} border="subtle" />
                    <p className="font-ui font-medium" style={{ fontSize: 14, color: "#f7f8f8" }}>
                      {item.circleWatchers.length} amigo{item.circleWatchers.length !== 1 ? "s" : ""} la recomiendan
                    </p>
                  </div>
                </div>

                {/* Frame 59: "De Meli Play Companion" + reaction pills, gap:12 */}
                {item.reactions && item.reactions.length > 0 && (
                  <div className="flex flex-col" style={{ gap: 12 }}>
                    {/* "De Meli Play Companion": Geist SemiBold 14px / #ffffff */}
                    <p className="font-ui font-semibold" style={{ fontSize: 14, color: "#ffffff" }}>
                      De Meli Play Companion
                    </p>
                    <div className="flex flex-wrap" style={{ gap: 8 }}>
                      {item.reactions.map((r) => (
                        <ReactionPill key={r.label} emoji={r.emoji} count={r.count} label={r.label} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Frame 61: "Comentarios" + comment items, gap:12 */}
                {item.comments && item.comments.length > 0 && (
                  <div className="flex flex-col" style={{ gap: 12 }}>
                    {/* "Comentarios": Geist SemiBold 14px / #ffffff */}
                    <p className="font-ui font-semibold" style={{ fontSize: 14, color: "#ffffff" }}>
                      Comentarios
                    </p>
                    <div className="flex flex-col" style={{ gap: 16 }}>
                      {item.comments.map((c) => (
                        <CommentRow key={c.author} comment={c} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            )}

            {/* Divider before tags */}
            {item.tags && item.tags.length > 0 && (
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />
            )}

            {/* ── S5 Social Tags ── pt:32 px:24 pb:32 gap:12 */}
            {item.tags && item.tags.length > 0 && (
              <motion.section
                className="flex flex-col"
                style={{ padding: "32px 24px", gap: 12 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_SMOOTH, delay: 0.24 }}
              >
                {/* "Tags": Geist SemiBold 14px / #ffffff */}
                <p className="font-ui font-semibold" style={{ fontSize: 14, color: "#ffffff" }}>
                  Tags
                </p>
                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {item.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </motion.section>
            )}

            <div style={{ height: 32 }} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
