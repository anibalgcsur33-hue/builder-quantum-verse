import HeroWaveTitle from "@/components/hero/HeroWaveTitle";
import PropertyGrid from "@/components/property/PropertyGrid";
import { VRDemoCTA } from "@/components/modals/DemoModalUsage";
import CrownBadge from "@/components/CrownBadge";
import PremiumHeader from "@/components/header/PremiumHeader";
import NeuralField from "@/components/future/NeuralField";
import ScrollTracker from "@/components/ux/ScrollTracker";
import StickyCTA from "@/components/ux/StickyCTA";

export default function OptimizedHome() {
  return (
    <>
      <ScrollTracker />
      <div className="min-h-screen bg-gradient-to-b from-blue-dark via-purple-900 to-black relative overflow-x-hidden">
        {/* Neural Field Background - Optimized */}
        <NeuralField
          density={0.00012}
          colorA="#67e8f9"
          colorB="#a78bfa"
          className="opacity-70"
        />

        <PremiumHeader />

        <main>
          <section className="mx-auto max-w-7xl px-6 pt-12">
            <CrownBadge className="mb-6" />
            <HeroWaveTitle
              title="El futuro del real estate de lujo empieza aquí"
              subtitle="Experiencias inmersivas con VR/AR, IA concierge y mercado global verificado."
            />
            <div className="mt-8">
              <VRDemoCTA />
            </div>
          </section>

          <PropertyGrid />
        </main>
      </div>

      <StickyCTA />
    </>
  );
}
