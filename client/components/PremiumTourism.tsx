import { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Camera, 
  Utensils, 
  Car, 
  Waves, 
  Mountain, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Euro, 
  Phone, 
  Mail, 
  ArrowRight,
  Heart,
  Eye,
  Bed,
  Wifi,
  Coffee,
  Palmtree,
  Sun,
  Building
} from 'lucide-react';

interface TourismPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  maxGuests: number;
  price: number;
  originalPrice: number;
  image: string;
  hotelName: string;
  hotelRating: number;
  location: string;
  includes: string[];
  highlights: string[];
  propertyVisits: number;
  exclusiveAccess: boolean;
}

export default function PremiumTourism() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const tourismPackages: TourismPackage[] = [
    {
      id: 'tenerife-luxury',
      title: 'Exploración Tenerife Luxury',
      subtitle: 'Descubre propiedades exclusivas mientras disfrutas del paraíso',
      duration: '3 noches',
      maxGuests: 2,
      price: 0, // Free with property interest
      originalPrice: 890,
      image: '/placeholder.svg',
      hotelName: 'Hotel Botánico & Oriental Spa Garden',
      hotelRating: 5,
      location: 'Puerto de la Cruz, Tenerife',
      includes: [
        '3 noches en suite premium',
        'Desayuno gourmet incluido',
        'Traslados VIP aeropuerto',
        'Tour privado 6 propiedades premium',
        'Cena en restaurante Michelin',
        'Acceso spa y wellness center'
      ],
      highlights: [
        'Villas con vista al Teide',
        'Propiedades frente al mar',
        'Áticos de lujo exclusivos',
        'Reunión con arquitectos locales'
      ],
      propertyVisits: 6,
      exclusiveAccess: true
    },
    {
      id: 'gran-canaria-explorer',
      title: 'Gran Canaria Explorer VIP',
      subtitle: 'Inversión inmobiliaria en el continente en miniatura',
      duration: '3 noches',
      maxGuests: 4,
      price: 0,
      originalPrice: 1240,
      image: '/placeholder.svg',
      hotelName: 'Villa del Conde Resort & Thalasso',
      hotelRating: 5,
      location: 'Meloneras, Gran Canaria',
      includes: [
        '3 noches en villa con piscina privada',
        'Pensión completa gourmet',
        'Transfers en Tesla Model S',
        'Visita 8 propiedades exclusivas',
        'Experiencia gastronómica canaria',
        'Golf en campo championship'
      ],
      highlights: [
        'Penthouses en primera línea',
        'Villas en Las Palmas Golf',
        'Apartamentos de inversión',
        'Proyecto obra nueva exclusivo'
      ],
      propertyVisits: 8,
      exclusiveAccess: true
    },
    {
      id: 'lanzarote-unique',
      title: 'Lanzarote Unique Experience',
      subtitle: 'Arquitectura volcánica y propiedades singulares',
      duration: '3 noches',
      maxGuests: 2,
      price: 0,
      originalPrice: 750,
      image: '/placeholder.svg',
      hotelName: 'Princesa Yaiza Suite Hotel Resort',
      hotelRating: 5,
      location: 'Playa Blanca, Lanzarote',
      includes: [
        '3 noches en suite ocean view',
        'Media pensión gastronómica',
        'Transporte privado',
        'Tour 5 propiedades únicas',
        'Visita Jameos del Agua VIP',
        'Cata de vinos volcánicos'
      ],
      highlights: [
        'Casas tradicionales restauradas',
        'Villas con arquitectura César Manrique',
        'Apartamentos frente al mar',
        'Proyectos eco-sostenibles'
      ],
      propertyVisits: 5,
      exclusiveAccess: false
    }
  ];

  const benefits = [
    {
      icon: Euro,
      title: 'Completamente Gratis',
      description: 'Para clientes interesados en propiedades premium +€1M'
    },
    {
      icon: Building,
      title: 'Acceso Exclusivo',
      description: 'Propiedades no disponibles en portales públicos'
    },
    {
      icon: Users,
      title: 'Asesor Personal',
      description: 'Experto inmobiliario local te acompaña'
    },
    {
      icon: Calendar,
      title: 'Flexibilidad Total',
      description: 'Fechas adaptadas a tu disponibilidad'
    }
  ];

  const testimonials = [
    {
      name: 'Hans Mueller',
      country: 'Alemania',
      image: '/placeholder.svg',
      rating: 5,
      comment: 'Increíble experiencia. En 3 días visitamos 6 propiedades espectaculares y compramos nuestra villa de ensueño. El servicio fue impecable.',
      propertyBought: 'Villa Ocean View - €1.8M'
    },
    {
      name: 'Sophie Dubois',
      country: 'Francia',
      image: '/placeholder.svg',
      rating: 5,
      comment: 'El programa superó todas nuestras expectativas. Las propiedades eran exclusivas y el hotel de primera clase. Volveremos para la segunda residencia.',
      propertyBought: 'Penthouse Marina - €1.2M'
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-3 shadow-lg shadow-pink-500/30">
            <Plane className="w-full h-full text-white" />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Visita Canarias
              </span>
            </h2>
            <p className="text-pink-400 font-medium">con BlueEyeHomes</p>
          </div>
        </div>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Explora propiedades premium mientras disfrutas de unas vacaciones de lujo. 
          <span className="text-pink-400 font-bold"> 3 noches completamente gratis</span> para clientes interesados en propiedades exclusivas.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="glass-card p-6 rounded-2xl text-center border border-pink-500/20">
              <IconComponent className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/70 text-sm">{benefit.description}</p>
            </div>
          );
        })}
      </div>

      {/* Tourism Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {tourismPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
              selectedPackage === pkg.id 
                ? 'border-pink-500 shadow-2xl shadow-pink-500/20 scale-105' 
                : 'border-white/10 hover:border-pink-500/50'
            }`}
            onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
          >
            <div className="relative">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <div className="bg-pink-500/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                  GRATIS - Valor €{pkg.originalPrice}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {pkg.exclusiveAccess && (
                  <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    Acceso Exclusivo
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card p-3 rounded-lg backdrop-blur-md">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-pink-400" />
                    <span className="text-white font-medium text-sm">{pkg.hotelName}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(pkg.hotelRating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-white/70 text-xs ml-2">{pkg.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
              <p className="text-white/70 text-sm mb-4">{pkg.subtitle}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-sm">{pkg.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-sm">Hasta {pkg.maxGuests}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-sm">{pkg.propertyVisits} propiedades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-sm">Todo incluido</span>
                </div>
              </div>

              {selectedPackage === pkg.id && (
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Incluye:</h4>
                    <div className="space-y-1">
                      {pkg.includes.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Propiedades destacadas:</h4>
                    <div className="space-y-1">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Building className="w-3 h-3 text-pink-400" />
                          <span className="text-white/80 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button className="w-full btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Reservar Viaje de Exploración
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Experiencias Reales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl border border-purple-500/20">
              <div className="flex items-start space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <span className="text-white/60 text-sm">({testimonial.country})</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm mb-3 italic">"{testimonial.comment}"</p>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs">
                    ✓ Compró: {testimonial.propertyBought}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-card p-8 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-600/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">¿Listo para tu Viaje de Exploración?</h3>
          <p className="text-white/70 mb-6">
            Contacta con nuestro equipo para personalizar tu experiencia. Disponemos de más opciones 
            exclusivas en Fuerteventura, La Palma y El Hierro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Llamar Ahora: +34 922 XXX XXX
            </button>
            <button className="btn-secondary border-purple-500 text-purple-400 hover:bg-purple-500/20 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              tourism@blueeyehomes.com
            </button>
          </div>

          <div className="mt-6 text-sm text-white/60">
            <p>* Oferta válida para clientes interesados en propiedades premium desde €1M</p>
            <p>** Sujeto a disponibilidad y confirmación de interés real de compra</p>
          </div>
        </div>
      </div>
    </section>
  );
}
