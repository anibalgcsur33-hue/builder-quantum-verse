import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { 
  Volume2, 
  MessageCircle,
  Calendar,
  Home,
  FileText,
  Phone,
  RotateCcw
} from 'lucide-react';

// Ready Player Me avatar URL
const AVATAR_URL = "https://models.readyplayer.me/68a130cc6db44d17d10d931b.glb";

interface Avatar3DProps {
  className?: string;
  height?: number;
  autoRotate?: boolean;
  defaultLine?: string;
  onInteraction?: (action: string, data?: any) => void;
  isVisible?: boolean;
}

interface AvatarAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

// Avatar Model Component
function AvatarModel() {
  const meshRef = useRef<any>();
  const { scene } = useGLTF(AVATAR_URL);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle head movement
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

// Scene Component
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[2, 3, 1.5]} 
        intensity={1.1}
        castShadow
      />
      
      {/* Avatar */}
      <Suspense fallback={null}>
        <AvatarModel />
      </Suspense>
      
      {/* Controls */}
      <OrbitControls 
        enableDamping
        target={[0, 1.5, 0]}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

const Avatar3DFixed: React.FC<Avatar3DProps> = ({ 
  className = '', 
  height = 520,
  defaultLine = "¡Hola! Soy BlueEye, tu asesora virtual inmobiliaria. ¿En qué puedo ayudarte hoy?",
  onInteraction,
  isVisible = true 
}) => {
  const [text, setText] = useState(defaultLine);
  const [speaking, setSpeaking] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // Avatar actions for real estate assistant
  const avatarActions: AvatarAction[] = [
    {
      id: 'search-properties',
      label: 'Buscar Propiedades',
      icon: Home,
      action: () => handleAction('search-properties')
    },
    {
      id: 'schedule-visit',
      label: 'Agendar Visita',
      icon: Calendar,
      action: () => handleAction('schedule-visit')
    },
    {
      id: 'legal-info',
      label: 'Info Legal',
      icon: FileText,
      action: () => handleAction('legal-info')
    },
    {
      id: 'contact-agent',
      label: 'Contactar Agente',
      icon: Phone,
      action: () => handleAction('contact-agent')
    }
  ];

  // Handle avatar actions
  const handleAction = (actionId: string, data?: any) => {
    console.log(`🎬 Avatar action: ${actionId}`, data);
    
    // Trigger callback
    onInteraction?.(actionId, data);
    
    // Make avatar speak about the action
    const actionTexts = {
      'search-properties': 'Te ayudo a buscar las mejores propiedades en Canarias. ¿Qué tipo de inmueble buscas?',
      'schedule-visit': 'Perfecto, vamos a agendar una visita. ¿Prefieres una visita virtual o presencial?',
      'legal-info': 'Te proporciono toda la información legal necesaria. Nuestro equipo de abogados te respalda.',
      'contact-agent': 'Te conecto con nuestro mejor agente inmobiliario. ¿En qué isla estás interesado?'
    };
    
    const responseText = actionTexts[actionId as keyof typeof actionTexts] || 'Perfecto, te ayudo con eso.';
    speak(responseText);
  };

  // Speak using Web Speech API
  const speak = (line?: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }
    
    const textToSpeak = line || text || defaultLine;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    
    // Try to get Spanish voice
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => /es-|Spanish/i.test(v.lang));
    if (spanishVoice) {
      utter.voice = spanishVoice;
    }
    
    utter.rate = 0.9;
    utter.pitch = 1.1;
    
    utter.onstart = () => { 
      setSpeaking(true);
    };
    
    utter.onend = () => { 
      setSpeaking(false);
    };
    
    utter.onerror = () => {
      setSpeaking(false);
    };
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  if (!isVisible) return null;

  return (
    <div className={`avatar-3d-container relative ${className}`}>
      {/* 3D Avatar Canvas Container */}
      <div 
        className="relative w-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20"
        style={{ height: `${height}px` }}
      >
        <Canvas
          camera={{ position: [0, 1.55, 2.4], fov: 35 }}
          shadows
        >
          <Scene />
        </Canvas>

        {/* Loading State */}
        {!avatarLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-dark/80 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Cargando BlueEye Avatar...</p>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {speaking && (
            <div className="glass-card px-3 py-2 rounded-full flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-neon-teal animate-pulse" />
              <span className="text-white text-sm">Hablando...</span>
            </div>
          )}
          
          <div className="glass-card px-3 py-2 rounded-full">
            <span className="text-white text-sm">BlueEye Activo</span>
          </div>
        </div>
      </div>

      {/* Speech Controls */}
      <div className="mt-6 space-y-4">
        {/* Text Input and Speak Button */}
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe lo que dirá BlueEye..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal"
            onKeyPress={(e) => e.key === 'Enter' && speak()}
          />
          <button
            onClick={() => speak()}
            disabled={speaking}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              speaking 
                ? 'bg-red-500 text-white cursor-not-allowed'
                : 'bg-neon-teal text-blue-dark hover:bg-neon-teal/80'
            }`}
          >
            {speaking ? (
              <>
                <Volume2 className="w-5 h-5 animate-pulse" />
                Hablando...
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Hablar
              </>
            )}
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {avatarActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
                disabled={speaking}
              >
                <IconComponent className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm text-center">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Phrases */}
        <div className="flex flex-wrap gap-2">
          {[
            "¡Bienvenido a BlueEyeHomes!",
            "¿Te gustaría ver propiedades de lujo?",
            "Puedo ayudarte con el proceso legal",
            "¿Prefieres una visita virtual?"
          ].map((phrase, index) => (
            <button
              key={index}
              onClick={() => speak(phrase)}
              disabled={speaking}
              className="glass-card px-3 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Avatar3DFixed;
