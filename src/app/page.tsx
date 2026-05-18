import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ContinueWatchingSection } from "@/components/sections/ContinueWatchingSection";
import { RecommendedSection } from "@/components/sections/RecommendedSection";
import { SponsoredBanner } from "@/components/sections/SponsoredBanner";
import { TopTenSection } from "@/components/sections/TopTenSection";
import {
  heroItems,
  continueWatchingItems,
  recommendedItems,
  sponsoredItem,
  sponsoredRelatedItems,
  topMovies,
  topSeries,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090a]">
      <Navbar />

      <main>
        <HeroCarousel items={heroItems} />

        {/* 80px gap after hero, 80px between every section — matches Figma Content Container itemSpacing */}
        <div className="flex flex-col" style={{ marginTop: 80, marginBottom: 80, gap: 80 }}>
          <ContinueWatchingSection items={continueWatchingItems} />
          <RecommendedSection items={recommendedItems} />
          <SponsoredBanner item={sponsoredItem} relatedItems={sponsoredRelatedItems} />
          <TopTenSection title="Top 10 Películas" items={topMovies} />
          <TopTenSection title="Top 10 Series" items={topSeries} />
        </div>
      </main>

      <Footer />

      {/* Companion app launcher — prototype testing shortcut */}
      <Link
        href="/companion"
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full font-ui font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "#f1c036",
          color: "#08090a",
          padding: "10px 18px 10px 14px",
          fontSize: 13,
          boxShadow: "0 8px 24px rgba(241,192,54,0.35)",
          zIndex: 50,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
        </svg>
        Companion
      </Link>
    </div>
  );
}
