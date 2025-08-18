import { motion } from "framer-motion";

export default function HologramCard({
  title="Villa Mirador — Tenerife",
  price="€7.9M",
  image="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/5 backdrop-blur-md"
    >
      <div className="relative h-72">
        <img src={image} alt={title} className="h-full w-full object-cover opacity-90" />
        {/* hologram lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_96%,#00ffff22_100%)] bg-[length:100%_4px] mix-blend-screen pointer-events-none" />
        {/* sheen */}
        <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_30%_10%,#00e5ff33,transparent_30%,#7c5cff33_60%,transparent_75%)] animate-[spin_6s_linear_infinite] opacity-30" />
      </div>
      <div className="p-5">
        <div className="text-white/80 text-sm">{title}</div>
        <div className="text-xl font-semibold">{price}</div>
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-500/25 transition">
            Ver en VR
          </button>
          <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            Dossier IA
          </button>
        </div>
      </div>
    </motion.div>
  );
}
