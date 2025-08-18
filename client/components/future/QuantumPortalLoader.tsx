import { useEffect, useState } from "react";

export default function QuantumPortalLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-[#0b1220]">
      <div className="relative h-48 w-48">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-80
          bg-[conic-gradient(from_0deg,#00e5ff_0%,#7c5cff_60%,transparent_70%)] animate-[spin_2.8s_linear_infinite]"
        />
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute inset-0 grid place-items-center text-white/80 tracking-wider">
          BlueEye
        </div>
      </div>
      <div className="absolute bottom-10 text-white/60 text-sm">
        Inicializando portal…
      </div>
    </div>
  );
}
