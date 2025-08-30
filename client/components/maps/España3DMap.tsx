import React, { useEffect, useRef, useState } from "react";
// import * as Cesium from "cesium"; // Temporarily disabled
// import { attachCityPins, flyToCity, flyThroughRegion, showRegionClusters, CITIES } from "../cesium/CityTours"; // Temporarily disabled
import {
  Eye,
  Globe,
  MapPin,
  Filter,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

// Configuración de Cesium token (debe configurarse desde env)
// Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN || ''; // Temporarily disabled

interface España3DMapProps {
  height?: number;
  onCitySelect?: (city: any) => void;
  onRegionChange?: (region: string) => void;
}

export default function España3DMap({
  height = 600,
  onCitySelect,
  onRegionChange,
}: España3DMapProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const cesiumViewer = useRef<Cesium.Viewer | null>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [activeRegion, setActiveRegion] = useState<string>("península");
  const [isTourActive, setIsTourActive] = useState(false);
  const [showClusters, setShowClusters] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!viewerRef.current) return;

    try {
      // Configurar viewer de Cesium
      const viewer = new Cesium.Viewer(viewerRef.current, {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        scene3DOnly: true,
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
      });

      cesiumViewer.current = viewer;

      // Configuración inicial de la cámara (vista de España completa)
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-3.7038, 39.5, 2000000), // Centro de España
        orientation: {
          heading: 0.0,
          pitch: -Math.PI / 3, // 60 grados hacia abajo
          roll: 0.0,
        },
      });

      // Personalizar el estilo del globo
      viewer.scene.globe.enableLighting = true;
      viewer.scene.fog.enabled = true;
      viewer.scene.fog.density = 0.0001;
      viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#0a0f1a");

      // Agregar pins de ciudades
      const detachPins = attachCityPins(viewer, (city) => {
        console.log(`🏙️ Ciudad seleccionada: ${city.name} (${city.region})`);
        setSelectedCity(city);
        setActiveRegion(city.region);
        onCitySelect?.(city);
        onRegionChange?.(city.region);
      });

      // Mostrar clusters si está habilitado
      let detachClusters: (() => void) | null = null;
      if (showClusters) {
        detachClusters = showRegionClusters(viewer);
      }

      setIsLoading(false);

      return () => {
        detachPins();
        if (detachClusters) detachClusters();
        viewer.destroy();
      };
    } catch (error) {
      console.error("Error inicializando mapa 3D:", error);
      setIsLoading(false);
    }
  }, [onCitySelect, onRegionChange, showClusters]);

  // Función para volar a una región específica
  const flyToRegion = (region: "peninsula" | "canarias" | "baleares") => {
    if (!cesiumViewer.current) return;

    const regionViews = {
      peninsula: { lat: 40.4, lon: -3.7, height: 1500000 },
      canarias: { lat: 28.3, lon: -15.5, height: 800000 },
      baleares: { lat: 39.6, lon: 2.9, height: 600000 },
    };

    const view = regionViews[region];
    console.log(`🗺️ Volando a región: ${region}`);

    cesiumViewer.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        view.lon,
        view.lat,
        view.height,
      ),
      orientation: {
        heading: 0.0,
        pitch: -Math.PI / 4,
        roll: 0.0,
      },
      duration: 2.0,
    });

    setActiveRegion(region);
    onRegionChange?.(region);
  };

  // Función para iniciar tour cinematográfico
  const startCinematicTour = (
    region: "peninsula" | "canarias" | "baleares",
  ) => {
    if (!cesiumViewer.current || isTourActive) return;

    setIsTourActive(true);
    console.log(`🎬 Iniciando tour cinematográfico de ${region}`);

    flyThroughRegion(cesiumViewer.current, region);

    // Auto-detener el tour después de tiempo estimado
    const regionCities = CITIES.filter((c) => c.region === region);
    const tourDuration = regionCities.length * 10000; // 10 segundos por ciudad

    setTimeout(() => {
      setIsTourActive(false);
      console.log(`✅ Tour cinematográfico de ${region} completado`);
    }, tourDuration);
  };

  // Reset a vista inicial
  const resetView = () => {
    if (!cesiumViewer.current) return;

    cesiumViewer.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-3.7038, 39.5, 2000000),
      orientation: {
        heading: 0.0,
        pitch: -Math.PI / 3,
        roll: 0.0,
      },
      duration: 3.0,
    });

    setSelectedCity(null);
    setActiveRegion("península");
    setIsTourActive(false);
  };

  // Obtener estadísticas por región
  const getRegionStats = (region: string) => {
    const regionCities = CITIES.filter((c) => c.region === region);
    const totalProperties = regionCities.reduce(
      (sum, c) => sum + (c.properties || 0),
      0,
    );
    return { cities: regionCities.length, properties: totalProperties };
  };

  return (
    <div className="relative w-full bg-blue-dark rounded-2xl overflow-hidden shadow-glass">
      {/* Header del mapa */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
        <div className="glass-card px-4 py-2 rounded-xl">
          <h3 className="text-white font-bold text-lg mb-1">Mapa 3D España</h3>
          <p className="text-white/70 text-sm">
            Península + Canarias (8 islas) + Baleares
          </p>
        </div>

        {selectedCity && (
          <div className="glass-card px-4 py-3 rounded-xl max-w-xs">
            <h4 className="text-neon-teal font-bold">{selectedCity.name}</h4>
            <p className="text-white/70 text-sm capitalize">
              {selectedCity.region}
            </p>
            <p className="text-white text-sm">
              {selectedCity.properties} propiedades
            </p>
          </div>
        )}
      </div>

      {/* Controles laterales */}
      <div className="absolute top-20 left-4 z-10 space-y-3">
        {/* Selector de región */}
        <div className="glass-card p-3 rounded-xl">
          <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Regiones
          </h5>
          <div className="space-y-2">
            {["peninsula", "canarias", "baleares"].map((region) => {
              const stats = getRegionStats(region);
              return (
                <button
                  key={region}
                  onClick={() => flyToRegion(region as any)}
                  className={`w-full text-left p-2 rounded-lg transition-all ${
                    activeRegion === region
                      ? "bg-neon-teal/20 text-neon-teal border border-neon-teal/30"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <div className="font-medium capitalize">{region}</div>
                  <div className="text-xs">
                    {stats.cities} ciudades • {stats.properties} props
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controles de tour */}
        <div className="glass-card p-3 rounded-xl">
          <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Tours
          </h5>
          <div className="space-y-2">
            {["peninsula", "canarias", "baleares"].map((region) => (
              <button
                key={region}
                onClick={() => startCinematicTour(region as any)}
                disabled={isTourActive}
                className="w-full btn-secondary text-xs py-2 flex items-center gap-2 disabled:opacity-50"
              >
                {isTourActive ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                Tour {region}
              </button>
            ))}
          </div>
        </div>

        {/* Controles adicionales */}
        <div className="glass-card p-3 rounded-xl">
          <div className="space-y-2">
            <button
              onClick={resetView}
              className="w-full btn-secondary text-xs py-2 flex items-center gap-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Vista
            </button>

            <button
              onClick={() => setShowClusters(!showClusters)}
              className={`w-full text-xs py-2 px-3 rounded-lg transition-all ${
                showClusters
                  ? "bg-neon-emerald/20 text-neon-emerald"
                  : "bg-white/10 text-white/70"
              }`}
            >
              <Filter className="w-3 h-3 inline mr-2" />
              Clusters
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas en tiempo real */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="glass-card p-4 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-neon-teal">
                {CITIES.length}
              </div>
              <div className="text-white/70 text-sm">Ciudades</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-emerald">
                {CITIES.reduce((sum, c) => sum + (c.properties || 0), 0)}
              </div>
              <div className="text-white/70 text-sm">Propiedades</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">8</div>
              <div className="text-white/70 text-sm">Islas Canarias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-blue-dark/80 backdrop-blur-sm flex items-center justify-center">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-8 h-8 border-2 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Cargando mapa 3D de España...</p>
          </div>
        </div>
      )}

      {/* Contenedor del mapa Cesium */}
      <div
        ref={viewerRef}
        style={{ height: `${height}px` }}
        className="w-full"
      />
    </div>
  );
}
