import { useEffect, useState } from "react";

declare global {
  interface Window {
    XRSystem?: any;
  }
}

export default function ARSmartButton() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    (navigator as any).xr
      ?.isSessionSupported?.("immersive-ar")
      .then((ok: boolean) => setSupported(ok))
      .catch(() => setSupported(false));
  }, []);

  const handleClick = () => {
    // avisa a tu componente AR existente (EnterAR / EnterARSimple)
    window.dispatchEvent(new CustomEvent("blueeye:start-ar"));
  };

  const base = "rounded-xl px-5 py-3 transition border";

  if (supported === null) {
    return (
      <button className={`${base} border-white/15 bg-white/5 text-white/70`}>
        Comprobando AR…
      </button>
    );
  }

  if (!supported) {
    return (
      <button
        className={`${base} border-white/15 bg-white/5 text-white/70 hover:bg-white/10`}
        onClick={() => (location.href = "#vr")}
        title="Tu dispositivo no soporta WebXR AR; abrimos VR/3D"
      >
        Ver en 3D/VR
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="btn-sheen"
      title="Iniciar sesión AR (WebXR)"
    >
      🥽 Entrar en AR
    </button>
  );
}
