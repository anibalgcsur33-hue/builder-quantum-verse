import { useState } from "react";
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
  Building,
} from "lucide-react";

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
      id: "tenerife-luxury",
      title: "Exploración Tenerife Luxury",
      subtitle:
        "Descubre propiedades exclusivas mientras disfrutas del paraíso",
      duration: "3 noches",
      maxGuests: 2,
      price: 0, // Free with property interest
      originalPrice: 890,
      image: "/placeholder.svg",
      hotelName: "Hotel Botánico & Oriental Spa Garden",
      hotelRating: 5,
      location: "Puerto de la Cruz, Tenerife",
      includes: [
        "3 noches en suite premium",
        "Desayuno gourmet incluido",
        "Traslados VIP aeropuerto",
        "Tour privado 6 propiedades premium",
        "Cena en restaurante Michelin",
        "Acceso spa y wellness center",
      ],
      highlights: [
        "Villas con vista al Teide",
        "Propiedades frente al mar",
        "Áticos de lujo exclusivos",
        "Reunión con arquitectos locales",
      ],
      propertyVisits: 6,
      exclusiveAccess: true,
    },
    {
      id: "gran-canaria-explorer",
      title: "Gran Canaria Explorer VIP",
      subtitle: "Inversión inmobiliaria en el continente en miniatura",
      duration: "3 noches",
      maxGuests: 4,
      price: 0,
      originalPrice: 1240,
      image: "/placeholder.svg",
      hotelName: "Villa del Conde Resort & Thalasso",
      hotelRating: 5,
      location: "Meloneras, Gran Canaria",
      includes: [
        "3 noches en villa con piscina privada",
        "Pensión completa gourmet",
        "Transfers en Tesla Model S",
        "Visita 8 propiedades exclusivas",
        "Experiencia gastronómica canaria",
        "Golf en campo championship",
      ],
      highlights: [
        "Penthouses en primera línea",
        "Villas en Las Palmas Golf",
        "Apartamentos de inversión",
        "Proyecto obra nueva exclusivo",
      ],
      propertyVisits: 8,
      exclusiveAccess: true,
    },
    {
      id: "lanzarote-unique",
      title: "Lanzarote Unique Experience",
      subtitle: "Arquitectura volcánica y propiedades singulares",
      duration: "3 noches",
      maxGuests: 2,
      price: 0,
      originalPrice: 750,
      image: "/placeholder.svg",
      hotelName: "Princesa Yaiza Suite Hotel Resort",
      hotelRating: 5,
      location: "Playa Blanca, Lanzarote",
      includes: [
        "3 noches en suite ocean view",
        "Media pensión gastronómica",
        "Transporte privado",
        "Tour 5 propiedades únicas",
        "Visita Jameos del Agua VIP",
        "Cata de vinos volcánicos",
      ],
      highlights: [
        "Casas tradicionales restauradas",
        "Villas con arquitectura César Manrique",
        "Apartamentos frente al mar",
        "Proyectos eco-sostenibles",
      ],
      propertyVisits: 5,
      exclusiveAccess: false,
    },
  ];

  const benefits = [
    {
      icon: Euro,
      title: "Completamente Gratis",
      description: "Para clientes interesados en propiedades premium +€1M",
    },
    {
      icon: Building,
      title: "Acceso Exclusivo",
      description: "Propiedades no disponibles en portales públicos",
    },
    {
      icon: Users,
      title: "Asesor Personal",
      description: "Experto inmobiliario local te acompaña",
    },
    {
      icon: Calendar,
      title: "Flexibilidad Total",
      description: "Fechas adaptadas a tu disponibilidad",
    },
  ];

  const testimonials = [
    {
      name: "Hans Mueller",
      country: "Alemania",
      image: "/placeholder.svg",
      rating: 5,
      comment:
        "Increíble experiencia. En 3 días visitamos 6 propiedades espectaculares y compramos nuestra villa de ensueño. El servicio fue impecable.",
      propertyBought: "Villa Ocean View - €1.8M",
    },
    {
      name: "Sophie Dubois",
      country: "Francia",
      image: "/placeholder.svg",
      rating: 5,
      comment:
        "El programa superó todas nuestras expectativas. Las propiedades eran exclusivas y el hotel de primera clase. Volveremos para la segunda residencia.",
      propertyBought: "Penthouse Marina - €1.2M",
    },
  ];

  return (
    <section className="mb-20">
      {/* Enhanced Hero Section with Prominent Offer */}
      <div className="glass-card p-8 lg:p-12 rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-600/20 mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4 shadow-2xl shadow-pink-500/40 animate-pulse">
              <Plane className="w-full h-full text-white" />
            </div>
            <div>
              <h2 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                  Visita Canarias
                </span>
              </h2>
              <p className="text-pink-400 font-bold text-xl">con BlueEyeHomes</p>
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-6 mb-6 shadow-2xl shadow-pink-500/30">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
              <h3 className="text-3xl lg:text-4xl font-black text-white">
                ¡OFERTA EXCLUSIVA!
              </h3>
              <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
            </div>
            <p className="text-xl lg:text-2xl text-white/95 font-bold mb-4">
              🏨 <span className="text-yellow-300">3 NOCHES DE HOTEL GRATIS</span> 🏨
            </p>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Para clientes interesados en propiedades premium +€1M.
              <span className="font-bold text-yellow-300"> Valor hasta €1,240</span>
            </p>
          </div>

          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Combina la búsqueda de tu propiedad ideal con unas vacaciones de lujo inolvidables.
            Hoteles 5 estrellas, tours privados y acceso exclusivo a propiedades no disponibles públicamente.
          </p>

          {/* Main CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-10 py-4 shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <span className="font-bold">Reserva tu Viaje de Exploración</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="text-center">
              <p className="text-pink-400 font-medium">📞 Consulta inmediata</p>
              <p className="text-white/70 text-sm">+34 922 XXX XXX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl text-center border border-pink-500/20"
            >
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
                ? "border-pink-500 shadow-2xl shadow-pink-500/20 scale-105"
                : "border-white/10 hover:border-pink-500/50"
            }`}
            onClick={() =>
              setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)
            }
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
                    <span className="text-white font-medium text-sm">
                      {pkg.hotelName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(pkg.hotelRating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-white/70 text-xs ml-2">
                      {pkg.location}
                    </span>
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
                  <span className="text-white text-sm">
                    Hasta {pkg.maxGuests}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-sm">
                    {pkg.propertyVisits} propiedades
                  </span>
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
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">
                      Propiedades destacadas:
                    </h4>
                    <div className="space-y-1">
                      {pkg.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Building className="w-3 h-3 text-pink-400" />
                          <span className="text-white/80 text-sm">
                            {highlight}
                          </span>
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
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Experiencias Reales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl border border-purple-500/20"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <span className="text-white/60 text-sm">
                      ({testimonial.country})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm mb-3 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs">
                    ✓ Compró: {testimonial.propertyBought}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="glass-card p-10 rounded-3xl border border-pink-500/40 bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-600/20 text-center shadow-2xl shadow-pink-500/20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            <h3 className="text-3xl font-bold text-white">
              ¿Listo para tu Viaje de Exploración?
            </h3>
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>

          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Nuestro equipo de turismo premium está listo para crear tu experiencia personalizada.
            <span className="text-pink-400 font-bold"> Disponemos de opciones exclusivas</span> en
            Fuerteventura, La Palma y El Hierro.
          </p>

          {/* Prominent Booking Button */}
          <div className="mb-8">
            <button className="btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xl px-12 py-5 shadow-2xl shadow-pink-500/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              <Calendar className="w-7 h-7" />
              <span className="font-bold">Reserva tu Viaje de Exploración</span>
              <Plane className="w-7 h-7" />
            </button>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl border border-pink-400/20">
              <Phone className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Llamada Inmediata</h4>
              <p className="text-pink-400 font-bold text-lg">+34 922 XXX XXX</p>
              <p className="text-white/60 text-sm mt-1">Lun-Dom 8:00-22:00</p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-purple-400/20">
              <Mail className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Consulta por Email</h4>
              <p className="text-purple-400 font-bold">tourism@blueeyehomes.com</p>
              <p className="text-white/60 text-sm mt-1">Respuesta en 2h</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/70 text-sm">Sin compromiso</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/70 text-sm">Cancelación flexible</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/70 text-sm">Totalmente gratuito</span>
            </div>
          </div>

          <div className="text-sm text-white/60 space-y-1">
            <p>
              * Oferta válida para clientes interesados en propiedades premium desde €1M
            </p>
            <p>
              ** Sujeto a disponibilidad y confirmación de interés real de compra
            </p>
            <p>
              *** Programa exclusivo limitado a 50 clientes por trimestre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
