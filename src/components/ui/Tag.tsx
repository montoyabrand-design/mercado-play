interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span
      className="inline-flex items-center font-ui font-medium shrink-0"
      style={{
        background: "#282828",
        borderRadius: 9999,
        padding: "4px 12px",
        fontSize: 12,
        color: "#d9d9d9",
        lineHeight: "1.4",
      }}
    >
      {label}
    </span>
  );
}
