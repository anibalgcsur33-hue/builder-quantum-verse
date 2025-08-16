import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  TreePine,
  Flower,
  Droplets,
  Scissors,
  Sprout,
  Leaf,
  Sun,
  Shovel,
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
  Palmtree,
  Wind,
  Recycle,
  Camera,
  Timer,
} from "lucide-react";

interface GardenProvider {
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
  experienceYears: number;
  sustainableApproach: boolean;
}

export default function JardinesPaisajismo() {
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
    { id: "all", label: "Todos", icon: TreePine, count: 35 },
    { id: "design", label: "Diseño", icon: Flower, count: 12 },
    { id: "maintenance", label: "Mantenimiento", icon: Scissors, count: 8 },
    { id: "irrigation", label: "Riego", icon: Droplets, count: 7 },
    { id: "tropical", label: "Tropical", icon: Palmtree, count: 5 },
    { id: "sustainable", label: "Sostenible", icon: Recycle, count: 3 },
  ];

  const providers: GardenProvider[] = [
    {
      id: "1",
      name: "Tropical Gardens Canarias",
      category: "tropical",
      description:
        "Especialistas en jardines tropicales autóctonos. Diseñamos espacios únicos con flora canaria adaptada al clima volcánico y costero.",
      rating: 4.9,
      reviews: 142,
      priceRange: "€8,000 - €50,000",
      image: "/placeholder.svg",
      services: [
        "Diseño tropical",
        "Flora autóctona",
        "Riego eficiente",
        "Mantenimiento eco",
      ],
      certifications: [
        "Paisajista Certificado",
        "Flora Canaria Specialist",
        "Sustainable Landscaping",
      ],
      installationTime: "3-6 semanas",
      warranty: "2 años",
      location: "Tenerife Norte",
      specialties: ["Flora canaria", "Diseño sostenible", "Microclimas"],
      featured: true,
      blueEyePartner: true,
      completedProjects: 287,
      experienceYears: 16,
      sustainableApproach: true,
    },
    {
      id: "2",
      name: "LuxLandscape Design",
      category: "design",
      description:
        "Arquitectura paisajística de lujo. Creamos jardines espectaculares para villas premium con elementos únicos y materiales exclusivos.",
      rating: 4.8,
      reviews: 89,
      priceRange: "€15,000 - €120,000",
      image: "/placeholder.svg",
      services: [
        "Arquitectura paisajística",
        "Materiales premium",
        "Iluminación artística",
        "Elementos acu��ticos",
      ],
      certifications: [
        "Landscape Architecture",
        "Luxury Design Award",
        "Premium Materials Certified",
      ],
      installationTime: "4-10 semanas",
      warranty: "5 años",
      location: "Costa Adeje",
      specialties: ["Diseño luxury", "Elementos únicos", "Arquitectura"],
      featured: true,
      blueEyePartner: true,
      completedProjects: 156,
      experienceYears: 22,
      sustainableApproach: false,
    },
    {
      id: "3",
      name: "AquaGarden Systems",
      category: "irrigation",
      description:
        "Sistemas de riego inteligente y eficiente. Tecnología IoT para optimización hídrica y mantenimiento automatizado de jardines.",
      rating: 4.7,
      reviews: 198,
      priceRange: "€2,000 - €15,000",
      image: "/placeholder.svg",
      services: [
        "Riego automático",
        "Control IoT",
        "Sensores humedad",
        "Optimización hídrica",
      ],
      certifications: [
        "Irrigation Association",
        "Smart Systems Certified",
        "Water Conservation Pro",
      ],
      installationTime: "1-2 semanas",
      warranty: "3 años",
      location: "Las Palmas",
      specialties: ["IoT systems", "Ahorro agua", "Automatización"],
      featured: false,
      blueEyePartner: true,
      completedProjects: 423,
      experienceYears: 12,
      sustainableApproach: true,
    },
    {
      id: "4",
      name: "EcoGreen Solutions",
      category: "sustainable",
      description:
        "Jardinería 100% sostenible. Permacultura, compostaje y sistemas cerrados de agua para jardines autosuficientes y ecológicos.",
      rating: 4.8,
      reviews: 156,
      priceRange: "€5,000 - €35,000",
      image: "/placeholder.svg",
      services: [
        "Permacultura",
        "Compostaje",
        "Plantas nativas",
        "Riego reciclado",
      ],
      certifications: [
        "Permaculture Certified",
        "Organic Gardening",
        "Zero Waste Design",
      ],
      installationTime: "2-5 semanas",
      warranty: "3 años",
      location: "La Palma",
      specialties: ["Permacultura", "Zero waste", "Autosuficiencia"],
      featured: true,
      blueEyePartner: false,
      completedProjects: 203,
      experienceYears: 14,
      sustainableApproach: true,
    },
    {
      id: "5",
      name: "GardenCare Pro",
      category: "maintenance",
      description:
        "Mantenimiento profesional de jardines y áreas verdes. Servicio integral con podas especializadas y tratamientos fitosanitarios.",
      rating: 4.6,
      reviews: 267,
      priceRange: "€150 - €800/mes",
      image: "/placeholder.svg",
      services: [
        "Mantenimiento integral",
        "Podas especializadas",
        "Tratamientos fitosanitarios",
        "Fertilización orgánica",
      ],
      certifications: [
        "Certified Arborist",
        "Plant Health Care",
        "Organic Treatment Specialist",
      ],
      installationTime: "Inmediato",
      warranty: "1 año",
      location: "Arona",
      specialties: ["Podas", "Sanidad vegetal", "Mantenimiento"],
      featured: false,
      blueEyePartner: true,
      completedProjects: 890,
      experienceYears: 18,
      sustainableApproach: true,
    },
    {
      id: "6",
      name: "VerticalGreen Tech",
      category: "design",
      description:
        "Jardines verticales y cubiertas verdes. Innovación en espacios reducidos con sistemas hidropónicos y automatización avanzada.",
      rating: 4.9,
      reviews: 73,
      priceRange: "€3,000 - €25,000",
      image: "/placeholder.svg",
      services: [
        "Jardines verticales",
        "Cubiertas verdes",
        "Hidroponía",
        "Automatización",
      ],
      certifications: [
        "Vertical Garden Specialist",
        "Green Roof Professional",
        "Hydroponic Systems",
      ],
      installationTime: "2-4 semanas",
      warranty: "4 años",
      location: "Puerto de la Cruz",
      specialties: ["Jardines verticales", "Hidroponía", "Innovación"],
      featured: true,
      blueEyePartner: true,
      completedProjects: 98,
      experienceYears: 8,
      sustainableApproach: true,
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 p-3 shadow-lg shadow-green-500/30">
                <TreePine className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                    Jardines & Paisajismo
                  </span>
                </h1>
                <p className="text-green-400 font-medium">
                  Naturaleza & Bienestar
                </p>
              </div>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Transforma tu espacio exterior en un oasis personal. Desde
              jardines tropicales con flora canaria hasta diseños paisajísticos
              de lujo con la máxima sostenibilidad.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-green-400 font-bold">35+ </span>
                <span className="text-white/70">Paisajistas</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-emerald-400 font-bold">2,057+ </span>
                <span className="text-white/70">Jardines creados</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-lime-400 font-bold">80% </span>
                <span className="text-white/70">Flora autóctona</span>
              </div>
            </div>
          </div>

          {/* Featured Providers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">
                Paisajistas Destacados
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-2xl border border-green-400/20 hover-glow"
                >
                  <div className="relative mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-32 rounded-xl object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {provider.sustainableApproach && (
                        <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Eco
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      {provider.blueEyePartner && (
                        <div className="bg-green-400/90 text-blue-dark px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
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
                        {provider.completedProjects} proyectos
                      </span>
                    </div>
                    <div className="text-green-400 font-medium text-sm">
                      {provider.priceRange}
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

          {/* Garden Types Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Estilos de Jardín Populares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <Palmtree className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Tropical Canario</h3>
                <p className="text-white/70 text-sm mb-3">
                  Flora autóctona adaptada al clima volcánico local.
                </p>
                <p className="text-green-400 font-medium">€5,000 - €25,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Mediterráneo</h3>
                <p className="text-white/70 text-sm mb-3">
                  Resistente a la sequía con hierbas aromáticas.
                </p>
                <p className="text-blue-400 font-medium">€3,000 - €15,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Flower className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Jardín Vertical</h3>
                <p className="text-white/70 text-sm mb-3">
                  Maximiza espacios pequeños con vegetación vertical.
                </p>
                <p className="text-purple-400 font-medium">€2,000 - €12,000</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Recycle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Permacultura</h3>
                <p className="text-white/70 text-sm mb-3">
                  Ecosistemas autosuficientes y sostenibles.
                </p>
                <p className="text-emerald-400 font-medium">€8,000 - €40,000</p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Beneficios de un Jardín Profesional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <Sun className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Clima Perfecto</h3>
                <p className="text-white/70 text-sm">
                  Canarias permite disfrutar del jardín los 365 días del año.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Euro className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Valor Inmueble +15%</h3>
                <p className="text-white/70 text-sm">
                  Un jardín profesional incrementa significativamente el valor.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Wind className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Microclima</h3>
                <p className="text-white/70 text-sm">
                  Mejora la calidad del aire y regula la temperatura.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Bienestar</h3>
                <p className="text-white/70 text-sm">
                  Reduce estrés y mejora la calidad de vida familiar.
                </p>
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
                        ? "border-green-400 bg-green-400/20 scale-105"
                        : "border-white/10 hover:border-green-400/50 hover:bg-white/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id
                          ? "text-green-400"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedCategory === category.id
                          ? "text-green-400"
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
                        <div className="bg-green-400/90 text-blue-dark px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Partner BlueEye
                        </div>
                      )}
                      {provider.sustainableApproach && (
                        <div className="bg-emerald-400/90 text-blue-dark px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Sostenible
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
                        <div className="text-green-400 font-bold">
                          {provider.completedProjects}
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
                        <span className="text-green-400 font-medium">
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
                            className="bg-green-400/20 text-green-400 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4" />
                        Ver proyectos
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contactar
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
