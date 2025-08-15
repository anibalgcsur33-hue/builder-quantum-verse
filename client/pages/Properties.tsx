import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Euro, 
  Bed, 
  Bath, 
  Square, 
  Eye, 
  Star,
  CheckCircle,
  Home,
  Building,
  Calendar,
  Shield,
  ArrowRight,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';

export default function Properties() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: ''
  });

  const categories = [
    { id: 'all', label: 'Todas', icon: Home, count: 247 },
    { id: 'comprar', label: 'Comprar', icon: Building, count: 156, link: '/propiedades/comprar' },
    { id: 'alquilar', label: 'Alquilar', icon: Calendar, count: 91, link: '/propiedades/alquilar' },
    { id: 'obra-nueva', label: 'Obra Nueva', icon: Shield, count: 34, link: '/propiedades/obra-nueva' },
    { id: 'verificadas', label: 'Verificadas', icon: CheckCircle, count: 203, link: '/propiedades/verificadas' }
  ];

  // Sample properties data
  const properties = [
    {
      id: '1',
      title: 'Villa Moderna Oceanfront',
      location: 'Costa Adeje, Tenerife',
      price: 1250000,
      pricePerSqm: 3500,
      type: 'comprar',
      category: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      sqm: 357,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      verified: true,
      vrTour: true,
      featured: true,
      description: 'Espectacular villa de lujo con vistas panorámicas al océano Atlántico.',
      coordinates: { lat: 28.0916, lng: -16.7281 }
    },
    {
      id: '2',
      title: 'Apartamento Centro Histórico',
      location: 'Las Palmas, Gran Canaria',
      price: 420000,
      pricePerSqm: 2800,
      type: 'comprar',
      category: 'Apartamento',
      bedrooms: 2,
      bathrooms: 2,
      sqm: 150,
      images: ['/placeholder.svg', '/placeholder.svg'],
      verified: true,
      vrTour: true,
      featured: false,
      description: 'Apartamento reformado en el corazón histórico de Las Palmas.',
      coordinates: { lat: 28.1235, lng: -15.4362 }
    },
    {
      id: '3',
      title: 'Casa Rural con Viñedo',
      location: 'La Geria, Lanzarote',
      price: 850000,
      pricePerSqm: 2100,
      type: 'comprar',
      category: 'Casa Rural',
      bedrooms: 3,
      bathrooms: 2,
      sqm: 405,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      verified: true,
      vrTour: true,
      featured: true,
      description: 'Auténtica casa canaria con viñedo propio en paisaje volcánico único.',
      coordinates: { lat: 29.0469, lng: -13.6623 }
    },
    {
      id: '4',
      title: 'Penthouse Marina Exclusive',
      location: 'Puerto Banús, Marbella',
      price: 2800000,
      pricePerSqm: 8750,
      type: 'alquilar',
      category: 'Penthouse',
      bedrooms: 3,
      bathrooms: 3,
      sqm: 320,
      images: ['/placeholder.svg', '/placeholder.svg'],
      verified: true,
      vrTour: true,
      featured: true,
      description: 'Penthouse de lujo en primera línea de puerto deportivo.',
      coordinates: { lat: 36.4848, lng: -4.9558 },
      rentType: 'vacacional',
      pricePerMonth: 15000
    },
    {
      id: '5',
      title: 'Proyecto Eco-Residencial',
      location: 'Playa Paraíso, Tenerife',
      price: 380000,
      pricePerSqm: 3167,
      type: 'obra-nueva',
      category: 'Apartamento',
      bedrooms: 2,
      bathrooms: 2,
      sqm: 120,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      verified: true,
      vrTour: true,
      featured: false,
      description: 'Complejo residencial sostenible con entrega en Q2 2025.',
      coordinates: { lat: 28.0583, lng: -16.7861 },
      completionDate: 'Q2 2025'
    }
  ];

  const filteredProperties = properties.filter(property => {
    if (selectedCategory !== 'all' && property.type !== selectedCategory) {
      return false;
    }
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-lg text-gradient mb-6">
            Propiedades BlueEyeHomes
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explora nuestra selección de propiedades reales en Canarias y España. 
            Cada inmueble incluye tours VR y verificación registral.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return category.link ? (
                <Link
                  key={category.id}
                  to={category.link}
                  className={`glass-card p-6 rounded-xl hover-glow-teal transition-all duration-300 flex flex-col items-center gap-3 min-w-[140px] ${
                    isSelected ? 'bg-neon-teal/20 border-neon-teal/50' : ''
                  }`}
                >
                  <IconComponent className="text-neon-teal" size={32} />
                  <div className="text-center">
                    <h3 className="font-bold">{category.label}</h3>
                    <p className="text-white/60 text-sm">{category.count} propiedades</p>
                  </div>
                </Link>
              ) : (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`glass-card p-6 rounded-xl hover-glow-teal transition-all duration-300 flex flex-col items-center gap-3 min-w-[140px] ${
                    isSelected ? 'bg-neon-teal/20 border-neon-teal/50' : ''
                  }`}
                >
                  <IconComponent className="text-neon-teal" size={32} />
                  <div className="text-center">
                    <h3 className="font-bold">{category.label}</h3>
                    <p className="text-white/60 text-sm">{category.count} propiedades</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Buscar por ubicación o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-3">
              <select 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
              >
                <option value="">Ubicación</option>
                <option value="tenerife">Tenerife</option>
                <option value="gran-canaria">Gran Canaria</option>
                <option value="lanzarote">Lanzarote</option>
                <option value="fuerteventura">Fuerteventura</option>
              </select>

              <select 
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
              >
                <option value="">Precio</option>
                <option value="0-300k">€0 - 300k</option>
                <option value="300k-600k">€300k - 600k</option>
                <option value="600k-1m">€600k - 1M</option>
                <option value="1m+">€1M+</option>
              </select>

              <button className="glass-card px-4 py-3 rounded-lg hover-glow-teal flex items-center gap-2">
                <SlidersHorizontal size={20} />
                <span className="hidden sm:inline">Más filtros</span>
              </button>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-neon-teal text-blue-dark' : 'glass-card hover:bg-white/10'
                }`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-neon-teal text-blue-dark' : 'glass-card hover:bg-white/10'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-white/60">
            {filteredProperties.length} propiedades encontradas
          </p>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-teal">
            <option value="featured">Destacadas primero</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>

        {/* Properties Grid */}
        <div className={`mb-16 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`glass-card overflow-hidden hover-glow-teal group cursor-pointer ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                    viewMode === 'list' ? 'w-full h-64 md:h-full' : 'w-full h-64'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-transparent to-transparent"></div>
                
                {/* Property Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {property.category}
                  </span>
                </div>

                {/* VR Tour Button */}
                {property.vrTour && (
                  <div className="absolute top-4 right-4">
                    <button className="w-12 h-12 bg-neon-emerald/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-neon-emerald/30 transition-colors">
                      <Eye className="text-neon-emerald" size={20} />
                    </button>
                  </div>
                )}

                {/* Verified Badge */}
                {property.verified && (
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 bg-neon-emerald/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <CheckCircle className="text-neon-emerald" size={14} />
                      <span className="text-white text-xs font-medium">Verificado</span>
                    </div>
                  </div>
                )}

                {/* Featured Badge */}
                {property.featured && (
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2 bg-neon-teal/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="text-neon-teal" size={14} />
                      <span className="text-white text-xs font-medium">Destacado</span>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="absolute bottom-16 right-4 flex gap-2 text-xs text-white/80">
                  <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                    <Bed size={12} />
                    {property.bedrooms}
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                    <Bath size={12} />
                    {property.bathrooms}
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                    <Square size={12} />
                    {property.sqm}m²
                  </span>
                </div>
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'md:w-2/3 flex flex-col justify-between' : ''}`}>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-neon-teal transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-white/70 mb-4 flex items-center gap-2">
                    <MapPin size={16} />
                    {property.location}
                  </p>
                  <p className="text-white/60 mb-4 text-sm line-clamp-2">
                    {property.description}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-2xl font-bold text-neon-teal">
                        €{property.price.toLocaleString()}
                      </span>
                      {property.pricePerMonth && (
                        <span className="text-white/60 text-sm block">
                          €{property.pricePerMonth.toLocaleString()}/mes
                        </span>
                      )}
                    </div>
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
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredProperties.length >= 9 && (
          <div className="text-center mb-16">
            <button className="btn-secondary">
              Cargar más propiedades
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Nuestro agente IA puede ayudarte a encontrar la propiedad perfecta 
            o crear alertas personalizadas para nuevas oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Hablar con Agente IA
            </button>
            <Link to="/alertas" className="btn-secondary">
              Crear Alerta Personalizada
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
