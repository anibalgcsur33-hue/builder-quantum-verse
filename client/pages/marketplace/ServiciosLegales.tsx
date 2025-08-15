import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Star,
  Phone,
  Mail,
  Euro,
  CheckCircle,
  ArrowRight,
  Search,
  Award,
  Clock,
  FileText,
  Gavel,
  Shield,
  BookOpen,
  Users,
  Building,
  Calendar,
} from "lucide-react";

export default function ServiciosLegales() {
  const [selectedService, setSelectedService] = useState("all");

  const legalServices = [
    { id: "all", label: "Todos los servicios", count: 34 },
    { id: "inmobiliario", label: "Derecho inmobiliario", count: 12 },
    { id: "fiscal", label: "Asesoría fiscal", count: 8 },
    { id: "notarial", label: "Servicios notariales", count: 6 },
    { id: "internacional", label: "Derecho internacional", count: 8 },
  ];

  const lawFirms = [
    {
      id: 1,
      name: "Bufete Canarias Legal Partners",
      specialization: "Derecho inmobiliario y fiscal internacional",
      rating: 4.9,
      reviews: 187,
      experience: "25 años",
      languages: ["Español", "Inglés", "Alemán", "Francés"],
      services: [
        "Compraventa inmobiliaria",
        "Asesoría fiscal internacional",
        "Gestión notarial",
        "Due diligence",
        "Contratos de arrendamiento",
      ],
      specialties: [
        "Residentes extranjeros",
        "Inversión internacional",
        "Golden Visa",
        "Tributación no residentes",
      ],
      team: 15,
      hourlyRate: 180,
      fixedFees: {
        "Compraventa hasta €500k": 1500,
        "Compraventa €500k-1M": 2500,
        "Gestión Golden Visa": 3500,
      },
      contact: {
        phone: "+34 922 123 456",
        email: "info@canariaslegapartners.com",
        address: "Av. Tres de Mayo, 71, Santa Cruz de Tenerife",
      },
      certifications: [
        "Colegio Abogados Tenerife",
        "AIJA Member",
        "IBA Member",
      ],
      responseTime: "2 horas",
      verified: true,
      logo: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Notaría García-Mendoza",
      specialization: "Servicios notariales especializados en inmobiliario",
      rating: 4.8,
      reviews: 342,
      experience: "30 años",
      languages: ["Español", "Inglés"],
      services: [
        "Escrituras de compraventa",
        "Poderes notariales",
        "Constitución sociedades",
        "Testamentos",
        "Capitulaciones matrimoniales",
      ],
      specialties: [
        "Firma digital certificada",
        "Videoconferencia notarial",
        "Servicio urgente 24h",
        "Traducción jurada",
      ],
      team: 8,
      hourlyRate: 120,
      fixedFees: {
        "Escritura compraventa": 800,
        "Poder notarial": 150,
        "Constitución SL": 600,
      },
      contact: {
        phone: "+34 928 234 567",
        email: "notaria@garcia-mendoza.com",
        address: "C/ León y Castillo, 123, Las Palmas de Gran Canaria",
      },
      certifications: ["Notario Colegiado", "Firma Digital Certificada"],
      responseTime: "1 hora",
      verified: true,
      logo: "/placeholder.svg",
    },
    {
      id: 3,
      name: "TaxAdvice Canarias",
      specialization: "Asesoría fiscal para inversores inmobiliarios",
      rating: 4.7,
      reviews: 98,
      experience: "15 años",
      languages: ["Español", "Inglés", "Alemán"],
      services: [
        "Declaración IRPF",
        "Asesoría fiscal inmobiliaria",
        "Planificación tributaria",
        "Gestión modelo 720",
        "Optimización fiscal",
      ],
      specialties: [
        "Residencia fiscal española",
        "Tributación inversión extranjera",
        "Beckham Law",
        "Régimen ZEC Canarias",
      ],
      team: 6,
      hourlyRate: 150,
      fixedFees: {
        "IRPF no residente": 350,
        "Planificación tributaria": 800,
        "Gestión residencia fiscal": 1200,
      },
      contact: {
        phone: "+34 922 345 678",
        email: "info@taxadvicecanarias.com",
        address: "C/ Méndez Núñez, 45, Santa Cruz de Tenerife",
      },
      certifications: ["AEAT Colaborador", "ICAC Registrado"],
      responseTime: "4 horas",
      verified: true,
      logo: "/placeholder.svg",
    },
  ];

  const filteredFirms = lawFirms.filter((firm) => {
    if (selectedService === "all") return true;
    return firm.services.some(
      (service) =>
        (selectedService === "inmobiliario" &&
          service.toLowerCase().includes("inmobiliario")) ||
        (selectedService === "fiscal" &&
          service.toLowerCase().includes("fiscal")) ||
        (selectedService === "notarial" &&
          firm.name.toLowerCase().includes("notaría")) ||
        (selectedService === "internacional" &&
          firm.specialization.toLowerCase().includes("internacional")),
    );
  });

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scale className="text-neon-teal" size={48} />
            <h1 className="heading-lg text-gradient">
              Servicios Legales Especializados
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Profesionales del derecho especializados en transacciones
            inmobiliarias internacionales. Asesoramiento legal completo para tu
            inversión en Canarias.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Scale className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">34</div>
            <div className="text-white/60 text-sm">
              Profesionales verificados
            </div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Award className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">25+</div>
            <div className="text-white/60 text-sm">Años experiencia media</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-teal">
            <CheckCircle className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-white/60 text-sm">Casos completados</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Clock className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">2h</div>
            <div className="text-white/60 text-sm">Respuesta promedio</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar servicio legal o profesional..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal">
              <option value="">Ubicación</option>
              <option value="santa-cruz">Santa Cruz de Tenerife</option>
              <option value="las-palmas">Las Palmas de Gran Canaria</option>
              <option value="arrecife">Arrecife, Lanzarote</option>
            </select>
            <button className="btn-primary flex items-center gap-2">
              <Calendar size={20} />
              Solicitar cita
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {legalServices.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedService === service.id
                  ? "bg-neon-teal text-blue-dark font-semibold"
                  : "glass-card text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {service.label} ({service.count})
            </button>
          ))}
        </div>

        {/* Law Firms Grid */}
        <div className="space-y-8 mb-16">
          {filteredFirms.map((firm) => (
            <div
              key={firm.id}
              className="glass-card p-8 rounded-xl hover-glow-teal"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Firm Logo and Basic Info */}
                <div className="text-center">
                  <img
                    src={firm.logo}
                    alt={firm.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <div className="flex items-center justify-center gap-1 text-neon-teal mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{firm.rating}</span>
                    <span className="text-white/60 text-sm">
                      ({firm.reviews})
                    </span>
                  </div>
                  <div className="text-white/60 text-sm mb-2">
                    {firm.experience} experiencia
                  </div>
                  {firm.verified && (
                    <div className="flex items-center justify-center gap-1 text-neon-emerald text-sm">
                      <CheckCircle size={16} />
                      <span>Verificado</span>
                    </div>
                  )}
                </div>

                {/* Firm Details */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{firm.name}</h3>
                    <p className="text-white/70 mb-4">{firm.specialization}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Team and Response */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="text-neon-teal" size={20} />
                          <span className="text-white/80">
                            Equipo: {firm.team} profesionales
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-neon-emerald" size={20} />
                          <span className="text-white/80">
                            Respuesta en: {firm.responseTime}
                          </span>
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                          <BookOpen className="text-neon-teal" size={18} />
                          Idiomas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {firm.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-neon-teal/20 text-neon-teal px-2 py-1 rounded text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <FileText className="text-neon-emerald" size={20} />
                      Servicios principales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {firm.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle
                            className="text-neon-emerald flex-shrink-0"
                            size={16}
                          />
                          <span className="text-white/80 text-sm">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Award className="text-neon-teal" size={20} />
                      Especializaciones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {firm.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-neon-emerald/20 text-neon-emerald px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Euro className="text-neon-teal" size={20} />
                      Tarifas (€/hora: {firm.hourlyRate})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(firm.fixedFees).map(
                        ([service, price], index) => (
                          <div
                            key={index}
                            className="glass-card p-4 rounded-lg"
                          >
                            <div className="text-sm text-white/60 mb-1">
                              {service}
                            </div>
                            <div className="text-neon-teal font-bold">
                              €{price}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="font-bold mb-3">Certificaciones:</h4>
                    <div className="flex flex-wrap gap-2">
                      {firm.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="btn-primary flex items-center justify-center gap-2">
                      <Calendar size={18} />
                      Consulta gratuita
                    </button>
                    <a
                      href={`tel:${firm.contact.phone}`}
                      className="btn-secondary flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />
                      Llamar
                    </a>
                    <a
                      href={`mailto:${firm.contact.email}`}
                      className="glass-card px-4 py-3 rounded-lg hover-glow-teal flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      Email
                    </a>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/60">
                      <div>
                        <strong>Teléfono:</strong> {firm.contact.phone}
                      </div>
                      <div>
                        <strong>Email:</strong> {firm.contact.email}
                      </div>
                      <div className="md:col-span-2">
                        <strong>Dirección:</strong> {firm.contact.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Resources */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Recursos Legales Gratuitos
            </h2>
            <p className="text-white/70">
              Guías y documentos útiles para tu proceso de compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 hover-glow-teal text-center">
              <FileText className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Guía Legal de Compra</h4>
              <p className="text-white/70 text-sm mb-4">
                Proceso completo de compraventa inmobiliaria en España
              </p>
              <button className="btn-secondary text-sm">Descargar PDF</button>
            </div>

            <div className="glass-card p-6 hover-glow-emerald text-center">
              <Gavel className="text-neon-emerald mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Checklist Legal</h4>
              <p className="text-white/70 text-sm mb-4">
                Documentos necesarios para compradores extranjeros
              </p>
              <button className="btn-secondary text-sm">Ver checklist</button>
            </div>

            <div className="glass-card p-6 hover-glow-teal text-center">
              <Scale className="text-neon-teal mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Calculadora Fiscal</h4>
              <p className="text-white/70 text-sm mb-4">
                Calcula impuestos y gastos asociados a tu compra
              </p>
              <button className="btn-secondary text-sm">Calcular</button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            ¿Eres un profesional del derecho?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Únete a nuestro marketplace legal y conecta con inversores
            internacionales que necesitan asesoramiento especializado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Registrar despacho</button>
            <Link to="/marketplace" className="btn-secondary">
              Ver otros servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
