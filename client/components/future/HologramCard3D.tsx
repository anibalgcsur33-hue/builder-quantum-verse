import { motion } from "framer-motion";
import Model3DViewer from "./Model3DViewer";
import EnterARSimple from "./EnterARSimple";

interface HologramCard3DProps {
  title: string;
  price: string;
  location: string;
  sketchfabId: string;
  fallbackImage: string;
}

export default function HologramCard3D({
  title,
  price,
  location,
  sketchfabId,
  fallbackImage
}: HologramCard3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/5 backdrop-blur-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 3D Model Viewer */}
      <Model3DViewer
        sketchfabId={sketchfabId}
        title={title}
        fallbackImage={fallbackImage}
      />
      
      {/* Property Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="text-cyan-300 text-xs font-medium">MODELO 3D INTERACTIVO</div>
        </div>
        
        <div className="text-white/90 text-lg font-semibold mb-1">{title}</div>
        <div className="text-white/60 text-sm mb-2">{location}</div>
        <div className="text-cyan-400 text-2xl font-bold mb-4">{price}</div>
        
        <div className="flex gap-3">
          <EnterARSimple />
          <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            Dossier IA
          </button>
        </div>
      </div>
      
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 rounded-full text-white text-xs font-semibold">
        PREMIUM 3D
      </div>
    </motion.div>
  );
}
