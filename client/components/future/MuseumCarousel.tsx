import { useRef } from "react";
import { throttle } from "@/utils/throttle";

const ITEMS = [
  {
    id: 1,
    title: "Villa Celeste, Ibiza",
    price: "€12.8M",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Penthouse Marina, Marbella",
    price: "€7.4M",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cliff House, Tenerife",
    price: "€9.9M",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Skyline Loft, Barcelona",
    price: "€5.7M",
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function MuseumCarousel() {
  const wrap = useRef<HTMLDivElement | null>(null);

  const onMove = throttle((e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${-y * 6}deg`);
    el.style.setProperty("--ry", `${x * 8}deg`);
  }, 40);

  return (
    <section id="props" className="mx-auto max-w-7xl px-6 py-14">
      <h3 className="text-2xl font-semibold mb-6">Colección curada</h3>
      <div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={() => {
          if (wrap.current) {
            wrap.current.style.setProperty("--rx", "0deg");
            wrap.current.style.setProperty("--ry", "0deg");
          }
        }}
        className="grid gap-6 md:grid-cols-4 perspective-[1200px]"
        style={{ transformStyle: "preserve-3d" } as any}
      >
        {ITEMS.map((it) => (
          <article
            key={it.id}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            style={{
              transform:
                "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)",
              transition: "transform .25s ease",
            }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={it.img}
                alt={it.title}
                className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-white/60">{it.price}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
