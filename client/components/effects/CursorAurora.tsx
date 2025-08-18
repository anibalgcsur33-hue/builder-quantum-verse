import { useEffect, useRef } from "react";
import { throttle } from "@/utils/throttle";

export default function CursorAurora() {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const pos = useRef({ x: target.current.x, y: target.current.y });
  const raf = useRef(0);
  const isVisible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if touch device or reduced motion preference
    const isTouch = "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouch || prefersReducedMotion) {
      el.style.display = "none";
      return;
    }

    // Throttled mouse move handler
    const move = throttle((e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }, 16); // ~60fps

    // Optimized animation loop
    const tick = () => {
      if (!isVisible.current) return;

      const deltaX = target.current.x - pos.current.x;
      const deltaY = target.current.y - pos.current.y;

      // Only update if there's meaningful movement
      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        pos.current.x += deltaX * 0.12;
        pos.current.y += deltaY * 0.12;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%,-50%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
      if (isVisible.current && raf.current === 0) {
        raf.current = requestAnimationFrame(tick);
      } else if (!isVisible.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={ref} className="aurora" aria-hidden="true" />;
}
