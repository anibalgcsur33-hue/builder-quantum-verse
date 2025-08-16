import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import AIConcierge from "../../components/AIConcierge";
import {
  Search,
  Filter,
  MapPin,
  Euro,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Eye,
  Star,
  CheckCircle,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  Calendar,
  Shield,
  Home,
  Building,
  Download,
  MessageCircle,
  ArrowRight,
  Zap,
  Car,
  Wifi,
  Camera,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqm: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  images: string[];
  description: string;
  category: string;
  verified: boolean;
  featured: boolean;
  energyRating: string;
  yearBuilt: number;
  roi?: number;
  viewingAvailable: boolean;
  virtualTour: boolean;
  tags: string[];
  savedBy?: number;
}

export default function Comprar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [savedProperties, setSavedProperties] = useState<Set<string>>(
    new Set(),
  );

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    location: "",
    bedrooms: "",
    propertyType: "",
    yearBuilt: "",
    energyRating: "",
    features: [] as string[],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample properties for sale
  const properties: Property[] = [
    {
      id: "1",
      title: "Villa Moderna Oceanfront Paradise",
      location: "Costa Adeje, Tenerife",
      price: 1250000,
      pricePerSqm: 3500,
      bedrooms: 4,
      bathrooms: 3,
      sqm: 357,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description:
        "Espectacular villa de lujo con vistas panorámicas al océano Atlántico en una de las zonas más exclusivas de Tenerife.",
      category: "Villa",
      verified: true,
      featured: true,
      energyRating: "A",
      yearBuilt: 2021,
      roi: 7.2,
      viewingAvailable: true,
      virtualTour: true,
      tags: ["Piscina", "Vista al mar", "Garaje", "Jardín"],
      savedBy: 24,
    },
    {
      id: "2",
      title: "Penthouse Marina Elite Collection",
      location: "Las Palmas, Gran Canaria",
      price: 850000,
      pricePerSqm: 4200,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 202,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Ático exclusivo en primera línea de marina con acabados de lujo y vistas espectaculares a la bahía.",
      category: "Penthouse",
      verified: true,
      featured: false,
      energyRating: "A",
      yearBuilt: 2020,
      roi: 8.1,
      viewingAvailable: true,
      virtualTour: true,
      tags: ["Marina", "Ático", "Lujo", "Terraza"],
      savedBy: 18,
    },
    {
      id: "3",
      title: "Casa Tradicional Canaria Renovada",
      location: "La Orotava, Tenerife",
      price: 420000,
      pricePerSqm: 2800,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 150,
      images: ["/placeholder.svg"],
      description:
        "Encantadora casa tradicional completamente renovada conservando el estilo arquitectónico canario.",
      category: "Casa",
      verified: true,
      featured: false,
      energyRating: "B",
      yearBuilt: 1890,
      viewingAvailable: true,
      virtualTour: false,
      tags: ["Tradicional", "Renovada", "Centro histórico", "Patio"],
      savedBy: 12,
    },
    {
      id: "4",
      title: "Apartamento Moderno Puerto Santiago",
      location: "Puerto Santiago, Tenerife",
      price: 180000,
      pricePerSqm: 2250,
      bedrooms: 2,
      bathrooms: 1,
      sqm: 80,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Apartamento moderno completamente reformado, ideal para inversión o primera vivienda.",
      category: "Apartamento",
      verified: false,
      featured: false,
      energyRating: "C",
      yearBuilt: 2015,
      roi: 9.5,
      viewingAvailable: true,
      virtualTour: true,
      tags: ["Reformado", "Inversión", "Balcón", "Amueblado"],
      savedBy: 8,
    },
    {
      id: "5",
      title: "Villa de Lujo con Piscina Infinity",
      location: "Adeje, Tenerife",
      price: 2100000,
      pricePerSqm: 4200,
      bedrooms: 5,
      bathrooms: 4,
      sqm: 500,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description:
        "Villa de diseño contemporáneo con piscina infinity, vistas al mar y todas las comodidades de lujo.",
      category: "Villa",
      verified: true,
      featured: true,
      energyRating: "A+",
      yearBuilt: 2022,
      roi: 6.8,
      viewingAvailable: true,
      virtualTour: true,
      tags: ["Lujo", "Piscina infinity", "Diseño", "Smart home"],
      savedBy: 35,
    },
  ];

  const handleSaveProperty = (propertyId: string) => {
    const newSaved = new Set(savedProperties);
    if (newSaved.has(propertyId)) {
      newSaved.delete(propertyId);
    } else {
      newSaved.add(propertyId);
    }
    setSavedProperties(newSaved);
  };

  const handleShareProperty = (property: Property) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: `${window.location.origin}/property/${property.id}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/property/${property.id}`,
      );
      // Show toast notification
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriceMin =
      !filters.priceMin || property.price >= parseInt(filters.priceMin);
    const matchesPriceMax =
      !filters.priceMax || property.price <= parseInt(filters.priceMax);
    const matchesLocation =
      !filters.location ||
      property.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesBedrooms =
      !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
    const matchesType =
      !filters.propertyType ||
      property.category.toLowerCase() === filters.propertyType.toLowerCase();

    return (
      matchesSearch &&
      matchesPriceMin &&
      matchesPriceMax &&
      matchesLocation &&
      matchesBedrooms &&
      matchesType
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-2.5 shadow-lg shadow-green-500/30">
                <Home className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
                  Propiedades en Venta
                </h1>
                <p className="text-green-400 font-medium">
                  Encuentra tu hogar ideal en Canarias
                </p>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl">
              Descubre nuestra selección exclusiva de propiedades en venta.
              Desde villas de lujo hasta apartamentos de inversión, todas
              verificadas y con documentación completa.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por ubicación, título o características..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-neon-teal text-blue-dark"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-neon-teal text-blue-dark"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                      Ubicación
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad, zona..."
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                    />
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
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Casa">Casa</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {filteredProperties.length} propiedades encontradas
              </h2>
              <p className="text-white/60 text-sm">Ordenadas por relevancia</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-teal">
                <option>Más relevantes</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Más recientes</option>
                <option>Mejor ROI</option>
              </select>
            </div>
          </div>

          {/* Properties Grid */}
          <div
            className={`grid gap-6 mb-12 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-300 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative ${viewMode === "list" ? "w-80 h-64" : "h-64"}`}
                >
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex gap-2">
                      {property.verified && (
                        <div className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verificada
                        </div>
                      )}
                      {property.featured && (
                        <div className="bg-yellow-500/90 text-black px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Destacada
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveProperty(property.id)}
                        className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                          savedProperties.has(property.id)
                            ? "bg-red-500/90 text-white"
                            : "bg-black/50 text-white hover:bg-red-500/90"
                        }`}
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={
                            savedProperties.has(property.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                      <button
                        onClick={() => handleShareProperty(property)}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center">
                      <div className="glass-card px-3 py-1 rounded-lg backdrop-blur-md">
                        <span className="text-white font-bold text-lg">
                          {formatCurrency(property.price)}
                        </span>
                      </div>
                      {property.virtualTour && (
                        <div className="bg-neon-teal/90 text-blue-dark px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          VR Tour
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white line-clamp-2">
                      {property.title}
                    </h3>
                    {property.roi && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium ml-2">
                        {property.roi}% ROI
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-white/70 text-sm">
                      {property.location}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Bed className="w-4 h-4 text-white/60" />
                        <span className="text-white font-medium">
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="text-xs text-white/60">Dorm</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Bath className="w-4 h-4 text-white/60" />
                        <span className="text-white font-medium">
                          {property.bathrooms}
                        </span>
                      </div>
                      <div className="text-xs text-white/60">Baños</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Square className="w-4 h-4 text-white/60" />
                        <span className="text-white font-medium">
                          {property.sqm}
                        </span>
                      </div>
                      <div className="text-xs text-white/60">m²</div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {property.tags.length > 3 && (
                      <span className="text-white/60 text-xs">
                        +{property.tags.length - 3} más
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">
                      <div>{formatCurrency(property.pricePerSqm)}/m²</div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {property.savedBy} guardado
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/property/${property.id}`}
                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </Link>
                      <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Contactar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mb-12">
            <button className="btn-secondary px-8 py-3 flex items-center gap-2 mx-auto">
              Cargar más propiedades
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Concierge */}
      <AIConcierge />
    </div>
  );
}
