import React from "react";
import { TUNABLES } from "../lib/immortal-utils";
import HoloPassport from "../components/HoloPassport";
import FloatingProperties from "../components/FloatingProperties";
import GoldenCTA from "../components/GoldenCTA";

// =========================================
// Page (default export)
// =========================================
export default function MetaverseMap() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(1200px_800px_at_50%_-10%,#1c234d_0%,#0b0f24_40%,#050815_100%)] text-[#eaf3ff]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,225,255,.16),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,106,213,.12),transparent_40%)]" />
        <div
          className={`mx-auto max-w-7xl px-6 ${TUNABLES.heroPadBottom} ${TUNABLES.heroPadTop}`}
        >
          <div
            className={`grid grid-cols-1 items-center ${TUNABLES.heroGap} lg:grid-cols-3`}
          >
            {/* Text */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                Distrito Metaverso de Lujo
                <span className="block text-2xl font-semibold text-[#78e1ff] md:text-3xl">
                  Donde el legado se vuelve inmortal
                </span>
              </h1>
              <p className="mt-4 max-w-[65ch] text-white/80">
                Accede a la única inversión que trasciende el tiempo: un
                pasaporte holográfico cuántico que asegura que tu presencia, tu
                esencia y tus recuerdos vivirán para siempre en el Metaverso. Un
                mundo donde tus seres queridos nunca perderán tu legado.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/marketplace?utm_source=metaverso-page"
                  className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
                >
                  Explorar Marketplace
                </a>
                <a
                  href="/comunidad?utm_source=metaverso-page"
                  className="rounded-xl border border-white/15 bg-[#121838] px-5 py-3 font-semibold hover:bg-[#162062]"
                >
                  Conocer Comunidad
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-white/80">
                <div>
                  <div className="text-2xl font-extrabold">∞</div>
                  <div className="text-xs opacity-80">Legado eterno</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold">3×</div>
                  <div className="text-xs opacity-80">Engagement emocional</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold">KYC/AML</div>
                  <div className="text-xs opacity-80">Compliance integrado</div>
                </div>
              </div>
            </div>

            {/* Logo (derecha) */}
            <div
              className={`flex items-start justify-center lg:justify-end ${TUNABLES.logoShift}`}
            >
              <img
                src="https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/BlueEye_Mundo-Real-removebg-preview%20(1).png"
                alt="BlueEye Homes Logo"
                className={`${TUNABLES.logoMaxW} w-full h-auto ${TUNABLES.logoDropShadow} animate-pulse`}
                loading="lazy"
              />
            </div>
          </div>

          {/* Passports Below */}
          <div className="mt-14 flex flex-col items-center gap-8 lg:mt-16 lg:flex-row lg:justify-center lg:gap-16">
            <HoloPassport
              title="Quantum Immortal Passport"
              subtitle="IA · Mundo Real"
              seed="REAL-IMMORTAL"
              photoUrl={
                "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/blueEyeIA.png"
              }
              variant="REAL"
            />
            <HoloPassport
              title="Quantum Immortal Passport"
              subtitle="IA · Metaverso"
              seed="META-IMMORTAL"
              photoUrl={
                "https://huvzqqtfgidybxmmbdig.supabase.co/storage/v1/object/public/Media/METAVERSO/QuantumIA.png"
              }
              variant="META"
            />
          </div>
        </div>
      </section>

      {/* Floating Properties (featured) */}
      <FloatingProperties />

      {/* Golden CTA */}
      <GoldenCTA />
    </div>
  );
}
