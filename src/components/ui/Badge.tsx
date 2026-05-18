import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "dim";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-[12px] font-ui font-semibold leading-none tracking-wide",
        variant === "default" && "bg-white/10 text-white/70",
        variant === "brand"   && "bg-[#f1c036]/20 text-[#f1c036]",
        variant === "dim"     && "bg-white/5 text-white/40",
        className
      )}
    >
      {children}
    </span>
  );
}
