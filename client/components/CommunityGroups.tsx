import { useState } from "react";
import {
  Users,
  MapPin,
  Heart,
  TrendingUp,
  Coffee,
  Briefcase,
  Baby,
  Plane,
  MessageCircle,
  Lock,
  Globe,
  Plus,
  Search,
  Filter,
  User,
  Crown,
  Shield,
  Star,
  Eye,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: "location" | "interest" | "lifestyle";
  location?: string;
  memberCount: number;
  isPrivate: boolean;
  image: string;
  tags: string[];
  admin: {
    name: string;
    avatar: string;
    level: string;
  };
  moderators: {
    name: string;
    avatar: string;
  }[];
  recentActivity: {
    type: "post" | "member_joined" | "event" | "discussion";
    text: string;
    timestamp: string;
    user?: {
      name: string;
      avatar: string;
    };
  }[];
  stats: {
    postsThisWeek: number;
    activeMembers: number;
    avgResponseTime: string;
  };
  joined: boolean;
  isPending?: boolean;
}

interface CommunityGroupsProps {
  groups: CommunityGroup[];
  userLocation: string;
  userInterests: string[];
}

export default function CommunityGroups({
  groups,
  userLocation,
  userInterests,
}: CommunityGroupsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", label: "Todos", icon: Users, count: groups.length },
    {
      id: "location",
      label: "Por Isla/Ciudad",
      icon: MapPin,
      count: groups.filter((g) => g.category === "location").length,
    },
    {
      id: "interest",
      label: "Intereses",
      icon: Heart,
      count: groups.filter((g) => g.category === "interest").length,
    },
    {
      id: "lifestyle",
      label: "Estilo de Vida",
      icon: Coffee,
      count: groups.filter((g) => g.category === "lifestyle").length,
    },
  ];

  const filteredGroups = groups.filter((group) => {
    const matchesCategory =
      selectedCategory === "all" || group.category === selectedCategory;
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const recommendedGroups = groups
    .filter((group) => {
      if (group.joined) return false;

      // Recommend based on location
      if (
        group.category === "location" &&
        group.location?.includes(userLocation)
      ) {
        return true;
      }

      // Recommend based on interests
      if (
        group.category === "interest" &&
        group.tags.some((tag) => userInterests.includes(tag.toLowerCase()))
      ) {
        return true;
      }

      return false;
    })
    .slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "location":
        return MapPin;
      case "interest":
        return Heart;
      case "lifestyle":
        return Coffee;
      default:
        return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "location":
        return "text-blue-400 bg-blue-400/20";
      case "interest":
        return "text-red-400 bg-red-400/20";
      case "lifestyle":
        return "text-green-400 bg-green-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const getInterestIcon = (interest: string) => {
    switch (interest.toLowerCase()) {
      case "inversión":
      case "investment":
        return TrendingUp;
      case "nómadas":
      case "nomads":
        return Plane;
      case "familias":
      case "families":
        return Baby;
      case "negocios":
      case "business":
        return Briefcase;
      default:
        return Heart;
    }
  };

  const joinGroup = (groupId: string) => {
    // Implementation for joining a group
    console.log("Joining group:", groupId);
  };

  const leaveGroup = (groupId: string) => {
    // Implementation for leaving a group
    console.log("Leaving group:", groupId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">
            Grupos de la Comunidad
          </h2>
          <p className="text-white/70">
            Conecta con personas que comparten tus intereses y ubicación
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Crear Grupo
        </button>
      </div>

      {/* Recommended Groups */}
      {recommendedGroups.length > 0 && (
        <div className="glass-card p-6 rounded-2xl border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Recomendado para ti
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedGroups.map((group) => {
              const CategoryIcon = getCategoryIcon(group.category);
              return (
                <div key={group.id} className="bg-white/5 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">
                        {group.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-white/60 text-xs">
                        <CategoryIcon className="w-3 h-3" />
                        <span>{group.memberCount} miembros</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {group.description}
                  </p>
                  <button
                    onClick={() => joinGroup(group.id)}
                    className="w-full btn-secondary text-sm py-2"
                  >
                    Unirse
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <div className="w-4 h-4 space-y-1">
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Groups Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredGroups.map((group) => {
          const CategoryIcon = getCategoryIcon(group.category);
          const categoryColor = getCategoryColor(group.category);

          if (viewMode === "list") {
            return (
              <div
                key={group.id}
                className="glass-card p-6 rounded-2xl hover-glow"
              >
                <div className="flex gap-6">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColor}`}
                      >
                        <CategoryIcon className="w-4 h-4 inline mr-2" />
                        {group.category === "location"
                          ? "Ubicación"
                          : group.category === "interest"
                            ? "Interés"
                            : "Estilo de Vida"}
                      </div>
                      {group.isPrivate && (
                        <div className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                          <Lock className="w-3 h-3 inline mr-1" />
                          Privado
                        </div>
                      )}
                      {group.joined && (
                        <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Miembro
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {group.name}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {group.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {group.memberCount}
                        </div>
                        <div className="text-white/60 text-xs">Miembros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {group.stats.postsThisWeek}
                        </div>
                        <div className="text-white/60 text-xs">
                          Posts/semana
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {group.stats.activeMembers}
                        </div>
                        <div className="text-white/60 text-xs">Activos</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={group.admin.avatar}
                          alt={group.admin.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-white/60 text-sm">
                          Admin: {group.admin.name}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {group.joined ? (
                          <button
                            onClick={() => leaveGroup(group.id)}
                            className="btn-secondary text-sm px-4 py-2"
                          >
                            Salir
                          </button>
                        ) : (
                          <button
                            onClick={() => joinGroup(group.id)}
                            className="btn-primary text-sm px-4 py-2"
                          >
                            {group.isPrivate ? "Solicitar" : "Unirse"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={group.id}
              className="glass-card rounded-2xl overflow-hidden hover-glow"
            >
              <div className="relative">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 space-y-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColor}`}
                  >
                    <CategoryIcon className="w-4 h-4 inline mr-2" />
                    {group.category === "location"
                      ? "Ubicación"
                      : group.category === "interest"
                        ? "Interés"
                        : "Estilo de Vida"}
                  </div>
                  {group.isPrivate && (
                    <div className="bg-orange-400/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      <Lock className="w-3 h-3 inline mr-1" />
                      Privado
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  {group.joined ? (
                    <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      Miembro
                    </div>
                  ) : group.isPending ? (
                    <div className="bg-yellow-500/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      Pendiente
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {group.name}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-2">
                  {group.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {group.memberCount}
                    </div>
                    <div className="text-white/60 text-xs">Miembros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {group.stats.postsThisWeek}
                    </div>
                    <div className="text-white/60 text-xs">Posts/sem.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {group.stats.activeMembers}
                    </div>
                    <div className="text-white/60 text-xs">Activos</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={group.admin.avatar}
                    alt={group.admin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium text-sm flex items-center gap-1">
                      {group.admin.name}
                      {group.admin.level === "agente-confiable" && (
                        <Crown className="w-3 h-3 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-white/60 text-xs">Administrador</div>
                  </div>
                </div>

                {group.location && (
                  <div className="flex items-center space-x-2 text-white/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{group.location}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-4">
                  {group.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {group.tags.length > 3 && (
                    <span className="text-white/60 text-xs px-2 py-1">
                      +{group.tags.length - 3} más
                    </span>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="text-white/60 text-xs mb-2">
                    Actividad reciente:
                  </div>
                  <div className="space-y-1">
                    {group.recentActivity.slice(0, 2).map((activity, index) => (
                      <div key={index} className="text-white/70 text-xs">
                        {activity.user && (
                          <span className="font-medium">
                            {activity.user.name}
                          </span>
                        )}{" "}
                        {activity.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {group.joined ? (
                    <>
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Ver Grupo
                      </button>
                      <button
                        onClick={() => leaveGroup(group.id)}
                        className="btn-secondary text-sm px-3 py-2"
                      >
                        Salir
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => joinGroup(group.id)}
                      className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {group.isPrivate ? "Solicitar Unirse" : "Unirse al Grupo"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white/60 mb-2">
            No hay grupos disponibles
          </h3>
          <p className="text-white/40">
            Prueba con diferentes filtros o crea tu propio grupo.
          </p>
        </div>
      )}
    </div>
  );
}
