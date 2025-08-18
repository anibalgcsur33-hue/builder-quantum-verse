import { useEffect, useState } from "react";

const FEED = [
  "Cliente en 🇩🇪 reservó ático en Tenerife",
  "Fondo suizo visitó 3 villas en Ibiza (VR)",
  "Oferta enviada: Marbella €7.1M",
  "Nuevo listado verificado en Barcelona",
];

export default function LiveActivityToasts() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const id = setInterval(() => {
      const m = FEED[Math.floor(Math.random() * FEED.length)];
      setItems((a) => [m, ...a].slice(0, 4));
    }, 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-[60] space-y-3">
      {items.map((t, i) => (
        <div
          key={i}
          className="rounded-xl px-4 py-3 bg-black/70 border border-white/10 shadow-xl backdrop-blur-md text-sm"
        >
          🔔 {t}
        </div>
      ))}
    </div>
  );
}
