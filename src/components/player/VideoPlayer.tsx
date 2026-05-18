"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentItem } from "@/types";
import { FloatingComments } from "./FloatingComments";

const VIDEO_SRC = "/video/YTDown_YouTube_Paul-Muad-Dib-Atreides-Epic-Speech-Dune-_Media_jepd7EVK-wA_001_1080p.mp4";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const IDLE_MS = 3000;

function fmt(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
    : `${m}:${String(ss).padStart(2, "0")}`;
}

interface VideoPlayerProps {
  item: ContentItem;
  onBack?: () => void;
  onEnded?: () => void;
}

export function VideoPlayer({ item, onBack, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(false);
  const [current, setCurrent]   = useState(0);
  const [duration, setDuration] = useState(0);
  const [controls, setControls] = useState(true);

  /* Show controls, reset idle timer */
  const wakeControls = useCallback(() => {
    setControls(true);
    clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControls(false);
    }, IDLE_MS);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onPlay  = () => { setPlaying(true); };
    const onPause = () => { setPlaying(false); setControls(true); clearTimeout(idleRef.current); };
    const onEnd   = () => { onEnded?.(); };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnd);
      clearTimeout(idleRef.current);
    };
  }, []);

const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play().catch(() => {});
  };

  const seek = (delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(duration, v.currentTime + delta));
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) wrapRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full bg-black overflow-hidden group"
      style={{ aspectRatio: "16/9" }}
      onMouseMove={wakeControls}
      onMouseLeave={() => {
        if (playing) {
          clearTimeout(idleRef.current);
          idleRef.current = setTimeout(() => setControls(false), 1000);
        }
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onClick={togglePlay}
        style={{ cursor: controls ? "default" : "none" }}
      />

      {/* Ambient vignette — always on, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 20%, transparent 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Floating comments — top right, always visible, subtle */}
      <FloatingComments comments={item.comments ?? []} playing={playing} />

{/* ── Controls overlay ── */}
      <AnimatePresence>
        {controls && (
          <>
            {/* Top bar */}
            <motion.div
              key="top"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="absolute top-0 left-0 right-0 flex items-center justify-between pointer-events-auto"
              style={{ padding: "20px 24px" }}
            >
              {/* Left: back + logo + title */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  style={{ opacity: 0.9 }}
                >
                  <img src="/icons/Back button.svg" width={24} height={24} alt="Volver" />
                </motion.button>
                <img src="/img/logo-meli-play.svg" alt="Meli Play" style={{ height: 28 }} />
                <span
                  className="font-display font-bold text-white"
                  style={{ fontSize: 18, letterSpacing: "-0.02em" }}
                >
                  {item.title}{item.subtitle ? ` ${item.subtitle}` : ""}
                </span>
              </div>

            </motion.div>

            {/* Bottom controls */}
            <motion.div
              key="bottom"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="absolute bottom-0 left-0 right-0 pointer-events-auto"
              style={{ padding: "48px 24px 24px" }}
            >
              {/* Progress section */}
              <div className="mb-4">
                <p className="font-ui mb-2" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {fmt(current)}
                </p>

                {/* Scrubber */}
                <div
                  className="relative w-full rounded-full cursor-pointer"
                  style={{ height: 4, background: "rgba(255,255,255,0.2)" }}
                  onClick={handleSeekClick}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #fdf5bf 0%, #f1bf34 100%)",
                    }}
                    layoutId="scrubber"
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow"
                    style={{ left: `calc(${progress}% - 6px)` }}
                  />
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                {/* Left: play controls */}
                <div className="flex items-center" style={{ gap: 16 }}>
                  <IconBtn onClick={() => seek(-10)} label="Retroceder">
                    <img src="/icons/Rewind button.svg" width={24} height={24} alt="" />
                  </IconBtn>

                  <IconBtn onClick={togglePlay} label={playing ? "Pausar" : "Reproducir"} large>
                    {playing ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <img src="/icons/Play button.svg" width={28} height={28} alt="" />
                    )}
                  </IconBtn>

                  <IconBtn onClick={() => seek(10)} label="Avanzar">
                    <img src="/icons/Forward button.svg" width={24} height={24} alt="" />
                  </IconBtn>

                  <IconBtn onClick={toggleMute} label={muted ? "Activar sonido" : "Silenciar"}>
                    <img src="/icons/Volume button.svg" width={24} height={24} alt=""
                      style={{ opacity: muted ? 0.4 : 1 }} />
                  </IconBtn>
                </div>

                {/* Right: secondary */}
                <div className="flex items-center" style={{ gap: 16 }}>
                  <IconBtn onClick={() => {}} label="Subtítulos">
                    <img src="/icons/Captions button.svg" width={24} height={24} alt="" />
                  </IconBtn>
                  <IconBtn onClick={toggleFullscreen} label="Pantalla completa">
                    <img src="/icons/Fullscreen button.svg" width={24} height={24} alt="" />
                  </IconBtn>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconBtn({
  onClick,
  label,
  large,
  children,
}: {
  onClick: () => void;
  label: string;
  large?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: large ? 1.12 : 1.15, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      className="cursor-pointer"
      style={{ opacity: 0.85, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {children}
    </motion.button>
  );
}
