import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  MessageCircle,
  Calendar,
  Home,
  FileText,
  Phone,
  Play,
  Loader
} from 'lucide-react';

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

const Avatar3DFast: React.FC<Avatar3DProps> = ({ 
  className = '', 
  height = 520,
  defaultLine = "¡Hola! Soy BlueEye, tu asesora virtual inmobiliaria. ¿En qué puedo ayudarte hoy?",
  onInteraction,
  isVisible = true 
}) => {
  const [text, setText] = useState(defaultLine);
  const [speaking, setSpeaking] = useState(false);
  const [showFullAvatar, setShowFullAvatar] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

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

  // Fast speak function using Web Speech API
  const speak = (line?: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }
    
    const textToSpeak = line || text || defaultLine;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    
    // Try to get Spanish voice (faster lookup)
    if (voicesLoaded) {
      const voices = speechSynthesis.getVoices();
      const spanishVoice = voices.find((v) => v.lang.startsWith('es'));
      if (spanishVoice) {
        utter.voice = spanishVoice;
      }
    }
    
    utter.rate = 1.0;
    utter.pitch = 1.1;
    utter.volume = 0.8;
    
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

  // Load full 3D avatar on demand
  const loadFullAvatar = () => {
    setShowFullAvatar(true);
  };

  if (!isVisible) return null;

  return (
    <div className={`avatar-3d-container relative ${className}`}>
      {/* Avatar Display Area */}
      <div 
        className="relative w-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20"
        style={{ height: `${height}px` }}
      >
        {!showFullAvatar ? (
          // Fast Loading Placeholder Avatar
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {/* Avatar Image - Using professional image as avatar */}
              <div className="relative mx-auto mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-neon-teal/50 shadow-2xl shadow-neon-teal/30">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2F17edddd60152463581993ed71a0f6614?format=webp&width=800"
                    alt="BlueEye Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-neon-teal/30 animate-ping"></div>
                <div className="absolute -inset-4 rounded-full border border-neon-emerald/20 animate-pulse"></div>
                
                {/* Speaking indicator */}
                {speaking && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="text-white text-2xl font-bold mb-3">BlueEye</h3>
              <p className="text-white/70 mb-6">Tu Asesora Virtual Inmobiliaria</p>
              
              {/* Load 3D Button */}
              <button
                onClick={loadFullAvatar}
                className="btn-secondary px-6 py-3 flex items-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                Activar Avatar 3D
              </button>
            </div>
          </div>
        ) : (
          // Full 3D Avatar (lazy loaded)
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Cargando Avatar 3D...</p>
              <p className="text-white/50 text-sm mt-2">Esto puede tardar unos segundos</p>
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
            <span className="text-white text-sm">
              {voicesLoaded ? '✓ Voz Lista' : '⏳ Cargando voz...'}
            </span>
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
            disabled={speaking || !voicesLoaded}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              speaking || !voicesLoaded
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-neon-teal text-blue-dark hover:bg-neon-teal/80'
            }`}
          >
            {speaking ? (
              <>
                <Volume2 className="w-5 h-5 animate-pulse" />
                Hablando...
              </>
            ) : !voicesLoaded ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Cargando...
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
              disabled={speaking || !voicesLoaded}
              className="glass-card px-3 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Avatar3DFast;
