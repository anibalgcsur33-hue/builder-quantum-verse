import { useRef, useEffect, useState, useCallback } from "react";
import {
  Globe,
  Layers,
  TrendingUp,
  Users,
  MapPin,
  Eye,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Navigation,
  Home,
  School,
  Hospital,
  ShoppingCart,
  Camera,
  Settings,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  Star,
  Wifi,
  Route,
  Phone,
  Calendar,
  Heart,
  Share2,
  X,
} from "lucide-react";

interface Property3D {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqm: number;
  coordinates: {
    lat: number;
    lng: number;
    elevation: number;
  };
  type: 'villa' | 'apartment' | 'penthouse' | 'house';
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  images: string[];
  badges: ('vr' | 'crypto' | 'tour3d' | 'verified' | 'featured')[];
  heatmapData: {
    priceHeat: number; // 0-1
    tourismOccupancy: number; // 0-1
    demand: number; // 0-1
  };
  nearby: {
    beaches: { name: string; distance: number; }[];
    schools: { name: string; distance: number; type: string; }[];
    hospitals: { name: string; distance: number; }[];
    shopping: { name: string; distance: number; type: string; }[];
  };
  vrTourUrl?: string;
  tour3DUrl?: string;
}

interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  role: 'client' | 'agent' | 'admin';
  position: { x: number; y: number; z: number };
  isVoiceActive: boolean;
  pointer?: { x: number; y: number; visible: boolean };
}

interface Advanced3DMapProps {
  properties: Property3D[];
  onPropertySelect?: (property: Property3D) => void;
  multiplayerMode?: boolean;
  webXREnabled?: boolean;
  className?: string;
}

export default function Advanced3DMap({
  properties,
  onPropertySelect,
  multiplayerMode = false,
  webXREnabled = false,
  className = "",
}: Advanced3DMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<'globe' | 'spain' | 'canaries' | 'island' | 'city'>('globe');
  const [selectedProperty, setSelectedProperty] = useState<Property3D | null>(null);
  const [heatmapLayer, setHeatmapLayer] = useState<'price' | 'tourism' | 'demand' | null>('price');
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [renderQuality, setRenderQuality] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Multiplayer state
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [myPointer, setMyPointer] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  // WebXR state
  const [isXRSupported, setIsXRSupported] = useState(false);
  const [isXRActive, setIsXRActive] = useState(false);

  // Animation state
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    initializeMap();
    
    // Check WebXR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then(setIsXRSupported);
    }

    return () => {
      cleanup();
    };
  }, []);

  const initializeMap = async () => {
    if (!canvasRef.current) return;

    try {
      // Simulating Three.js initialization
      // In real implementation, we would use:
      // import * as THREE from 'three';
      // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
      // import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
      
      console.log('Initializing Advanced 3D Map...');
      
      // Mock initialization for demo
      await simulateMapLoading();
      
      setIsLoaded(true);
      console.log('3D Map initialized successfully');
    } catch (error) {
      console.error('Failed to initialize 3D Map:', error);
    }
  };

  const simulateMapLoading = () => {
    return new Promise(resolve => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setAnimationProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
    });
  };

  const cleanup = () => {
    // Cleanup Three.js resources
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };

  const animateToView = useCallback(async (targetView: typeof currentView) => {
    setIsAnimating(true);
    setAnimationProgress(0);
    
    // Simulate smooth transition animation
    for (let i = 0; i <= 100; i += 5) {
      setAnimationProgress(i);
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    setCurrentView(targetView);
    setIsAnimating(false);
  }, []);

  const handleGlobeToSpain = () => animateToView('spain');
  const handleSpainToCanaries = () => animateToView('canaries');
  const handleCanariesToIsland = () => animateToView('island');
  const handleIslandToCity = () => animateToView('city');

  const resetToGlobe = () => animateToView('globe');

  const toggleHeatmapLayer = (layer: typeof heatmapLayer) => {
    setHeatmapLayer(heatmapLayer === layer ? null : layer);
  };

  const handlePropertyClick = (property: Property3D) => {
    setSelectedProperty(property);
    onPropertySelect?.(property);
  };

  const getHeatmapColor = (value: number, type: 'price' | 'tourism' | 'demand') => {
    const colors = {
      price: ['#3B82F6', '#EF4444'], // Blue to Red
      tourism: ['#10B981', '#F59E0B'], // Green to Yellow
      demand: ['#8B5CF6', '#EC4899'], // Purple to Pink
    };
    
    const [startColor, endColor] = colors[type];
    // In real implementation, interpolate between colors
    return value > 0.5 ? endColor : startColor;
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'vr': return Eye;
      case 'crypto': return Wifi;
      case 'tour3d': return Camera;
      case 'verified': return Star;
      case 'featured': return Heart;
      default: return MapPin;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'vr': return 'bg-purple-500';
      case 'crypto': return 'bg-yellow-500';
      case 'tour3d': return 'bg-blue-500';
      case 'verified': return 'bg-green-500';
      case 'featured': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (multiplayerMode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMyPointer({ x, y, visible: true });
        
        // Hide pointer after 3 seconds
        setTimeout(() => {
          setMyPointer(prev => ({ ...prev, visible: false }));
        }, 3000);
      }
    }
  };

  const startVR = async () => {
    if (!navigator.xr || !isXRSupported) return;
    
    try {
      const session = await navigator.xr.requestSession('immersive-vr');
      setIsXRActive(true);
      console.log('VR session started');
    } catch (error) {
      console.error('Failed to start VR session:', error);
    }
  };

  const exitVR = () => {
    setIsXRActive(false);
    console.log('VR session ended');
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-blue-dark flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neon-teal/30 border-t-neon-teal rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Cargando Mapa 3D</h3>
            <p className="text-white/70 mb-4">Inicializando motor WebGL y cargando tiles...</p>
            <div className="w-64 bg-white/10 rounded-full h-2 mb-2">
              <div 
                className="bg-neon-teal h-2 rounded-full transition-all duration-300"
                style={{ width: `${animationProgress}%` }}
              ></div>
            </div>
            <p className="text-white/60 text-sm">{animationProgress}%</p>
          </div>
        </div>
      )}

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair"
        style={{ background: 'linear-gradient(to bottom, #0c1a2e, #1e3a5f)' }}
      />

      {/* Navigation Controls */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        {/* View Controls */}
        <div className="glass-card p-2 rounded-lg">
          <div className="flex flex-col gap-1">
            <button
              onClick={handleGlobeToSpain}
              disabled={currentView === 'globe' || isAnimating}
              className={`p-2 rounded transition-all ${
                currentView === 'globe' 
                  ? 'bg-neon-teal text-blue-dark' 
                  : 'hover:bg-white/10 text-white/70'
              }`}
              title="Vista Global"
            >
              <Globe size={16} />
            </button>
            <button
              onClick={handleSpainToCanaries}
              disabled={currentView === 'spain' || isAnimating}
              className={`p-2 rounded transition-all ${
                currentView === 'spain' 
                  ? 'bg-neon-teal text-blue-dark' 
                  : 'hover:bg-white/10 text-white/70'
              }`}
              title="Vista España"
            >
              <MapPin size={16} />
            </button>
            <button
              onClick={handleCanariesToIsland}
              disabled={currentView === 'canaries' || isAnimating}
              className={`p-2 rounded transition-all ${
                currentView === 'canaries' 
                  ? 'bg-neon-teal text-blue-dark' 
                  : 'hover:bg-white/10 text-white/70'
              }`}
              title="Vista Canarias"
            >
              <Navigation size={16} />
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="glass-card p-2 rounded-lg">
          <div className="flex flex-col gap-1">
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Acercar">
              <ZoomIn size={16} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Alejar">
              <ZoomOut size={16} />
            </button>
            <button 
              onClick={resetToGlobe}
              className="p-2 hover:bg-white/10 rounded transition-colors" 
              title="Reset Vista"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Quality Settings */}
        <div className="glass-card p-2 rounded-lg">
          <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Configuración">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Heatmap Controls */}
      <div className="absolute top-4 right-4 z-20">
        <div className="glass-card p-4 rounded-lg">
          <h4 className="text-white font-bold mb-3 text-sm">Capas de Calor</h4>
          <div className="space-y-2">
            <button
              onClick={() => toggleHeatmapLayer('price')}
              className={`w-full p-2 rounded text-sm transition-all ${
                heatmapLayer === 'price'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Precio/m²
            </button>
            <button
              onClick={() => toggleHeatmapLayer('tourism')}
              className={`w-full p-2 rounded text-sm transition-all ${
                heatmapLayer === 'tourism'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Ocupación Turística
            </button>
            <button
              onClick={() => toggleHeatmapLayer('demand')}
              className={`w-full p-2 rounded text-sm transition-all ${
                heatmapLayer === 'demand'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Demanda
            </button>
          </div>
        </div>
      </div>

      {/* WebXR Controls */}
      {webXREnabled && isXRSupported && (
        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={isXRActive ? exitVR : startVR}
            className={`glass-card p-3 rounded-lg transition-all ${
              isXRActive ? 'bg-red-500' : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            <Eye size={20} />
          </button>
        </div>
      )}

      {/* Multiplayer Controls */}
      {multiplayerMode && (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="glass-card p-3 rounded-lg flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded transition-all ${
                isMuted ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`p-2 rounded transition-all ${
                isVoiceEnabled ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="text-white/70 text-sm">
              {connectedUsers.length} usuarios conectados
            </div>
          </div>
        </div>
      )}

      {/* Connected Users */}
      {multiplayerMode && connectedUsers.map(user => (
        <div
          key={user.id}
          className="absolute z-30 pointer-events-none"
          style={{
            left: user.position.x,
            top: user.position.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center space-x-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-neon-teal"
            />
            <div className="glass-card px-2 py-1 rounded text-xs">
              <div className="text-white font-medium">{user.name}</div>
              <div className="text-neon-teal text-xs">{user.role}</div>
            </div>
            {user.isVoiceActive && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ))}

      {/* My Pointer */}
      {multiplayerMode && myPointer.visible && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            left: myPointer.x,
            top: myPointer.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-4 h-4 bg-neon-teal rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-neon-teal rounded-full absolute top-1 left-1"></div>
        </div>
      )}

      {/* Mini Map */}
      {showMiniMap && currentView !== 'globe' && (
        <div className="absolute bottom-4 right-20 z-20 w-48 h-36">
          <div className="glass-card p-2 rounded-lg w-full h-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xs font-medium">Mini Mapa</span>
              <button
                onClick={() => setShowMiniMap(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
            <div className="w-full h-24 bg-white/10 rounded relative">
              {/* Mini map content would go here */}
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">
                Rutas a servicios
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Panel */}
      {selectedProperty && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-80">
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Property Images */}
            <div className="relative">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-2 right-2 w-8 h-8 glass-card rounded-full flex items-center justify-center"
              >
                <X size={16} />
              </button>
              
              {/* Property Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {selectedProperty.badges.map((badge) => {
                  const IconComponent = getBadgeIcon(badge);
                  return (
                    <div
                      key={badge}
                      className={`${getBadgeColor(badge)} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}
                    >
                      <IconComponent size={12} />
                      {badge.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">{selectedProperty.title}</h3>
              <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
                <MapPin size={14} />
                {selectedProperty.location}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-white font-bold">{selectedProperty.bedrooms}</div>
                  <div className="text-white/60 text-xs">Dormitorios</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{selectedProperty.bathrooms}</div>
                  <div className="text-white/60 text-xs">Baños</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{selectedProperty.sqm}m²</div>
                  <div className="text-white/60 text-xs">Superficie</div>
                </div>
              </div>

              <div className="text-2xl font-bold text-neon-teal mb-4">
                €{selectedProperty.price.toLocaleString()}
              </div>

              {/* Nearby Services */}
              <div className="space-y-2 mb-4">
                <h4 className="text-white font-medium text-sm">Servicios cercanos:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-white/70">
                    <Route size={12} />
                    Playa: {selectedProperty.nearby.beaches[0]?.distance}m
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <School size={12} />
                    Colegio: {selectedProperty.nearby.schools[0]?.distance}m
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <Hospital size={12} />
                    Hospital: {selectedProperty.nearby.hospitals[0]?.distance}m
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <ShoppingCart size={12} />
                    Comercio: {selectedProperty.nearby.shopping[0]?.distance}m
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {selectedProperty.vrTourUrl && (
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <Eye size={16} />
                    Visitar en VR
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <button className="btn-secondary flex items-center justify-center gap-1">
                    <Phone size={14} />
                    Contactar
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-1">
                    <Calendar size={14} />
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current View Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass-card px-4 py-2 rounded-lg">
          <div className="text-white/70 text-sm">
            Vista actual: <span className="text-neon-teal font-medium capitalize">{currentView}</span>
            {isAnimating && (
              <span className="ml-2 text-yellow-400">Navegando...</span>
            )}
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass-card px-3 py-1 rounded-lg text-xs">
          <span className="text-white/60">Calidad: </span>
          <span className={`font-medium ${
            renderQuality === 'high' ? 'text-green-400' :
            renderQuality === 'medium' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {renderQuality.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
