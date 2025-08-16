import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Droplets,
  Wrench,
  Filter as FilterIcon,
  ShowerHead,
  Thermometer,
  Zap,
  Shield,
  Gauge,
  Star,
  CheckCircle,
  Euro,
  Phone,
  MapPin,
  Filter,
  Search,
  Sparkles,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Clock,
  Settings,
  Beaker,
  Recycle,
  AlertCircle,
} from "lucide-react";

interface WaterProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  priceRange: string;
  image: string;
  services: string[];
  certifications: string[];
  responseTime: string;
  warranty: string;
  location: string;
  specialties: string[];
  featured: boolean;
  blueEyePartner: boolean;
  completedInstallations: number;
  experienceYears: number;
  emergency24h: boolean;
}

export default function SistemasAgua() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { id: "all", label: "Todos", icon: Droplets, count: 19 },
    { id: "plumbing", label: "Fontanería", icon: Wrench, count: 7 },
    { id: "treatment", label: "Tratamiento", icon: FilterIcon, count: 5 },
    { id: "heating", label: "Calentadores", icon: Thermometer, count: 4 },
    { id: "pumps", label: "Bombas", icon: Settings, count: 3 },
  ];

  const providers: WaterProvider[] = [
    {
      id: "1",
      name: "HydroTech Canarias",
      category: "treatment",
      description:
        "Especialistas en tratamiento de agua avanzado. Sistemas de filtración, descalcificación y purificación para propiedades de lujo.",
      rating: 4.9,
      reviews: 156,
      priceRange: "€2,500 - €15,000",
      image: "/placeholder.svg",
      services: [
        "Purificación avanzada",
        "Descalcificación",
        "Sistemas UV",
        "Monitoreo IoT",
      ],
      certifications: [
        "Water Quality Association",
        "NSF Certified",
        "ISO 14001",
      ],
      responseTime: "2-4 horas",
      warranty: "5 años",
      location: "Costa Adeje",
      specialties: ["Agua ultra pura", "Sistemas IoT", "Filtración avanzada"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 234,
      experienceYears: 18,
      emergency24h: true,
    },
    {
      id: "2",
      name: "PlumbPro Solutions",
      category: "plumbing",
      description:
        "Fontanería profesional y reparaciones urgentes. Servicio 24/7 con tecnología de detección de fugas y reparaciones sin obras.",
      rating: 4.7,
      reviews: 289,
      priceRange: "€80 - €2,000",
      image: "/placeholder.svg",
      services: [
        "Reparaciones urgentes",
        "Detección de fugas",
        "Instalaciones nuevas",
        "Mantenimiento preventivo",
      ],
      certifications: [
        "Master Plumber License",
        "Leak Detection Certified",
        "Emergency Response Pro",
      ],
      responseTime: "30 minutos",
      warranty: "2 años",
      location: "Las Palmas",
      specialties: ["Emergencias 24h", "Sin obras", "Detección fugas"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 892,
      experienceYears: 22,
      emergency24h: true,
    },
    {
      id: "3",
      name: "SolarWater Canarias",
      category: "heating",
      description:
        "Calentadores solares de agua y sistemas híbridos. Aprovecha el sol canario para agua caliente eficiente y sostenible.",
      rating: 4.8,
      reviews: 134,
      priceRange: "€1,200 - €8,000",
      image: "/placeholder.svg",
      services: [
        "Calentadores solares",
        "Sistemas híbridos",
        "Mantenimiento",
        "Optimización",
      ],
      certifications: [
        "Solar Water Heating",
        "IDAE Certified",
        "Energy Efficiency Pro",
      ],
      responseTime: "1-2 días",
      warranty: "10 años",
      location: "Tenerife Sur",
      specialties: ["Energía solar", "Sistemas híbridos", "Ahorro energético"],
      featured: false,
      blueEyePartner: true,
      completedInstallations: 267,
      experienceYears: 15,
      emergency24h: false,
    },
    {
      id: "4",
      name: "PurAqua Systems",
      category: "treatment",
      description:
        "Osmosis inversa y tratamientos especializados. Agua de calidad premium para consumo y aplicaciones industriales.",
      rating: 4.6,
      reviews: 98,
      priceRange: "€800 - €12,000",
      image: "/placeholder.svg",
      services: [
        "Osmosis inversa",
        "Remineralización",
        "Análisis de agua",
        "Mantenimiento",
      ],
      certifications: [
        "RO Specialist",
        "Water Analysis Certified",
        "Health Standards Compliant",
      ],
      responseTime: "24 horas",
      warranty: "3 años",
      location: "Puerto de la Cruz",
      specialties: ["Osmosis inversa", "Análisis agua", "Calidad premium"],
      featured: false,
      blueEyePartner: false,
      completedInstallations: 178,
      experienceYears: 12,
      emergency24h: false,
    },
    {
      id: "5",
      name: "PumpMaster Pro",
      category: "pumps",
      description:
        "Bombas de agua y sistemas de presión. Instalación y mantenimiento de equipos de bombeo para villas y edificios.",
      rating: 4.7,
      reviews: 167,
      priceRange: "€400 - €5,000",
      image: "/placeholder.svg",
      services: [
        "Bombas sumergibles",
        "Sistemas de presión",
        "Variadores frecuencia",
        "Mantenimiento",
      ],
      certifications: [
        "Pump Installation Pro",
        "Pressure Systems",
        "Variable Speed Drive",
      ],
      responseTime: "4-6 horas",
      warranty: "3 años",
      location: "Arona",
      specialties: ["Sistemas presión", "Bombas eficientes", "Variadores"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 345,
      experienceYears: 14,
      emergency24h: true,
    },
    {
      id: "6",
      name: "EcoWater Solutions",
      category: "treatment",
      description:
        "Sistemas de reciclaje y reutilización de agua. Tratamiento de grises y aprovechamiento de pluviales para jardines.",
      rating: 4.8,
      reviews: 89,
      priceRange: "€3,000 - €20,000",
      image: "/placeholder.svg",
      services: [
        "Reciclaje aguas grises",
        "Aprovechamiento pluvial",
        "Tratamiento biológico",
        "Riego automatizado",
      ],
      certifications: [
        "Greywater Systems",
        "Rainwater Harvesting",
        "Sustainable Water Pro",
      ],
      responseTime: "1-3 días",
      warranty: "7 años",
      location: "La Palma",
      specialties: ["Sostenibilidad", "Reciclaje agua", "Sistemas cerrados"],
      featured: true,
      blueEyePartner: false,
      completedInstallations: 123,
      experienceYears: 10,
      emergency24h: false,
    },
  ];

  const filteredProviders =
    selectedCategory === "all"
      ? providers
      : providers.filter((provider) => provider.category === selectedCategory);

  const featuredProviders = providers.filter((provider) => provider.featured);

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-3 shadow-lg shadow-blue-500/30">
                <Droplets className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Sistemas de Agua
                  </span>
                </h1>
                <p className="text-blue-400 font-medium">
                  Fontanería & Tratamiento
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Garantiza el suministro perfecto de agua en tu propiedad. Desde
              fontanería profesional hasta sistemas avanzados de tratamiento y
              purificación.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-bold">19+ </span>
                <span className="text-white/70">Especialistas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-cyan-400 font-bold">2,139+ </span>
                <span className="text-white/70">Instalaciones</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-teal-400 font-bold">24/7 </span>
                <span className="text-white/70">Emergencias</span>
              </div>
            </div>
          </div>

          {/* Emergency Banner */}
          <section className="mb-12">
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      ¿Emergencia de Fontanería?
                    </h3>
                    <p className="text-white/70">
                      Respuesta en menos de 30 minutos. Servicio 24/7 en toda Canarias.
                    </p>
                  </div>
                </div>
                <button className="btn-primary bg-red-500 hover:bg-red-600 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </button>
              </div>
            </div>
          </section>

          {/* Featured Providers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Profesionales Destacados
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-blue-400/20 hover-glow"
                >
                  <div className="relative mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-32 rounded-xl object-cover"
                    />
                    <div className="absolute top-2 left-2 space-y-1">
                      {provider.emergency24h && (
                        <div className="bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          24/7
                        </div>
                      )}
                      {provider.blueEyePartner && (
                        <div className="bg-blue-400/90 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-white mb-2">{provider.name}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {provider.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white">{provider.rating}</span>
                      </div>
                      <span className="text-white/60">
                        {provider.completedInstallations} trabajos
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Respuesta:</span>
                      <span className="text-blue-400 font-medium">
                        {provider.responseTime}
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contactar
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Water Services Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Servicios de Agua Especializados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <Wrench className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Fontanería</h3>
                <p className="text-white/70 text-sm mb-3">
                  Reparaciones, instalaciones y mantenimiento profesional.
                </p>
                <p className="text-blue-400 font-medium">€80 - €2,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <FilterIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Purificación</h3>
                <p className="text-white/70 text-sm mb-3">
                  Sistemas de filtración y purificación avanzada.
                </p>
                <p className="text-cyan-400 font-medium">€800 - €15,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Thermometer className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Calentadores</h3>
                <p className="text-white/70 text-sm mb-3">
                  Solares, eléctricos y de gas para agua caliente.
                </p>
                <p className="text-red-400 font-medium">€400 - €8,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Bombas</h3>
                <p className="text-white/70 text-sm mb-3">
                  Sistemas de presión y bombas sumergibles.
                </p>
                <p className="text-purple-400 font-medium">€400 - €5,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Recycle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Reciclaje</h3>
                <p className="text-white/70 text-sm mb-3">
                  Reutilización de aguas grises y pluviales.
                </p>
                <p className="text-green-400 font-medium">€3,000 - €20,000</p>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Especialidades</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`glass-card p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "border-blue-400 bg-blue-400/20 scale-105"
                        : "border-white/10 hover:border-blue-400/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-blue-400"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-blue-400"
                          : "text-white"
                      }`}
                    >
                      {category.label}
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      {category.count}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Providers Grid */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 space-y-2">
                      {provider.blueEyePartner && (
                        <div className="bg-blue-400/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner BlueEye
                        </div>
                      )}
                      {provider.emergency24h && (
                        <div className="bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Emergencias 24/7
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                        {provider.experienceYears} años exp.
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {provider.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">
                          {provider.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm mb-4">
                      {provider.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="glass p-2 rounded text-center">
                        <div className="text-blue-400 font-bold">
                          {provider.completedInstallations}
                        </div>
                        <div className="text-xs text-white/60">Trabajos</div>
                      </div>
                      <div className="glass p-2 rounded text-center">
                        <div className="text-white font-bold">
                          {provider.responseTime}
                        </div>
                        <div className="text-xs text-white/60">Respuesta</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Precio:</span>
                        <span className="text-blue-400 font-medium">
                          {provider.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Garantía:</span>
                        <span className="text-white">{provider.warranty}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium text-sm mb-2">
                        Especialidades:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {provider.emergency24h ? "Emergencia" : "Contactar"}
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        Presupuesto
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
