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
import CinematicDroneFinale from "../components/CinematicDroneFinale";
import QuantumPropertyStates from "../components/QuantumPropertyStates";
import SynestheticPropertyExperience from "../components/SynestheticPropertyExperience";

export default function PremiumHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-dark via-blue-dark/95 to-black relative overflow-x-hidden">
      {/* Neural Background Connections */}
      {/* <NeuroConnections /> */}

      {/* Page Header with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 p-8"
      >
        <h1 className="text-white text-4xl font-bold text-center">BlueEyes Portal - Testing</h1>
      </motion.div>

      {/* Hero Section - Portal Holográfico */}
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <PortalHeroes />
        </motion.div>
      </section> */}

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
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <ConciergeNarrative />
        </motion.div>
      </section> */}

      {/* Mapa España Premium */}
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, rotateX: 15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <PremiumSpainMap />
        </motion.div>
      </section> */}

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

      {/* Properties Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">Propiedades Premium</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubre nuestra exclusiva selección de propiedades de lujo en España
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Villa Marbella", price: "€2.5M", location: "Costa del Sol", image: "🏖️" },
              { title: "Penthouse Madrid", price: "€1.8M", location: "Salamanca", image: "🏙️" },
              { title: "Casa Barcelona", price: "€3.2M", location: "Eixample", image: "🏛️" }
            ].map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                className="glass-card p-6 hover:hover-glow-teal cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {property.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                <p className="text-white/70 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </p>
                <p className="text-neon-teal font-bold text-lg">{property.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/propiedades" className="btn-primary inline-flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Ver Todas las Propiedades
            </Link>
          </div>
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

      {/* Quantum Property States */}
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.8 }}
        >
          <QuantumPropertyStates />
        </motion.div>
      </section> */}

      {/* Synesthetic Property Experience */}
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.1 }}
        >
          <SynestheticPropertyExperience />
        </motion.div>
      </section> */}

      {/* Cinematic Drone Finale */}
      {/* <section className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4.4 }}
        >
          <CinematicDroneFinale />
        </motion.div>
      </section> */}

      {/* AI Concierge Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 4.7 }}
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
          transition={{ duration: 0.8, delay: 5.0 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">Comunidad BlueEye</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Únete a nuestra exclusiva comunidad de propietarios de lujo
            </p>
          </div>
          <CommunityGroups />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 5.3 }}
        className="relative z-20 py-12 border-t border-white/10 bg-blue-dark/50"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="text-3xl font-bold text-white mb-4">
            BlueEye <span className="text-neon-teal">Homes</span>
          </div>
          <p className="text-white/60 mb-8">
            Tu portal premium al metaverso inmobiliario de España
          </p>
          <div className="flex justify-center gap-8 text-sm text-white/60">
            <Link to="/propiedades" className="hover:text-neon-teal transition-colors">Propiedades</Link>
            <Link to="/comunidad" className="hover:text-neon-teal transition-colors">Comunidad</Link>
            <Link to="/marketplace" className="hover:text-neon-teal transition-colors">Marketplace</Link>
            <Link to="/contacto" className="hover:text-neon-teal transition-colors">Contacto</Link>
          </div>
          <div className="mt-8 text-xs text-white/40">
            © 2024 BlueEye Homes. Experiencia metaverso inmobiliaria premium.
          </div>
        </div>
      </motion.footer>

      {/* AI Chat Portal - Always available */}
      <AIChatPortal />

      {/* Floating Premium Indicators */}
      <motion.div
        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-30 space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 6 }}
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
          { icon: "⚡", label: "Neural" },
          { icon: "🔮", label: "Quantum" },
          { icon: "🌈", label: "Synesthetic" },
          { icon: "🎬", label: "Cinematic" }
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
        transition={{ duration: 15, ease: "easeOut" }}
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
