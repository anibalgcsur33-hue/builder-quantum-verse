import PremiumHeader from "../components/header/PremiumHeader";
import NeuralField from "../components/future/NeuralField";
import LiquidHero from "../components/future/LiquidHero";
import MetricsPanel from "../components/future/MetricsPanel";
import NeuralNav from "../components/future/NeuralNav";
import ARSmartButton from "../components/future/ARSmartButton";
import PropertyGrid from "../components/property/PropertyGrid";
import ScrollTracker from "../components/ux/ScrollTracker";
import StickyCTA from "../components/ux/StickyCTA";

export default function LiquidHome() {
  return (
    <>
      <ScrollTracker />
      <div className="min-h-screen bg-gradient-to-b from-blue-dark via-purple-900 to-black relative overflow-x-hidden">
        {/* Neural Field Background */}
        <NeuralField
          density={0.00025}
          colorA="#67e8f9"
          colorB="#a78bfa"
          className="opacity-90"
        />

        <PremiumHeader />

        <main>
          {/* Liquid Hero Section */}
          <LiquidHero />

          {/* Metrics Panel */}
          <MetricsPanel />

          {/* Neural Navigation */}
          <NeuralNav />

          {/* AR Smart Button Section */}
          <section className="py-12">
            <div className="flex justify-center">
              <ARSmartButton />
            </div>
          </section>

          {/* Properties Grid */}
          <PropertyGrid />

          {/* Additional Future Components Section */}
          <section className="relative py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Futuro Inmobiliario</h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Tecnologías avanzadas que transforman la experiencia de compra y inversión inmobiliaria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-bold text-white mb-2">IA Predictiva</h3>
                  <p className="text-white/70">Algoritmos que predicen tendencias del mercado y oportunidades de inversión</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">🌐</div>
                  <h3 className="text-xl font-bold text-white mb-2">Metaverso Inmobiliario</h3>
                  <p className="text-white/70">Espacios virtuales donde explorar propiedades en tiempo real</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">🔗</div>
                  <h3 className="text-xl font-bold text-white mb-2">Blockchain Verificado</h3>
                  <p className="text-white/70">Transparencia total en transacciones y verificación de propiedades</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <StickyCTA />
    </>
  );
}
