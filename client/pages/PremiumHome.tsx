import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, MapPin, Star, Users, Building, Home } from "lucide-react";
import Header from "../components/Header";
import HeroBlueEye from "../components/HeroBlueEye";
import AIConcierge from "../components/AIConcierge";
import AIChatPortal from "../components/AIChatPortal";
import CommunityGroups from "../components/CommunityGroups";

export default function PremiumHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-dark via-blue-dark/95 to-black relative overflow-x-hidden">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        <Header />
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <HeroBlueEye />
        </motion.div>
      </section>

      {/* Welcome Message */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Bienvenido al Portal <span className="text-cyan-400">BlueEyes</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            La experiencia inmobiliaria metaversal más avanzada de España. 
            Descubre propiedades de lujo con tecnología de vanguardia.
          </p>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-8"
          >
            ✨
          </motion.div>
        </motion.div>
      </section>

      {/* Properties Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Propiedades Premium</h2>
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
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 cursor-pointer group transition-all duration-300"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {property.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                <p className="text-white/70 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </p>
                <p className="text-cyan-400 font-bold text-lg">{property.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/propiedades" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl"
              >
                <Eye className="w-5 h-5" />
                Ver Todas las Propiedades
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Concierge Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
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
          transition={{ duration: 0.8, delay: 3 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Comunidad BlueEye</h2>
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
        transition={{ duration: 0.8, delay: 3.5 }}
        className="relative z-20 py-12 border-t border-white/10 bg-blue-dark/50"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="text-3xl font-bold text-white mb-4">
            BlueEye <span className="text-cyan-400">Homes</span>
          </div>
          <p className="text-white/60 mb-8">
            Tu portal premium al metaverso inmobiliario de España
          </p>
          <div className="flex justify-center gap-8 text-sm text-white/60">
            <Link to="/propiedades" className="hover:text-cyan-400 transition-colors">Propiedades</Link>
            <Link to="/comunidad" className="hover:text-cyan-400 transition-colors">Comunidad</Link>
            <Link to="/marketplace" className="hover:text-cyan-400 transition-colors">Marketplace</Link>
            <Link to="/contacto" className="hover:text-cyan-400 transition-colors">Contacto</Link>
          </div>
          <div className="mt-8 text-xs text-white/40">
            © 2024 BlueEye Homes. Experiencia metaverso inmobiliaria premium.
          </div>
        </div>
      </motion.footer>

      {/* AI Chat Portal - Always available */}
      <AIChatPortal />

      {/* Premium Badge */}
      <motion.div
        className="fixed top-4 right-4 z-40 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
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
