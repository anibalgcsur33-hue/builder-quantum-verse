import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ARProperty {
  id: string;
  name: string;
  price: string;
  model: string; // 3D model URL or placeholder
  scale: number;
}

const DEMO_PROPERTIES: ARProperty[] = [
  {
    id: "villa-luxury",
    name: "Villa de Lujo",
    price: "€2.5M",
    model: "/models/villa.glb",
    scale: 0.1,
  },
  {
    id: "penthouse",
    name: "Penthouse Moderno",
    price: "€1.8M",
    model: "/models/penthouse.glb",
    scale: 0.08,
  },
  {
    id: "beach-house",
    name: "Casa Frente al Mar",
    price: "€3.2M",
    model: "/models/beach-house.glb",
    scale: 0.12,
  },
];

export default function EnhancedARViewer() {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<ARProperty | null>(
    null,
  );
  const [showPropertySelector, setShowPropertySelector] = useState(false);
  const [arSession, setArSession] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    checkARSupport();
  }, []);

  const checkARSupport = async () => {
    try {
      if ("xr" in navigator) {
        // @ts-ignore - WebXR types
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setIsARSupported(supported);
      } else {
        setIsARSupported(false);
      }
    } catch (error) {
      console.warn("AR support check failed:", error);
      setIsARSupported(false);
    }
  };

  const startARSession = async () => {
    if (!isARSupported) {
      // Fallback to camera simulation
      startCameraSimulation();
      return;
    }

    try {
      // @ts-ignore - WebXR types
      const session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["local", "hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: { root: document.body },
      });

      setArSession(session);
      setIsARActive(true);

      // Set up AR session
      session.addEventListener("end", () => {
        setIsARActive(false);
        setArSession(null);
      });

      // Here you would set up the WebXR rendering loop
      // For this demo, we'll use a simplified approach
    } catch (error) {
      console.error("Failed to start AR session:", error);
      startCameraSimulation();
    }
  };

  const startCameraSimulation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      }
    } catch (error) {
      console.error("Camera access failed:", error);
      // Fallback to demo mode
      setIsARActive(true);
    }
  };

  const stopAR = () => {
    if (arSession) {
      arSession.end();
    }

    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }

    setIsARActive(false);
    setSelectedProperty(null);
  };

  const placeProperty = (property: ARProperty) => {
    setSelectedProperty(property);
    setShowPropertySelector(false);

    // Simulate property placement
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // Draw simple 3D representation
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "rgba(14, 231, 231, 0.8)";
        ctx.fillRect(
          canvasRef.current.width / 2 - 50,
          canvasRef.current.height / 2 - 30,
          100,
          60,
        );
        ctx.fillStyle = "white";
        ctx.font = "12px Inter";
        ctx.textAlign = "center";
        ctx.fillText(
          property.name,
          canvasRef.current.width / 2,
          canvasRef.current.height / 2 + 5,
        );
        ctx.fillText(
          property.price,
          canvasRef.current.width / 2,
          canvasRef.current.height / 2 + 20,
        );
      }
    }
  };

  return (
    <>
      {/* AR Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col gap-2"
      >
        {!isARActive ? (
          <button
            onClick={() => setShowPropertySelector(true)}
            className={`btn-crystal flex items-center gap-2 ${
              isARSupported ? "ring-2 ring-neon-emerald" : ""
            }`}
            disabled={isARSupported === null}
          >
            <span>🥽</span>
            <span>
              {isARSupported === null
                ? "Detectando AR..."
                : isARSupported
                  ? "Entrar en AR"
                  : "Ver en 3D"}
            </span>
          </button>
        ) : (
          <button
            onClick={stopAR}
            className="btn-crystal bg-red-500/20 border-red-400/30 flex items-center gap-2"
          >
            <span>❌</span>
            <span>Salir de AR</span>
          </button>
        )}

        {/* Property Info */}
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-3 text-sm"
          >
            <div className="text-neon-teal font-semibold">
              {selectedProperty.name}
            </div>
            <div className="text-white/80">{selectedProperty.price}</div>
          </motion.div>
        )}
      </motion.div>

      {/* Property Selector Modal */}
      <AnimatePresence>
        {showPropertySelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowPropertySelector(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gradient mb-4">
                Selecciona una Propiedad
              </h3>

              <div className="space-y-3">
                {DEMO_PROPERTIES.map((property) => (
                  <motion.button
                    key={property.id}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-left transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      startARSession();
                      placeProperty(property);
                    }}
                  >
                    <div className="font-semibold text-white">
                      {property.name}
                    </div>
                    <div className="text-neon-teal">{property.price}</div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowPropertySelector(false)}
                className="mt-4 w-full btn-ghost"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR View */}
      <AnimatePresence>
        {isARActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
          >
            {/* Camera Feed or Fallback */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{
                display: videoRef.current?.srcObject ? "block" : "none",
              }}
            />

            {/* Fallback AR Environment */}
            {!videoRef.current?.srcObject && (
              <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-300 to-green-200 relative">
                <div
                  className={
                    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
                  }
                ></div>
              </div>
            )}

            {/* AR Overlay Canvas */}
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* AR UI */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/80 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute top-6 left-6 right-6">
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-white font-semibold mb-2">
                    🏠 Modo AR Activo
                  </div>
                  <div className="text-white/80 text-sm">
                    {selectedProperty
                      ? `Visualizando: ${selectedProperty.name}`
                      : "Apunta hacia una superficie plana y toca para colocar la propiedad"}
                  </div>
                </div>
              </div>

              {/* Property Switcher */}
              {selectedProperty && (
                <div className="absolute bottom-24 left-6 right-6 pointer-events-auto">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {DEMO_PROPERTIES.map((property) => (
                      <button
                        key={property.id}
                        onClick={() => placeProperty(property)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedProperty.id === property.id
                            ? "bg-neon-teal text-blue-dark"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {property.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Exit Button */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                <button
                  onClick={stopAR}
                  className="btn-crystal bg-red-500/20 border-red-400/30"
                >
                  Salir de AR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
