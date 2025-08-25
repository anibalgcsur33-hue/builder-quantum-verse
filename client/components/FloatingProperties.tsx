import React, { useState } from "react";

// =========================================
// Floating Properties Section (Featured variant)
// =========================================
export default function FloatingProperties() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const Icon = ({
    type,
  }: {
    type: "villa" | "isle" | "penthouse" | "yacht";
  }) => {
    const base = "h-4 w-4 inline-block align-[-2px]";
    switch (type) {
      case "villa":
        return (
          <svg viewBox="0 0 24 24" className={base}>
            <path
              fill="currentColor"
              d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"
            />
          </svg>
        );
      case "isle":
        return (
          <svg viewBox="0 0 24 24" className={base}>
            <path
              fill="currentColor"
              d="M12 3c3.866 0 7 3.134 7 7 0 1.8-.67 3.444-1.77 4.69L12 21l-5.23-6.31A6.98 6.98 0 0 1 5 10c0-3.866 3.134-7 7-7z"
            />
          </svg>
        );
      case "penthouse":
        return (
          <svg viewBox="0 0 24 24" className={base}>
            <path fill="currentColor" d="M4 20V9l8-5 8 5v11h-5v-6H9v6H4z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className={base}>
            <path
              fill="currentColor"
              d="M3 16s3-2 9-2 9 2 9 2-3 5-9 5-9-5-9-5zm9-9a4 4 0 110 8 4 4 0 010-8z"
            />
          </svg>
        );
    }
  };

  const items = [
    {
      title: "Villa Flotante en el Cielo",
      tag: "Sky Villa",
      icon: "villa" as const,
      img: "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/Villa%20Flotante.png",
      quote: "Vive más allá de la gravedad.",
      desc: "Una residencia suspendida en las nubes, donde el lujo se fusiona con la eternidad del horizonte.",
    },
    {
      title: "Isla Privada Nebula",
      tag: "Private Isle",
      icon: "isle" as const,
      img: "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/Isla_Nebula.png",
      quote: "Tu refugio en el cosmos.",
      desc: "Una isla holográfica rodeada de nebulosas estelares, diseñada para quienes buscan privacidad en el universo.",
    },
    {
      title: "Penthouse Holográfico",
      tag: "Penthouse",
      icon: "penthouse" as const,
      img: "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/Penthouse_Holo.png",
      quote: "El futuro a tus pies.",
      desc: "Un ático brillante en el skyline del metaverso, donde cada rincón refleja innovación y exclusividad.",
    },
    {
      title: "Yate Grav‑Zero",
      tag: "Superyate",
      icon: "yacht" as const,
      img: "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/Yate_Grav_Zero.png",
      quote: "Navega sin límites.",
      desc: "La joya de los mares cuánticos: un yate antigravedad que flota sobre las estrellas, redefiniendo la libertad.",
    },
  ];

  return (
    <section className="relative mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-6 text-center text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
          PROPIEDADES FLOTANTES DESTACADAS
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((card, i) => (
            <div
              key={i}
              className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_120px_rgba(120,225,255,0.25)]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.07] group-hover:brightness-110 group-hover:drop-shadow-[0_0_36px_rgba(120,225,255,0.45)]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, rgba(120,225,255,.1) 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, rgba(255,106,213,.1) 0 1px, transparent 1px 8px)`,
                  }}
                />
              </div>
              {/* TEXT BELOW */}
              <div className="p-4 border-t border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] text-white/80">
                  <Icon type={card.icon} />
                  <span className="rounded-full border border-white/20 bg-black/40 px-2 py-0.5">
                    {card.tag}
                  </span>
                </div>
                <div className="mt-2 text-lg font-semibold">{card.title}</div>
                <div className="mt-1 text-[13px] italic text-white/85">
                  "{card.quote}"
                </div>
                <div className="mt-1 text-[12px] text-white/80">
                  {card.desc}
                </div>
                <button
                  onClick={() =>
                    setSelectedMessage(
                      "No buscamos clientes. Buscamos elegidos.",
                    )
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm text-[#78e1ff] hover:text-[#aee7ff]"
                >
                  <span>Ver detalles</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <path
                      fill="currentColor"
                      d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedMessage && (
          <div className="mt-10 text-center text-xl font-bold text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            {selectedMessage}
          </div>
        )}
      </div>
    </section>
  );
}
