"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTabs } from "@/components/ui/PillTabs";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CIN = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Types ────────────────────────────────────────────────────── */

type FeedMessage = {
  id: string;
  author: string;
  avatarImg: string;
  text: string;
  isOwn?: boolean;
};

type FloatingEmoji = { id: string; emoji: string; x: number };
type Tab = "momentos" | "mensaje";

/* ── Data ─────────────────────────────────────────────────────── */

const QUICK_REACTIONS = [
  { emoji: "🍿", label: "Qué Escena!" },
  { emoji: "🔥", label: "Épico!" },
  { emoji: "🤯", label: "Wow" },
  { emoji: "❤️", label: "Me encanta" },
];

const MOMENTOS = [
  {
    id: "mo1",
    thumbnailSrc: "/img/momento-1.png",
    label: "Qué Escena!",
    emoji: "🍿",
    reactionCount: 12,
    commentCount: 8,
    watchers: ["/img/Avatar 2.png", "/img/Avatar 4.png", "/img/Avatar 1.png"],
    timestamp: "0:38",
    progressPct: 23,
  },
  {
    id: "mo2",
    thumbnailSrc: "/img/momento-2.png",
    label: "Épico!",
    emoji: "🔥",
    reactionCount: 8,
    commentCount: 5,
    watchers: ["/img/Avatar 2.png", "/img/Avatar 4.png"],
    timestamp: "1:02",
    progressPct: 37,
  },
  {
    id: "mo3",
    thumbnailSrc: "/img/momento-3.png",
    label: "Wow",
    emoji: "🤯",
    reactionCount: 21,
    commentCount: 14,
    watchers: ["/img/Avatar 2.png", "/img/Avatar 1.png", "/img/Avatar 3.png"],
    timestamp: "1:31",
    progressPct: 55,
  },
];

const SEED_FEED: FeedMessage[] = [
  { id: "f1", author: "Sofía",   avatarImg: "/img/Avatar 2.png", text: "Denis lo hizo de nuevo 🔥" },
  { id: "f2", author: "Marcos",  avatarImg: "/img/Avatar 4.png", text: "Zendaya en esta escena 😍" },
  { id: "f3", author: "Carla",   avatarImg: "/img/Avatar 1.png", text: "La música es brutal" },
  { id: "f4", author: "Ricardo", avatarImg: "/img/Avatar 3.png", text: "🤯🤯🤯" },
];

const AUTO_MESSAGES: Omit<FeedMessage, "id">[] = [
  { author: "Sofía",   avatarImg: "/img/Avatar 2.png", text: "No puedo con esta escena 😭" },
  { author: "Marcos",  avatarImg: "/img/Avatar 4.png", text: "Lo sabía! El giro lo vi venir 👀" },
  { author: "Carla",   avatarImg: "/img/Avatar 1.png", text: "🔥🔥🔥" },
  { author: "Ricardo", avatarImg: "/img/Avatar 3.png", text: "Qué actuación tan brutal" },
];

/* ── Sub-components ───────────────────────────────────────────── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between shrink-0" style={{ padding: "14px 24px 6px" }}>
      <span className="font-ui font-semibold text-white" style={{ fontSize: 17 }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
          <rect x="0"  y="7" width="3" height="5" rx="1" opacity="0.4" />
          <rect x="5"  y="5" width="3" height="7" rx="1" opacity="0.6" />
          <rect x="10" y="2" width="3" height="10" rx="1" opacity="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.5" fill="white" />
          <path d="M4.5 7.5a4.97 4.97 0 0 1 7 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1.5 4.5a9 9 0 0 1 13 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div className="rounded-[3px] border border-white/60" style={{ width: 24, height: 12, padding: 2 }}>
          <div className="w-full h-full bg-white rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}

function MomentoCard({ m }: { m: typeof MOMENTOS[0] }) {
  return (
    <motion.div
      className="flex gap-3 items-center overflow-hidden rounded-[6px] cursor-pointer w-full"
      style={{ background: "#282828", padding: "4px 12px 4px 4px" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative shrink-0 rounded-[4px] overflow-hidden" style={{ width: 116, height: 116 }}>
        <img
          src={m.thumbnailSrc}
          alt=""
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div
          className="absolute bottom-2 left-2 font-ui font-medium text-white"
          style={{ fontSize: 11, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "2px 6px" }}
        >
          {m.timestamp}
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div>
          <p className="font-display font-bold text-white" style={{ fontSize: 18 }}>{m.label}</p>
          <p className="font-ui font-medium text-[#f7f8f8]/60" style={{ fontSize: 12, lineHeight: 1.4 }}>
            {m.reactionCount} reacciones · {m.commentCount} comentarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {m.watchers.map((src, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-white overflow-hidden bg-[#686868] shrink-0"
                style={{ width: 28, height: 28, marginLeft: i > 0 ? -8 : 0 }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div
            className="font-ui font-medium text-[#f7f8f8]"
            style={{ background: "rgba(247,248,248,0.15)", borderRadius: 999, padding: "4px 10px", fontSize: 13 }}
          >
            {m.emoji} {m.reactionCount}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeedBubble({ msg, isNew }: { msg: FeedMessage; isNew: boolean }) {
  return (
    <motion.div
      className={`flex items-end gap-2 ${msg.isOwn ? "flex-row-reverse" : ""}`}
      initial={isNew ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      {!msg.isOwn && (
        <div className="w-6 h-6 rounded-full overflow-hidden bg-[#686868] shrink-0">
          <img src={msg.avatarImg} alt={msg.author} className="w-full h-full object-cover" />
        </div>
      )}
      <div className={`flex flex-col gap-0.5 ${msg.isOwn ? "items-end" : "items-start"}`}>
        {!msg.isOwn && (
          <span className="font-ui font-medium text-[#767676]" style={{ fontSize: 11 }}>{msg.author}</span>
        )}
        <div
          className="font-ui font-medium"
          style={{
            background: msg.isOwn ? "#f1c036" : "#343434",
            color: msg.isOwn ? "#08090a" : "#f7f8f8",
            borderRadius: msg.isOwn ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            padding: "8px 12px",
            fontSize: 14,
            maxWidth: 240,
            wordBreak: "break-word",
          }}
        >
          {msg.text}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function CompanionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("momentos");
  const [feed, setFeed] = useState<FeedMessage[]>(SEED_FEED);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [messageText, setMessageText] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const autoIdx = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (autoIdx.current >= AUTO_MESSAGES.length) return;
      const msg: FeedMessage = { ...AUTO_MESSAGES[autoIdx.current], id: `auto-${autoIdx.current}` };
      autoIdx.current++;
      setFeed((prev) => [...prev, msg]);
      setNewIds((prev) => new Set([...prev, msg.id]));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feed]);

  const sendReaction = useCallback((emoji: string) => {
    const id = `fe-${Date.now()}-${Math.random()}`;
    const x = 40 + Math.random() * 280;
    setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => setFloatingEmojis((prev) => prev.filter((fe) => fe.id !== id)), 1100);
  }, []);

  const sendMessage = useCallback(() => {
    if (!messageText.trim()) return;
    const msg: FeedMessage = {
      id: `own-m-${Date.now()}`,
      author: "Tú",
      avatarImg: "/img/User Avatar.png",
      text: messageText.trim(),
      isOwn: true,
    };
    setFeed((prev) => [...prev, msg]);
    setNewIds((prev) => new Set([...prev, msg.id]));
    setMessageText("");
    setMessageOpen(false);
  }, [messageText]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#111" }}>
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 390,
          height: 844,
          background: "#08090a",
          borderRadius: 44,
          boxShadow: "0 48px 96px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Backdrop — z-index 0, paints behind content wrapper ── */}
        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{ height: 219, zIndex: 0 }}
        >
          <img
            src="/img/hero-banner.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: 0.55 }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(8,9,10,0.4)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,9,10,0.55) 0%, transparent 38%, transparent 60%, #08090a 100%)",
            }}
          />
        </div>

        {/* ── Content stack — z-index 1, above backdrop ── */}
        <div className="absolute inset-0 flex flex-col" style={{ zIndex: 1 }}>

          <StatusBar />

          {/* Nav bar */}
          <div className="shrink-0" style={{ padding: "2px 20px 10px" }}>
            <p className="font-ui font-medium text-[#f7f8f8]" style={{ fontSize: 14, marginBottom: 6 }}>
              Viendo en TV
            </p>
            <div className="flex items-center justify-between">
              <img
                src="/img/Dune 2.png"
                alt="Dune: Part Two"
                style={{ width: 200, height: "auto", objectFit: "contain", objectPosition: "left center" }}
              />
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center justify-center rounded-full cursor-pointer"
                  style={{ background: "rgba(247,248,248,0.15)", width: 36, height: 36 }}
                >
                  <img src="/icons/share icon.svg" alt="Compartir" width={18} height={18} />
                </button>
                <button
                  className="flex items-center justify-center rounded-full cursor-pointer"
                  style={{ background: "rgba(247,248,248,0.15)", width: 36, height: 36 }}
                >
                  <img src="/icons/ellipsis.svg" alt="Más" width={18} height={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="shrink-0" style={{ padding: "0 20px 12px" }}>
            <div className="relative w-full rounded-full" style={{ height: 4, background: "#343434", marginBottom: 6 }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ width: "37%", background: "linear-gradient(90deg, #fdf5bf 0%, #f1c036 100%)" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{ width: 10, height: 10, left: "calc(37% - 5px)", boxShadow: "0 0 0 3px rgba(241,192,54,0.4)" }}
              />
              {MOMENTOS.map((m) => (
                <div
                  key={m.id}
                  className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 6, height: 6,
                    left: `calc(${m.progressPct}% - 3px)`,
                    background: "#f1c036", opacity: 0.75,
                  }}
                />
              ))}
            </div>
            <p className="font-ui font-medium text-[#f7f8f8]" style={{ fontSize: 12 }}>1:02:34</p>
          </div>

          {/* Tab switcher */}
          <div className="shrink-0" style={{ padding: "0 20px 10px" }}>
            <PillTabs
              fullWidth
              tabs={[
                { value: "momentos" as Tab, label: "Momentos destacados" },
                {
                  value: "mensaje" as Tab,
                  label: (
                    <span className="flex items-center justify-center gap-1.5">
                      <motion.span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ background: "#ef4444" }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      En vivo
                    </span>
                  ),
                },
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Tab content */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === "momentos" ? (
                <motion.div
                  key="momentos"
                  className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3"
                  style={{ padding: "16px 20px", scrollbarWidth: "none" }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                >
                  {MOMENTOS.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.07 }}
                    >
                      <MomentoCard m={m} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="mensaje"
                  className="flex-1 min-h-0 flex flex-col"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                >
                  {/* Feed */}
                  <div
                    ref={feedRef}
                    className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3"
                    style={{ padding: "16px 20px 8px", scrollbarWidth: "none" }}
                  >
                    {feed.map((msg) => (
                      <FeedBubble key={msg.id} msg={msg} isNew={newIds.has(msg.id)} />
                    ))}
                  </div>

                  {/* Quick reactions — inside this tab */}
                  <div
                    className="shrink-0"
                    style={{
                      padding: "10px 20px 6px",
                      borderTop: "1px solid rgba(247,248,248,0.08)",
                    }}
                  >
                    <div className="flex justify-between">
                      {QUICK_REACTIONS.map((r) => (
                        <div key={r.emoji} className="flex flex-col items-center gap-1">
                          <motion.button
                            className="flex items-center justify-center cursor-pointer"
                            style={{
                              background: "rgba(247,248,248,0.12)",
                              backdropFilter: "blur(12px)",
                              borderRadius: 28,
                              width: 56,
                              height: 56,
                            }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 500, damping: 18 }}
                            onClick={() => sendReaction(r.emoji)}
                          >
                            <span style={{ fontSize: 26 }}>{r.emoji}</span>
                          </motion.button>
                          <span className="font-ui font-semibold text-white text-center" style={{ fontSize: 14 }}>
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message input */}
                  <div style={{ padding: "6px 20px 12px" }}>
                    <AnimatePresence mode="wait">
                      {messageOpen ? (
                        <motion.div
                          key="open"
                          className="flex items-center gap-2 rounded-2xl"
                          style={{
                            background: "#343434",
                            border: "1px solid rgba(247,248,248,0.15)",
                            padding: "10px 12px",
                          }}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: EASE_OUT }}
                        >
                          <input
                            autoFocus
                            className="flex-1 bg-transparent font-ui font-medium text-[#f7f8f8] outline-none"
                            style={{ fontSize: 14 }}
                            placeholder="Escribe algo..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          />
                          <motion.button
                            className="flex items-center justify-center rounded-full cursor-pointer shrink-0"
                            style={{
                              width: 32,
                              height: 32,
                              background: messageText.trim() ? "#f1c036" : "rgba(247,248,248,0.12)",
                            }}
                            onClick={sendMessage}
                            whileTap={{ scale: 0.9 }}
                          >
                            <img
                              src="/icons/send-horizontal.svg"
                              alt="Enviar"
                              width={15}
                              height={15}
                              style={{
                                opacity: messageText.trim() ? 1 : 0.4,
                                filter: messageText.trim() ? "invert(1) brightness(0)" : "none",
                              }}
                            />
                          </motion.button>
                          <button
                            className="flex items-center justify-center cursor-pointer shrink-0"
                            style={{ color: "#767676" }}
                            onClick={() => { setMessageOpen(false); setMessageText(""); }}
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <line x1="4" y1="4" x2="14" y2="14" />
                              <line x1="14" y1="4" x2="4" y2="14" />
                            </svg>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="pill"
                          className="w-full flex items-center justify-between rounded-2xl cursor-pointer"
                          style={{
                            background: "#343434",
                            border: "1px solid rgba(247,248,248,0.12)",
                            padding: "13px 16px",
                          }}
                          onClick={() => setMessageOpen(true)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-ui font-medium text-[#767676]" style={{ fontSize: 14 }}>
                            Enviar mensaje al grupo
                          </span>
                          <img src="/icons/send-horizontal.svg" alt="" width={18} height={18} style={{ opacity: 0.4 }} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tab bar */}
          <div
            className="shrink-0 flex items-start justify-between"
            style={{
              height: 72,
              background: "#08090a",
              borderTop: "1px solid rgba(247,248,248,0.1)",
              padding: "0 8px",
            }}
          >
            {[
              { label: "Home",     active: false, iconSrc: "/icons/home.svg" as string | null },
              { label: "Círculos", active: true,  iconSrc: null },
              { label: "Lista",    active: false, iconSrc: "/icons/Tab/Icons/bookmark.svg" as string | null },
              { label: "Perfil",   active: false, iconSrc: "/icons/Tab/Icons/circle-user.svg" as string | null },
            ].map(({ label, active, iconSrc }) => (
              <div
                key={label}
                className="relative flex flex-col items-center justify-center gap-1 pt-2 flex-1"
                style={{
                  background: active
                    ? "radial-gradient(ellipse at 50% 0%, rgba(247,248,248,0.18) 0%, transparent 70%)"
                    : "transparent",
                }}
              >
                {active && (
                  <div
                    className="absolute top-0 left-3 right-3 rounded-b-sm"
                    style={{ height: 2, background: "#f1c036" }}
                  />
                )}
                {iconSrc !== null ? (
                  <img src={iconSrc} alt={label} width={20} height={20} />
                ) : (
                  <CircleIcon active={active} />
                )}
                <span
                  className="font-ui font-medium"
                  style={{ fontSize: 11, color: active ? "white" : "#767676" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center pointer-events-none">
            <div className="rounded-full" style={{ width: 130, height: 5, background: "rgba(247,248,248,0.25)" }} />
          </div>
        </div>

        {/* ── Floating emojis — above all content ── */}
        <AnimatePresence>
          {floatingEmojis.map((fe) => (
            <motion.div
              key={fe.id}
              className="absolute pointer-events-none"
              style={{ left: fe.x, bottom: 180, zIndex: 10 }}
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -120, scale: 1.6 }}
              exit={{}}
              transition={{ duration: 1.0, ease: EASE_CIN }}
            >
              <span style={{ fontSize: 28 }}>{fe.emoji}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Tab bar icons ─────────────────────────────────────────────── */

function CircleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "white" : "#767676"}
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
