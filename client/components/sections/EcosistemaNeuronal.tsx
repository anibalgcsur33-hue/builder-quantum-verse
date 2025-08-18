import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "IA Neuronal",
    description: "Asistente inteligente con procesamiento de voz natural y respuestas contextuales",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Sophisticated AI Neural Shield Icon */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/90 to-blue-600/90 shadow-2xl"></div>

        {/* Top geometric accent */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-80"></div>

        {/* Central neural pattern */}
        <div className="absolute inset-3 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-blue-300/30"></div>

          {/* Neural nodes */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-200 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-2 right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
            <path d="M8,8 Q20,15 32,8 M8,32 Q20,25 32,32 M8,8 L32,32 M32,8 L8,32"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                  fill="none"/>
          </svg>
        </div>

        {/* Outer glow ring */}
        <div className="absolute -inset-2 rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20"></div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent rounded-full"></div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Red Interactiva",
    description: "Campo neuronal que responde al movimiento y conecta toda la experiencia",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Sophisticated Interactive Network Globe */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/90 to-pink-600/90 shadow-2xl"></div>

        {/* Orbital rings */}
        <div className="absolute inset-1 rounded-full border-2 border-purple-300/40 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute inset-2 rounded-full border border-pink-300/60 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>

        {/* Central core */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 shadow-inner">
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-200/50 to-pink-300/50"></div>
        </div>

        {/* Network nodes */}
        <div className="absolute top-1 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse transform -translate-x-1/2"></div>
        <div className="absolute bottom-1 left-1/2 w-2 h-2 bg-purple-200 rounded-full animate-pulse transform -translate-x-1/2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute left-1 top-1/2 w-2 h-2 bg-pink-200 rounded-full animate-pulse transform -translate-y-1/2" style={{animationDelay: '1s'}}></div>
        <div className="absolute right-1 top-1/2 w-2 h-2 bg-white rounded-full animate-pulse transform -translate-y-1/2" style={{animationDelay: '1.5s'}}></div>

        {/* Diagonal nodes */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-purple-100 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-pink-100 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '3.5s'}}></div>

        {/* Pulse effect */}
        <div className="absolute -inset-3 rounded-full border border-purple-400/30 animate-ping"></div>
        <div className="absolute -inset-1 rounded-full border border-pink-400/50"></div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Audio Inmersivo",
    description: "Visualización de voz en tiempo real para interacciones premium",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Sophisticated Audio Waveform Visualizer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/90 to-teal-600/90 shadow-2xl"></div>

        {/* Top frequency display */}
        <div className="absolute top-1 left-2 right-2 h-1">
          <div className="flex gap-0.5 h-full items-end">
            <div className="w-1 bg-emerald-200 rounded-full animate-pulse" style={{height: '60%'}}></div>
            <div className="w-1 bg-teal-200 rounded-full animate-pulse" style={{height: '80%', animationDelay: '0.1s'}}></div>
            <div className="w-1 bg-emerald-300 rounded-full animate-pulse" style={{height: '40%', animationDelay: '0.2s'}}></div>
            <div className="w-1 bg-teal-300 rounded-full animate-pulse" style={{height: '90%', animationDelay: '0.3s'}}></div>
            <div className="w-1 bg-emerald-200 rounded-full animate-pulse" style={{height: '70%', animationDelay: '0.4s'}}></div>
            <div className="w-1 bg-teal-200 rounded-full animate-pulse" style={{height: '50%', animationDelay: '0.5s'}}></div>
          </div>
        </div>

        {/* Central microphone element */}
        <div className="absolute inset-4 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-xl shadow-inner">
          <div className="absolute inset-1 bg-gradient-to-br from-emerald-200/80 to-teal-300/80 rounded-lg">
            {/* Mic grille lines */}
            <div className="absolute inset-2 space-y-0.5">
              <div className="h-0.5 bg-emerald-600/40 rounded-full"></div>
              <div className="h-0.5 bg-teal-600/40 rounded-full"></div>
              <div className="h-0.5 bg-emerald-600/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom frequency display */}
        <div className="absolute bottom-1 left-2 right-2 h-1">
          <div className="flex gap-0.5 h-full items-start">
            <div className="w-1 bg-teal-200 rounded-full animate-pulse" style={{height: '50%', animationDelay: '0.6s'}}></div>
            <div className="w-1 bg-emerald-300 rounded-full animate-pulse" style={{height: '75%', animationDelay: '0.7s'}}></div>
            <div className="w-1 bg-teal-300 rounded-full animate-pulse" style={{height: '35%', animationDelay: '0.8s'}}></div>
            <div className="w-1 bg-emerald-200 rounded-full animate-pulse" style={{height: '85%', animationDelay: '0.9s'}}></div>
            <div className="w-1 bg-teal-200 rounded-full animate-pulse" style={{height: '65%', animationDelay: '1s'}}></div>
            <div className="w-1 bg-emerald-300 rounded-full animate-pulse" style={{height: '45%', animationDelay: '1.1s'}}></div>
          </div>
        </div>

        {/* Sound wave rings */}
        <div className="absolute -inset-2 rounded-2xl border border-emerald-400/40 animate-ping"></div>
        <div className="absolute -inset-4 rounded-2xl border border-teal-400/30 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute -inset-6 rounded-2xl border border-emerald-400/20 animate-ping" style={{animationDelay: '1s'}}></div>

        {/* Corner accent lights */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
    ),
  },
];

export default function EcosistemaNeuronal() {
  return (
    <section className="section relative">
      <div className="container-xl">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ecosistema Neuronal BlueEye
          </h3>
          <p className="text-white/70 max-w-3xl mx-auto">
            Interacción viva entre secciones, con navegación de precisión y respuesta IA
            contextual. Una experiencia inmersiva que conecta propiedades, análisis y decisiones en
            tiempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass-card p-6 text-center h-full relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                {/* Background neural grid */}
                <div className="absolute inset-0 holo-grid opacity-30"></div>
                
                {/* Icon */}
                <div className="mb-6 relative z-10">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Scanlines effect */}
                <div className="absolute inset-0 scanlines opacity-30"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neural connections visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16"
        >
          <div className="relative h-32 glass rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10"></div>
            
            {/* Neural connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 128">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6"/>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
              
              <path 
                d="M100,64 C250,20 350,108 400,64 C450,20 550,108 700,64" 
                stroke="url(#neuralGradient)" 
                strokeWidth="2" 
                fill="none"
                className="path-dash"
              />
              <path 
                d="M100,64 C200,108 300,20 400,64 C500,108 600,20 700,64" 
                stroke="url(#neuralGradient)" 
                strokeWidth="1" 
                fill="none"
                className="path-dash"
                style={{animationDelay: '1s'}}
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/50 text-sm font-medium">
                Red Neural Activa • Conexiones en tiempo real
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
