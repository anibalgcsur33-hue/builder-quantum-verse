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

const Avatar3D: React.FC<Avatar3DProps> = ({ 
  className = '', 
  height = 520,
  autoRotate = true,
  defaultLine = "Hola, soy BlueEye, tu asesora virtual inmobiliaria. ¿Quieres explorar propiedades verificadas en Canarias?",
  onInteraction,
  isVisible = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const headRef = useRef<THREE.Object3D | null>(null);
  const meshRef = useRef<THREE.SkinnedMesh | null>(null);
  const jawIndexRef = useRef(-1);
  const speakingRef = useRef(false);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  const [ready, setReady] = useState(false);
  const [text, setText] = useState(defaultLine);
  const [speaking, setSpeaking] = useState(false);

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

  // Initialize 3D Avatar with BlueEye implementation
  useEffect(() => {
    if (!containerRef.current) return;

    const root = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, root.clientWidth / height, 0.1, 100);
    camera.position.set(0, 1.55, 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(renderer.domElement);

    // Lighting setup
    const hemi = new THREE.HemisphereLight(0xffffff, 0x303040, 0.8);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2, 3, 1.5);
    key.castShadow = true;
    key.shadow.mapSize.width = 2048;
    key.shadow.mapSize.height = 2048;
    scene.add(key);

    // Floor with shadows
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.5, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // Load Ready Player Me avatar
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_URL,
      (gltf) => {
        const avatar = gltf.scene;
        
        avatar.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            if (o instanceof THREE.SkinnedMesh && !meshRef.current) {
              meshRef.current = o;
            }
          }
          if (o instanceof THREE.Bone && !headRef.current && o.name.toLowerCase().includes("head")) {
            headRef.current = o;
          }
        });
        
        scene.add(avatar);

        // Map basic blendshapes
        const dict = meshRef.current?.morphTargetDictionary || {};
        if (dict["jawOpen"] !== undefined) {
          jawIndexRef.current = dict["jawOpen"];
        }

        // Play idle animation if available
        if (gltf.animations?.length) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.loop = THREE.LoopRepeat;
          idle.play();
        }

        setReady(true);
        console.log('✅ BlueEye avatar loaded successfully');
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (err) => {
        console.error("Error loading GLB:", err);
      }
    );

    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = clockRef.current.getDelta();
      
      // Update animation mixer
      mixerRef.current && mixerRef.current.update(dt);

      // Subtle head movement for life-like appearance
      if (headRef.current) {
        headRef.current.rotation.y += Math.sin(performance.now() * 0.001) * 0.002;
      }

      // Jaw movement simulation when speaking
      if (speakingRef.current && meshRef.current?.morphTargetInfluences && jawIndexRef.current >= 0) {
        meshRef.current.morphTargetInfluences[jawIndexRef.current] =
          (Math.sin(performance.now() * 0.03) * 0.5 + 0.5) * 0.6;
      } else if (meshRef.current?.morphTargetInfluences && jawIndexRef.current >= 0) {
        // Close mouth when not speaking
        meshRef.current.morphTargetInfluences[jawIndexRef.current] *= 0.95;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer || !root) return;
      
      camera.aspect = root.clientWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(root.clientWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      
      if (renderer && root.contains(renderer.domElement)) {
        root.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [height, autoRotate]);

  // Speak using Web Speech API (browser native voice synthesis)
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
      speakingRef.current = true; 
      setSpeaking(true);
    };
    
    utter.onend = () => { 
      speakingRef.current = false; 
      setSpeaking(false);
    };
    
    utter.onerror = () => {
      speakingRef.current = false; 
      setSpeaking(false);
    };
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Reset camera position
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Toggle auto rotation
  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`avatar-3d-container relative ${className}`}>
      {/* 3D Avatar Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20 rounded-2xl overflow-hidden border border-neon-teal/20"
        style={{ height: `${height}px` }}
      >
        {/* Loading State */}
        {!ready && (
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
          
          {ready && (
            <div className="glass-card px-3 py-2 rounded-full">
              <span className="text-white text-sm">BlueEye Activo</span>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button 
            onClick={resetCamera}
            className="glass-card p-2 rounded-full text-white hover:text-neon-teal transition-colors"
            title="Resetear Cámara"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleAutoRotate}
            className="glass-card p-2 rounded-full text-white hover:text-neon-teal transition-colors"
            title="Auto Rotación"
          >
            <Volume2 className="w-5 h-5" />
          </button>
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

export default Avatar3D;
