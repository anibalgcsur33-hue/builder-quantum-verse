import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, ChevronDown } from "lucide-react";

type Item = { name: string; href: string; desc: string; emoji?: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Compra",
    items: [
      {
        name: "Villas de Lujo",
        href: "/propiedades?tipo=villa",
        desc: "Costa, golf & frontline mar",
        emoji: "🏝️",
      },
      {
        name: "Áticos & Penthouses",
        href: "/propiedades?tipo=atico",
        desc: "Vistas panorámicas 360°",
        emoji: "🏙️",
      },
      {
        name: "Obra Nueva",
        href: "/obra-nueva",
        desc: "Promociones con VR",
        emoji: "🧱",
      },
      {
        name: "Verificadas",
        href: "/verificadas",
        desc: "Título y registro auditados",
        emoji: "✅",
      },
    ],
  },
  {
    title: "Rentabilidad",
    items: [
      {
        name: "Vacacional",
        href: "/alquilar?vacacional=1",
        desc: "ROI por noche + ocupación",
        emoji: "🛎️",
      },
      {
        name: "Larga Estancia",
        href: "/alquilar?larga=1",
        desc: "Estabilidad y yield anual",
        emoji: "📈",
      },
      {
        name: "Off-market",
        href: "/off-market",
        desc: "Acceso privado UHNW",
        emoji: "🔒",
      },
    ],
  },
  {
    title: "Experiencias",
    items: [
      {
        name: "Metaverso 3D",
        href: "/metaverse",
        desc: "Mapa 3D + visitas inmersivas",
        emoji: "🛰️",
      },
      {
        name: "AR en tu salón",
        href: "/ar",
        desc: "Prueba a escala real",
        emoji: "🥽",
      },
      {
        name: "Concierge IA",
        href: "/assistant",
        desc: "Dossier + agenda + firma",
        emoji: "🤖",
      },
    ],
  },
];

export default function MegaNav() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Cierra si se hace click fuera
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div
      className="relative"
      ref={boxRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.button
        whileHover={{ y: -2, scale: 1.03 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-700/80 hover:bg-slate-600/80
                   border border-slate-600/50 text-white/90 hover:text-white
                   transition-all duration-200 cursor-pointer shadow-lg"
        onClick={() => setOpen((v) => !v)}
      >
        <Building2 className="w-5 h-5 text-cyan-300" />
        <span className="text-sm font-medium">Propiedades</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </motion.button>

      {(open || hover) && (
        <div className="absolute left-0 mt-3 w-[780px] p-4 rounded-2xl mega-glass">
          <div className="grid grid-cols-3 gap-6">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="text-white/70 text-xs uppercase tracking-widest mb-2">
                  {g.title}
                </div>
                <ul className="space-y-1">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <a className="mega-link" href={it.href}>
                        <span className="text-lg">{it.emoji ?? "•"}</span>
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div
                            className="text-xs text-white/60"
                            dangerouslySetInnerHTML={{ __html: it.desc }}
                          ></div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Lateral de highlight */}
            <div className="col-span-3 mt-2 p-3 rounded-xl bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-violet-500/10 border border-white/10">
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="text-white/80 text-sm">
                  🔎 ¿Buscas algo específico? Prueba el filtro por ROI, vistas
                  al mar y certificación.
                </div>
                <a
                  href="/busqueda"
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
                >
                  Abrir buscador avanzado
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
