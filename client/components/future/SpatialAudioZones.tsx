import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AudioZone {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  width: number; // Percentage width
  height: number; // Percentage height
  frequency: number; // Base frequency
  label: string;
  type: "ambient" | "interactive" | "musical";
  color: string;
}

const AUDIO_ZONES: AudioZone[] = [
  {
    id: "hero",
    x: 10,
    y: 20,
    width: 80,
    height: 30,
    frequency: 220,
    label: "Zona Principal",
    type: "ambient",
    color: "rgba(14,231,231,0.2)",
  },
  {
    id: "properties",
    x: 5,
    y: 55,
    width: 40,
    height: 35,
    frequency: 330,
    label: "Propiedades",
    type: "interactive",
    color: "rgba(0,231,167,0.2)",
  },
  {
    id: "navigation",
    x: 50,
    y: 55,
    width: 45,
    height: 35,
    frequency: 440,
    label: "Navegación",
    type: "musical",
    color: "rgba(124,92,255,0.2)",
  },
];

export default function SpatialAudioZones() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentZone, setCurrentZone] = useState<string | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  const pannerNodesRef = useRef<Map<string, PannerNode>>(new Map());

  useEffect(() => {
    if (!isActive) return;

    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        const ctx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        setAudioContext(ctx);

        // Create audio nodes for each zone
        AUDIO_ZONES.forEach((zone) => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const pannerNode = ctx.createPanner();

          // Configure panner for 3D audio
          pannerNode.panningModel = "HRTF";
          pannerNode.distanceModel = "inverse";
          pannerNode.refDistance = 1;
          pannerNode.maxDistance = 10;
          pannerNode.rolloffFactor = 0.5;

          // Configure oscillator based on zone type
          oscillator.type = zone.type === "musical" ? "sine" : "triangle";
          oscillator.frequency.value = zone.frequency;

          // Very low initial volume
          gainNode.gain.value = 0;

          // Connect audio graph
          oscillator.connect(gainNode);
          gainNode.connect(pannerNode);
          pannerNode.connect(ctx.destination);

          oscillator.start();

          // Store references
          oscillatorsRef.current.set(zone.id, oscillator);
          gainNodesRef.current.set(zone.id, gainNode);
          pannerNodesRef.current.set(zone.id, pannerNode);
        });
      } catch (error) {
        console.warn("Spatial audio not supported:", error);
      }
    };

    initAudio();

    return () => {
      // Cleanup
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      oscillatorsRef.current.clear();
      gainNodesRef.current.clear();
      pannerNodesRef.current.clear();
    };
  }, [isActive]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!audioContext || !isActive) return;

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    let activeZone: string | null = null;

    AUDIO_ZONES.forEach((zone) => {
      const isInZone =
        x >= zone.x &&
        x <= zone.x + zone.width &&
        y >= zone.y &&
        y <= zone.y + zone.height;

      const gainNode = gainNodesRef.current.get(zone.id);
      const pannerNode = pannerNodesRef.current.get(zone.id);

      if (gainNode && pannerNode) {
        if (isInZone) {
          activeZone = zone.id;

          // Calculate 3D position within zone
          const relativeX = ((x - zone.x) / zone.width) * 2 - 1; // -1 to 1
          const relativeY = ((y - zone.y) / zone.height) * 2 - 1; // -1 to 1

          // Set 3D position
          pannerNode.setPosition(relativeX * 2, relativeY * 2, -1);

          // Fade in with distance-based volume
          const distance = Math.sqrt(
            relativeX * relativeX + relativeY * relativeY,
          );
          const volume = Math.max(0, 1 - distance) * 0.1; // Very subtle volume

          gainNode.gain.setTargetAtTime(volume, audioContext.currentTime, 0.1);

          // Modulate frequency based on position for interactive zones
          if (zone.type === "interactive") {
            const oscillator = oscillatorsRef.current.get(zone.id);
            if (oscillator) {
              const freqModulation = zone.frequency * (1 + relativeX * 0.1);
              oscillator.frequency.setTargetAtTime(
                freqModulation,
                audioContext.currentTime,
                0.05,
              );
            }
          }
        } else {
          // Fade out
          gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.2);
        }
      }
    });

    setCurrentZone(activeZone);
  };

  useEffect(() => {
    if (isActive) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isActive, audioContext]);

  const toggleAudio = () => {
    setIsActive(!isActive);
    if (isActive) {
      setCurrentZone(null);
    }
  };

  return (
    <>
      {/* Audio Zone Visualization */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {AUDIO_ZONES.map((zone) => (
            <motion.div
              key={zone.id}
              className="absolute border-2 border-dashed rounded-lg transition-all duration-300"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
                backgroundColor:
                  currentZone === zone.id ? zone.color : "transparent",
                borderColor:
                  currentZone === zone.id
                    ? zone.color.replace("0.2", "0.6")
                    : zone.color.replace("0.2", "0.3"),
                borderWidth: currentZone === zone.id ? "3px" : "2px",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: currentZone === zone.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Zone Label */}
              <div className="absolute -top-8 left-2 text-xs text-white/60 font-medium">
                {zone.label}
                {currentZone === zone.id && (
                  <span className="ml-2 text-neon-teal">🎵</span>
                )}
              </div>

              {/* Zone Type Indicator */}
              <div className="absolute top-2 right-2 text-xs">
                {zone.type === "ambient" && "🌊"}
                {zone.type === "interactive" && "🎛️"}
                {zone.type === "musical" && "🎶"}
              </div>

              {/* Audio Visualization */}
              {currentZone === zone.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-white/60 rounded-full"
                        animate={{
                          height: ["4px", "16px", "4px"],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-6 right-6 z-30"
      >
        <div className="glass rounded-xl p-4 min-w-48">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Audio Espacial</h3>
            <button
              onClick={toggleAudio}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-neon-teal text-blue-dark"
                  : "bg-white/20 text-white/60"
              }`}
            >
              {isActive ? "🔊" : "🔇"}
            </button>
          </div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="text-xs text-white/60">
                Mueve el cursor por las zonas para experimentar audio 3D
              </div>

              {currentZone && (
                <div className="text-xs text-neon-teal">
                  Activo: {AUDIO_ZONES.find((z) => z.id === currentZone)?.label}
                </div>
              )}

              <div className="text-xs text-white/40">
                {AUDIO_ZONES.length} zonas disponibles
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
