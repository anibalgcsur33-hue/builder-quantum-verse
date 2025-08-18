import { motion } from "framer-motion";

export default function HolographicConcierge() {
  return (
    <section className="section">
      <div className="container-xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Concierge IA holográfico
          </h3>
          <p className="text-white/70">
            Un asistente 24/7 que comprende tus preferencias y te guía con
            precisión. Genera dossiers PDF, agenda visitas y conecta con
            partners legales.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/ai" className="btn-crystal">
              Hablar con IA
            </a>
            <a href="/demo" className="btn-ghost">
              Ver demo
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-72 rounded-2xl glass ring-glow overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)]" />
          <div className="w-40 h-40 rounded-full border border-cyan-300/60" />
          <div className="absolute w-64 h-64 rounded-full border border-violet-400/40 animate-float" />
          <div className="absolute bottom-4 left-4 text-xs text-white/70">
            Simulación visual del avatar holográfico
          </div>
        </motion.div>
      </div>
    </section>
  );
}
