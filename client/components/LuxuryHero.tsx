import { motion } from "framer-motion";

export default function LuxuryHero() {
  return (
    <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Fondo degradado + partículas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#111122] to-[#0a0a12]" />
      
      {/* Efectos de partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Portal holográfico */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Portal circular animado */}
        <motion.div 
          className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-400/30 to-violet-500/30 border border-white/20 backdrop-blur-xl"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Anillos internos */}
          <div className="absolute inset-8 rounded-full border border-cyan-400/40 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-violet-400/40 animate-spin-slow-reverse" />
          
          {/* Centro brillante */}
          <motion.div 
            className="absolute inset-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Título principal */}
        <motion.h1 
          className="mt-8 text-5xl md:text-6xl font-serif bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          BlueEye Homes
        </motion.h1>

        {/* Subtítulo */}
        <motion.p 
          className="mt-4 text-lg text-gray-300 max-w-md leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Donde la arquitectura de lujo se encuentra con la tecnología inmersiva.
        </motion.p>

        {/* Botones de acción */}
        <motion.div 
          className="mt-8 flex gap-4 flex-col sm:flex-row"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button 
            className="btn-crystal px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
            </svg>
            Explorar en VR
          </motion.button>
          
          <motion.button 
            className="glass px-8 py-4 rounded-xl text-white font-semibold border border-white/20 hover:border-white/40 transition-all"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar Invitación
          </motion.button>
        </motion.div>

        {/* Indicadores flotantes */}
        <motion.div 
          className="mt-12 flex gap-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Tours VR Disponibles
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Certificación Notarial
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Inversión Segura
          </div>
        </motion.div>
      </motion.div>

      {/* Efecto de scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-sm">Descubre más</span>
        <motion.div
          className="w-6 h-10 border border-gray-400 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
