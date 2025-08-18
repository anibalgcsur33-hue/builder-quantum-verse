import React from "react";

export default function HeroBlueEye() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-purple-900/50 to-blue-dark/80 z-0" />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-neon-teal/10 rounded-full blur-3xl animate-pulse -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48" />
        <div className="absolute w-64 h-64 bg-neon-emerald/5 rounded-full blur-2xl animate-bounce top-1/2 left-1/4" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
        {/* Hero title */}
        <div className="mb-8">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient">BlueEye</span>
            <br />
            <span className="text-white">Homes</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            El futuro de los bienes raíces en el metaverso.
            Propiedades reales verificadas con experiencias inmersivas en VR.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neon-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Propiedades Verificadas</h3>
            <p className="text-white/70 text-sm">Inmuebles reales validados por notario</p>
          </div>

          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Tours VR</h3>
            <p className="text-white/70 text-sm">Visitas inmersivas en realidad virtual</p>
          </div>

          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neon-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">IA Asistente</h3>
            <p className="text-white/70 text-sm">Inteligencia artificial personalizada</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="btn-primary px-8 py-4 text-lg font-semibold flex items-center gap-3"
            onClick={() => {
              const propertiesSection = document.querySelector('[data-section="properties"]');
              if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explorar Propiedades
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <button className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center gap-3">
            Ver Demo VR
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9z" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
