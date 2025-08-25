import React from "react";

// =========================================
// Golden Call-To-Action Block
// =========================================
export default function GoldenCTA() {
  return (
    <section className="relative mt-24 mb-16">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-3xl p-[2px] shadow-[0_0_40px_rgba(255,215,0,0.35)]"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,223,128,.9), rgba(255,200,64,.9))",
          }}
        >
          <div className="rounded-3xl bg-[#0b0f24]/85 px-8 py-10 backdrop-blur">
            <h3 className="text-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-400 drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]">
              "El verdadero lujo es pertenecer a lo que pocos saben que existe."
            </h3>
            <p className="mt-3 text-center text-base md:text-lg text-white/85">
              Acceso secreto. Comunidad privada. Legado eterno.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl px-7 py-3 text-base md:text-lg font-bold text-[#0b0f24] shadow-[0_15px_50px_rgba(255,200,0,.45)] ring-1 ring-yellow-300/50 bg-gradient-to-b from-yellow-300 via-amber-300 to-amber-500 hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                Contáctanos
              </a>
              <p className="text-center text-lg font-semibold text-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">
                Para saber si has sido Elegido!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
