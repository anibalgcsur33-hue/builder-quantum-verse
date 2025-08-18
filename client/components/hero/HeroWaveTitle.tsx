import { motion } from "framer-motion";
import ShimmerTitle from "../ui/ShimmerTitle";

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

export default function HeroWaveTitle({
  title,
  subtitle,
  className = "",
}: Props) {
  return (
    <div className={`text-center ${className}`}>
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundSize: "200% 200%",
          willChange: "background-position",
        }}
      >
        El futuro del <ShimmerTitle>real estate de lujo</ShimmerTitle>
        <br />
        empieza aquí
      </motion.h1>

      <motion.p
        className="text-lg text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
