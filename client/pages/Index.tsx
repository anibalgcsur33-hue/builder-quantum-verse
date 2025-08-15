import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  MapPin, 
  Bitcoin, 
  Shield, 
  Play, 
  Star, 
  ChevronDown,
  MessageCircle,
  Menu,
  X,
  Filter
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

  // Property data structure (ready for Supabase binding)
  const properties = [
    {
      id: '1',
      title: 'Villa Futurista Marina',
      location: 'Las Palmas, Gran Canaria',
      price: 850000,
      pricePerSqm: 3200,
      mediaUrl: '/placeholder.svg',
      badges: ['VR tour', 'Crypto-ready'],
      cryptoReady: true,
      slug: 'villa-futurista-marina'
    },
    {
      id: '2',
      title: 'Apartamento Holográfico',
      location: 'Santa Cruz, Tenerife',
      price: 420000,
      pricePerSqm: 2800,
      mediaUrl: '/placeholder.svg',
      badges: ['VR tour', 'Crypto-ready'],
      cryptoReady: true,
      slug: 'apartamento-holografico'
    },
    {
      id: '3',
      title: 'Penthouse Metaverso',
      location: 'Puerto del Carmen, Lanzarote',
      price: 1200000,
      pricePerSqm: 4500,
      mediaUrl: '/placeholder.svg',
      badges: ['VR tour', 'Crypto-ready'],
      cryptoReady: true,
      slug: 'penthouse-metaverso'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      text: 'Compré mi villa usando Bitcoin. La experiencia VR me permitió conocer cada detalle antes de firmar.',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      text: 'El tour virtual es impresionante. Se siente como estar realmente dentro de la propiedad.',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      text: 'Contratos digitales seguros y pago instantáneo. El futuro del real estate ya está aquí.',
      rating: 5,
      avatar: '/placeholder.svg'
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
              BEA
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/propiedades" className="hover:text-neon-teal transition-colors">
                Inmuebles
              </Link>
              <Link to="/tour-vr" className="hover:text-neon-teal transition-colors">
                Tour VR
              </Link>
              <Link to="/mapa-3d" className="hover:text-neon-teal transition-colors">
                Mapa 3D
              </Link>
              <Link to="/comunidad" className="hover:text-neon-teal transition-colors">
                Comunidad
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
                Inmuebles
              </Link>
              <Link to="/tour-vr" className="block hover:text-neon-teal transition-colors">
                Tour VR
              </Link>
              <Link to="/mapa-3d" className="block hover:text-neon-teal transition-colors">
                Mapa 3D
              </Link>
              <Link to="/comunidad" className="block hover:text-neon-teal transition-colors">
                Comunidad
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
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
            aria-label="Metaverse real estate background video"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <img src="/placeholder.svg" alt="Metaverse cityscape background" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/50 to-blue-dark/80"></div>
        </div>

        <div className="relative z-10 container mx-auto container-padding text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <h1 className="heading-xl text-gradient animate-slide-up">
              Explora y compra inmuebles en el Metaverso
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mt-6 mb-8 animate-fade-in">
              Tours VR inmersivos · Contratos digitales · Pago en criptomonedas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
              <Link to="/metaverso" className="btn-primary">
                Entrar al Metaverso
              </Link>
              <Link to="/propiedades" className="btn-secondary">
                Explorar Propiedades
              </Link>
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
        aria-label="Hablar con IA"
      >
        <MessageCircle size={24} />
      </button>

      {/* Pillars Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-4">
              El Futuro del Real Estate
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Tecnología revolucionaria que transforma la experiencia inmobiliaria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="glass-card p-8 hover-glow-teal group">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center mb-6 group-hover:animate-glow">
                <Eye className="text-blue-dark" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tours Virtuales 3D & VR</h3>
              <p className="text-white/70">
                Recorre cada propiedad como si estuvieras dentro. Tecnología hiperrealista para una experiencia inmersiva completa.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card p-8 hover-glow-emerald group">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-emerald to-neon-teal rounded-full flex items-center justify-center mb-6 group-hover:animate-glow">
                <Bitcoin className="text-blue-dark" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pago con Criptomonedas</h3>
              <p className="text-white/70">
                Transacciones seguras, rápidas y globales. Compatible con Bitcoin, Ethereum y las principales criptomonedas.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card p-8 hover-glow-teal group">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center mb-6 group-hover:animate-glow">
                <Shield className="text-blue-dark" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Contratos Digitales</h3>
              <p className="text-white/70">
                Firma al instante con tecnología blockchain. Contratos seguros, transparentes e inmutables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding" data-section="properties">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Descubre inmuebles únicos en el metaverso inmobiliario
            </p>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <Filter size={16} />
                <select className="bg-transparent text-white outline-none">
                  <option value="">Zona</option>
                  <option value="gran-canaria">Gran Canaria</option>
                  <option value="tenerife">Tenerife</option>
                  <option value="lanzarote">Lanzarote</option>
                </select>
              </div>
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <select className="bg-transparent text-white outline-none">
                  <option value="">Precio</option>
                  <option value="0-500k">€0 - 500k</option>
                  <option value="500k-1m">€500k - 1M</option>
                  <option value="1m+">€1M+</option>
                </select>
              </div>
              <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                <select className="bg-transparent text-white outline-none">
                  <option value="">Crypto</option>
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
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
                        className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {badge}
                      </span>
                    ))}
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
                  <Link
                    to={`/property/${property.slug}`}
                    className="btn-primary w-full text-center"
                  >
                    Ver en VR
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {properties.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white/40" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4">No se encontraron propiedades</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Ajusta los filtros para encontrar la propiedad perfecta en el metaverso inmobiliario.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* VR Experience Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <video
                className="w-full h-96 object-cover rounded-xl"
                autoPlay
                muted
                loop
                playsInline
                poster="/placeholder.svg"
              >
                <source src="/vr-experience.mp4" type="video/mp4" />
                <img src="/placeholder.svg" alt="People using VR headsets with holograms" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/50 to-transparent rounded-xl"></div>
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="text-white ml-1" size={32} />
                </div>
              </button>
            </div>
            <div>
              <h2 className="heading-lg text-gradient mb-6">
                Vive la experiencia antes de comprar
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Sumérgete en tours hiperrealistas y conoce cada detalle de tu futuro hogar. 
                Nuestra tecnología VR te permite explorar propiedades como nunca antes.
              </p>
              <Link to="/tour-vr" className="btn-primary">
                Probar Tour Virtual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Map Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Futuristic 3D city map with glowing pins"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 to-blue-dark/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto container-padding text-center">
          <h2 className="heading-lg text-gradient mb-6">
            Explora Canarias y España en 3D
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Filtra por zona, precio y disponibilidad cripto en nuestro mapa interactivo
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
              <Bitcoin size={20} className="text-neon-teal" />
              <span>Crypto</span>
            </div>
            <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
              <Shield size={20} className="text-neon-emerald" />
              <span>Contrato</span>
            </div>
            <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
              <Eye size={20} className="text-neon-teal" />
              <span>Metaverso</span>
            </div>
          </div>
          
          <Link to="/mapa-3d" className="btn-primary">
            Explorar Mapa 3D
          </Link>
        </div>
      </section>

      {/* Crypto Trust Section */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="glass-card p-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
              <div className="text-4xl font-bold text-white/20">ETH</div>
              <div className="text-4xl font-bold text-white/20">BTC</div>
              <div className="text-4xl font-bold text-white/20">USDT</div>
              <div className="text-4xl font-bold text-white/20">Coinbase</div>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Compra segura con wallets compatibles. Contratos digitales verificados en blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding text-center">
          <h2 className="heading-lg text-gradient mb-6">
            Únete a la primera comunidad inmobiliaria del metaverso
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Conecta con compradores, comparte tours y descubre oportunidades exclusivas en nuestra comunidad global.
          </p>
          <Link to="/comunidad" className="btn-primary">
            Acceder a la Comunidad
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gradient mb-4">
              Lo que dicen nuestros clientes
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
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">Cliente verificado</p>
                  </div>
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
              El futuro del Real Estate ya llegó
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/propiedades" className="btn-primary">
                Explorar Inmuebles
              </Link>
              <button className="btn-secondary">
                Hablar con IA ahora
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
              <p className="text-white/60">
                El futuro del real estate en el metaverso
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Navegación</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Inicio
                </Link>
                <Link to="/propiedades" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Propiedades
                </Link>
                <Link to="/tour-vr" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Tour VR
                </Link>
                <Link to="/mapa-3d" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Mapa 3D
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Comunidad</h4>
              <div className="space-y-2">
                <Link to="/comunidad" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Comunidad
                </Link>
                <Link to="/contacto" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Contacto
                </Link>
                <a href="https://t.me/blueeyehomes" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Telegram
                </a>
                <a href="https://discord.gg/blueeyehomes" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Discord
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <div className="space-y-2">
                <a href="https://twitter.com/blueeyehomes" className="block text-white/60 hover:text-neon-teal transition-colors">
                  X (Twitter)
                </a>
                <a href="https://instagram.com/blueeyehomes" className="block text-white/60 hover:text-neon-teal transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2024 BlueEyeHomes. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/privacidad" className="text-white/60 hover:text-neon-teal transition-colors text-sm">
                Privacidad
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
