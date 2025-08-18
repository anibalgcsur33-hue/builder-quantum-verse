import { motion } from "framer-motion";
import { Crown } from "lucide-react";

type Props = { className?: string; text?: string };

export default function CrownBadge({
  className = "",
  text = "INVITATION ONLY • ULTRA HIGH NET WORTH",
}: Props) {
  return (
    <motion.div
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 ${className}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Halo */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400/25 via-violet-400/20 to-cyan-400/25 blur-md" />
      {/* Borde prisma */}
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(59,130,246,.25),rgba(147,51,234,.25),rgba(59,130,246,.25))] [mask-composite:exclude] [mask-image:radial-gradient(farthest-side,black_98%,transparent_100%)]" />
      {/* Cuerpo */}
      <div className="relative z-10 flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 backdrop-blur-xl ring-1 ring-white/10">
        <span className="text-[11px] tracking-[.18em] font-semibold text-white/80">
          {text}
        </span>
        <motion.span
          aria-hidden
          className="i-lucide-crown text-cyan-300/80"
          initial={{ rotate: -8 }}
          animate={{ rotate: [-8, 6, -8] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Brillo en barrido (shimmer) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ mixBlendMode: "overlay" }}
      />
    </motion.div>
  );
}
