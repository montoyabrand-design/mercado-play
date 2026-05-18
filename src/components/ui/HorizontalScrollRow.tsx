import { cn } from "@/lib/utils";

interface HorizontalScrollRowProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  gap?: number;
}

export function HorizontalScrollRow({
  children,
  className,
  padded = true,
  gap = 12,
}: HorizontalScrollRowProps) {
  return (
    <div
      className={cn(
        "flex overflow-x-auto scrollbar-hide",
        padded && "px-8 lg:px-10",
        className
      )}
      style={{ gap }}
    >
      {children}
    </div>
  );
}
