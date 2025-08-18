export default function InvestorsCTA() {
  return (
    <section className="section bg-black/30 border-t border-white/10">
      <div className="container-xl grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Invertir con BlueEye
          </h3>
          <p className="text-white/70 mt-3">
            Demos funcionales, métricas claras y un roadmap ambicioso. Acceso
            anticipado para inversores estratégicos.
          </p>
        </div>
        <div className="flex md:justify-end gap-3">
          <a className="btn-crystal" href="/invest">
            Solicitar deck
          </a>
          <a className="btn-ghost" href="/case-studies">
            Ver casos
          </a>
        </div>
      </div>
    </section>
  );
}
