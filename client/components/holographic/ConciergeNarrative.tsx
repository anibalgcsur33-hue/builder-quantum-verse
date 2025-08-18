import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MessageCircle, Sparkles, Crown, Star, Gem } from "lucide-react";

interface NarrativeMessage {
  id: string;
  text: string;
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  mood: "welcoming" | "exclusive" | "serene" | "luxurious";
}

const narrativeMessages: NarrativeMessage[] = [
  {
    id: "morning-welcome",
    text: "Buenos días. Soy su concierge holográfico. Las primeras luces del amanecer revelan propiedades exclusivas esperándole en el Mediterráneo.",
    timeOfDay: "morning",
    mood: "welcoming",
  },
  {
    id: "afternoon-exclusive",
    text: "Esta tarde perfecta le invita a explorar villas donde la elegancia se encuentra con la innovación cuántica del futuro.",
    timeOfDay: "afternoon",
    mood: "exclusive",
  },
  {
    id: "evening-serene",
    text: "Al atardecer, cuando las luces doradas se reflejan en cristales líquidos, descubra su hogar entre las estrellas.",
    timeOfDay: "evening",
    mood: "serene",
  },
  {
    id: "night-luxurious",
    text: "En la serenidad nocturna, donde cada destello es una promesa de ultra-lujo, le espera su residencia de ensueño.",
    timeOfDay: "night",
    mood: "luxurious",
  },
];

export default function ConciergeNarrative() {
  const lobbyRef = useRef<HTMLDivElement>(null);
  const conciergeRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState<NarrativeMessage>(
    narrativeMessages[0],
  );
  const [isActive, setIsActive] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Determinar momento del día
  const getTimeOfDay = (): "morning" | "afternoon" | "evening" | "night" => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  };

  useEffect(() => {
    // Seleccionar mensaje según momento del día
    const timeOfDay = getTimeOfDay();
    const relevantMessages = narrativeMessages.filter(
      (msg) => msg.timeOfDay === timeOfDay,
    );
    const selectedMessage = relevantMessages[0] || narrativeMessages[0];
    setCurrentMessage(selectedMessage);

    // Configurar escena 3D del lobby
    if (!lobbyRef.current) return;

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

    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    lobbyRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Suelo de mármol con reflejos de luz estelar
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        starlight: { value: new THREE.Color(0x0ee7e7) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 starlight;
        varying vec2 vUv;
        
        float marble_pattern(vec2 uv) {
          return sin(uv.x * 8.0) * cos(uv.y * 8.0) * 0.5 + 0.5;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Patrón de mármol
          float marble = marble_pattern(uv * 2.0);
          vec3 marbleColor = mix(vec3(0.9, 0.9, 0.95), vec3(0.7, 0.7, 0.8), marble);
          
          // Reflejos de luz estelar
          vec3 starReflection = starlight * sin(time + length(uv - 0.5) * 10.0) * 0.3;
          
          gl_FragColor = vec4(marbleColor + starReflection, 1.0);
        }
      `,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Paredes que cambian con IA narrativa
    const wallGeometry = new THREE.PlaneGeometry(50, 20);
    const wallMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        narrative_mood: { value: 0.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float narrative_mood;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Cambio de color según narrativa IA
          vec3 morning_mood = vec3(1.0, 0.9, 0.7);   // Dorado cálido
          vec3 evening_mood = vec3(0.6, 0.8, 1.0);   // Azul sereno
          vec3 night_mood = vec3(0.8, 0.6, 1.0);     // Púrpura lujoso
          
          vec3 base_color = mix(morning_mood, evening_mood, narrative_mood);
          base_color = mix(base_color, night_mood, sin(time * 0.5) * 0.5 + 0.5);
          
          // Efectos de luz dinámica
          float light_wave = sin(uv.x * 5.0 + time) * 0.1 + 0.9;
          
          gl_FragColor = vec4(base_color * light_wave, 0.8);
        }
      `,
      transparent: true,
    });

    // Múltiples paredes
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -25;
    scene.add(backWall);

    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -25;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 25;
    scene.add(rightWall);

    // Columnas de cristal líquido
    for (let i = 0; i < 6; i++) {
      const columnGeometry = new THREE.CylinderGeometry(1, 1, 15, 16);
      const columnMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x87ceeb,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        envMapIntensity: 1.5,
      });

      const column = new THREE.Mesh(columnGeometry, columnMaterial);
      column.position.x = (i - 2.5) * 8;
      column.position.y = 7.5;
      column.position.z = i % 2 === 0 ? -15 : -10;
      column.castShadow = true;
      scene.add(column);
    }

    // Iluminación de ultra-lujo
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x0ee7e7, 2);
    keyLight.position.set(10, 20, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x00e7a7, 1.5, 30);
    fillLight.position.set(-10, 15, 5);
    scene.add(fillLight);

    const accentLight = new THREE.SpotLight(0xffd700, 2, 20, Math.PI / 8, 0.1);
    accentLight.position.set(0, 20, 10);
    accentLight.target.position.set(0, 0, 0);
    scene.add(accentLight);
    scene.add(accentLight.target);

    // Posicionar cámara
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 5, 0);

    // Loop de animación cinematográfica
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Actualizar shaders
      floorMaterial.uniforms.time.value = time;
      wallMaterial.uniforms.time.value = time;

      // Cambio de mood según narrativa
      const moodValue =
        selectedMessage.mood === "welcoming"
          ? 0.2
          : selectedMessage.mood === "exclusive"
            ? 0.4
            : selectedMessage.mood === "serene"
              ? 0.6
              : 0.8;
      wallMaterial.uniforms.narrative_mood.value = moodValue;

      // Movimiento sutil de luces
      fillLight.position.x = Math.sin(time) * 5;
      accentLight.intensity = 2 + Math.sin(time * 2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Activar concierge después de un momento
    setTimeout(() => setIsActive(true), 2000);

    return () => {
      if (lobbyRef.current && renderer.domElement) {
        lobbyRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const getGestureIcon = () => {
    switch (currentMessage.mood) {
      case "welcoming":
        return <MessageCircle className="w-8 h-8" />;
      case "exclusive":
        return <Crown className="w-8 h-8" />;
      case "serene":
        return <Star className="w-8 h-8" />;
      case "luxurious":
        return <Gem className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-dark via-purple-dark to-blue-dark">
      {/* Lobby 3D de fondo */}
      <div ref={lobbyRef} className="absolute inset-0 z-0" />

      {/* Overlay del concierge holográfico */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-12">
        {/* Panel izquierdo - Información del lobby */}
        <div className="w-1/3 space-y-8">
          <div className="luxury-info-panel">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Lobby Futurista
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Bañado en luz de cristal líquido, donde cada superficie refleja la
              serenidad del ultra-lujo futurista.
            </p>
          </div>

          {/* Características del lobby */}
          <div className="space-y-4">
            <div className="luxury-feature-item">
              <div className="feature-icon">
                <Sparkles className="w-6 h-6 text-neon-teal" />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Suelos de Mármol Estelar
                </h4>
                <p className="text-white/60 text-sm">
                  Reflejos de luz estelar en tiempo real
                </p>
              </div>
            </div>

            <div className="luxury-feature-item">
              <div className="feature-icon">
                <Crown className="w-6 h-6 text-neon-emerald" />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Paredes Narrativas IA
                </h4>
                <p className="text-white/60 text-sm">
                  Cambian según momento del día
                </p>
              </div>
            </div>

            <div className="luxury-feature-item">
              <div className="feature-icon">
                <Gem className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Columnas de Cristal Líquido
                </h4>
                <p className="text-white/60 text-sm">
                  Elegancia y serenidad ultra-futurista
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel central - Concierge holográfico */}
        <div className="w-1/3 flex justify-center">
          <div
            ref={conciergeRef}
            className={`holographic-concierge ${isActive ? "active" : ""}`}
          >
            {/* Figura holográfica */}
            <div className="concierge-avatar">
              <div className="holographic-body">
                <div className="energy-core">{getGestureIcon()}</div>

                {/* Ojos azules brillantes */}
                <div className="concierge-eyes">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                </div>

                {/* Gestos de bienvenida en el aire */}
                <div className="welcome-gestures">
                  <div className="gesture-trail"></div>
                  <div
                    className="gesture-trail"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="gesture-trail"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Anillos holográficos */}
              <div className="holographic-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
            </div>

            {/* Mensaje narrativo */}
            <div className="narrative-bubble">
              <p className="narrative-text">{currentMessage.text}</p>
              <div className="bubble-indicator">
                <span className="time-badge">{currentMessage.timeOfDay}</span>
                <span className="mood-badge">{currentMessage.mood}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Controles interactivos */}
        <div className="w-1/3 space-y-6">
          <div className="luxury-controls-panel">
            <h3 className="text-xl font-bold text-white mb-4">
              Experiencia Personalizada
            </h3>

            <div className="space-y-4">
              <button className="luxury-control-btn">
                <MessageCircle className="w-5 h-5" />
                <span>Conversación Holográfica</span>
              </button>

              <button className="luxury-control-btn">
                <Star className="w-5 h-5" />
                <span>Tour Narrativo Privado</span>
              </button>

              <button className="luxury-control-btn">
                <Crown className="w-5 h-5" />
                <span>Acceso VIP Exclusivo</span>
              </button>
            </div>
          </div>

          {/* Ambiente atmosférico */}
          <div className="atmospheric-controls">
            <h4 className="text-white font-semibold mb-3">
              Atmósfera del Lobby
            </h4>
            <div className="atmosphere-options">
              <div className="atmosphere-option active">
                <div className="atmosphere-color morning"></div>
                <span>Mañana Dorada</span>
              </div>
              <div className="atmosphere-option">
                <div className="atmosphere-color evening"></div>
                <span>Tarde Serena</span>
              </div>
              <div className="atmosphere-option">
                <div className="atmosphere-color night"></div>
                <span>Noche Lujosa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS ultra-avanzados */}
      <style>{`
        .luxury-info-panel {
          background: linear-gradient(
            135deg,
            rgba(14, 231, 231, 0.1),
            rgba(0, 231, 167, 0.05)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 20px;
          padding: 2rem;
        }

        .luxury-feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .luxury-feature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(10px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(
            45deg,
            rgba(14, 231, 231, 0.2),
            rgba(0, 231, 167, 0.2)
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .holographic-concierge {
          position: relative;
          transition: all 2s ease;
          opacity: 0;
          transform: scale(0.5);
        }

        .holographic-concierge.active {
          opacity: 1;
          transform: scale(1);
        }

        .concierge-avatar {
          position: relative;
          width: 300px;
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .holographic-body {
          width: 120px;
          height: 200px;
          background: linear-gradient(
            180deg,
            rgba(14, 231, 231, 0.3) 0%,
            rgba(0, 231, 167, 0.2) 50%,
            rgba(168, 85, 247, 0.1) 100%
          );
          border-radius: 60px 60px 20px 20px;
          position: relative;
          border: 2px solid rgba(14, 231, 231, 0.5);
          animation: holographic-shimmer 3s ease-in-out infinite;
        }

        .energy-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #0ee7e7;
          animation: energy-pulse 2s ease-in-out infinite;
        }

        .concierge-eyes {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
        }

        .eye {
          width: 8px;
          height: 8px;
          background: #0ee7e7;
          border-radius: 50%;
          box-shadow: 0 0 15px #0ee7e7;
          animation: eye-glow 2s ease-in-out infinite alternate;
        }

        .welcome-gestures {
          position: absolute;
          top: -20px;
          left: -30px;
          right: -30px;
          bottom: -20px;
        }

        .gesture-trail {
          position: absolute;
          width: 4px;
          height: 40px;
          background: linear-gradient(
            180deg,
            transparent,
            #0ee7e7,
            transparent
          );
          border-radius: 2px;
          animation: gesture-wave 3s ease-in-out infinite;
        }

        .gesture-trail:nth-child(1) {
          left: 20px;
          top: 30px;
        }

        .gesture-trail:nth-child(2) {
          right: 20px;
          top: 50px;
        }

        .gesture-trail:nth-child(3) {
          left: 50%;
          transform: translateX(-50%);
          top: 20px;
        }

        .holographic-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 50%;
          animation: ring-expand 4s ease-in-out infinite;
        }

        .ring-1 {
          width: 200px;
          height: 200px;
          margin: -100px 0 0 -100px;
        }

        .ring-2 {
          width: 280px;
          height: 280px;
          margin: -140px 0 0 -140px;
          animation-delay: 1.3s;
        }

        .ring-3 {
          width: 360px;
          height: 360px;
          margin: -180px 0 0 -180px;
          animation-delay: 2.6s;
        }

        .narrative-bubble {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8),
            rgba(14, 231, 231, 0.1)
          );
          backdrop-filter: blur(15px);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 20px;
          padding: 1.5rem;
          color: white;
        }

        .narrative-text {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          text-align: center;
        }

        .bubble-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .time-badge,
        .mood-badge {
          background: rgba(14, 231, 231, 0.2);
          color: #0ee7e7;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          text-transform: capitalize;
        }

        .mood-badge {
          background: rgba(0, 231, 167, 0.2);
          color: #00e7a7;
        }

        .luxury-controls-panel {
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.1),
            rgba(59, 130, 246, 0.05)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .luxury-control-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          transition: all 0.3s ease;
        }

        .luxury-control-btn:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
        }

        .atmospheric-controls {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 1rem;
        }

        .atmosphere-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .atmosphere-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .atmosphere-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .atmosphere-option.active {
          background: rgba(14, 231, 231, 0.2);
          border: 1px solid rgba(14, 231, 231, 0.5);
        }

        .atmosphere-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .atmosphere-color.morning {
          background: linear-gradient(45deg, #ffd700, #ffa500);
        }

        .atmosphere-color.evening {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7);
        }

        .atmosphere-color.night {
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
        }

        @keyframes holographic-shimmer {
          0%,
          100% {
            border-color: rgba(14, 231, 231, 0.5);
            box-shadow: 0 0 20px rgba(14, 231, 231, 0.3);
          }
          50% {
            border-color: rgba(0, 231, 167, 0.8);
            box-shadow: 0 0 40px rgba(0, 231, 167, 0.5);
          }
        }

        @keyframes energy-pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            filter: drop-shadow(0 0 10px currentColor);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            filter: drop-shadow(0 0 20px currentColor);
          }
        }

        @keyframes eye-glow {
          0% {
            box-shadow: 0 0 15px #0ee7e7;
          }
          100% {
            box-shadow:
              0 0 25px #0ee7e7,
              0 0 35px #00e7a7;
          }
        }

        @keyframes gesture-wave {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 1;
          }
        }

        @keyframes ring-expand {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
