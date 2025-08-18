import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, MapPin, Star, Users, Building, Home, Sparkles } from "lucide-react";
import PremiumHeader from "../components/header/PremiumHeader";
import NeuralField from "../components/future/NeuralField";
import AIConcierge from "../components/future/AIConcierge";
import VoiceMeter from "../components/future/VoiceMeter";
import ScrollTracker from "../components/ux/ScrollTracker";
import StickyCTA from "../components/ux/StickyCTA";

export default function PremiumHome() {
  return (
    <>
      <ScrollTracker />
      <div className="min-h-screen bg-gradient-to-b from-blue-dark via-purple-900 to-black relative overflow-x-hidden">
      {/* Neural Field Background */}
      <NeuralField
        density={0.00015}
        colorA="#67e8f9"
        colorB="#a78bfa"
        className="opacity-80"
      />

      {/* Premium Header */}
      <PremiumHeader />

      {/* Portal Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center z-10"
        >
          {/* Holographic Ring */}
          <motion.div
            className="relative w-64 h-64 mx-auto mb-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30"></div>
            <div className="absolute inset-4 rounded-full border-2 border-purple-400/50"></div>
            <div className="absolute inset-8 rounded-full border border-pink-400/70"></div>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
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

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            El futuro del real estate de lujo empieza aquí
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Experiencias inmersivas, inversión inteligente y acceso a un metaverso inmobiliario real
            con VR, AR y Concierge IA.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={() => {
                // Activar VU Meter automáticamente
                const vuMeterButton = document.querySelector('[title="Activar visualizador de voz"]') as HTMLButtonElement;
                if (vuMeterButton) vuMeterButton.click();
              }}
              className="px-6 py-3 bg-slate-800/80 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-slate-700/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎙️ Activar VU Meter
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-cyan-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-cyan-400/30 hover:bg-cyan-500/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📺 Ver demo VR
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-yellow-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-yellow-400/30 hover:bg-yellow-500/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚡ Demo rápida
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-orange-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-orange-400/30 hover:bg-orange-500/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏠 Ver propiedades
            </motion.button>
          </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Villa Atlántica — Tenerife",
                price: "€12.8M",
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                location: "Santa Cruz"
              },
              {
                title: "Penthouse SkyLine — Barcelona",
                price: "€5.4M",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                location: "Eixample"
              },
              {
                title: "Cliff Mansion — Ibiza",
                price: "€22.0M",
                image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                location: "Es Vedra"
              },
              {
                title: "Golden Mile Estate — Marbella",
                price: "€7.9M",
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                location: "Puerto Banús"
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 cursor-pointer group transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                    {property.location}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-2 leading-tight">{property.title}</h3>
                  <p className="text-cyan-400 font-bold text-lg mb-4">{property.price}</p>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs py-2 px-3 rounded-lg transition-colors">
                      Ver en VR
                    </button>
                    <button className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs py-2 px-3 rounded-lg transition-colors">
                      Dossier IA
                    </button>
                  </div>
                </div>
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

      {/* Neural Ecosystem Section */}
      <section className="relative py-20">
        <NeuralField
          density={0.00015}
          colorA="#67e8f9"
          colorB="#a78bfa"
          className="opacity-70"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="relative mx-auto max-w-6xl px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ecosistema <span className="text-gradient">Neural BlueEye</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              Interacción viva entre secciones, con navegación de precisión y respuesta IA contextual.
              <br />
              Tecnología del futuro implementada hoy para revolucionar el sector inmobiliario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
                🧠
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Campo Neuronal</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Canvas 2D ultra-optimizado que responde a tu movimiento.
                Nodos inteligentes que crean conexiones dinámicas en tiempo real.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-2xl">
                🎙️
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Voz & IA</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                TTS/STT nativo español + WebAudio API.
                Conversaciones naturales con inteligencia inmobiliaria especializada.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center text-2xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Analytics Live</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Visualización de voz en tiempo real.
                VU meter premium con colores adaptativos y análisis de frecuencia.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-black/40 to-blue-900/40 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/80 font-medium">Sistema Neural Activo</span>
              </div>
              <div className="text-white/40">•</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">WebAPI Nativo</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">60 FPS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent("blueeye:assistant"))}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <span>Activar Concierge IA</span>
                </div>
              </motion.button>

              <motion.div
                className="text-white/50 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <span>👈</span>
                  <span>VU Meter disponible abajo-izquierda</span>
                </div>
              </motion.div>
            </div>

            <div className="text-xs text-white/40 max-w-2xl mx-auto">
              <strong>Tecnologías implementadas:</strong> Canvas 2D • SpeechSynthesis API • SpeechRecognition API • WebAudio API • MediaDevices API • RequestAnimationFrame
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20">
        <NeuralField
          density={0.0001}
          colorA="#10b981"
          colorB="#3b82f6"
          className="opacity-60"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-5xl font-bold text-center text-white mb-16">
            Experiencias <span className="text-cyan-400">Revolucionarias</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🌌", title: "Portal Holográfico", desc: "Entrada dimensional al metaverso inmobiliario" },
              { icon: "🤖", title: "IA Concierge", desc: "Asistente premium con voz natural TTS/STT" },
              { icon: "🗺️", title: "España 3D Vivo", desc: "Mapa interactivo con animaciones en tiempo real" },
              { icon: "🏰", title: "Galería Flotante", desc: "Propiedades como obras de arte suspendidas" },
              { icon: "🎙️", title: "Voice Analytics", desc: "Visualizador de voz en tiempo real con WebAudio" },
              { icon: "🚀", title: "VR Lounges", desc: "Networking premium en espacios virtuales exclusivos" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="text-5xl mb-6 text-center"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-white/70 text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
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

      {/* AI Concierge with Voice */}
      <AIConcierge />

      {/* Voice Visualizer (optional for demos) */}
      <VoiceMeter />

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

      <StickyCTA />
    </>
  );
}
