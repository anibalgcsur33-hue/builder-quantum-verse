import { lazy, Suspense } from "react";

// Lazy load the WMS map to handle potential missing dependencies
const CanaryWMSMap = lazy(async () => {
  try {
    const module = await import("./CanaryWMSMap");
    return module;
  } catch (error) {
    console.warn("Leaflet dependencies not available, falling back to placeholder", error);
    // Return a fallback component
    return {
      default: () => (
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,.45)]">
          <div className="h-[68vh] w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mapa WMS Canarias</h3>
              <p className="text-white/70 text-sm">
                Instalando dependencias de Leaflet...<br/>
                <span className="text-xs">npm install leaflet react-leaflet</span>
              </p>
            </div>
          </div>
        </div>
      )
    };
  }
});

const LoadingFallback = () => (
  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,.45)]">
    <div className="h-[68vh] w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white/60">Cargando mapa oficial GRAFCAN...</p>
      </div>
    </div>
  </div>
);

export default function CanaryWMSMapWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CanaryWMSMap />
    </Suspense>
  );
}
