import { motion } from "framer-motion";

type Props = {
  className?: string;
};

export default function CrownBadge({ className = "" }: Props) {
  return (
    <motion.div
      className={`inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-600/90 to-yellow-600/90 rounded-lg border border-amber-500/60 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, willChange: "transform" }}
    >
      <motion.span
        className="text-xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        👑
      </motion.span>
      <span className="text-amber-200 font-semibold text-sm">
        Portal Premium
      </span>
    </motion.div>
  );
}
