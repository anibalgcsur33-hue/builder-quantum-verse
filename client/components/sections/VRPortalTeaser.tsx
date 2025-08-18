export default function VRPortalTeaser() {
  return (
    <section className="section">
      <div className="container-xl grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Portal VR (teaser)</h3>
          <p className="text-white/70">
            Vista previa ligera del efecto de portal. La versión completa integra modelos FBX/GLB y control de cámara.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn-crystal" href="/metaverse">Entrar al Metaverso</a>
            <a className="btn-ghost" href="/docs">Ver documentación</a>
          </div>
        </div>
        <div className="relative h-72 glass ring-glow rounded-2xl overflow-hidden flex items-center justify-center">
          <div 
            className="relative w-56 h-56 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(57,199,255,.6), rgba(167,139,250,.6), rgba(57,199,255,.6))",
              filter: "blur(0.5px)"
            }}
          >
            <div className="absolute inset-3 rounded-full bg-black/70 backdrop-blur-xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 text-sm">Efecto portal animado (CSS)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
