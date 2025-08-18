import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  User,
  Settings,
  Heart,
  Clock,
  MessageSquare,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  Save,
  X,
  Eye,
  Calendar,
  Award,
  TrendingUp,
  Bell,
  Shield,
  Camera,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    phone: "+34 622 123 456",
    location: "Madrid, España",
    bio: "Inversora inmobiliaria especializada en propiedades vacacionales en Canarias.",
    avatar: "/placeholder.svg",
    joinDate: "2024-01-15",
    verified: true,
  });

  const stats = [
    {
      label: "Propiedades favoritas",
      value: 24,
      icon: Heart,
      color: "text-neon-teal",
    },
    {
      label: "Tours VR realizados",
      value: 47,
      icon: Eye,
      color: "text-neon-emerald",
    },
    {
      label: "Mensajes en comunidad",
      value: 156,
      icon: MessageSquare,
      color: "text-neon-teal",
    },
    {
      label: "Tokens BlueEye",
      value: 1247,
      icon: Award,
      color: "text-neon-emerald",
    },
  ];

  const favoriteProperties = [
    {
      id: 1,
      title: "Villa Moderna Oceanfront",
      location: "Costa Adeje, Tenerife",
      price: 1250000,
      image: "/placeholder.svg",
      saved: "2024-01-20",
      status: "Disponible",
    },
    {
      id: 2,
      title: "Penthouse Marina Exclusive",
      location: "Las Palmas, Gran Canaria",
      price: 850000,
      image: "/placeholder.svg",
      saved: "2024-01-18",
      status: "Reservado",
    },
    {
      id: 3,
      title: "Casa Rural con Viñedo",
      location: "La Geria, Lanzarote",
      price: 680000,
      image: "/placeholder.svg",
      saved: "2024-01-15",
      status: "Disponible",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "property_view",
      title: "Visitó Villa Moderna Oceanfront",
      date: "2024-01-23T14:30:00",
      icon: Eye,
      color: "text-neon-teal",
    },
    {
      id: 2,
      type: "community_post",
      title: 'Comentó en "Inversión en Canarias 2024"',
      date: "2024-01-23T10:15:00",
      icon: MessageSquare,
      color: "text-neon-emerald",
    },
    {
      id: 3,
      type: "favorite_added",
      title: "Guardó Casa Rural con Viñedo",
      date: "2024-01-22T16:45:00",
      icon: Heart,
      color: "text-neon-teal",
    },
    {
      id: 4,
      type: "vr_tour",
      title: "Completó tour VR de Penthouse Marina",
      date: "2024-01-21T19:20:00",
      icon: Eye,
      color: "text-neon-emerald",
    },
  ];

  const communityParticipation = [
    {
      id: 1,
      title: "¿Conviene invertir en Lanzarote este año?",
      type: "forum_post",
      replies: 23,
      likes: 45,
      date: "2024-01-20",
      category: "Inversión",
    },
    {
      id: 2,
      title: "Mi experiencia comprando con BlueEyeHomes",
      type: "review",
      rating: 5,
      likes: 78,
      date: "2024-01-18",
      category: "Experiencias",
    },
    {
      id: 3,
      title: "Guía: Proceso de compra para no residentes",
      type: "guide",
      views: 1240,
      likes: 156,
      date: "2024-01-15",
      category: "Guías",
    },
  ];

  const tabs = [
    { id: "overview", label: "Resumen", icon: User },
    { id: "favorites", label: "Favoritos", icon: Heart },
    { id: "activity", label: "Actividad", icon: Clock },
    { id: "community", label: "Comunidad", icon: MessageSquare },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save the profile data
    console.log("Saving profile:", profileData);
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Profile Header */}
        <div className="glass-card p-8 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  src={profileData.avatar}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </button>
                {profileData.verified && (
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-neon-teal rounded-full flex items-center justify-center">
                    <Shield className="text-blue-dark" size={16} />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  {profileData.verified && (
                    <span className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm font-medium">
                      Verificado
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-white/60 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>
                      Miembro desde{" "}
                      {new Date(profileData.joinDate).toLocaleDateString(
                        "es-ES",
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-white/80 max-w-2xl">{profileData.bio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 ml-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save size={18} />
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Edit size={18} />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
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
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10"
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
                  className="text-center p-4 glass-card rounded-xl hover:glow-teal transition-all duration-300 group"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <IconComponent
                      className={`mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`}
                      size={24}
                    />
                  </motion.div>
                  <div className="text-2xl font-bold group-hover:scale-105 transition-transform">
                    <CountUp end={stat.value} duration={2} separator="," />
                  </div>
                  <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
        <div className="space-y-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity Preview */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="text-neon-teal" size={24} />
                  Actividad reciente
                </h3>
                <div className="space-y-4">
                  {recentActivity.slice(0, 3).map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                      >
                        <IconComponent className={activity.color} size={20} />
                        <div className="flex-1">
                          <p className="text-white/90">{activity.title}</p>
                          <p className="text-white/60 text-sm">
                            {new Date(activity.date).toLocaleDateString(
                              "es-ES",
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  to="#"
                  onClick={() => setActiveTab("activity")}
                  className="inline-flex items-center gap-2 text-neon-teal hover:text-neon-emerald transition-colors mt-4"
                >
                  Ver toda la actividad
                  <TrendingUp size={16} />
                </Link>
              </div>

              {/* Favorites Preview */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Heart className="text-neon-emerald" size={24} />
                  Propiedades favoritas
                </h3>
                <div className="space-y-4">
                  {favoriteProperties.slice(0, 2).map((property) => (
                    <div
                      key={property.id}
                      className="flex gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{property.title}</h4>
                        <p className="text-white/60 text-sm">
                          {property.location}
                        </p>
                        <p className="text-neon-teal font-bold">
                          €{property.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="#"
                  onClick={() => setActiveTab("favorites")}
                  className="inline-flex items-center gap-2 text-neon-teal hover:text-neon-emerald transition-colors mt-4"
                >
                  Ver todos los favoritos
                  <Heart size={16} />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Propiedades Favoritas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <div
                    key={property.id}
                    className="glass-card overflow-hidden hover-glow-teal group"
                  >
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            property.status === "Disponible"
                              ? "bg-neon-emerald/20 text-neon-emerald"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>
                      <button className="absolute top-4 left-4 w-8 h-8 bg-neon-teal/80 rounded-full flex items-center justify-center">
                        <Heart
                          className="text-blue-dark fill-current"
                          size={16}
                        />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold mb-2">{property.title}</h3>
                      <p className="text-white/60 mb-2 flex items-center gap-1">
                        <MapPin size={14} />
                        {property.location}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-neon-teal">
                          €{property.price.toLocaleString()}
                        </span>
                        <span className="text-white/60 text-sm">
                          Guardado:{" "}
                          {new Date(property.saved).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                      <Link
                        to={`/property/${property.id}`}
                        className="btn-primary w-full text-center"
                      >
                        Ver Propiedad
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">
                Historial de Actividad
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          activity.color === "text-neon-teal"
                            ? "bg-neon-teal/20"
                            : "bg-neon-emerald/20"
                        }`}
                      >
                        <IconComponent className={activity.color} size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 font-medium">
                          {activity.title}
                        </p>
                        <p className="text-white/60 text-sm">
                          {new Date(activity.date).toLocaleString("es-ES")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">
                Participación en la Comunidad
              </h2>
              <div className="space-y-6">
                {communityParticipation.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <span className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-white/60 text-sm">
                      <span>Tipo: {item.type.replace("_", " ")}</span>
                      <span>
                        Fecha: {new Date(item.date).toLocaleDateString("es-ES")}
                      </span>
                      {item.replies && <span>Respuestas: {item.replies}</span>}
                      {item.views && <span>Visualizaciones: {item.views}</span>}
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star
                            className="text-neon-teal fill-current"
                            size={14}
                          />
                          <span>{item.rating}/5</span>
                        </div>
                      )}
                      <span>Likes: {item.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8">
              {/* Profile Settings */}
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">
                  Configuración del Perfil
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/80 font-medium mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Bell className="text-neon-teal" size={24} />
                  Notificaciones
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span>
                      Nuevas propiedades que coincidan con mis criterios
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Respuestas a mis mensajes en la comunidad</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Actualizaciones de propiedades favoritas</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Newsletter y ofertas especiales</span>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
