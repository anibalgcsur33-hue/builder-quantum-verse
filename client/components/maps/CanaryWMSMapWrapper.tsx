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

// Sample property pins for demonstration
const PROPERTY_PINS = [
  { id: 1, name: "Villa Oceánica", lat: 28.45, lng: -16.25, price: "€4.2M" },
  { id: 2, name: "Penthouse Elite", lat: 28.12, lng: -15.43, price: "€3.8M" },
  { id: 3, name: "Cliff Resort", lat: 27.98, lng: -15.60, price: "€5.1M" },
  { id: 4, name: "Marina Loft", lat: 28.96, lng: -13.55, price: "€2.9M" },
  { id: 5, name: "Desert Villa", lat: 28.35, lng: -14.05, price: "€3.5M" },
];

export default function CanaryWMSMapWrapper() {
  return (
    <div className="map-3d-container">
      <div className="map-tilt">
        <Suspense fallback={<LoadingFallback />}>
          <CanaryWMSMap />
        </Suspense>

        {/* Property pins overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {PROPERTY_PINS.map((pin) => (
            <div
              key={pin.id}
              className="property-pin pointer-events-auto"
              style={{
                // Convert lat/lng to approximate pixel positions (simplified)
                left: `${((pin.lng + 18.5) / 5.4) * 100}%`,
                top: `${((29.6 - pin.lat) / 2.2) * 100}%`,
              }}
              title={`${pin.name} - ${pin.price}`}
            >
              <div className="parallax-label absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {pin.name}
                <div className="text-cyan-300 text-xs">{pin.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
