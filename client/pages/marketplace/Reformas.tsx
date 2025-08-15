import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Euro, 
  CheckCircle, 
  ArrowRight,
  Filter,
  Search,
  Award,
  Users,
  Calendar,
  ImageIcon,
  Quote
} from 'lucide-react';

export default function Reformas() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');

  const categories = [
    { id: 'all', label: 'Todos los servicios', count: 67 },
    { id: 'cocinas', label: 'Cocinas', count: 23 },
    { id: 'banos', label: 'Baños', count: 19 },
    { id: 'integrales', label: 'Reformas integrales', count: 15 },
    { id: 'exteriores', label: 'Exteriores y jardines', count: 10 }
  ];

  const companies = [
    {
      id: 1,
      name: 'Reformas Canarias Pro',
      specialization: 'Reformas integrales de lujo',
      location: 'Tenerife',
      rating: 4.9,
      reviews: 127,
      priceRange: '€€€',
      certifications: ['ISO 9001', 'Garantía 5 años'],
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      description: 'Especialistas en reformas de alto standing con más de 15 años de experiencia en propiedades de lujo.',
      services: ['Reformas integrales', 'Cocinas de diseño', 'Baños premium', 'Domótica'],
      portfolio: [
        { title: 'Villa Costa Adeje', before: '/placeholder.svg', after: '/placeholder.svg' },
        { title: 'Penthouse Las Palmas', before: '/placeholder.svg', after: '/placeholder.svg' }
      ],
      contact: {
        phone: '+34 922 345 678',
        email: 'info@reformascanariaspro.com',
        website: 'www.reformascanariaspro.com'
      },
      responseTime: '2 horas',
      startingPrice: 25000,
      verified: true
    },
    {
      id: 2,
      name: 'Diseño & Obra Atlántico',
      specialization: 'Cocinas y baños modernos',
      location: 'Gran Canaria',
      rating: 4.7,
      reviews: 89,
      priceRange: '€€',
      certifications: ['Certificado AENOR', 'Eco-friendly'],
      images: ['/placeholder.svg', '/placeholder.svg'],
      description: 'Diseño contemporáneo y funcionalidad en cada proyecto. Especialistas en espacios modernos.',
      services: ['Cocinas modernas', 'Baños contemporáneos', 'Interiorismo', 'Reformas parciales'],
      portfolio: [
        { title: 'Apartamento Vegueta', before: '/placeholder.svg', after: '/placeholder.svg' }
      ],
      contact: {
        phone: '+34 928 456 789',
        email: 'contacto@disenoobra.com',
        website: 'www.disenoobra.com'
      },
      responseTime: '4 horas',
      startingPrice: 12000,
      verified: true
    },
    {
      id: 3,
      name: 'EcoReformas Sostenibles',
      specialization: 'Reformas ecológicas y sostenibles',
      location: 'Lanzarote',
      rating: 4.8,
      reviews: 56,
      priceRange: '€€',
      certifications: ['LEED Certified', 'Passivhaus'],
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      description: 'Reformas comprometidas con el medio ambiente utilizando materiales sostenibles y técnicas eficientes.',
      services: ['Eficiencia energética', 'Materiales sostenibles', 'Paneles solares', 'Aislamiento ecológico'],
      portfolio: [
        { title: 'Casa Rural Mancha Blanca', before: '/placeholder.svg', after: '/placeholder.svg' }
      ],
      contact: {
        phone: '+34 928 567 890',
        email: 'info@ecoreformas.com',
        website: 'www.ecoreformas.com'
      },
      responseTime: '6 horas',
      startingPrice: 18000,
      verified: true
    }
  ];

  const filteredCompanies = companies.filter(company => {
    if (selectedCategory !== 'all') {
      return company.services.some(service => 
        service.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory === 'integrales' && service.includes('integral') ||
        selectedCategory === 'cocinas' && service.includes('Cocinas') ||
        selectedCategory === 'banos' && service.includes('Baños') ||
        selectedCategory === 'exteriores' && (service.includes('jardín') || service.includes('exterior'))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Hammer className="text-neon-teal" size={48} />
            <h1 className="heading-lg text-gradient">
              Marketplace de Reformas
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Conecta con profesionales verificados para reformar tu nueva propiedad. 
            Empresas certificadas con experiencia en inmuebles de BlueEyeHomes.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Hammer className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">67</div>
            <div className="text-white/60 text-sm">Empresas verificadas</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <CheckCircle className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-white/60 text-sm">Reformas completadas</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-teal">
            <Star className="text-neon-teal mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="text-white/60 text-sm">Calificación promedio</div>
          </div>
          <div className="glass-card p-6 text-center hover-glow-emerald">
            <Euro className="text-neon-emerald mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold">15%</div>
            <div className="text-white/60 text-sm">Descuento exclusivo</div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Buscar empresa o servicio..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
              />
            </div>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
            >
              <option value="">Todas las islas</option>
              <option value="tenerife">Tenerife</option>
              <option value="gran-canaria">Gran Canaria</option>
              <option value="lanzarote">Lanzarote</option>
              <option value="fuerteventura">Fuerteventura</option>
            </select>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal"
            >
              <option value="">Rango de precio</option>
              <option value="€">€ - Económico</option>
              <option value="€€">€€ - Medio</option>
              <option value="€€€">€€€ - Premium</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-neon-teal text-blue-dark font-semibold'
                  : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="space-y-8 mb-16">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="glass-card p-8 rounded-xl hover-glow-teal">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Company Images */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {company.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${company.name} - Trabajo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  {company.images.length > 4 && (
                    <button className="w-full glass-card p-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Ver {company.images.length - 4} fotos más
                    </button>
                  )}
                </div>

                {/* Company Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{company.name}</h3>
                          {company.verified && (
                            <CheckCircle className="text-neon-emerald" size={24} />
                          )}
                        </div>
                        <p className="text-white/70 mb-2">{company.specialization}</p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="text-neon-teal" size={16} />
                            <span>{company.rating}</span>
                            <span>({company.reviews} reseñas)</span>
                          </div>
                          <span className="text-neon-emerald font-medium">{company.priceRange}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-neon-teal mb-1">
                          Desde €{company.startingPrice.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-sm">Precio orientativo</div>
                      </div>
                    </div>

                    <p className="text-white/80 mb-4">{company.description}</p>

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Servicios especializados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.services.map((service, index) => (
                          <span
                            key={index}
                            className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Certificaciones:</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="bg-neon-emerald/20 text-neon-emerald px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            <Award size={14} />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Clock className="text-neon-teal mx-auto mb-2" size={20} />
                        <div className="text-sm text-white/60">Respuesta en</div>
                        <div className="font-medium">{company.responseTime}</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Phone className="text-neon-emerald mx-auto mb-2" size={20} />
                        <div className="text-sm text-white/60">Teléfono</div>
                        <div className="font-medium text-sm">{company.contact.phone}</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Mail className="text-neon-teal mx-auto mb-2" size={20} />
                        <div className="text-sm text-white/60">Email</div>
                        <div className="font-medium text-sm">{company.contact.email}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="btn-primary flex items-center justify-center gap-2">
                        <Quote size={20} />
                        Solicitar presupuesto
                      </button>
                      <button className="btn-secondary flex items-center justify-center gap-2">
                        <ImageIcon size={20} />
                        Ver portfolio completo
                      </button>
                      <a
                        href={`tel:${company.contact.phone}`}
                        className="glass-card px-6 py-3 rounded-lg hover-glow-teal flex items-center justify-center gap-2"
                      >
                        <Phone size={20} />
                        Llamar ahora
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Preview */}
              {company.portfolio.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-bold mb-4">Proyectos destacados:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {company.portfolio.map((project, index) => (
                      <div key={index} className="glass-card p-4 rounded-lg">
                        <h5 className="font-medium mb-3">{project.title}</h5>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-sm text-white/60 mb-1">Antes</div>
                            <img
                              src={project.before}
                              alt={`${project.title} - Antes`}
                              className="w-full h-24 object-cover rounded"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-white/60 mb-1">Después</div>
                            <img
                              src={project.after}
                              alt={`${project.title} - Después`}
                              className="w-full h-24 object-cover rounded"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            ¿Eres una empresa de reformas?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Únete a nuestro marketplace y conecta con propietarios de BlueEyeHomes 
            que buscan servicios de reforma de calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Registrar mi empresa
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
