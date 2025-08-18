import CountUp from "react-countup";

const stats = [
  { label: "Miembros UHNW", value: 12450, suffix: "+" },
  {
    label: "Volumen gestionado",
    value: 2100000000,
    prefix: "€",
    formatter: (n: number) => `€${(n / 1e9).toFixed(1)}B`,
  },
  { label: "Países activos", value: 18, suffix: "" },
  { label: "Propiedades verificadas", value: 3800, suffix: "+" },
];

export default function InvestorStatsAlternate() {
  return (
    <section className="section bg-[#0e1628]">
      <div className="container-xl">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Confianza de inversores
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass p-6 rounded-2xl ring-glow text-center"
            >
              <div className="text-3xl md:text-4xl font-black">
                {"formatter" in s && typeof s.formatter === "function" ? (
                  <span>{(s as any).formatter(s.value)}</span>
                ) : (
                  <>
                    <CountUp end={s.value} duration={2.2} separator="," />
                    {s.suffix}
                  </>
                )}
              </div>
              <div className="mt-1 text-white/70 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
