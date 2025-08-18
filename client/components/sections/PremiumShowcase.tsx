const items = [
  {
    id: 1,
    title: "Villa Oceanfront Elite",
    location: "Marbella, Costa del Sol",
    price: "€4.2M"
  },
  {
    id: 2,
    title: "Penthouse Sky Tower",
    location: "Barcelona, Eixample",
    price: "€3.8M"
  },
  {
    id: 3,
    title: "Mansion Heritage",
    location: "Madrid, La Moraleja",
    price: "€5.1M"
  },
  {
    id: 4,
    title: "Villa Paradise Island",
    location: "Tenerife, Canarias",
    price: "€2.9M"
  }
];

export default function PremiumShowcase() {
  return (
    <section className="section">
      <div className="container-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">Selección premium</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(it => (
            <article key={it.id} className="group glass p-4 rounded-2xl ring-glow transition hover:-translate-y-1">
              <div className="h-40 rounded-xl bg-[conic-gradient(at_20%_20%,#1f2937,#0b1220)] group-hover:scale-[1.02] transition" />
              <div className="mt-4">
                <div className="text-white/90 font-semibold">{it.title}</div>
                <div className="text-white/60 text-sm">{it.location}</div>
                <div className="mt-2 text-cyan-300 font-bold">{it.price}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <a className="btn-crystal text-sm" href="/tour">Tour 360</a>
                <a className="btn-ghost text-sm" href="/ai">Hablar con IA</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
