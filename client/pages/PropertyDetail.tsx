import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  MessageCircle,
  Download,
  Globe,
  CheckCircle,
  Star,
  Calendar,
  Euro,
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Bot,
  FileText,
  Camera,
  Ruler,
  Zap,
  Wifi,
  Car,
  Shield,
  Phone,
  Mail
} from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample property data - in real app, fetch based on ID
  const property = {
    id: id,
    title: 'Villa Moderna Oceanfront',
    location: 'Costa Adeje, Tenerife',
    price: 1250000,
    pricePerSqm: 3500,
    category: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    sqm: 357,
    plotSize: 850,
    yearBuilt: 2021,
    images: [
      '/placeholder.svg',
      '/placeholder.svg', 
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    vrTourUrl: '/vr-tour/villa-oceanfront',
    verified: true,
    featured: true,
    availableFrom: '2024-02-01',
    energyRating: 'A',
    coordinates: { lat: 28.0916, lng: -16.7281 },
    description: `Espectacular villa de lujo con vistas panorámicas al océano Atlántico. Esta propiedad única combina el diseño moderno con la tranquilidad de vivir frente al mar.

La villa cuenta con amplios espacios interiores y exteriores, acabados de primera calidad y una ubicación privilegiada en una de las zonas más exclusivas de Tenerife.

Perfecta para residencia habitual o como inversión en el mercado de alquiler vacacional de lujo.`,
    
    features: [
      'Piscina infinity con vistas al océano',
      'Cocina moderna totalmente equipada',
      'Sistema domótico completo',
      'Terraza de 120m² con jacuzzi',
      'Garaje para 2 vehículos',
      'Jardín mediterráneo privado',
      'Aire acondicionado en todas las habitaciones',
      'Paneles solares y sistema sostenible'
    ],
    
    amenities: [
      { icon: Wifi, label: 'Fibra 1GB' },
      { icon: Car, label: 'Garaje 2 plazas' },
      { icon: Shield, label: 'Seguridad 24h' },
      { icon: Zap, label: 'Domótica' }
    ],
    
    agent: {
      name: 'Carmen Silva',
      phone: '+34 922 123 456',
      email: 'carmen.silva@blueeyehomes.com',
      avatar: '/placeholder.svg',
      specialization: 'Propiedades de lujo en Tenerife',
      rating: 4.9,
      sales: 127
    },
    
    documents: [
      { type: 'Nota Simple', status: 'Disponible' },
      { type: 'Certificado Energético', status: 'Disponible' },
      { type: 'Planos Arquitectónicos', status: 'Disponible' },
      { type: 'IBI último año', status: 'Disponible' }
    ],
    
    nearbyPlaces: [
      { name: 'Playa del Duque', distance: '0.3 km', type: 'Playa' },
      { name: 'Centro Comercial Plaza del Duque', distance: '0.5 km', type: 'Comercio' },
      { name: 'Hospital Hospiten Sur', distance: '2.1 km', type: 'Sanidad' },
      { name: 'Aeropuerto Tenerife Sur', distance: '15 km', type: 'Transporte' }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleGeneratePDF = () => {
    // Generate PDF dossier functionality
    console.log('Generating PDF dossier for property:', property.id);
  };

  const handlePublishAbroad = () => {
    // Publish to foreign portals functionality
    console.log('Publishing to foreign portals:', property.id);
  };

  const tabs = [
    { id: 'overview', label: 'Descripción', icon: FileText },
    { id: 'features', label: 'Características', icon: CheckCircle },
    { id: 'location', label: 'Ubicación', icon: MapPin },
    { id: 'documents', label: 'Documentos', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Back Navigation */}
        <Link 
          to="/propiedades" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-neon-teal transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Volver a Propiedades
        </Link>

        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/50 to-transparent"></div>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full">
              <span className="text-white font-medium">
                {currentImageIndex + 1} / {property.images.length}
              </span>
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                  isSaved ? 'bg-neon-teal/30 text-neon-teal' : 'bg-black/20 text-white hover:bg-black/30'
                }`}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors">
                <Share2 size={20} />
              </button>
              <button 
                onClick={() => setIsGalleryOpen(true)}
                className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors"
              >
                <Maximize2 size={20} />
              </button>
            </div>

            {/* VR Tour Button */}
            <div className="absolute bottom-6 left-6">
              <Link 
                to={property.vrTourUrl}
                className="btn-primary flex items-center gap-2"
              >
                <Eye size={20} />
                Tour VR 360°
              </Link>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex ? 'border-neon-teal' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-neon-teal/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {property.category}
                </span>
                {property.verified && (
                  <span className="bg-neon-emerald/90 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle size={14} />
                    Verificado
                  </span>
                )}
                {property.featured && (
                  <span className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} />
                    Destacado
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-2 text-white/70 mb-6">
                <MapPin size={20} />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-6 rounded-xl">
                <div className="text-center">
                  <Bed className="text-neon-teal mx-auto mb-2" size={24} />
                  <div className="font-bold">{property.bedrooms}</div>
                  <div className="text-white/60 text-sm">Dormitorios</div>
                </div>
                <div className="text-center">
                  <Bath className="text-neon-emerald mx-auto mb-2" size={24} />
                  <div className="font-bold">{property.bathrooms}</div>
                  <div className="text-white/60 text-sm">Baños</div>
                </div>
                <div className="text-center">
                  <Square className="text-neon-teal mx-auto mb-2" size={24} />
                  <div className="font-bold">{property.sqm}m²</div>
                  <div className="text-white/60 text-sm">Construidos</div>
                </div>
                <div className="text-center">
                  <Ruler className="text-neon-emerald mx-auto mb-2" size={24} />
                  <div className="font-bold">{property.plotSize}m²</div>
                  <div className="text-white/60 text-sm">Parcela</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex flex-wrap gap-1 mb-6 glass-card p-2 rounded-xl">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-neon-teal text-blue-dark font-semibold' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="glass-card p-8 rounded-xl">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Descripción</h3>
                      <div className="text-white/80 leading-relaxed whitespace-pre-line">
                        {property.description}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Características destacadas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="text-neon-teal flex-shrink-0" size={20} />
                            <span className="text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Servicios incluidos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {property.amenities.map((amenity, index) => {
                          const IconComponent = amenity.icon;
                          return (
                            <div key={index} className="text-center">
                              <IconComponent className="text-neon-teal mx-auto mb-2" size={24} />
                              <div className="text-white/80 text-sm">{amenity.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Detalles técnicos</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">Año construcción:</span>
                            <span>{property.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Superficie construida:</span>
                            <span>{property.sqm} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Superficie parcela:</span>
                            <span>{property.plotSize} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Certificado energético:</span>
                            <span className="bg-green-500 text-black px-2 py-1 rounded text-sm font-bold">
                              {property.energyRating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Disponible desde:</span>
                            <span>{new Date(property.availableFrom).toLocaleDateString('es-ES')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4">Documentación</h3>
                        <div className="space-y-3">
                          {property.documents.map((doc, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-white/70">{doc.type}:</span>
                              <div className="flex items-center gap-2">
                                <span className="text-neon-emerald text-sm">{doc.status}</span>
                                <button className="text-neon-teal hover:text-neon-emerald transition-colors">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center text-white/60">
                        <MapPin size={48} className="mx-auto mb-4" />
                        <p>Mapa interactivo 3D</p>
                        <p className="text-sm">Coordenadas: {property.coordinates.lat}, {property.coordinates.lng}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Lugares de interés cercanos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.nearbyPlaces.map((place, index) => (
                          <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                            <div>
                              <div className="font-medium">{place.name}</div>
                              <div className="text-white/60 text-sm">{place.type}</div>
                            </div>
                            <div className="text-neon-teal font-medium">{place.distance}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    <p className="text-white/70">
                      Todos los documentos están verificados y actualizados. Puedes descargar 
                      la documentación completa o generar un dossier personalizado.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.documents.map((doc, index) => (
                        <div key={index} className="glass-card p-4 rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FileText className="text-neon-teal" size={24} />
                            <div>
                              <div className="font-medium">{doc.type}</div>
                              <div className="text-white/60 text-sm">{doc.status}</div>
                            </div>
                          </div>
                          <button className="btn-secondary px-3 py-2 text-sm">
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price */}
            <div className="glass-card p-6 rounded-xl">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-neon-teal mb-2">
                  €{property.price.toLocaleString()}
                </div>
                <div className="text-white/60">
                  €{property.pricePerSqm.toLocaleString()}/m²
                </div>
              </div>

              <div className="space-y-4">
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Hablar con IA
                </button>
                
                <button 
                  onClick={handleGeneratePDF}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Generar dossier PDF
                </button>
                
                <button 
                  onClick={handlePublishAbroad}
                  className="glass-card w-full p-3 rounded-lg hover-glow-teal flex items-center justify-center gap-2"
                >
                  <Globe size={20} />
                  Publicar en portales extranjeros
                </button>
              </div>
            </div>

            {/* Agent Info */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-bold mb-4">Agente especializado</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={property.agent.avatar} 
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold">{property.agent.name}</div>
                  <div className="text-white/60 text-sm">{property.agent.specialization}</div>
                  <div className="flex items-center gap-1 text-neon-teal text-sm">
                    <Star size={14} fill="currentColor" />
                    <span>{property.agent.rating}</span>
                    <span className="text-white/60">({property.agent.sales} ventas)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${property.agent.phone}`}
                  className="glass-card p-3 rounded-lg flex items-center gap-3 hover-glow-teal"
                >
                  <Phone className="text-neon-teal" size={20} />
                  <span>{property.agent.phone}</span>
                </a>
                
                <a 
                  href={`mailto:${property.agent.email}`}
                  className="glass-card p-3 rounded-lg flex items-center gap-3 hover-glow-teal"
                >
                  <Mail className="text-neon-emerald" size={20} />
                  <span className="text-sm">{property.agent.email}</span>
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-bold mb-4">Acciones rápidas</h3>
              <div className="space-y-3">
                <button className="w-full glass-card p-3 rounded-lg hover-glow-teal flex items-center gap-3">
                  <Calendar className="text-neon-teal" size={20} />
                  <span>Agendar visita</span>
                </button>
                
                <button className="w-full glass-card p-3 rounded-lg hover-glow-emerald flex items-center gap-3">
                  <Camera className="text-neon-emerald" size={20} />
                  <span>Solicitar más fotos</span>
                </button>
                
                <button className="w-full glass-card p-3 rounded-lg hover-glow-teal flex items-center gap-3">
                  <Euro className="text-neon-teal" size={20} />
                  <span>Calcular hipoteca</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gradient mb-8">Propiedades similares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with similar properties */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card p-4 rounded-xl hover-glow-teal">
                <div className="bg-white/5 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white/40">Propiedad relacionada {item}</span>
                </div>
                <h4 className="font-bold mb-2">Villa Similiar {item}</h4>
                <p className="text-white/60 text-sm mb-3">Ubicación similar</p>
                <div className="flex justify-between items-center">
                  <span className="text-neon-teal font-bold">€890.000</span>
                  <Link to={`/property/similar-${item}`} className="btn-secondary px-3 py-2 text-sm">
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <button className="fixed bottom-6 right-6 z-50 btn-primary w-16 h-16 rounded-full flex items-center justify-center animate-float hover-glow-teal shadow-neon-teal">
        <Bot size={28} />
      </button>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-blue-dark/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
            
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
