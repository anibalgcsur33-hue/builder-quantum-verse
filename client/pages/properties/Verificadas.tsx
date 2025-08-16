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
  Shield,
  Award,
  FileText,
  Camera,
  Clock,
  Users,
  Building,
  Home,
  MessageCircle,
  Download,
  Zap,
  Leaf,
  TrendingUp,
  Lock,
  BookOpen,
  Scale,
  BadgeCheck,
} from "lucide-react";

interface VerifiedProperty {
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
  verificationLevel: "basic" | "premium" | "platinum";
  verificationDate: string;
  verifiedBy: string;
  documents: {
    title: string;
    verified: boolean;
    date: string;
  }[];
  legalCheck: {
    status: "approved" | "pending" | "issues";
    details: string;
  };
  inspection: {
    score: number;
    date: string;
    inspector: string;
    report: string;
  };
  marketAnalysis: {
    fairValue: number;
    appreciation: number;
    roi: number;
  };
  features: string[];
  tags: string[];
  certifications: string[];
  trustScore: number;
}

export default function Verificadas() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [savedProperties, setSavedProperties] = useState<Set<string>>(
    new Set(),
  );

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    location: "",
    bedrooms: "",
    propertyType: "",
    trustScore: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample verified properties
  const properties: VerifiedProperty[] = [
    {
      id: "1",
      title: "Villa Premium Ocean View Verificada",
      location: "Costa Adeje, Tenerife",
      price: 1450000,
      pricePerSqm: 3625,
      bedrooms: 4,
      bathrooms: 3,
      sqm: 400,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description:
        "Villa de lujo completamente verificada con documentación legal al día y valoración profesional.",
      category: "Villa",
      verificationLevel: "platinum",
      verificationDate: "2024-01-15",
      verifiedBy: "BlueEye Verification Team",
      documents: [
        { title: "Escritura de propiedad", verified: true, date: "2024-01-10" },
        { title: "Nota simple registral", verified: true, date: "2024-01-12" },
        { title: "Certificado energético", verified: true, date: "2024-01-08" },
        { title: "IBI y tasas", verified: true, date: "2024-01-15" },
        { title: "Seguro de hogar", verified: true, date: "2024-01-14" },
      ],
      legalCheck: {
        status: "approved",
        details:
          "Documentación completa y sin cargas. Propiedad libre de gravámenes.",
      },
      inspection: {
        score: 95,
        date: "2024-01-10",
        inspector: "Técnico Certificado COAATIC",
        report: "Estado excelente. Estructura sólida, instalaciones nuevas.",
      },
      marketAnalysis: {
        fairValue: 1450000,
        appreciation: 12,
        roi: 7.8,
      },
      features: [
        "Piscina privada",
        "Vista panorámica",
        "Garaje doble",
        "Jardín",
        "Terraza 80m²",
      ],
      tags: ["Premium", "Vista mar", "Lujo", "Piscina"],
      certifications: ["ISO 9001", "BREEAM", "Calificación A"],
      trustScore: 98,
    },
    {
      id: "2",
      title: "Penthouse Marina Certificado Premium",
      location: "Las Palmas, Gran Canaria",
      price: 890000,
      pricePerSqm: 4450,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 200,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Ático en primera línea con verificación premium y garantía legal completa.",
      category: "Penthouse",
      verificationLevel: "premium",
      verificationDate: "2024-01-20",
      verifiedBy: "Notaría García & Asociados",
      documents: [
        { title: "Escritura de propiedad", verified: true, date: "2024-01-18" },
        { title: "Nota simple registral", verified: true, date: "2024-01-20" },
        { title: "Certificado energético", verified: true, date: "2024-01-15" },
        { title: "IBI y tasas", verified: true, date: "2024-01-19" },
      ],
      legalCheck: {
        status: "approved",
        details: "Situación legal correcta. Comunidad al corriente de pagos.",
      },
      inspection: {
        score: 88,
        date: "2024-01-16",
        inspector: "Arquitecto Técnico Col. 2154",
        report: "Buen estado general. Reformas recientes de calidad.",
      },
      marketAnalysis: {
        fairValue: 890000,
        appreciation: 8,
        roi: 6.5,
      },
      features: [
        "Terraza panorámica",
        "Plaza parking",
        "Trastero",
        "Ascensor",
        "Conserje",
      ],
      tags: ["Marina", "Ático", "Primera línea", "Inversión"],
      certifications: ["CE", "Habitabilidad"],
      trustScore: 92,
    },
    {
      id: "3",
      title: "Casa Rural Verificada con Licencia Turística",
      location: "La Orotava, Tenerife",
      price: 520000,
      pricePerSqm: 2888,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 180,
      images: ["/placeholder.svg"],
      description:
        "Casa tradicional canaria con licencia turística verificada y documentación completa.",
      category: "Casa Rural",
      verificationLevel: "basic",
      verificationDate: "2024-01-25",
      verifiedBy: "Gestoría Inmobiliaria Canarias",
      documents: [
        { title: "Escritura de propiedad", verified: true, date: "2024-01-22" },
        { title: "Licencia turística", verified: true, date: "2024-01-24" },
        { title: "Certificado energético", verified: true, date: "2024-01-20" },
      ],
      legalCheck: {
        status: "approved",
        details: "Licencia turística en vigor. Actividad rental legal.",
      },
      inspection: {
        score: 85,
        date: "2024-01-22",
        inspector: "Perito Tasador Oficial",
        report:
          "Estructura tradicional bien conservada. Reformas necesarias menores.",
      },
      marketAnalysis: {
        fairValue: 520000,
        appreciation: 15,
        roi: 9.2,
      },
      features: [
        "Licencia turística",
        "Patio canario",
        "Barbacoa",
        "Parking",
        "WiFi",
      ],
      tags: ["Rural", "Turística", "Tradicional", "ROI alto"],
      certifications: ["Licencia turística", "Habitabilidad"],
      trustScore: 87,
    },
    {
      id: "4",
      title: "Apartamento Inversión Verificado Premium",
      location: "Playa de las Américas, Tenerife",
      price: 280000,
      pricePerSqm: 3500,
      bedrooms: 2,
      bathrooms: 1,
      sqm: 80,
      images: ["/placeholder.svg", "/placeholder.svg"],
      description:
        "Apartamento ideal para inversión con documentación verificada y análisis de rentabilidad.",
      category: "Apartamento",
      verificationLevel: "premium",
      verificationDate: "2024-01-28",
      verifiedBy: "BlueEye Legal Team",
      documents: [
        { title: "Escritura de propiedad", verified: true, date: "2024-01-26" },
        { title: "Nota simple registral", verified: true, date: "2024-01-28" },
        { title: "Certificado energético", verified: true, date: "2024-01-25" },
        { title: "Estatutos comunidad", verified: true, date: "2024-01-27" },
      ],
      legalCheck: {
        status: "approved",
        details:
          "Sin cargas. Comunidad solvente. Ideal para alquiler turístico.",
      },
      inspection: {
        score: 82,
        date: "2024-01-26",
        inspector: "Tasador Homologado",
        report:
          "Estado correcto. Reformado recientemente. Listo para alquilar.",
      },
      marketAnalysis: {
        fairValue: 280000,
        appreciation: 10,
        roi: 8.5,
      },
      features: [
        "Reformado",
        "Amueblado",
        "Balcón",
        "Cerca playa",
        "Comunidad piscina",
      ],
      tags: ["Inversión", "Playa", "Reformado", "Amueblado"],
      certifications: ["CE", "Habitabilidad"],
      trustScore: 89,
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

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      selectedLevel === "all" || property.verificationLevel === selectedLevel;

    const matchesPriceMin =
      !filters.priceMin || property.price >= parseInt(filters.priceMin);
    const matchesPriceMax =
      !filters.priceMax || property.price <= parseInt(filters.priceMax);

    return matchesSearch && matchesLevel && matchesPriceMin && matchesPriceMax;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getVerificationBadge = (level: string) => {
    switch (level) {
      case "platinum":
        return { color: "bg-purple-500/90", text: "Platinum", icon: "💎" };
      case "premium":
        return { color: "bg-yellow-500/90", text: "Premium", icon: "🏆" };
      case "basic":
        return { color: "bg-blue-500/90", text: "Básica", icon: "✓" };
      default:
        return { color: "bg-gray-500/90", text: "Sin verificar", icon: "?" };
    }
  };

  const getTrustColor = (score: number) => {
    if (score >= 95) return "text-purple-400";
    if (score >= 90) return "text-green-400";
    if (score >= 85) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 p-2.5 shadow-lg shadow-purple-500/30">
                <BadgeCheck className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
                  Propiedades Verificadas
                </h1>
                <p className="text-purple-400 font-medium">
                  Garantía legal y técnica completa
                </p>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl">
              Todas nuestras propiedades verificadas han pasado rigurosos
              controles legales, técnicos y de mercado. Compra con total
              confianza y transparencia.
            </p>
          </div>

          {/* Verification Levels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl text-center border border-blue-500/20">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Verificación Básica
              </h3>
              <p className="text-white/70 text-sm">
                Documentación legal, escrituras y cargas verificadas por
                gestores especializados.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border border-yellow-500/20">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Verificación Premium
              </h3>
              <p className="text-white/70 text-sm">
                Incluye inspección técnica, valoración profesional y análisis de
                mercado completo.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border border-purple-500/20">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Verificación Platinum
              </h3>
              <p className="text-white/70 text-sm">
                Máximo nivel: auditoría completa, certificaciones, garantía
                legal y seguro de compra.
              </p>
            </div>
          </div>

          {/* Verification Level Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedLevel("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedLevel === "all"
                    ? "bg-neon-teal text-blue-dark"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                Todas ({properties.length})
              </button>
              <button
                onClick={() => setSelectedLevel("platinum")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedLevel === "platinum"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                💎 Platinum (
                {
                  properties.filter((p) => p.verificationLevel === "platinum")
                    .length
                }
                )
              </button>
              <button
                onClick={() => setSelectedLevel("premium")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedLevel === "premium"
                    ? "bg-yellow-500 text-black"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                🏆 Premium (
                {
                  properties.filter((p) => p.verificationLevel === "premium")
                    .length
                }
                )
              </button>
              <button
                onClick={() => setSelectedLevel("basic")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedLevel === "basic"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                ✓ Básica (
                {
                  properties.filter((p) => p.verificationLevel === "basic")
                    .length
                }
                )
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
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">
                      Trust Score
                    </label>
                    <select
                      value={filters.trustScore}
                      onChange={(e) =>
                        setFilters({ ...filters, trustScore: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                    >
                      <option value="">Cualquiera</option>
                      <option value="95">95+</option>
                      <option value="90">90+</option>
                      <option value="85">85+</option>
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
                {filteredProperties.length} propiedades verificadas
              </h2>
              <p className="text-white/60 text-sm">
                Con garantía legal y técnica completa
              </p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-teal">
              <option>Trust Score más alto</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Recientemente verificadas</option>
              <option>Mejor ROI</option>
            </select>
          </div>

          {/* Properties Grid */}
          <div
            className={`grid gap-6 mb-12 ${
              viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {filteredProperties.map((property) => {
              const verificationBadge = getVerificationBadge(
                property.verificationLevel,
              );
              return (
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
                        <div
                          className={`${verificationBadge.color} text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1`}
                        >
                          <span>{verificationBadge.icon}</span>
                          Verificación {verificationBadge.text}
                        </div>
                        <div
                          className={`bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTrustColor(property.trustScore)}`}
                        >
                          <Shield className="w-3 h-3" />
                          Trust Score: {property.trustScore}%
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
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
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center">
                        <div className="glass-card px-3 py-1 rounded-lg backdrop-blur-md">
                          <span className="text-white font-bold text-lg">
                            {formatCurrency(property.price)}
                          </span>
                        </div>
                        {property.marketAnalysis.roi > 7 && (
                          <div className="bg-green-500/90 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            ROI {property.marketAnalysis.roi}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {property.title}
                    </h3>

                    <div className="flex items-center space-x-1 mb-2">
                      <MapPin className="w-4 h-4 text-white/60" />
                      <span className="text-white/70 text-sm">
                        {property.location}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 mb-4">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="text-white/70 text-sm">
                        Verificada el{" "}
                        {new Date(property.verificationDate).toLocaleDateString(
                          "es-ES",
                        )}
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

                    {/* Verification Details */}
                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <h4 className="text-white font-medium mb-2 text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-400" />
                        Estado Verificación
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-white/80">
                            Documentos: {property.documents.length}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Scale className="w-3 h-3 text-green-400" />
                          <span className="text-white/80">
                            Legal: {property.legalCheck.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-green-400" />
                          <span className="text-white/80">
                            Inspección: {property.inspection.score}/100
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-white/80">
                            Valor justo verificado
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-white/60">
                        <div>{formatCurrency(property.pricePerSqm)}/m²</div>
                        <div>Por {property.verifiedBy}</div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/property/${property.id}`}
                          className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Ver verificación
                        </Link>
                        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Section */}
          <div className="glass-card p-8 rounded-2xl text-center mb-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Garantía BlueEye Homes
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              Todas nuestras propiedades verificadas incluyen garantía legal
              completa. Si encuentras cualquier problema documental no detectado
              en nuestra verificación, te devolvemos el 100% del precio de
              compra.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Descargar términos de garantía
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concierge */}
      <AIConcierge />
    </div>
  );
}
