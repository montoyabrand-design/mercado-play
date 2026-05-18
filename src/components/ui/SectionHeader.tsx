interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
}

export function SectionHeader({ title, showSeeAll = true }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between mb-5 px-8 lg:px-10">
      <h2
        className="font-display font-bold text-white"
        style={{ fontSize: 20, letterSpacing: 0 }}
      >
        {title}
      </h2>
      {showSeeAll && (
        <button className="font-ui text-[13px] font-medium text-[#767676] hover:text-[#f1c036] transition-colors duration-200 cursor-pointer">
          See all →
        </button>
      )}
    </div>
  );
}
