import React, { useState, useEffect, useCallback } from 'react';
import { 
  Volume2, 
  MessageCircle,
  Calendar,
  Home,
  FileText,
  Phone
} from 'lucide-react';

interface Avatar3DProps {
  className?: string;
  height?: number;
  defaultLine?: string;
  onInteraction?: (action: string, data?: any) => void;
  isVisible?: boolean;
}

const Avatar3DInstant: React.FC<Avatar3DProps> = ({ 
  className = '', 
  height = 520,
  defaultLine = "¡Hola! Soy BlueEye, tu asesora virtual inmobiliaria. ¿En qué puedo ayudarte hoy?",
  onInteraction,
  isVisible = true 
}) => {
  const [text, setText] = useState(defaultLine);
  const [speaking, setSpeaking] = useState(false);
  const [ready, setReady] = useState(true); // Siempre listo

  // Fast speak function
  const speak = useCallback((line?: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }
    
    const textToSpeak = line || text || defaultLine;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configuración rápida sin buscar voces específicas
    utter.rate = 1.0;
    utter.pitch = 1.1;
    utter.volume = 0.8;
    
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }, [text, defaultLine]);

  // Handle avatar actions
  const handleAction = useCallback((actionId: string) => {
    console.log(`🎬 Avatar action: ${actionId}`);
    onInteraction?.(actionId);
    
    const responses = {
      'search-properties': 'Te ayudo a buscar propiedades en Canarias.',
      'schedule-visit': 'Perfecto, vamos a agendar una visita.',
      'legal-info': 'Te proporciono información legal completa.',
      'contact-agent': 'Te conecto con nuestro mejor agente.'
    };
    
    const response = responses[actionId as keyof typeof responses] || 'Perfecto, te ayudo.';
    speak(response);
  }, [speak, onInteraction]);

  if (!isVisible) return null;

  return (
    <div className={`avatar-container ${className}`}>
      {/* Avatar Display - Instant Load */}
      <div 
        className="relative w-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl border border-neon-teal/20"
        style={{ height: `${height}px` }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            {/* Avatar principal - carga instantánea */}
            <div className="relative mx-auto mb-6">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-neon-teal/50 shadow-2xl shadow-neon-teal/30">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2F17edddd60152463581993ed71a0f6614?format=webp&width=400"
                  alt="BlueEye"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Efectos visuales simples */}
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
            
            <h3 className="text-white text-2xl font-bold mb-2">BlueEye</h3>
            <p className="text-white/70">Asesora Virtual Inmobiliaria</p>
          </div>
        </div>

        {/* Status simple */}
        {speaking && (
          <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-full flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-neon-teal animate-pulse" />
            <span className="text-white text-sm">Hablando...</span>
          </div>
        )}
      </div>

      {/* Controles simplificados */}
      <div className="mt-6 space-y-4">
        {/* Input y botón principal */}
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

        {/* Botones de acción rápida */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleAction('search-properties')}
            disabled={speaking}
            className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
          >
            <Home className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm text-center">Buscar Propiedades</span>
          </button>
          
          <button
            onClick={() => handleAction('schedule-visit')}
            disabled={speaking}
            className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
          >
            <Calendar className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm text-center">Agendar Visita</span>
          </button>
          
          <button
            onClick={() => handleAction('legal-info')}
            disabled={speaking}
            className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
          >
            <FileText className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm text-center">Info Legal</span>
          </button>
          
          <button
            onClick={() => handleAction('contact-agent')}
            disabled={speaking}
            className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
          >
            <Phone className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm text-center">Contactar Agente</span>
          </button>
        </div>

        {/* Frases rápidas */}
        <div className="flex flex-wrap gap-2">
          {[
            "¡Bienvenido a BlueEyeHomes!",
            "¿Te gustaría ver propiedades?",
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

export default Avatar3DInstant;
