import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import España3DMap from "../components/maps/España3DMap";
import {
  Globe,
  Eye,
  MapPin,
  Building,
  Calendar,
  Users,
  ArrowLeft,
  Sparkles,
  Play,
  Filter,
} from "lucide-react";

export default function MetaverseMap() {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [activeRegion, setActiveRegion] = useState<string>("península");
  const [viewMode, setViewMode] = useState<"3d" | "satellite" | "terrain">(
    "3d",
  );

  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
    console.log(`🏙️ Ciudad seleccionada en MetaverseMap: ${city.name}`);
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    console.log(`🗺️ Región activa: ${region}`);
  };

  // Datos de ejemplo para propiedades destacadas
  const featuredProperties = selectedCity
    ? [
        {
          id: 1,
          title: `Villa de lujo en ${selectedCity.name}`,
          price: "€850,000",
          image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
          bedrooms: 4,
          bathrooms: 3,
          sqm: 280,
          vrTour: true,
        },
        {
          id: 2,
          title: `Ático moderno en ${selectedCity.name}`,
          price: "€1,200,000",
          image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
          bedrooms: 3,
          bathrooms: 2,
          sqm: 190,
          vrTour: true,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-dark to-purple-dark">
      <Header isScrolled={true} transparent={false} />

      {/* Hero section del metaverso */}
      <section className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-neon-teal hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>

            <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-4">
              Metaverso Inmobiliario 3D
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explora España completa en 3D: Península + Canarias (8 islas) +
              Baleares.
              <br />
              <span className="text-neon-teal">
                Tours cinematográficos, propiedades interactivas y visitas VR.
              </span>
            </p>
          </div>

          {/* Controles superiores */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode("3d")}
                className={`btn-${viewMode === "3d" ? "primary" : "secondary"} px-6 py-2 flex items-center gap-2`}
              >
                <Globe className="w-4 h-4" />
                Vista 3D
              </button>
              <button
                onClick={() => setViewMode("satellite")}
                className={`btn-${viewMode === "satellite" ? "primary" : "secondary"} px-6 py-2 flex items-center gap-2`}
              >
                <Eye className="w-4 h-4" />
                Satélite
              </button>
              <button
                onClick={() => setViewMode("terrain")}
                className={`btn-${viewMode === "terrain" ? "primary" : "secondary"} px-6 py-2 flex items-center gap-2`}
              >
                <MapPin className="w-4 h-4" />
                Terreno
              </button>
            </div>

            <div className="flex gap-3">
              <button className="btn-secondary px-6 py-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <button className="btn-primary px-6 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Hablar con BlueEye AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa 3D principal */}
      <section className="px-6 pb-8">
        <div className="container mx-auto max-w-7xl">
          <España3DMap
            height={700}
            onCitySelect={handleCitySelect}
            onRegionChange={handleRegionChange}
          />
        </div>
      </section>

      {/* Panel lateral con información de ciudad seleccionada */}
      {selectedCity && (
        <section className="px-6 pb-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información de la ciudad */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gradient mb-4">
                    {selectedCity.name}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Región:</span>
                      <span className="text-neon-teal capitalize font-semibold">
                        {selectedCity.region}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Propiedades:</span>
                      <span className="text-white font-semibold">
                        {selectedCity.properties}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Tours VR:</span>
                      <span className="text-neon-emerald font-semibold">
                        Disponibles
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      Tour VR de la ciudad
                    </button>

                    <button className="w-full btn-secondary py-3 flex items-center justify-center gap-2">
                      <Building className="w-5 h-5" />
                      Ver todas las propiedades
                    </button>

                    <button className="w-full btn-secondary py-3 flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Programar visita
                    </button>
                  </div>
                </div>

                {/* Estadísticas de la región */}
                <div className="glass-card p-6 rounded-2xl mt-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Estadísticas de {selectedCity.region}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-teal">
                        {selectedCity.properties}
                      </div>
                      <div className="text-white/70 text-sm">Propiedades</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-emerald">
                        156
                      </div>
                      <div className="text-white/70 text-sm">Tours VR</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        €2.1M
                      </div>
                      <div className="text-white/70 text-sm">Precio medio</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        94%
                      </div>
                      <div className="text-white/70 text-sm">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Propiedades destacadas */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Propiedades destacadas en {selectedCity.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="glass-card overflow-hidden hover-glow-teal group cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-transparent to-transparent"></div>

                        {property.vrTour && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-neon-emerald/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                              <Eye className="text-neon-emerald w-4 h-4" />
                              <span className="text-white text-sm font-medium">
                                VR
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white font-bold text-xl mb-2">
                            {property.price}
                          </div>
                          <div className="flex gap-3 text-xs text-white/80">
                            <span>{property.bedrooms}🛏️</span>
                            <span>{property.bathrooms}🚿</span>
                            <span>{property.sqm}m²</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-bold text-white mb-2">
                          {property.title}
                        </h4>
                        <div className="flex gap-2">
                          <button className="btn-primary flex-1 py-2 text-sm">
                            Ver detalles
                          </button>
                          <button className="btn-secondary px-4 py-2 text-sm">
                            <Play className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instrucciones de uso */}
      <section className="px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="glass-card p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Cómo usar el Metaverso Inmobiliario
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-neon-teal" />
                </div>
                <h4 className="font-bold text-white mb-2">
                  1. Navega por España
                </h4>
                <p className="text-white/70">
                  Usa los controles para explorar península, Canarias y Baleares
                  en 3D
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-neon-emerald" />
                </div>
                <h4 className="font-bold text-white mb-2">
                  2. Selecciona ciudades
                </h4>
                <p className="text-white/70">
                  Haz clic en los marcadores para ver propiedades disponibles
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-bold text-white mb-2">3. Tours VR</h4>
                <p className="text-white/70">
                  Inicia visitas virtuales inmersivas de propiedades
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
