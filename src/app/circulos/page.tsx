"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { PillTabs } from "@/components/ui/PillTabs";
import { recommendedItems } from "@/lib/data";
import { ContentItem } from "@/types";

/* ── Constants ────────────────────────────────────────────────── */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CIN = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Data ─────────────────────────────────────────────────────── */

const MEMBERS = [
  { name: "Sofia Martinez", role: "Admin", avatarImg: "/img/Avatar 2.png", avatarColor: "#686868" },
  { name: "Tú",             avatarImg: "/img/User Avatar.png",             avatarColor: "#767676" },
  { name: "Marcos Ruíz",   avatarImg: "/img/Avatar 4.png",                avatarColor: "#686868" },
  { name: "Carla Luna",    avatarImg: "/img/Avatar 1.png",                 avatarColor: "#686868" },
  { name: "Ricardo Perez", avatarImg: "/img/Avatar 3.png",                 avatarColor: "#686868" },
  { name: "Rafael Rossi",  avatarImg: "/img/Avatar 2.png",                 avatarColor: "#686868" },
];

const SEEN_IDS = new Set(["r2", "r3", "r5", "r8", "r10"]);

type Filter = "Todo" | "Películas" | "Series";
const FILTERS: Filter[] = ["Todo", "Películas", "Series"];

/* ── Sub-components ───────────────────────────────────────────── */

function MembersPanel() {
  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: 16, paddingLeft: 24, paddingBottom: 24 }}>
      <motion.h2
        className="font-display font-semibold text-white"
        style={{ fontSize: 24, letterSpacing: "-0.02em" }}
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.25 }}
      >
        Miembros
      </motion.h2>
      <div className="flex flex-col gap-4">
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.32 + i * 0.07 }}
          >
            <div
              className="shrink-0 rounded-full overflow-hidden border-2 border-white"
              style={{ width: 64, height: 64, background: m.avatarColor }}
            >
              <img src={m.avatarImg} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-ui font-semibold text-[#f7f8f8]" style={{ fontSize: 16 }}>
                {m.name}
              </p>
              {m.role && (
                <p className="font-ui font-medium text-[#767676]" style={{ fontSize: 14 }}>
                  {m.role}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CirculosCard({ item, seen, onClick, index }: { item: ContentItem; seen?: boolean; onClick: () => void; index: number }) {
  const watchers = item.circleWatchers ?? [];
  const reactions = item.reactions ?? [];

  return (
    <motion.div
      className="group shrink-0 cursor-pointer"
      style={{ width: 288 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.15 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative rounded-[4px] overflow-hidden" style={{ width: 288, height: 376 }}>
        {item.posterImg ? (
          <img src={item.posterImg} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: item.posterCss }} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Bottom gradient scrim — on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "linear-gradient(to top, rgba(8,9,10,0.9) 0%, transparent 42%)" }}
        />

        {/* Play icon — on hover */}
        <div
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ left: 8, bottom: reactions.length ? 88 : 8 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="6,3 6,21 21,12" fill="white" />
          </svg>
        </div>

        {/* Reaction pills + watcher row — on hover */}
        {(reactions.length > 0 || watchers.length > 0) && (
          <div
            className="absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ left: 8, right: 8, bottom: 8 }}
          >
            {reactions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {reactions.slice(0, 4).map((r) => (
                  <span
                    key={r.emoji}
                    className="font-ui font-medium"
                    style={{
                      background: "#282828",
                      borderRadius: 9999,
                      padding: "4px 8px",
                      fontSize: 12,
                      color: "#f7f8f8",
                    }}
                  >
                    {r.emoji} {r.count}
                  </span>
                ))}
              </div>
            )}
            {watchers.length > 0 && (
              <div className="flex items-center gap-2">
                <AvatarStack watchers={watchers} size={40} border="subtle" />
                <p className="font-ui font-semibold text-[#f7f8f8]" style={{ fontSize: 14 }}>
                  {watchers.length} {watchers.length === 1 ? "la está viendo" : "la están viendo"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Yellow border on hover */}
        <div
          className="absolute inset-0 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ border: "2px solid #f1c036" }}
        />

        {/* "Ya la viste" tag */}
        {seen && (
          <div
            className="absolute flex items-center font-ui font-semibold"
            style={{
              left: 0,
              top: 0,
              background: "#f1c036",
              borderRadius: "0 0 4px 0",
              padding: "4px 8px",
              fontSize: 14,
              color: "#08090a",
            }}
          >
            Ya la viste
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function CirculosPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("Todo");

  const allCards = recommendedItems;
  const filteredCards = filter === "Todo"
    ? allCards
    : allCards.filter((item) =>
        filter === "Series"
          ? item.genres.some((g) => g.toLowerCase().includes("serie"))
          : !item.genres.some((g) => g.toLowerCase().includes("serie"))
      );

  const handleWatch = () => router.push("/watch");

  return (
    <div className="bg-[#08090a] min-h-screen">
      <Navbar />

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden" style={{ height: 420 }}>
        <img
          src="/img/circulos-banner.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.3 }}
        />
        {/* Vertical gradient — dark top + bottom, transparent middle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #08090a 0%, transparent 26%, transparent 60%, #08090a 82%)",
          }}
        />
        {/* Circle name */}
        <div className="absolute inset-0 flex items-end justify-center" style={{ paddingBottom: 64 }}>
          <motion.h1
            className="font-display font-bold text-white text-center"
            style={{ fontSize: 56, letterSpacing: "-0.04em" }}
            initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE_CIN, delay: 0.1 }}
          >
            Cine Club de la Facu
          </motion.h1>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 40px 80px" }}>
        <div className="flex items-start" style={{ gap: 8 }}>

          {/* ── Left panel — sticky ── */}
          <div className="shrink-0 self-start sticky" style={{ width: 288, top: 64 }}>
            <MembersPanel />
          </div>

          {/* ── Right content area ── */}
          <div className="flex-1 min-w-0">

            {/* Sticky recommendations header */}
            <motion.div
              className="sticky z-10 flex items-center justify-between"
              style={{
                top: 64,
                background: "#08090a",
                borderBottom: "4px solid #08090a",
                paddingTop: 16,
                paddingBottom: 12,
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
            >
              <p
                className="font-display font-semibold text-white"
                style={{ fontSize: 24, letterSpacing: "-0.02em" }}
              >
                Recomendaciones
              </p>

              <div className="flex items-center gap-4">
                {/* Filter pill group */}
                <PillTabs
                  tabs={FILTERS.map((f) => ({ value: f, label: f }))}
                  active={filter}
                  onChange={setFilter}
                />

                {/* Ellipsis button */}
                <button
                  className="flex items-center justify-center cursor-pointer rounded-full"
                  style={{ background: "#343434", padding: 8 }}
                >
                  <img src="/icons/ellipsis.svg" alt="Más opciones" width={24} height={24} />
                </button>
              </div>
            </motion.div>

            {/* Card grid */}
            <div
              className="grid pt-6"
              style={{ gridTemplateColumns: "repeat(3, 288px)", gap: "32px 20px" }}
            >
              {filteredCards.map((item, i) => (
                <CirculosCard
                  key={item.id}
                  item={item}
                  seen={SEEN_IDS.has(item.id)}
                  onClick={handleWatch}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
