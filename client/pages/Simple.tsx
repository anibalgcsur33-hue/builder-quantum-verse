export default function Simple() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 grid place-items-center">
            <span className="font-black tracking-tight text-cyan-300">BE</span>
          </div>
          <span className="font-semibold text-cyan-200">BlueEye Homes</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <a href="/" className="hover:text-white transition cursor-pointer">Home</a>
          <a href="/propiedades" className="hover:text-white transition cursor-pointer">Propiedades</a>
          <a href="/metaverse" className="hover:text-white transition cursor-pointer">Metaverso</a>
          <a href="/community" className="hover:text-white transition cursor-pointer">Comunidad</a>
        </nav>

        <button className="rounded-full bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-cyan-200 hover:bg-cyan-500/25 transition">
          Solicitar invitación
        </button>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-28">
        <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-cyan-200/90 text-xs tracking-wide">
          INVITATION ONLY • ULTRA HIGH NET WORTH
        </span>

        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-[1.05]">
          El futuro del{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400">
            real estate de lujo
          </span>{" "}
          empieza aquí
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-2xl">
          Explora propiedades en realidad virtual, conecta con una comunidad global
          y descubre tu hogar ideal con la ayuda de nuestra IA avanzada.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition"
          >
            Explorar en VR
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-white/5 transition"
          >
            Ver propiedades
          </a>
        </div>

        {/* Tarjetas rápidas */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-cyan-300 font-semibold">IA Concierge</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Asistente 24/7 para dudas, dossiers y agenda.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-cyan-300 font-semibold">Metaverso 3D</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Mapa inmersivo de España y Canarias con VR.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-cyan-300 font-semibold">Marketplace</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Reformas, legales, seguros y mobiliario premium.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-slate-400 border-t border-white/10">
        © {new Date().getFullYear()} BlueEye Homes — Metaverse Real Estate
      </footer>
    </div>
  );
}
