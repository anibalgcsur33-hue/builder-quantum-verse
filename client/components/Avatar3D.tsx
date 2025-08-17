import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Volume2,
  VolumeX,
  MessageCircle,
  Calendar,
  Home,
  FileText,
  Phone,
  RotateCcw
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
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<ThreeJSRefs>({
    scene: null,
    camera: null,
    renderer: null,
    avatar: null,
    skinnedMesh: null,
    mixer: null,
    clock: new THREE.Clock(),
    mouthMap: {},
    currentVisemes: [],
    audio: null,
    t0: 0
  });
  const animationFrameRef = useRef<number>();

  const [avatarState, setAvatarState] = useState<AvatarState>({
    isListening: false,
    isSpeaking: false,
    currentEmotion: 'neutral',
    volume: 0.8,
    isInitialized: false
  });

  // Viseme mapping for lip sync
  const mapVisemes = useCallback((mesh: THREE.SkinnedMesh): MouthMap => {
    const names = mesh.morphTargetDictionary || {};
    const find = (candidates: string[]) => candidates.find(n => n in names);
    
    return {
      "AA": names[find(["viseme_aa", "AA", "aah"]) || ""] ?? -1,
      "O":  names[find(["viseme_oh", "O", "oh"]) || ""] ?? -1,
      "E":  names[find(["viseme_ee", "E", "ee"]) || ""] ?? -1,
      "U":  names[find(["viseme_uw", "U", "oo"]) || ""] ?? -1,
      "M":  names[find(["viseme_mbp", "M", "mbp"]) || ""] ?? -1,
      "L":  names[find(["viseme_l", "L"]) || ""] ?? -1,
      "WQ": names[find(["viseme_w", "WQ"]) || ""] ?? -1,
      "CH": names[find(["viseme_ch", "CH", "tCH"]) || ""] ?? -1,
      "FV": names[find(["viseme_fv", "FV"]) || ""] ?? -1
    };
  }, []);

  // Apply visemes for lip sync
  const applyVisemes = useCallback((t: number) => {
    const { skinnedMesh, mouthMap, currentVisemes } = threeRef.current;
    if (!skinnedMesh || !skinnedMesh.morphTargetInfluences) return;

    // General decay
    const influences = skinnedMesh.morphTargetInfluences;
    for (let i = 0; i < influences.length; i++) {
      influences[i] = Math.max(0, influences[i] - 0.15);
    }

    // Apply current viseme
    const viseme = currentVisemes.find(v => Math.abs(v.t - t) < 0.06);
    if (!viseme) return;

    const idx = mouthMap[viseme.name];
    if (idx >= 0) {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      influences[idx] = Math.min(1, lerp(influences[idx], viseme.strength ?? 0.8, 0.8));
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const refs = threeRef.current;
    if (!refs.scene || !refs.camera || !refs.renderer) return;

    animationFrameRef.current = requestAnimationFrame(animate);
    
    const dt = refs.clock.getDelta();
    refs.mixer?.update(dt);

    // Living gaze: subtle head oscillation
    if (refs.avatar) {
      const head = refs.avatar.getObjectByName("Head") || refs.avatar;
      head.rotation.y = Math.sin(performance.now() * 0.0006) * 0.08;
      head.rotation.x = Math.sin(performance.now() * 0.0004) * 0.03;
    }

    // Apply lip sync if speaking
    if (refs.audio && !refs.audio.paused) {
      const t = (performance.now() - refs.t0) / 1000;
      applyVisemes(t);
    }

    refs.renderer.render(refs.scene, refs.camera);
  }, [applyVisemes]);

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

  // Initialize 3D Avatar with three.js
  useEffect(() => {
    if (!containerRef.current || avatarState.isInitialized) return;

    const container = containerRef.current;
    const refs = threeRef.current;

    console.log('🤖 Initializing 3D Avatar...');

    // Setup three.js scene
    refs.scene = new THREE.Scene();
    refs.camera = new THREE.PerspectiveCamera(
      35, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      100
    );
    refs.camera.position.set(0, 1.5, 2.3);

    refs.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    refs.renderer.setSize(container.clientWidth, container.clientHeight);
    refs.renderer.shadowMap.enabled = true;
    refs.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(refs.renderer.domElement);

    // Lighting setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x202025, 0.7);
    refs.scene.add(hemiLight);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 1.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    refs.scene.add(keyLight);

    // Floor plane
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.25 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    refs.scene.add(floor);

    // Load avatar GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/avatar.glb',
      (gltf) => {
        refs.avatar = gltf.scene;
        
        // Setup shadows and find skinned mesh
        refs.avatar.traverse((child) => {
          child.castShadow = true;
          if (child instanceof THREE.SkinnedMesh) {
            refs.skinnedMesh = child;
          }
        });
        
        refs.scene!.add(refs.avatar);
        refs.mixer = new THREE.AnimationMixer(refs.avatar);

        // Play idle animation if available
        if (gltf.animations?.length > 0) {
          const idleAction = refs.mixer.clipAction(gltf.animations[0]);
          idleAction.loop = THREE.LoopRepeat;
          idleAction.play();
        }

        // Map blendshapes for lip sync
        if (refs.skinnedMesh && refs.skinnedMesh.morphTargetDictionary) {
          refs.mouthMap = mapVisemes(refs.skinnedMesh);
          console.log('🗣️ Mouth mapping:', refs.mouthMap);
        }

        setAvatarState(prev => ({ ...prev, isInitialized: true }));
        console.log('✅ Avatar loaded and initialized');
        
        // Start animation loop
        animate();
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading avatar:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !container) return;
      
      refs.camera.aspect = container.clientWidth / container.clientHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup three.js resources
      console.log('🧹 Cleaning up 3D Avatar...');
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (refs.renderer && container.contains(refs.renderer.domElement)) {
        container.removeChild(refs.renderer.domElement);
        refs.renderer.dispose();
      }
      
      if (refs.audio) {
        refs.audio.pause();
        refs.audio = null;
      }
    };
  }, [mapVisemes, animate]);

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

  // Speak function with TTS and lip sync
  const speakText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setAvatarState(prev => ({ ...prev, isSpeaking: true, currentEmotion: 'speaking' }));
    console.log('🗣️ Avatar speaking:', text);

    try {
      const refs = threeRef.current;
      
      // 1. Get audio from TTS endpoint
      const audioResponse = await fetch(`/api/speak?text=${encodeURIComponent(text)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!audioResponse.ok) {
        throw new Error('TTS request failed');
      }
      
      const audioBlob = await audioResponse.blob();
      
      // 2. Get visemes from lip sync endpoint
      const formData = new FormData();
      formData.append('audio', audioBlob, 'speech.wav');
      
      const visemeResponse = await fetch('/api/visemes', {
        method: 'POST',
        body: formData
      });
      
      if (!visemeResponse.ok) {
        throw new Error('Viseme request failed');
      }
      
      const visemeData: VisemeData[] = await visemeResponse.json();
      
      // 3. Prepare viseme data for animation
      refs.currentVisemes = visemeData.map(d => ({
        t: d.time,
        name: d.phoneme,
        strength: d.strength ?? 0.9
      }));
      
      // 4. Play audio and start lip sync
      if (refs.audio) {
        refs.audio.pause();
        refs.audio.remove();
      }
      
      refs.audio = new Audio(URL.createObjectURL(audioBlob));
      refs.audio.volume = avatarState.volume;
      
      refs.audio.onplay = () => {
        refs.t0 = performance.now();
      };
      
      refs.audio.onended = () => {
        setAvatarState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          currentEmotion: 'neutral' 
        }));
        refs.currentVisemes = [];
      };
      
      refs.audio.onerror = () => {
        console.error('Audio playback error');
        setAvatarState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          currentEmotion: 'neutral' 
        }));
      };
      
      await refs.audio.play();
      
    } catch (error) {
      console.error('Error in speakText:', error);
      setAvatarState(prev => ({ 
        ...prev, 
        isSpeaking: false, 
        currentEmotion: 'neutral' 
      }));
      
      // Fallback: simulate speaking without audio
      setTimeout(() => {
        setAvatarState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          currentEmotion: 'neutral' 
        }));
      }, text.length * 50);
    }
  }, [avatarState.volume]);

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
      {/* 3D Avatar Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20"
        style={{ width: '100%', height: '520px' }}
      >
        {/* Loading State */}
        {!avatarState.isInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-dark/80 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Inicializando avatar 3D...</p>
            </div>
          </div>
        )}

        {/* Avatar Status Indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
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
        <div className="absolute top-4 right-4 z-20">
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
