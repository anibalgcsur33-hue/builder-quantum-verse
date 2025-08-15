import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
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
  Calculator,
  Home,
  Car,
  Heart,
  Zap
} from 'lucide-react';

export default function Seguros() {
  const [selectedType, setSelectedType] = useState('all');

  const insuranceTypes = [
    { id: 'all', label: 'Todos los seguros', count: 12 },
    { id: 'hogar', label: 'Seguro de hogar', count: 4 },
    { id: 'vida', label: 'Seguro de vida', count: 3 },
    { id: 'comunidades', label: 'Comunidades', count: 2 },
    { id: 'responsabilidad', label: 'Responsabilidad civil', count: 3 }
  ];

  const companies = [
    {
      id: 1,
      name: 'Seguros Canarias Premium',
      specialization: 'Seguros de hogar y vida para propiedades de lujo',
      rating: 4.9,
      reviews: 284,
      responseTime: '1 hora',
      coverage: ['Hogar', 'Vida', 'Responsabilidad Civil'],
      features: [
        'Cobertura hasta €5M',
        'Peritaje 24h',
        'Franquicia €0',
        'Asistencia legal incluida'
      ],
      discounts: [
        '20% descuento clientes BlueEyeHomes',
        '15% descuento múltiples pólizas',
        'Sin carencias'
      ],
      contact: {
        phone: '+34 922 888 999',
        email: 'premium@seguroscanarias.com'
      },
      verified: true,
      logo: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Atlántico Seguros Integrales',
      specialization: 'Seguros para comunidades y administradores',
      rating: 4.7,
      reviews: 156,
      responseTime: '2 horas',
      coverage: ['Comunidades', 'Responsabilidad Civil', 'Multirriesgo'],
      features: [
        'Gestión digital completa',
        'Cobertura daños por agua',
        'Responsabilidad administrador',
        'Asistencia técnica 24h'
      ],
      discounts: [
        '25% descuento nuevas comunidades',
        'Gestión gratuita primer año',
        'Peritaje sin coste'
      ],
      contact: {
        phone: '+34 928 777 888',
        email: 'comunidades@atlanticoseguros.com'
      },
      verified: true,
      logo: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'VidaSecure Canarias',
      specialization: 'Seguros de vida y ahorro vinculados a hipotecas',
      rating: 4.8,
      reviews: 97,
      responseTime: '30 minutos',
      coverage: ['Vida', 'Ahorro', 'Inversión'],
      features: [
        'Vinculación hipotecaria',
        'Planes de ahorro',
        'Cobertura internacional',
        'Gestión online'
      ],
      discounts: [
        '30% descuento primer año',
        'Sin revisión médica hasta €300k',
        'Bonificación sin siniestros'
      ],
      contact: {
        phone: '+34 922 666 777',
        email: 'info@vidasecure.com'
      },
      verified: true,
      logo: '/placeholder.svg'
    }
  ];

  const filteredCompanies = companies.filter(company => {
    if (selectedType === 'all') return true;
    return company.coverage.some(coverage => 
      coverage.toLowerCase().includes(selectedType) ||
      (selectedType === 'hogar' && coverage === 'Hogar') ||
      (selectedType === 'vida' && coverage === 'Vida') ||
      (selectedType === 'comunidades' && coverage === 'Comunidades') ||
      (selectedType === 'responsabilidad' && coverage.includes('Responsabilidad'))
    );
  });

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="text-neon-teal" size={48} />
            <h1 className="heading-lg text-gradient">
              Marketplace de Seguros
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Protege tu inversión inmobiliaria con seguros especializados. 
            Compañías de confianza con condiciones exclusivas para clientes BlueEyeHomes.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Shield className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">12</div>
            <div className="text-white/60 text-sm">Compañías verificadas</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <CheckCircle className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">€5M</div>
            <div className="text-white/60 text-sm">Cobertura máxima</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Clock className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">24h</div>
            <div className="text-white/60 text-sm">Asistencia disponible</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Euro className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">30%</div>
            <div className="text-white/60 text-sm">Descuento máximo</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Buscar tipo de seguro o compañía..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Calculator size={20} />
              Calcular prima
            </button>
          </div>
        </div>

        {/* Insurance Types */}
        <div className="flex flex-wrap gap-3 mb-8">
          {insuranceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedType === type.id
                  ? 'bg-neon-teal text-blue-dark font-semibold'
                  : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {type.label} ({type.count})
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="space-y-8 mb-16">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="glass-card p-8 rounded-xl hover-glow-teal">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Company Logo */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <div className="flex items-center gap-1 text-neon-teal mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{company.rating}</span>
                    <span className="text-white/60 text-sm">({company.reviews})</span>
                  </div>
                  {company.verified && (
                    <div className="flex items-center gap-1 text-neon-emerald text-sm">
                      <CheckCircle size={16} />
                      <span>Verificado</span>
                    </div>
                  )}
                </div>

                {/* Company Info */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
                    <p className="text-white/70 mb-4">{company.specialization}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Coverage */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Shield className="text-neon-teal" size={20} />
                          Coberturas disponibles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {company.coverage.map((coverage, index) => (
                            <span
                              key={index}
                              className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm"
                            >
                              {coverage}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Response Time */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Clock className="text-neon-emerald" size={20} />
                          Tiempo de respuesta
                        </h4>
                        <div className="text-neon-emerald font-semibold text-lg">
                          {company.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-bold mb-3">Características principales:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {company.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="text-neon-teal flex-shrink-0" size={16} />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discounts */}
                  <div>
                    <h4 className="font-bold mb-3 text-neon-emerald">Ofertas exclusivas:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {company.discounts.map((discount, index) => (
                        <div key={index} className="glass-card p-3 rounded-lg text-center">
                          <div className="text-neon-emerald font-semibold text-sm">
                            {discount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary flex items-center justify-center gap-2">
                      <Calculator size={20} />
                      Solicitar cotización
                    </button>
                    <a
                      href={`tel:${company.contact.phone}`}
                      className="btn-secondary flex items-center justify-center gap-2"
                    >
                      <Phone size={20} />
                      {company.contact.phone}
                    </a>
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="glass-card px-6 py-3 rounded-lg hover-glow-teal flex items-center justify-center gap-2"
                    >
                      <Mail size={20} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance Calculator */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Calculadora de Seguros
            </h2>
            <p className="text-white/70">
              Obtén una estimación personalizada para tu propiedad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-white/70 mb-2">Tipo de propiedad</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal">
                <option value="">Seleccionar</option>
                <option value="villa">Villa</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-2">Valor de la propiedad</label>
              <input
                type="number"
                placeholder="€"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-2">Ubicación</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal">
                <option value="">Seleccionar isla</option>
                <option value="tenerife">Tenerife</option>
                <option value="gran-canaria">Gran Canaria</option>
                <option value="lanzarote">Lanzarote</option>
                <option value="fuerteventura">Fuerteventura</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-2">Tipo de seguro</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal">
                <option value="">Seleccionar</option>
                <option value="hogar">Hogar</option>
                <option value="vida">Vida</option>
                <option value="responsabilidad">Responsabilidad Civil</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-8 py-4">
              <Calculator className="mr-3" size={24} />
              Calcular Prima Estimada
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            ¿Representas una compañía de seguros?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Únete a nuestro marketplace y ofrece productos especializados 
            para propietarios de inmuebles de lujo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Registrar compañía
            </button>
            <Link to="/marketplace" className="btn-secondary">
              Ver otros servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
