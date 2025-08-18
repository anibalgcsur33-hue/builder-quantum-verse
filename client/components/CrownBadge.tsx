import { motion } from "framer-motion";

type Props = {
  className?: string;
};

export default function CrownBadge({ className = "" }: Props) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-full border border-amber-400/30 backdrop-blur-md ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, willChange: "transform" }}
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
