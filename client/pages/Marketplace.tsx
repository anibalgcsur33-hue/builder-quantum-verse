import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  Brain,
  Sun,
  Hammer,
  Shield,
  Scale,
  Sofa,
  Waves,
  TreePine,
  Droplets,
  Radio,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Target,
  Clock,
  Euro,
  Phone,
} from "lucide-react";

interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  href: string;
  providers: number;
  avgRating: number;
  priceRange: string;
  featured: boolean;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function Marketplace() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories: MarketplaceCategory[] = [
    {
      id: "smart-home",
      name: "Smart Home",
      description: "Domótica y automatización del hogar",
      icon: Brain,
      href: "/marketplace/smart-home",
      providers: 47,
      avgRating: 4.8,
      priceRange: "€1,500 - €30,000",
      featured: true,
      color: "text-neon-teal",
      gradientFrom: "from-neon-teal",
      gradientTo: "to-neon-emerald",
    },
    {
      id: "energia-solar",
      name: "Energía Solar",
      description: "Sostenibilidad y ahorro energético",
      icon: Sun,
      href: "/marketplace/energia-solar",
      providers: 34,
      avgRating: 4.9,
      priceRange: "€8,000 - €150,000",
      featured: true,
      color: "text-yellow-400",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-orange-500",
    },
    {
      id: "reformas",
      name: "Reformas",
      description: "Construcción y remodelación",
      icon: Hammer,
      href: "/marketplace/reformas",
      providers: 62,
      avgRating: 4.7,
      priceRange: "€5,000 - €200,000",
      featured: true,
      color: "text-orange-400",
      gradientFrom: "from-orange-400",
      gradientTo: "to-red-500",
    },
    {
      id: "seguros",
      name: "Seguros",
      description: "Protección integral de propiedades",
      icon: Shield,
      href: "/marketplace/seguros",
      providers: 28,
      avgRating: 4.6,
      priceRange: "€200 - €2,500/año",
      featured: false,
      color: "text-blue-400",
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500",
    },
    {
      id: "servicios-legales",
      name: "Servicios Legales",
      description: "Asesoría jurídica especializada",
      icon: Scale,
      href: "/marketplace/servicios-legales",
      providers: 18,
      avgRating: 4.9,
      priceRange: "€500 - €5,000",
      featured: false,
      color: "text-purple-400",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-500",
    },
    {
      id: "mobiliario",
      name: "Mobiliario",
      description: "Diseño de interiores y decoración",
      icon: Sofa,
      href: "/marketplace/mobiliario",
      providers: 41,
      avgRating: 4.5,
      priceRange: "€1,000 - €50,000",
      featured: false,
      color: "text-green-400",
      gradientFrom: "from-green-400",
      gradientTo: "to-emerald-500",
    },
    {
      id: "piscinas-spa",
      name: "Piscinas & Spa",
      description: "Construcción y mantenimiento",
      icon: Waves,
      href: "/marketplace/piscinas-spa",
      providers: 23,
      avgRating: 4.8,
      priceRange: "€15,000 - €100,000",
      featured: true,
      color: "text-cyan-400",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-500",
    },
    {
      id: "jardines-paisajismo",
      name: "Jardines & Paisajismo",
      description: "Diseño y mantenimiento de exteriores",
      icon: TreePine,
      href: "/marketplace/jardines-paisajismo",
      providers: 35,
      avgRating: 4.7,
      priceRange: "€2,000 - €40,000",
      featured: true,
      color: "text-green-500",
      gradientFrom: "from-green-500",
      gradientTo: "to-lime-500",
    },
    {
      id: "sistemas-agua",
      name: "Sistemas de Agua",
      description: "Fontanería y tratamiento de aguas",
      icon: Droplets,
      href: "/marketplace/sistemas-agua",
      providers: 19,
      avgRating: 4.6,
      priceRange: "€800 - €15,000",
      featured: false,
      color: "text-blue-500",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-500",
    },
    {
      id: "telecomunicaciones",
      name: "Telecomunicaciones",
      description: "Internet, fibra y sistemas audiovisuales",
      icon: Radio,
      href: "/marketplace/telecomunicaciones",
      providers: 26,
      avgRating: 4.5,
      priceRange: "€500 - €8,000",
      featured: false,
      color: "text-indigo-400",
      gradientFrom: "from-indigo-400",
      gradientTo: "to-purple-500",
    },
  ];

  const filters = [
    { id: "all", label: "Todas", count: categories.length },
    {
      id: "featured",
      label: "Destacadas",
      count: categories.filter((c) => c.featured).length,
    },
    { id: "construction", label: "Construcción", count: 3 },
    { id: "technology", label: "Tecnología", count: 3 },
    { id: "services", label: "Servicios", count: 2 },
    { id: "exterior", label: "Exteriores", count: 2 },
  ];

  const filteredCategories =
    selectedFilter === "all"
      ? categories
      : selectedFilter === "featured"
        ? categories.filter((c) => c.featured)
        : selectedFilter === "construction"
          ? categories.filter((c) =>
              ["reformas", "piscinas-spa", "sistemas-agua"].includes(c.id),
            )
          : selectedFilter === "technology"
            ? categories.filter((c) =>
                ["smart-home", "energia-solar", "telecomunicaciones"].includes(
                  c.id,
                ),
              )
            : selectedFilter === "services"
              ? categories.filter((c) =>
                  ["seguros", "servicios-legales"].includes(c.id),
                )
              : selectedFilter === "exterior"
                ? categories.filter((c) =>
                    ["jardines-paisajismo", "piscinas-spa"].includes(c.id),
                  )
                : categories;

  const featuredCategories = categories.filter((c) => c.featured);

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-4 shadow-2xl shadow-neon-teal/30">
                <Sparkles className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gradient">
                  Marketplace
                </h1>
                <p className="text-neon-teal font-medium text-xl">
                  Todo para tu propiedad
                </p>
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8">
              Conecta con los mejores profesionales de Canarias. Desde domótica
              hasta jardines, todo lo que necesitas para transformar tu
              propiedad en un hogar perfecto.
            </p>

            {/* Key Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="glass-card px-6 py-3 rounded-xl">
                <span className="text-neon-teal font-bold text-2xl">333+ </span>
                <span className="text-white/70">Profesionales</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-xl">
                <span className="text-neon-emerald font-bold text-2xl">
                  4.7★{" "}
                </span>
                <span className="text-white/70">Valoración media</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-xl">
                <span className="text-blue-400 font-bold text-2xl">
                  2,500+{" "}
                </span>
                <span className="text-white/70">Proyectos completados</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-xl">
                <span className="text-yellow-400 font-bold text-2xl">24h </span>
                <span className="text-white/70">Respuesta media</span>
              </div>
            </div>
          </div>

          {/* Featured Categories */}
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Award className="w-8 h-8 text-neon-teal" />
              <h2 className="text-3xl font-bold text-white">
                Categorías Destacadas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={category.href}
                    className="glass-card p-6 rounded-2xl hover-glow transition-all duration-300 group"
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} p-3 shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-teal transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium text-sm">
                          {category.avgRating}
                        </span>
                      </div>
                      <span className="text-white/60 text-sm">
                        {category.providers} pros
                      </span>
                    </div>
                    <div className={`font-medium text-sm ${category.color}`}>
                      {category.priceRange}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Filters */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Todas las Categorías
              </h2>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-neon-teal" />
                <span className="text-white/70">Filtrar por:</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? "bg-neon-teal text-blue-dark font-bold scale-105"
                      : "glass-card text-white/80 hover:bg-white/10 hover:text-neon-teal"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </section>

          {/* All Categories Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={category.href}
                    className="glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-300 group"
                  >
                    <div className="relative p-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} p-2 shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-full h-full text-white" />
                      </div>

                      {category.featured && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-neon-teal/20 text-neon-teal px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                            Destacada
                          </div>
                        </div>
                      )}

                      <h3 className="text-lg font-bold mb-2 group-hover:text-neon-teal transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-white text-xs">
                              {category.avgRating}
                            </span>
                          </div>
                          <span className="text-white/60 text-xs">
                            {category.providers} profesionales
                          </span>
                        </div>
                        <div
                          className={`font-medium text-xs ${category.color}`}
                        >
                          {category.priceRange}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">
                          Ver profesionales
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-neon-teal group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-neon-teal/10 to-neon-emerald/10 border border-neon-teal/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                ¿Eres un profesional?
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Únete a nuestro marketplace y conecta con propietarios de las
                mejores propiedades de Canarias. Aumenta tu visibilidad y
                consigue más clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Registrarse como Profesional
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contactar Soporte
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
