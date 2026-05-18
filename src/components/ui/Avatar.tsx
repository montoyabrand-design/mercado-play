import { cn } from "@/lib/utils";

interface AvatarProps {
  border?: "white" | "subtle";
  size?: number;
  color?: string;
  initials?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export function Avatar({
  border = "subtle",
  size = 40,
  color = "#343434",
  initials,
  src,
  alt = "",
  className,
}: AvatarProps) {
  const borderColor =
    border === "white" ? "rgba(255,255,255,1)" : "rgba(247,248,248,0.3)";

  return (
    <div
      className={cn("rounded-full flex items-center justify-center shrink-0 overflow-hidden", className)}
      style={{
        width: size,
        height: size,
        background: src ? undefined : color,
        boxShadow: `0 0 0 2px ${borderColor}`,
      }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : initials ? (
        <span
          className="font-ui font-semibold text-white leading-none select-none"
          style={{ fontSize: size * 0.35 }}
        >
          {initials}
        </span>
      ) : null}
    </div>
  );
}
