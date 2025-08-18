import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Sparkles, Zap, Eye, Globe } from "lucide-react";

export default function PortalHeroes() {
  const portalRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!portalRef.current) return;

    // Configuración ultra-futurista con WebGL
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    portalRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Portal holográfico cristalino
    const portalGeometry = new THREE.TorusGeometry(8, 2, 32, 100);
    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Deformación cuántica del portal
          vec3 pos = position;
          pos.x += sin(time * 2.0 + position.y * 0.5) * 0.3;
          pos.y += cos(time * 1.5 + position.x * 0.5) * 0.3;
          pos.z += sin(time * 3.0 + position.x * position.y * 0.1) * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Función de ruido cuántico
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 st = vUv;
          
          // Efecto de cristal líquido holográfico
          float noise = random(st + time * 0.1);
          vec3 liquidCrystal = vec3(
            0.0 + sin(time * 2.0 + st.x * 10.0) * 0.5,
            0.9 + cos(time * 1.5 + st.y * 8.0) * 0.3,
            0.9 + sin(time * 3.0 + (st.x + st.y) * 6.0) * 0.4
          );
          
          // Vórtice cuántico
          vec2 center = vec2(0.5);
          float dist = distance(st, center);
          float vortex = sin(dist * 20.0 - time * 5.0) * 0.5 + 0.5;
          
          // Rayos dorados y plateados
          vec3 goldenRays = vec3(1.0, 0.8, 0.2) * sin(time + vPosition.x * 0.1) * 0.3;
          vec3 silverRays = vec3(0.9, 0.9, 1.0) * cos(time * 1.3 + vPosition.y * 0.1) * 0.3;
          
          vec3 finalColor = liquidCrystal + goldenRays + silverRays;
          finalColor *= vortex;
          finalColor += noise * 0.1;
          
          // Transparencia holográfica
          float alpha = 0.8 + sin(time + dist * 5.0) * 0.2;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(0, 0, -10);
    portal.rotation.x = Math.PI / 4;
    scene.add(portal);

    // Partículas cuánticas flotantes
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Colores holográficos
      const hue = Math.random();
      colors[i * 3] = hue < 0.3 ? 1 : hue < 0.6 ? 0 : 0.9; // R
      colors[i * 3 + 1] = hue < 0.3 ? 0.8 : hue < 0.6 ? 0.9 : 0.9; // G
      colors[i * 3 + 2] = hue < 0.3 ? 0.2 : hue < 0.6 ? 0.9 : 1; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Iluminación cinematográfica
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0EE7E7, 2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00E7A7, 3, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Configurar cámara
    camera.position.set(0, 0, 15);

    // Loop de animación ultra-fluido
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Actualizar uniforms del portal
      if (portalMaterial.uniforms) {
        portalMaterial.uniforms.time.value = time;
      }

      // Rotación suave del portal
      portal.rotation.z += 0.005;
      portal.rotation.y += 0.003;

      // Movimiento de partículas
      particles.rotation.y += 0.001;
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.01) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Pulsación de luz
      pointLight.intensity = 3 + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Manejo de resize responsivo
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (portalRef.current && renderer.domElement) {
        portalRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Portal 3D holográfico de fondo */}
      <div 
        ref={portalRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1a2e 50%, #0f1419 100%)' }}
      />

      {/* Overlay de contenido holográfico */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6">
          
          {/* Título cinematográfico ultra-futurista */}
          <div className="mb-12 relative">
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="holographic-text-gradient">BlueEye</span>
              <br />
              <span className="quantum-text-effect">Metaverso Premium</span>
            </h1>
            
            {/* Subtítulo con efectos holográficos */}
            <p className="text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              <span className="liquid-crystal-text">Portal holográfico ultra-futurista</span>
              <br />
              <span className="golden-rays-text">a la costa mediterránea del futuro</span>
            </p>

            {/* Efectos de partículas flotantes */}
            <div className="absolute -top-8 -left-8 w-16 h-16 holographic-particle animate-float">
              <Sparkles className="w-full h-full text-neon-teal opacity-60" />
            </div>
            <div className="absolute -top-4 -right-12 w-12 h-12 holographic-particle animate-float" style={{animationDelay: '1s'}}>
              <Zap className="w-full h-full text-neon-emerald opacity-60" />
            </div>
            <div className="absolute -bottom-6 left-1/4 w-10 h-10 holographic-particle animate-float" style={{animationDelay: '2s'}}>
              <Eye className="w-full h-full text-purple-400 opacity-60" />
            </div>
          </div>

          {/* Invitaciones cuánticas interactivas */}
          <div className="space-y-6 mb-12">
            <p className="text-xl text-white/80 max-w-3xl mx-auto quantum-shimmer">
              <span className="text-neon-teal font-semibold">Huéspedes caminando</span> por arcos cristalinos de vidrio cuántico.
              <br />
              <span className="text-neon-emerald font-semibold">Siluetas de mansiones</span> flotando sobre nubes radiantes.
            </p>
          </div>

          {/* Botones de acción holográficos */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="holographic-btn-primary px-12 py-5 text-xl font-bold flex items-center gap-4 group">
              <Globe className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" />
              <span>Atravesar Portal</span>
              <div className="quantum-energy-trail"></div>
            </button>
            
            <button className="holographic-btn-secondary px-12 py-5 text-xl font-bold flex items-center gap-4 group">
              <Eye className="w-7 h-7 group-hover:scale-125 transition-transform duration-500" />
              <span>Visión Cuántica</span>
              <div className="crystal-energy-trail"></div>
            </button>
          </div>

          {/* Datos holográficos en tiempo real */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="holographic-data-card">
              <div className="text-4xl font-bold holographic-number mb-2">∞</div>
              <p className="text-white/70">Realidades Cuánticas</p>
            </div>
            <div className="holographic-data-card">
              <div className="text-4xl font-bold holographic-number mb-2">7.2M</div>
              <p className="text-white/70">Rayos de Luz Capturados</p>
            </div>
            <div className="holographic-data-card">
              <div className="text-4xl font-bold holographic-number mb-2">99.9%</div>
              <p className="text-white/70">Pureza Cristalina</p>
            </div>
          </div>

        </div>
      </div>

      {/* Indicador de inmersión */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="holographic-scroll-indicator">
          <div className="quantum-pulse-wave"></div>
          <p className="text-white/60 text-sm mt-2">Desliza para entrar</p>
        </div>
      </div>

      {/* Estilos CSS avanzados embebidos */}
      <style jsx>{`
        .holographic-text-gradient {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7, #A855F7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic-flow 3s ease-in-out infinite;
        }

        .quantum-text-effect {
          color: white;
          text-shadow: 
            0 0 10px rgba(14, 231, 231, 0.8),
            0 0 20px rgba(0, 231, 167, 0.6),
            0 0 30px rgba(168, 85, 247, 0.4);
          animation: quantum-glow 2s ease-in-out infinite alternate;
        }

        .liquid-crystal-text {
          background: linear-gradient(90deg, #0EE7E7, #ffffff, #00E7A7);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: liquid-flow 4s linear infinite;
        }

        .golden-rays-text {
          background: linear-gradient(90deg, #FFD700, #FFA500, #FF6347);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: golden-shimmer 3s ease-in-out infinite;
        }

        .holographic-particle {
          filter: drop-shadow(0 0 10px currentColor);
          animation: float 6s ease-in-out infinite;
        }

        .quantum-shimmer {
          animation: quantum-shimmer 4s ease-in-out infinite;
        }

        .holographic-btn-primary {
          background: linear-gradient(45deg, rgba(14, 231, 231, 0.2), rgba(0, 231, 167, 0.2));
          border: 2px solid transparent;
          border-image: linear-gradient(45deg, #0EE7E7, #00E7A7) 1;
          border-radius: 15px;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }

        .holographic-btn-primary:hover {
          background: linear-gradient(45deg, rgba(14, 231, 231, 0.4), rgba(0, 231, 167, 0.4));
          box-shadow: 
            0 0 30px rgba(14, 231, 231, 0.6),
            inset 0 0 20px rgba(0, 231, 167, 0.2);
          transform: translateY(-5px);
        }

        .holographic-btn-secondary {
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2));
          border: 2px solid transparent;
          border-image: linear-gradient(45deg, #A855F7, #3B82F6) 1;
          border-radius: 15px;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }

        .holographic-btn-secondary:hover {
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4));
          box-shadow: 
            0 0 30px rgba(168, 85, 247, 0.6),
            inset 0 0 20px rgba(59, 130, 246, 0.2);
          transform: translateY(-5px);
        }

        .holographic-data-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.5s ease;
        }

        .holographic-data-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(14, 231, 231, 0.3);
        }

        .holographic-number {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic-pulse 2s ease-in-out infinite;
        }

        .holographic-scroll-indicator {
          width: 30px;
          height: 50px;
          border: 2px solid rgba(14, 231, 231, 0.6);
          border-radius: 25px;
          position: relative;
          animation: indicator-glow 2s ease-in-out infinite;
        }

        .quantum-pulse-wave {
          width: 6px;
          height: 6px;
          background: #0EE7E7;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: wave-pulse 2s ease-in-out infinite;
        }

        @keyframes holographic-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes quantum-glow {
          0% { text-shadow: 0 0 10px rgba(14, 231, 231, 0.8), 0 0 20px rgba(0, 231, 167, 0.6); }
          100% { text-shadow: 0 0 20px rgba(14, 231, 231, 1), 0 0 30px rgba(0, 231, 167, 0.8); }
        }

        @keyframes liquid-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        @keyframes golden-shimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 200% 0%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        @keyframes quantum-shimmer {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        @keyframes holographic-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes indicator-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(14, 231, 231, 0.3); }
          50% { box-shadow: 0 0 20px rgba(14, 231, 231, 0.8); }
        }

        @keyframes wave-pulse {
          0% { top: 8px; opacity: 1; }
          100% { top: 32px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
