import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sofa,
  Star,
  Phone,
  Mail,
  Euro,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Clock,
  Truck,
  Palette,
  Home,
  Camera,
  Heart,
  Share2,
  Package,
  Ruler,
  Award,
} from "lucide-react";

export default function Mobiliario() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [priceRange, setPriceRange] = useState("");

  const categories = [
    { id: "all", label: "Todo el mobiliario", count: 156 },
    { id: "salon", label: "Salón", count: 45 },
    { id: "dormitorio", label: "Dormitorio", count: 38 },
    { id: "cocina", label: "Cocina", count: 29 },
    { id: "bano", label: "Baño", count: 22 },
    { id: "exterior", label: "Exterior", count: 22 },
  ];

  const styles = [
    { id: "all", label: "Todos los estilos" },
    { id: "moderno", label: "Moderno" },
    { id: "clasico", label: "Clásico" },
    { id: "mediterraneo", label: "Mediterráneo" },
    { id: "minimalista", label: "Minimalista" },
    { id: "lujo", label: "Lujo" },
  ];

  const companies = [
    {
      id: 1,
      name: "Canarias Design Studio",
      specialization: "Mobiliario de diseño y decoración integral",
      location: "Tenerife",
      rating: 4.9,
      reviews: 234,
      categories: ["salon", "dormitorio", "cocina"],
      styles: ["moderno", "lujo", "minimalista"],
      services: [
        "Diseño de interiores",
        "Mobiliario a medida",
        "Decoración integral",
        "Asesoramiento personalizado",
        "Instalación profesional",
      ],
      features: [
        "Entrega e instalación incluida",
        "Garantía 5 años",
        "Materiales premium",
        "Diseño 3D gratuito",
        "Financiación 0%",
      ],
      priceRange: "€€€",
      deliveryTime: "4-6 semanas",
      contact: {
        phone: "+34 922 456 789",
        email: "info@canariasdesign.com",
        website: "www.canariasdesign.com",
        showroom: "Av. Francisco La Roche, 15, Santa Cruz de Tenerife",
      },
      portfolio: [
        {
          title: "Villa Costa Adeje",
          image: "/placeholder.svg",
          style: "Moderno",
        },
        {
          title: "Penthouse Las Américas",
          image: "/placeholder.svg",
          style: "Lujo",
        },
      ],
      verified: true,
      logo: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Muebles Atlántico Premium",
      specialization: "Mobiliario clásico y mediterráneo de alta gama",
      location: "Gran Canaria",
      rating: 4.7,
      reviews: 178,
      categories: ["salon", "dormitorio", "exterior"],
      styles: ["clasico", "mediterraneo", "lujo"],
      services: [
        "Muebles artesanales",
        "Restauración antiguos",
        "Tapicería personalizada",
        "Muebles de exterior",
        "Iluminación decorativa",
      ],
      features: [
        "Fabricación artesanal",
        "Maderas nobles certificadas",
        "Diseños exclusivos",
        "Servicio post-venta",
        "Mantenimiento incluido",
      ],
      priceRange: "€€",
      deliveryTime: "6-8 semanas",
      contact: {
        phone: "+34 928 567 890",
        email: "ventas@mueblesatlantico.com",
        website: "www.mueblesatlantico.com",
        showroom: "C/ Mesa y López, 89, Las Palmas de Gran Canaria",
      },
      portfolio: [
        {
          title: "Casa Rural Agaete",
          image: "/placeholder.svg",
          style: "Mediterráneo",
        },
        {
          title: "Villa Maspalomas",
          image: "/placeholder.svg",
          style: "Clásico",
        },
      ],
      verified: true,
      logo: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Nordic Lanzarote",
      specialization: "Mobiliario minimalista y sostenible",
      location: "Lanzarote",
      rating: 4.8,
      reviews: 92,
      categories: ["salon", "dormitorio", "cocina", "bano"],
      styles: ["minimalista", "moderno"],
      services: [
        "Muebles sostenibles",
        "Diseño escandinavo",
        "Organización espacios",
        "Smart home integration",
        "Consultoría feng shui",
      ],
      features: [
        "Materiales reciclados",
        "Certificación eco-friendly",
        "Diseño funcional",
        "Tecnología integrada",
        "Espacios optimizados",
      ],
      priceRange: "€€",
      deliveryTime: "3-4 semanas",
      contact: {
        phone: "+34 928 678 901",
        email: "hola@nordiclanzarote.com",
        website: "www.nordiclanzarote.com",
        showroom: "C/ César Manrique, 45, Arrecife",
      },
      portfolio: [
        {
          title: "Apartamento Puerto del Carmen",
          image: "/placeholder.svg",
          style: "Minimalista",
        },
        {
          title: "Casa Playa Blanca",
          image: "/placeholder.svg",
          style: "Moderno",
        },
      ],
      verified: true,
      logo: "/placeholder.svg",
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    const categoryMatch =
      selectedCategory === "all" ||
      company.categories.includes(selectedCategory);
    const styleMatch =
      selectedStyle === "all" || company.styles.includes(selectedStyle);
    return categoryMatch && styleMatch;
  });

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sofa className="text-neon-teal" size={48} />
            <h1 className="heading-lg text-gradient">
              Marketplace de Mobiliario
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Diseñadores y tiendas especializadas en amueblar propiedades de
            lujo. Servicios completos desde el diseño hasta la instalación.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Sofa className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">23</div>
            <div className="text-white/60 text-sm">Tiendas verificadas</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Home className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">847</div>
            <div className="text-white/60 text-sm">Propiedades amuebladas</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Truck className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">3-8</div>
            <div className="text-white/60 text-sm">Semanas entrega</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Euro className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">15%</div>
            <div className="text-white/60 text-sm">Descuento exclusivo</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="relative lg:col-span-2">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar muebles o tienda..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
            >
              {styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.label}
                </option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
            >
              <option value="">Rango de precio</option>
              <option value="€">€ - Económico</option>
              <option value="€€">€€ - Medio</option>
              <option value="���€€">€€€ - Premium</option>
            </select>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Palette size={20} />
              Diseño 3D
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? "bg-neon-teal text-blue-dark font-semibold"
                  : "glass-card text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="space-y-8 mb-16">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="glass-card p-8 rounded-xl hover-glow-teal"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Company Logo and Portfolio Preview */}
                <div className="space-y-4">
                  <div className="text-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                    <div className="flex items-center justify-center gap-1 text-neon-teal mb-2">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold">{company.rating}</span>
                      <span className="text-white/60 text-sm">
                        ({company.reviews})
                      </span>
                    </div>
                    {company.verified && (
                      <div className="flex items-center justify-center gap-1 text-neon-emerald text-sm">
                        <CheckCircle size={16} />
                        <span>Verificado</span>
                      </div>
                    )}
                  </div>

                  {/* Portfolio Preview */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-sm">Proyectos recientes:</h5>
                    {company.portfolio.map((project, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-blue-dark/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-white font-medium text-sm">
                              {project.title}
                            </div>
                            <div className="text-neon-teal text-xs">
                              {project.style}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Info */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {company.name}
                        </h3>
                        <p className="text-white/70 mb-2">
                          {company.specialization}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>{company.location}</span>
                          <span className="text-neon-emerald font-medium">
                            {company.priceRange}
                          </span>
                          <div className="flex items-center gap-1">
                            <Truck size={14} />
                            <span>{company.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-colors mb-2">
                          <Heart size={20} />
                        </button>
                        <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Services */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Package className="text-neon-teal" size={18} />
                          Servicios especializados
                        </h4>
                        <div className="space-y-2">
                          {company.services.map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle
                                className="text-neon-teal flex-shrink-0"
                                size={14}
                              />
                              <span className="text-white/80 text-sm">
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Award className="text-neon-emerald" size={18} />
                          Características destacadas
                        </h4>
                        <div className="space-y-2">
                          {company.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle
                                className="text-neon-emerald flex-shrink-0"
                                size={14}
                              />
                              <span className="text-white/80 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categories and Styles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3">Categorías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.categories.map((category, index) => (
                          <span
                            key={index}
                            className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm"
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3">Estilos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.styles.map((style, index) => (
                          <span
                            key={index}
                            className="bg-neon-emerald/20 text-neon-emerald px-3 py-1 rounded-full text-sm"
                          >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact and Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div>
                      <h4 className="font-bold mb-3">Contacto:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-neon-teal" />
                          <a
                            href={`tel:${company.contact.phone}`}
                            className="hover:text-neon-teal transition-colors"
                          >
                            {company.contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-neon-emerald" />
                          <a
                            href={`mailto:${company.contact.email}`}
                            className="hover:text-neon-emerald transition-colors"
                          >
                            {company.contact.email}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Home
                            size={16}
                            className="text-neon-teal flex-shrink-0 mt-0.5"
                          />
                          <span className="text-white/70">
                            {company.contact.showroom}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button className="w-full btn-primary flex items-center justify-center gap-2">
                        <Palette size={18} />
                        Consulta gratuita
                      </button>
                      <button className="w-full btn-secondary flex items-center justify-center gap-2">
                        <Camera size={18} />
                        Ver catálogo completo
                      </button>
                      <button className="w-full glass-card py-3 rounded-lg hover-glow-teal flex items-center justify-center gap-2">
                        <Ruler size={18} />
                        Solicitar medidas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Tools */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Herramientas de Diseño Gratuitas
            </h2>
            <p className="text-white/70">
              Visualiza tu espacio antes de comprar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 hover-glow-teal text-center">
              <Palette className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Diseñador 3D</h4>
              <p className="text-white/70 text-sm mb-4">
                Crea el diseño de tu hogar en 3D con nuestra herramienta
              </p>
              <button className="btn-secondary text-sm">Abrir diseñador</button>
            </div>

            <div className="glass-card p-6 hover-glow-emerald text-center">
              <Camera className="text-neon-emerald mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">AR Visualizer</h4>
              <p className="text-white/70 text-sm mb-4">
                Ve cómo quedan los muebles en tu espacio real
              </p>
              <button className="btn-secondary text-sm">Probar AR</button>
            </div>

            <div className="glass-card p-6 hover-glow-teal text-center">
              <Ruler className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Calculadora de Espacios</h4>
              <p className="text-white/70 text-sm mb-4">
                Optimiza la distribución de tu mobiliario
              </p>
              <button className="btn-secondary text-sm">Calcular</button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            ¿Tienes una tienda de muebles?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Únete a nuestro marketplace y conecta con propietarios que buscan
            amueblar sus nuevas propiedades de lujo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Registrar tienda</button>
            <Link to="/marketplace" className="btn-secondary">
              Ver otros servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
