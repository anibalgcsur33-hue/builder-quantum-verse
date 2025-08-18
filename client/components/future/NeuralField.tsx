import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; };

export default function NeuralField({
  density = 0.00018, // menos = más rápido
  colorA = "#67e8f9",
  colorB = "#a78bfa",
  className = "",
}: { density?: number; colorA?: string; colorB?: string; className?: string; }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = (c.width = c.clientWidth * devicePixelRatio);
    let h = (c.height = c.clientHeight * devicePixelRatio);

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes: Node[] = [];
    const count = Math.max(20, Math.floor(w * h * density / (devicePixelRatio * 2)));

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let mx = w / 2, my = h / 2, hasMouse = false;
    const onMove = (e: MouseEvent) => { hasMouse = true; mx = e.clientX * devicePixelRatio; my = e.clientY * devicePixelRatio; };
    window.addEventListener("mousemove", onMove);

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, colorA);
    grad.addColorStop(1, colorB);

    let lastTS = 0;
    function loop(ts: number) {
      if (stopRef.current) return;
      const dt = Math.min(33, ts - lastTS);
      lastTS = ts;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(11,18,32,0.25)";
      ctx.fillRect(0, 0, w, h);

      // update nodes
      for (const n of nodes) {
        n.x += n.vx * (prefersReduce ? 0.3 : 1);
        n.y += n.vy * (prefersReduce ? 0.3 : 1);
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // leve atracción al mouse
        if (hasMouse) {
          const dx = mx - n.x, dy = my - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 220 * devicePixelRatio) {
            n.vx += (dx / (d + 1)) * 0.02;
            n.vy += (dy / (d + 1)) * 0.02;
          }
        }
      }

      // draw links
      ctx.lineWidth = 1.2 * devicePixelRatio;
      ctx.strokeStyle = grad;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < (140 * devicePixelRatio) ** 2) {
            ctx.globalAlpha = (1 - Math.min(1, d2 / ((140 * devicePixelRatio) ** 2))) * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = "#67e8f9";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }
    const raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = (c.width = c.clientWidth * devicePixelRatio);
      h = (c.height = c.clientHeight * devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    const onVis = () => { /* pausa auto por tab inactiva si quisieras */ };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stopRef.current = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [colorA, colorB, density]);

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
