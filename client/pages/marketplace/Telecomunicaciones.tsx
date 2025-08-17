import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Radio,
  Wifi,
  Tv,
  Smartphone,
  Router,
  Satellite,
  Cable,
  Headphones,
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
  Zap,
  Settings,
  MonitorSpeaker,
  Camera,
  Signal,
  Globe,
} from "lucide-react";

interface TelecomProvider {
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
  completedInstallations: number;
  experienceYears: number;
  supportLevel: string;
}

export default function Telecomunicaciones() {
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
    { id: "all", label: "Todos", icon: Radio, count: 26 },
    { id: "internet", label: "Internet", icon: Wifi, count: 8 },
    { id: "audiovisual", label: "Audio/Video", icon: Tv, count: 7 },
    { id: "security", label: "Seguridad", icon: Camera, count: 6 },
    { id: "network", label: "Redes", icon: Router, count: 3 },
    { id: "satellite", label: "Satelital", icon: Satellite, count: 2 },
  ];

  const providers: TelecomProvider[] = [
    {
      id: "1",
      name: "FiberPro Canarias",
      category: "internet",
      description:
        "Instalación de fibra óptica premium hasta 10Gb. Conectividad empresarial y residencial con la máxima velocidad y estabilidad.",
      rating: 4.9,
      reviews: 203,
      priceRange: "€500 - €3,000",
      image: "/placeholder.svg",
      services: [
        "Fibra hasta 10Gb",
        "Red empresarial",
        "WiFi 6E premium",
        "Soporte 24/7",
      ],
      certifications: [
        "Fiber Optic Specialist",
        "Cisco Certified",
        "Wi-Fi Alliance",
      ],
      installationTime: "1-3 días",
      warranty: "5 años",
      location: "Las Palmas",
      specialties: ["Fibra óptica", "Alta velocidad", "Empresarial"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 567,
      experienceYears: 12,
      supportLevel: "Premium 24/7",
    },
    {
      id: "2",
      name: "SmartHome AV Solutions",
      category: "audiovisual",
      description:
        "Sistemas audiovisuales inteligentes. Cine en casa, audio multizona y automatización para la experiencia perfecta.",
      rating: 4.8,
      reviews: 145,
      priceRange: "€2,000 - €25,000",
      image: "/placeholder.svg",
      services: [
        "Cine en casa 8K",
        "Audio multizona",
        "Control inteligente",
        "Acústica profesional",
      ],
      certifications: ["THX Certified", "Dolby Atmos", "Control4 Dealer"],
      installationTime: "3-7 días",
      warranty: "3 años",
      location: "Costa Adeje",
      specialties: ["Cine en casa", "Audio premium", "Automatización"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 234,
      experienceYears: 15,
      supportLevel: "Técnico especializado",
    },
    {
      id: "3",
      name: "SecureVision Pro",
      category: "security",
      description:
        "Sistemas de videovigilancia 4K con IA. Cámaras inteligentes, análisis de comportamiento y monitoreo remoto avanzado.",
      rating: 4.7,
      reviews: 189,
      priceRange: "€1,500 - €12,000",
      image: "/placeholder.svg",
      services: [
        "Cámaras 4K IA",
        "Análisis comportamiento",
        "Monitoreo remoto",
        "Alertas inteligentes",
      ],
      certifications: [
        "Security Professional",
        "Hikvision Partner",
        "AI Analytics Certified",
      ],
      installationTime: "2-4 días",
      warranty: "4 años",
      location: "Tenerife Sur",
      specialties: ["IA avanzada", "4K/8K", "Análisis inteligente"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 345,
      experienceYears: 18,
      supportLevel: "Monitoreo 24/7",
    },
    {
      id: "4",
      name: "NetworkTech Solutions",
      category: "network",
      description:
        "Redes empresariales y domóticas avanzadas. Infraestructura robusta para smart homes y oficinas conectadas.",
      rating: 4.6,
      reviews: 156,
      priceRange: "€800 - €8,000",
      image: "/placeholder.svg",
      services: [
        "Redes empresariales",
        "Infrastructure cableado",
        "Switching/Routing",
        "Seguridad de red",
      ],
      certifications: [
        "Cisco Certified",
        "Network+ Certified",
        "Security+ Professional",
      ],
      installationTime: "2-5 días",
      warranty: "5 años",
      location: "Puerto de la Cruz",
      specialties: ["Infraestructura", "Seguridad", "Escalabilidad"],
      featured: false,
      blueEyePartner: true,
      completedInstallations: 289,
      experienceYears: 20,
      supportLevel: "Soporte técnico",
    },
    {
      id: "5",
      name: "SatConnect Canarias",
      category: "satellite",
      description:
        "Conexiones satelitales de alta velocidad. Internet y TV vía satélite para ubicaciones remotas en las islas.",
      rating: 4.5,
      reviews: 98,
      priceRange: "€600 - €4,000",
      image: "/placeholder.svg",
      services: [
        "Internet satelital",
        "TV vía satélite",
        "Comunicaciones remotas",
        "Backup connectivity",
      ],
      certifications: [
        "Satellite Technology",
        "Starlink Certified",
        "VSAT Specialist",
      ],
      installationTime: "1-2 días",
      warranty: "3 años",
      location: "La Palma",
      specialties: ["Zonas remotas", "Alta disponibilidad", "Backup"],
      featured: false,
      blueEyePartner: false,
      completedInstallations: 167,
      experienceYears: 14,
      supportLevel: "Soporte remoto",
    },
    {
      id: "6",
      name: "AudioLux Premium",
      category: "audiovisual",
      description:
        "Audio de alta fidelidad y sistemas de sonido premium. Instalaciones audiophile para amantes de la música perfecta.",
      rating: 4.9,
      reviews: 87,
      priceRange: "€3,000 - €50,000",
      image: "/placeholder.svg",
      services: [
        "HiFi audiophile",
        "Acústica profesional",
        "Streaming de alta resolución",
        "Calibración personalizada",
      ],
      certifications: [
        "Audiophile Certified",
        "Acoustic Professional",
        "High-End Audio",
      ],
      installationTime: "5-10 días",
      warranty: "5 años",
      location: "Arona",
      specialties: ["Alta fidelidad", "Acústica custom", "Audio premium"],
      featured: true,
      blueEyePartner: true,
      completedInstallations: 123,
      experienceYears: 22,
      supportLevel: "Soporte premium",
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-3 shadow-lg shadow-indigo-500/30">
                <Radio className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Telecomunicaciones
                  </span>
                </h1>
                <p className="text-indigo-400 font-medium">
                  Conectividad & Tecnología
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Mantente conectado con las últimas tecnologías. Fibra óptica,
              sistemas audiovisuales, seguridad inteligente y redes avanzadas
              para tu hogar digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-indigo-400 font-bold">26+ </span>
                <span className="text-white/70">Especialistas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-purple-400 font-bold">1,925+ </span>
                <span className="text-white/70">Instalaciones</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-pink-400 font-bold">10Gb </span>
                <span className="text-white/70">Velocidad máxima</span>
              </div>
            </div>
          </div>

          {/* Speed Test Widget */}
          <section className="mb-12">
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Signal className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Test de Velocidad Gratuito
                    </h3>
                    <p className="text-white/70">
                      Mide tu conexión actual y descubre qué mejoras necesitas.
                    </p>
                  </div>
                </div>
                <button className="btn-primary bg-indigo-500 hover:bg-indigo-600 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Iniciar Test
                </button>
              </div>
            </div>
          </section>

          {/* Featured Providers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">
                Instaladores Certificados
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-indigo-400/20 hover-glow"
                >
                  <div className="relative mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-32 rounded-xl object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {provider.blueEyePartner && (
                        <div className="bg-indigo-400/90 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                        {provider.supportLevel}
                      </div>
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
                        {provider.completedInstallations} instalaciones
                      </span>
                    </div>
                    <div className="text-indigo-400 font-medium text-sm">
                      {provider.priceRange}
                    </div>
                  </div>

                  <button className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Consultar
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Services Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Servicios de Telecomunicaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <Wifi className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Fibra Óptica</h3>
                <p className="text-white/70 text-sm mb-3">
                  Hasta 10Gb simétricos para máxima velocidad.
                </p>
                <p className="text-indigo-400 font-medium">€500 - €3,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Tv className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Audio/Video</h3>
                <p className="text-white/70 text-sm mb-3">
                  Cine en casa y sistemas de entretenimiento.
                </p>
                <p className="text-purple-400 font-medium">€2,000 - €50,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Camera className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Seguridad</h3>
                <p className="text-white/70 text-sm mb-3">
                  Videovigilancia 4K con inteligencia artificial.
                </p>
                <p className="text-pink-400 font-medium">€1,500 - €12,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Router className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Redes</h3>
                <p className="text-white/70 text-sm mb-3">
                  Infraestructura empresarial y domótica.
                </p>
                <p className="text-cyan-400 font-medium">€800 - €8,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Satellite className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Satelital</h3>
                <p className="text-white/70 text-sm mb-3">
                  Conectividad en zonas remotas de las islas.
                </p>
                <p className="text-green-400 font-medium">€600 - €4,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <MonitorSpeaker className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Audio Premium</h3>
                <p className="text-white/70 text-sm mb-3">
                  Sistemas audiophile de alta fidelidad.
                </p>
                <p className="text-yellow-400 font-medium">€3,000 - €50,000</p>
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

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`glass-card p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "border-indigo-400 bg-indigo-400/20 scale-105"
                        : "border-white/10 hover:border-indigo-400/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-indigo-400"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-indigo-400"
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
                        <div className="bg-indigo-400/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner BlueEye
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
                        <div className="text-indigo-400 font-bold">
                          {provider.completedInstallations}
                        </div>
                        <div className="text-xs text-white/60">
                          Instalaciones
                        </div>
                      </div>
                      <div className="glass p-2 rounded text-center">
                        <div className="text-white font-bold">
                          {provider.installationTime}
                        </div>
                        <div className="text-xs text-white/60">Instalación</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Precio:</span>
                        <span className="text-indigo-400 font-medium">
                          {provider.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Garantía:</span>
                        <span className="text-white">{provider.warranty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Soporte:</span>
                        <span className="text-white">
                          {provider.supportLevel}
                        </span>
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
                            className="bg-indigo-400/20 text-indigo-400 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Consultar
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Agendar
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
