import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LiveSocialProof from "../components/LiveSocialProof";
import MetaverseExperience from "../components/MetaverseExperience";
import Advanced3DMap from "../components/Advanced3DMap";
import HeatmapLegend from "../components/HeatmapLegend";
import MultiplayerController from "../components/MultiplayerController";
import {
  Map,
  Search,
  Filter,
  MapPin,
  Euro,
  Bed,
  Bath,
  Square,
  Eye,
  Heart,
  Star,
  Building,
  Home,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Layers,
  Navigation,
  Compass,
  Settings,
  X,
  Info,
  Phone,
  Calendar,
  Share2,
  Users,
  Volume2,
  Mic,
  Globe,
  TrendingUp,
  Activity,
  Headphones,
  Wifi,
  School,
  Hospital,
  ShoppingCart,
  Route,
} from "lucide-react";

interface PropertyPin {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqm: number;
  type: "villa" | "apartment" | "penthouse" | "house";
  coordinates: {
    x: number;
    y: number;
    z: number;
    lat: number;
    lng: number;
    elevation: number;
  };
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  images: string[];
  badges: ('vr' | 'crypto' | 'tour3d' | 'verified' | 'featured')[];
  heatmapData: {
    priceHeat: number;
    tourismOccupancy: number;
    demand: number;
  };
  nearby: {
    beaches: { name: string; distance: number; }[];
    schools: { name: string; distance: number; type: string; }[];
    hospitals: { name: string; distance: number; }[];
    shopping: { name: string; distance: number; type: string; }[];
  };
  vrTourUrl?: string;
  tour3DUrl?: string;
  status: "available" | "reserved" | "sold";
}

export default function MetaverseMap() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyPin | null>(
    null,
  );
  const [mapView, setMapView] = useState<"3d" | "2d">("3d");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [filters, setFilters] = useState({
    zone: "",
    priceMin: "",
    priceMax: "",
    propertyType: "",
    bedrooms: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMetaverseMode, setIsMetaverseMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);

  // Sample property data for the map
  const properties: PropertyPin[] = [
    {
      id: "1",
      title: "Villa Oceanfront Paradise",
      location: "Costa Adeje, Tenerife",
      price: 1250000,
      type: "villa",
      coordinates: { x: 200, y: 150, z: 0 },
      bedrooms: 4,
      bathrooms: 3,
      sqm: 357,
      image: "/placeholder.svg",
      vrTour: true,
      featured: true,
      status: "available",
    },
    {
      id: "2",
      title: "Penthouse Marina Elite",
      location: "Las Palmas, Gran Canaria",
      price: 850000,
      type: "penthouse",
      coordinates: { x: 400, y: 200, z: 0 },
      bedrooms: 3,
      bathrooms: 2,
      sqm: 202,
      image: "/placeholder.svg",
      vrTour: true,
      featured: false,
      status: "available",
    },
    {
      id: "3",
      title: "Modern Apartment Center",
      location: "Santa Cruz, Tenerife",
      price: 420000,
      type: "apartment",
      coordinates: { x: 250, y: 180, z: 0 },
      bedrooms: 2,
      bathrooms: 2,
      sqm: 150,
      image: "/placeholder.svg",
      vrTour: true,
      featured: false,
      status: "reserved",
    },
    {
      id: "4",
      title: "Casa Rural Vineyards",
      location: "La Geria, Lanzarote",
      price: 680000,
      type: "house",
      coordinates: { x: 600, y: 120, z: 0 },
      bedrooms: 3,
      bathrooms: 2,
      sqm: 324,
      image: "/placeholder.svg",
      vrTour: false,
      featured: true,
      status: "available",
    },
    {
      id: "5",
      title: "Beachfront Villa Exclusive",
      location: "Playa Blanca, Lanzarote",
      price: 1800000,
      type: "villa",
      coordinates: { x: 650, y: 100, z: 0 },
      bedrooms: 5,
      bathrooms: 4,
      sqm: 450,
      image: "/placeholder.svg",
      vrTour: true,
      featured: true,
      status: "available",
    },
  ];

  const islands = [
    { name: "Tenerife", color: "from-emerald-400 to-teal-500", size: "large" },
    { name: "Gran Canaria", color: "from-blue-400 to-cyan-500", size: "large" },
    {
      name: "Lanzarote",
      color: "from-amber-400 to-orange-500",
      size: "medium",
    },
    {
      name: "Fuerteventura",
      color: "from-yellow-400 to-amber-500",
      size: "medium",
    },
    { name: "La Palma", color: "from-green-400 to-emerald-500", size: "small" },
    {
      name: "La Gomera",
      color: "from-purple-400 to-violet-500",
      size: "small",
    },
    { name: "El Hierro", color: "from-red-400 to-pink-500", size: "small" },
  ];

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case "villa":
        return Home;
      case "penthouse":
        return Building;
      case "apartment":
        return Building;
      case "house":
        return Home;
      default:
        return MapPin;
    }
  };

  const getPropertyColor = (status: string, featured: boolean) => {
    if (featured) return "text-neon-teal";
    switch (status) {
      case "available":
        return "text-neon-emerald";
      case "reserved":
        return "text-yellow-400";
      case "sold":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const filteredProperties = properties.filter((property) => {
    if (
      filters.zone &&
      !property.location.toLowerCase().includes(filters.zone.toLowerCase())
    ) {
      return false;
    }
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) {
      return false;
    }
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) {
      return false;
    }
    return true;
  });

  const handlePropertyClick = (property: PropertyPin) => {
    setSelectedProperty(property);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (e.target === mapRef.current) {
      setSelectedProperty(null);
    }
  };

  const resetView = () => {
    setZoom(1);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"} bg-blue-dark text-white/90`}
    >
      {!isFullscreen && <Header isScrolled={isScrolled} />}
      <div className={!isFullscreen ? "pt-20 lg:pt-24" : ""}>
        <div className="container mx-auto container-padding h-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Mapa 3D Metaverso
              </h1>
              <p className="text-white/70">
                Explora propiedades reales en las Islas Canarias con nuestro
                mapa interactivo futurista
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter size={20} />
                Filtros
              </button>
              <button
                onClick={() => setIsMetaverseMode(!isMetaverseMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isMetaverseMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-neon-teal to-neon-emerald text-blue-dark hover:shadow-lg"
                }`}
              >
                <Eye size={20} />
                {isMetaverseMode ? "Salir Metaverso" : "Entrar Metaverso"}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn-primary flex items-center gap-2"
              >
                {isFullscreen ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
                {isFullscreen ? "Salir" : "Pantalla completa"}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass-card p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold mb-4">Filtros de Búsqueda</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-white/70 mb-2 text-sm">
                    Zona
                  </label>
                  <select
                    value={filters.zone}
                    onChange={(e) =>
                      setFilters({ ...filters, zone: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                  >
                    <option value="">Todas las islas</option>
                    <option value="tenerife">Tenerife</option>
                    <option value="gran canaria">Gran Canaria</option>
                    <option value="lanzarote">Lanzarote</option>
                    <option value="fuerteventura">Fuerteventura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2 text-sm">
                    Precio mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.priceMin}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMin: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-2 text-sm">
                    Precio máximo
                  </label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.priceMax}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMax: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-2 text-sm">
                    Tipo
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      setFilters({ ...filters, propertyType: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                  >
                    <option value="">Todos</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="apartment">Apartamento</option>
                    <option value="house">Casa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2 text-sm">
                    Dormitorios
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                      setFilters({ ...filters, bedrooms: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                  >
                    <option value="">Cualquiera</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Map Container */}
          <div className="relative h-[700px] glass-card rounded-2xl overflow-hidden">
            {/* Map Controls */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <div className="glass-card p-2 rounded-lg">
                <div className="flex gap-1">
                  <button
                    onClick={() => setMapView("3d")}
                    className={`p-2 rounded transition-colors ${
                      mapView === "3d"
                        ? "bg-neon-teal text-blue-dark"
                        : "hover:bg-white/10"
                    }`}
                    title="Vista 3D"
                  >
                    <Layers size={16} />
                  </button>
                  <button
                    onClick={() => setMapView("2d")}
                    className={`p-2 rounded transition-colors ${
                      mapView === "2d"
                        ? "bg-neon-teal text-blue-dark"
                        : "hover:bg-white/10"
                    }`}
                    title="Vista 2D"
                  >
                    <Map size={16} />
                  </button>
                </div>
              </div>

              <div className="glass-card p-2 rounded-lg">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setZoom(Math.min(3, zoom + 0.5))}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Acercar"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.5))}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Alejar"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    onClick={resetView}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Restablecer vista"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Map Stats */}
            <div className="absolute top-4 right-4 z-20 glass-card p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-teal">
                  {filteredProperties.length}
                </div>
                <div className="text-white/70 text-sm">Propiedades</div>
              </div>
            </div>

            {/* 3D Map Scene */}
            <div
              ref={mapRef}
              onClick={handleMapClick}
              className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-blue-800/30 ${
                mapView === "3d" ? "perspective-1000" : ""
              }`}
              style={{
                transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid-pattern w-full h-full"></div>
              </div>

              {/* Islands representation */}
              {islands.map((island, index) => (
                <div
                  key={island.name}
                  className={`absolute rounded-full bg-gradient-to-br ${island.color} opacity-30 ${
                    island.size === "large"
                      ? "w-32 h-32"
                      : island.size === "medium"
                        ? "w-24 h-24"
                        : "w-16 h-16"
                  }`}
                  style={{
                    left: `${20 + index * 120}px`,
                    top: `${100 + (index % 2) * 80}px`,
                    transform:
                      mapView === "3d" ? `translateZ(${index * 10}px)` : "none",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {island.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* Property Pins */}
              {filteredProperties.map((property) => {
                const IconComponent = getPropertyIcon(property.type);
                const color = getPropertyColor(
                  property.status,
                  property.featured,
                );

                return (
                  <div
                    key={property.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                    style={{
                      left: property.coordinates.x,
                      top: property.coordinates.y,
                      transform: `translate(-50%, -50%) ${mapView === "3d" ? `translateZ(${property.coordinates.z}px)` : ""}`,
                    }}
                    onClick={() => handlePropertyClick(property)}
                  >
                    {/* Pin glow effect */}
                    <div
                      className={`absolute inset-0 w-8 h-8 rounded-full animate-ping ${
                        property.featured
                          ? "bg-neon-teal/30"
                          : "bg-neon-emerald/20"
                      }`}
                    ></div>

                    {/* Main pin */}
                    <div
                      className={`relative w-8 h-8 rounded-full glass-card backdrop-blur-sm border-2 flex items-center justify-center group-hover:scale-125 transition-all duration-300 ${
                        property.featured
                          ? "border-neon-teal shadow-neon-teal"
                          : "border-neon-emerald/50"
                      }`}
                    >
                      <IconComponent className={color} size={16} />
                    </div>

                    {/* Pin label */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="glass-card px-3 py-1 rounded-lg whitespace-nowrap">
                        <div className="text-white font-medium text-sm">
                          {property.title}
                        </div>
                        <div className="text-neon-teal text-xs">
                          €{property.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Navigation compass */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="glass-card p-3 rounded-full">
                  <Compass className="text-neon-teal" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Property Detail Modal */}
          {selectedProperty && (
            <div className="fixed inset-0 bg-blue-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass-card max-w-2xl w-full rounded-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 to-transparent"></div>

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-4 right-4 w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Property badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {selectedProperty.featured && (
                      <span className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star size={14} />
                        Destacado
                      </span>
                    )}
                    {selectedProperty.vrTour && (
                      <span className="bg-neon-emerald/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Eye size={14} />
                        VR Tour
                      </span>
                    )}
                  </div>

                  {/* Property status */}
                  <div className="absolute bottom-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedProperty.status === "available"
                          ? "bg-neon-emerald/20 text-neon-emerald"
                          : selectedProperty.status === "reserved"
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-red-400/20 text-red-400"
                      }`}
                    >
                      {selectedProperty.status === "available"
                        ? "Disponible"
                        : selectedProperty.status === "reserved"
                          ? "Reservado"
                          : "Vendido"}
                    </span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedProperty.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/70 mb-4">
                    <MapPin size={16} />
                    <span>{selectedProperty.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Bed className="text-neon-teal mx-auto mb-1" size={20} />
                      <div className="font-bold">
                        {selectedProperty.bedrooms}
                      </div>
                      <div className="text-white/60 text-sm">Dormitorios</div>
                    </div>
                    <div className="text-center">
                      <Bath
                        className="text-neon-emerald mx-auto mb-1"
                        size={20}
                      />
                      <div className="font-bold">
                        {selectedProperty.bathrooms}
                      </div>
                      <div className="text-white/60 text-sm">Baños</div>
                    </div>
                    <div className="text-center">
                      <Square
                        className="text-neon-teal mx-auto mb-1"
                        size={20}
                      />
                      <div className="font-bold">{selectedProperty.sqm}m²</div>
                      <div className="text-white/60 text-sm">Superficie</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-bold text-neon-teal">
                      €{selectedProperty.price.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Heart size={20} />
                      </button>
                      <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedProperty.vrTour && (
                      <Link
                        to={`/property/${selectedProperty.id}/vr`}
                        className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                      >
                        <Eye size={20} />
                        Tour VR
                      </Link>
                    )}
                    <Link
                      to={`/property/${selectedProperty.id}`}
                      className="flex-1 btn-secondary text-center flex items-center justify-center gap-2"
                    >
                      <Info size={20} />
                      Ver Detalles
                    </Link>
                    <button className="glass-card px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                      <Phone size={20} />
                      Contactar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .grid-pattern {
            background-image:
              linear-gradient(rgba(14, 231, 231, 0.1) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(14, 231, 231, 0.1) 1px,
                transparent 1px
              );
            background-size: 50px 50px;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </div>

      {/* Live Social Proof Notifications */}
      {!isFullscreen && <LiveSocialProof />}

      {/* Metaverse Experience Overlay */}
      {isMetaverseMode && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <MetaverseExperience onClose={() => setIsMetaverseMode(false)} />
        </div>
      )}
    </div>
  );
}
