import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  MapPin,
  Euro,
  Star,
  Image,
  Video,
  Globe,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
} from "lucide-react";

export default function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState("properties");
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  // Sample agency data
  const agencyInfo = {
    name: "Inmobiliaria Atlántico Premium",
    license: "API-2024-001234",
    properties: 47,
    totalViews: 15420,
    totalLeads: 234,
    rating: 4.8,
    reviews: 156,
  };

  const properties = [
    {
      id: 1,
      title: "Villa Moderna Oceanfront",
      location: "Costa Adeje, Tenerife",
      price: 1250000,
      type: "Villa",
      status: "Activo",
      views: 1247,
      leads: 23,
      vrTour: true,
      images: 15,
      featured: true,
      published: "2024-01-15",
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      title: "Penthouse Marina Exclusive",
      location: "Las Palmas, Gran Canaria",
      price: 850000,
      type: "Penthouse",
      status: "Reservado",
      views: 892,
      leads: 18,
      vrTour: true,
      images: 12,
      featured: false,
      published: "2024-01-10",
      lastUpdated: "2024-01-22",
    },
    {
      id: 3,
      title: "Casa Rural con Viñedo",
      location: "La Geria, Lanzarote",
      price: 680000,
      type: "Casa Rural",
      status: "Borrador",
      views: 0,
      leads: 0,
      vrTour: false,
      images: 8,
      featured: false,
      published: null,
      lastUpdated: "2024-01-23",
    },
  ];

  const stats = [
    {
      label: "Propiedades activas",
      value: 34,
      icon: Building,
      color: "text-neon-teal",
      change: "+12%",
    },
    {
      label: "Visualizaciones totales",
      value: 15420,
      icon: Eye,
      color: "text-neon-emerald",
      change: "+28%",
    },
    {
      label: "Leads generados",
      value: 234,
      icon: Users,
      color: "text-neon-teal",
      change: "+15%",
    },
    {
      label: "Ingresos estimados",
      value: "€2.1M",
      icon: Euro,
      color: "text-neon-emerald",
      change: "+22%",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "new_lead",
      message: "Nuevo lead para Villa Moderna Oceanfront",
      time: "2024-01-23T14:30:00",
      propertyId: 1,
    },
    {
      id: 2,
      type: "property_viewed",
      message: "Penthouse Marina Exclusive vista 15 veces",
      time: "2024-01-23T10:15:00",
      propertyId: 2,
    },
    {
      id: 3,
      type: "vr_tour_completed",
      message: "Tour VR completado en Villa Moderna",
      time: "2024-01-22T16:45:00",
      propertyId: 1,
    },
  ];

  const tabs = [
    { id: "properties", label: "Mis Propiedades", icon: Building },
    { id: "analytics", label: "Analíticas", icon: BarChart3 },
    { id: "leads", label: "Leads", icon: Users },
    { id: "calendar", label: "Calendario", icon: Calendar },
  ];

  const handleSelectProperty = (propertyId: number) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId],
    );
  };

  const handleSelectAll = () => {
    setSelectedProperties(
      selectedProperties.length === properties.length
        ? []
        : properties.map((p) => p.id),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "text-neon-emerald bg-neon-emerald/20";
      case "Reservado":
        return "text-yellow-400 bg-yellow-400/20";
      case "Borrador":
        return "text-white/60 bg-white/10";
      default:
        return "text-white/60 bg-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Panel de Gestión
            </h1>
            <div className="flex items-center gap-4 text-white/70">
              <span>{agencyInfo.name}</span>
              <span>•</span>
              <span>Licencia: {agencyInfo.license}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/agency/property/new"
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Nueva Propiedad
            </Link>
            <button className="btn-secondary flex items-center gap-2">
              <Download size={20} />
              Exportar
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="glass-card p-6 hover-glow-teal transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <IconComponent
                      className={`${stat.color} group-hover:scale-110 transition-transform`}
                      size={24}
                    />
                  </motion.div>
                  <span className="text-neon-emerald text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left">
                  {typeof stat.value === "number" ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Agency Rating */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-teal mb-1">
                  <CountUp end={agencyInfo.rating} duration={2} decimals={1} />
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-neon-teal fill-current"
                      size={16}
                    />
                  ))}
                </div>
                <div className="text-white/60 text-sm">
                  {agencyInfo.reviews} reseñas
                </div>
              </div>
              <div className="border-l border-white/10 pl-6">
                <h3 className="font-bold mb-2">Rendimiento de la agencia</h3>
                <p className="text-white/70 text-sm">
                  Tu agencia está posicionada en el top 10% de inmobiliarias en
                  Canarias
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <TrendingUp size={18} />
                Ver Informe
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 glass-card p-2 rounded-xl">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-neon-teal text-blue-dark font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComponent size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "properties" && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Buscar propiedades..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                    />
                  </div>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal">
                    <option value="">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="reservado">Reservado</option>
                    <option value="borrador">Borrador</option>
                  </select>
                </div>

                {selectedProperties.length > 0 && (
                  <div className="flex gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                      <Globe size={18} />
                      Publicar en portales ({selectedProperties.length})
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                      <Edit size={18} />
                      Editar masivo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Properties Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    Mis Propiedades ({properties.length})
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProperties.length === properties.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                    />
                    <span className="text-sm text-white/70">
                      Seleccionar todas
                    </span>
                  </label>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-4">Propiedad</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Precio</th>
                      <th className="text-left p-4">Rendimiento</th>
                      <th className="text-left p-4">Medios</th>
                      <th className="text-left p-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr
                        key={property.id}
                        className="border-t border-white/10 hover:bg-white/5"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={selectedProperties.includes(property.id)}
                              onChange={() => handleSelectProperty(property.id)}
                              className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                            />
                            <div>
                              <h3 className="font-medium">{property.title}</h3>
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <MapPin size={14} />
                                <span>{property.location}</span>
                                <span>•</span>
                                <span>{property.type}</span>
                                {property.featured && (
                                  <>
                                    <span>•</span>
                                    <Star
                                      className="text-neon-teal fill-current"
                                      size={14}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}
                          >
                            {property.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-neon-teal">
                            €{property.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1 mb-1">
                              <Eye size={14} />
                              <span>{property.views} vistas</span>
                            </div>
                            <div className="flex items-center gap-1 text-neon-emerald">
                              <Users size={14} />
                              <span>{property.leads} leads</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Image size={14} />
                              <span>{property.images}</span>
                            </div>
                            {property.vrTour && (
                              <div className="flex items-center gap-1 text-neon-teal">
                                <Video size={14} />
                                <span>VR</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/property/${property.id}`}
                              className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                              title="Ver propiedad"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              to={`/agency/property/${property.id}/edit`}
                              className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                              title="Más opciones"
                            >
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6">Rendimiento Mensual</h3>
              <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/60">
                  <BarChart3 size={48} className="mx-auto mb-4" />
                  <p>Gráfico de rendimiento</p>
                  <p className="text-sm">Vistas, leads y conversiones</p>
                </div>
              </div>
            </div>

            {/* Top Properties */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6">Propiedades Más Vistas</h3>
              <div className="space-y-4">
                {properties.slice(0, 3).map((property, index) => (
                  <div
                    key={property.id}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-neon-teal/20 rounded-full flex items-center justify-center text-neon-teal font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{property.title}</h4>
                      <p className="text-white/60 text-sm">
                        {property.views} vistas • {property.leads} leads
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-neon-teal font-bold">
                        €{property.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-xl lg:col-span-2">
              <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-neon-teal rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white/90">{activity.message}</p>
                      <p className="text-white/60 text-sm">
                        {new Date(activity.time).toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Gestión de Leads</h2>
            <div className="text-center py-16">
              <Users className="mx-auto mb-4 text-white/40" size={64} />
              <h3 className="text-xl font-bold mb-2">Sistema de Leads</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Aquí podrás gestionar todos los leads generados por tus
                propiedades, seguir su estado y establecer comunicación directa.
              </p>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Calendario de Visitas</h2>
            <div className="text-center py-16">
              <Calendar className="mx-auto mb-4 text-white/40" size={64} />
              <h3 className="text-xl font-bold mb-2">Calendario Integrado</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Gestiona visitas presenciales y virtuales, programa citas con
                clientes y mantén tu agenda organizada.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
