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
        {/* Mapa 3D Neurológico de Islas Canarias */}
        <div className="mb-12">
          <div className="relative w-full max-w-4xl mx-auto h-96 lg:h-[500px]">
            {/* Contenedor del mapa neurológico */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-blue-800/60 rounded-3xl shadow-glass overflow-hidden border border-neon-teal/20">

              {/* Efecto de red neurológica de fondo */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gradient-neural)" strokeWidth="0.5" opacity="0.6"/>
                    </pattern>
                    <linearGradient id="gradient-neural" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0EE7E7" />
                      <stop offset="100%" stopColor="#00E7A7" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
              </div>

              {/* Islas Canarias - Representación Neurológica */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Tenerife - Isla Principal */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-20 h-16 bg-gradient-to-br from-neon-teal/80 to-neon-emerald/60 rounded-full animate-pulse shadow-neon-teal/50 shadow-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">TF</span>
                    </div>
                    <div className="absolute -inset-4 border border-neon-teal/30 rounded-full animate-ping"></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                      <span className="text-neon-teal text-xs font-semibold">Tenerife</span>
                    </div>
                  </div>
                </div>

                {/* Gran Canaria */}
                <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-16 h-14 bg-gradient-to-br from-blue-400/80 to-cyan-500/60 rounded-full animate-pulse shadow-blue-400/50 shadow-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xs">GC</span>
                    </div>
                    <div className="absolute -inset-3 border border-blue-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-blue-400 text-xs font-semibold">Gran Canaria</span>
                    </div>
                  </div>
                </div>

                {/* Lanzarote */}
                <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-10 bg-gradient-to-br from-amber-400/80 to-orange-500/60 rounded-full animate-pulse shadow-amber-400/50 shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">LZ</span>
                    </div>
                    <div className="absolute -inset-2 border border-amber-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-amber-400 text-xs font-semibold">Lanzarote</span>
                    </div>
                  </div>
                </div>

                {/* Fuerteventura */}
                <div className="absolute top-1/3 right-1/3 transform translate-x-1/4">
                  <div className="relative">
                    <div className="w-12 h-10 bg-gradient-to-br from-yellow-400/80 to-amber-500/60 rounded-full animate-pulse shadow-yellow-400/50 shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">FV</span>
                    </div>
                    <div className="absolute -inset-2 border border-yellow-400/30 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-yellow-400 text-xs font-semibold">Fuerteventura</span>
                    </div>
                  </div>
                </div>

                {/* La Palma */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-10 h-8 bg-gradient-to-br from-green-400/80 to-emerald-500/60 rounded-full animate-pulse shadow-green-400/50 shadow-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">LP</span>
                    </div>
                    <div className="absolute -inset-1 border border-green-400/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-green-400 text-xs font-semibold">La Palma</span>
                    </div>
                  </div>
                </div>

                {/* La Gomera */}
                <div className="absolute bottom-1/3 left-2/5">
                  <div className="relative">
                    <div className="w-8 h-6 bg-gradient-to-br from-purple-400/80 to-violet-500/60 rounded-full animate-pulse shadow-purple-400/50 shadow-sm flex items-center justify-center">
                      <span className="text-white font-bold text-xs">LG</span>
                    </div>
                    <div className="absolute -inset-1 border border-purple-400/30 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-purple-400 text-xs font-semibold">La Gomera</span>
                    </div>
                  </div>
                </div>

                {/* El Hierro */}
                <div className="absolute bottom-1/4 left-1/5">
                  <div className="relative">
                    <div className="w-7 h-5 bg-gradient-to-br from-red-400/80 to-pink-500/60 rounded-full animate-pulse shadow-red-400/50 shadow-sm flex items-center justify-center">
                      <span className="text-white font-bold text-xs">EH</span>
                    </div>
                    <div className="absolute -inset-1 border border-red-400/30 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <span className="text-red-400 text-xs font-semibold">El Hierro</span>
                    </div>
                  </div>
                </div>

                {/* Conexiones neurológicas entre islas */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0EE7E7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#00E7A7" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Líneas de conexión con animación */}
                  <path d="M 50% 50% L 33% 66%" stroke="url(#connection-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M 50% 50% L 75% 25%" stroke="url(#connection-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                  <path d="M 50% 50% L 25% 25%" stroke="url(#connection-gradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                  <path d="M 50% 50% L 40% 67%" stroke="url(#connection-gradient)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                  <path d="M 50% 50% L 20% 75%" stroke="url(#connection-gradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                </svg>

                {/* Indicador central */}
                <div className="absolute top-4 left-4">
                  <div className="glass-card px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-medium">Red Neurológica Activa</span>
                  </div>
                </div>

                {/* Stats en tiempo real */}
                <div className="absolute bottom-4 right-4">
                  <div className="glass-card px-3 py-1 rounded-full flex items-center gap-2">
                    <Eye className="w-3 h-3 text-neon-emerald" />
                    <span className="text-white text-xs font-medium">7 Islas Conectadas</span>
                  </div>
                </div>
              </div>
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
