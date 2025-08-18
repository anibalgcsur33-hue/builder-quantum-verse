import { useState } from "react";
import { motion } from "framer-motion";
import DemoModal from "./DemoModal";

export function VRDemoCTA({ className = "" }: { className?: string }) {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
        <motion.button
          onClick={() => setDemoOpen(true)}
          className="px-6 py-3 bg-cyan-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-cyan-400/30 hover:bg-cyan-500/80 transition-all"
          whileHover={{ scale: 1.05, willChange: "transform" }}
          whileTap={{ scale: 0.95 }}
        >
          📺 Ver demo VR
        </motion.button>

        <motion.button
          onClick={() => setDemoOpen(true)}
          className="px-6 py-3 bg-yellow-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-yellow-400/30 hover:bg-yellow-500/80 transition-all"
          whileHover={{ scale: 1.05, willChange: "transform" }}
          whileTap={{ scale: 0.95 }}
        >
          ⚡ Demo rápida
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-orange-600/80 backdrop-blur-md text-white font-medium rounded-xl border border-orange-400/30 hover:bg-orange-500/80 transition-all"
          whileHover={{ scale: 1.05, willChange: "transform" }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 Ver propiedades
        </motion.button>
      </div>

      <DemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Tour VR — Villa Horizonte"
        imgUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
      />
    </>
  );
}
