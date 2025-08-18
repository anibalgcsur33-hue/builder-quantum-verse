import { motion } from "framer-motion";
import { useState } from "react";
import EnterARSimple from "./EnterARSimple";

interface HologramCard3DProps {
  title: string;
  price: string;
  location: string;
  image: string;
  modelUrl?: string;
}

export default function HologramCard3DSimple({
  title,
  price,
  location,
  image,
  modelUrl
}: HologramCard3DProps) {
  const [is3DMode, setIs3DMode] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/5 backdrop-blur-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Property Viewer */}
      <div className="relative h-72 bg-gradient-to-br from-slate-800 to-slate-900">
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Holographic overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_96%,#00ffff33_100%)] bg-[length:100%_3px] mix-blend-screen animate-pulse" />
          
          {/* Rotating sheen */}
          <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_30%_10%,#00e5ff44,transparent_30%,#7c5cff44_60%,transparent_75%)] animate-[spin_8s_linear_infinite] opacity-30" />
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>
        </div>
        
        {/* 3D Mode Toggle */}
        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm border border-cyan-400/50 rounded-full text-cyan-300 text-xs font-medium hover:bg-cyan-400/20 transition"
        >
          {is3DMode ? '📷 Vista Foto' : '🎮 Vista 3D'}
        </button>

        {/* Premium 3D Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500/90 to-purple-500/90 rounded-full text-white text-xs font-semibold">
          HOLOGRAMA 3D
        </div>
      </div>
      
      {/* Property Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="text-cyan-300 text-xs font-medium tracking-wider">EXPERIENCIA INMERSIVA</div>
        </div>
        
        <div className="text-white/90 text-lg font-semibold mb-1">{title}</div>
        <div className="text-white/60 text-sm mb-2 flex items-center gap-1">
          <span>📍</span> {location}
        </div>
        <div className="text-cyan-400 text-2xl font-bold mb-4">{price}</div>
        
        <div className="flex gap-3">
          <EnterARSimple />
          <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            📋 Dossier IA
          </button>
        </div>
      </div>
      
      {/* 3D Mode Overlay */}
      {is3DMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 flex items-center justify-center"
        >
          <div className="text-center text-white p-6">
            <div className="text-4xl mb-4">🎮</div>
            <div className="text-xl font-semibold mb-2">Modo 3D Activado</div>
            <div className="text-sm text-white/70 mb-4">
              Experiencia inmersiva completa disponible en la versión AR
            </div>
            <button
              onClick={() => setIs3DMode(false)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-medium transition"
            >
              Cerrar Vista 3D
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
