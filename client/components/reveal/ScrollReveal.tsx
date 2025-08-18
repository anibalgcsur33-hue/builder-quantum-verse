import { useEffect, useRef } from "react";
import { motion, useAnimation, VariantLabels } from "framer-motion";

export function useInViewOnce<T extends HTMLElement>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T | null>(null);
  const ctrl = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen) {
            seen = true;
            ctrl.start("show");
            io.disconnect();
          }
        });
      },
      { root: null, rootMargin: margin, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ctrl, margin]);

  return { ref, ctrl };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Record<string, VariantLabels | any>;
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
  },
}: RevealProps) {
  const { ref, ctrl } = useInViewOnce<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={ctrl}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
