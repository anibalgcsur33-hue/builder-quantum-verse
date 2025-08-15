import { useState, useEffect } from 'react';
import { MapPin, Eye, CheckCircle, X, Globe } from 'lucide-react';

interface SocialProofNotification {
  id: string;
  country: string;
  countryFlag: string;
  action: 'reserved' | 'viewed' | 'inquired' | 'visited';
  propertyType: string;
  location: string;
  timestamp: Date;
  anonymous: boolean;
}

export default function LiveSocialProof() {
  const [notifications, setNotifications] = useState<SocialProofNotification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<SocialProofNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data pool for generating realistic notifications
  const countries = [
    { name: 'Alemania', flag: '🇩🇪' },
    { name: 'Francia', flag: '🇫🇷' },
    { name: 'Reino Unido', flag: '🇬🇧' },
    { name: 'Italia', flag: '🇮🇹' },
    { name: 'Suecia', flag: '🇸🇪' },
    { name: 'Holanda', flag: '🇳🇱' },
    { name: 'Bélgica', flag: '🇧🇪' },
    { name: 'Suiza', flag: '🇨🇭' },
    { name: 'Noruega', flag: '🇳🇴' },
    { name: 'Dinamarca', flag: '🇩🇰' },
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'España', flag: '🇪🇸' },
    { name: 'Estados Unidos', flag: '🇺🇸' },
    { name: 'Canadá', flag: '🇨🇦' }
  ];

  const propertyTypes = [
    'villa moderna', 'ático', 'apartamento', 'chalet', 'penthouse', 
    'estudio', 'dúplex', 'bungalow', 'casa adosada', 'villa de lujo'
  ];

  const locations = [
    'Costa Adeje, Tenerife', 'Las Palmas, Gran Canaria', 'Playa de las Américas, Tenerife',
    'Puerto de la Cruz, Tenerife', 'Maspalomas, Gran Canaria', 'Los Cristianos, Tenerife',
    'Santa Cruz, Tenerife', 'Arona, Tenerife', 'San Bartolomé, Lanzarote', 'Corralejo, Fuerteventura',
    'Valle Gran Rey, La Gomera', 'Santa Cruz de La Palma', 'Valverde, El Hierro'
  ];

  const actions = [
    { type: 'reserved' as const, text: 'reservó un', weight: 2 },
    { type: 'viewed' as const, text: 'está viendo un', weight: 5 },
    { type: 'inquired' as const, text: 'preguntó por un', weight: 3 },
    { type: 'visited' as const, text: 'visitó un', weight: 1 }
  ];

  const generateNotification = (): SocialProofNotification => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Weighted random selection for actions (reserved is less frequent than viewed)
    const weightedActions = actions.flatMap(action => 
      Array(action.weight).fill(action)
    );
    const action = weightedActions[Math.floor(Math.random() * weightedActions.length)];

    return {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      country: country.name,
      countryFlag: country.flag,
      action: action.type,
      propertyType,
      location,
      timestamp: new Date(),
      anonymous: true
    };
  };

  const getActionText = (action: string) => {
    const actionMap = {
      reserved: 'reservó un',
      viewed: 'está viendo un',
      inquired: 'preguntó por un',
      visited: 'visitó un'
    };
    return actionMap[action as keyof typeof actionMap] || 'interactuó con un';
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'reserved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'viewed':
        return <Eye className="w-4 h-4 text-blue-400" />;
      case 'inquired':
        return <Globe className="w-4 h-4 text-yellow-400" />;
      case 'visited':
        return <MapPin className="w-4 h-4 text-purple-400" />;
      default:
        return <Globe className="w-4 h-4 text-neon-teal" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'reserved':
        return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'viewed':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
      case 'inquired':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'visited':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-300';
      default:
        return 'bg-neon-teal/20 border-neon-teal/30 text-neon-teal';
    }
  };

  useEffect(() => {
    // Generate initial notifications
    const initialNotifications = Array.from({ length: 5 }, generateNotification);
    setNotifications(initialNotifications);

    // Set up interval to generate new notifications
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      setNotifications(prev => [newNotification, ...prev.slice(0, 20)]); // Keep last 20
      
      // Show the notification
      setCurrentNotification(newNotification);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setCurrentNotification(null), 300);
      }, 4000);
    }, 8000 + Math.random() * 12000); // Random interval between 8-20 seconds

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = () => {
    setIsVisible(false);
    setTimeout(() => setCurrentNotification(null), 300);
  };

  return (
    <>
      {/* Live Notification Popup */}
      {currentNotification && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <div className={`glass-card border rounded-2xl p-4 max-w-sm shadow-xl backdrop-blur-md ${
            getActionColor(currentNotification.action)
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-2xl">{currentNotification.countryFlag}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getActionIcon(currentNotification.action)}
                    <span className="text-sm font-medium">
                      Cliente en {currentNotification.country}
                    </span>
                  </div>
                  <p className="text-sm text-white/90">
                    {getActionText(currentNotification.action)} {currentNotification.propertyType} en {currentNotification.location}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/70">
                      Hace {Math.floor((Date.now() - currentNotification.timestamp.getTime()) / 1000)}s
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={dismissNotification}
                className="text-white/50 hover:text-white/80 transition-colors duration-200 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Feed (optional, can be toggled) */}
      <div className="absolute top-6 right-6 hidden lg:block">
        <div className="glass-card rounded-xl p-3 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">Actividad en tiempo real</span>
          </div>
          
          <div className="space-y-2">
            {notifications.slice(0, 8).map((notification) => (
              <div 
                key={notification.id}
                className="flex items-start space-x-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="text-lg">{notification.countryFlag}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    {getActionIcon(notification.action)}
                    <span className="text-xs text-white/70 truncate">
                      {notification.country}
                    </span>
                  </div>
                  <p className="text-xs text-white/90 truncate">
                    {getActionText(notification.action)} {notification.propertyType}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {notification.location}
                  </p>
                </div>
                <span className="text-xs text-white/50 whitespace-nowrap">
                  {Math.floor((Date.now() - notification.timestamp.getTime()) / 60000)}m
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
