import { useEffect, useRef } from "react";

export default function CursorAurora() {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const pos = useRef({ x: target.current.x, y: target.current.y });
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(tick);
    const isTouch = "ontouchstart" in window;
    if (isTouch) el.style.display = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={ref} className="aurora" aria-hidden="true" />;
}
