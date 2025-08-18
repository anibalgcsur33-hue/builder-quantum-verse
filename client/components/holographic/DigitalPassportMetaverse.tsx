import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Shield, Key, Globe, Zap, Crown, Eye, Plane, Wallet, QrCode, Fingerprint } from "lucide-react";

interface MetaverseDestination {
  id: string;
  name: string;
  type: 'luxury_district' | 'entertainment' | 'business' | 'exclusive_island' | 'space_station';
  access_level: 'public' | 'premium' | 'vip' | 'ultra_exclusive';
  description: string;
  preview_color: string;
  gateway_animation: string;
  required_credentials: string[];
  luxury_amenities: string[];
  entry_fee_eth: number;
  active_users: number;
}

interface DigitalIdentity {
  passport_id: string;
  holder_name: string;
  access_tier: 'standard' | 'premium' | 'platinum' | 'diamond' | 'quantum';
  verified_assets: number;
  reputation_score: number;
  quantum_signature: string;
  biometric_locked: boolean;
  active_destinations: number;
  total_experiences: number;
}

interface QuantumCode {
  id: string;
  data_layer: string;
  encryption_level: number;
  validity_duration: number;
  access_permissions: string[];
  visual_pattern: string;
  quantum_entanglement: boolean;
}

const metaverseDestinations: MetaverseDestination[] = [
  {
    id: 'madrid-luxury-district',
    name: 'Distrito de Lujo Madrid',
    type: 'luxury_district',
    access_level: 'premium',
    description: 'Mansiones flotantes sobre el Retiro con salones de cristal',
    preview_color: '#FFD700',
    gateway_animation: 'golden_spiral_ascension',
    required_credentials: ['Verified Income', 'Luxury Asset Portfolio'],
    luxury_amenities: ['Michelin Star Restaurants', 'Private Art Galleries', 'Quantum Spas'],
    entry_fee_eth: 2.5,
    active_users: 1247
  },
  {
    id: 'barcelona-creative-hub',
    name: 'Hub Creativo Barcelona',
    type: 'entertainment',
    access_level: 'public',
    description: 'Gaudí meets cyberpunk: arquitectura imposible y arte generativo',
    preview_color: '#A855F7',
    gateway_animation: 'morphing_cathedral_portal',
    required_credentials: ['Digital Identity'],
    luxury_amenities: ['Interactive Art Studios', 'Neural Music Venues', 'Creative Workshops'],
    entry_fee_eth: 0.1,
    active_users: 8932
  },
  {
    id: 'valencia-business-nexus',
    name: 'Nexus de Negocios Valencia',
    type: 'business',
    access_level: 'vip',
    description: 'Rascacielos holográficos para reuniones corporativas inmersivas',
    preview_color: '#0EE7E7',
    gateway_animation: 'corporate_tower_materialization',
    required_credentials: ['Business Verification', 'Professional Network'],
    luxury_amenities: ['Holographic Boardrooms', 'AI Business Analytics', 'Quantum Networking'],
    entry_fee_eth: 5.0,
    active_users: 567
  },
  {
    id: 'ibiza-exclusive-island',
    name: 'Isla Exclusiva Ibiza',
    type: 'exclusive_island',
    access_level: 'ultra_exclusive',
    description: 'Yates voladores, playas de cristal líquido y fiestas en gravedad cero',
    preview_color: '#00E7A7',
    gateway_animation: 'ocean_portal_emergence',
    required_credentials: ['Ultra-VIP Status', 'Celebrity Endorsement', 'Luxury Asset Verification'],
    luxury_amenities: ['Zero-G Beach Clubs', 'Flying Yacht Marina', 'Crystal Cave Spas'],
    entry_fee_eth: 25.0,
    active_users: 89
  },
  {
    id: 'orbital-mansion-station',
    name: 'Estación Mansión Orbital',
    type: 'space_station',
    access_level: 'ultra_exclusive',
    description: 'Mansiones giratorias en el espacio con vistas a la Tierra',
    preview_color: '#FF6B9D',
    gateway_animation: 'space_elevator_ascension',
    required_credentials: ['Quantum Passport', 'Space Tourism License', 'Orbital Asset Ownership'],
    luxury_amenities: ['Earth View Suites', 'Zero-G Gardens', 'Stellar Observatory'],
    entry_fee_eth: 100.0,
    active_users: 23
  }
];

const quantumCodes: QuantumCode[] = [
  {
    id: 'access-alpha',
    data_layer: 'Biometric Authentication',
    encryption_level: 256,
    validity_duration: 3600,
    access_permissions: ['Basic Navigation', 'Public Spaces'],
    visual_pattern: 'spiral_matrix',
    quantum_entanglement: false
  },
  {
    id: 'access-beta',
    data_layer: 'Verified Asset Portfolio',
    encryption_level: 512,
    validity_duration: 7200,
    access_permissions: ['Premium Zones', 'Luxury Services'],
    visual_pattern: 'diamond_cascade',
    quantum_entanglement: true
  },
  {
    id: 'access-gamma',
    data_layer: 'Quantum Identity Matrix',
    encryption_level: 1024,
    validity_duration: 14400,
    access_permissions: ['VIP Access', 'Exclusive Events', 'Private Mansions'],
    visual_pattern: 'hypercube_rotation',
    quantum_entanglement: true
  }
];

export default function DigitalPassportMetaverse() {
  const passportRef = useRef<HTMLDivElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<MetaverseDestination | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [gatewayActive, setGatewayActive] = useState(false);
  const [currentCode, setCurrentCode] = useState<QuantumCode>(quantumCodes[0]);
  const [digitalIdentity, setDigitalIdentity] = useState<DigitalIdentity>({
    passport_id: 'QP-2089-LXRY-7834',
    holder_name: 'Alexandra Sterling',
    access_tier: 'diamond',
    verified_assets: 12,
    reputation_score: 987,
    quantum_signature: 'QS∅∆φ∫∑∏≈',
    biometric_locked: true,
    active_destinations: 3,
    total_experiences: 147
  });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const passportMesh = useRef<THREE.Mesh | null>(null);
  const gatewayMeshes = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (!passportRef.current) return;

    // Configuración ultra-futurista para Pasaporte Digital y Gateway Metaverso
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
    renderer.toneMappingExposure = 3.2;

    passportRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear el pasaporte holográfico flotante
    const passportGeometry = new THREE.BoxGeometry(8, 12, 0.8);
    const passportMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        quantum_signature: { value: new THREE.Color(0x0EE7E7) },
        access_tier: { value: 4.0 }, // Diamond tier
        biometric_active: { value: 1.0 },
        scanning_mode: { value: 0.0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        uniform float access_tier;
        
        void main() {
          vPosition = position;
          vUv = uv;
          vNormal = normal;
          
          // Flotación cuántica del pasaporte
          vec3 pos = position;
          pos.y += sin(time * 2.0 + length(position.xz) * 0.5) * 0.3;
          pos += normal * sin(time * access_tier + length(position)) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 quantum_signature;
        uniform float access_tier;
        uniform float biometric_active;
        uniform float scanning_mode;
        
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Función de ruido cuántico
        float quantum_noise(vec2 p) {
          return sin(p.x * 15.0 + time) * cos(p.y * 12.0 + time * 0.7) * 0.5 + 0.5;
        }
        
        void main() {
          // Patrón de identidad cuántica
          float quantum_pattern = quantum_noise(vUv * 3.0) * quantum_noise(vUv * 7.0);
          
          // Códigos holográficos circulantes
          float code_lines = sin(vUv.y * 20.0 + time * 3.0) * 0.4 + 0.6;
          code_lines *= sin(vUv.x * 15.0 + time * 2.0) * 0.3 + 0.7;
          
          // Brillo según tier de acceso
          float tier_glow = access_tier * 0.2 + 0.6;
          
          // Efecto de escaneo biométrico
          float scan_wave = scanning_mode * sin(vUv.y * 30.0 - time * 10.0) * 0.5 + 0.5;
          
          // Borde de seguridad holográfico
          float edge_glow = 1.0 - length(vUv - 0.5) * 1.8;
          edge_glow = max(edge_glow, 0.0);
          edge_glow = pow(edge_glow, 3.0);
          
          vec3 base_color = quantum_signature * quantum_pattern * code_lines * tier_glow;
          base_color += vec3(1.0, 0.5, 0.0) * scan_wave * scanning_mode;
          base_color += quantum_signature * edge_glow * 0.8;
          
          float alpha = 0.7 + quantum_pattern * 0.2 + edge_glow * 0.3;
          
          gl_FragColor = vec4(base_color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const passport = new THREE.Mesh(passportGeometry, passportMaterial);
    passport.position.set(0, 8, 0);
    passport.rotation.x = Math.PI * 0.1;
    scene.add(passport);
    passportMesh.current = passport;

    // Crear códigos cuánticos espirales alrededor del pasaporte
    const createQuantumCodeSpiral = (code: QuantumCode) => {
      const spiralGroup = new THREE.Group();
      const codeCount = 24;
      
      for (let i = 0; i < codeCount; i++) {
        const codeGeometry = new THREE.PlaneGeometry(1, 1);
        const codeMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            code_index: { value: i },
            encryption_level: { value: code.encryption_level },
            quantum_entangled: { value: code.quantum_entanglement ? 1.0 : 0.0 }
          },
          vertexShader: `
            uniform float time;
            uniform float code_index;
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              
              // Rotación orbital alrededor del pasaporte
              float angle = time * 0.5 + code_index * 0.26;
              float radius = 15.0 + sin(time + code_index) * 2.0;
              float height = sin(angle * 2.0) * 3.0;
              
              vec3 pos = position;
              pos.x += cos(angle) * radius;
              pos.y += height;
              pos.z += sin(angle) * radius;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform float code_index;
            uniform float encryption_level;
            uniform float quantum_entangled;
            varying vec2 vUv;
            
            void main() {
              // Patrón de código QR cuántico
              float pattern = step(0.5, sin(vUv.x * 8.0 + time) * sin(vUv.y * 8.0 + time * 0.7));
              
              // Intensidad según nivel de encriptación
              float intensity = encryption_level / 1024.0;
              
              // Color cuántico entrelazado
              vec3 code_color = quantum_entangled > 0.5 
                ? vec3(0.8, 0.2, 1.0) 
                : vec3(0.2, 0.8, 1.0);
              
              // Brillo pulsante
              float pulse = sin(time * 4.0 + code_index) * 0.3 + 0.7;
              
              vec3 final_color = code_color * pattern * intensity * pulse;
              float alpha = pattern * (0.6 + intensity * 0.4);
              
              gl_FragColor = vec4(final_color, alpha);
            }
          `,
          transparent: true
        });
        
        const codeQuad = new THREE.Mesh(codeGeometry, codeMaterial);
        spiralGroup.add(codeQuad);
      }
      
      return spiralGroup;
    };

    // Añadir espiral de códigos cuánticos
    const quantumSpiral = createQuantumCodeSpiral(currentCode);
    scene.add(quantumSpiral);

    // Crear gateways a los destinos del metaverso
    gatewayMeshes.current = [];
    
    metaverseDestinations.forEach((destination, index) => {
      const gatewayGroup = new THREE.Group();
      
      // Portal principal del gateway
      const portalGeometry = new THREE.RingGeometry(6, 8, 16);
      const portalMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          portal_color: { value: new THREE.Color(destination.preview_color) },
          access_level: { value: getAccessLevelValue(destination.access_level) },
          active_users: { value: destination.active_users },
          gateway_active: { value: 0.0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float time;
          uniform float gateway_active;
          
          void main() {
            vPosition = position;
            vUv = uv;
            
            // Expansión del portal cuando está activo
            vec3 pos = position * (1.0 + gateway_active * 0.2);
            
            // Ondulación del gateway
            float wave = sin(time * 2.0 + length(position) * 0.1) * gateway_active * 0.3;
            pos += normalize(position) * wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 portal_color;
          uniform float access_level;
          uniform float active_users;
          uniform float gateway_active;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Anillo de energía del portal
            float ring_pattern = sin(length(vPosition) * 3.0 - time * 4.0) * 0.5 + 0.5;
            
            // Partículas de usuarios activos
            float user_activity = sin(time * 6.0 + active_users * 0.01) * 0.3 + 0.7;
            
            // Brillo según nivel de acceso
            float access_glow = access_level * 0.25 + 0.5;
            
            // Efecto de activación del gateway
            float activation_pulse = gateway_active * (sin(time * 8.0) * 0.4 + 0.6);
            
            vec3 final_color = portal_color * ring_pattern * user_activity * access_glow;
            final_color += portal_color * activation_pulse * 0.5;
            
            float alpha = ring_pattern * (0.6 + access_glow * 0.3) + activation_pulse * 0.4;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const portal = new THREE.Mesh(portalGeometry, portalMaterial);
      gatewayGroup.add(portal);
      
      // Vista previa del destino dentro del portal
      const previewGeometry = new THREE.CircleGeometry(5, 32);
      const previewMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          destination_type: { value: getDestinationTypeValue(destination.type) },
          preview_color: { value: new THREE.Color(destination.preview_color) }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            
            vec3 pos = position;
            pos.z += sin(time + length(position) * 0.5) * 0.2;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float destination_type;
          uniform vec3 preview_color;
          varying vec2 vUv;
          
          // Simulación visual del destino
          vec3 destination_preview(vec2 uv, float type) {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(uv, center);
            
            if (type < 1.5) { // luxury_district
              float buildings = sin(uv.x * 20.0) * cos(uv.y * 15.0) * 0.5 + 0.5;
              return preview_color * buildings;
            } else if (type < 2.5) { // entertainment
              float waves = sin(uv.x * 8.0 + time) * sin(uv.y * 6.0 + time * 0.7) * 0.4 + 0.6;
              return preview_color * waves;
            } else if (type < 3.5) { // business
              float grid = step(0.9, sin(uv.x * 30.0)) + step(0.9, sin(uv.y * 30.0));
              return preview_color * grid * 0.8;
            } else if (type < 4.5) { // exclusive_island
              float island = 1.0 - smoothstep(0.2, 0.8, dist);
              return preview_color * island;
            } else { // space_station
              float station = sin(dist * 20.0) * 0.3 + 0.7;
              return preview_color * station;
            }
          }
          
          void main() {
            vec3 destination = destination_preview(vUv, destination_type);
            
            // Efecto de portal holográfico
            float hologram = sin(time + length(vUv - 0.5) * 10.0) * 0.2 + 0.8;
            
            vec3 final_color = destination * hologram;
            float alpha = 0.5 + hologram * 0.3;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true
      });
      
      const preview = new THREE.Mesh(previewGeometry, previewMaterial);
      preview.position.z = -0.1;
      gatewayGroup.add(preview);
      
      // Posicionar gateways en formación circular
      const angle = (index / metaverseDestinations.length) * Math.PI * 2;
      const radius = 30;
      gatewayGroup.position.set(
        Math.cos(angle) * radius,
        -5 + index * 2,
        Math.sin(angle) * radius
      );
      gatewayGroup.rotation.y = -angle;
      gatewayGroup.userData = { destination, originalAngle: angle };
      
      scene.add(gatewayGroup);
      gatewayMeshes.current.push(gatewayGroup);
    });

    // Crear campo de estrellas para ambientación espacial
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const starsPositions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 400;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Iluminación cuántica ultra-futurista
    const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
    scene.add(ambientLight);

    const quantumLight = new THREE.PointLight(0x0EE7E7, 5, 100);
    quantumLight.position.set(0, 15, 0);
    scene.add(quantumLight);

    const hologramLight1 = new THREE.DirectionalLight(0xA855F7, 3);
    hologramLight1.position.set(40, 40, 40);
    scene.add(hologramLight1);

    const hologramLight2 = new THREE.DirectionalLight(0x00E7A7, 2.5);
    hologramLight2.position.set(-40, 30, -40);
    scene.add(hologramLight2);

    // Posicionar cámara para vista cinematográfica
    camera.position.set(25, 15, 35);
    camera.lookAt(0, 5, 0);

    // Controles de interacción para gateways
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        gatewayMeshes.current.map(g => g.children[0])
      );

      if (intersects.length > 0) {
        const clickedGateway = intersects[0].object.parent?.userData?.destination as MetaverseDestination;
        if (clickedGateway) {
          setSelectedDestination(clickedGateway);
          setGatewayActive(true);
          console.log(`🌐 Gateway activado: ${clickedGateway.name}`);
        }
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Función auxiliar para obtener valores numéricos
    function getAccessLevelValue(level: string): number {
      switch (level) {
        case 'public': return 1.0;
        case 'premium': return 2.0;
        case 'vip': return 3.0;
        case 'ultra_exclusive': return 4.0;
        default: return 1.0;
      }
    }

    function getDestinationTypeValue(type: string): number {
      switch (type) {
        case 'luxury_district': return 1.0;
        case 'entertainment': return 2.0;
        case 'business': return 3.0;
        case 'exclusive_island': return 4.0;
        case 'space_station': return 5.0;
        default: return 1.0;
      }
    }

    // Loop de animación del metaverso
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.015;

      // Actualizar pasaporte holográfico
      if (passportMesh.current && passportMesh.current.material instanceof THREE.ShaderMaterial) {
        passportMesh.current.material.uniforms.time.value = time;
        passportMesh.current.material.uniforms.scanning_mode.value = isScanning ? 1.0 : 0.0;
      }

      // Rotación del pasaporte
      if (passportMesh.current) {
        passportMesh.current.rotation.y += 0.005;
        passportMesh.current.position.y = 8 + Math.sin(time * 1.5) * 0.8;
      }

      // Actualizar códigos cuánticos espirales
      quantumSpiral.children.forEach((child, index) => {
        if (child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.time.value = time;
        }
      });

      // Actualizar gateways del metaverso
      gatewayMeshes.current.forEach((gateway, index) => {
        gateway.children.forEach(child => {
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
            if (selectedDestination && gateway.userData.destination.id === selectedDestination.id) {
              child.material.uniforms.gateway_active.value = gatewayActive ? 1.0 : 0.0;
            } else {
              child.material.uniforms.gateway_active.value = 0.0;
            }
          }
        });

        // Flotación de gateways
        gateway.position.y = -5 + index * 2 + Math.sin(time + index) * 0.6;
        
        // Rotación suave
        gateway.rotation.y = gateway.userData.originalAngle + time * 0.1;
      });

      // Movimiento del campo de estrellas
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;

      // Luz cuántica pulsante
      quantumLight.intensity = 5 + Math.sin(time * 3) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (passportRef.current && renderer.domElement) {
        passportRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isScanning, gatewayActive, selectedDestination, currentCode]);

  const startBiometricScan = () => {
    setIsScanning(true);
    
    // Simular escaneo biométrico
    setTimeout(() => {
      setIsScanning(false);
      console.log('🔒 Escaneo biométrico completado');
    }, 3000);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'quantum': return <Crown className="w-5 h-5 text-purple-400" />;
      case 'diamond': return <Crown className="w-5 h-5 text-blue-400" />;
      case 'platinum': return <Shield className="w-5 h-5 text-gray-300" />;
      case 'premium': return <Key className="w-5 h-5 text-yellow-400" />;
      case 'standard': return <Globe className="w-5 h-5 text-white" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'ultra_exclusive': return 'text-purple-400 bg-purple-900/20';
      case 'vip': return 'text-amber-400 bg-amber-900/20';
      case 'premium': return 'text-blue-400 bg-blue-900/20';
      case 'public': return 'text-green-400 bg-green-900/20';
      default: return 'text-white bg-gray-900/20';
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Header del Pasaporte Digital */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="passport-title">
          <h1 className="text-4xl font-bold quantum-text mb-2">
            Pasaporte Digital Metaverso
          </h1>
          <p className="text-white/80 text-lg">
            Códigos Cuánticos • Gateway Holográfico • Identidad Verificada • Acceso Universal
          </p>
        </div>

        {/* Controles del pasaporte */}
        <div className="passport-controls">
          <button
            onClick={startBiometricScan}
            disabled={isScanning}
            className={`scan-btn ${isScanning ? 'scanning' : ''}`}
          >
            <Fingerprint className="w-6 h-6" />
            <span>{isScanning ? 'Escaneando...' : 'Escaneo Biométrico'}</span>
          </button>
          
          <button
            onClick={() => setGatewayActive(!gatewayActive)}
            className={`gateway-btn ${gatewayActive ? 'active' : ''}`}
          >
            <Globe className="w-6 h-6" />
            <span>{gatewayActive ? 'Gateway Activo' : 'Activar Gateway'}</span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal */}
      <div ref={passportRef} className="absolute inset-0 z-10" />

      {/* Panel de identidad digital */}
      <div className="absolute bottom-8 left-8 z-20 identity-panel">
        <div className="identity-header">
          <div className="passport-preview">
            <div className="passport-hologram">
              <QrCode className="w-8 h-8 text-neon-teal" />
            </div>
          </div>
          
          <div className="identity-info">
            <div className="flex items-center gap-2 mb-2">
              {getTierIcon(digitalIdentity.access_tier)}
              <span className={`tier-badge ${digitalIdentity.access_tier}`}>
                {digitalIdentity.access_tier.toUpperCase()}
              </span>
              {digitalIdentity.biometric_locked && (
                <span className="bio-badge">
                  <Fingerprint className="w-3 h-3" />
                  BIOMÉTRICO
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{digitalIdentity.holder_name}</h3>
            <p className="text-white/70 text-sm mb-2">ID: {digitalIdentity.passport_id}</p>
            
            <div className="quantum-signature">
              <span className="text-neon-teal font-mono text-lg">{digitalIdentity.quantum_signature}</span>
            </div>
          </div>
        </div>

        <div className="identity-stats">
          <div className="stat-grid">
            <div className="stat-item">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="stat-value">{digitalIdentity.verified_assets}</span>
              <span className="stat-label">Assets Verificados</span>
            </div>
            <div className="stat-item">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="stat-value">{digitalIdentity.reputation_score}</span>
              <span className="stat-label">Reputación</span>
            </div>
            <div className="stat-item">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="stat-value">{digitalIdentity.total_experiences}</span>
              <span className="stat-label">Experiencias</span>
            </div>
          </div>
        </div>

        <div className="quantum-codes">
          <h4 className="text-white font-semibold mb-2">Códigos Cuánticos Activos</h4>
          <div className="codes-list">
            {quantumCodes.map((code, index) => (
              <div
                key={code.id}
                onClick={() => setCurrentCode(code)}
                className={`code-item ${currentCode.id === code.id ? 'active' : ''}`}
              >
                <div className="code-encryption">
                  <span className="encryption-level">{code.encryption_level}-bit</span>
                  {code.quantum_entanglement && (
                    <Zap className="w-3 h-3 text-purple-400" />
                  )}
                </div>
                <span className="code-layer">{code.data_layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de destino seleccionado */}
      {selectedDestination && (
        <div className="absolute bottom-8 right-8 z-20 destination-panel">
          <div className="destination-header">
            <div 
              className="destination-preview"
              style={{ backgroundColor: selectedDestination.preview_color + '30', borderColor: selectedDestination.preview_color }}
            >
              <Globe className="w-8 h-8" style={{ color: selectedDestination.preview_color }} />
            </div>
            
            <div className="destination-info">
              <div className="flex items-center gap-2 mb-2">
                <span className={`access-badge ${getAccessLevelColor(selectedDestination.access_level)}`}>
                  {selectedDestination.access_level.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{selectedDestination.name}</h3>
              <p className="text-white/70 text-sm mb-3">{selectedDestination.description}</p>
              
              <div className="destination-stats">
                <div className="stat-row">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  <span>{selectedDestination.entry_fee_eth} ETH</span>
                </div>
                <div className="stat-row">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>{selectedDestination.active_users.toLocaleString()} usuarios activos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="destination-amenities">
            <h4 className="text-white font-semibold mb-2">Amenidades de Lujo</h4>
            <div className="amenities-list">
              {selectedDestination.luxury_amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <Sparkles className="w-3 h-3 text-neon-emerald" />
                  <span className="text-sm text-white/80">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="destination-requirements">
            <h4 className="text-white font-semibold mb-2">Credenciales Requeridas</h4>
            <div className="requirements-list">
              {selectedDestination.required_credentials.map((credential, index) => (
                <div key={index} className="requirement-item">
                  <Key className="w-3 h-3 text-blue-400" />
                  <span className="text-sm text-white/80">{credential}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="destination-actions">
            <button className="travel-btn primary">
              <Plane className="w-5 h-5" />
              <span>Viajar Ahora</span>
            </button>
            
            <button className="travel-btn secondary">
              <Eye className="w-5 h-5" />
              <span>Vista Previa</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de destinos del metaverso */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 destinations-list">
        <h4 className="text-white font-bold mb-4">Destinos Metaverso</h4>
        
        <div className="destinations-grid">
          {metaverseDestinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
              className={`destination-mini ${selectedDestination?.id === destination.id ? 'active' : ''}`}
              style={{ borderColor: destination.preview_color }}
            >
              <div 
                className="destination-glow"
                style={{ backgroundColor: destination.preview_color }}
              ></div>
              <div className="destination-mini-info">
                <div className="destination-mini-name">{destination.name}</div>
                <div className="destination-mini-type">{destination.type.replace('_', ' ')}</div>
                <div className="destination-mini-users">{destination.active_users} usuarios</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-futuristas para Pasaporte Digital */}
      <style jsx>{`
        .passport-title {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(14, 231, 231, 0.1));
          backdrop-filter: blur(25px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 600px;
        }

        .quantum-text {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7, #A855F7, #FFD700);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: quantum-flow 5s ease-in-out infinite;
        }

        .passport-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .scan-btn, .gateway-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 15px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 180px;
          justify-content: center;
        }

        .scan-btn {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          color: black;
        }

        .scan-btn.scanning {
          animation: scanning-pulse 1s ease-in-out infinite;
        }

        .gateway-btn {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.5);
        }

        .gateway-btn.active {
          background: linear-gradient(45deg, #A855F7, #8B5CF6);
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
        }

        .scan-btn:hover:not(:disabled), .gateway-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(14, 231, 231, 0.4);
        }

        .identity-panel, .destination-panel {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(14, 231, 231, 0.1));
          backdrop-filter: blur(30px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-slide-up 0.5s ease;
        }

        .identity-header, .destination-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .passport-preview, .destination-preview {
          width: 80px;
          height: 80px;
          border: 3px solid;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: passport-float 3s ease-in-out infinite;
        }

        .passport-hologram {
          animation: hologram-flicker 2s ease-in-out infinite;
        }

        .identity-info, .destination-info {
          flex: 1;
        }

        .tier-badge {
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          text-transform: uppercase;
        }

        .tier-badge.quantum {
          background: rgba(168, 85, 247, 0.3);
          color: #A855F7;
        }

        .tier-badge.diamond {
          background: rgba(59, 130, 246, 0.3);
          color: #3B82F6;
        }

        .tier-badge.platinum {
          background: rgba(156, 163, 175, 0.3);
          color: #9CA3AF;
        }

        .tier-badge.premium {
          background: rgba(245, 158, 11, 0.3);
          color: #F59E0B;
        }

        .tier-badge.standard {
          background: rgba(34, 197, 94, 0.3);
          color: #22C55E;
        }

        .bio-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          background: rgba(0, 231, 167, 0.2);
          color: #00E7A7;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .quantum-signature {
          font-family: 'Courier New', monospace;
          padding: 0.5rem;
          background: rgba(14, 231, 231, 0.1);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 8px;
        }

        .identity-stats {
          margin-bottom: 1.5rem;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: center;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .quantum-codes {
          margin-bottom: 1.5rem;
        }

        .codes-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .code-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .code-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(14, 231, 231, 0.3);
        }

        .code-item.active {
          background: rgba(14, 231, 231, 0.2);
          border-color: rgba(14, 231, 231, 0.5);
          box-shadow: 0 0 15px rgba(14, 231, 231, 0.3);
        }

        .code-encryption {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .encryption-level {
          font-size: 0.75rem;
          font-weight: bold;
          color: #0EE7E7;
        }

        .code-layer {
          font-size: 0.875rem;
          color: white;
        }

        .access-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .destination-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: white;
        }

        .destination-amenities, .destination-requirements {
          margin-bottom: 1.5rem;
        }

        .amenities-list, .requirements-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .amenity-item, .requirement-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .destination-actions {
          display: flex;
          gap: 1rem;
        }

        .travel-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .travel-btn.primary {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          color: black;
          border: none;
        }

        .travel-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(14, 231, 231, 0.4);
        }

        .travel-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .travel-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .destinations-list {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 280px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .destinations-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .destination-mini {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .destination-mini:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .destination-mini.active {
          background: rgba(14, 231, 231, 0.2);
          box-shadow: 0 0 20px rgba(14, 231, 231, 0.3);
        }

        .destination-glow {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 15px currentColor;
          animation: destination-pulse 2s ease-in-out infinite;
        }

        .destination-mini-info {
          flex: 1;
          color: white;
        }

        .destination-mini-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .destination-mini-type {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: capitalize;
          margin-bottom: 0.25rem;
        }

        .destination-mini-users {
          font-size: 0.7rem;
          color: #00E7A7;
          font-weight: 500;
        }

        @keyframes quantum-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes scanning-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(14, 231, 231, 0.5); }
          50% { box-shadow: 0 0 40px rgba(14, 231, 231, 0.8); }
        }

        @keyframes passport-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(2deg);
          }
        }

        @keyframes hologram-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes destination-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.4);
            opacity: 0.7;
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
