import { useState, useEffect } from "react";

export default function EnterARSimple() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [arActive, setArActive] = useState(false);

  useEffect(() => {
    // Check for WebXR support
    if ("xr" in navigator) {
      // @ts-ignore
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported: boolean) => setSupported(supported))
        .catch(() => setSupported(false));
    } else {
      setSupported(false);
    }
  }, []);

  const startAR = async () => {
    if (!supported) {
      // Fallback to VR/3D view
      window.location.href = "/metaverse";
      return;
    }

    try {
      setArActive(true);
      // Here you would start the AR session
      alert(
        "AR Mode: Apunta tu dispositivo hacia una superficie plana y toca para colocar la propiedad virtual",
      );

      // Simulate AR session
      setTimeout(() => {
        setArActive(false);
        alert(
          "Demo AR completada. En la versión completa verías el modelo 3D de la propiedad.",
        );
      }, 5000);
    } catch (error) {
      console.error("AR Error:", error);
      setArActive(false);
    }
  };

  if (supported === null) {
    return (
      <button className="btn-crystal opacity-50" disabled>
        Detectando AR...
      </button>
    );
  }

  return (
    <>
      <button
        className={supported ? "btn-crystal" : "btn-ghost"}
        onClick={startAR}
        disabled={arActive}
      >
        {arActive
          ? "AR Activo..."
          : supported
            ? "Entrar en AR"
            : "Ver en 3D/VR"}
      </button>

      {arActive && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-black/80 p-6 rounded-2xl border border-cyan-400/30 text-center">
            <div className="text-cyan-400 mb-4">🥽 Modo AR Activo</div>
            <div className="text-white/80 text-sm mb-4">
              Mueve tu dispositivo para encontrar una superficie plana
            </div>
            <div className="w-12 h-12 border-2 border-cyan-400 rounded-full animate-pulse mx-auto mb-4"></div>
            <button
              onClick={() => setArActive(false)}
              className="btn-ghost text-sm"
            >
              Salir de AR
            </button>
          </div>
        </div>
      )}
    </>
  );
}
