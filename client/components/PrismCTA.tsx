import { motion } from "framer-motion";

type Props = { href?: string; label?: string; className?: string };

export default function PrismCTA({
  href = "/invite",
  label = "Solicitar invitación",
  className = "",
}: Props) {
  const Button = (
    <motion.button
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative inline-flex items-center gap-2 rounded-xl px-5 py-3 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* capa prisma/borde */}
      <span className="absolute -inset-px rounded-[14px] bg-[conic-gradient(from_210deg,rgba(56,189,248,.35),rgba(167,139,250,.35),rgba(56,189,248,.35))] opacity-80"></span>
      {/* base cristal */}
      <span className="relative z-10 rounded-[12px] bg-slate-900/70 px-4 py-2 text-base font-semibold text-white/90 backdrop-blur-xl ring-1 ring-white/10">
        {label}
      </span>
      {/* destellos */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ mixBlendMode: "overlay" }}
      />
      <span
        aria-hidden
        className="absolute -z-10 inset-0 rounded-[16px] blur-2xl bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-cyan-500/20"
      />
    </motion.button>
  );

  return href ? (
    <a href={href} className="inline-block">{Button}</a>
  ) : (
    Button
  );
}
