import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import BlueEyeLogo from "./../../BlueEyeLogo";

/**
 * Hero con:
 * - H1 con "displacement" vía SVG filter (ondas líquidas)
 * - Sheen dinámico al mover el mouse
 * - Subtítulo premium y CTAs
 */
export default function LiquidHero() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const rot = useTransform(mx, [0, 1], [-6, 6]);
  const glowX = useTransform(mx, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(my, [0, 1], ["10%", "90%"]);

  return (
    <section className="relative overflow-hidden">
      {/* Sheen/halo móvil */}
      <motion.div
        className="pointer-events-none absolute h-[55vmin] w-[55vmin] rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle,#00e5ff66,transparent_60%)]"
        style={{ left: glowX, top: glowY, translateX: "-50%", translateY: "-50%" }}
      />
      <svg className="absolute invisible">
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        {/* BlueEye Logo */}
        <div className="flex justify-center mb-8">
          <BlueEyeLogo
            src="/assets/BLUEYELOGO.png"
            size={160}
            label=""
            href="/"
            glow={0.95}
            className="transform-gpu"
          />
        </div>

        <motion.h1
          style={{ rotateZ: rot, filter: "url(#liquid)" as any }}
          className="text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] font-black tracking-tight"
        >
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            El futuro del real estate de lujo
          </span>
          <br />
          <span className="text-white">empieza aquí</span>
        </motion.h1>

        <p className="mt-6 max-w-2xl text-white/70">
          Experiencias inmersivas, inversión inteligente y acceso a un metaverso inmobiliario real. VR, AR y
          Concierge IA, todo en una sola plataforma.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="#vr" className="btn-sheen">Explorar en VR</a>
          <a href="#props" className="rounded-xl px-5 py-3 border border-white/15 hover:bg-white/10 transition">
            Ver propiedades
          </a>
        </div>
      </div>
    </section>
  );
}
