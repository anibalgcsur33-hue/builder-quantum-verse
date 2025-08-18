import { motion } from "framer-motion";

export default function NeuralShowcase(){
  return (
    <section className="section relative">
      <div className="container-xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Conexiones Neurológicas en tiempo real
          </h3>
          <p className="text-white/70">
            Visualizamos la red de preferencias, emociones y señales de mercado como un tejido vivo.
            La IA ajusta las recomendaciones antes de que el usuario lo pida.
          </p>
          <ul className="mt-5 space-y-2 text-white/80 text-sm">
            <li>• Lectura de intención (interacción, foco visual, tiempo)</li>
            <li>• Ajuste dinámico del ranking de propiedades</li>
            <li>• Señalización global de demanda por regiones</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a className="btn-crystal" href="/ai">Probar IA Concierge</a>
            <a className="btn-ghost" href="/whitepaper">Whitepaper</a>
          </div>
        </div>
        <motion.div
          initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}}
          transition={{duration:.6}}
          className="relative h-80 rounded-2xl glass ring-glow overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(103,232,249,0.12),transparent_70%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-cyan-300/50" />
            <div className="absolute w-40 h-40 rounded-full border border-violet-400/40 animate-float" />
            <div className="absolute text-white/60 text-sm bottom-4">Capa visual de red neurológica (demo)</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
