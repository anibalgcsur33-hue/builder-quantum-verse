import { motion } from "framer-motion";
import NeuroConnections from "../components/NeuroConnections";
import AIChatPortal from "../components/AIChatPortal";
import Header from "../components/Header";
import HeroBlueEye from "../components/HeroBlueEye";
import AIConcierge from "../components/AIConcierge";
import CommunityGroups from "../components/CommunityGroups";
import { Link } from "react-router-dom";
import { Home, MapPin, Star, Users, Building, Eye } from "lucide-react";

// Import the new holographic components
import PortalHeroes from "../components/holographic/PortalHeroes";
import ConciergeNarrative from "../components/holographic/ConciergeNarrative";
import PremiumSpainMap from "../components/holographic/PremiumSpainMap";
import RotatingDomeGallery from "../components/holographic/RotatingDomeGallery";
import NFTGamifiedExperience from "../components/holographic/NFTGamifiedExperience";
import VRLoungesVIP from "../components/holographic/VRLoungesVIP";
import DreamBuilderArchitecture from "../components/holographic/DreamBuilderArchitecture";
import DigitalPassportMetaverse from "../components/holographic/DigitalPassportMetaverse";
import QuantumExperienceTokens from "../components/holographic/QuantumExperienceTokens";
import NeuralInterfaceNavigation from "../components/holographic/NeuralInterfaceNavigation";

export default function PremiumHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-dark via-blue-dark/95 to-black relative overflow-x-hidden">
      {/* Neural Background Connections */}
      <NeuroConnections />
      
      {/* Page Header with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        <Header />
      </motion.div>

      {/* Hero Section - Portal Holográfico */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <PortalHeroes />
        </motion.div>
      </section>

      {/* Luxury Hero Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <HeroBlueEye />
        </motion.div>
      </section>

      {/* Concierge Narrativo */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <ConciergeNarrative />
        </motion.div>
      </section>

      {/* Mapa España Premium */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, rotateX: 15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <PremiumSpainMap />
        </motion.div>
      </section>

      {/* Properties Gallery - Domo Rotativo */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <RotatingDomeGallery />
        </motion.div>
      </section>

      {/* Traditional Properties Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="container mx-auto px-4"
        >
          <Properties />
        </motion.div>
      </section>

      {/* NFT Gamified Experience */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          <NFTGamifiedExperience />
        </motion.div>
      </section>

      {/* VR Lounges VIP */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, rotateY: 15 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
        >
          <VRLoungesVIP />
        </motion.div>
      </section>

      {/* Dream Builder Architecture */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
        >
          <DreamBuilderArchitecture />
        </motion.div>
      </section>

      {/* Digital Passport & Metaverse */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.9 }}
        >
          <DigitalPassportMetaverse />
        </motion.div>
      </section>

      {/* Quantum Experience Tokens */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          <QuantumExperienceTokens />
        </motion.div>
      </section>

      {/* Neural Interface Navigation */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, rotateZ: 5 }}
          animate={{ opacity: 1, rotateZ: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <NeuralInterfaceNavigation />
        </motion.div>
      </section>

      {/* AI Concierge Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="container mx-auto px-4"
        >
          <AIConcierge />
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.1 }}
          className="container mx-auto px-4"
        >
          <CommunitySection />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.4 }}
        className="relative z-20"
      >
        <Footer />
      </motion.footer>

      {/* AI Chat Portal - Always available */}
      <AIChatPortal />

      {/* Floating Premium Indicators */}
      <motion.div
        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-30 space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 5 }}
      >
        {[
          { icon: "🌌", label: "Portal" },
          { icon: "🤖", label: "AI" },
          { icon: "🗺️", label: "España" },
          { icon: "🏰", label: "Gallery" },
          { icon: "🎮", label: "NFT" },
          { icon: "🚀", label: "VR" },
          { icon: "🧠", label: "Dream" },
          { icon: "🌐", label: "Passport" },
          { icon: "💎", label: "Tokens" },
          { icon: "⚡", label: "Neural" }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:ring-glow cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-neural z-50 origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />

      {/* Premium Badge */}
      <motion.div
        className="fixed top-4 right-4 z-40 glass px-4 py-2 rounded-full"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-2 text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
          <span className="text-sm font-semibold">Premium Experience</span>
        </div>
      </motion.div>
    </div>
  );
}
