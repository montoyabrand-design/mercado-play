import { Avatar } from "./Avatar";
import { CircleWatcher } from "@/types";

interface AvatarStackProps {
  watchers: CircleWatcher[];
  size?: number;
  border?: "white" | "subtle";
}

export function AvatarStack({ watchers, size = 40, border = "white" }: AvatarStackProps) {
  const visible = watchers.slice(0, 4);

  return (
    <div className="flex items-center" style={{ gap: -8 }}>
      {visible.map((w, i) => (
        <div key={w.id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: visible.length - i }}>
          <Avatar
            border={border}
            size={size}
            color={w.avatarColor}
            initials={w.initials}
            src={w.avatarImg}
            alt={w.name}
          />
        </div>
      ))}
    </div>
  );
}
