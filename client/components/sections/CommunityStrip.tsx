const users = Array.from({ length: 10 }).map((_, i) => `https://api.dicebear.com/7.x/identicon/svg?seed=${i}`);

export default function CommunityStrip() {
  return (
    <section className="section">
      <div className="container-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Comunidad global</h3>
        <div className="glass rounded-2xl p-4 overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee">
            {[...users, ...users].map((u, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <img src={u} className="w-10 h-10 rounded-full ring-2 ring-white/20" alt="avatar" />
                <span className="text-white/70 text-sm">Usuario #{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
