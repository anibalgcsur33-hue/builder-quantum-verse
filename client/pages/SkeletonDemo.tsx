import LuxuryHero from "../components/LuxuryHero";
import PropertyMarqueeSimple from "../components/property/PropertyMarqueeSimple";
import InvestorStatsSimple from "../components/InvestorStatsSimple";

export default function SkeletonDemo() {
  return (
    <div className="bg-[#0a0a12] text-white min-h-screen font-sans">
      <LuxuryHero />
      <PropertyMarqueeSimple />
      <InvestorStatsSimple />
    </div>
  );
}
