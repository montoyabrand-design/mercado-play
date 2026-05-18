"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ContentItem } from "@/types";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { useDrawer } from "@/contexts/DrawerContext";

interface HeroCarouselProps {
  items: ContentItem[];
}

const SLIDE_DURATION = 6000;

const EASE_CINEMATIC = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

/* Variant sets — keyed by the same names so AnimatePresence propagates them */
const contentVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_CINEMATIC } },
  exit:   { opacity: 0, x: 16,  transition: { duration: 0.3,  ease: EASE_CINEMATIC } },
};

const titleVariants = {
  hidden:   { opacity: 0, filter: "blur(10px)", y: -10 },
  visible:  { opacity: 1, filter: "blur(0px)",  y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC, delay: 0.1 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

const metaVariants = {
  hidden:   { opacity: 0, y: 12 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_SMOOTH, delay: 0.2 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

const buttonsVariants = {
  hidden:   { opacity: 0, y: 12 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_SMOOTH, delay: 0.32 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const sectionRef = useRef<HTMLElement>(null);
  const { open } = useDrawer();

  /* Scroll parallax — backdrop moves at 0.25× scroll speed */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 720], [0, -180]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= SLIDE_DURATION) {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % items.length);
      }
    };

    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, [current, items.length]);

  const item = items[current];

  return (
    <>
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: 720 }}>

      {/* Full-bleed background — crossfade + scale between slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={item.id + "-bg"}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeInOut" },
            scale:   { duration: 8,   ease: "linear" },
          }}
          className="absolute inset-0"
          style={{
            background: item.backdropImg ? undefined : item.backdropCss,
            y: bgY,
            /* Overscan so parallax shift doesn't reveal edges */
            top: -40,
            bottom: -40,
          }}
        >
          {item.backdropImg && (
            <img
              src={item.backdropImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark vignette — left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,9,10,0.85) 0%, rgba(8,9,10,0.4) 45%, transparent 75%)",
        }}
      />

      {/* Figma overlay: dark top + bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,9,10,1) 0%, rgba(8,9,10,0) 55%, rgba(8,9,10,1) 100%)",
        }}
      />

      {/* Ambient glow pulse — bottom vignette breathes very subtly */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,9,10,0.4) 0%, transparent 40%)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content — aligned with Navbar (max-w-[1280px] mx-auto px-10) */}
      <div className="absolute left-0 right-0" style={{ top: 181 }}>
        <div className="max-w-[1280px] mx-auto px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-[420px]"
          >
            {/* Title logo — blur-in */}
            <motion.div className="mb-5" variants={titleVariants}>
              {item.titleImg ? (
                <img
                  src={item.titleImg}
                  alt={item.title}
                  style={{ width: 390, height: 124, objectFit: "contain", objectPosition: "left center" }}
                />
              ) : (
                <>
                  <h1
                    className="font-display font-black text-white leading-none"
                    style={{ fontSize: "clamp(36px, 4.5vw, 58px)", letterSpacing: "-0.04em" }}
                  >
                    {item.title}
                  </h1>
                  {item.subtitle && (
                    <p
                      className="font-display font-medium text-white/60 mt-1"
                      style={{ fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </>
              )}
            </motion.div>

            {/* Social proof — second layer */}
            {item.circleWatchers && item.circleWatchers.length > 0 && (
              <motion.div className="flex items-center gap-2 mb-14" variants={metaVariants}>
                <AvatarStack watchers={item.circleWatchers} size={40} border="white" />
                <div>
                  <p className="font-ui text-[16px] text-white/80 leading-tight">
                    Recomendada por tu círculo
                  </p>
                  <motion.button
                    whileHover="hovered"
                    onClick={() => open(item)}
                    className="relative font-ui text-[14px] font-semibold leading-tight cursor-pointer"
                    style={{ color: "#f1c036" }}
                  >
                    Ver Detalles
                    <motion.span
                      variants={{ hovered: { scaleX: 1 } }}
                      initial={{ scaleX: 0 }}
                      className="absolute bottom-[-2px] left-0 right-0 h-[1.5px] origin-left"
                      style={{ background: "#f1c036" }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* CTA buttons — third layer */}
            <motion.div className="flex items-center gap-3" variants={buttonsVariants}>
              <Link href="/watch">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 h-[53px] px-6 rounded-full font-ui font-semibold text-[16px] text-[#08090a] cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #fdf5bf 0%, #f1bf34 100%)" }}
                >
                  <img src="/icons/Play button.svg" width={16} height={16} alt=""
                    style={{ filter: "brightness(0)" }} />
                  Ver Ahora
                </motion.span>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 h-[53px] px-6 rounded-full font-ui font-semibold text-[16px] text-white cursor-pointer backdrop-blur-sm"
                style={{ background: "rgba(247,248,248,0.18)" }}
              >
                <img src="/icons/Bookmark Icon.svg" width={16} height={16} alt="" />
                Guardar
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-[43px] left-0 right-0 flex justify-center items-center gap-[6px]">
        {items.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative cursor-pointer overflow-hidden"
              style={{
                width: isActive ? 48 : 8,
                height: 8,
                borderRadius: 100,
                background: "rgba(247,248,248,0.25)",
                flexShrink: 0,
                transition: "width 0.3s ease",
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 100,
                    background: "linear-gradient(90deg, #FDF5BF 0%, #F1BF34 100%)",
                    width: `${progress}%`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>

    {/* Scrim tail */}
    <div
      className="relative pointer-events-none"
      style={{
        marginTop: -160,
        height: 200,
        zIndex: 10,
        background:
          "linear-gradient(to bottom, rgba(8,9,10,0) 0%, rgba(8,9,10,0.6) 50%, rgba(8,9,10,1) 100%)",
      }}
    />
    </>
  );
}
