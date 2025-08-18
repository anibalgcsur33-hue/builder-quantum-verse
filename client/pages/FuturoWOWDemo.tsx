import FuturoWOW from "../components/future/FuturoWOW";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🌌",
    title: "Background Dinámico 3D",
    description: "Fondo animado con Three.js que reacciona al usuario",
    status: "Implementado"
  },
  {
    icon: "🎧", 
    title: "Spatial Audio",
    description: "Zonas con sonido 3D posicional al mover el cursor",
    status: "Implementado"
  },
  {
    icon: "🧠",
    title: "Neural Nav",
    description: "Navegación inspirada en redes neuronales con conexiones dinámicas",
    status: "Implementado"
  },
  {
    icon: "🔮",
    title: "Quantum Portal Loader", 
    description: "Loader inicial con túnel cuántico animado en 3D",
    status: "Implementado"
  },
  {
    icon: "🌐",
    title: "Realidad Aumentada WebXR",
    description: "Previsualización de propiedades con AR nativo del navegador",
    status: "Implementado"
  }
];

export default function FuturoWOWDemo() {
  return (
    <FuturoWOW showLoader={true} enableAudio={true}>
      <div className="relative z-20 min-h-screen">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <h1 className="heading-xl text-gradient mb-6">
                Fase Futuro WOW
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Experimenta el futuro de la navegación inmobiliaria con tecnologías de vanguardia: 
                3D dinámico, audio espacial, navegación neuronal, y realidad aumentada.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-padding">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="heading-lg text-center mb-12 text-white">
                Tecnologías Implementadas
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 + index * 0.1, duration: 0.6 }}
                    className="glass-card p-6 hover:hover-glow-teal cursor-pointer group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-neon-teal mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-neon-emerald rounded-full animate-pulse"></div>
                      <span className="text-neon-emerald font-medium">{feature.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="section-padding">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <h2 className="heading-lg text-center mb-12 text-white">
                Demo Interactivo
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-neon-teal mb-4">
                      🎧 Audio Espacial
                    </h3>
                    <p className="text-white/80 mb-4">
                      Activa el audio espacial y mueve el cursor por diferentes zonas de la página. 
                      Cada área tiene su propia frecuencia y comportamiento sonoro.
                    </p>
                    <div className="text-sm text-white/60">
                      Usa auriculares para la mejor experiencia 3D
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-neon-emerald mb-4">
                      🧠 Navegación Neural
                    </h3>
                    <p className="text-white/80 mb-4">
                      Observa cómo la navegación superior simula una red neuronal con conexiones 
                      dinámicas que reaccionan a tu interacción.
                    </p>
                    <div className="text-sm text-white/60">
                      Pasa el cursor sobre los nodos para ver las conexiones activarse
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">
                      🥽 Realidad Aumentada
                    </h3>
                    <p className="text-white/80 mb-4">
                      Haz click en el botón AR en la esquina inferior izquierda para previsualizar 
                      propiedades en realidad aumentada.
                    </p>
                    <div className="text-sm text-white/60">
                      Funciona con cámara en dispositivos compatibles
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 text-center">
                  <div className="text-6xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-gradient mb-4">
                    Futuro Inmobiliario
                  </h3>
                  <p className="text-white/80 mb-6">
                    Esta es solo una muestra de las tecnologías que transformarán 
                    la experiencia inmobiliaria digital.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 bg-neon-teal rounded-full"></div>
                      <span>WebXR nativo del navegador</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 bg-neon-emerald rounded-full"></div>
                      <span>Audio espacial en tiempo real</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Renderizado 3D optimizado</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Interfaz neuronal adaptativa</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="section-padding">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="heading-lg mb-8 text-white">
                Detalles Técnicos
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="glass-card p-4">
                  <div className="text-neon-teal font-bold mb-2">Three.js</div>
                  <div className="text-white/70">Renderizado 3D con react-three-fiber</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-neon-emerald font-bold mb-2">Web Audio API</div>
                  <div className="text-white/70">Audio espacial con PannerNode</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-blue-400 font-bold mb-2">WebXR</div>
                  <div className="text-white/70">AR nativo sin dependencias</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-purple-400 font-bold mb-2">Framer Motion</div>
                  <div className="text-white/70">Animaciones fluidas y transiciones</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </FuturoWOW>
  );
}
