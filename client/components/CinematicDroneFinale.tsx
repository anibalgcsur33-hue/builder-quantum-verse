import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, MapPin, Diamond, Crown, Star, Sparkles } from "lucide-react";

export default function CinematicDroneFinale() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVIPButton, setShowVIPButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVIPButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const startCinematic = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger a drone flight video
  };

  const islands = [
    { name: "Mallorca", x: "15%", y: "60%" },
    { name: "Ibiza", x: "10%", y: "65%" },
    { name: "Menorca", x: "20%", y: "55%" },
    { name: "Tenerife", x: "5%", y: "85%" },
    { name: "Gran Canaria", x: "8%", y: "88%" },
    { name: "Lanzarote", x: "12%", y: "82%" },
    { name: "Fuerteventura", x: "10%", y: "85%" },
    { name: "La Graciosa", x: "11%", y: "80%" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-purple-900 to-black"
    >
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0" style={{ y, opacity, scale }}>
        {/* Starfield */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Spain Outline */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          {/* Simplified Spain shape */}
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-30">
            <path
              d="M50 150 L100 100 L200 80 L300 100 L350 120 L380 150 L370 200 L350 220 L300 230 L250 240 L200 235 L150 230 L100 220 L70 200 Z"
              fill="none"
              stroke="rgba(0, 255, 255, 0.5)"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          {/* Islands with pulsing effect */}
          {islands.map((island, index) => (
            <motion.div
              key={island.name}
              className="absolute w-4 h-4 bg-cyan-400 rounded-full"
              style={{ left: island.x, top: island.y }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-200 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {island.name}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Drone Path */}
        {isPlaying && (
          <motion.div
            className="absolute w-6 h-6 bg-yellow-400 rounded-full shadow-lg"
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "25%", "50%", "75%", "100%"],
              y: ["0%", "20%", "40%", "60%", "80%"],
            }}
            transition={{ duration: 8, ease: "easeInOut" }}
          >
            <motion.div
              className="w-full h-full bg-yellow-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255, 255, 0, 0.5)",
                  "0 0 20px rgba(255, 255, 0, 0.8)",
                  "0 0 10px rgba(255, 255, 0, 0.5)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8"
            animate={{
              background: [
                "linear-gradient(45deg, #00ffff, #ff00ff)",
                "linear-gradient(45deg, #ff00ff, #ffff00)",
                "linear-gradient(45deg, #ffff00, #00ffff)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Experiencia
            <br />
            <span className="text-4xl md:text-6xl">Cinemática Final</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Embárcate en un vuelo épico sobre todas las islas de España.
            Descubre el paraíso inmobiliario desde una perspectiva única.
          </motion.p>

          {/* Cinematic Play Button */}
          {!isPlaying && (
            <motion.button
              onClick={startCinematic}
              className="group relative inline-flex items-center justify-center w-32 h-32 mb-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
              />
              <div className="relative z-10 w-28 h-28 rounded-full bg-black/50 backdrop-blur-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-white ml-2" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          )}

          {/* Flight Progress */}
          {isPlaying && (
            <motion.div
              className="w-full max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8 }}
                />
              </div>
              <p className="text-white/60 text-sm mt-2">
                Volando sobre el paraíso español...
              </p>
            </motion.div>
          )}

          {/* VIP Diamond Button */}
          {showVIPButton && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <motion.button
                className="group relative px-12 py-6 rounded-2xl font-bold text-xl text-white overflow-hidden"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 10,
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(0, 255, 255, 0.3)",
                    "0 0 60px rgba(255, 0, 255, 0.3)",
                    "0 0 30px rgba(0, 255, 255, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Diamond className="w-8 h-8 text-cyan-400" />
                  </motion.div>

                  <span>Agendar Tour VIP Exclusivo</span>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-10, -30, -10],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </motion.button>

              {/* Exclusivity Badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1 text-sm font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" fill="currentColor" />
                  <span>VIP</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-3 py-1 text-sm font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Premium</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Exclusive Access Message */}
          <motion.p
            className="text-white/60 text-sm mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            🏆 Experiencia reservada para miembros del club privado BlueEyes.
            <br />
            💎 Accede a propiedades exclusivas no disponibles al público
            general.
          </motion.p>
        </motion.div>
      </div>

      {/* Corner Indicators */}
      <motion.div
        className="absolute top-8 left-8 text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          <span>España & Islas Canarias</span>
        </div>
        <div className="text-xs">8 Islas • 47 Provincias • ∞ Posibilidades</div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 text-white/40 text-sm text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="mb-2">BlueEyes Metaversal</div>
        <div className="text-xs">© 2024 Premium Experience</div>
      </motion.div>
    </div>
  );
}
