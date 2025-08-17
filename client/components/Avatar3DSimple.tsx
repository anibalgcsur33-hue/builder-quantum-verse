import React, { useRef, useEffect, useState } from 'react';

interface Avatar3DProps {
  className?: string;
  height?: number;
  autoRotate?: boolean;
  defaultLine?: string;
  onInteraction?: (action: string, data?: any) => void;
  isVisible?: boolean;
}

const Avatar3DSimple: React.FC<Avatar3DProps> = ({ 
  className = '', 
  height = 520,
  defaultLine = "¡Hola! Soy BlueEye, tu asesora virtual inmobiliaria.",
  isVisible = true 
}) => {
  const [text, setText] = useState(defaultLine);
  const [speaking, setSpeaking] = useState(false);

  // Simple speak function using Web Speech API
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
      {/* Placeholder for 3D Avatar */}
      <div 
        className="relative w-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20 flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <div className="w-32 h-32 bg-neon-teal/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-4xl">🤖</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">BlueEye Avatar</h3>
          <p className="text-white/70">Avatar 3D se cargará aquí</p>
          {speaking && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-neon-teal rounded-full animate-ping"></div>
              <span className="text-neon-teal text-sm">Hablando...</span>
            </div>
          )}
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
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              speaking 
                ? 'bg-red-500 text-white cursor-not-allowed'
                : 'bg-neon-teal text-blue-dark hover:bg-neon-teal/80'
            }`}
          >
            {speaking ? 'Hablando...' : 'Hablar'}
          </button>
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

export default Avatar3DSimple;
