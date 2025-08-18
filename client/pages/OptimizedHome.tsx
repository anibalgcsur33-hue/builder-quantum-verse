import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import HeroWaveTitle from "@/components/hero/HeroWaveTitle";
import PropertyGrid from "@/components/property/PropertyGrid";
import { VRDemoCTA } from "@/components/modals/DemoModalUsage";
import CrownBadge from "@/components/CrownBadge";
import BlueEyeLogo from "@/components/BlueEyeLogo";
import PremiumHeader from "@/components/header/PremiumHeader";
import NeuralField from "@/components/future/NeuralField";
import QuantumPortalLoader from "@/components/future/QuantumPortalLoader";
import QuantumBackground3D from "@/components/future/QuantumBackground3D";
import CanaryMap3DFallback from "@/components/future/CanaryMap3DFallback";
import HologramCard3DSimple from "@/components/future/HologramCard3DSimple";
import SpatialAudioHotspot from "@/components/future/SpatialAudioHotspot";
import SpatialAudioAdvanced from "@/components/future/SpatialAudioAdvanced";
import NeuralNav from "@/components/future/NeuralNav";
import CursorAurora from "@/components/effects/CursorAurora";
import NeuralShowcase from "@/components/sections/NeuralShowcase";
import ScrollTracker from "@/components/ux/ScrollTracker";
import StickyCTA from "@/components/ux/StickyCTA";
import VRExperienceSection from "@/components/VRExperienceSection";
import PremiumShowcase from "@/components/sections/PremiumShowcase";
import HolographicConcierge from "@/components/sections/HolographicConcierge";
import CommunityStrip from "@/components/sections/CommunityStrip";
import VRPortalTeaser from "@/components/sections/VRPortalTeaser";
import InvestorsCTA from "@/components/sections/InvestorsCTA";
import InvestorStatsAlternate from "@/components/sections/InvestorStatsAlternate";
import SpainMapTeaser from "@/components/sections/SpainMapTeaser";
import LazyVisible from "@/utils/LazyVisible";
import MotionSafe from "@/utils/MotionSafe";
import MuseumCarousel from "@/components/future/MuseumCarousel";
import LiveActivityToasts from "@/components/future/LiveActivityToasts";
import DemoBar from "@/components/future/DemoBar";
import EcosistemaNeuronal from "@/components/sections/EcosistemaNeuronal";
import PrismCTA from "@/components/PrismCTA";
import { Reveal } from "@/components/reveal/ScrollReveal";
// Lazy load the 3D map for better performance
const CanaryMap3D = lazy(() => import("@/components/maps/CanaryMap3D"));
// WMS Map with official GRAFCAN services
import CanaryWMSMapWrapper from "@/components/maps/CanaryWMSMapWrapper";

export default function OptimizedHome() {
  return (
    <>
      <CursorAurora />
      <QuantumPortalLoader />
      <ScrollTracker />
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Quantum Background - 3D Dynamic */}
        <QuantumBackground3D />

        {/* Neural Field Overlay */}
        <MotionSafe>
          <NeuralField
            density={0.00015}
            colorA="#67e8f9"
            colorB="#a78bfa"
            className="opacity-60"
          />
        </MotionSafe>

        <PremiumHeader />

        <main>
          <section className="mx-auto max-w-7xl px-6 pt-12">
            <CrownBadge className="mb-6" />

            {/* Advanced BlueEye Logo with holographic effects */}
            <div className="flex justify-center mb-8">
              <BlueEyeLogo
                src="/assets/BLUEYELOGO.png"
                size={160}
                label=""
                href="/"
                glow={0.95}
                className="transform-gpu"
              />
            </div>

            <HeroWaveTitle
              title="El futuro del real estate de lujo empieza aquí"
              subtitle="Experiencias inmersivas con VR/AR, IA concierge y mercado global verificado."
            />
            <div className="mt-8 flex gap-4 justify-center">
              <VRDemoCTA />
              <PrismCTA />
            </div>

            {/* Demo Bar */}
            <DemoBar />
          </section>

          {/* Neural Navigation */}
          <section className="py-8">
            <NeuralNav />
          </section>

          <PropertyGrid />

          {/* Museum Carousel */}
          <MuseumCarousel />

          {/* Canary Islands 3D Map */}
          <Suspense
            fallback={
              <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    España & Canarias — Mapa Interactivo
                  </h3>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Explora nuestras propiedades premium en las ubicaciones más
                    exclusivas de España y las Islas Canarias
                  </p>
                </div>
                <div className="glass rounded-2xl ring-glow p-4 relative overflow-hidden scanlines h-[520px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white/60">
                      Cargando mapa 3D interactivo...
                    </p>
                  </div>
                </div>
              </section>
            }
          >
            <CanaryMap3D />
          </Suspense>

          {/* Canary Islands WMS Map - Official GRAFCAN */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">España & Canarias — Mapa WMS (texturas reales)</h2>
            <p className="text-white/70 mb-8">Ortofoto oficial GRAFCAN + sombreado de relieve. Perfecto para demos premium con calidad fotográfica real.</p>
            <CanaryWMSMapWrapper />
            <p className="mt-4 text-sm text-white/60">
              Servicios WMS oficiales: <strong>IDECanarias/GRAFCAN</strong> - Ortofoto territorial, modelo de sombras y topográfico integrado.
            </p>
          </section>

          {/* Neural Showcase */}
          <NeuralShowcase />

          {/* Ecosistema Neuronal BlueEye */}
          <EcosistemaNeuronal />

          {/* Spain Map with Animated Routes */}
          <SpainMapTeaser />

          {/* Hologram Property Cards */}
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Propiedades Destacadas
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Experiencias holográficas premium con visualización de
                vanguardia
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <HologramCard3DSimple
                title="Villa Mirador — Tenerife"
                price="��7.9M"
                location="Santa Cruz de Tenerife"
                image="https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=800&auto=compress&cs=tinysrgb&dpr=2"
              />
              <HologramCard3DSimple
                title="Skyline Penthouse — Barcelona"
                price="€5.2M"
                location="Eixample District"
                image="https://images.pexels.com/photos/8572163/pexels-photo-8572163.jpeg?w=800&auto=compress&cs=tinysrgb&dpr=2"
              />
              <HologramCard3DSimple
                title="Cliffside Estate — Lanzarote"
                price="€9.4M"
                location="Puerto del Carmen"
                image="https://images.pexels.com/photos/29874112/pexels-photo-29874112.jpeg?w=800&auto=compress&cs=tinysrgb&dpr=2"
              />
            </div>
          </section>
        </main>
      </div>

      {/* Premium Showcase */}
      <Reveal>
        <PremiumShowcase />
      </Reveal>

      {/* Investor Stats Alternate */}
      <Reveal delay={0.1}>
        <InvestorStatsAlternate />
      </Reveal>

      {/* Holographic Concierge */}
      <HolographicConcierge />

      {/* VR Portal Teaser */}
      <VRPortalTeaser />

      {/* Community Strip */}
      <CommunityStrip />

      {/* VR Experience Section */}
      <Reveal delay={0.15}>
        <VRExperienceSection />
      </Reveal>

      {/* Investors CTA */}
      <InvestorsCTA />

      <SpatialAudioHotspot />
      <SpatialAudioAdvanced />
      <StickyCTA />

      {/* Live Activity Toasts */}
      <LiveActivityToasts />
    </>
  );
}
