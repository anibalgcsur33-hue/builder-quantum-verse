import React from "react";
import { Eye } from "lucide-react";

export default function HeroBlueEye() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background gradient similar al original */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-purple-900/50 to-blue-dark/80 z-0" />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-neon-teal/10 rounded-full blur-3xl animate-pulse -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48" />
        <div className="absolute w-64 h-64 bg-neon-emerald/5 rounded-full blur-2xl animate-bounce top-1/2 left-1/4" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
        {/* Logo BlueEye con efecto glow */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Logo circular con efecto glow */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-blue-dark to-purple-900 rounded-full flex items-center justify-center border border-neon-teal/30">
                <Eye className="w-16 h-16 text-neon-teal" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hero title como en la imagen */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">El futuro del real estate de lujo</span>
            <br />
            <span className="text-white">empieza aquí</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Acceso a un metaverso inmobiliario real y seguro con IA.
          </p>
        </div>

        {/* CTA buttons como en la imagen */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center gap-3">
            <Eye className="w-5 h-5" />
            Ver demo VR
          </button>

          <button className="btn-primary px-8 py-4 text-lg font-semibold flex items-center gap-3">
            ⚡ Demo rápida
          </button>

          <button
            className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center gap-3"
            onClick={() => {
              const propertiesSection = document.querySelector('[data-section="properties"]');
              if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            🏠 Ver propiedades
          </button>
        </div>

        {/* Stats o información adicional */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm">
          <div className="text-center">
            <p className="text-white/60">Cliente en Alemania reservó un ático en Tenerife por</p>
            <p className="text-neon-teal font-bold text-lg">€3.2M</p>
          </div>
          <div className="text-center">
            <p className="text-white/60">Inversor UK pidió dossier de villa en Ibiza (ROI 7.4%)</p>
          </div>
          <div className="text-center">
            <p className="text-white/60">Nueva propiedad verificada en Marbella agregada al mapa</p>
          </div>
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
