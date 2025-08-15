import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Smartphone,
  Shield,
  Thermometer,
  Lightbulb,
  Camera,
  Speaker,
  Wifi,
  Lock,
  Zap,
  Home,
  Star,
  CheckCircle,
  Euro,
  Clock,
  Phone,
  MapPin,
  Filter,
  Search,
  Brain,
  Eye,
  Volume2,
  Mic,
  Car,
  Wind,
  Droplets,
  Sun,
  Settings,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SmartHomeProvider {
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
  installationTime: string;
  warranty: string;
  location: string;
  specialties: string[];
  featured: boolean;
  blueEyePartner: boolean;
}

export default function SmartHome() {
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
    { id: "all", label: "Todos", icon: Home, count: 47 },
    { id: "security", label: "Seguridad", icon: Shield, count: 12 },
    { id: "climate", label: "Climatización", icon: Thermometer, count: 8 },
    { id: "lighting", label: "Iluminación", icon: Lightbulb, count: 6 },
    { id: "audio-video", label: "Audio/Video", icon: Speaker, count: 9 },
    { id: "automation", label: "Automatización", icon: Brain, count: 7 },
    { id: "energy", label: "Energía", icon: Zap, count: 5 },
  ];

  const providers: SmartHomeProvider[] = [
    {
      id: "1",
      name: "TechHome Canarias",
      category: "automation",
      description:
        "Especialistas en domótica integral y automatización del hogar. Sistemas inteligentes para propiedades de lujo.",
      rating: 4.9,
      reviews: 127,
      priceRange: "€5,000 - €25,000",
      image: "/placeholder.svg",
      services: [
        "Instalación completa",
        "Configuración sistemas",
        "Mantenimiento",
        "Soporte 24/7",
      ],
      certifications: ["KNX Certified", "Control4 Dealer", "Crestron Partner"],
      installationTime: "3-7 días",
      warranty: "5 años",
      location: "Tenerife Sur",
      specialties: ["Villa de lujo", "Sistemas integrados", "Control por voz"],
      featured: true,
      blueEyePartner: true,
    },
    {
      id: "2",
      name: "SecureLife Systems",
      category: "security",
      description:
        "Sistemas de seguridad avanzados con IA. Cámaras 4K, alarmas inteligentes y control de acceso biométrico.",
      rating: 4.8,
      reviews: 89,
      priceRange: "€3,000 - €15,000",
      image: "/placeholder.svg",
      services: ["Cámaras IP", "Alarmas", "Control acceso", "Monitoreo remoto"],
      certifications: ["Hikvision Partner", "Dahua Certified", "Ajax Systems"],
      installationTime: "1-3 días",
      warranty: "3 años",
      location: "Las Palmas",
      specialties: [
        "Detección IA",
        "Reconocimiento facial",
        "Análisis comportamiento",
      ],
      featured: false,
      blueEyePartner: true,
    },
    {
      id: "3",
      name: "ClimaTech Pro",
      category: "climate",
      description:
        "Control inteligente de climatización. Termostatos WiFi, zonificación automática y eficiencia energética.",
      rating: 4.7,
      reviews: 156,
      priceRange: "€2,500 - €12,000",
      image: "/placeholder.svg",
      services: [
        "Termostatos inteligentes",
        "Zonificación",
        "Control remoto",
        "Análisis consumo",
      ],
      certifications: ["Nest Pro", "Honeywell Partner", "Tado Installer"],
      installationTime: "1-2 días",
      warranty: "2 años",
      location: "Costa Adeje",
      specialties: [
        "Eficiencia energética",
        "Geolocalización",
        "Programación IA",
      ],
      featured: false,
      blueEyePartner: false,
    },
    {
      id: "4",
      name: "LuxLight Solutions",
      category: "lighting",
      description:
        "Iluminación inteligente LED. Escenas automáticas, control circadiano y ahorro energético hasta 80%.",
      rating: 4.9,
      reviews: 203,
      priceRange: "€1,500 - €8,000",
      image: "/placeholder.svg",
      services: [
        "LED inteligente",
        "Escenas automáticas",
        "Control circadiano",
        "Dimming automático",
      ],
      certifications: ["Philips Hue Pro", "LIFX Partner", "Lutron Dealer"],
      installationTime: "1 día",
      warranty: "3 años",
      location: "Puerto de la Cruz",
      specialties: [
        "Ritmo circadiano",
        "Eficiencia LED",
        "Diseño personalizado",
      ],
      featured: true,
      blueEyePartner: true,
    },
    {
      id: "5",
      name: "AudioVision Elite",
      category: "audio-video",
      description:
        "Sistemas multimedia avanzados. Audio multizona, cine en casa 8K y streaming de alta fidelidad.",
      rating: 4.8,
      reviews: 94,
      priceRange: "€4,000 - €30,000",
      image: "/placeholder.svg",
      services: [
        "Audio multizona",
        "Cine en casa",
        "Streaming 8K",
        "Control unificado",
      ],
      certifications: ["Sonos Pro", "Bose Professional", "KEF Partner"],
      installationTime: "2-5 días",
      warranty: "4 años",
      location: "Arona",
      specialties: [
        "Alta fidelidad",
        "Acústica profesional",
        "Integración total",
      ],
      featured: false,
      blueEyePartner: true,
    },
    {
      id: "6",
      name: "EnergyWise Canarias",
      category: "energy",
      description:
        "Gestión inteligente de energía. Monitoreo consumo, optimización automática y integración solar.",
      rating: 4.6,
      reviews: 67,
      priceRange: "€2,000 - €10,000",
      image: "/placeholder.svg",
      services: [
        "Monitoreo energía",
        "Optimización automática",
        "Integración solar",
        "Baterías inteligentes",
      ],
      certifications: [
        "Tesla Powerwall",
        "SolarEdge Partner",
        "Victron Dealer",
      ],
      installationTime: "2-4 días",
      warranty: "10 años",
      location: "Granadilla",
      specialties: ["Autoconsumo", "Baterías Tesla", "Optimización IA"],
      featured: false,
      blueEyePartner: false,
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-3 shadow-lg shadow-neon-teal/30">
                <Brain className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient">
                  Smart Home
                </h1>
                <p className="text-neon-teal font-medium">
                  Domótica & Automatización
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Transforma tu propiedad en un hogar inteligente. Desde sistemas de
              seguridad avanzados hasta automatización completa del hogar con
              IA.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-neon-teal font-bold">47+ </span>
                <span className="text-white/70">Especialistas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-neon-emerald font-bold">850+ </span>
                <span className="text-white/70">Instalaciones</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-bold">98% </span>
                <span className="text-white/70">Satisfacción</span>
              </div>
            </div>
          </div>

          {/* Featured Partners */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-6 h-6 text-neon-teal" />
              <h2 className="text-2xl font-bold text-white">
                Partners Destacados
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-neon-teal/20 hover-glow-teal"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-white">
                          {provider.name}
                        </h3>
                        {provider.blueEyePartner && (
                          <div className="bg-neon-teal/20 text-neon-teal px-2 py-1 rounded-full text-xs font-medium">
                            Partner BlueEye
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">
                            {provider.rating}
                          </span>
                          <span className="text-white/60 text-sm">
                            ({provider.reviews})
                          </span>
                        </div>
                        <div className="text-neon-teal text-sm font-medium">
                          {provider.priceRange}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">
                        {provider.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {provider.specialties
                            .slice(0, 2)
                            .map((specialty, index) => (
                              <span
                                key={index}
                                className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Categorías</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`glass-card p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "border-neon-teal bg-neon-teal/20 scale-105"
                        : "border-white/10 hover:border-neon-teal/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-neon-teal"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-neon-teal"
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
                    <div className="absolute top-4 left-4">
                      {provider.blueEyePartner && (
                        <div className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner BlueEye
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                        {provider.category}
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

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">
                          Rango precios:
                        </span>
                        <span className="text-neon-teal font-medium text-sm">
                          {provider.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">
                          Instalación:
                        </span>
                        <span className="text-white text-sm">
                          {provider.installationTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">Garantía:</span>
                        <span className="text-white text-sm">
                          {provider.warranty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">
                          Ubicación:
                        </span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-white/60" />
                          <span className="text-white text-sm">
                            {provider.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium text-sm mb-2">
                        Servicios:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                          >
                            {service}
                          </span>
                        ))}
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
                            className="bg-neon-teal/20 text-neon-teal px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contactar
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Ver más
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
