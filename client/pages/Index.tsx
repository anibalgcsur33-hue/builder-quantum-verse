import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AIConcierge from "../components/AIConcierge";
import PremiumTourism from "../components/PremiumTourism";
import {
  Eye,
  MapPin,
  Euro,
  Shield,
  Play,
  Star,
  ChevronDown,
  MessageCircle,
  Menu,
  X,
  Building,
  Calendar,
  Users,
  Headphones,
  Bot,
  Scale,
  FileText,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("ES");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Multilingual content
  const content = {
    ES: {
      nav: {
        properties: "Propiedades Reales",
        vr: "Tours VR",
        map: "Mapa Canarias",
        howItWorks: "Cómo Funciona",
        contact: "Contacto",
        cta: "Entrar al Metaverso",
      },
      hero: {
        title: "Explora en el metaverso, compra en la vida real",
        subtitle:
          "Tours VR, reservas online y firma digital con notaría. Propiedades reales en Canarias y España",
        cta1: "Entrar al Metaverso",
        cta2: "Ver Propiedades Reales",
      },
      sections: {
        featured: "Propiedades Destacadas",
        villa: "Vívela en VR antes de decidir",
        vr: "Tu agente IA te guía, nuestro equipo legal te respalda",
        map: "Localiza oportunidades reales en 3D",
        community: "Comparte tours y experiencias en nuestra comunidad",
        finalCta: "Tu próxima casa es real. Empieza hoy",
        finalBtn1: "Reservar visita",
        finalBtn2: "Hablar con agente IA",
      },
      footer: {
        legal:
          "La visualización es virtual; la compra es de inmuebles reales. Operaciones sujetas a notaría, registro y KYC/AML.",
      },
    },
    EN: {
      nav: {
        properties: "Real Properties",
        vr: "VR Tours",
        map: "Canarias Map",
        howItWorks: "How It Works",
        contact: "Contact",
        cta: "Enter Metaverse",
      },
      hero: {
        title: "Explore in the metaverse, buy in real life",
        subtitle:
          "VR tours, online bookings and digital signature with notary. Real properties in Canary Islands and Spain",
        cta1: "Enter Metaverse",
        cta2: "View Real Properties",
      },
      sections: {
        featured: "Featured Properties",
        villa: "Experience it in VR before deciding",
        vr: "Your AI agent guides you, our legal team backs you",
        map: "Locate real opportunities in 3D",
        community: "Share tours and experiences in our community",
        finalCta: "Your next home is real. Start today",
        finalBtn1: "Book visit",
        finalBtn2: "Talk to AI agent",
      },
      footer: {
        legal:
          "Visualization is virtual; purchase is of real properties. Operations subject to notary, registry and KYC/AML.",
      },
    },
    DE: {
      nav: {
        properties: "Echte Immobilien",
        vr: "VR-Touren",
        map: "Kanaren Karte",
        howItWorks: "Wie es funktioniert",
        contact: "Kontakt",
        cta: "Metaverse betreten",
      },
      hero: {
        title: "Erkunde im Metaverse, kaufe im echten Leben",
        subtitle:
          "VR-Touren, Online-Buchungen und digitale Unterschrift beim Notar. Echte Immobilien auf den Kanaren und in Spanien",
        cta1: "Metaverse betreten",
        cta2: "Echte Immobilien ansehen",
      },
      sections: {
        featured: "Ausgewählte Immobilien",
        villa: "Erlebe es in VR bevor du entscheidest",
        vr: "Dein KI-Agent führt dich, unser Rechtsteam unterstützt dich",
        map: "Finde echte Gelegenheiten in 3D",
        community: "Teile Touren und Erfahrungen in unserer Community",
        finalCta: "Dein nächstes Zuhause ist echt. Starte heute",
        finalBtn1: "Besichtigung buchen",
        finalBtn2: "Mit KI-Agent sprechen",
      },
      footer: {
        legal:
          "Die Visualisierung ist virtuell; der Kauf betrifft echte Immobilien. Transaktionen unterliegen Notar, Register und KYC/AML.",
      },
    },
  };

  const t = content[currentLang as keyof typeof content];

  // Featured properties data (ready for database integration)
  const featuredProperties = [
    {
      id: "1",
      title: "Villa Oceanfront Deluxe",
      location: "Costa Adeje, Tenerife",
      price: 1250000,
      pricePerSqm: 3500,
      mediaUrl: "/placeholder.svg",
      type: "villa",
      bedrooms: 4,
      bathrooms: 3,
      sqm: 357,
      featured: true,
      verified: true,
    },
    {
      id: "2",
      title: "Modern Penthouse Marina",
      location: "Las Palmas, Gran Canaria",
      price: 850000,
      pricePerSqm: 4200,
      mediaUrl: "/placeholder.svg",
      type: "penthouse",
      bedrooms: 3,
      bathrooms: 2,
      sqm: 202,
      featured: true,
      verified: true,
    },
    {
      id: "3",
      title: "Luxury Apartment Sunset",
      location: "Puerto del Carmen, Lanzarote",
      price: 680000,
      pricePerSqm: 3400,
      mediaUrl: "/placeholder.svg",
      type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      sqm: 200,
      featured: true,
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      {/* Hidden JSON Schema Comment for Database Integration */}
      {/*
      BlueEyeHomes Database Schema:
      {
        "properties": [
          {
            "id": "uuid",
            "title": "text",
            "location": "text", 
            "price": "numeric",
            "pricePerSqm": "numeric",
            "mediaUrl": "text",
            "type": "text",
            "bedrooms": "integer",
            "bathrooms": "integer",
            "sqm": "numeric",
            "featured": "bool",
            "verified": "bool",
            "cryptoReady": "bool",
            "vrTourUrl": "text",
            "documents": "json",
            "coordinates": "point"
          }
        ],
        "users": [
          {
            "id": "uuid",
            "email": "text",
            "name": "text",
            "language": "text",
            "verified": "bool",
            "wallet_address": "text"
          }
        ]
      }
      */}

      <Header isScrolled={isScrolled} transparent={true} />

      {/* Hero Section - BlueEye Homes Presentation Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Presentation Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
            aria-label="Video de presentación BlueEye Homes"
          >
            <source
              src="https://cdn.builder.io/o/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2F64f7b1c47f374d8ebf859e5b650ba2ba?alt=media&token=b197dd5a-d641-4142-a5c9-c35b7fc8f470&apiKey=b022b0ef6eaa47cba6348b0a48fcb095"
              type="video/mp4"
            />
            <img
              src="/placeholder.svg"
              alt="Video de presentación BlueEye Homes"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/40 via-transparent to-blue-dark/70"></div>
        </div>

        <div className="relative z-10 container mx-auto container-padding text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="heading-xl text-gradient animate-slide-up mb-6">
              Bienvenido a BlueEye Homes
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in max-w-4xl mx-auto leading-relaxed">
              Un metaverso único donde las propiedades se viven en 3D y las
              compras son reales
            </p>
            <p className="text-lg text-white/80 mb-12 animate-fade-in max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
              <Link to="/metaverso" className="btn-primary text-lg px-10 py-4">
                <Eye className="mr-3" size={24} />
                {t.hero.cta1}
              </Link>
              <Link
                to="/propiedades"
                className="btn-secondary text-lg px-10 py-4"
              >
                <Building className="mr-3" size={24} />
                {t.hero.cta2}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm">
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <CheckCircle className="text-neon-teal" size={16} />
                <span className="text-white/80">Verificado por notario</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Shield className="text-neon-emerald" size={16} />
                <span className="text-white/80">Registro de propiedad</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Scale className="text-neon-teal" size={16} />
                <span className="text-white/80">Cumplimiento legal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </section>

      {/* AI Concierge */}
      <AIConcierge />

      {/* Featured Properties Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">
              {t.sections.featured}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Inmuebles reales verificados por notario, listos para comprar con
              tours VR disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="glass-card overflow-hidden hover-glow-teal group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={property.mediaUrl}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-transparent to-transparent"></div>

                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {property.type}
                    </span>
                  </div>

                  {/* VR Tour Button */}
                  <div className="absolute top-4 right-4">
                    <button className="w-12 h-12 bg-neon-emerald/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-neon-emerald/30 transition-colors group">
                      <Eye className="text-neon-emerald" size={20} />
                    </button>
                  </div>

                  {/* Verified Badge */}
                  {property.verified && (
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 bg-neon-emerald/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <CheckCircle className="text-neon-emerald" size={14} />
                        <span className="text-white text-xs font-medium">
                          Verificado
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="absolute bottom-4 right-4 flex gap-2 text-xs text-white/80">
                    <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      {property.bedrooms}🛏️
                    </span>
                    <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      {property.bathrooms}🚿
                    </span>
                    <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      {property.sqm}m²
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-neon-teal transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-white/70 mb-4 flex items-center gap-2">
                    <MapPin size={16} />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-neon-teal">
                      €{property.price.toLocaleString()}
                    </span>
                    <span className="text-white/60">
                      €{property.pricePerSqm.toLocaleString()}/m²
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/property/${property.id}/vr`}
                      className="flex-1 btn-secondary text-center text-sm py-3 flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      Tour VR
                    </Link>
                    <Link
                      to={`/property/${property.id}`}
                      className="flex-1 btn-primary text-center text-sm py-3 flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={16} />
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/propiedades" className="btn-primary">
              Ver Todas las Propiedades
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Villa Showcase Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-blue-dark/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <video
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-glass"
                autoPlay
                muted
                loop
                playsInline
                poster="/placeholder.svg"
              >
                <source src="https://cdn.builder.io/o/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2F69654e0c8eeb48cabf7dfe2e22ac60ac?alt=media&token=2ebe688d-8a7e-43fa-ae96-6667d5b3642a&apiKey=b022b0ef6eaa47cba6348b0a48fcb095" type="video/mp4" />
                <img
                  src="/placeholder.svg"
                  alt="Luxury villa interior VR tour"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/50 to-transparent rounded-2xl"></div>

              {/* Play Button Overlay */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-24 h-24 bg-neon-teal/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-neon-teal/30 transition-all duration-300 group-hover:scale-110 shadow-neon-teal">
                  <Play className="text-neon-teal ml-2" size={40} />
                </div>
              </button>

              {/* VR Badge */}
              <div className="absolute top-6 left-6">
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                  <Eye className="text-neon-teal" size={16} />
                  <span className="text-white font-medium">
                    Tour VR Disponible
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="heading-lg text-gradient mb-6">
                  {t.sections.villa}
                </h2>
                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                  Cada detalle importa cuando eliges tu hogar. Nuestros tours VR
                  te permiten explorar cada habitación, sentir el espacio y
                  tomar decisiones informadas antes de la compra.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 hover-glow-teal">
                  <div className="w-12 h-12 bg-neon-teal/20 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="text-neon-teal" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">VR Hiperrealista</h4>
                  <p className="text-white/70 text-sm">
                    Resolución 8K con detalles fotográficos
                  </p>
                </div>

                <div className="glass-card p-6 hover-glow-emerald">
                  <div className="w-12 h-12 bg-neon-emerald/20 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="text-neon-emerald" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Medidas Exactas</h4>
                  <p className="text-white/70 text-sm">
                    Dimensiones precisas al centímetro
                  </p>
                </div>

                <div className="glass-card p-6 hover-glow-teal">
                  <div className="w-12 h-12 bg-neon-teal/20 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="text-neon-teal" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Acceso 24/7</h4>
                  <p className="text-white/70 text-sm">
                    Visita desde cualquier lugar del mundo
                  </p>
                </div>

                <div className="glass-card p-6 hover-glow-emerald">
                  <div className="w-12 h-12 bg-neon-emerald/20 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="text-neon-emerald" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Docs Incluidos</h4>
                  <p className="text-white/70 text-sm">
                    Planos, certificados y registros
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/villa-vr-demo"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Play size={20} />
                  Explorar Villa Demo
                </Link>
                <Link
                  to="/solicitar-tour"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Solicitar Tour Personalizado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VR Experience Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="heading-lg text-gradient mb-6">{t.sections.vr}</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                La experiencia perfecta combina la innovación de la inteligencia
                artificial con la confianza de profesionales humanos
                especializados en derecho inmobiliario.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="text-neon-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">
                      Agente IA Personalizado
                    </h4>
                    <p className="text-white/70">
                      Asistente inteligente disponible 24/7 que aprende tus
                      preferencias, responde consultas y programa visitas según
                      tu agenda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-emerald/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="text-neon-emerald" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">
                      Equipo Legal Especializado
                    </h4>
                    <p className="text-white/70">
                      Abogados inmobiliarios y notarios certificados supervisan
                      cada transacción, garantizando cumplimiento legal y
                      seguridad total.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="text-neon-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">
                      Proceso Certificado
                    </h4>
                    <p className="text-white/70">
                      Desde la primera consulta hasta la entrega de llaves, cada
                      paso está documentado y respaldado legalmente.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/proceso-compra" className="btn-primary">
                Conocer el Proceso Completo
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative">
              {/* AI Avatar Digital */}
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-blue-800/60 rounded-2xl shadow-glass overflow-hidden relative flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20 rounded-2xl"></div>
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-white/5 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* AI Avatar */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Avatar Container with Holographic Effect */}
                  <div className="relative">
                    {/* Holographic Rings */}
                    <div className="absolute -inset-8 rounded-full border-2 border-neon-teal/30 animate-spin-slow"></div>
                    <div className="absolute -inset-12 rounded-full border border-neon-emerald/20 animate-spin-slow-reverse"></div>
                    <div className="absolute -inset-16 rounded-full border border-blue-400/10 animate-pulse"></div>

                    {/* Main Avatar */}
                    <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-gradient-to-br from-neon-teal to-neon-emerald shadow-2xl shadow-neon-teal/50 relative">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2F17edddd60152463581993ed71a0f6614?format=webp&width=800"
                        alt="AI Assistant Avatar"
                        className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
                      />
                      {/* Digital Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-neon-teal/10 to-transparent animate-pulse"></div>
                    </div>

                    {/* Floating Data Points */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-teal/80 rounded-full flex items-center justify-center animate-bounce">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-emerald/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400/80 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/4 -right-8 w-3 h-3 bg-purple-400/80 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  {/* AI Status */}
                  <div className="mt-8 glass-card px-6 py-3 rounded-full">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-medium">IA Asistente Activo</span>
                      <Sparkles className="w-4 h-4 text-neon-teal animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Floating Information Cards */}
                <div className="absolute top-6 right-6">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float">
                    <Shield className="text-neon-emerald" size={16} />
                    <span className="text-white font-medium">Seguro Legal</span>
                  </div>
                </div>

                <div className="absolute top-20 left-6">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float" style={{ animationDelay: "0.5s" }}>
                    <Clock className="text-neon-teal" size={16} />
                    <span className="text-white font-medium">24/7 Disponible</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
                    <CheckCircle className="text-neon-emerald" size={16} />
                    <span className="text-white font-medium">Verificado</span>
                  </div>
                </div>

                <div className="absolute bottom-20 left-6">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float" style={{ animationDelay: "1.5s" }}>
                    <Users className="text-neon-teal" size={16} />
                    <span className="text-white font-medium">Equipo Experto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Map Canarias Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
          >
            <source src="/3d-canarias-map.mp4" type="video/mp4" />
            <img
              src="/placeholder.svg"
              alt="3D futuristic map of Canary Islands with glowing pins"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 to-blue-dark/90"></div>
        </div>

        <div className="relative z-10 container mx-auto container-padding text-center">
          <h2 className="heading-lg text-gradient mb-6">{t.sections.map}</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Navega por un mapa interactivo 3D de las Islas Canarias y España.
            Filtra por ubicación, precio, tipo de propiedad y accede a tours VR
            instant��neos.
          </p>

          {/* Interactive Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8 hover-glow-teal">
              <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-neon-teal" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-4">Localización Precisa</h4>
              <p className="text-white/70">
                Coordenadas exactas, vistas satelitales y información del
                entorno en tiempo real.
              </p>
            </div>

            <div className="glass-card p-8 hover-glow-emerald">
              <div className="w-16 h-16 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-neon-emerald" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-4">Tours VR Instantáneos</h4>
              <p className="text-white/70">
                Haz clic en cualquier propiedad y accede inmediatamente a su
                tour virtual completo.
              </p>
            </div>

            <div className="glass-card p-8 hover-glow-teal">
              <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="text-neon-teal" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-4">Datos en Tiempo Real</h4>
              <p className="text-white/70">
                Precios actualizados, disponibilidad y nuevas propiedades
                añadidas diariamente.
              </p>
            </div>
          </div>

          <Link to="/mapa-canarias" className="btn-primary text-lg px-10 py-4">
            <Globe className="mr-3" size={24} />
            Explorar Mapa 3D Interactivo
          </Link>
        </div>
      </section>

      {/* Community Section */}
      <section className="section-padding bg-gradient-to-b from-blue-dark/30 to-transparent">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <video
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-glass"
                autoPlay
                muted
                loop
                playsInline
                poster="/placeholder.svg"
              >
                <source src="/futuristic-community.mp4" type="video/mp4" />
                <img
                  src="/placeholder.svg"
                  alt="Futuristic community of connected users sharing experiences"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/50 to-transparent rounded-2xl"></div>

              {/* Community Stats */}
              <div className="absolute top-6 left-6 space-y-3">
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">
                    2,847 miembros activos
                  </span>
                </div>
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-emerald rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">
                    156 tours compartidos hoy
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-lg text-gradient mb-6">
                {t.sections.community}
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Únete a una comunidad global de compradores, inversores y
                propietarios. Comparte experiencias reales, obtén consejos de
                expertos y descubre oportunidades exclusivas antes que nadie.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-teal rounded-full"></div>
                  <span className="text-white/80">
                    Tours VR compartidos por la comunidad
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-emerald rounded-full"></div>
                  <span className="text-white/80">
                    Consejos de propietarios reales
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-teal rounded-full"></div>
                  <span className="text-white/80">
                    Oportunidades de inversión exclusivas
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-emerald rounded-full"></div>
                  <span className="text-white/80">
                    Eventos y meetups en el metaverso
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/comunidad"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Users size={20} />
                  Unirse a la Comunidad
                </Link>
                <Link
                  to="/eventos"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Ver Próximos Eventos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="heading-xl text-gradient mb-8">
              {t.sections.finalCta}
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              El futuro del real estate está aquí. Explora propiedades reales en
              el metaverso, toma decisiones informadas con tours VR y completa
              tu compra con total seguridad legal.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/reservar-visita"
                className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-3"
              >
                <Calendar size={24} />
                {t.sections.finalBtn1}
              </Link>
              <button className="btn-secondary text-lg px-10 py-4 flex items-center justify-center gap-3">
                <Bot size={24} />
                {t.sections.finalBtn2}
              </button>
            </div>

            {/* Final Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-neon-teal" size={16} />
                <span>Más de €1.2B en ventas verificadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-neon-emerald" size={16} />
                <span>100% respaldado legalmente</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-neon-teal" size={16} />
                <span>5,000+ propietarios satisfechos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Tourism Section */}
      <div className="container mx-auto container-padding">
        <PremiumTourism />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 bg-gradient-to-b from-transparent to-blue-dark/50">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div>
              <Link
                to="/"
                className="text-2xl font-bold text-gradient mb-4 block"
              >
                BlueEyeHomes
              </Link>
              <p className="text-white/60 mb-6 leading-relaxed">
                El futuro del real estate: explora virtualmente, compra
                realmente.
              </p>
              <div className="flex gap-2">
                {["ES", "EN", "DE"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      currentLang === lang
                        ? "bg-neon-teal text-blue-dark"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-neon-teal">Propiedades</h4>
              <div className="space-y-3">
                <Link
                  to="/propiedades"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Todas las Propiedades
                </Link>
                <Link
                  to="/propiedades/comprar"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Comprar
                </Link>
                <Link
                  to="/propiedades/alquilar"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Alquilar
                </Link>
                <Link
                  to="/propiedades/obra-nueva"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Obra Nueva
                </Link>
                <Link
                  to="/propiedades/verificadas"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Verificadas
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-neon-emerald">Tecnología</h4>
              <div className="space-y-3">
                <Link
                  to="/tour-vr"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Tours VR
                </Link>
                <Link
                  to="/comunidad"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Comunidad
                </Link>
                <Link
                  to="/mapa-metaverso"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Mapa Metaverso
                </Link>
                <Link
                  to="/criptomonedas-token"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Token BlueEye
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-neon-teal">Marketplace</h4>
              <div className="space-y-3">
                <Link
                  to="/marketplace"
                  className="block text-white/60 hover:text-neon-teal transition-colors font-medium"
                >
                  Ver Todo el Marketplace
                </Link>
                <Link
                  to="/marketplace/smart-home"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Smart Home
                </Link>
                <Link
                  to="/marketplace/energia-solar"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Energía Solar
                </Link>
                <Link
                  to="/marketplace/reformas"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Reformas
                </Link>
                <Link
                  to="/marketplace/piscinas-spa"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Piscinas & Spa
                </Link>
                <Link
                  to="/marketplace/jardines-paisajismo"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Jardines & Paisajismo
                </Link>
                <Link
                  to="/marketplace/sistemas-agua"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Sistemas de Agua
                </Link>
                <Link
                  to="/marketplace/telecomunicaciones"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Telecomunicaciones
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-neon-emerald">Soporte</h4>
              <div className="space-y-3">
                <Link
                  to="/como-funciona"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Cómo Funciona
                </Link>
                <Link
                  to="/contacto"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Contacto
                </Link>
                <Link
                  to="/privacidad"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Privacidad
                </Link>
                <Link
                  to="/terminos"
                  className="block text-white/60 hover:text-neon-teal transition-colors"
                >
                  Términos
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="text-white/60 text-sm max-w-2xl">
                <p className="mb-2 font-medium">
                  © 2024 BlueEyeHomes. Registro Mercantil de Madrid. CIF:
                  B-87654321
                </p>
                <p className="leading-relaxed">
                  <strong>Nota Legal:</strong> {t.footer.legal}
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  to="/privacidad"
                  className="text-white/60 hover:text-neon-teal transition-colors text-sm"
                >
                  Privacidad
                </Link>
                <Link
                  to="/terminos"
                  className="text-white/60 hover:text-neon-teal transition-colors text-sm"
                >
                  Términos
                </Link>
                <Link
                  to="/cookies"
                  className="text-white/60 hover:text-neon-teal transition-colors text-sm"
                >
                  Cookies
                </Link>
                <Link
                  to="/compliance"
                  className="text-white/60 hover:text-neon-teal transition-colors text-sm"
                >
                  Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
