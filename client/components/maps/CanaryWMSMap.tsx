import { MapContainer, TileLayer, WMSTileLayer, ScaleControl, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Centro aproximado de Canarias (lat, lon) y zoom para vista general
const CENTER: [number, number] = [28.35, -15.6];
const ZOOM = 7;

// Limites aproximados (WGS84) para evitar pedir mosaicos fuera de la zona
const BOUNDS = L.latLngBounds([27.4, -18.5], [29.6, -13.1]);

export default function CanaryWMSMap() {
  // Solución visual para que los WMS se vean muy nítidos en pantallas retina
  useEffect(() => {
    (L as any).Retina = true;
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,.45)]">
      <MapContainer
        center={CENTER}
        zoom={ZOOM}
        minZoom={6}
        maxZoom={16}
        zoomControl={false}
        maxBounds={BOUNDS}
        className="h-[68vh] w-full"
        preferCanvas
      >
        <ZoomControl position="topright" />
        <ScaleControl position="bottomleft" />

        {/* 1) Ortofoto base (fotografía aérea de alta calidad) */}
        <WMSTileLayer
          url="https://idecan1.grafcan.es/ServicioWMS/OrtoExpress?"
          params={{
            service: "WMS",
            request: "GetMap",
            layers: "OrtoExpress",
            format: "image/jpeg",
            transparent: false,
            styles: "",
            version: "1.3.0",
            tiling: true
          }}
        />

        {/* 2) Relieve: sombreado para dar volumen (se mezcla en pantalla) */}
        <WMSTileLayer
          url="https://idecan1.grafcan.es/ServicioWMS/MDSombras?"
          params={{
            service: "WMS",
            request: "GetMap",
            layers: "MDSombras",
            format: "image/png",
            transparent: true,
            styles: "",
            version: "1.3.0",
            tiling: true
          }}
          opacity={0.45}
        />

        {/* 3) (Opcional) Topográfico para etiquetas suaves (pueblos, carreteras) */}
        {/* 
        <WMSTileLayer
          url="https://idecan2.grafcan.es/ServicioWMS/MTI?"
          params={{
            service: "WMS",
            request: "GetMap",
            layers: "MTI",
            format: "image/png",
            transparent: true,
            version: "1.3.0",
            tiling: true
          }}
          opacity={0.35}
        />
        */}
      </MapContainer>
    </div>
  );
}
