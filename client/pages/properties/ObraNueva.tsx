import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import AIConcierge from '../../components/AIConcierge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Euro, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Eye, 
  Star, 
  CheckCircle, 
  Grid3X3, 
  List,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Building,
  Home,
  MessageCircle,
  Camera,
  Hammer,
  Zap,
  Leaf,
  Shield,
  Award,
  ChevronRight,
  Download,
  Play,
  Info,
  Timer,
  Wrench
} from 'lucide-react';

interface NewDevelopment {
  id: string;
  title: string;
  location: string;
  developer: string;
  totalUnits: number;
  availableUnits: number;
  priceFrom: number;
  priceTo: number;
  deliveryDate: string;
  constructionProgress: number;
  images: string[];
  description: string;
  category: string;
  verified: boolean;
  featured: boolean;
  energyRating: string;
  amenities: string[];
  sustainability: string[];
  smartFeatures: string[];
  financing: boolean;
  earlyBirdDiscount?: number;
  unitTypes: {
    type: string;
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    priceFrom: number;
    available: number;
  }[];
  tags: string[];
  certifications: string[];
}

export default function ObraNueva() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    location: '',
    delivery: '',
    progress: '',
    developer: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample new developments
  const developments: NewDevelopment[] = [
    {
      id: '1',
      title: 'Residencial Océano Verde',
      location: 'Costa Adeje, Tenerife',
      developer: 'Constructora Premium Canarias',
      totalUnits: 48,
      availableUnits: 12,
      priceFrom: 380000,
      priceTo: 650000,
      deliveryDate: '2025-06-30',
      constructionProgress: 75,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      description: 'Complejo residencial de lujo con diseño sostenible y vistas panorámicas al océano. Apartamentos y áticos con las últimas tecnologías.',
      category: 'Residencial',
      verified: true,
      featured: true,
      energyRating: 'A+',
      amenities: ['Piscina infinity', 'Gimnasio', 'Spa', 'Jardines', 'Parking subterráneo', 'Conserje'],
      sustainability: ['Paneles solares', 'Aprovechamiento agua lluvia', 'Materiales reciclados', 'Certificación BREEAM'],
      smartFeatures: ['Domótica integral', 'App control', 'Seguridad biométrica', 'Carga vehículos eléctricos'],
      financing: true,
      earlyBirdDiscount: 15,
      unitTypes: [
        { type: 'Apartamento 2 dorm', bedrooms: 2, bathrooms: 2, sqm: 85, priceFrom: 380000, available: 6 },
        { type: 'Apartamento 3 dorm', bedrooms: 3, bathrooms: 2, sqm: 120, priceFrom: 520000, available: 4 },
        { type: 'Ático 3 dorm', bedrooms: 3, bathrooms: 3, sqm: 150, priceFrom: 650000, available: 2 }
      ],
      tags: ['Lujo', 'Sostenible', 'Smart Home', 'Vista mar'],
      certifications: ['BREEAM', 'ISO 14001', 'LEED Gold']
    },
    {
      id: '2',
      title: 'Villas Mediterráneas Premium',
      location: 'Adeje, Tenerife',
      developer: 'Mediterranean Homes Group',
      totalUnits: 24,
      availableUnits: 8,
      priceFrom: 850000,
      priceTo: 1200000,
      deliveryDate: '2024-12-31',
      constructionProgress: 90,
      images: ['/placeholder.svg', '/placeholder.svg'],
      description: 'Exclusivas villas independientes con piscina privada y jardín. Diseño mediterráneo moderno con acabados de primera calidad.',
      category: 'Villas',
      verified: true,
      featured: true,
      energyRating: 'A',
      amenities: ['Piscina privada', 'Jardín privado', 'Garaje 2 plazas', 'Terraza 60m²', 'Barbacoa', 'Almacén'],
      sustainability: ['Aerotermia', 'Aislamiento térmico premium', 'Ventanas triple acristalamiento'],
      smartFeatures: ['Domótica', 'Sistema riego inteligente', 'Alarma integrada'],
      financing: true,
      unitTypes: [
        { type: 'Villa 3 dorm', bedrooms: 3, bathrooms: 3, sqm: 180, priceFrom: 850000, available: 5 },
        { type: 'Villa 4 dorm', bedrooms: 4, bathrooms: 4, sqm: 220, priceFrom: 1200000, available: 3 }
      ],
      tags: ['Villa privada', 'Mediterráneo', 'Exclusivo', 'Jardín'],
      certifications: ['ISO 9001', 'Passivhaus']
    },
    {
      id: '3',
      title: 'Complejo Marina Bay',
      location: 'Las Palmas, Gran Canaria',
      developer: 'Atlantic Development',
      totalUnits: 120,
      availableUnits: 45,
      priceFrom: 220000,
      priceTo: 480000,
      deliveryDate: '2025-03-31',
      constructionProgress: 45,
      images: ['/placeholder.svg'],
      description: 'Moderno complejo residencial frente al puerto deportivo. Apartamentos de 1 a 3 dormitorios con vistas al mar y la ciudad.',
      category: 'Residencial',
      verified: true,
      featured: false,
      energyRating: 'B+',
      amenities: ['Piscina comunitaria', 'Solarium', 'Parking', 'Trastero', 'Zona infantil', 'Local comercial'],
      sustainability: ['Eficiencia energética', 'LED en zonas comunes', 'Reciclaje agua'],
      smartFeatures: ['Pre-instalación domótica', 'Fibra óptica', 'Videoportero'],
      financing: true,
      earlyBirdDiscount: 10,
      unitTypes: [
        { type: 'Apartamento 1 dorm', bedrooms: 1, bathrooms: 1, sqm: 55, priceFrom: 220000, available: 20 },
        { type: 'Apartamento 2 dorm', bedrooms: 2, bathrooms: 2, sqm: 75, priceFrom: 290000, available: 15 },
        { type: 'Apartamento 3 dorm', bedrooms: 3, bathrooms: 2, sqm: 95, priceFrom: 380000, available: 10 }
      ],
      tags: ['Marina', 'Inversión', 'Primera línea', 'Moderno'],
      certifications: ['CE', 'ISO 9001']
    },
    {
      id: '4',
      title: 'Eco Residences Teide',
      location: 'La Orotava, Tenerife',
      developer: 'Green Building Solutions',
      totalUnits: 16,
      availableUnits: 6,
      priceFrom: 320000,
      priceTo: 450000,
      deliveryDate: '2025-09-30',
      constructionProgress: 25,
      images: ['/placeholder.svg', '/placeholder.svg'],
      description: 'Promoción de viviendas eco-sostenibles con vistas al Teide. Construcción bioclimática con materiales naturales.',
      category: 'Eco-Residencial',
      verified: true,
      featured: false,
      energyRating: 'A++',
      amenities: ['Huerto comunitario', 'Zona yoga', 'Parking bicicletas', 'Compostaje', 'Senderos'],
      sustainability: ['Construcción bioclimática', 'Materiales naturales', 'Autosuficiencia energética', 'Certificación LEED Platinum'],
      smartFeatures: ['Monitoreo energético', 'Control clima inteligente', 'App sostenibilidad'],
      financing: true,
      unitTypes: [
        { type: 'Casa 2 dorm', bedrooms: 2, bathrooms: 2, sqm: 90, priceFrom: 320000, available: 4 },
        { type: 'Casa 3 dorm', bedrooms: 3, bathrooms: 2, sqm: 110, priceFrom: 450000, available: 2 }
      ],
      tags: ['Eco', 'Sostenible', 'Natural', 'Bioclimático'],
      certifications: ['LEED Platinum', 'BREEAM Outstanding', 'Passivhaus Plus']
    }
  ];

  const handleSaveProperty = (propertyId: string) => {
    const newSaved = new Set(savedProperties);
    if (newSaved.has(propertyId)) {
      newSaved.delete(propertyId);
    } else {
      newSaved.add(propertyId);
    }
    setSavedProperties(newSaved);
  };

  const filteredDevelopments = developments.filter(dev => {
    const matchesSearch = dev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dev.developer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriceMin = !filters.priceMin || dev.priceFrom >= parseInt(filters.priceMin);
    const matchesPriceMax = !filters.priceMax || dev.priceFrom <= parseInt(filters.priceMax);
    
    return matchesSearch && matchesPriceMin && matchesPriceMax;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDeliveryStatus = (deliveryDate: string) => {
    const delivery = new Date(deliveryDate);
    const now = new Date();
    const monthsUntilDelivery = Math.ceil((delivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (monthsUntilDelivery <= 6) return { text: 'Entrega inmediata', color: 'text-green-400' };
    if (monthsUntilDelivery <= 12) return { text: 'Entrega próxima', color: 'text-yellow-400' };
    return { text: 'En construcción', color: 'text-blue-400' };
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-2.5 shadow-lg shadow-orange-500/30">
                <Hammer className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
                  Obra Nueva
                </h1>
                <p className="text-orange-400 font-medium">Promociones exclusivas en construcción</p>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl">
              Descubre las mejores promociones de obra nueva en Canarias. Desde villas de lujo hasta 
              residenciales eco-sostenibles con las últimas tecnologías y precios de lanzamiento.
            </p>
          </div>

          {/* Benefits Banner */}
          <div className="glass-card p-6 rounded-2xl mb-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Ventajas de comprar en obra nueva</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-white/90">Garantía 10 años</span>
              </div>
              <div className="flex items-center space-x-3">
                <Euro className="w-6 h-6 text-green-400" />
                <span className="text-white/90">Precios de lanzamiento</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-green-400" />
                <span className="text-white/90">Eficiencia energética A+</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por ubicación, promotora o características..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-neon-teal text-blue-dark' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-neon-teal text-blue-dark' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Precio mínimo</label>
                    <input
                      type="number"
                      placeholder="€"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Precio máximo</label>
                    <input
                      type="number"
                      placeholder="€"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Fecha entrega</label>
                    <select
                      value={filters.delivery}
                      onChange={(e) => setFilters({...filters, delivery: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                    >
                      <option value="">Cualquiera</option>
                      <option value="6months">6 meses</option>
                      <option value="1year">1 año</option>
                      <option value="2years">2 años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Estado obra</label>
                    <select
                      value={filters.progress}
                      onChange={(e) => setFilters({...filters, progress: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-teal"
                    >
                      <option value="">Cualquiera</option>
                      <option value="25">25%+</option>
                      <option value="50">50%+</option>
                      <option value="75">75%+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {filteredDevelopments.length} promociones disponibles
              </h2>
              <p className="text-white/60 text-sm">Con precios desde {formatCurrency(Math.min(...developments.map(d => d.priceFrom)))}</p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-teal">
              <option>Más relevantes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Entrega más próxima</option>
              <option>Mayor disponibilidad</option>
            </select>
          </div>

          {/* Developments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredDevelopments.map((development) => (
              <div key={development.id} className="glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={development.images[0]} 
                    alt={development.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-col gap-2">
                      {development.verified && (
                        <div className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verificada
                        </div>
                      )}
                      {development.earlyBirdDiscount && (
                        <div className="bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          -{development.earlyBirdDiscount}% Lanzamiento
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleSaveProperty(development.id)}
                      className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                        savedProperties.has(development.id)
                          ? 'bg-red-500/90 text-white'
                          : 'bg-black/50 text-white hover:bg-red-500/90'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={savedProperties.has(development.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center">
                      <div className="glass-card px-3 py-1 rounded-lg backdrop-blur-md">
                        <span className="text-white font-bold">Desde {formatCurrency(development.priceFrom)}</span>
                      </div>
                      <div className={`${getDeliveryStatus(development.deliveryDate).color} text-sm font-medium`}>
                        {getDeliveryStatus(development.deliveryDate).text}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white line-clamp-2">{development.title}</h3>
                    <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium ml-2">
                      {development.constructionProgress}% construido
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-white/70 text-sm">{development.location}</span>
                  </div>

                  <div className="flex items-center space-x-1 mb-4">
                    <Building className="w-4 h-4 text-white/60" />
                    <span className="text-white/70 text-sm">{development.developer}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-white font-bold">{development.totalUnits}</div>
                      <div className="text-xs text-white/60">Total viviendas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{development.availableUnits}</div>
                      <div className="text-xs text-white/60">Disponibles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{development.energyRating}</div>
                      <div className="text-xs text-white/60">Calificación</div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{development.description}</p>

                  {/* Unit Types */}
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 text-sm">Tipologías disponibles:</h4>
                    <div className="space-y-2">
                      {development.unitTypes.map((unit, index) => (
                        <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-sm">{unit.type}</span>
                            <span className="text-white/60 text-xs">({unit.sqm}m²)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 text-sm font-medium">
                              {formatCurrency(unit.priceFrom)}
                            </span>
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                              {unit.available} disp.
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {development.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Progreso construcción</span>
                      <span className="text-white">{development.constructionProgress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${development.constructionProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">
                      <div>Entrega: {new Date(development.deliveryDate).toLocaleDateString('es-ES')}</div>
                      {development.financing && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          Financiación disponible
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/development/${development.id}`}
                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Ver proyecto
                      </Link>
                      <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-2xl text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Garantía Total</h3>
              <p className="text-white/70 text-sm">10 años de garantía estructural y 2 años en acabados</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <Euro className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Financiación</h3>
              <p className="text-white/70 text-sm">Hasta 90% financiación con nuestros partners bancarios</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Personalización</h3>
              <p className="text-white/70 text-sm">Elige acabados y mejoras según tu estilo</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concierge */}
      <AIConcierge />
    </div>
  );
}
