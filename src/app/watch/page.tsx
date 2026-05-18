"use client";

import { useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { heroItems } from "@/lib/data";

const item = heroItems[0];

export default function WatchPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-[1280px]">
        <VideoPlayer
          item={item}
          onBack={() => router.push("/")}
          onEnded={() => router.push("/watch/end")}
        />
      </div>

      {/* Dev shortcut — skip to end screen */}
      <button
        onClick={() => router.push("/watch/end")}
        className="mt-4 font-ui text-xs cursor-pointer"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Skip to end screen →
      </button>
    </div>
  );
}
