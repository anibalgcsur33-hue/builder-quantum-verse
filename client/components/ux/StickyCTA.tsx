import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky-cta">
      <div className="wrap">
        <a href="/tour" className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/20 text-sm">🎥 Demo rápida</a>
        <a href="/vr" className="rounded-lg px-3 py-2 bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold text-sm">🥽 Entrar en VR</a>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent("blueeye:assistant"))}
          className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/20 text-sm"
        >
          🤝 Hablar con IA
        </button>
      </div>
    </div>
  );
}
