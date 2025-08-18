import React from "react";
import { Eye, MapPin, Sparkles, Globe } from "lucide-react";

export default function HeroBlueEye() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background gradient según Prompt Maestro */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-purple-900/50 to-blue-dark/80 z-0" />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-neon-teal/10 rounded-full blur-3xl animate-pulse -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48" />
        <div className="absolute w-64 h-64 bg-neon-emerald/5 rounded-full blur-2xl animate-bounce top-1/2 left-1/4" />
      </div>

      {/* Main content según Prompt Maestro */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-20">
        {/* Hero title principal */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">BlueEye Homes</span>
            <br />
            <span className="text-white">Metaverso Inmobiliario</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
            La plataforma inmobiliaria más avanzada que combina Metaverso 3D + IA + Comunidad + Marketplace + Blockchain.
            <br />
            <span className="text-neon-teal font-semibold">Las visitas son virtuales, pero las ventas reales en notaría.</span>
          </p>
        </div>

        {/* Feature highlights según Prompt Maestro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-neon-teal" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mapa 3D España</h3>
            <p className="text-white/70 text-sm">Canarias + Baleares + Península</p>
          </div>

          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">BlueEye AI</h3>
            <p className="text-white/70 text-sm">Dossiers automáticos + Agenda</p>
          </div>

          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-neon-emerald" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tours VR</h3>
            <p className="text-white/70 text-sm">Visitas inmersivas + Avatares</p>
          </div>

          <div className="glass-card p-6 text-center hover-glow-teal">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Token BET</h3>
            <p className="text-white/70 text-sm">Descuentos 10% + Gamificación</p>
          </div>
        </div>

        {/* CTA buttons según Prompt Maestro */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn-primary px-10 py-4 text-lg font-semibold flex items-center gap-3">
            <Globe className="w-6 h-6" />
            Explorar el Metaverso
          </button>

          <button className="btn-secondary px-10 py-4 text-lg font-semibold flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            Publicar un Anuncio
          </button>

          <button className="btn-secondary px-10 py-4 text-lg font-semibold flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Hablar con BlueEye AI
          </button>
        </div>

        {/* Estadísticas en tiempo real según Prompt Maestro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-neon-teal mb-2">2,847</div>
            <p className="text-white/60">Usuarios activos</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-neon-emerald mb-2">1,239</div>
            <p className="text-white/60">Propiedades en metaverso</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">€47M</div>
            <p className="text-white/60">Transacciones verificadas</p>
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
