"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  hierarchy?: "primary" | "ghost";
  size?: "large" | "medium";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  hierarchy = "primary",
  size = "large",
  children,
  onClick,
  className,
}: ButtonProps) {
  const isLarge = size === "large";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-ui font-semibold rounded-full transition-all duration-200 cursor-pointer select-none",
        isLarge
          ? "h-[42px] px-4 py-3 text-[14px]"
          : "h-[32px] px-3 py-2 text-[13px]",
        hierarchy === "primary" && [
          "text-[#08090a]",
          "ring-1 ring-transparent hover:ring-[#f1c036] hover:ring-inset",
        ],
        hierarchy === "ghost" && [
          "text-white bg-white/30 backdrop-blur-sm",
          "ring-1 ring-transparent hover:ring-white/50 hover:ring-inset",
        ],
        className
      )}
      style={
        hierarchy === "primary"
          ? { background: "linear-gradient(135deg, #fdf5bf 0%, #f1bf34 100%)" }
          : {}
      }
    >
      {children}
    </motion.button>
  );
}
