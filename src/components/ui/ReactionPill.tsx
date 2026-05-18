interface ReactionPillProps {
  emoji: string;
  count: number;
  label: string;
}

export function ReactionPill({ emoji, count, label }: ReactionPillProps) {
  return (
    <button
      className="inline-flex items-center font-ui font-medium shrink-0 cursor-pointer transition-colors duration-150 hover:bg-[#363636]"
      style={{
        background: "#282828",
        borderRadius: 9999,
        padding: "4px 8px",
        fontSize: 12,
        color: "#f7f8f8",
        lineHeight: "1.4",
        gap: 5,
      }}
    >
      {emoji} {count} {label}
    </button>
  );
}
