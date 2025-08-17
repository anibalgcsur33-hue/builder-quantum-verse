import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Waves,
  Thermometer,
  Zap,
  Droplets,
  Shield,
  Wrench,
  Clock,
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
  Palette,
  Settings,
  Sun,
  Snowflake,
  Gem,
} from "lucide-react";

interface PoolProvider {
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
  completedPools: number;
  experienceYears: number;
}

export default function PiscinasSpa() {
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
    { id: "all", label: "Todos", icon: Waves, count: 23 },
    { id: "construction", label: "Construcción", icon: Settings, count: 8 },
    { id: "maintenance", label: "Mantenimiento", icon: Wrench, count: 6 },
    { id: "spa", label: "Spa & Jacuzzi", icon: Gem, count: 4 },
    { id: "heating", label: "Climatización", icon: Thermometer, count: 3 },
    { id: "design", label: "Diseño", icon: Palette, count: 2 },
  ];

  const providers: PoolProvider[] = [
    {
      id: "1",
      name: "AquaTech Canarias",
      category: "construction",
      description:
        "Especialistas en piscinas de lujo con tecnología avanzada. Sistemas de automatización y diseños únicos para villas premium.",
      rating: 4.9,
      reviews: 87,
      priceRange: "€35,000 - €150,000",
      image: "/placeholder.svg",
      services: [
        "Piscinas infinitas",
        "Sistemas automatizados",
        "Climatización",
        "Iluminación LED",
      ],
      certifications: ["ISO 9001", "Certificación NSPF", "Hayward Pro Partner"],
      installationTime: "4-8 semanas",
      warranty: "10 años",
      location: "Costa Adeje",
      specialties: ["Piscinas infinitas", "Automatización", "Diseño custom"],
      featured: true,
      blueEyePartner: true,
      completedPools: 156,
      experienceYears: 15,
    },
    {
      id: "2",
      name: "SpaLux Wellness",
      category: "spa",
      description:
        "Creadores de experiencias wellness. Spas, saunas y jacuzzis de alta gama con terapias de hidroterapia avanzada.",
      rating: 4.8,
      reviews: 64,
      priceRange: "€15,000 - €80,000",
      image: "/placeholder.svg",
      services: [
        "Jacuzzis premium",
        "Saunas finlandesas",
        "Hidroterapia",
        "Cromoterapia",
      ],
      certifications: [
        "Spa Association",
        "Jacuzzi Certified",
        "Wellness Professional",
      ],
      installationTime: "2-4 semanas",
      warranty: "7 años",
      location: "Puerto de la Cruz",
      specialties: ["Wellness", "Hidroterapia", "Diseño terapéutico"],
      featured: true,
      blueEyePartner: true,
      completedPools: 89,
      experienceYears: 12,
    },
    {
      id: "3",
      name: "PoolCare Pro",
      category: "maintenance",
      description:
        "Mantenimiento profesional de piscinas y spas. Servicio 24/7 con tecnología IoT para monitoreo remoto de agua.",
      rating: 4.7,
      reviews: 203,
      priceRange: "€150 - €500/mes",
      image: "/placeholder.svg",
      services: [
        "Mantenimiento integral",
        "Monitoreo IoT",
        "Limpieza automática",
        "Tratamiento químico",
      ],
      certifications: [
        "Pool Operator Certification",
        "Water Quality Specialist",
        "Equipment Certified",
      ],
      installationTime: "1 día",
      warranty: "2 años",
      location: "Las Palmas",
      specialties: ["IoT monitoring", "Química avanzada", "Servicio 24/7"],
      featured: false,
      blueEyePartner: true,
      completedPools: 450,
      experienceYears: 8,
    },
    {
      id: "4",
      name: "EcoPool Solutions",
      category: "construction",
      description:
        "Piscinas ecológicas y sostenibles. Sistemas de depuración natural y calentamiento solar para máximo ahorro energético.",
      rating: 4.6,
      reviews: 72,
      priceRange: "€25,000 - €90,000",
      image: "/placeholder.svg",
      services: [
        "Piscinas naturales",
        "Depuración biológica",
        "Calentamiento solar",
        "Automatización eco",
      ],
      certifications: [
        "Green Building Council",
        "Eco Pool Certified",
        "Solar Heating Pro",
      ],
      installationTime: "6-10 semanas",
      warranty: "12 años",
      location: "Arona",
      specialties: ["Sostenibilidad", "Depuración natural", "Solar heating"],
      featured: false,
      blueEyePartner: false,
      completedPools: 67,
      experienceYears: 10,
    },
    {
      id: "5",
      name: "ClimatePool Tech",
      category: "heating",
      description:
        "Especialistas en climatización de piscinas. Bombas de calor, intercambiadores y sistemas de control de temperatura avanzados.",
      rating: 4.8,
      reviews: 94,
      priceRange: "€5,000 - €25,000",
      image: "/placeholder.svg",
      services: [
        "Bombas de calor",
        "Intercambiadores",
        "Control automático",
        "Eficiencia energética",
      ],
      certifications: [
        "Heat Pump Specialist",
        "Energy Efficiency Pro",
        "Zodiac Partner",
      ],
      installationTime: "1-2 semanas",
      warranty: "5 años",
      location: "Tenerife Sur",
      specialties: ["Climatización", "Eficiencia energética", "Control IoT"],
      featured: false,
      blueEyePartner: true,
      completedPools: 178,
      experienceYears: 9,
    },
    {
      id: "6",
      name: "LuxDesign Pools",
      category: "design",
      description:
        "Diseño arquitectónico de piscinas únicas. Colaboramos con arquitectos para crear piscinas que son obras de arte funcionales.",
      rating: 4.9,
      reviews: 45,
      priceRange: "€50,000 - €200,000",
      image: "/placeholder.svg",
      services: [
        "Diseño arquitectónico",
        "Renderizado 3D",
        "Materiales premium",
        "Paisajismo integrado",
      ],
      certifications: [
        "Design Excellence Award",
        "Architectural Pool Design",
        "Premium Materials Certified",
      ],
      installationTime: "8-16 semanas",
      warranty: "15 años",
      location: "Playa de las Américas",
      specialties: ["Diseño único", "Arquitectura", "Materiales luxury"],
      featured: true,
      blueEyePartner: true,
      completedPools: 34,
      experienceYears: 18,
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-3 shadow-lg shadow-cyan-400/30">
                <Waves className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    Piscinas & Spa
                  </span>
                </h1>
                <p className="text-cyan-400 font-medium">
                  Bienestar & Relajación
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Disfruta del clima perfecto de Canarias con piscinas de lujo y
              spas diseñados para el máximo bienestar. Desde piscinas infinitas
              hasta wellness centers completos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-cyan-400 font-bold">23+ </span>
                <span className="text-white/70">Especialistas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-bold">974+ </span>
                <span className="text-white/70">Piscinas construidas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-indigo-400 font-bold">350+ </span>
                <span className="text-white/70">días para disfrutar</span>
              </div>
            </div>
          </div>

          {/* Featured Providers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">
                Constructores Premium
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-cyan-400/20 hover-glow"
                >
                  <div className="flex items-start space-x-4 mb-4">
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
                          <div className="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full text-xs font-medium">
                            Partner BlueEye
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium text-sm">
                            {provider.rating}
                          </span>
                          <span className="text-white/60 text-xs">
                            ({provider.reviews})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-white/70 text-sm">
                            {provider.completedPools} proyectos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    {provider.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Precio:</span>
                      <span className="text-cyan-400 font-medium">
                        {provider.priceRange}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Tiempo:</span>
                      <span className="text-white">
                        {provider.installationTime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Experiencia:</span>
                      <span className="text-white">
                        {provider.experienceYears} años
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Presupuesto
                    </button>
                    <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Ver galería
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pool Types Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Tipos de Piscinas Populares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <Waves className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Piscina Infinita</h3>
                <p className="text-white/70 text-sm mb-3">
                  Efecto visual espectacular que se funde con el horizonte.
                </p>
                <p className="text-cyan-400 font-medium">€45,000 - €120,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Gem className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Spa & Jacuzzi</h3>
                <p className="text-white/70 text-sm mb-3">
                  Relajación total con hidroterapia y cromoterapia.
                </p>
                <p className="text-purple-400 font-medium">€15,000 - €50,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Sun className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Piscina Natural</h3>
                <p className="text-white/70 text-sm mb-3">
                  Depuración biológica sin químicos, 100% ecológica.
                </p>
                <p className="text-green-400 font-medium">€30,000 - €80,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Thermometer className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Climatizada</h3>
                <p className="text-white/70 text-sm mb-3">
                  Disfruta todo el año con calentamiento eficiente.
                </p>
                <p className="text-red-400 font-medium">€25,000 - €70,000</p>
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
                        ? "border-cyan-400 bg-cyan-400/20 scale-105"
                        : "border-white/10 hover:border-cyan-400/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-cyan-400"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-cyan-400"
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
                        <div className="bg-cyan-400/90 text-blue-dark px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
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
                        <div className="text-cyan-400 font-bold">
                          {provider.completedPools}
                        </div>
                        <div className="text-xs text-white/60">Proyectos</div>
                      </div>
                      <div className="glass p-2 rounded text-center">
                        <div className="text-white font-bold">
                          {provider.experienceYears}
                        </div>
                        <div className="text-xs text-white/60">Años exp.</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Precio:</span>
                        <span className="text-cyan-400 font-medium">
                          {provider.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Tiempo:</span>
                        <span className="text-white">
                          {provider.installationTime}
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
                            className="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded text-xs"
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
