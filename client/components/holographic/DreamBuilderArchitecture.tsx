import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Mic,
  Brain,
  Home,
  Sparkles,
  Zap,
  Heart,
  Smile,
  Frown,
  Meh,
  Star,
} from "lucide-react";

interface EmotionalState {
  emotion:
    | "joy"
    | "love"
    | "excitement"
    | "calm"
    | "melancholy"
    | "energy"
    | "wonder";
  intensity: number; // 0-1
  color_primary: string;
  color_secondary: string;
  architecture_style: string;
  particle_behavior: string;
}

interface DreamComponent {
  id: string;
  name: string;
  type: "foundation" | "walls" | "roof" | "windows" | "garden" | "luxury_addon";
  emotional_trigger: string;
  growth_pattern: "organic" | "geometric" | "fluid" | "crystalline";
  current_scale: number;
  target_scale: number;
  color_shift: number;
}

interface VoiceCommand {
  text: string;
  detected_emotion: EmotionalState["emotion"];
  confidence: number;
  timestamp: number;
  architecture_response: string;
}

const emotionalStates: Record<string, EmotionalState> = {
  joy: {
    emotion: "joy",
    intensity: 0.8,
    color_primary: "#FFD700",
    color_secondary: "#FFA500",
    architecture_style: "Luminous crystalline with golden spirals",
    particle_behavior: "Dancing sparkles ascending",
  },
  love: {
    emotion: "love",
    intensity: 0.9,
    color_primary: "#FF69B4",
    color_secondary: "#FF1493",
    architecture_style: "Flowing organic forms with heart motifs",
    particle_behavior: "Gentle hearts floating romantically",
  },
  excitement: {
    emotion: "excitement",
    intensity: 1.0,
    color_primary: "#00E7A7",
    color_secondary: "#0EE7E7",
    architecture_style: "Dynamic angular spires reaching skyward",
    particle_behavior: "Electric bolts and energy streams",
  },
  calm: {
    emotion: "calm",
    intensity: 0.4,
    color_primary: "#87CEEB",
    color_secondary: "#4682B4",
    architecture_style: "Serene flowing lines with water features",
    particle_behavior: "Gentle mist and floating bubbles",
  },
  melancholy: {
    emotion: "melancholy",
    intensity: 0.6,
    color_primary: "#6A5ACD",
    color_secondary: "#483D8B",
    architecture_style: "Contemplative curves with deep shadows",
    particle_behavior: "Slow droplets and misty veils",
  },
  energy: {
    emotion: "energy",
    intensity: 0.95,
    color_primary: "#FF6B9D",
    color_secondary: "#FF4500",
    architecture_style: "Explosive geometric patterns with motion",
    particle_behavior: "Rapid spirals and energy bursts",
  },
  wonder: {
    emotion: "wonder",
    intensity: 0.7,
    color_primary: "#A855F7",
    color_secondary: "#8B5CF6",
    architecture_style: "Mystical floating elements with portals",
    particle_behavior: "Mysterious glowing orbs",
  },
};

const dreamComponents: DreamComponent[] = [
  {
    id: "foundation",
    name: "Cimientos Emocionales",
    type: "foundation",
    emotional_trigger: "stability, security, grounding",
    growth_pattern: "geometric",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
  {
    id: "walls_main",
    name: "Paredes del Alma",
    type: "walls",
    emotional_trigger: "protection, warmth, belonging",
    growth_pattern: "organic",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
  {
    id: "roof_dreams",
    name: "Techo de Sueños",
    type: "roof",
    emotional_trigger: "aspiration, hope, skyward thinking",
    growth_pattern: "fluid",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
  {
    id: "windows_soul",
    name: "Ventanas del Espíritu",
    type: "windows",
    emotional_trigger: "openness, light, connection",
    growth_pattern: "crystalline",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
  {
    id: "garden_emotions",
    name: "Jardín de Emociones",
    type: "garden",
    emotional_trigger: "growth, life, natural beauty",
    growth_pattern: "organic",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
  {
    id: "luxury_tower",
    name: "Torre de Lujo Infinito",
    type: "luxury_addon",
    emotional_trigger: "achievement, elegance, transcendence",
    growth_pattern: "crystalline",
    current_scale: 0,
    target_scale: 1,
    color_shift: 0,
  },
];

export default function DreamBuilderArchitecture() {
  const builderRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionalState>(
    emotionalStates.calm,
  );
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [components, setComponents] =
    useState<DreamComponent[]>(dreamComponents);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const liquidCrystalParticles = useRef<THREE.Points[]>([]);
  const architecturalMeshes = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (!builderRef.current) return;

    // Configuración ultra-futurista para Dream Builder emocional
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.8;

    builderRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear sistema de partículas de cristal líquido
    const createLiquidCrystalSystem = (emotion: EmotionalState) => {
      const particleCount = 2000;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Distribución inicial en nube
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = Math.random() * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

        // Velocidades según emoción
        velocities[i * 3] = (Math.random() - 0.5) * emotion.intensity;
        velocities[i * 3 + 1] = Math.random() * emotion.intensity * 2;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * emotion.intensity;

        scales[i] = Math.random() * 0.5 + 0.2;
      }

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      particleGeometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velocities, 3),
      );
      particleGeometry.setAttribute(
        "scale",
        new THREE.BufferAttribute(scales, 1),
      );

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          emotion_color: { value: new THREE.Color(emotion.color_primary) },
          emotion_secondary: {
            value: new THREE.Color(emotion.color_secondary),
          },
          emotion_intensity: { value: emotion.intensity },
          building_progress: { value: 0 },
        },
        vertexShader: `
          attribute vec3 velocity;
          attribute float scale;
          
          uniform float time;
          uniform float emotion_intensity;
          uniform float building_progress;
          
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vec3 pos = position;
            
            // Movimiento emocional de partículas
            pos += velocity * time * emotion_intensity;
            
            // Convergencia hacia arquitectura durante construcción
            if (building_progress > 0.0) {
              vec3 target = vec3(0.0, pos.y * 0.5, 0.0);
              pos = mix(pos, target, building_progress * 0.3);
            }
            
            // Flotación con patrones emocionales
            pos.y += sin(time * 2.0 + length(position.xz) * 0.1) * emotion_intensity;
            pos.x += cos(time + position.y * 0.1) * emotion_intensity * 0.5;
            pos.z += sin(time * 1.5 + position.x * 0.1) * emotion_intensity * 0.5;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Tamaño según emoción y construcción
            float finalScale = scale * (emotion_intensity + building_progress);
            gl_PointSize = finalScale * 50.0 * (1.0 / -mvPosition.z);
            
            vAlpha = 0.6 + emotion_intensity * 0.4;
          }
        `,
        fragmentShader: `
          uniform vec3 emotion_color;
          uniform vec3 emotion_secondary;
          uniform float time;
          uniform float emotion_intensity;
          
          varying float vAlpha;
          
          void main() {
            // Patrón cristalino
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            // Efecto de cristal líquido
            float crystal = 1.0 - dist * 2.0;
            crystal = pow(crystal, 2.0);
            
            // Pulsación emocional
            float pulse = sin(time * 4.0 + dist * 10.0) * 0.3 + 0.7;
            
            // Color emocional dinámico
            vec3 finalColor = mix(emotion_color, emotion_secondary, 
                                 sin(time + dist * 5.0) * 0.5 + 0.5);
            
            finalColor *= crystal * pulse * emotion_intensity;
            
            gl_FragColor = vec4(finalColor, vAlpha * crystal);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(particleGeometry, particleMaterial);
    };

    // Inicializar sistema de partículas
    const liquidCrystal = createLiquidCrystalSystem(currentEmotion);
    scene.add(liquidCrystal);
    liquidCrystalParticles.current = [liquidCrystal];

    // Crear arquitectura emocional procedural
    const createEmotionalArchitecture = (
      component: DreamComponent,
      emotion: EmotionalState,
    ) => {
      const group = new THREE.Group();

      let geometry: THREE.BufferGeometry;

      // Geometría según tipo de componente y patrón emocional
      switch (component.type) {
        case "foundation":
          geometry =
            component.growth_pattern === "geometric"
              ? new THREE.BoxGeometry(20, 2, 20)
              : new THREE.CylinderGeometry(15, 18, 2, 16);
          break;

        case "walls":
          geometry =
            component.growth_pattern === "organic"
              ? new THREE.CylinderGeometry(12, 15, 8, 12)
              : new THREE.BoxGeometry(18, 8, 18);
          break;

        case "roof":
          geometry =
            component.growth_pattern === "fluid"
              ? new THREE.SphereGeometry(
                  10,
                  16,
                  8,
                  0,
                  Math.PI * 2,
                  0,
                  Math.PI / 2,
                )
              : new THREE.ConeGeometry(12, 6, 8);
          break;

        case "windows":
          // Crear múltiples ventanas
          for (let i = 0; i < 8; i++) {
            const windowGeom = new THREE.PlaneGeometry(2, 3);
            const windowMat = new THREE.ShaderMaterial({
              uniforms: {
                time: { value: 0 },
                window_glow: { value: new THREE.Color(emotion.color_primary) },
              },
              vertexShader: `
                varying vec2 vUv;
                uniform float time;
                
                void main() {
                  vUv = uv;
                  vec3 pos = position;
                  pos.z += sin(time + uv.y * 3.0) * 0.1;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
              `,
              fragmentShader: `
                uniform float time;
                uniform vec3 window_glow;
                varying vec2 vUv;
                
                void main() {
                  float glow = sin(time + vUv.y * 5.0) * 0.3 + 0.7;
                  vec3 color = window_glow * glow;
                  gl_FragColor = vec4(color, 0.8);
                }
              `,
              transparent: true,
            });

            const window = new THREE.Mesh(windowGeom, windowMat);
            const angle = (i / 8) * Math.PI * 2;
            window.position.set(Math.cos(angle) * 9, 4, Math.sin(angle) * 9);
            window.lookAt(0, 4, 0);
            group.add(window);
          }
          return group;

        case "garden":
          // Crear jardín con múltiples elementos orgánicos
          for (let i = 0; i < 20; i++) {
            const plantGeom = new THREE.ConeGeometry(
              0.5,
              Math.random() * 3 + 1,
              6,
            );
            const plantMat = new THREE.MeshPhongMaterial({
              color: new THREE.Color(emotion.color_secondary),
            });
            const plant = new THREE.Mesh(plantGeom, plantMat);
            plant.position.set(
              (Math.random() - 0.5) * 30,
              0,
              (Math.random() - 0.5) * 30,
            );
            group.add(plant);
          }
          return group;

        case "luxury_addon":
          geometry = new THREE.CylinderGeometry(2, 4, 15, 8);
          break;

        default:
          geometry = new THREE.BoxGeometry(5, 5, 5);
      }

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          emotion_color: { value: new THREE.Color(emotion.color_primary) },
          emotion_secondary: {
            value: new THREE.Color(emotion.color_secondary),
          },
          growth_progress: { value: 0 },
          emotion_intensity: { value: emotion.intensity },
        },
        vertexShader: `
          uniform float time;
          uniform float growth_progress;
          uniform float emotion_intensity;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normal;
            
            // Crecimiento emocional
            vec3 pos = position * growth_progress;
            
            // Deformación según intensidad emocional
            pos += normal * sin(time + length(position) * 0.5) * emotion_intensity * 0.2;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 emotion_color;
          uniform vec3 emotion_secondary;
          uniform float growth_progress;
          uniform float emotion_intensity;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            // Color emocional dinámico
            float colorShift = sin(time + length(vPosition) * 0.3) * 0.5 + 0.5;
            vec3 baseColor = mix(emotion_color, emotion_secondary, colorShift);
            
            // Intensidad según crecimiento
            baseColor *= growth_progress * emotion_intensity;
            
            // Efecto de materialización
            float materialization = smoothstep(0.0, 1.0, growth_progress);
            materialization *= sin(time * 3.0 + length(vPosition)) * 0.2 + 0.8;
            
            // Lighting emocional
            float light = max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.3);
            
            vec3 finalColor = baseColor * light * materialization;
            float alpha = growth_progress * 0.9;
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      return group;
    };

    // Crear componentes arquitectónicos iniciales
    components.forEach((component, index) => {
      const archGroup = createEmotionalArchitecture(component, currentEmotion);
      archGroup.position.y = index * 2; // Espaciado vertical
      archGroup.userData = { component, originalY: index * 2 };
      scene.add(archGroup);
      architecturalMeshes.current.push(archGroup);
    });

    // Fondo emocional con gradiente atmosférico
    const atmosphereGeometry = new THREE.SphereGeometry(200, 32, 16);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        emotion_color: { value: new THREE.Color(currentEmotion.color_primary) },
        emotion_intensity: { value: currentEmotion.intensity },
      },
      vertexShader: `
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 emotion_color;
        uniform float emotion_intensity;
        
        varying vec3 vPosition;
        
        void main() {
          float dist = length(vPosition);
          vec3 color = emotion_color * emotion_intensity;
          
          // Gradiente atmosférico
          float gradient = 1.0 - (dist / 200.0);
          gradient = pow(gradient, 2.0);
          
          float alpha = gradient * 0.1 * emotion_intensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Iluminación emocional dinámica
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const emotionalLight = new THREE.PointLight(
      new THREE.Color(currentEmotion.color_primary),
      currentEmotion.intensity * 5,
      100,
    );
    emotionalLight.position.set(0, 20, 0);
    scene.add(emotionalLight);

    const supportLight1 = new THREE.DirectionalLight(
      new THREE.Color(currentEmotion.color_secondary),
      currentEmotion.intensity * 3,
    );
    supportLight1.position.set(30, 30, 30);
    scene.add(supportLight1);

    const supportLight2 = new THREE.DirectionalLight(
      new THREE.Color(currentEmotion.color_primary),
      currentEmotion.intensity * 2,
    );
    supportLight2.position.set(-30, 20, -30);
    scene.add(supportLight2);

    // Posicionar cámara para vista cinematográfica
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 10, 0);

    // Loop de animación emocional
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.015;

      // Actualizar partículas de cristal líquido
      liquidCrystalParticles.current.forEach((particles) => {
        if (particles.material instanceof THREE.ShaderMaterial) {
          particles.material.uniforms.time.value = time;
          particles.material.uniforms.building_progress.value = buildProgress;
        }
      });

      // Actualizar arquitectura emocional
      architecturalMeshes.current.forEach((group, index) => {
        const component = components[index];

        // Actualizar crecimiento
        group.children.forEach((child) => {
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
            child.material.uniforms.growth_progress.value =
              component.current_scale;
          }
        });

        // Flotación emocional
        group.position.y =
          group.userData.originalY +
          Math.sin(time + index) * currentEmotion.intensity * 0.5;

        // Rotación según intensidad emocional
        group.rotation.y += currentEmotion.intensity * 0.001;
      });

      // Actualizar atmósfera emocional
      if (atmosphereMaterial.uniforms) {
        atmosphereMaterial.uniforms.time.value = time;
        atmosphereMaterial.uniforms.emotion_color.value.setHex(
          parseInt(currentEmotion.color_primary.replace("#", ""), 16),
        );
        atmosphereMaterial.uniforms.emotion_intensity.value =
          currentEmotion.intensity;
      }

      // Actualizar luces emocionales
      emotionalLight.color.setHex(
        parseInt(currentEmotion.color_primary.replace("#", ""), 16),
      );
      emotionalLight.intensity = currentEmotion.intensity * 5;

      supportLight1.color.setHex(
        parseInt(currentEmotion.color_secondary.replace("#", ""), 16),
      );
      supportLight1.intensity = currentEmotion.intensity * 3;

      // Movimiento de luces según emoción
      emotionalLight.position.x =
        Math.cos(time * currentEmotion.intensity) * 10;
      emotionalLight.position.z =
        Math.sin(time * currentEmotion.intensity) * 10;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (builderRef.current && renderer.domElement) {
        builderRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentEmotion, buildProgress, components]);

  // Simulación de reconocimiento de voz y análisis emocional
  const startVoiceRecognition = () => {
    setIsListening(true);

    // Simulación de comando de voz después de 3 segundos
    setTimeout(() => {
      const emotions = Object.keys(emotionalStates);
      const randomEmotion = emotions[
        Math.floor(Math.random() * emotions.length)
      ] as keyof typeof emotionalStates;
      const newEmotion = emotionalStates[randomEmotion];

      const mockCommand: VoiceCommand = {
        text: `I want a ${newEmotion.architecture_style.toLowerCase()} with ${newEmotion.particle_behavior.toLowerCase()}`,
        detected_emotion: randomEmotion,
        confidence: 0.85 + Math.random() * 0.15,
        timestamp: Date.now(),
        architecture_response: `Building ${newEmotion.architecture_style} based on ${randomEmotion} emotion detected`,
      };

      setVoiceCommands((prev) => [...prev, mockCommand]);
      setCurrentEmotion(newEmotion);
      startBuildingProcess();
      setIsListening(false);
    }, 3000);
  };

  const startBuildingProcess = () => {
    setIsBuilding(true);
    setBuildProgress(0);

    // Animar crecimiento de componentes
    const buildInterval = setInterval(() => {
      setBuildProgress((prev) => {
        const newProgress = prev + 0.02;

        // Actualizar escala de componentes
        setComponents((prevComponents) =>
          prevComponents.map((comp) => ({
            ...comp,
            current_scale: Math.min(newProgress, comp.target_scale),
          })),
        );

        if (newProgress >= 1) {
          clearInterval(buildInterval);
          setIsBuilding(false);
          return 1;
        }
        return newProgress;
      });
    }, 50);
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "joy":
        return <Smile className="w-5 h-5 text-yellow-400" />;
      case "love":
        return <Heart className="w-5 h-5 text-pink-400" />;
      case "excitement":
        return <Zap className="w-5 h-5 text-green-400" />;
      case "calm":
        return <Meh className="w-5 h-5 text-blue-400" />;
      case "melancholy":
        return <Frown className="w-5 h-5 text-purple-400" />;
      case "energy":
        return <Star className="w-5 h-5 text-orange-400" />;
      case "wonder":
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      default:
        return <Brain className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Header del Dream Builder */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="builder-title">
          <h1 className="text-4xl font-bold dream-text mb-2">
            Dream Builder IA
          </h1>
          <p className="text-white/80 text-lg">
            Arquitectura Emocional • Cristal Líquido • Construcción Mental • IA
            Narrativa
          </p>
        </div>

        {/* Controles de construcción emocional */}
        <div className="builder-controls">
          <button
            onClick={startVoiceRecognition}
            disabled={isListening || isBuilding}
            className={`voice-btn ${isListening ? "listening" : ""} ${isBuilding ? "building" : ""}`}
          >
            <Mic className="w-6 h-6" />
            <span>
              {isListening
                ? "Escuchando..."
                : isBuilding
                  ? "Construyendo..."
                  : "Hablar al IA"}
            </span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal del constructor */}
      <div ref={builderRef} className="absolute inset-0 z-10" />

      {/* Panel de estado emocional actual */}
      <div className="absolute bottom-8 left-8 z-20 emotion-panel">
        <div className="emotion-header">
          <div
            className="emotion-avatar"
            style={{
              backgroundColor: currentEmotion.color_primary + "30",
              borderColor: currentEmotion.color_primary,
            }}
          >
            {getEmotionIcon(currentEmotion.emotion)}
          </div>

          <div className="emotion-info">
            <h3 className="text-2xl font-bold text-white mb-1">
              Emoción:{" "}
              {currentEmotion.emotion.charAt(0).toUpperCase() +
                currentEmotion.emotion.slice(1)}
            </h3>
            <p className="text-white/70 text-sm mb-2">
              {currentEmotion.architecture_style}
            </p>

            <div className="emotion-intensity">
              <span className="text-sm text-white/60">
                Intensidad Emocional
              </span>
              <div className="intensity-bar">
                <div
                  className="intensity-fill"
                  style={{
                    width: `${currentEmotion.intensity * 100}%`,
                    backgroundColor: currentEmotion.color_primary,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="emotion-details">
          <div className="detail-item">
            <span className="detail-label">Comportamiento Partículas:</span>
            <span className="detail-value">
              {currentEmotion.particle_behavior}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Colores Primarios:</span>
            <div className="color-swatches">
              <div
                className="color-swatch"
                style={{ backgroundColor: currentEmotion.color_primary }}
              ></div>
              <div
                className="color-swatch"
                style={{ backgroundColor: currentEmotion.color_secondary }}
              ></div>
            </div>
          </div>
        </div>

        {/* Progreso de construcción */}
        {isBuilding && (
          <div className="build-progress">
            <div className="progress-header">
              <Home className="w-5 h-5 text-neon-teal" />
              <span className="text-white font-semibold">
                Construyendo Sueño...
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${buildProgress * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {Math.round(buildProgress * 100)}% Completado
            </span>
          </div>
        )}
      </div>

      {/* Panel de comandos de voz */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 voice-commands-panel">
        <h3 className="text-xl font-bold text-white mb-4">
          Comandos de Voz Recientes
        </h3>

        <div className="commands-list">
          {voiceCommands
            .slice(-4)
            .reverse()
            .map((command, index) => (
              <div key={index} className="command-item">
                <div className="command-header">
                  <div className="emotion-indicator">
                    {getEmotionIcon(command.detected_emotion)}
                  </div>
                  <div className="command-meta">
                    <span className="confidence">
                      {Math.round(command.confidence * 100)}% confianza
                    </span>
                    <span className="timestamp">
                      {new Date(command.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <p className="command-text">"{command.text}"</p>
                <p className="ai-response">{command.architecture_response}</p>
              </div>
            ))}
        </div>

        {voiceCommands.length === 0 && (
          <div className="no-commands">
            <Brain className="w-8 h-8 text-white/50 mb-2" />
            <p className="text-white/50 text-center">
              Habla para comenzar a construir con tus emociones
            </p>
          </div>
        )}
      </div>

      {/* Panel de componentes arquitectónicos */}
      <div className="absolute bottom-8 right-8 z-20 components-panel">
        <h4 className="text-white font-bold mb-3">Componentes del Sueño</h4>

        <div className="components-list">
          {components.map((component, index) => (
            <div key={component.id} className="component-item">
              <div className="component-icon">
                <Home className="w-4 h-4" />
              </div>

              <div className="component-details">
                <span className="component-name">{component.name}</span>
                <div className="component-progress">
                  <div
                    className="component-fill"
                    style={{ width: `${component.current_scale * 100}%` }}
                  ></div>
                </div>
              </div>

              <span className="component-percentage">
                {Math.round(component.current_scale * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-futuristas para Dream Builder */}
      <style jsx>{`
        .builder-title {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9),
            rgba(168, 85, 247, 0.1)
          );
          backdrop-filter: blur(25px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 600px;
        }

        .dream-text {
          background: linear-gradient(
            45deg,
            #a855f7,
            #8b5cf6,
            #7c3aed,
            #6d28d9
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: dream-flow 4s ease-in-out infinite;
        }

        .builder-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .voice-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
          border: none;
          border-radius: 15px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 200px;
          justify-content: center;
        }

        .voice-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
        }

        .voice-btn.listening {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7);
          animation: listening-pulse 1s ease-in-out infinite;
        }

        .voice-btn.building {
          background: linear-gradient(45deg, #ffd700, #ffa500);
          color: black;
        }

        .voice-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .emotion-panel {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95),
            rgba(168, 85, 247, 0.1)
          );
          backdrop-filter: blur(30px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-slide-up 0.5s ease;
        }

        .emotion-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .emotion-avatar {
          width: 80px;
          height: 80px;
          border: 3px solid;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: emotion-pulse 3s ease-in-out infinite;
        }

        .emotion-info {
          flex: 1;
        }

        .emotion-intensity {
          margin-top: 1rem;
        }

        .intensity-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .intensity-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
          animation: intensity-glow 2s ease-in-out infinite;
        }

        .emotion-details {
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .detail-value {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .color-swatches {
          display: flex;
          gap: 0.5rem;
        }

        .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .build-progress {
          padding: 1rem;
          background: rgba(14, 231, 231, 0.1);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 15px;
          margin-top: 1rem;
        }

        .progress-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ee7e7, #00e7a7);
          border-radius: 5px;
          transition: width 0.3s ease;
          animation: progress-shimmer 2s ease-in-out infinite;
        }

        .progress-text {
          font-size: 0.875rem;
          color: #0ee7e7;
          font-weight: 600;
        }

        .voice-commands-panel,
        .components-panel {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 300px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .commands-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .command-item {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
        }

        .command-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .emotion-indicator {
          display: flex;
          align-items: center;
        }

        .command-meta {
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 0.25rem;
        }

        .confidence {
          font-size: 0.75rem;
          color: #0ee7e7;
          font-weight: 600;
        }

        .timestamp {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .command-text {
          font-size: 0.875rem;
          color: white;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .ai-response {
          font-size: 0.75rem;
          color: #00e7a7;
          font-weight: 500;
        }

        .no-commands {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          text-align: center;
        }

        .components-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .component-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .component-icon {
          color: #a855f7;
          flex-shrink: 0;
        }

        .component-details {
          flex: 1;
        }

        .component-name {
          font-size: 0.875rem;
          color: white;
          font-weight: 500;
          display: block;
          margin-bottom: 0.25rem;
        }

        .component-progress {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .component-fill {
          height: 100%;
          background: linear-gradient(90deg, #a855f7, #8b5cf6);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .component-percentage {
          font-size: 0.75rem;
          color: #a855f7;
          font-weight: 600;
          flex-shrink: 0;
        }

        @keyframes dream-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes listening-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(14, 231, 231, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(14, 231, 231, 0.8);
          }
        }

        @keyframes emotion-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px currentColor;
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 35px currentColor;
          }
        }

        @keyframes intensity-glow {
          0%,
          100% {
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor;
          }
        }

        @keyframes progress-shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes panel-slide-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
