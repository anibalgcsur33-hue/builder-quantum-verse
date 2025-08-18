import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, MapPin, Users, Sparkles } from "lucide-react";

export default function MinimalHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-dark to-black relative">
      {/* Minimal Header */}
      <header className="relative z-20 p-6">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="text-2xl font-bold text-white">
            BlueEye <span className="text-neon-teal">Homes</span>
          </div>
          <Link
            to="/"
            className="btn-crystal flex items-center gap-2 hover:ring-glow transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Premium Experience
          </Link>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="heading-xl text-gradient mb-6">
            Propiedades Premium
            <br />
            en España
          </h1>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Descubre mansiones exclusivas, apartamentos de lujo y propiedades
            únicas en las mejores ubicaciones de España.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary inline-flex items-center gap-3">
              <Home className="w-5 h-5" />
              Ver Propiedades
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary inline-flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              Explorar Zonas
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            { number: "500+", label: "Propiedades Premium", icon: Home },
            { number: "50+", label: "Ciudades en España", icon: MapPin },
            { number: "10K+", label: "Clientes Satisfechos", icon: Users },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card p-8 text-center hover:neon-glow-teal transition-all duration-300"
            >
              <stat.icon className="w-12 h-12 text-neon-teal mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Destinos Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: "Madrid", properties: "120+", image: "🏙️" },
              { city: "Barcelona", properties: "95+", image: "🏛️" },
              { city: "Valencia", properties: "78+", image: "🌊" },
              { city: "Marbella", properties: "65+", image: "🏖️" },
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="glass-card p-6 text-center hover:hover-glow-teal cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {location.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {location.city}
                </h3>
                <p className="text-neon-teal font-semibold">
                  {location.properties} propiedades
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para encontrar tu hogar perfecto?
            </h3>
            <p className="text-white/80 mb-8">
              Nuestro equipo de expertos está aquí para ayudarte a encontrar la
              propiedad ideal que se adapte a tu estilo de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Contactar Asesor</button>
              <Link to="/" className="btn-secondary">
                Experiencia Premium
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">
            BlueEye <span className="text-neon-teal">Homes</span>
          </div>
          <p className="text-white/60 mb-6">
            Tu portal de propiedades premium en España
          </p>
          <div className="flex justify-center gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-neon-teal transition-colors">
              Propiedades
            </a>
            <a href="#" className="hover:text-neon-teal transition-colors">
              Servicios
            </a>
            <a href="#" className="hover:text-neon-teal transition-colors">
              Contacto
            </a>
            <a href="#" className="hover:text-neon-teal transition-colors">
              Blog
            </a>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Subtle floating elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-teal/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Simple Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
        {["Inicio", "Estadísticas", "Destinos", "Contacto"].map(
          (section, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-neon-teal cursor-pointer transition-colors"
              whileHover={{ scale: 1.5 }}
              title={section}
            />
          ),
        )}
      </div>
    </div>
  );
}
