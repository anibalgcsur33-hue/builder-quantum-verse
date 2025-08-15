import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Sun,
  Battery,
  Zap,
  Leaf,
  TrendingUp,
  Calculator,
  Shield,
  Award,
  Star,
  CheckCircle,
  Euro,
  Clock,
  Phone,
  MapPin,
  Filter,
  Search,
  Home,
  Factory,
  Building,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  Calendar,
  Users,
  Gauge,
  Wind,
  Droplets,
  ThermometerSun,
  Recycle,
} from "lucide-react";

interface SolarProvider {
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
  completedProjects: number;
  avgSavings: number;
  powerRange: string;
}

export default function SolarEnergia() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { id: "all", label: "Todos", icon: Sun, count: 34 },
    { id: "residential", label: "Residencial", icon: Home, count: 18 },
    { id: "commercial", label: "Comercial", icon: Building, count: 12 },
    { id: "batteries", label: "Baterías", icon: Battery, count: 8 },
    { id: "maintenance", label: "Mantenimiento", icon: Shield, count: 6 },
  ];

  const providers: SolarProvider[] = [
    {
      id: "1",
      name: "SolarTech Canarias",
      category: "residential",
      description:
        "Líderes en energía solar residencial. Instalaciones premium para villas y propiedades de lujo con garantía de 25 años.",
      rating: 4.9,
      reviews: 234,
      priceRange: "€8,000 - €35,000",
      image: "/placeholder.svg",
      services: [
        "Instalación solar",
        "Baterías Tesla",
        "Monitoreo IoT",
        "Mantenimiento",
      ],
      certifications: [
        "Tesla Powerwall Certified",
        "SolarEdge Partner",
        "ISO 9001",
      ],
      installationTime: "2-5 días",
      warranty: "25 años",
      location: "Tenerife Sur",
      specialties: ["Tesla Powerwall", "Autoconsumo", "Monitoreo IA"],
      featured: true,
      blueEyePartner: true,
      completedProjects: 450,
      avgSavings: 75,
      powerRange: "5-20 kW",
    },
    {
      id: "2",
      name: "GreenPower Solutions",
      category: "commercial",
      description:
        "Especialistas en instalaciones solares comerciales e industriales. Proyectos a gran escala con ROI garantizado.",
      rating: 4.8,
      reviews: 167,
      priceRange: "€25,000 - €150,000",
      image: "/placeholder.svg",
      services: [
        "Solar comercial",
        "Proyectos industriales",
        "Financiación",
        "O&M",
      ],
      certifications: ["IEC 61215", "UL 1703", "TÜV Rheinland"],
      installationTime: "1-4 semanas",
      warranty: "20 años",
      location: "Las Palmas",
      specialties: ["Gran escala", "ROI garantizado", "Financiación verde"],
      featured: true,
      blueEyePartner: true,
      completedProjects: 89,
      avgSavings: 65,
      powerRange: "50-500 kW",
    },
    {
      id: "3",
      name: "EcoEnergy Canarias",
      category: "residential",
      description:
        "Soluciones sostenibles integrales. Solar + aerotermia + domótica para la máxima eficiencia energética.",
      rating: 4.7,
      reviews: 189,
      priceRange: "€12,000 - €45,000",
      image: "/placeholder.svg",
      services: [
        "Solar híbrido",
        "Aerotermia",
        "Domótica",
        "Auditoría energética",
      ],
      certifications: ["IDAE", "Panasonic Partner", "Viessmann Certified"],
      installationTime: "3-7 días",
      warranty: "15 años",
      location: "Costa Adeje",
      specialties: ["Hibridación", "Aerotermia", "Eficiencia máxima"],
      featured: false,
      blueEyePartner: false,
      completedProjects: 320,
      avgSavings: 80,
      powerRange: "8-25 kW",
    },
    {
      id: "4",
      name: "BatteryLife Pro",
      category: "batteries",
      description:
        "Especialistas en sistemas de almacenamiento. Baterías de litio de última generación con gestión inteligente.",
      rating: 4.8,
      reviews: 98,
      priceRange: "€5,000 - €20,000",
      image: "/placeholder.svg",
      services: [
        "Baterías litio",
        "Gestión inteligente",
        "Backup total",
        "Monitoreo 24/7",
      ],
      certifications: ["LG Chem Partner", "BYD Certified", "Pylontech Dealer"],
      installationTime: "1-2 días",
      warranty: "10 a��os",
      location: "Arona",
      specialties: ["Almacenamiento", "Backup completo", "Gestión IA"],
      featured: false,
      blueEyePartner: true,
      completedProjects: 156,
      avgSavings: 90,
      powerRange: "10-100 kWh",
    },
    {
      id: "5",
      name: "SolarMaintenance Pro",
      category: "maintenance",
      description:
        "Mantenimiento especializado y optimización de instalaciones solares. Servicio 24/7 con drones de inspección.",
      rating: 4.9,
      reviews: 145,
      priceRange: "€200 - €800/año",
      image: "/placeholder.svg",
      services: [
        "Mantenimiento preventivo",
        "Inspección con drones",
        "Limpieza automática",
        "Optimización",
      ],
      certifications: ["IEA PVPS", "NREL Certified", "ISO 14001"],
      installationTime: "1 día",
      warranty: "5 años",
      location: "Puerto de la Cruz",
      specialties: [
        "Drones inspección",
        "Limpieza robótica",
        "Análisis predictivo",
      ],
      featured: false,
      blueEyePartner: false,
      completedProjects: 890,
      avgSavings: 25,
      powerRange: "N/A",
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-3 shadow-lg shadow-yellow-400/30">
                <Sun className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Energía Solar
                  </span>
                </h1>
                <p className="text-yellow-400 font-medium">
                  Sostenibilidad & Ahorro
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Aprovecha el sol de Canarias. Instalaciones solares de última
              generación con hasta 90% de ahorro energético y ROI garantizado.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-yellow-400 font-bold">350+ </span>
                <span className="text-white/70">días de sol/año</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-orange-400 font-bold">75% </span>
                <span className="text-white/70">Ahorro promedio</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-red-400 font-bold">1,200+ </span>
                <span className="text-white/70">Instalaciones</span>
              </div>
            </div>
          </div>

          {/* Solar Calculator Widget */}
          <section className="mb-12">
            <div className="glass-card p-6 rounded-2xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Calculadora Solar Instantánea
                    </h3>
                    <p className="text-white/70 text-sm">
                      Descubre tu potencial de ahorro en 30 segundos
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calcular Ahorro
                </button>
              </div>

              {showCalculator && (
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        Factura mensual €
                      </label>
                      <input
                        type="number"
                        placeholder="150"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        m² de tejado
                      </label>
                      <input
                        type="number"
                        placeholder="100"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        Orientación
                      </label>
                      <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                        <option>Sur</option>
                        <option>Suroeste</option>
                        <option>Sureste</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full btn-secondary">
                        Ver Resultados
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Featured Providers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                Instaladores Certificados
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-yellow-400/20 hover-glow"
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
                          <div className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                            Partner BlueEye
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">
                            {provider.rating}
                          </span>
                          <span className="text-white/60 text-sm">
                            ({provider.reviews})
                          </span>
                        </div>
                        <div className="text-yellow-400 text-sm font-medium">
                          {provider.powerRange}
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">
                            {provider.avgSavings}% ahorro
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-white/70 text-sm">
                            {provider.completedProjects} proyectos
                          </span>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">
                        {provider.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-yellow-400 font-medium">
                          {provider.priceRange}
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Presupuesto
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ¿Por qué Energía Solar en Canarias?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <ThermometerSun className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Clima Ideal</h3>
                <p className="text-white/70 text-sm">
                  350+ días de sol al año. Irradiación solar óptima todo el año.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Euro className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">ROI 6-8 años</h3>
                <p className="text-white/70 text-sm">
                  Retorno de inversión garantizado. Ahorro inmediato en factura.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">100% Limpia</h3>
                <p className="text-white/70 text-sm">
                  Reduce tu huella de carbono hasta 3 toneladas CO₂/año.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Valor Inmueble</h3>
                <p className="text-white/70 text-sm">
                  Incrementa el valor de tu propiedad hasta un 15%.
                </p>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Especialidades
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`glass-card p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "border-yellow-400 bg-yellow-400/20 scale-105"
                        : "border-white/10 hover:border-yellow-400/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-yellow-400"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-yellow-400"
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
                        <div className="bg-yellow-400/90 text-blue-dark px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner BlueEye
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                        {provider.powerRange}
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
                        <div className="text-green-400 font-bold">
                          {provider.avgSavings}%
                        </div>
                        <div className="text-xs text-white/60">Ahorro</div>
                      </div>
                      <div className="glass p-2 rounded text-center">
                        <div className="text-white font-bold">
                          {provider.completedProjects}
                        </div>
                        <div className="text-xs text-white/60">Proyectos</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Precio:</span>
                        <span className="text-yellow-400 font-medium">
                          {provider.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Instalación:</span>
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
                            className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Presupuesto
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
