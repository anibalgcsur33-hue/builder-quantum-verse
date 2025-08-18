import { motion } from "framer-motion";
import HeroWaveTitle from "@/components/hero/HeroWaveTitle";
import PropertyGrid from "@/components/property/PropertyGrid";
import { VRDemoCTA } from "@/components/modals/DemoModalUsage";
import CrownBadge from "@/components/CrownBadge";
import BlueEyeLogo from "@/components/BlueEyeLogo";
import PremiumHeader from "@/components/header/PremiumHeader";
import NeuralField from "@/components/future/NeuralField";
import QuantumPortalLoader from "@/components/future/QuantumPortalLoader";
import QuantumBackgroundFallback from "@/components/future/QuantumBackgroundFallback";
import CanaryMap3DFallback from "@/components/future/CanaryMap3DFallback";
import HologramCard from "@/components/future/HologramCard";
import SpatialAudioHotspot from "@/components/future/SpatialAudioHotspot";
import ScrollTracker from "@/components/ux/ScrollTracker";
import StickyCTA from "@/components/ux/StickyCTA";

export default function OptimizedHome() {
  return (
    <>
      <QuantumPortalLoader />
      <ScrollTracker />
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Quantum Background - Cinematic */}
        <QuantumBackgroundFallback />

        {/* Neural Field Overlay */}
        <NeuralField
          density={0.00015}
          colorA="#67e8f9"
          colorB="#a78bfa"
          className="opacity-60"
        />

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
            <div className="mt-8">
              <VRDemoCTA />
            </div>
          </section>

          <PropertyGrid />

          {/* Canary Islands 3D Map */}
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
            <CanaryMap3DFallback />
          </section>

          {/* Hologram Property Cards */}
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Propiedades Destacadas</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Experiencias holográficas premium con visualización de vanguardia
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <HologramCard />
              <HologramCard
                title="Skyline Penthouse — Barcelona"
                price="€5.2M"
                image="https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop"
              />
              <HologramCard
                title="Cliffside Estate — Lanzarote"
                price="€9.4M"
                image="https://images.unsplash.com/photo-1505692794403-34d4982fb635?q=80&w=1600&auto=format&fit=crop"
              />
            </div>
          </section>
        </main>
      </div>

      <SpatialAudioHotspot />
      <StickyCTA />
    </>
  );
}
