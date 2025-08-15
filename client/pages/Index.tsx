import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Filter,
  FileText,
  Users,
  CheckCircle,
  Building,
  Scale,
  CreditCard,
  Phone,
  Calendar,
  UserCheck
} from 'lucide-react';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real property data structure (ready for Supabase binding)
  const properties = [
    {
      id: '1',
      title: 'Villa Oceanfront Paradise',
      location: 'Playa Blanca, Lanzarote',
      price: 750000,
      pricePerSqm: 2800,
      mediaUrl: '/placeholder.svg',
      badges: ['Tour VR', 'Verificada', 'Disponible'],
      cryptoReady: true,
      verified: true,
      slug: 'villa-oceanfront-paradise'
    },
    {
      id: '2',
      title: 'Apartamento Moderno Centro',
      location: 'Santa Cruz, Tenerife',
      price: 380000,
      pricePerSqm: 3200,
      mediaUrl: '/placeholder.svg',
      badges: ['Tour VR', 'Verificada', 'Reservado'],
      cryptoReady: true,
      verified: true,
      slug: 'apartamento-moderno-centro'
    },
    {
      id: '3',
      title: 'Casa Rural con Viñedo',
      location: 'La Geria, Lanzarote',
      price: 920000,
      pricePerSqm: 2100,
      mediaUrl: '/placeholder.svg',
      badges: ['Tour VR', 'Verificada', 'Disponible'],
      cryptoReady: true,
      verified: true,
      slug: 'casa-rural-vinedo'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Carmen López',
      text: 'Vi mi casa en VR desde Madrid y la compré sin viajar primero. El proceso notarial fue impecable.',
      rating: 5,
      avatar: '/placeholder.svg',
      location: 'Madrid',
      property: 'Villa en Gran Canaria'
    },
    {
      id: 2,
      name: 'Miguel Herrera',
      text: 'El agente IA me guió perfectamente y el equipo legal resolvió todo. Casa real, compra segura.',
      rating: 5,
      avatar: '/placeholder.svg',
      location: 'Barcelona',
      property: 'Apartamento en Tenerife'
    },
    {
      id: 3,
      name: 'Elena Ruiz',
      text: 'Pagué en crypto y firmé digitalmente. En 3 semanas tenía las llaves de mi nueva casa.',
      rating: 5,
      avatar: '/placeholder.svg',
      location: 'Valencia',
      property: 'Casa en Lanzarote'
    }
  ];

  const trustFeatures = [
    {
      icon: CheckCircle,
      title: 'Verificación Registral',
      description: 'Todas las propiedades verificadas en Registro de la Propiedad'
    },
    {
      icon: Scale,
      title: 'Firma Digital + Notaría',
      description: 'Contratos notariales válidos con firma digital certificada'
    },
    {
      icon: CreditCard,
      title: 'Pago € o Cripto',
      description: 'Acepta euros, Bitcoin, Ethereum y principales criptomonedas'
    },
    {
      icon: UserCheck,
      title: 'KYC/AML Certificado',
      description: 'Verificación de identidad y anti-lavado cumpliendo normativa'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      {/* Hidden JSON Schema Comment for Supabase Integration */}
      {/*
      Target Supabase Schema:
      {
        "properties": [
          {
            "id": "uuid",
            "title": "text",
            "location": "text", 
            "price": "numeric",
            "pricePerSqm": "numeric",
            "mediaUrl": "text",
            "badges": "text[]",
            "cryptoReady": "bool",
            "verified": "bool",
            "slug": "text"
          }
        ]
      }
      */}

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto container-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gradient">
              BlueEyeHomes
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/propiedades" className="hover:text-neon-teal transition-colors">
                Propiedades Reales
              </Link>
              <Link to="/tour-vr" className="hover:text-neon-teal transition-colors">
                Tours VR
              </Link>
              <Link to="/mapa-canarias" className="hover:text-neon-teal transition-colors">
                Mapa Canarias
              </Link>
              <Link to="/como-funciona" className="hover:text-neon-teal transition-colors">
                Cómo Funciona
              </Link>
              <Link to="/contacto" className="hover:text-neon-teal transition-colors">
                Contacto
              </Link>
            </div>

            {/* CTA Button */}
            <Link to="/metaverso" className="hidden lg:block btn-primary">
              Entrar al Metaverso
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden glass-card mt-4 p-6 space-y-4">
              <Link to="/propiedades" className="block hover:text-neon-teal transition-colors">
                Propiedades Reales
              </Link>
              <Link to="/tour-vr" className="block hover:text-neon-teal transition-colors">
                Tours VR
              </Link>
              <Link to="/mapa-canarias" className="block hover:text-neon-teal transition-colors">
                Mapa Canarias
              </Link>
              <Link to="/como-funciona" className="block hover:text-neon-teal transition-colors">
                Cómo Funciona
              </Link>
              <Link to="/contacto" className="block hover:text-neon-teal transition-colors">
                Contacto
              </Link>
              <Link to="/metaverso" className="btn-primary w-full text-center">
                Entrar al Metaverso
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Coastal Futuristic City Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
            aria-label="Futuristic coastal city in Canary Islands"
          >
            <source src="/coastal-city-future.mp4" type="video/mp4" />
            <img src="/placeholder.svg" alt="Futuristic coastal cityscape in Canary Islands" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/60 to-blue-dark/80"></div>
        </div>

        <div className="relative z-10 container mx-auto container-padding text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="heading-xl text-gradient animate-slide-up mb-6">
              Explora en el metaverso, compra en la vida real
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in">
              Tours VR, reservas online, firma digital con notaría.<br />
              <span className="text-neon-teal font-semibold">Propiedades reales en Canarias y España</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/metaverso" className="btn-primary">
                <Eye className="mr-2" size={20} />
                Entrar al Metaverso
              </Link>
              <Link to="/propiedades" className="btn-secondary">
                <Building className="mr-2" size={20} />
                Ver Propiedades Reales
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-neon-teal" size={16} />
                <span>Propiedades verificadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="text-neon-emerald" size={16} />
                <span>Firma notarial válida</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-neon-teal" size={16} />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </section>

      {/* Floating AI Assistant */}
      <button
        className="fixed bottom-6 right-6 z-50 btn-primary w-14 h-14 rounded-full flex items-center justify-center animate-float hover-glow-teal"
        aria-label="Hablar con agente IA"
      >
        <MessageCircle size={24} />
      </button>

      {/* Villa de Lujo Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Villa de lujo en Canarias con vista al océano"
                className="w-full h-96 object-cover rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/50 to-transparent rounded-xl"></div>
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 bg-neon-teal/20 rounded-full flex items-center justify-center group-hover:bg-neon-teal/30 transition-colors neon-glow-teal">
                  <Play className="text-neon-teal ml-1" size={32} />
                </div>
              </button>
              <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-full">
                <span className="text-neon-teal font-semibold">Tour VR Disponible</span>
              </div>
            </div>
            
            <div>
              <h2 className="heading-lg text-gradient mb-6">
                Vívela en VR antes de decidir
              </h2>
              <p className="text-xl text-white/80 mb-6">
                Cada propiedad que exploras virtualmente existe realmente. Recorre cada habitación, 
                siente el espacio, y toma tu decisión informada antes de firmar.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-neon-teal mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Oferta Real Verificada</h4>
                    <p className="text-white/70">Precios actualizados y verificados en Registro de la Propiedad</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-neon-emerald mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Firma Notarial Digital</h4>
                    <p className="text-white/70">Contratos legalmente válidos con notario certificado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-neon-teal mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Garantía Total</h4>
                    <p className="text-white/70">Seguro de título y garantía de entrega</p>
                  </div>
                </div>
              </div>
              <Link to="/villa-vr" className="btn-primary">
                Explorar Villa VR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VR Experience + AI Agent + Legal Team */}
      <section className="section-padding bg-gradient-to-b from-transparent to-blue-dark/50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">
              Experiencia VR + Agente IA + Equipo Legal Humano
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              La tecnología más avanzada respaldada por profesionales reales para tu tranquilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VR Experience */}
            <div className="glass-card p-8 hover-glow-teal text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-blue-dark" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tours VR Realistas</h3>
              <p className="text-white/70 mb-6">
                Recorre la propiedad real desde cualquier lugar. Tecnología 8K con detalles fotorrealistas.
              </p>
              <ul className="text-left text-white/60 space-y-2">
                <li>• Medidas exactas</li>
                <li>• Iluminación natural</li>
                <li>• Vista 360° completa</li>
                <li>• Compatible VR/Desktop</li>
              </ul>
            </div>

            {/* AI Agent */}
            <div className="glass-card p-8 hover-glow-emerald text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-emerald to-neon-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-blue-dark" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Agente IA 24/7</h3>
              <p className="text-white/70 mb-6">
                Asistente inteligente que responde dudas, programa visitas y te guía en todo el proceso.
              </p>
              <ul className="text-left text-white/60 space-y-2">
                <li>• Consultas instantáneas</li>
                <li>• Análisis de financiación</li>
                <li>• Comparación propiedades</li>
                <li>• Soporte multiidioma</li>
              </ul>
            </div>

            {/* Legal Team */}
            <div className="glass-card p-8 hover-glow-teal text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-dark" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Equipo Legal Real</h3>
              <p className="text-white/70 mb-6">
                Abogados y notarios certificados supervisan cada transacción para garantizar seguridad total.
              </p>
              <ul className="text-left text-white/60 space-y-2">
                <li>• Revisión contractual</li>
                <li>• Due diligence completo</li>
                <li>• Firma notarial válida</li>
                <li>• Registro propiedad</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Map Canarias */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Mapa 3D interactivo de las Islas Canarias"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 to-blue-dark/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">
              Mapa 3D Interactivo de Canarias
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Explora propiedades reales por zona y precio. Solicita documentación o programa visita presencial/virtual
            </p>
            
            {/* Interactive Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <MapPin size={16} className="text-neon-teal" />
                <select className="bg-transparent text-white outline-none">
                  <option value="">Seleccionar Isla</option>
                  <option value="gran-canaria">Gran Canaria</option>
                  <option value="tenerife">Tenerife</option>
                  <option value="lanzarote">Lanzarote</option>
                  <option value="fuerteventura">Fuerteventura</option>
                  <option value="la-palma">La Palma</option>
                  <option value="la-gomera">La Gomera</option>
                  <option value="el-hierro">El Hierro</option>
                </select>
              </div>
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <Euro size={16} className="text-neon-emerald" />
                <select className="bg-transparent text-white outline-none">
                  <option value="">Rango de Precio</option>
                  <option value="0-300k">€0 - 300k</option>
                  <option value="300k-600k">€300k - 600k</option>
                  <option value="600k-1m">€600k - 1M</option>
                  <option value="1m+">€1M+</option>
                </select>
              </div>
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <Building size={16} className="text-neon-teal" />
                <select className="bg-transparent text-white outline-none">
                  <option value="">Tipo</option>
                  <option value="villa">Villa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa-rural">Casa Rural</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center hover-glow-teal">
              <FileText className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Solicitar Documentos</h4>
              <p className="text-white/70 text-sm">Nota simple, planos, certificados</p>
            </div>
            <div className="glass-card p-6 text-center hover-glow-emerald">
              <Calendar className="text-neon-emerald mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Visita Presencial</h4>
              <p className="text-white/70 text-sm">Agenda con agente local</p>
            </div>
            <div className="glass-card p-6 text-center hover-glow-teal">
              <Eye className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Tour Virtual</h4>
              <p className="text-white/70 text-sm">Explora en VR inmediatamente</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/mapa-canarias" className="btn-primary">
              Explorar Mapa 3D
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Real Properties */}
      <section className="section-padding" data-section="properties">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-4">
              Propiedades Reales Disponibles
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Cada propiedad está verificada, documentada y lista para comprar
            </p>
          </div>

          <div className="grid-properties">
            {properties.map((property) => (
              <div
                key={property.id}
                className="glass-card overflow-hidden hover-glow-teal group"
              >
                <div className="relative">
                  <img
                    src={property.mediaUrl}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    data-field="mediaUrl"
                  />
                  <div className="absolute top-4 left-4 flex gap-2" data-field="badges">
                    {property.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          badge === 'Verificada' ? 'bg-neon-emerald/90 text-blue-dark' :
                          badge === 'Disponible' ? 'bg-neon-teal/90 text-blue-dark' :
                          'bg-white/20 text-white'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="w-12 h-12 bg-neon-teal/20 rounded-full flex items-center justify-center hover:bg-neon-teal/30 transition-colors">
                      <Play className="text-neon-teal ml-1" size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" data-field="title">
                    {property.title}
                  </h3>
                  <p className="text-white/70 mb-4 flex items-center gap-2" data-field="location">
                    <MapPin size={16} />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-neon-teal" data-field="price">
                      €{property.price.toLocaleString()}
                    </span>
                    <span className="text-white/60" data-field="pricePerSqm">
                      €{property.pricePerSqm}/m²
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Link
                      to={`/property/${property.slug}/vr`}
                      className="flex-1 btn-secondary text-center text-sm py-2"
                    >
                      Tour VR
                    </Link>
                    <Link
                      to={`/property/${property.slug}/info`}
                      className="flex-1 btn-primary text-center text-sm py-2"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                  <button className="w-full glass-card py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">
                    Solicitar Información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Buyers Community */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-6">
              Comunidad de Compradores Reales
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Conecta con personas que ya compraron, comparten experiencias reales y ayudan en tu decisión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 text-center hover-glow-teal">
              <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-neon-teal" size={32} />
              </div>
              <h4 className="font-bold mb-2">1,247 Compradores</h4>
              <p className="text-white/70 text-sm">Propietarios reales compartiendo experiencias</p>
            </div>
            <div className="glass-card p-6 text-center hover-glow-emerald">
              <div className="w-16 h-16 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-neon-emerald" size={32} />
              </div>
              <h4 className="font-bold mb-2">€847M Vendidos</h4>
              <p className="text-white/70 text-sm">En propiedades reales verificadas</p>
            </div>
            <div className="glass-card p-6 text-center hover-glow-teal">
              <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-neon-teal" size={32} />
              </div>
              <h4 className="font-bold mb-2">4.9/5 Satisfacción</h4>
              <p className="text-white/70 text-sm">Calificación promedio verificada</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/comunidad" className="btn-primary">
              Unirse a la Comunidad
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Band - Legal Verification */}
      <section className="py-16 bg-gradient-to-r from-blue-dark/80 to-blue-dark">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Proceso 100% Legal y Seguro
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Cada transacción cumple la normativa española y europea de compraventa inmobiliaria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="glass-card p-6 text-center hover-glow-teal">
                <feature.icon className="text-neon-teal mx-auto mb-4" size={32} />
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/40">
              <span className="text-lg font-semibold">Colaboramos con:</span>
              <span>Colegio Notarios España</span>
              <span>Registro Propiedad</span>
              <span>CNMV</span>
              <span>Banco de España</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-4">
              Propietarios Reales, Experiencias Reales
            </h2>
          </div>
          
          <div className="grid-testimonials">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-6 hover-glow-teal">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-neon-teal fill-current" size={20} />
                  ))}
                </div>
                <p className="text-white/80 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="text-neon-teal text-sm font-medium">
                  Compró: {testimonial.property}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-xl text-gradient mb-8">
              Tu próxima casa es real.<br />Empieza hoy.
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Explora virtualmente, decide con confianza, compra legalmente. 
              Tu nueva vida en Canarias te está esperando.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservar-visita" className="btn-primary flex items-center justify-center gap-2">
                <Calendar size={20} />
                Reservar Visita
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Hablar con Agente IA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="text-2xl font-bold text-gradient mb-4 block">
                BlueEyeHomes
              </Link>
              <p className="text-white/60 mb-4">
                Explora virtualmente, compra realmente
              </p>
              <div className="text-xs text-white/50 leading-relaxed">
                <strong>Nota Legal:</strong> La visualización virtual es una representación 
                fiel de la propiedad real. La compra es de inmuebles físicos reales ubicados 
                en Canarias y España, sujetos a disponibilidad y verificación notarial.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Propiedades</h4>
              <div className="space-y-2">
                <Link to="/propiedades" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Ver Todas
                </Link>
                <Link to="/propiedades/canarias" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Canarias
                </Link>
                <Link to="/propiedades/peninsula" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Península
                </Link>
                <Link to="/propiedades/nuevas" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Nuevas
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <div className="space-y-2">
                <Link to="/tour-vr" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Tours VR
                </Link>
                <Link to="/asesoria-legal" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Asesoría Legal
                </Link>
                <Link to="/financiacion" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Financiación
                </Link>
                <Link to="/inversion" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Inversión
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/60">
                  <Phone size={16} />
                  <span>+34 900 123 456</span>
                </div>
                <Link to="/contacto" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Formulario
                </Link>
                <Link to="/oficinas" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Oficinas
                </Link>
                <Link to="/prensa" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Prensa
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2024 BlueEyeHomes. Registro Mercantil Madrid. CIF: A-12345678
            </p>
            <div className="flex gap-6">
              <Link to="/privacidad" className="text-white/60 hover:text-neon-teal transition-colors text-sm">
                Privacidad
              </Link>
              <Link to="/terminos" className="text-white/60 hover:text-neon-teal transition-colors text-sm">
                Términos
              </Link>
              <Link to="/cookies" className="text-white/60 hover:text-neon-teal transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
