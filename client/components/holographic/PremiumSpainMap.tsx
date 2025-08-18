import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Plane, Yacht, MapPin, Zap, Globe, Eye } from "lucide-react";

interface HolographicBeacon {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: 'madrid' | 'barcelona' | 'valencia' | 'sevilla' | 'bilbao' | 'canarias' | 'baleares';
  properties: number;
  luxury_level: 'premium' | 'ultra' | 'supreme';
  glow_color: string;
}

const premiumBeacons: HolographicBeacon[] = [
  { id: 'mad', name: 'Madrid Capital', lat: 40.4168, lon: -3.7038, type: 'madrid', properties: 2847, luxury_level: 'supreme', glow_color: '#FFD700' },
  { id: 'bcn', name: 'Barcelona Premium', lat: 41.3874, lon: 2.1686, type: 'barcelona', properties: 1892, luxury_level: 'ultra', glow_color: '#0EE7E7' },
  { id: 'val', name: 'Valencia Elite', lat: 39.4699, lon: -0.3763, type: 'valencia', properties: 1234, luxury_level: 'premium', glow_color: '#00E7A7' },
  { id: 'sev', name: 'Sevilla Royal', lat: 37.3886, lon: -5.9823, type: 'sevilla', properties: 987, luxury_level: 'ultra', glow_color: '#A855F7' },
  { id: 'bil', name: 'Bilbao Exclusive', lat: 43.2627, lon: -2.9253, type: 'bilbao', properties: 743, luxury_level: 'premium', glow_color: '#F59E0B' },
  { id: 'can', name: 'Islas Canarias', lat: 28.2916, lon: -16.6291, type: 'canarias', properties: 1576, luxury_level: 'supreme', glow_color: '#06B6D4' },
  { id: 'bal', name: 'Islas Baleares', lat: 39.6953, lon: 3.0176, type: 'baleares', properties: 1445, luxury_level: 'ultra', glow_color: '#EC4899' }
];

export default function PremiumSpainMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedBeacon, setSelectedBeacon] = useState<HolographicBeacon | null>(null);
  const [showYachts, setShowYachts] = useState(true);
  const [showFlights, setShowFlights] = useState(true);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mapMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Configuración ultra-futurista para mapa 3D flotante
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;

    mapRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear mapa holográfico de España flotando en el espacio
    const spainGeometry = new THREE.PlaneGeometry(20, 12);
    const spainMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        coastlines: { value: 1.0 },
        waves_intensity: { value: 0.5 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        // Función de ruido para topografía
        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Elevación topográfica de España
          vec3 pos = position;
          float elevation = 0.0;
          
          // Pirineos (norte)
          if (pos.y > 0.3) {
            elevation += sin(pos.x * 8.0) * cos(pos.y * 6.0) * 0.8;
          }
          
          // Sistema Central
          if (pos.y > -0.1 && pos.y < 0.2) {
            elevation += sin(pos.x * 5.0 + time) * 0.6;
          }
          
          // Cordillera Bética (sur)
          if (pos.y < -0.2) {
            elevation += cos(pos.x * 6.0) * sin(pos.y * 4.0) * 0.5;
          }
          
          pos.z += elevation;
          
          // Ondulación holográfica
          pos.z += sin(time + length(pos.xy) * 3.0) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        uniform float coastlines;
        uniform float waves_intensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Mapa de España simplificado
        float spain_shape(vec2 uv) {
          // Forma aproximada de España
          vec2 center = vec2(0.5, 0.5);
          vec2 pos = uv - center;
          
          // Península ibérica
          float peninsula = 1.0 - length(pos * vec2(1.2, 1.5));
          peninsula = smoothstep(0.2, 0.6, peninsula);
          
          // Baleares
          vec2 baleares_pos = uv - vec2(0.75, 0.4);
          float baleares = 1.0 - length(baleares_pos * 15.0);
          baleares = smoothstep(0.0, 1.0, baleares);
          
          // Canarias
          vec2 canarias_pos = uv - vec2(0.1, 0.15);
          float canarias = 1.0 - length(canarias_pos * 12.0);
          canarias = smoothstep(0.0, 1.0, canarias);
          
          return max(peninsula, max(baleares, canarias));
        }
        
        // Ondas animadas para costas
        float animated_waves(vec2 uv) {
          float waves = 0.0;
          waves += sin(uv.x * 20.0 + time * 2.0) * 0.1;
          waves += sin(uv.y * 15.0 + time * 1.5) * 0.1;
          return waves * waves_intensity;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Forma de España
          float spain = spain_shape(uv);
          
          // Colores base del mapa
          vec3 land_color = vec3(0.1, 0.3, 0.6);      // Azul tierra
          vec3 coast_color = vec3(0.0, 0.9, 0.9);     // Cian costas
          vec3 ocean_color = vec3(0.0, 0.1, 0.3);     // Azul profundo océano
          
          // Ondas costeras animadas
          float waves = animated_waves(uv);
          vec3 wave_color = vec3(0.0, 0.7, 0.9) * waves;
          
          // Efecto holográfico
          float holographic = sin(time * 2.0 + length(vPosition.xy) * 5.0) * 0.2 + 0.8;
          
          // Color final
          vec3 final_color = mix(ocean_color, land_color, spain);
          final_color = mix(final_color, coast_color, coastlines * (1.0 - spain) * 0.3);
          final_color += wave_color;
          final_color *= holographic;
          
          // Efecto de cristal
          float crystal_effect = sin(uv.x * 10.0 + time) * cos(uv.y * 10.0 + time) * 0.1;
          final_color += crystal_effect;
          
          gl_FragColor = vec4(final_color, 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const spainMap = new THREE.Mesh(spainGeometry, spainMaterial);
    spainMap.position.set(0, 0, 0);
    mapMeshRef.current = spainMap;
    scene.add(spainMap);

    // Crear beacons holográficos radiant es para ciudades
    const beaconMeshes: Array<{ mesh: THREE.Mesh, beacon: HolographicBeacon }> = [];
    
    premiumBeacons.forEach((beacon) => {
      // Convertir coordenadas lat/lon a posición en el mapa
      const x = ((beacon.lon + 10) / 20) * 20 - 10; // Aproximación para España
      const y = ((beacon.lat - 35) / 10) * 12 - 6;   // Aproximación para España
      
      // Geometría del beacon
      const beaconGeometry = new THREE.ConeGeometry(0.3, 2, 8);
      const beaconMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          glow_color: { value: new THREE.Color(beacon.glow_color) },
          intensity: { value: beacon.luxury_level === 'supreme' ? 2.0 : beacon.luxury_level === 'ultra' ? 1.5 : 1.0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            vPosition = position;
            vec3 pos = position;
            
            // Pulsación vertical
            pos.y += sin(time * 3.0) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 glow_color;
          uniform float intensity;
          varying vec3 vPosition;
          
          void main() {
            // Efecto de beacon radiante
            float glow = sin(time * 2.0 + vPosition.y * 5.0) * 0.5 + 0.5;
            vec3 final_color = glow_color * (glow * intensity + 0.5);
            
            // Pulso energético
            float pulse = sin(time * 4.0) * 0.3 + 0.7;
            final_color *= pulse;
            
            gl_FragColor = vec4(final_color, 0.9);
          }
        `,
        transparent: true
      });

      const beaconMesh = new THREE.Mesh(beaconGeometry, beaconMaterial);
      beaconMesh.position.set(x, y, 1);
      beaconMesh.userData = beacon;
      scene.add(beaconMesh);
      beaconMeshes.push({ mesh: beaconMesh, beacon });

      // Anillo de energía alrededor del beacon
      const ringGeometry = new THREE.RingGeometry(0.8, 1.2, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: beacon.glow_color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(x, y, 0.1);
      ring.rotation.x = -Math.PI / 2;
      scene.add(ring);
    });

    // Yates de lujo en movimiento (si habilitado)
    const yachts: THREE.Mesh[] = [];
    if (showYachts) {
      for (let i = 0; i < 8; i++) {
        const yachtGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.8);
        const yachtMaterial = new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          shininess: 100
        });
        const yacht = new THREE.Mesh(yachtGeometry, yachtMaterial);
        
        // Posición aleatoria en las costas
        const angle = (i / 8) * Math.PI * 2;
        yacht.position.set(
          Math.cos(angle) * 12,
          Math.sin(angle) * 8,
          0.2
        );
        yacht.userData = { angle, speed: 0.01 + Math.random() * 0.01 };
        
        scene.add(yacht);
        yachts.push(yacht);
      }
    }

    // Rutas de vuelos de jets privados (si habilitado)
    const flightPaths: THREE.Line[] = [];
    if (showFlights) {
      premiumBeacons.forEach((beacon, index) => {
        if (index < premiumBeacons.length - 1) {
          const start = new THREE.Vector3(
            ((beacon.lon + 10) / 20) * 20 - 10,
            ((beacon.lat - 35) / 10) * 12 - 6,
            2
          );
          const end = new THREE.Vector3(
            ((premiumBeacons[index + 1].lon + 10) / 20) * 20 - 10,
            ((premiumBeacons[index + 1].lat - 35) / 10) * 12 - 6,
            2
          );
          
          const curve = new THREE.QuadraticBezierCurve3(
            start,
            new THREE.Vector3((start.x + end.x) / 2, (start.y + end.y) / 2, 4),
            end
          );
          
          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0xFFD700,
            transparent: true,
            opacity: 0.6
          });
          
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          flightPaths.push(line);
        }
      });
    }

    // Iluminación espectacular
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0EE7E7, 2);
    directionalLight.position.set(15, 15, 15);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00E7A7, 3, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Posicionar cámara para vista espectacular
    camera.position.set(0, -20, 25);
    camera.lookAt(0, 0, 0);

    // Controles de mouse para interacción
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(beaconMeshes.map(b => b.mesh));

      if (intersects.length > 0) {
        const clickedBeacon = intersects[0].object.userData as HolographicBeacon;
        setSelectedBeacon(clickedBeacon);
        console.log(`🏙️ Beacon seleccionado: ${clickedBeacon.name}`);
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Loop de animación ultra-fluido
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Actualizar shader del mapa
      if (spainMaterial.uniforms) {
        spainMaterial.uniforms.time.value = time;
      }

      // Actualizar beacons
      beaconMeshes.forEach(({ mesh }) => {
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.time.value = time;
        }
        mesh.rotation.y += 0.02;
      });

      // Mover yates
      yachts.forEach((yacht) => {
        yacht.userData.angle += yacht.userData.speed;
        yacht.position.x = Math.cos(yacht.userData.angle) * 12;
        yacht.position.y = Math.sin(yacht.userData.angle) * 8;
        yacht.rotation.z = yacht.userData.angle + Math.PI / 2;
      });

      // Rotación suave del mapa
      if (mapMeshRef.current) {
        mapMeshRef.current.rotation.z += 0.001;
      }

      // Pulsación de luz ambiental
      pointLight.intensity = 3 + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (mapRef.current && renderer.domElement) {
        mapRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [showYachts, showFlights]);

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black via-blue-dark to-purple-dark overflow-hidden">
      
      {/* Header ultra-futurista */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
        <div className="premium-map-title">
          <h1 className="text-4xl font-bold holographic-text mb-2">
            Atlas Holográfico España Premium
          </h1>
          <p className="text-white/80 text-lg">
            Mapa 3D flotante con costas brillantes y rutas de lujo en tiempo real
          </p>
        </div>

        {/* Controles premium */}
        <div className="premium-controls">
          <button
            onClick={() => setShowYachts(!showYachts)}
            className={`control-btn ${showYachts ? 'active' : ''}`}
          >
            <Yacht className="w-5 h-5" />
            <span>Yates de Lujo</span>
          </button>
          
          <button
            onClick={() => setShowFlights(!showFlights)}
            className={`control-btn ${showFlights ? 'active' : ''}`}
          >
            <Plane className="w-5 h-5" />
            <span>Jets Privados</span>
          </button>
        </div>
      </div>

      {/* Mapa 3D principal */}
      <div ref={mapRef} className="absolute inset-0 z-10" />

      {/* Panel de información del beacon seleccionado */}
      {selectedBeacon && (
        <div className="absolute bottom-8 left-8 z-20 premium-beacon-panel">
          <div className="beacon-header">
            <div className="beacon-glow" style={{ backgroundColor: selectedBeacon.glow_color }}></div>
            <div>
              <h3 className="text-2xl font-bold text-white">{selectedBeacon.name}</h3>
              <p className="text-white/70 capitalize">{selectedBeacon.type} • {selectedBeacon.luxury_level}</p>
            </div>
          </div>

          <div className="beacon-stats">
            <div className="stat-item">
              <MapPin className="w-5 h-5 text-neon-teal" />
              <div>
                <div className="text-2xl font-bold text-neon-teal">{selectedBeacon.properties}</div>
                <div className="text-white/60 text-sm">Propiedades Premium</div>
              </div>
            </div>

            <div className="stat-item">
              <Zap className="w-5 h-5 text-neon-emerald" />
              <div>
                <div className="text-2xl font-bold text-neon-emerald">
                  {selectedBeacon.luxury_level === 'supreme' ? '★★★' : 
                   selectedBeacon.luxury_level === 'ultra' ? '★★' : '★'}
                </div>
                <div className="text-white/60 text-sm">Nivel de Lujo</div>
              </div>
            </div>
          </div>

          <div className="beacon-actions">
            <button className="premium-action-btn primary">
              <Eye className="w-5 h-5" />
              <span>Tour VR Exclusivo</span>
            </button>
            
            <button className="premium-action-btn secondary">
              <Globe className="w-5 h-5" />
              <span>Explorar Zona</span>
            </button>
          </div>
        </div>
      )}

      {/* Leyenda del mapa */}
      <div className="absolute top-8 right-8 z-20 map-legend">
        <h4 className="text-white font-bold mb-4">Leyenda Premium</h4>
        
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color supreme"></div>
            <span>Supreme (★★★)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color ultra"></div>
            <span>Ultra (★★)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color premium"></div>
            <span>Premium (★)</span>
          </div>
        </div>

        {showYachts && (
          <div className="legend-item">
            <Yacht className="w-4 h-4 text-white" />
            <span>Yates en movimiento</span>
          </div>
        )}

        {showFlights && (
          <div className="legend-item">
            <Plane className="w-4 h-4 text-yellow-400" />
            <span>Rutas de jets privados</span>
          </div>
        )}
      </div>

      {/* Estilos CSS ultra-avanzados */}
      <style jsx>{`
        .premium-map-title {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(14, 231, 231, 0.1));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
        }

        .holographic-text {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7, #FFD700);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic-shimmer 3s ease-in-out infinite;
        }

        .premium-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 1rem;
        }

        .control-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .control-btn:hover {
          background: rgba(14, 231, 231, 0.2);
          border-color: rgba(14, 231, 231, 0.5);
          transform: translateY(-3px);
        }

        .control-btn.active {
          background: rgba(14, 231, 231, 0.3);
          border-color: rgba(14, 231, 231, 0.8);
          box-shadow: 0 0 20px rgba(14, 231, 231, 0.4);
        }

        .premium-beacon-panel {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(14, 231, 231, 0.1));
          backdrop-filter: blur(25px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-appear 0.5s ease;
        }

        .beacon-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .beacon-glow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 0 20px currentColor;
          animation: beacon-pulse 2s ease-in-out infinite;
        }

        .beacon-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .beacon-actions {
          display: flex;
          gap: 1rem;
        }

        .premium-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .premium-action-btn.primary {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          color: #0a0f1a;
          border: none;
        }

        .premium-action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(14, 231, 231, 0.4);
        }

        .premium-action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .premium-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .map-legend {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          max-width: 200px;
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 0.875rem;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .legend-color.supreme {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          box-shadow: 0 0 10px #FFD700;
        }

        .legend-color.ultra {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          box-shadow: 0 0 10px #0EE7E7;
        }

        .legend-color.premium {
          background: linear-gradient(45deg, #A855F7, #8B5CF6);
          box-shadow: 0 0 10px #A855F7;
        }

        @keyframes holographic-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes beacon-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes panel-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
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
