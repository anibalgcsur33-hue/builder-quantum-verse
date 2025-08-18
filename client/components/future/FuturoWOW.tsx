import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuantumBackground3D from "./QuantumBackground3D";
import QuantumPortalLoader from "./QuantumPortalLoader";
import NeuralNav from "./NeuralNav";
import SpatialAudioAdvanced from "./SpatialAudioAdvanced";
import EnhancedARViewer from "./EnhancedARViewer";
import SpatialAudioZones from "./SpatialAudioZones";
import QuantumTunnelLoader from "./QuantumTunnelLoader";
import NeuralNavEnhanced from "./NeuralNavEnhanced";

interface FuturoWOWProps {
  showLoader?: boolean;
  enableAudio?: boolean;
  children?: React.ReactNode;
}

export default function FuturoWOW({
  showLoader = true,
  enableAudio = true,
  children,
}: FuturoWOWProps) {
  const [isLoaded, setIsLoaded] = useState(!showLoader);
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState(false);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => setIsLoaded(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Quantum Portal Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <QuantumTunnelLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Dynamic Background */}
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-gradient-to-br from-blue-dark via-blue-900 to-black" />
        }
      >
        <QuantumBackground3D />
      </Suspense>

      {/* Spatial Audio Zones */}
      {enableAudio && spatialAudioEnabled && <SpatialAudioZones />}

      {/* Neural Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-20"
      >
        <NeuralNavEnhanced />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Enhanced AR Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 left-6 z-30"
      >
        <EnhancedARViewer />
      </motion.div>

      {/* Spatial Audio Controls */}
      {enableAudio && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="fixed bottom-6 right-6 z-30"
        >
          <button
            onClick={() => setSpatialAudioEnabled(!spatialAudioEnabled)}
            className={`btn-crystal ${spatialAudioEnabled ? "ring-2 ring-neon-teal" : ""}`}
          >
            🎧 {spatialAudioEnabled ? "Audio 3D Activo" : "Activar Audio 3D"}
          </button>
        </motion.div>
      )}

      {/* Advanced Spatial Audio */}
      {enableAudio && <SpatialAudioAdvanced />}

      {/* Quantum Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,231,231,0.1),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(124,92,255,0.1),transparent_40%)]" />

        {/* Floating quantum particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-teal rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Neural Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="neuralGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="rgba(14,231,231,0.3)" />
              <line
                x1="0"
                y1="30"
                x2="60"
                y2="30"
                stroke="rgba(14,231,231,0.1)"
                strokeWidth="0.5"
              />
              <line
                x1="30"
                y1="0"
                x2="30"
                y2="60"
                stroke="rgba(14,231,231,0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuralGrid)" />
        </svg>
      </div>
    </div>
  );
}
