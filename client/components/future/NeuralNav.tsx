import { motion } from "framer-motion";

const NODES = [
  { id: "home", x: 8,  y: 50, label: "Inicio", href: "#top" },
  { id: "props", x: 28, y: 40, label: "Propiedades", href: "#props" },
  { id: "vr",    x: 50, y: 55, label: "VR & AR", href: "#vr" },
  { id: "comm",  x: 72, y: 42, label: "Comunidad", href: "#community" },
  { id: "inv",   x: 88, y: 52, label: "Inversores", href: "#invest" },
];

const LINKS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[0,2],[1,3]
];

export default function NeuralNav() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 overflow-hidden">
        <svg viewBox="0 0 100 60" className="w-full h-40 text-cyan-300/50">
          {/* líneas */}
          {LINKS.map(([a,b], i) => {
            const A = NODES[a], B = NODES[b];
            return (
              <motion.line
                key={i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="currentColor" strokeWidth="0.6"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ delay: 0.1 + i*0.08, duration: 0.9 }}
              />
            );
          })}
          {/* nodos */}
          {NODES.map((n, i) => (
            <a key={n.id} href={n.href}>
              <motion.circle
                cx={n.x} cy={n.y} r="2.6"
                className="fill-cyan-300/70"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i*0.08, type: "spring", stiffness: 200, damping: 20 }}
              />
            </a>
          ))}
        </svg>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,#00e5ff11,transparent_40%),radial-gradient(circle_at_80%_80%,#7c5cff11,transparent_40%)]" />
        <div className="mt-3 flex justify-around text-sm text-white/70">
          {NODES.map(n => (
            <a key={n.id} href={n.href} className="hover:text-white transition">
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
