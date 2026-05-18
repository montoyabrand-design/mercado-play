import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("h-[3px] w-full rounded-full bg-white/15 overflow-hidden", className)}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${clamped}%`,
          background: "linear-gradient(90deg, #fdf5bf 0%, #f1bf34 100%)",
        }}
      />
    </div>
  );
}
