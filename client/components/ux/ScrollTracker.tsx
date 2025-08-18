import { useEffect, useRef } from "react";

export default function ScrollTracker() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const on = () => {
      const h = document.documentElement;
      const p = (h.scrollTop) / (h.scrollHeight - h.clientHeight || 1);
      el.style.setProperty("--p", p.toString());
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  return <div ref={ref} className="scroll-track"></div>;
}
