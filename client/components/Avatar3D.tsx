import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  MessageCircle,
  Calendar,
  Home,
  FileText,
  Phone
} from 'lucide-react';

interface Avatar3DProps {
  className?: string;
  onInteraction?: (action: string, data?: any) => void;
  isVisible?: boolean;
}

interface AvatarState {
  isListening: boolean;
  isSpeaking: boolean;
  currentEmotion: 'neutral' | 'happy' | 'thinking' | 'speaking';
  volume: number;
  isInitialized: boolean;
}

interface AvatarAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

interface VisemeData {
  time: number;
  phoneme: string;
  strength?: number;
}

interface MouthMap {
  [key: string]: number;
}

interface ThreeJSRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  avatar: THREE.Object3D | null;
  skinnedMesh: THREE.SkinnedMesh | null;
  mixer: THREE.AnimationMixer | null;
  clock: THREE.Clock;
  mouthMap: MouthMap;
  currentVisemes: Array<{ t: number; name: string; strength: number; }>;
  audio: HTMLAudioElement | null;
  t0: number;
}

const Avatar3D: React.FC<Avatar3DProps> = ({ 
  className = '', 
  onInteraction,
  isVisible = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [avatarState, setAvatarState] = useState<AvatarState>({
    isListening: false,
    isSpeaking: false,
    currentEmotion: 'neutral',
    volume: 0.8,
    isInitialized: false
  });

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

  // Initialize 3D Avatar (placeholder for three.js integration)
  useEffect(() => {
    if (!canvasRef.current || avatarState.isInitialized) return;

    // TODO: Initialize three.js scene here
    // This is where we'll integrate:
    // - Three.js scene setup
    // - GLB/GLTF model loading
    // - Animation system
    // - Lip sync system
    // - Eye tracking
    console.log('🤖 Initializing 3D Avatar...');
    
    // Simulate initialization
    setTimeout(() => {
      setAvatarState(prev => ({ ...prev, isInitialized: true }));
      console.log('✅ Avatar initialized');
    }, 1000);

    return () => {
      // Cleanup three.js resources
      console.log('🧹 Cleaning up 3D Avatar...');
    };
  }, [canvasRef.current]);

  // Handle avatar actions
  const handleAction = useCallback((actionId: string, data?: any) => {
    console.log(`🎬 Avatar action: ${actionId}`, data);
    
    // Update avatar emotion based on action
    setAvatarState(prev => ({ 
      ...prev, 
      currentEmotion: 'thinking' 
    }));

    // Trigger callback
    onInteraction?.(actionId, data);

    // Reset emotion after action
    setTimeout(() => {
      setAvatarState(prev => ({ 
        ...prev, 
        currentEmotion: 'neutral' 
      }));
    }, 2000);
  }, [onInteraction]);

  // Start/stop listening
  const toggleListening = useCallback(() => {
    setAvatarState(prev => {
      const newListening = !prev.isListening;
      console.log(newListening ? '🎤 Started listening...' : '🔇 Stopped listening');
      
      if (newListening) {
        // TODO: Start speech recognition
        // TODO: Start microphone capture
      } else {
        // TODO: Stop speech recognition
        // TODO: Stop microphone capture
      }
      
      return { ...prev, isListening: newListening };
    });
  }, []);

  // Simulate speaking (placeholder for TTS + lip sync)
  const speakText = useCallback(async (text: string) => {
    setAvatarState(prev => ({ ...prev, isSpeaking: true, currentEmotion: 'speaking' }));
    console.log('🗣️ Avatar speaking:', text);
    
    // TODO: Implement TTS + Lip Sync
    // 1. Send text to TTS (Coqui/Piper)
    // 2. Get audio + viseme data from Rhubarb
    // 3. Play audio and animate blendshapes
    // 4. Update avatar mouth movements
    
    // Simulate speaking duration
    const duration = text.length * 50; // ~50ms per character
    setTimeout(() => {
      setAvatarState(prev => ({ 
        ...prev, 
        isSpeaking: false, 
        currentEmotion: 'neutral' 
      }));
    }, Math.max(2000, duration));
  }, []);

  // Test avatar speech
  const testSpeech = () => {
    const greetings = [
      "¡Hola! Soy tu asistente inmobiliario virtual. ¿En qué puedo ayudarte hoy?",
      "Puedo ayudarte a encontrar la propiedad perfecta en las Islas Canarias.",
      "¿Te gustaría ver algunas propiedades disponibles o agendar una visita virtual?"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    speakText(randomGreeting);
  };

  if (!isVisible) return null;

  return (
    <div className={`avatar-3d-container relative ${className}`}>
      {/* 3D Avatar Canvas */}
      <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />
        
        {/* Loading State */}
        {!avatarState.isInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-dark/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Inicializando avatar 3D...</p>
            </div>
          </div>
        )}

        {/* Avatar Status Indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Listening indicator */}
          {avatarState.isListening && (
            <div className="glass-card px-3 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-white text-sm">Escuchando...</span>
            </div>
          )}
          
          {/* Speaking indicator */}
          {avatarState.isSpeaking && (
            <div className="glass-card px-3 py-2 rounded-full flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-neon-teal animate-pulse" />
              <span className="text-white text-sm">Hablando...</span>
            </div>
          )}
          
          {/* Emotion indicator */}
          <div className="glass-card px-3 py-2 rounded-full">
            <span className="text-white text-sm capitalize">
              {avatarState.currentEmotion}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="absolute top-4 right-4">
          <div className="glass-card p-2 rounded-full">
            <button 
              onClick={() => setAvatarState(prev => ({ 
                ...prev, 
                volume: prev.volume > 0 ? 0 : 0.8 
              }))}
              className="text-white hover:text-neon-teal transition-colors"
            >
              {avatarState.volume > 0 ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Controls */}
      <div className="mt-6 space-y-4">
        {/* Main Control - Voice Interaction */}
        <div className="flex justify-center">
          <button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              avatarState.isListening
                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30'
                : 'bg-neon-teal hover:bg-neon-teal/80 shadow-lg shadow-neon-teal/30'
            }`}
            disabled={avatarState.isSpeaking}
          >
            {avatarState.isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-blue-dark" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {avatarActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-2 group"
                disabled={avatarState.isSpeaking}
              >
                <IconComponent className="w-6 h-6 text-neon-teal group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm text-center">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Test Controls (Development) */}
        <div className="flex justify-center gap-3">
          <button
            onClick={testSpeech}
            className="btn-secondary px-6 py-2 text-sm"
            disabled={avatarState.isSpeaking}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Test Speech
          </button>
          
          <button
            onClick={() => console.log('Avatar state:', avatarState)}
            className="btn-secondary px-6 py-2 text-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Debug
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
