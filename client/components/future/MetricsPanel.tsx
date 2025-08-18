import { useEffect, useRef, useState } from "react";

function useCountTo(target: number, dur = 1500) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / dur);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return val;
}

function Stat({
  label,
  value,
  suffix = "+",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const v = useCountTo(value);
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_10%_10%,#00e5ff22,transparent_35%),radial-gradient(circle_at_90%_10%,#7c5cff22,transparent_35%)]" />
      <div className="relative text-3xl font-semibold">
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="relative mt-1 text-white/60 text-sm">{label}</div>
    </div>
  );
}

export default function MetricsPanel() {
  return (
    <section id="metrics" className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-5 md:grid-cols-4">
        <Stat label="Miembros activos" value={12450} />
        <Stat label="Propiedades verificadas" value={862} />
        <Stat label="VR/AR tours completados" value={4218} />
        <Stat label="Volumen gestionado (€)" value={125000000} suffix="" />
      </div>
    </section>
  );
}
