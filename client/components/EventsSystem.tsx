import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Presentation,
  Coffee,
  ExternalLink,
  Plus,
  Filter,
  Search,
  Eye,
  MessageCircle,
  Star,
  CalendarPlus,
  Share,
  Bell,
  Globe,
  Wifi,
  User,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'vr-tour' | 'meetup' | 'workshop';
  date: string;
  duration: number; // minutes
  location?: string;
  isOnline: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  tags: string[];
  isRegistered: boolean;
  isPremium: boolean;
  meetingLink?: string;
  agenda?: string[];
  speakers?: {
    name: string;
    role: string;
    avatar: string;
  }[];
  price?: number;
}

interface EventsSystemProps {
  events: Event[];
  userLevel: string;
}

export default function EventsSystem({ events, userLevel }: EventsSystemProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const eventTypes = [
    { id: 'all', label: 'Todos', icon: Calendar, count: events.length },
    { id: 'webinar', label: 'Webinars', icon: Presentation, count: events.filter(e => e.type === 'webinar').length },
    { id: 'vr-tour', label: 'Tours VR Grupales', icon: Eye, count: events.filter(e => e.type === 'vr-tour').length },
    { id: 'meetup', label: 'Meetups', icon: Coffee, count: events.filter(e => e.type === 'meetup').length },
    { id: 'workshop', label: 'Talleres', icon: User, count: events.filter(e => e.type === 'workshop').length },
  ];

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'webinar': return Presentation;
      case 'vr-tour': return Eye;
      case 'meetup': return Coffee;
      case 'workshop': return User;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar': return 'text-blue-400 bg-blue-400/20';
      case 'vr-tour': return 'text-purple-400 bg-purple-400/20';
      case 'meetup': return 'text-green-400 bg-green-400/20';
      case 'workshop': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const addToCalendar = (event: Event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + event.duration * 60000);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || 'Online')}`;
    
    window.open(calendarUrl, '_blank');
  };

  const joinEvent = (event: Event) => {
    if (event.meetingLink) {
      window.open(event.meetingLink, '_blank');
    }
  };

  const canAccessEvent = (event: Event) => {
    if (!event.isPremium) return true;
    return userLevel === 'comprador-pro' || userLevel === 'agente-confiable';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Eventos de la Comunidad</h2>
          <p className="text-white/70">Webinars, tours VR grupales y meetups presenciales</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Crear Evento
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/60 hover:text-white'
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
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/60 hover:text-white'
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

        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-3">
          {eventTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === type.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{type.label}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{type.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredEvents.map((event) => {
          const IconComponent = getEventTypeIcon(event.type);
          const typeColor = getEventTypeColor(event.type);
          const canAccess = canAccessEvent(event);
          const eventDate = new Date(event.date);
          const isUpcoming = eventDate > new Date();

          if (viewMode === 'list') {
            return (
              <div key={event.id} className="glass-card p-6 rounded-2xl hover-glow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="lg:w-2/3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColor}`}>
                        <IconComponent className="w-4 h-4 inline mr-2" />
                        {event.type === 'webinar' ? 'Webinar' :
                         event.type === 'vr-tour' ? 'Tour VR' :
                         event.type === 'meetup' ? 'Meetup' : 'Taller'}
                      </div>
                      {event.isPremium && (
                        <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Premium
                        </div>
                      )}
                      {event.isOnline && (
                        <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Online
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-2">{event.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{eventDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.currentAttendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={event.organizer.avatar}
                          alt={event.organizer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium text-sm">{event.organizer.name}</div>
                          <div className="text-white/60 text-xs">{event.organizer.role}</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToCalendar(event)}
                          className="btn-secondary text-sm px-3 py-2 flex items-center gap-1"
                        >
                          <CalendarPlus className="w-4 h-4" />
                          Calendario
                        </button>
                        {canAccess ? (
                          <button
                            onClick={() => event.isRegistered ? joinEvent(event) : null}
                            className={`btn-primary text-sm px-4 py-2 flex items-center gap-2 ${
                              !event.isRegistered ? 'bg-green-500 hover:bg-green-600' : ''
                            }`}
                          >
                            {event.isRegistered ? (
                              <>
                                <ExternalLink className="w-4 h-4" />
                                Unirse
                              </>
                            ) : (
                              <>
                                <Users className="w-4 h-4" />
                                Registrarse
                              </>
                            )}
                          </button>
                        ) : (
                          <button className="btn-secondary text-sm px-4 py-2 opacity-50 cursor-not-allowed">
                            Premium requerido
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
            <div key={event.id} className="glass-card rounded-2xl overflow-hidden hover-glow">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 space-y-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColor}`}>
                    <IconComponent className="w-4 h-4 inline mr-2" />
                    {event.type === 'webinar' ? 'Webinar' :
                     event.type === 'vr-tour' ? 'Tour VR' :
                     event.type === 'meetup' ? 'Meetup' : 'Taller'}
                  </div>
                  {event.isPremium && (
                    <div className="bg-yellow-400/90 text-blue-dark px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      Premium
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  {event.isOnline ? (
                    <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      Online
                    </div>
                  ) : (
                    <div className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      Presencial
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card p-3 rounded-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-white">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {eventDate.toLocaleDateString()} • {eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/80">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.currentAttendees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium text-sm">{event.organizer.name}</div>
                    <div className="text-white/60 text-xs">{event.organizer.role}</div>
                  </div>
                </div>

                {event.location && !event.isOnline && (
                  <div className="flex items-center space-x-2 text-white/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCalendar(event)}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Añadir al calendario
                  </button>
                  {canAccess ? (
                    <button
                      onClick={() => event.isRegistered ? joinEvent(event) : null}
                      className={`flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2 ${
                        !event.isRegistered ? 'bg-green-500 hover:bg-green-600' : ''
                      }`}
                    >
                      {event.isRegistered ? (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          Unirse
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4" />
                          Registrarse
                        </>
                      )}
                    </button>
                  ) : (
                    <button className="flex-1 btn-secondary text-sm py-2 opacity-50 cursor-not-allowed">
                      Premium requerido
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white/60 mb-2">No hay eventos disponibles</h3>
          <p className="text-white/40">Prueba con diferentes filtros o vuelve más tarde.</p>
        </div>
      )}
    </div>
  );
}
