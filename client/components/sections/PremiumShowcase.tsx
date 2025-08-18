const items = [
  {
    id: 1,
    title: "Villa Oceanfront Elite",
    location: "Marbella, Costa del Sol",
    price: "€4.2M",
  },
  {
    id: 2,
    title: "Penthouse Sky Tower",
    location: "Barcelona, Eixample",
    price: "€3.8M",
  },
  {
    id: 3,
    title: "Mansion Heritage",
    location: "Madrid, La Moraleja",
    price: "€5.1M",
  },
  {
    id: 4,
    title: "Villa Paradise Island",
    location: "Tenerife, Canarias",
    price: "€2.9M",
  },
];

export default function PremiumShowcase() {
  return (
    <section className="section">
      <div className="container-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          Selección premium
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <article
              key={it.id}
              className="group glass p-4 rounded-2xl ring-glow transition hover:-translate-y-1"
            >
              <div className="h-40 rounded-xl bg-[conic-gradient(at_20%_20%,#1f2937,#0b1220)] group-hover:scale-[1.02] transition" />
              <div className="mt-4">
                <div className="text-white/90 font-semibold">{it.title}</div>
                <div className="text-white/60 text-sm">{it.location}</div>
                <div className="mt-2 text-cyan-300 font-bold">{it.price}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="btn-crystal text-sm flex items-center gap-1 hover:scale-105 transition-transform"
                  onClick={() => window.alert(`🎯 Demo Tour 360° para ${it.title}`)}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  Tour 360
                </button>
                <button
                  className="btn-ghost text-sm flex items-center gap-1 hover:scale-105 transition-transform"
                  onClick={() => window.alert(`🤖 IA Concierge disponible para ${it.title}`)}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                  </svg>
                  IA Demo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
