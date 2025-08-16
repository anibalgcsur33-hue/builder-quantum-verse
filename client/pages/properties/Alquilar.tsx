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
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Palmtree,
  Building,
  Home,
  MessageCircle,
  Camera,
  Wifi,
  Car,
  Coffee,
  Waves,
  Sun,
  Zap,
} from "lucide-react";

interface RentalProperty {
  id: string;
  title: string;
  location: string;
  dailyRate?: number;
  monthlyRate?: number;
  yearlyRate?: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  images: string[];
  description: string;
  category: string;
  verified: boolean;
  featured: boolean;
  rentalType: "vacacional" | "larga-temporada" | "ambos";
  maxGuests?: number;
  minimumStay: number;
  availableFrom: string;
  amenities: string[];
  nearbyAttractions: string[];
  occupancyRate?: number;
  rating?: number;
  reviews?: number;
  instantBook: boolean;
  petFriendly: boolean;
  tags: string[];
}

export default function Alquilar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"vacacional" | "larga-temporada">(
    "vacacional",
  );
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
    guests: "",
    amenities: [] as string[],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample rental properties
  const properties: RentalProperty[] = [
    {
      id: "1",
      title: "Villa Luxury Ocean View - Alquiler Vacacional",
      location: "Costa Adeje, Tenerife",
      dailyRate: 350,
      monthlyRate: 8500,
      bedrooms: 4,
      bathrooms: 3,
      sqm: 280,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description:
        "Villa de lujo con piscina privada y vistas panorámicas al océano. Perfecta para vacaciones familiares exclusivas.",
      category: "Villa",
      verified: true,
      featured: true,
      rentalType: "vacacional",
      maxGuests: 8,
      minimumStay: 3,
      availableFrom: "2024-03-01",
      amenities: [
        "Piscina privada",
        "Wifi",
        "Aire acondicionado",
        "Cocina completa",
        "Barbacoa",
        "Parking",
      ],
      nearbyAttractions: [
        "Playa del Duque",
        "Centro Comercial",
        "Campo de Golf",
      ],
      occupancyRate: 85,
      rating: 4.9,
      reviews: 127,
      instantBook: true,
      petFriendly: false,
      tags: ["Lujo", "Vista al mar", "Piscina", "Familia"],
    },
    {
      id: "2",
      title: "Apartamento Centro - Larga Temporada",
      location: "Las Palmas, Gran Canaria",
      monthlyRate: 1200,
      yearlyRate: 13500,
      bedrooms: 2,
      bathrooms: 1,
      sqm: 85,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Moderno apartamento en el centro de Las Palmas, ideal para profesionales o estudiantes. Totalmente amueblado.",
      category: "Apartamento",
      verified: true,
      featured: false,
      rentalType: "larga-temporada",
      minimumStay: 30,
      availableFrom: "2024-02-15",
      amenities: ["Wifi", "Amueblado", "Lavadora", "Calefacción", "Balcón"],
      nearbyAttractions: [
        "Universidad",
        "Transporte público",
        "Zona comercial",
      ],
      rating: 4.5,
      reviews: 34,
      instantBook: false,
      petFriendly: true,
      tags: ["Centro", "Amueblado", "Transporte", "Estudiantes"],
    },
    {
      id: "3",
      title: "Penthouse Marina - Flexible",
      location: "Puerto de la Cruz, Tenerife",
      dailyRate: 180,
      monthlyRate: 4200,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 120,
      images: ["/placeholder.svg"],
      description:
        "Ático con terraza panorámica en primera línea de puerto. Disponible tanto para estancias cortas como largas.",
      category: "Penthouse",
      verified: true,
      featured: true,
      rentalType: "ambos",
      maxGuests: 6,
      minimumStay: 1,
      availableFrom: "2024-01-20",
      amenities: [
        "Terraza",
        "Vista puerto",
        "Wifi",
        "Cocina",
        "Parking",
        "Ascensor",
      ],
      nearbyAttractions: ["Puerto deportivo", "Restaurantes", "Playa Jardín"],
      occupancyRate: 78,
      rating: 4.7,
      reviews: 89,
      instantBook: true,
      petFriendly: false,
      tags: ["Puerto", "Terraza", "Flexible", "Vista"],
    },
    {
      id: "4",
      title: "Casa Rural Tradicional",
      location: "La Orotava, Tenerife",
      dailyRate: 120,
      monthlyRate: 2800,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 150,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Auténtica casa canaria en zona rural tranquila. Perfecta para desconectar y disfrutar de la naturaleza.",
      category: "Casa Rural",
      verified: true,
      featured: false,
      rentalType: "vacacional",
      maxGuests: 6,
      minimumStay: 2,
      availableFrom: "2024-02-01",
      amenities: [
        "Jardín",
        "Barbacoa",
        "Parking",
        "Wifi",
        "Chimenea",
        "Vistas montaña",
      ],
      nearbyAttractions: ["Teide", "Senderos", "Bodegas"],
      occupancyRate: 65,
      rating: 4.8,
      reviews: 45,
      instantBook: false,
      petFriendly: true,
      tags: ["Rural", "Tranquilo", "Naturaleza", "Tradicional"],
    },
    {
      id: "5",
      title: "Estudio Moderno Playa",
      location: "Playa de las Américas, Tenerife",
      dailyRate: 85,
      monthlyRate: 1800,
      bedrooms: 1,
      bathrooms: 1,
      sqm: 45,
      images: ["/placeholder.svg"],
      description:
        "Estudio completamente renovado a 50m de la playa. Ideal para parejas o viajeros individuales.",
      category: "Estudio",
      verified: false,
      featured: false,
      rentalType: "ambos",
      maxGuests: 2,
      minimumStay: 1,
      availableFrom: "2024-01-30",
      amenities: [
        "Cerca playa",
        "Wifi",
        "Aire acondicionado",
        "Cocina",
        "Balcón",
      ],
      nearbyAttractions: ["Playa", "Vida nocturna", "Restaurantes"],
      occupancyRate: 92,
      rating: 4.3,
      reviews: 156,
      instantBook: true,
      petFriendly: false,
      tags: ["Playa", "Pareja", "Económico", "Céntrico"],
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

  const handleShareProperty = (property: RentalProperty) => {
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
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesTab =
      activeTab === "vacacional"
        ? property.rentalType === "vacacional" ||
          property.rentalType === "ambos"
        : property.rentalType === "larga-temporada" ||
          property.rentalType === "ambos";

    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRateDisplay = (property: RentalProperty) => {
    if (activeTab === "vacacional") {
      return property.dailyRate
        ? `${formatCurrency(property.dailyRate)}/día`
        : "Consultar precio";
    } else {
      return property.monthlyRate
        ? `${formatCurrency(property.monthlyRate)}/mes`
        : "Consultar precio";
    }
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-2.5 shadow-lg shadow-blue-500/30">
                <Calendar className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
                  Propiedades en Alquiler
                </h1>
                <p className="text-blue-400 font-medium">
                  Vacacional y larga temporada en Canarias
                </p>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl">
              Desde escapadas de ensueño hasta estancias prolongadas. Encuentra
              el alquiler perfecto para tus necesidades con precios
              transparentes y reserva inmediata.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex bg-white/10 rounded-xl p-1 max-w-md">
              <button
                onClick={() => setActiveTab("vacacional")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "vacacional"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Palmtree className="w-4 h-4" />
                Vacacional
              </button>
              <button
                onClick={() => setActiveTab("larga-temporada")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "larga-temporada"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Building className="w-4 h-4" />
                Larga Temporada
              </button>
            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">
                      Precio {activeTab === "vacacional" ? "diario" : "mensual"}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min €"
                        value={filters.priceMin}
                        onChange={(e) =>
                          setFilters({ ...filters, priceMin: e.target.value })
                        }
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                      />
                      <input
                        type="number"
                        placeholder="Max €"
                        value={filters.priceMax}
                        onChange={(e) =>
                          setFilters({ ...filters, priceMax: e.target.value })
                        }
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                      />
                    </div>
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
                    </select>
                  </div>
                  {activeTab === "vacacional" && (
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        Huéspedes
                      </label>
                      <select
                        value={filters.guests}
                        onChange={(e) =>
                          setFilters({ ...filters, guests: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                      >
                        <option value="">Cualquiera</option>
                        <option value="2">2 personas</option>
                        <option value="4">4 personas</option>
                        <option value="6">6 personas</option>
                        <option value="8">8+ personas</option>
                      </select>
                    </div>
                  )}
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
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {filteredProperties.length} propiedades para alquiler{" "}
                {activeTab === "vacacional" ? "vacacional" : "larga temporada"}
              </h2>
              <p className="text-white/60 text-sm">
                {activeTab === "vacacional"
                  ? "Perfectas para vacaciones y escapadas"
                  : "Ideales para estancias prolongadas"}
              </p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-teal">
              <option>Más relevantes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Mejor valoradas</option>
              <option>Más reservadas</option>
            </select>
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
                    <div className="flex flex-col gap-2">
                      {property.verified && (
                        <div className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verificada
                        </div>
                      )}
                      {property.instantBook && (
                        <div className="bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          Reserva inmediata
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
                        <span className="text-white font-bold">
                          {getRateDisplay(property)}
                        </span>
                      </div>
                      {property.rating && (
                        <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {property.rating}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {property.title}
                  </h3>

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
                        {activeTab === "vacacional" ? (
                          <Users className="w-4 h-4 text-white/60" />
                        ) : (
                          <Square className="w-4 h-4 text-white/60" />
                        )}
                        <span className="text-white font-medium">
                          {activeTab === "vacacional"
                            ? property.maxGuests
                            : property.sqm}
                        </span>
                      </div>
                      <div className="text-xs text-white/60">
                        {activeTab === "vacacional" ? "Huésp" : "m²"}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-white/60 text-xs">
                        +{property.amenities.length - 3} más
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">
                      <div>
                        Mín. {property.minimumStay}{" "}
                        {property.minimumStay === 1
                          ? "día"
                          : property.minimumStay < 30
                            ? "días"
                            : "mes"}
                      </div>
                      {property.occupancyRate && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          {property.occupancyRate}% ocupación
                        </div>
                      )}
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
                        <Calendar className="w-4 h-4" />
                        {property.instantBook ? "Reservar" : "Consultar"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Palmtree className="w-6 h-6 text-orange-400" />
                Alquiler Vacacional
              </h3>
              <ul className="space-y-2 text-white/70">
                <li>• Estancias de 1 día a 1 mes</li>
                <li>• Propiedades completamente equipadas</li>
                <li>• Reserva instantánea disponible</li>
                <li>• Precios por día/semana</li>
                <li>• Ideal para vacaciones y escapadas</li>
              </ul>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Building className="w-6 h-6 text-blue-400" />
                Larga Temporada
              </h3>
              <ul className="space-y-2 text-white/70">
                <li>• Estancias de 1 mes en adelante</li>
                <li>• Precios mensuales/anuales ventajosos</li>
                <li>• Contratos flexibles</li>
                <li>• Ideales para trabajo remoto</li>
                <li>• Amuebladas y sin amueblar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concierge */}
      <AIConcierge />
    </div>
  );
}
