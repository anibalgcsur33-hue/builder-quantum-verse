import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import GamificationSystem from "../components/GamificationSystem";
import EventsSystem from "../components/EventsSystem";
import CommunityGroups from "../components/CommunityGroups";
import {
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Eye,
  ThumbsUp,
  Reply,
  Search,
  Filter,
  TrendingUp,
  Globe,
  BookOpen,
  Newspaper,
  ExternalLink,
  Crown,
  Star,
  Badge,
  Clock,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Video,
  FileText,
  Trophy,
  Gift,
  Heart,
  UserPlus,
  CheckCircle,
  Home,
  Coins,
  Award,
  Presentation,
  Coffee,
  User,
} from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("virtual-space");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("all");
  const [selectedForumCategory, setSelectedForumCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const virtualSpaceUsers = [
    {
      id: 1,
      name: "María González",
      avatar: "/placeholder.svg",
      location: "Madrid",
      status: "online",
      currentTour: "Villa Costa Adeje",
      badge: "VIP",
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      avatar: "/placeholder.svg",
      location: "Barcelona",
      status: "in-tour",
      currentTour: "Penthouse Las Palmas",
      badge: "Inversor",
    },
    {
      id: 3,
      name: "Ana Martínez",
      avatar: "/placeholder.svg",
      location: "Valencia",
      status: "online",
      currentTour: null,
      badge: "Comprador",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title:
        "Guía completa para comprar en Canarias: Todo lo que necesitas saber",
      category: "guias-locales",
      author: "Carmen Silva",
      authorAvatar: "/placeholder.svg",
      publishDate: "2024-01-15",
      readTime: "8 min",
      excerpt:
        "Descubre los aspectos legales, fiscales y prácticos para adquirir tu propiedad en las Islas Canarias.",
      image: "/placeholder.svg",
      tags: ["Canarias", "Legal", "Guía"],
      views: 2847,
      likes: 156,
    },
    {
      id: 2,
      title:
        "El mercado inmobiliario canario alcanza máximos históricos en 2024",
      category: "noticias",
      author: "Miguel Torres",
      authorAvatar: "/placeholder.svg",
      publishDate: "2024-01-20",
      readTime: "5 min",
      excerpt:
        "Análisis del crecimiento del 12% en el precio medio de la vivienda en el archipiélago.",
      image: "/placeholder.svg",
      tags: ["Mercado", "Estadísticas", "2024"],
      views: 1923,
      likes: 89,
    },
    {
      id: 3,
      title: "Evento VR: Tour grupal por las mejores villas de Tenerife",
      category: "eventos",
      author: "BlueEyeHomes",
      authorAvatar: "/placeholder.svg",
      publishDate: "2024-01-25",
      readTime: "3 min",
      excerpt:
        "Únete a nuestro próximo evento virtual el 30 de enero a las 19:00 CET.",
      image: "/placeholder.svg",
      tags: ["Evento", "VR", "Tenerife"],
      views: 756,
      likes: 234,
      isEvent: true,
      eventDate: "2024-01-30T19:00:00",
      eventLink: "https://meet.blueeyehomes.com/vr-tour-tenerife",
    },
  ];

  const forumTopics = [
    {
      id: 1,
      title: "¿Merece la pena invertir en alquiler vacacional en Canarias?",
      category: "inversores",
      author: "InvertorPro2024",
      authorAvatar: "/placeholder.svg",
      createdAt: "2024-01-22T10:30:00",
      replies: 23,
      views: 1456,
      lastActivity: "2024-01-23T14:20:00",
      isPinned: true,
      tags: ["Inversión", "Vacacional", "ROI"],
    },
    {
      id: 2,
      title: "Experiencia comprando con BlueEyeHomes - Villa en Gran Canaria",
      category: "compradores",
      author: "NuevoCanario",
      authorAvatar: "/placeholder.svg",
      createdAt: "2024-01-21T16:45:00",
      replies: 12,
      views: 892,
      lastActivity: "2024-01-23T11:15:00",
      isPinned: false,
      tags: ["Experiencia", "Gran Canaria", "Proceso"],
    },
    {
      id: 3,
      title: "Comparativa: Tours VR vs. visitas presenciales",
      category: "compradores",
      author: "TechBuyer",
      authorAvatar: "/placeholder.svg",
      createdAt: "2024-01-20T09:20:00",
      replies: 34,
      views: 2103,
      lastActivity: "2024-01-23T13:40:00",
      isPinned: false,
      tags: ["VR", "Comparativa", "Tecnología"],
    },
  ];

  const blogCategories = [
    { id: "all", label: "Todos", count: 156 },
    { id: "guias-locales", label: "Guías Locales", count: 45 },
    { id: "noticias", label: "Noticias Inmobiliarias", count: 78 },
    { id: "eventos", label: "Eventos", count: 33 },
  ];

  const forumCategories = [
    { id: "all", label: "Todos", count: 234 },
    { id: "compradores", label: "Compradores", count: 156 },
    { id: "inversores", label: "Inversores", count: 78 },
  ];

  const filteredBlogPosts =
    selectedBlogCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedBlogCategory);

  const filteredForumTopics =
    selectedForumCategory === "all"
      ? forumTopics
      : forumTopics.filter((topic) => topic.category === selectedForumCategory);

  const tabs = [
    { id: "virtual-space", label: "Espacio Virtual", icon: Globe },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "forum", label: "Foro", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-blue-dark text-white/90">
      <Header isScrolled={isScrolled} />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto container-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg text-gradient mb-6">
              Comunidad BlueEyeHomes
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Conecta con otros compradores e inversores, comparte experiencias
              y descubre oportunidades exclusivas en nuestro espacio virtual.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 text-center hover-glow-teal">
              <Users className="text-neon-teal mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold">5,247</div>
              <div className="text-white/60 text-sm">Miembros activos</div>
            </div>
            <div className="glass-card p-6 text-center hover-glow-emerald">
              <Eye className="text-neon-emerald mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold">12,458</div>
              <div className="text-white/60 text-sm">Tours compartidos</div>
            </div>
            <div className="glass-card p-6 text-center hover-glow-teal">
              <MessageSquare
                className="text-neon-teal mx-auto mb-3"
                size={32}
              />
              <div className="text-2xl font-bold">3,892</div>
              <div className="text-white/60 text-sm">Conversaciones</div>
            </div>
            <div className="glass-card p-6 text-center hover-glow-emerald">
              <TrendingUp
                className="text-neon-emerald mx-auto mb-3"
                size={32}
              />
              <div className="text-2xl font-bold">€2.1B</div>
              <div className="text-white/60 text-sm">Valor transacciones</div>
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
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "virtual-space" && (
            <div className="space-y-8">
              {/* Virtual Space Header */}
              <div className="glass-card p-8 rounded-xl text-center">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Espacio Virtual en Tiempo Real
                </h2>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Únete a otros usuarios explorando propiedades en nuestro
                  metaverso. Comparte tours, haz preguntas en vivo y conecta con
                  la comunidad.
                </p>
                <button className="btn-primary text-lg px-8 py-4">
                  <Globe className="mr-3" size={24} />
                  Entrar al Espacio Virtual
                </button>
              </div>

              {/* Active Users */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="text-neon-teal" size={28} />
                  Usuarios activos ahora
                  <span className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm">
                    {virtualSpaceUsers.length} online
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {virtualSpaceUsers.map((user) => (
                    <div
                      key={user.id}
                      className="glass-card p-6 hover-glow-teal"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div
                            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-blue-dark ${
                              user.status === "online"
                                ? "bg-green-500"
                                : user.status === "in-tour"
                                  ? "bg-neon-teal"
                                  : "bg-gray-500"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {user.name}
                            {user.badge === "VIP" && (
                              <Crown className="text-yellow-500" size={16} />
                            )}
                            {user.badge === "Inversor" && (
                              <Badge className="text-neon-emerald" size={16} />
                            )}
                          </div>
                          <div className="text-white/60 text-sm flex items-center gap-1">
                            <MapPin size={14} />
                            {user.location}
                          </div>
                        </div>
                      </div>

                      {user.currentTour && (
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="text-sm text-white/60 mb-1">
                            Explorando:
                          </div>
                          <div className="font-medium text-neon-teal">
                            {user.currentTour}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 btn-secondary text-sm py-2">
                          <MessageSquare size={16} className="mr-1" />
                          Chat
                        </button>
                        <button className="flex-1 btn-primary text-sm py-2">
                          <Eye size={16} className="mr-1" />
                          Unirse
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Events */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Calendar className="text-neon-emerald" size={28} />
                  Próximos eventos virtuales
                </h3>

                <div className="space-y-4">
                  <div className="glass-card p-6 hover-glow-emerald">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="text-xl font-bold mb-2">
                          Tour Grupal: Villas de Lujo en Tenerife
                        </h4>
                        <p className="text-white/70 mb-3">
                          Explora las mejores propiedades de la isla con otros
                          inversores y compradores.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            30 Enero, 19:00 CET
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            23 participantes
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary flex items-center gap-2">
                        <ExternalLink size={18} />
                        Unirse al evento
                      </button>
                    </div>
                  </div>

                  <div className="glass-card p-6 hover-glow-teal">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="text-xl font-bold mb-2">
                          Webinar: Inversión Inmobiliaria en Canarias 2024
                        </h4>
                        <p className="text-white/70 mb-3">
                          Estrategias, oportunidades y análisis de mercado con
                          expertos del sector.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />5 Febrero, 18:00 CET
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            156 registrados
                          </div>
                        </div>
                      </div>
                      <button className="btn-secondary flex items-center gap-2">
                        <Calendar size={18} />
                        Registrarse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-8">
              {/* Blog Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gradient mb-2">
                    Blog de la Comunidad
                  </h2>
                  <p className="text-white/70">
                    Guías, noticias y eventos del mundo inmobiliario
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Buscar artículos..."
                      className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Categories */}
              <div className="flex flex-wrap gap-3">
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedBlogCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedBlogCategory === category.id
                        ? "bg-neon-teal text-blue-dark font-semibold"
                        : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>

              {/* Blog Posts */}
              <div className="space-y-6">
                {filteredBlogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="glass-card p-6 hover-glow-teal"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              post.category === "guias-locales"
                                ? "bg-neon-teal/20 text-neon-teal"
                                : post.category === "noticias"
                                  ? "bg-neon-emerald/20 text-neon-emerald"
                                  : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {post.category === "guias-locales"
                              ? "Guía Local"
                              : post.category === "noticias"
                                ? "Noticia"
                                : "Evento"}
                          </span>
                          {post.isEvent && (
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                              Próximo evento
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 hover:text-neon-teal transition-colors cursor-pointer">
                          {post.title}
                        </h3>

                        <p className="text-white/70 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={16} />
                            <span>{post.likes}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-white/5 text-white/60 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">
                            {new Date(post.publishDate).toLocaleDateString(
                              "es-ES",
                            )}
                          </span>
                          {post.isEvent && post.eventLink ? (
                            <a
                              href={post.eventLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                            >
                              <ExternalLink size={16} />
                              Unirse al evento
                            </a>
                          ) : (
                            <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                              <ArrowRight size={16} />
                              Leer más
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "forum" && (
            <div className="space-y-8">
              {/* Forum Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gradient mb-2">
                    Foro de la Comunidad
                  </h2>
                  <p className="text-white/70">
                    Comparte experiencias y resuelve dudas con otros compradores
                    e inversores
                  </p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <MessageSquare size={20} />
                  Nuevo tema
                </button>
              </div>

              {/* Forum Categories */}
              <div className="flex flex-wrap gap-3">
                {forumCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedForumCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedForumCategory === category.id
                        ? "bg-neon-teal text-blue-dark font-semibold"
                        : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>

              {/* Forum Topics */}
              <div className="space-y-4">
                {filteredForumTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="glass-card p-6 hover-glow-teal"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {topic.isPinned && (
                            <span className="bg-neon-emerald/20 text-neon-emerald px-2 py-1 rounded text-xs font-semibold">
                              Fijado
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              topic.category === "compradores"
                                ? "bg-neon-teal/20 text-neon-teal"
                                : "bg-neon-emerald/20 text-neon-emerald"
                            }`}
                          >
                            {topic.category === "compradores"
                              ? "Compradores"
                              : "Inversores"}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 hover:text-neon-teal transition-colors cursor-pointer">
                          {topic.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={topic.authorAvatar}
                              alt={topic.author}
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{topic.author}</span>
                          </div>
                          <span>
                            {new Date(topic.createdAt).toLocaleDateString(
                              "es-ES",
                            )}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {topic.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-white/5 text-white/60 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right text-sm text-white/60">
                        <div className="flex items-center gap-1 mb-1">
                          <Reply size={16} />
                          <span>{topic.replies} respuestas</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Eye size={16} />
                          <span>{topic.views} vistas</span>
                        </div>
                        <div className="text-xs">
                          Última actividad:{" "}
                          {new Date(topic.lastActivity).toLocaleDateString(
                            "es-ES",
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
