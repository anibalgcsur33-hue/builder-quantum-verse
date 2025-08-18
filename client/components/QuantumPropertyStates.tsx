import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Sun, Snowflake, Flower, Leaf, Eye, RotateCcw } from "lucide-react";

interface PropertyState {
  season: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
  price: string;
  features: string[];
}

const propertyStates: PropertyState[] = [
  {
    season: "Primavera",
    icon: <Flower className="w-6 h-6" />,
    gradient: "from-green-400 to-pink-400",
    description: "Jardines en plena floración, temperaturas perfectas para terrazas",
    price: "€2.8M",
    features: ["Jardín botánico privado", "Terrazas floridas", "Piscina climatizada"]
  },
  {
    season: "Verano",
    icon: <Sun className="w-6 h-6" />,
    gradient: "from-yellow-400 to-orange-500",
    description: "Máximo esplendor mediterráneo, ideal para entretenimiento",
    price: "€3.2M",
    features: ["Zona chill-out exterior", "Bar de piscina", "Sistema de refrigeración"]
  },
  {
    season: "Otoño",
    icon: <Leaf className="w-6 h-6" />,
    gradient: "from-orange-400 to-red-500",
    description: "Colores dorados, ambiente acogedor para reuniones familiares",
    price: "€2.9M",
    features: ["Chimenea exterior", "Bodega privada", "Zona de lectura"]
  },
  {
    season: "Invierno",
    icon: <Snowflake className="w-6 h-6" />,
    gradient: "from-blue-400 to-purple-500",
    description: "Refugio de lujo con calefacción radiante y spa privado",
    price: "€2.7M",
    features: ["Spa interior", "Sauna finlandesa", "Calefacción geotérmica"]
  }
];

export default function QuantumPropertyStates() {
  const [currentState, setCurrentState] = useState(0);
  const [isQuantumMode, setIsQuantumMode] = useState(false);
  const [superposition, setSuperposition] = useState(false);

  useEffect(() => {
    if (isQuantumMode) {
      const interval = setInterval(() => {
        setCurrentState((prev) => (prev + 1) % propertyStates.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isQuantumMode]);

  const activateQuantumMode = () => {
    setIsQuantumMode(!isQuantumMode);
    setSuperposition(!superposition);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-black/50 to-blue-dark/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="heading-lg text-gradient mb-6">
            Realidad Cuántica de Propiedades
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Experimenta tu futura propiedad en múltiples estados temporales simultáneamente.
            Tecnología cuántica inmobiliaria exclusiva de BlueEyes.
          </p>

          {/* Quantum Toggle */}
          <motion.button
            onClick={activateQuantumMode}
            className={`
              relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500
              ${isQuantumMode 
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-2xl' 
                : 'bg-white/10 text-white/70 backdrop-blur-md'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isQuantumMode 
                ? [
                    "0 0 30px rgba(147, 51, 234, 0.4)",
                    "0 0 60px rgba(6, 182, 212, 0.4)",
                    "0 0 30px rgba(147, 51, 234, 0.4)"
                  ]
                : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isQuantumMode ? 360 : 0 }}
                transition={{ duration: 2, repeat: isQuantumMode ? Infinity : 0, ease: "linear" }}
              >
                <RotateCcw className="w-6 h-6" />
              </motion.div>
              {isQuantumMode ? "Modo Cuántico Activo" : "Activar Superposición Temporal"}
            </div>
          </motion.button>
        </motion.div>

        {/* Property Quantum States */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Property Display */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-lg border border-white/20">
            
            {superposition ? (
              // All states visible simultaneously in quantum superposition
              <div className="relative w-full h-full">
                {propertyStates.map((state, index) => (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 bg-gradient-to-br ${state.gradient}`}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                    style={{
                      mixBlendMode: "screen"
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white/60 text-8xl"
                        animate={{ 
                          scale: [0.8, 1.2, 0.8],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        {state.icon}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Quantum interference patterns */}
                <div className="absolute inset-0">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <h3 className="text-4xl font-bold mb-4">Estado de Superposición</h3>
                    <p className="text-xl">Villa Cuántica en Múltiples Realidades</p>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Single state display
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentState}
                  className={`absolute inset-0 bg-gradient-to-br ${propertyStates[currentState].gradient}`}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-white/80 text-9xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {propertyStates[currentState].icon}
                    </motion.div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <motion.h3
                      className="text-3xl font-bold mb-2"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {propertyStates[currentState].season}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-white/80 mb-4"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {propertyStates[currentState].description}
                    </motion.p>
                    <motion.div
                      className="text-2xl font-bold text-yellow-400"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {propertyStates[currentState].price}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Quantum Field Effect */}
            {isQuantumMode && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}
          </div>

          {/* Season Selector */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {propertyStates.map((state, index) => (
              <motion.button
                key={index}
                onClick={() => !isQuantumMode && setCurrentState(index)}
                className={`
                  relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300
                  ${currentState === index && !superposition
                    ? 'bg-white/20 border-white/40 ring-2 ring-cyan-400'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }
                  ${isQuantumMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={!isQuantumMode ? { scale: 1.05, y: -5 } : {}}
                whileTap={!isQuantumMode ? { scale: 0.95 } : {}}
                disabled={isQuantumMode}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${state.gradient} flex items-center justify-center mb-4 mx-auto`}
                  animate={superposition ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  } : {}}
                  transition={superposition ? {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  } : {}}
                >
                  {state.icon}
                </motion.div>
                
                <h4 className="text-white font-bold text-lg mb-2">{state.season}</h4>
                <p className="text-white/60 text-sm mb-3">{state.price}</p>
                
                <div className="space-y-1">
                  {state.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="text-xs text-white/50 flex items-center gap-1"
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                {currentState === index && !superposition && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Quantum Physics Explanation */}
          <motion.div
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-md border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.div>
              
              <div>
                <h4 className="text-white font-bold text-xl mb-4">
                  Tecnología de Observación Cuántica Inmobiliaria
                </h4>
                <p className="text-white/80 mb-4">
                  Utilizando principios de mecánica cuántica, BlueEyes permite visualizar 
                  propiedades en múltiples estados temporales simultáneamente. El acto de 
                  observación colapsa la función de onda hacia el estado específico deseado.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/60">
                  <div>
                    <strong>🔬 Superposición:</strong> La propiedad existe en todos los estados estacionales
                  </div>
                  <div>
                    <strong>👁️ Observación:</strong> Tu interés colapsa hacia un estado específico
                  </div>
                  <div>
                    <strong>🌀 Entrelazamiento:</strong> Propiedades similares muestran correlaciones
                  </div>
                  <div>
                    <strong>⚡ Coherencia:</strong> Mantiene consistencia entre dimensiones temporales
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Quantum Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
