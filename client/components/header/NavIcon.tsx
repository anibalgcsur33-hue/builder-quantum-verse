import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function NavIcon({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.03 }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-700/80 hover:bg-slate-600/80
                 border border-slate-600/50 text-white/90 hover:text-white
                 transition-all duration-200 cursor-pointer shadow-lg"
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}
