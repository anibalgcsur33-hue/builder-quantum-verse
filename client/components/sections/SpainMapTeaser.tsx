export default function SpainMapTeaser(){
  return (
    <section className="section bg-black/30 border-t border-white/10">
      <div className="container-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">España & Canarias — Mapa vivo</h3>
        <div className="glass rounded-2xl ring-glow p-4 relative overflow-hidden scanlines">
          <div className="relative h-80 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(57,199,255,.12),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(167,139,250,.14),transparent_60%)]">
            <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full opacity-80">
              <path d="M60,120 L140,90 L230,110 L310,80 L390,100 L470,95 L520,120 L500,150 L420,160 L350,150 L290,180 L220,170 L150,160 L100,140 Z"
                fill="none" stroke="#67e8f9" strokeWidth="2" />
              {[
                [70,220],[95,235],[115,228],[135,238],
                [150,230],[165,240],[180,232],[195,236] // 8 islas (La Graciosa incluida)
              ].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="3" fill={i===0?"#a78bfa":"#67e8f9"} />))}
              <path d="M350,120 C400,70 500,70 520,120" className="path-dash" stroke="#a78bfa" strokeWidth="1.6" fill="none" />
              <path d="M230,150 C260,120 300,100 350,120" className="path-dash" stroke="#67e8f9" strokeWidth="1.6" fill="none" />
              <path d="M120,170 C110,190 95,205 80,215" className="path-dash" stroke="#67e8f9" strokeWidth="1.6" fill="none" />
              <path d="M170,180 C160,200 140,215 115,230" className="path-dash" stroke="#a78bfa" strokeWidth="1.6" fill="none" />
            </svg>
            <div className="absolute left-[62%] top-[30%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" title="Barcelona" />
            <div className="absolute left-[35%] top-[45%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" title="Madrid" />
            <div className="absolute left-[25%] top-[55%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" title="Sevilla" />
            <div className="absolute left-[18%] top-[78%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_10px_#a78bfa]" title="Canarias" />
            <div className="absolute bottom-3 right-4 text-xs text-white/60">Trayectorias simuladas · demo visual</div>
          </div>
        </div>
      </div>
    </section>
  );
}
