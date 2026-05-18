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
    </div>
  );
}
