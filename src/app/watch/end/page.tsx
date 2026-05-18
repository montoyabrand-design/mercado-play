"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { heroItems, recommendedItems } from "@/lib/data";
import { ContentItem } from "@/types";

const item       = heroItems[0];
const NEXT_ITEMS = recommendedItems.slice(0, 3);

const EASE_OUT = [0.16, 1, 0.3, 1]        as const;
const EASE_CIN = [0.25, 0.46, 0.45, 0.94] as const;

type Rating = "liked" | "disliked" | null;

export default function WatchEndPage() {
  const router = useRouter();
  const [rating, setRating] = useState<Rating>(null);
  const [gifKey, setGifKey] = useState(0);

  const handleRate = (r: "liked" | "disliked") => {
    if (rating !== null) return;
    setRating(r);
    if (r === "liked") setGifKey((k) => k + 1);
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Full-bleed backdrop — no blur, matches Figma */}
      <div className="absolute inset-0">
        <img
          src={item.backdropImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35)", transform: "scale(1.02)" }}
        />
      </div>

      {/* Left gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,9,10,0.92) 0%, rgba(8,9,10,0.5) 50%, transparent 80%)",
        }}
      />
      {/* Top + bottom scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,9,10,0.6) 0%, transparent 28%, transparent 60%, rgba(8,9,10,0.85) 100%)",
        }}
      />

      {/* ── Top bar ── */}
      <motion.div
        className="absolute flex items-center gap-4"
        style={{ top: 24, left: 24 }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
      >
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          style={{ opacity: 0.8 }}
        >
          <img src="/icons/Back button.svg" width={24} height={24} alt="Volver" />
        </motion.button>
        <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 28 }} />
      </motion.div>

      {/* ── Main content block — x:64 y:187 w:390 matching Figma ── */}
      <div className="absolute" style={{ top: 187, left: 64, width: 390 }}>

        {/* "Terminaste" — 32px bold white */}
        <motion.h2
          className="font-display font-bold text-white"
          style={{ fontSize: 32, letterSpacing: "-0.02em", marginBottom: 4 }}
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: EASE_CIN, delay: 0.35 }}
        >
          Terminaste
        </motion.h2>

        {/* Movie title logo — 390×124 */}
        <motion.div
          style={{ marginBottom: 16 }}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE_CIN, delay: 0.48 }}
        >
          {item.titleImg ? (
            <img
              src={item.titleImg}
              alt={item.title}
              style={{ width: 390, height: 124, objectFit: "contain", objectPosition: "left center" }}
            />
          ) : (
            <h1
              className="font-display font-black text-white"
              style={{ fontSize: 52, letterSpacing: "-0.04em" }}
            >
              {item.title}
            </h1>
          )}
        </motion.div>

        {/* Rating prompt */}
        <motion.div
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.62 }}
        >
          <p className="font-ui font-semibold text-white" style={{ fontSize: 20, marginBottom: 4 }}>
            ¿Qué te pareció?
          </p>
          <p className="font-ui font-semibold text-white" style={{ fontSize: 16, opacity: 0.75 }}>
            Tu elección enriquece el contenido de tu círculo.
          </p>
        </motion.div>

        {/* Rating cards — 140×117, gap 12 */}
        <div className="flex gap-3">

          {/* ── Recomendada ── */}
          <motion.button
            onClick={() => handleRate("liked")}
            className="relative overflow-visible cursor-pointer flex flex-col items-center justify-center gap-[4px]"
            style={{
              width: 140,
              height: 124,
              borderRadius: 12,
              padding: 12,
              background: "rgba(247,248,248,0.06)",
              border: rating === "liked"
                ? "1.5px solid #f1c036"
                : "1.5px solid rgba(255,255,255,0.1)",
              boxShadow: rating === "liked"
                ? "0 0 28px rgba(241,192,54,0.3)"
                : "none",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: rating === "disliked" ? 0.28 : 1,
              y: 0,
              scale: rating === "liked" ? 1.05 : rating === "disliked" ? 0.95 : 1,
            }}
            transition={{
              y:       { duration: 0.55, ease: EASE_OUT, delay: 0.78 },
              scale:   { duration: 0.45, ease: EASE_OUT, delay: rating ? 0 : 0.78 },
              opacity: { duration: 0.45, ease: EASE_OUT, delay: rating ? 0 : 0.78 },
            }}
            whileHover={!rating ? { y: -6, scale: 1.04, transition: { duration: 0.28 } } : {}}
            whileTap={{ scale: 0.97 }}
          >
            {/* Icon — static until clicked, GIF after — both rendered at 64×64 */}
            <AnimatePresence mode="wait">
              {rating === "liked" ? (
                <motion.img
                  key={`gif-${gifKey}`}
                  src={`/img/thumbs_noloop.gif?v=${gifKey}`}
                  alt=""
                  style={{ width: 77, height: 77, objectFit: "cover", objectPosition: "center" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              ) : (
                <motion.img
                  key="static"
                  src="/img/static thumbs.png"
                  alt=""
                  style={{ width: 77, height: 77, objectFit: "contain" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </AnimatePresence>
            <span
              className="font-ui font-semibold"
              style={{
                fontSize: 16,
                color: rating === "liked" ? "#f1c036" : "#f7f8f8",
                transition: "color 0.3s",
                lineHeight: 1,
              }}
            >
              Recomendada
            </span>
          </motion.button>

          {/* ── No es lo mío ── */}
          <motion.button
            onClick={() => handleRate("disliked")}
            className="relative overflow-hidden cursor-pointer flex flex-col items-center justify-center gap-[4px]"
            style={{
              width: 140,
              height: 124,
              borderRadius: 12,
              padding: 12,
              background: "rgba(247,248,248,0.06)",
              border: rating === "disliked"
                ? "1.5px solid rgba(247,248,248,0.45)"
                : "1.5px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: rating === "liked" ? 0.28 : 1,
              y: 0,
              scale: rating === "disliked" ? 1.05 : rating === "liked" ? 0.95 : 1,
            }}
            transition={{
              y:       { duration: 0.55, ease: EASE_OUT, delay: 0.9 },
              scale:   { duration: 0.45, ease: EASE_OUT, delay: rating ? 0 : 0.9 },
              opacity: { duration: 0.45, ease: EASE_OUT, delay: rating ? 0 : 0.9 },
            }}
            whileHover={!rating ? { y: -6, scale: 1.04, transition: { duration: 0.28 } } : {}}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="/img/No icon.png"
              alt=""
              style={{ width: 77, height: 77, objectFit: "contain" }}
            />
            <span
              className="font-ui font-semibold text-white"
              style={{ fontSize: 16, lineHeight: 1 }}
            >
              No es lo mío
            </span>
          </motion.button>
        </div>
      </div>

      {/* ── Suggested cards — right side, vertically centered with rating cards ── */}
      <AnimatePresence>
        {rating && (
          <div
            className="absolute"
            style={{ top: 369, right: 64 }}
          >
            {/* Label — same hierarchy as ¿Qué te pareció? */}
            <motion.p
              className="font-ui font-semibold text-white"
              style={{ fontSize: 20, marginBottom: 12 }}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              Continuar viendo
            </motion.p>

            {/* Cards row */}
            <div className="flex gap-5">
              {NEXT_ITEMS.map((next, i) => (
                <motion.div
                  key={next.id}
                  initial={{ opacity: 0, y: 80, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 + i * 0.12 }}
                >
                  <EndScreenCard item={next} onClick={() => router.push("/watch")} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Dev shortcut — remove before handoff */}
      <button
        onClick={() => router.push("/")}
        className="absolute cursor-pointer font-ui text-xs"
        style={{ bottom: 12, right: 16, color: "rgba(255,255,255,0.18)" }}
      >
        Volver al inicio →
      </button>
    </motion.div>
  );
}

/* ── EndScreenCard — mirrors RecommendationCard hover exactly, at 228px ── */
function EndScreenCard({ item, onClick }: { item: ContentItem; onClick: () => void }) {
  return (
    <motion.div
      whileHover="hover"
      className="group shrink-0 cursor-pointer"
      style={{ width: 228 }}
      onClick={onClick}
    >
      <div className="relative rounded-[8px] overflow-hidden" style={{ width: 228, height: 298 }}>

        {/* Poster — scales on hover via variant */}
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

          {/* Grain — same as RecommendationCard */}
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

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 rounded-[8px] bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Play icon — bottom-left, appears on hover */}
        <div
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ left: 8, bottom: 8 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="6,3 6,21 21,12" fill="white" />
          </svg>
        </div>

        {/* Yellow border ring on hover */}
        <div
          className="absolute inset-0 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ border: "2px solid #f1c036" }}
        />
      </div>
    </motion.div>
  );
}
