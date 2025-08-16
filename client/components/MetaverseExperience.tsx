import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Move3D, 
  Eye, 
  Users, 
  MessageCircle, 
  Headphones, 
  Settings, 
  Compass, 
  Navigation, 
  Map, 
  Home, 
  Building, 
  Camera, 
  Mic, 
  MicOff, 
  Hand, 
  X,
  Sparkles,
  Globe
} from 'lucide-react';

interface MetaverseExperienceProps {
  propertyId?: string;
  initialPosition?: { x: number; y: number; z: number };
  onClose?: () => void;
}

interface VirtualUser {
  id: string;
  name: string;
  avatar: string;
  position: { x: number; y: number; z: number };
  isViewing: string | null;
  country: string;
  flag: string;
}

export default function MetaverseExperience({ propertyId, initialPosition, onClose }: MetaverseExperienceProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'vr' | 'ar'>('3d');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(propertyId || null);
  const [showUsers, setShowUsers] = useState(true);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Virtual users in the metaverse
  const [virtualUsers] = useState<VirtualUser[]>([
    {
      id: '1',
      name: 'Ana M.',
      avatar: '/placeholder.svg',
      position: { x: 100, y: 50, z: 0 },
      isViewing: 'villa-1',
      country: 'Alemania',
      flag: '🇩🇪'
    },
    {
      id: '2',
      name: 'Marco R.',
      avatar: '/placeholder.svg',
      position: { x: 200, y: 100, z: 0 },
      isViewing: 'penthouse-2',
      country: 'Italia',
      flag: '🇮🇹'
    },
    {
      id: '3',
      name: 'Sophie L.',
      avatar: '/placeholder.svg',
      position: { x: 150, y: 75, z: 0 },
      isViewing: null,
      country: 'Francia',
      flag: '🇫🇷'
    }
  ]);

  // Enhanced 3D environment settings
  const [environment, setEnvironment] = useState({
    timeOfDay: 'sunset', // morning, afternoon, sunset, night
    weather: 'clear', // clear, cloudy, rain, fog
    season: 'summer', // spring, summer, autumn, winter
    atmosphere: 'realistic' // realistic, cinematic, artistic
  });

  useEffect(() => {
    // Initialize 3D environment
    initializeMetaverse();
    
    // Add ambient sounds
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, []);

  const initializeMetaverse = () => {
    // Simulate 3D metaverse initialization
    console.log('Initializing metaverse environment...');
  };

  const handlePropertyView = (propertyId: string) => {
    setSelectedProperty(propertyId);
    // Simulate navigation to property in 3D space
  };

  const handleEnvironmentChange = (setting: string, value: string) => {
    setEnvironment(prev => ({ ...prev, [setting]: value }));
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      user: 'Tú',
      content: newMessage,
      timestamp: new Date(),
      type: 'user'
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        user: 'Asistente IA',
        content: 'Te ayudo con cualquier pregunta sobre las propiedades en el metaverso.',
        timestamp: new Date(),
        type: 'ai'
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-96'} bg-gradient-to-b from-blue-900 via-purple-900 to-black rounded-2xl overflow-hidden`}>
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)' }}
      />

      {/* Ambient Audio */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        src="/ambient-metaverse.mp3"
        className="hidden"
      />

      {/* 3D Environment Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-teal rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Virtual property pins */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-6 h-6 cursor-pointer pointer-events-auto"
            style={{ left: '25%', top: '40%' }}
            onClick={() => handlePropertyView('villa-1')}
          >
            <div className="w-full h-full bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-neon-teal/50">
              <Home className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Villa Oceanfront €1.2M
            </div>
          </div>

          <div 
            className="absolute w-6 h-6 cursor-pointer pointer-events-auto"
            style={{ left: '60%', top: '30%' }}
            onClick={() => handlePropertyView('penthouse-2')}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/50">
              <Building className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Penthouse Marina €850k
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Users Overlay */}
      {showUsers && (
        <div className="absolute inset-0 pointer-events-none">
          {virtualUsers.map((user) => (
            <div
              key={user.id}
              className="absolute w-8 h-8 pointer-events-auto"
              style={{ 
                left: `${(user.position.x / 400) * 100}%`, 
                top: `${(user.position.y / 200) * 100}%` 
              }}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                />
                <div className="absolute -top-1 -right-1 text-lg">{user.flag}</div>
                {user.isViewing && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                )}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  {user.name} ({user.country})
                  {user.isViewing && <div className="text-green-400">Viendo propiedad</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Controls Panel */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Left Controls */}
        <div className="flex gap-2">
          <div className="glass-card p-2 rounded-lg">
            <div className="flex gap-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>

          <div className="glass-card p-2 rounded-lg">
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('3d')}
                className={`p-2 rounded transition-colors ${viewMode === '3d' ? 'bg-neon-teal text-blue-dark' : 'hover:bg-white/10'}`}
              >
                <Move3D className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('vr')}
                className={`p-2 rounded transition-colors ${viewMode === 'vr' ? 'bg-neon-teal text-blue-dark' : 'hover:bg-white/10'}`}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('ar')}
                className={`p-2 rounded transition-colors ${viewMode === 'ar' ? 'bg-neon-teal text-blue-dark' : 'hover:bg-white/10'}`}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex gap-2">
          <div className="glass-card p-2 rounded-lg">
            <div className="flex gap-1">
              <button
                onClick={() => setShowUsers(!showUsers)}
                className={`p-2 rounded transition-colors ${showUsers ? 'bg-neon-teal text-blue-dark' : 'hover:bg-white/10'}`}
                title="Mostrar usuarios"
              >
                <Users className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`p-2 rounded transition-colors ${isVoiceEnabled ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}
                title="Chat de voz"
              >
                {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Pantalla completa"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-red-500/20 rounded transition-colors"
                  title="Cerrar"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Environment Controls */}
      <div className="absolute bottom-4 left-4 glass-card p-3 rounded-lg pointer-events-auto">
        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Ambiente
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-white/70">Hora</label>
            <select
              value={environment.timeOfDay}
              onChange={(e) => handleEnvironmentChange('timeOfDay', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
            >
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
              <option value="sunset">Atardecer</option>
              <option value="night">Noche</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/70">Clima</label>
            <select
              value={environment.weather}
              onChange={(e) => handleEnvironmentChange('weather', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
            >
              <option value="clear">Despejado</option>
              <option value="cloudy">Nublado</option>
              <option value="rain">Lluvia</option>
              <option value="fog">Niebla</option>
            </select>
          </div>
        </div>
      </div>

      {/* Community Chat */}
      <div className="absolute bottom-4 right-4 w-80 glass-card rounded-lg pointer-events-auto">
        <div className="p-3 border-b border-white/10">
          <h4 className="text-white font-medium flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat Comunidad ({virtualUsers.length} conectados)
          </h4>
        </div>
        <div className="h-32 overflow-y-auto p-3">
          {chatMessages.length === 0 ? (
            <p className="text-white/60 text-sm">No hay mensajes aún...</p>
          ) : (
            <div className="space-y-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className={`font-medium ${msg.type === 'ai' ? 'text-neon-teal' : 'text-white'}`}>
                    {msg.user}:
                  </span>
                  <span className="text-white/80 ml-2">{msg.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-neon-teal"
            />
            <button
              onClick={sendChatMessage}
              className="bg-neon-teal hover:bg-neon-emerald text-blue-dark p-2 rounded transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Info Panel */}
      {selectedProperty && (
        <div className="absolute top-20 right-4 w-72 glass-card rounded-lg pointer-events-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Villa Oceanfront Paradise</h4>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between">
                <span>Precio:</span>
                <span className="text-neon-teal font-bold">€1.250.000</span>
              </div>
              <div className="flex justify-between">
                <span>Dormitorios:</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span>Superficie:</span>
                <span>357 m²</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 btn-secondary text-sm py-2">
                <Eye className="w-4 h-4 mr-2" />
                Tour VR
              </button>
              <button className="flex-1 btn-primary text-sm py-2">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
          <div className="text-center">
            <Globe className="w-12 h-12 text-neon-teal mx-auto mb-4 animate-spin" />
            <p className="text-white text-lg font-medium mb-2">Cargando Metaverso...</p>
            <p className="text-white/60 text-sm">Preparando experiencia 3D inmersiva</p>
          </div>
        </div>
      )}
    </div>
  );
}
