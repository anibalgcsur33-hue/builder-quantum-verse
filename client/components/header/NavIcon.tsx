import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function NavIcon({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.06 }}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 hover:bg-white/6
                 backdrop-blur-md border border-white/10 text-white/80 hover:text-white
                 transition-colors cursor-pointer"
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}
