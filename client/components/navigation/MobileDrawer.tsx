import { useState } from "react";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg bg-white/10">☰</button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)}></div>
          <aside className="absolute right-0 top-0 h-full w-80 p-5 mega-glass">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">BlueEye Menu</div>
              <button onClick={() => setOpen(false)} className="px-3 py-1 bg-white/10 rounded">✕</button>
            </div>
            <nav className="space-y-2">
              <a className="mega-link" href="/propiedades">🏡 Propiedades</a>
              <a className="mega-link" href="/metaverse">🛰️ Metaverso</a>
              <a className="mega-link" href="/community">👥 Comunidad</a>
              <a className="mega-link" href="/invite">✨ Solicitar invitación</a>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
