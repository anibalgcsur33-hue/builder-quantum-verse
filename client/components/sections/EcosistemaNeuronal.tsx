import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "IA Neuronal",
    description: "Asistente inteligente con procesamiento de voz natural y respuestas contextuales",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Brain/Neural icon with holographic effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30"></div>
        <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11V16L21 15.5V14H19V12H21V10.5C19.9 10.5 18.7 10.7 17.6 11.1C16.8 11.4 16 11.7 15.3 12.1C15.1 12.2 15 12.4 15 12.6V16.5C15 17.3 15.7 18 16.5 18S18 17.3 18 16.5V15.5L21 15.5V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V15.5L6 15.5V16.5C6 17.3 6.7 18 7.5 18S9 17.3 9 16.5V12.6C9 12.4 8.9 12.2 8.7 12.1C8 11.7 7.2 11.4 6.4 11.1C5.3 10.7 4.1 10.5 3 10.5V12H5V14H3V15.5L9 16V11L3 7.5V9"/>
          </svg>
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400/30 to-blue-600/30 blur-sm -z-10"></div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Red Interactiva",
    description: "Campo neuronal que responde al movimiento y conecta toda la experiencia",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Network/Interactive icon */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-600/20 border border-purple-400/30"></div>
        <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,5.9A2.1,2.1 0 0,1 17.1,8A2.1,2.1 0 0,1 15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9M4,7V10H1V12H4V15H6V12H9V10H6V7H4M18.5,17.5C18.5,19.71 16.71,21.5 14.5,21.5C12.29,21.5 10.5,19.71 10.5,17.5C10.5,15.29 12.29,13.5 14.5,13.5C16.71,13.5 18.5,15.29 18.5,17.5M14.5,19.5A2,2 0 0,0 16.5,17.5A2,2 0 0,0 14.5,15.5A2,2 0 0,0 12.5,17.5A2,2 0 0,0 14.5,19.5M8.5,12A2.5,2.5 0 0,0 6,14.5A2.5,2.5 0 0,0 8.5,17A2.5,2.5 0 0,0 11,14.5A2.5,2.5 0 0,0 8.5,12M8.5,15A0.5,0.5 0 0,1 8,14.5A0.5,0.5 0 0,1 8.5,14A0.5,0.5 0 0,1 9,14.5A0.5,0.5 0 0,1 8.5,15Z"/>
          </svg>
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-400/30 to-pink-600/30 blur-sm -z-10"></div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Audio Inmersivo",
    description: "Visualización de voz en tiempo real para interacciones premium",
    icon: (
      <div className="relative w-16 h-16 mx-auto">
        {/* Audio/Sound wave icon */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-600/20 border border-emerald-400/30"></div>
        <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
          </svg>
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/30 to-teal-600/30 blur-sm -z-10"></div>
        {/* Audio wave effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border border-emerald-400/20 animate-ping"></div>
          <div className="absolute w-24 h-24 rounded-full border border-emerald-400/10 animate-ping" style={{animationDelay: '0.2s'}}></div>
        </div>
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
