import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type BlueEyeLogoProps = {
  /** Ruta del PNG transparente del logo */
  src: string;
  /** Tamaño del logo (ej: 120, 160) */
  size?: number;
  /** Etiqueta/brand que aparece a la derecha (opcional) */
  label?: string;
  /** Enlace al hacer click (opcional) */
  href?: string;
  /** Intensidad del brillo (0–1) */
  glow?: number;
  className?: string;
};

export default function BlueEyeLogo({
  src,
  size = 140,
  label = "BlueEye Homes",
  href,
  glow = 0.9,
  className = "",
}: BlueEyeLogoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Seguimiento del cursor respecto al contenedor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [ -60, 60 ], [ 8, -8 ]);
  // leve parallax X/Y
  const ry = useTransform(mx, [ -60, 60 ], [ -8, 8 ]);

  // Gradiente que "mira" al cursor (iris holográfico)
  const gx = useTransform(mx, (v) => `calc(50% + ${v / 6}px)`);
  const gy = useTransform(my, (v) => `calc(50% + ${v / 6}px)`);

  // Pulso del halo (se amplifica en hover)
  const haloScale = useTransform(mx, [-60, 0, 60], [0.98, 1, 0.98]);
  const haloOpacity = useTransform(my, [-60, 0, 60], [0.6, 0.9, 0.6]);

  // Actualiza motion values con la posición del cursor
  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  };

  // Reset cuando el mouse sale
  const onLeave = () => {
    mx.set(0); my.set(0);
    setHover(false);
  };

  // Wrapper (link opcional)
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    href ? (
      <a href={href} aria-label={label} className="inline-block">{children}</a>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative inline-flex items-center gap-4 ${className}`}
      >
        {/* Halo/aurora detrás del logo */}
        <motion.div
          aria-hidden
          style={{ scale: haloScale, opacity: haloOpacity }}
          className="absolute -inset-6 -z-10 rounded-3xl blur-2xl"
        />
        {/* el halo real se pinta con CSS var() para poder animar intensidad */}
        <style>{`
          .be-halo {
            background:
              radial-gradient(120px 120px at 50% 50%,
                rgba(59, 209, 255, ${0.55 * glow}) 0%,
                rgba(168, 85, 247, ${0.35 * glow}) 35%,
                rgba(15, 23, 42, 0) 70%);
            filter: saturate(1.2);
          }
        `}</style>
        <motion.div className="be-halo absolute -inset-10 -z-10 rounded-[28px]" />

        {/* Capa reactiva del iris (gradiente que sigue al cursor) */}
        <motion.div
          aria-hidden
          className="absolute -inset-2 -z-0 rounded-2xl"
          style={{
            background: "radial-gradient(120px 120px at var(--gx) var(--gy), rgba(56,189,248,0.35), rgba(99,102,241,0.18) 45%, transparent 70%)",
            // @ts-ignore — definimos custom properties para el gradiente
            ["--gx" as any]: gx,
            ["--gy" as any]: gy,
          }}
        />

        {/* Logo principal */}
        <motion.img
          src={src}
          width={size}
          height={size}
          alt={label}
          draggable={false}
          initial={{ scale: 0.92, opacity: 0, filter: "blur(6px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="select-none will-change-transform drop-shadow-[0_0_24px_rgba(56,189,248,0.55)]"
          style={{
            filter: `drop-shadow(0 0 22px rgba(56,189,248,${0.55 * glow})) drop-shadow(0 0 12px rgba(168,85,247,${0.35 * glow}))`,
          }}
          whileHover={{ scale: 1.03 }}
        />

        {/* Pulso del iris (círculo concéntrico animado) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center"
          animate={{ scale: hover ? [1, 1.08, 1] : 1, opacity: hover ? [0.65, 0.9, 0.65] : 0.55 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="rounded-full"
            style={{
              width: size * 0.62,
              height: size * 0.62,
              boxShadow: `
                0 0 0 2px rgba(56,189,248,0.25),
                inset 0 0 28px rgba(56,189,248,0.35),
                0 0 64px rgba(168,85,247,0.35)
              `,
            }}
          />
        </motion.div>

        {/* Splash/ondas al hover (muy sutil y performante) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.18), rgba(168,85,247,0.18), transparent 60%)",
            filter: "blur(22px)",
          }}
        />

        {/* Wordmark / texto de marca */}
        {label && (
          <motion.span
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-white/90 font-semibold tracking-tight text-xl md:text-2xl"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </Wrapper>
  );
}
