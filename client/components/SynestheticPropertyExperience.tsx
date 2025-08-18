import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Volume2, Thermometer, Wind, Heart, Waves, Zap } from "lucide-react";

interface PropertySense {
  id: string;
  name: string;
  aroma: string;
  temperature: number;
  vibration: string;
  color: string;
  sound: string;
  emotion: string;
  price: string;
  location: string;
}

const properties: PropertySense[] = [
  {
    id: "marbella-villa",
    name: "Villa Mediterránea",
    aroma: "Lavanda y sal marina",
    temperature: 24,
    vibration: "Ondas suaves del mar",
    color: "#00BFFF",
    sound: "Olas susurrantes + campanas de viento",
    emotion: "Serenidad absoluta",
    price: "€3.2M",
    location: "Marbella, Costa del Sol"
  },
  {
    id: "madrid-penthouse",
    name: "Penthouse Urbano",
    aroma: "Cuero italiano y café premium",
    temperature: 22,
    vibration: "Pulso metropolitano dinámico",
    color: "#FFD700",
    sound: "Jazz suave + vida urbana lejana",
    emotion: "Sofisticación energizante",
    price: "€2.8M",
    location: "Salamanca, Madrid"
  },
  {
    id: "barcelona-loft",
    name: "Loft Artístico",
    aroma: "Madera de cedro y especias",
    temperature: 23,
    vibration: "Creatividad pulsante",
    color: "#FF6B6B",
    sound: "Guitarra española + murmullo creativo",
    emotion: "Inspiración bohemia",
    price: "€2.5M",
    location: "Eixample, Barcelona"
  },
  {
    id: "ibiza-retreat",
    name: "Retiro Balear",
    aroma: "Hierbas aromáticas y brisa marina",
    temperature: 26,
    vibration: "Energía zen equilibrada",
    color: "#E6E6FA",
    sound: "Canto de grillos + agua fluyendo",
    emotion: "Paz transformadora",
    price: "€4.1M",
    location: "Cala Comte, Ibiza"
  }
];

export default function SynestheticPropertyExperience() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [isExperienceActive, setIsExperienceActive] = useState(false);
  const [currentSense, setCurrentSense] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    if (isExperienceActive) {
      const senses = ['aroma', 'temperature', 'vibration', 'sound', 'emotion'];
      let index = 0;
      
      const interval = setInterval(() => {
        setCurrentSense(senses[index % senses.length]);
        index++;
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setCurrentSense(null);
    }
  }, [isExperienceActive]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  const getSenseIntensity = (propertyId: string, sense: string) => {
    const intensities: Record<string, Record<string, number>> = {
      'marbella-villa': { aroma: 85, temperature: 90, vibration: 70, sound: 75, emotion: 95 },
      'madrid-penthouse': { aroma: 80, temperature: 85, vibration: 95, sound: 85, emotion: 80 },
      'barcelona-loft': { aroma: 90, temperature: 80, vibration: 85, sound: 90, emotion: 85 },
      'ibiza-retreat': { aroma: 95, temperature: 95, vibration: 90, sound: 80, emotion: 100 }
    };
    return intensities[propertyId]?.[sense] || 50;
  };

  return (
    <div className="py-20 bg-gradient-to-b from-purple-900/20 to-pink-900/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="heading-lg text-gradient mb-6">
            Experiencia Sinestésica Inmobiliaria
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8">
            Cada propiedad tiene su propia signature sensorial única. Experimenta aromas digitales,
            temperaturas virtuales, vibraciones hápticas y sonidos inmersivos que definen el alma de cada hogar.
          </p>

          {/* Experience Toggle */}
          <motion.button
            onClick={() => setIsExperienceActive(!isExperienceActive)}
            className={`
              relative px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500
              ${isExperienceActive 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-2xl' 
                : 'bg-white/10 text-white/70 backdrop-blur-md'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isExperienceActive 
                ? [
                    "0 0 30px rgba(236, 72, 153, 0.4)",
                    "0 0 60px rgba(147, 51, 234, 0.4)",
                    "0 0 30px rgba(236, 72, 153, 0.4)"
                  ]
                : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: isExperienceActive ? [1, 1.2, 1] : 1,
                  rotate: isExperienceActive ? 360 : 0 
                }}
                transition={{ 
                  scale: { duration: 1, repeat: isExperienceActive ? Infinity : 0 },
                  rotate: { duration: 2, repeat: isExperienceActive ? Infinity : 0, ease: "linear" }
                }}
              >
                <Heart className="w-6 h-6" />
              </motion.div>
              {isExperienceActive ? "Experiencia Sensorial Activa" : "Activar Sinestesia Digital"}
            </div>
          </motion.button>
        </motion.div>

        {/* Main Experience Area */}
        <div 
          ref={containerRef}
          className="relative max-w-7xl mx-auto"
          onMouseMove={handleMouseMove}
        >
          {/* Central Property Display */}
          <motion.div
            className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-12"
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Property Background */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                background: isExperienceActive 
                  ? [
                      `radial-gradient(circle at 30% 30%, ${selectedProperty.color}40 0%, transparent 70%)`,
                      `radial-gradient(circle at 70% 70%, ${selectedProperty.color}60 0%, transparent 70%)`,
                      `radial-gradient(circle at 50% 50%, ${selectedProperty.color}40 0%, transparent 70%)`
                    ]
                  : `linear-gradient(135deg, ${selectedProperty.color}20, transparent)`
              }}
              transition={{ duration: 3, repeat: isExperienceActive ? Infinity : 0 }}
            />

            {/* Property Info Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center text-white max-w-2xl mx-auto p-8"
                animate={isExperienceActive ? {
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                } : {}}
                transition={{ duration: 2, repeat: isExperienceActive ? Infinity : 0 }}
              >
                <motion.h3
                  className="text-4xl font-bold mb-4"
                  style={{ color: selectedProperty.color }}
                >
                  {selectedProperty.name}
                </motion.h3>
                <p className="text-xl text-white/80 mb-2">{selectedProperty.location}</p>
                <p className="text-3xl font-bold text-yellow-400">{selectedProperty.price}</p>

                {/* Current Sense Highlight */}
                {isExperienceActive && currentSense && (
                  <motion.div
                    className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      className="text-2xl font-bold mb-2"
                      animate={{ 
                        color: [selectedProperty.color, "#ffffff", selectedProperty.color]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {currentSense === 'aroma' && `🌸 ${selectedProperty.aroma}`}
                      {currentSense === 'temperature' && `🌡️ ${selectedProperty.temperature}°C`}
                      {currentSense === 'vibration' && `〰️ ${selectedProperty.vibration}`}
                      {currentSense === 'sound' && `🎵 ${selectedProperty.sound}`}
                      {currentSense === 'emotion' && `💫 ${selectedProperty.emotion}`}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Sensory Particles */}
            {isExperienceActive && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: selectedProperty.color,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                      y: [-20, -60, -100]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Property Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {properties.map((property, index) => (
              <motion.button
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className={`
                  relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300
                  ${selectedProperty.id === property.id
                    ? 'bg-white/20 border-white/40 ring-2 ring-opacity-50'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }
                `}
                style={{
                  ringColor: selectedProperty.id === property.id ? property.color : 'transparent'
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-white text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: property.color + '40' }}
                    animate={selectedProperty.id === property.id && isExperienceActive ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏠
                  </motion.div>
                  <h4 className="font-bold text-lg mb-2">{property.name}</h4>
                  <p className="text-sm text-white/60 mb-2">{property.location}</p>
                  <p className="text-lg font-bold" style={{ color: property.color }}>
                    {property.price}
                  </p>
                </div>

                {selectedProperty.id === property.id && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: property.color }}
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Sensory Dashboard */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { 
                key: 'aroma', 
                icon: <Wind className="w-6 h-6" />, 
                label: 'Aroma Digital',
                value: selectedProperty.aroma,
                color: '#10B981'
              },
              { 
                key: 'temperature', 
                icon: <Thermometer className="w-6 h-6" />, 
                label: 'Temperatura Virtual',
                value: `${selectedProperty.temperature}°C`,
                color: '#F59E0B'
              },
              { 
                key: 'vibration', 
                icon: <Waves className="w-6 h-6" />, 
                label: 'Vibración Háptica',
                value: selectedProperty.vibration,
                color: '#8B5CF6'
              },
              { 
                key: 'sound', 
                icon: <Volume2 className="w-6 h-6" />, 
                label: 'Audio Espacial',
                value: selectedProperty.sound,
                color: '#06B6D4'
              },
              { 
                key: 'emotion', 
                icon: <Heart className="w-6 h-6" />, 
                label: 'Resonancia Emocional',
                value: selectedProperty.emotion,
                color: '#EC4899'
              }
            ].map((sense, index) => (
              <motion.div
                key={sense.key}
                className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                animate={currentSense === sense.key ? {
                  scale: [1, 1.05, 1],
                  borderColor: [sense.color + '40', sense.color, sense.color + '40']
                } : {}}
                transition={{ duration: 1, repeat: currentSense === sense.key ? Infinity : 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: sense.color + '40' }}
                    animate={isExperienceActive ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: isExperienceActive ? Infinity : 0,
                      delay: index * 0.2
                    }}
                  >
                    <div style={{ color: sense.color }}>
                      {sense.icon}
                    </div>
                  </motion.div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{sense.label}</h4>
                  </div>
                </div>

                {/* Intensity Bar */}
                <div className="w-full bg-white/20 rounded-full h-2 mb-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sense.color }}
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: `${getSenseIntensity(selectedProperty.id, sense.key)}%`
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>

                <p className="text-white/80 text-sm leading-tight">
                  {sense.value}
                </p>

                {/* Pulsing Effect for Active Sense */}
                {currentSense === sense.key && isExperienceActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: sense.color }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Description */}
          <motion.div
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-md border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              
              <div>
                <h4 className="text-white font-bold text-xl mb-4">
                  Tecnología Sinestésica Inmobiliaria™
                </h4>
                <p className="text-white/80 mb-4">
                  Cada propiedad en BlueEyes genera una signature sensorial única basada en su 
                  arquitectura, ubicación, historia y energía. Nuestra IA analiza miles de 
                  variables para crear experiencias multisensoriales auténticas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/60">
                  <div>
                    <strong>🧠 Neuroplasticidad:</strong> Asociaciones sensoriales personalizadas
                  </div>
                  <div>
                    <strong>🌊 Resonancia:</strong> Sincronización con frecuencias arquitectónicas
                  </div>
                  <div>
                    <strong>💫 Memoria:</strong> Impronta emocional duradera del espacio
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Sensory Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isExperienceActive && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 4,
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
