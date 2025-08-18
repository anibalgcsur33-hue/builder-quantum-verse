import { motion } from "framer-motion";
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

            {/* Animated BlueEye Logo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/30 to-purple-600/20 border border-white/20"
                whileHover={{ scale: 1.1 }}
                style={{ willChange: "transform" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  src="/assets/BLUEYELOGO.png"
                  alt="BlueEye Logo"
                  className="w-32 h-32 object-contain"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

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
