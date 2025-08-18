import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Wine, Crown, Star, Eye, Sparkles, Globe, Users, Volume2, Settings } from "lucide-react";

interface VIPGuest {
  id: string;
  name: string;
  avatar_color: string;
  seat_position: number;
  vip_tier: 'diamond' | 'platinum' | 'gold';
  current_drink: string;
  interaction_mood: 'relaxed' | 'social' | 'contemplative';
}

interface SommelierRecommendation {
  wine_name: string;
  vintage: string;
  origin: string;
  description: string;
  mood_pairing: string;
  price_btc: number;
  rarity_level: number;
}

const vipGuests: VIPGuest[] = [
  {
    id: 'guest-001',
    name: 'Alexandra Sterling',
    avatar_color: '#A855F7',
    seat_position: 0,
    vip_tier: 'diamond',
    current_drink: 'Dom Pérignon Cosmic Reserve 2089',
    interaction_mood: 'contemplative'
  },
  {
    id: 'guest-002', 
    name: 'Marcus Quantum',
    avatar_color: '#0EE7E7',
    seat_position: 1,
    vip_tier: 'platinum',
    current_drink: 'Château Margaux Stellar Edition',
    interaction_mood: 'social'
  },
  {
    id: 'guest-003',
    name: 'Sophia Luna',
    avatar_color: '#FFD700',
    seat_position: 2,
    vip_tier: 'gold',
    current_drink: 'Krug Grande Cuvée Zero Gravity',
    interaction_mood: 'relaxed'
  },
  {
    id: 'guest-004',
    name: 'Viktor Cosmos',
    avatar_color: '#00E7A7',
    seat_position: 3,
    vip_tier: 'diamond',
    current_drink: 'Romanée-Conti Nebula Reserve',
    interaction_mood: 'social'
  },
  {
    id: 'guest-005',
    name: 'Isabella Void',
    avatar_color: '#FF6B9D',
    seat_position: 4,
    vip_tier: 'platinum',
    current_drink: 'Armand de Brignac Ace of Spades Cosmic',
    interaction_mood: 'contemplative'
  }
];

const sommelierRecommendations: SommelierRecommendation[] = [
  {
    wine_name: 'Château Pétrus Stellar',
    vintage: '2089',
    origin: 'Bordeaux Orbital Vineyard',
    description: 'Aged in zero gravity for unparalleled complexity and ethereal notes',
    mood_pairing: 'Perfect for cosmic contemplation',
    price_btc: 15.5,
    rarity_level: 5
  },
  {
    wine_name: 'Dom Pérignon Aurora',
    vintage: '2088',
    origin: 'Champagne Space Station',
    description: 'Bubbles that dance like stellar aurora, crisp and luminous',
    mood_pairing: 'Ideal for celebration among stars',
    price_btc: 8.9,
    rarity_level: 4
  },
  {
    wine_name: 'Screaming Eagle Nebula',
    vintage: '2087',
    origin: 'Napa Valley Orbital',
    description: 'Deep cosmic red with notes of dark matter and stardust',
    mood_pairing: 'For deep conversations in the void',
    price_btc: 22.1,
    rarity_level: 5
  }
];

export default function VRLoungesVIP() {
  const loungeRef = useRef<HTMLDivElement>(null);
  const [selectedGuest, setSelectedGuest] = useState<VIPGuest | null>(null);
  const [sommelierActive, setSommelierActive] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState<SommelierRecommendation | null>(null);
  const [ambientMode, setAmbientMode] = useState<'aurora' | 'stellar' | 'cosmic'>('stellar');
  const sceneRef = useRef<THREE.Scene | null>(null);
  const chairMeshes = useRef<Array<{ mesh: THREE.Mesh, guest: VIPGuest }>>([]);

  useEffect(() => {
    if (!loungeRef.current) return;

    // Configuración ultra-futurista para VR Lounge espacial
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
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
    renderer.toneMappingExposure = 2.5;

    loungeRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear la estructura principal del lounge flotante
    const loungeGeometry = new THREE.CylinderGeometry(25, 25, 8, 32);
    const loungeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        neon_primary: { value: new THREE.Color(0x0EE7E7) },
        neon_secondary: { value: new THREE.Color(0xA855F7) },
        ambient_mode: { value: 1.0 } // 1.0=stellar, 2.0=aurora, 3.0=cosmic
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          vPosition = position;
          vUv = uv;
          vNormal = normal;
          
          // Flotación sutil del lounge en el espacio
          vec3 pos = position;
          pos.y += sin(time * 0.5 + length(position.xz) * 0.02) * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 neon_primary;
        uniform vec3 neon_secondary;
        uniform float ambient_mode;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Efecto de cristal templado futurista
          float crystal_pattern = sin(vUv.x * 10.0) * cos(vUv.y * 8.0) * 0.3 + 0.7;
          
          // Luces neón que pulsan alrededor de la estructura
          float neon_pulse = sin(time * 2.0 + length(vUv - 0.5) * 5.0) * 0.4 + 0.6;
          
          // Mezcla de colores según modo ambiente
          vec3 base_color = mix(neon_primary, neon_secondary, ambient_mode * 0.3);
          vec3 final_color = base_color * crystal_pattern * neon_pulse;
          
          // Transparencia para efecto cristalino
          float alpha = 0.6 + crystal_pattern * 0.2;
          
          gl_FragColor = vec4(final_color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const lounge = new THREE.Mesh(loungeGeometry, loungeMaterial);
    lounge.position.y = 0;
    scene.add(lounge);

    // Crear el suelo de cristal que muestra la Tierra
    const floorGeometry = new THREE.CircleGeometry(24, 64);
    const floorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        earth_texture: { value: null },
        glass_thickness: { value: 0.95 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float glass_thickness;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        // Simulación de la Tierra vista desde el espacio
        vec3 earth_simulation(vec2 uv) {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(uv, center);
          
          // Continentes (simulados con ruido)
          float continent = sin(uv.x * 8.0 + time * 0.1) * cos(uv.y * 6.0) * 0.5 + 0.5;
          continent = smoothstep(0.3, 0.7, continent);
          
          // Océanos con movimiento sutil
          vec3 ocean_color = vec3(0.1, 0.3, 0.8) * (1.0 - continent);
          ocean_color += sin(time + uv.x * 20.0) * sin(time + uv.y * 15.0) * 0.1;
          
          // Continentes verdes/marrones
          vec3 land_color = mix(vec3(0.2, 0.4, 0.1), vec3(0.4, 0.3, 0.2), 
                               sin(uv.x * 15.0) * 0.5 + 0.5) * continent;
          
          // Nubes blancas flotantes
          float clouds = sin(uv.x * 12.0 + time * 0.3) * cos(uv.y * 10.0 + time * 0.2) * 0.3 + 0.7;
          clouds = smoothstep(0.8, 1.0, clouds) * 0.4;
          
          // Combinar todo
          vec3 earth = ocean_color + land_color;
          earth = mix(earth, vec3(1.0, 1.0, 1.0), clouds);
          
          // Efecto de curvatura terrestre
          float edge_fade = 1.0 - smoothstep(0.0, 0.8, dist);
          earth *= edge_fade;
          
          return earth;
        }
        
        void main() {
          vec3 earth = earth_simulation(vUv);
          
          // Efecto de cristal con reflexiones
          float glass_effect = sin(length(vPosition.xy) * 5.0 + time) * 0.1 + glass_thickness;
          
          // Reflexiones del lounge en el cristal
          vec3 reflection_color = vec3(0.0, 0.9, 0.9) * (1.0 - glass_effect) * 0.2;
          
          vec3 final_color = earth * glass_effect + reflection_color;
          float alpha = 0.85 + sin(time + length(vUv - 0.5) * 3.0) * 0.1;
          
          gl_FragColor = vec4(final_color, alpha);
        }
      `,
      transparent: true
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4;
    scene.add(floor);

    // Crear sillas de cristal levitantes
    chairMeshes.current = [];
    
    vipGuests.forEach((guest, index) => {
      // Estructura de la silla cristalina
      const chairGroup = new THREE.Group();
      
      // Base de la silla (cristal flotante)
      const seatGeometry = new THREE.BoxGeometry(3, 0.5, 3);
      const seatMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          guest_color: { value: new THREE.Color(guest.avatar_color) },
          vip_intensity: { value: guest.vip_tier === 'diamond' ? 3.0 : guest.vip_tier === 'platinum' ? 2.0 : 1.0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float time;
          uniform float vip_intensity;
          
          void main() {
            vPosition = position;
            vUv = uv;
            
            // Levitación sutil según tier VIP
            vec3 pos = position;
            pos.y += sin(time * vip_intensity + float(gl_VertexID)) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 guest_color;
          uniform float vip_intensity;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Efecto cristalino con brillo VIP
            float crystal_shine = sin(time + length(vPosition) * 3.0) * 0.3 + 0.7;
            crystal_shine *= vip_intensity * 0.3 + 0.7;
            
            // Patrones de luz según posición en el cristal
            float light_pattern = sin(vUv.x * 5.0) * cos(vUv.y * 5.0) * 0.2 + 0.8;
            
            vec3 final_color = guest_color * crystal_shine * light_pattern;
            float alpha = 0.4 + crystal_shine * 0.3;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true
      });
      
      const seat = new THREE.Mesh(seatGeometry, seatMaterial);
      chairGroup.add(seat);
      
      // Respaldo cristalino
      const backrestGeometry = new THREE.BoxGeometry(3, 4, 0.3);
      const backrest = new THREE.Mesh(backrestGeometry, seatMaterial.clone());
      backrest.position.set(0, 2.25, -1.35);
      chairGroup.add(backrest);
      
      // Posicionar sillas en círculo elegante
      const angle = (index / vipGuests.length) * Math.PI * 2;
      const radius = 15;
      chairGroup.position.set(
        Math.cos(angle) * radius,
        2 + index * 0.2, // Alturas ligeramente diferentes
        Math.sin(angle) * radius
      );
      chairGroup.userData = { guest, floatOffset: index * 0.5 };
      
      scene.add(chairGroup);
      chairMeshes.current.push({ mesh: chairGroup, guest });

      // Crear avatar holográfico del huésped
      const avatarGeometry = new THREE.CapsuleGeometry(0.5, 2, 8, 16);
      const avatarMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          avatar_color: { value: new THREE.Color(guest.avatar_color) },
          mood_factor: { value: guest.interaction_mood === 'social' ? 2.0 : guest.interaction_mood === 'relaxed' ? 1.0 : 1.5 }
        },
        vertexShader: `
          varying vec3 vPosition;
          uniform float time;
          uniform float mood_factor;
          
          void main() {
            vPosition = position;
            
            // Animación sutil según mood
            vec3 pos = position;
            pos.x += sin(time * mood_factor + length(position)) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 avatar_color;
          uniform float mood_factor;
          varying vec3 vPosition;
          
          void main() {
            // Efecto holográfico del avatar
            float hologram = sin(time * 2.0 + length(vPosition) * 4.0) * 0.3 + 0.7;
            
            // Intensidad según mood
            float mood_glow = mood_factor * 0.2 + 0.6;
            
            vec3 final_color = avatar_color * hologram * mood_glow;
            float alpha = 0.7 + hologram * 0.2;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true
      });
      
      const avatar = new THREE.Mesh(avatarGeometry, avatarMaterial);
      avatar.position.copy(chairGroup.position);
      avatar.position.y += 3;
      scene.add(avatar);

      // Añadir partículas ambientales alrededor de cada huésped VIP
      if (guest.vip_tier === 'diamond' || guest.vip_tier === 'platinum') {
        const particleCount = 30;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 1] = Math.random() * 6;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
          color: guest.avatar_color,
          size: 0.1,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.position.copy(chairGroup.position);
        scene.add(particles);
      }
    });

    // Crear sommelier holográfico IA
    const sommelierGeometry = new THREE.CylinderGeometry(1, 1, 3, 16);
    const sommelierMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        ai_color: { value: new THREE.Color(0x00E7A7) },
        service_mode: { value: 1.0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          // Movimiento de servicio elegante
          vec3 pos = position;
          pos.y += sin(time + length(position.xz)) * 0.2;
          pos.x += cos(time * 0.5) * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 ai_color;
        uniform float service_mode;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Patrón holográfico de IA
          float ai_pattern = sin(vUv.y * 15.0 + time * 3.0) * 0.4 + 0.6;
          ai_pattern *= sin(vUv.x * 10.0 + time * 2.0) * 0.3 + 0.7;
          
          // Glow de servicio activo
          float service_glow = service_mode * 0.5 + 0.5;
          
          vec3 final_color = ai_color * ai_pattern * service_glow;
          float alpha = 0.8 + ai_pattern * 0.2;
          
          gl_FragColor = vec4(final_color, alpha);
        }
      `,
      transparent: true
    });

    const sommelier = new THREE.Mesh(sommelierGeometry, sommelierMaterial);
    sommelier.position.set(0, 4, 0); // Centro del lounge
    scene.add(sommelier);

    // Crear campo de estrellas infinito en el fondo
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 500;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Crear nebulosas de fondo
    const nebulaGeometry = new THREE.PlaneGeometry(200, 200);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        nebula_color1: { value: new THREE.Color(0x6B46C1) },
        nebula_color2: { value: new THREE.Color(0x0F172A) }
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
        uniform vec3 nebula_color1;
        uniform vec3 nebula_color2;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return sin(p.x * 10.0) * cos(p.y * 8.0) * 0.5 + 0.5;
        }
        
        void main() {
          vec2 pos = vUv + time * 0.02;
          float n1 = noise(pos * 2.0);
          float n2 = noise(pos * 4.0 + vec2(100.0));
          
          vec3 nebula = mix(nebula_color2, nebula_color1, n1 * n2);
          float alpha = (n1 * n2) * 0.3;
          
          gl_FragColor = vec4(nebula, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Añadir múltiples planos de nebulosa
    for (let i = 0; i < 3; i++) {
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial.clone());
      nebula.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 200,
        -100 - i * 50
      );
      nebula.rotation.z = Math.random() * Math.PI;
      scene.add(nebula);
    }

    // Iluminación espacial ultra-luxury
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0EE7E7, 4);
    mainLight.position.set(40, 50, 40);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const spaceLight1 = new THREE.PointLight(0xA855F7, 3, 60);
    spaceLight1.position.set(-30, 30, 30);
    scene.add(spaceLight1);

    const spaceLight2 = new THREE.PointLight(0x00E7A7, 2.5, 50);
    spaceLight2.position.set(30, 40, -20);
    scene.add(spaceLight2);

    const earthLight = new THREE.PointLight(0x4F94CD, 2, 80);
    earthLight.position.set(0, -20, 0); // Luz desde la Tierra
    scene.add(earthLight);

    // Posicionar cámara para vista cinematográfica del lounge espacial
    camera.position.set(35, 25, 35);
    camera.lookAt(0, 0, 0);

    // Controles de interacción para huéspedes VIP
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(chairMeshes.current.map(c => c.mesh));

      if (intersects.length > 0) {
        const clickedGuest = intersects[0].object.parent?.userData?.guest as VIPGuest;
        if (clickedGuest) {
          setSelectedGuest(clickedGuest);
          console.log(`👑 Huésped VIP seleccionado: ${clickedGuest.name}`);
        }
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Loop de animación espacial cinematográfica
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Actualizar shaders del lounge
      if (loungeMaterial.uniforms) {
        loungeMaterial.uniforms.time.value = time;
        loungeMaterial.uniforms.ambient_mode.value = ambientMode === 'stellar' ? 1.0 : ambientMode === 'aurora' ? 2.0 : 3.0;
      }

      // Actualizar suelo de cristal con vista de la Tierra
      if (floorMaterial.uniforms) {
        floorMaterial.uniforms.time.value = time;
      }

      // Actualizar sillas cristalinas levitantes
      chairMeshes.current.forEach(({ mesh, guest }, index) => {
        // Levitación suave en el espacio
        mesh.position.y = 2 + Math.sin(time * 1.5 + mesh.userData.floatOffset) * 0.4;
        
        // Rotación sutil
        mesh.rotation.y += 0.003;
        
        // Actualizar shaders de la silla
        mesh.children.forEach((child) => {
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
          }
        });
      });

      // Animar sommelier IA
      if (sommelierMaterial.uniforms) {
        sommelierMaterial.uniforms.time.value = time;
        sommelierMaterial.uniforms.service_mode.value = sommelierActive ? 2.0 : 1.0;
      }
      
      // Movimiento orbital del sommelier
      sommelier.position.x = Math.cos(time * 0.5) * 8;
      sommelier.position.z = Math.sin(time * 0.5) * 8;
      sommelier.rotation.y = -time * 0.5;

      // Actualizar avatares holográficos
      scene.children.forEach((child) => {
        if (child.material instanceof THREE.ShaderMaterial && child.geometry instanceof THREE.CapsuleGeometry) {
          child.material.uniforms.time.value = time;
        }
      });

      // Actualizar nebulosas de fondo
      scene.children.forEach((child) => {
        if (child.material instanceof THREE.ShaderMaterial && child.geometry instanceof THREE.PlaneGeometry) {
          child.material.uniforms.time.value = time;
        }
      });

      // Rotación lenta del campo de estrellas
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // Flotación general del lounge en el espacio
      lounge.position.y = Math.sin(time * 0.3) * 0.5;
      lounge.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (loungeRef.current && renderer.domElement) {
        loungeRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [ambientMode, sommelierActive]);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return <Crown className="w-5 h-5 text-purple-400" />;
      case 'platinum': return <Star className="w-5 h-5 text-blue-400" />;
      case 'gold': return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'social': return 'text-neon-teal bg-teal-900/20';
      case 'relaxed': return 'text-emerald-400 bg-emerald-900/20';
      case 'contemplative': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-white bg-gray-900/20';
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Header del VR Lounge espacial */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="lounge-title">
          <h1 className="text-4xl font-bold space-text mb-2">
            VR Lounge VIP Espacial
          </h1>
          <p className="text-white/80 text-lg">
            Flotando en el cosmos • Vista de la Tierra • Sommelier IA • Cristales levitantes
          </p>
        </div>

        {/* Controles de ambiente */}
        <div className="ambient-controls">
          <button
            onClick={() => setAmbientMode('stellar')}
            className={`ambient-btn ${ambientMode === 'stellar' ? 'active' : ''}`}
          >
            <Star className="w-5 h-5" />
            <span>Stellar</span>
          </button>
          
          <button
            onClick={() => setAmbientMode('aurora')}
            className={`ambient-btn ${ambientMode === 'aurora' ? 'active' : ''}`}
          >
            <Eye className="w-5 h-5" />
            <span>Aurora</span>
          </button>
          
          <button
            onClick={() => setAmbientMode('cosmic')}
            className={`ambient-btn ${ambientMode === 'cosmic' ? 'active' : ''}`}
          >
            <Globe className="w-5 h-5" />
            <span>Cosmic</span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal del lounge */}
      <div ref={loungeRef} className="absolute inset-0 z-10" />

      {/* Panel de huésped VIP seleccionado */}
      {selectedGuest && (
        <div className="absolute bottom-8 left-8 z-20 vip-guest-panel">
          <div className="guest-header">
            <div 
              className="guest-avatar"
              style={{ backgroundColor: selectedGuest.avatar_color + '30', borderColor: selectedGuest.avatar_color }}
            >
              {getTierIcon(selectedGuest.vip_tier)}
            </div>
            
            <div className="guest-info">
              <div className="flex items-center gap-2 mb-2">
                <span className={`tier-badge ${selectedGuest.vip_tier}`}>
                  {selectedGuest.vip_tier.toUpperCase()}
                </span>
                <span className={`mood-badge ${getMoodColor(selectedGuest.interaction_mood)}`}>
                  {selectedGuest.interaction_mood}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">{selectedGuest.name}</h3>
              <p className="text-white/70 text-sm mb-3">Posición {selectedGuest.seat_position + 1} • Cristal Levitante</p>
              
              <div className="current-service">
                <Wine className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-medium">{selectedGuest.current_drink}</span>
              </div>
            </div>
          </div>

          <div className="guest-actions">
            <button 
              onClick={() => setSommelierActive(!sommelierActive)}
              className={`service-btn ${sommelierActive ? 'active' : ''}`}
            >
              <Wine className="w-5 h-5" />
              <span>Llamar Sommelier IA</span>
            </button>
            
            <button className="service-btn secondary">
              <Volume2 className="w-5 h-5" />
              <span>Música Ambiental</span>
            </button>
          </div>
        </div>
      )}

      {/* Panel del Sommelier IA */}
      {sommelierActive && (
        <div className="absolute bottom-8 right-8 z-20 sommelier-panel">
          <div className="sommelier-header">
            <div className="ai-avatar">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Sommelier IA Cósmico</h3>
              <p className="text-emerald-400 text-sm">Selecciones curadas para el infinito</p>
            </div>
          </div>

          <div className="wine-recommendations">
            <h4 className="text-white font-semibold mb-3">Recomendaciones Estelares</h4>
            <div className="recommendations-list">
              {sommelierRecommendations.map((wine, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentRecommendation(wine)}
                  className={`wine-item ${currentRecommendation?.wine_name === wine.wine_name ? 'selected' : ''}`}
                >
                  <div className="wine-rarity">
                    {Array.from({ length: wine.rarity_level }, (_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400" />
                    ))}
                  </div>
                  <div className="wine-details">
                    <h5 className="wine-name">{wine.wine_name}</h5>
                    <p className="wine-vintage">{wine.vintage} • {wine.origin}</p>
                    <div className="wine-price">
                      <span className="btc-price">{wine.price_btc} BTC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentRecommendation && (
            <div className="wine-details-panel">
              <h4 className="text-white font-bold mb-2">{currentRecommendation.wine_name}</h4>
              <p className="text-white/80 text-sm mb-2">{currentRecommendation.description}</p>
              <p className="text-emerald-400 text-sm italic mb-3">{currentRecommendation.mood_pairing}</p>
              
              <button className="order-btn">
                <Wine className="w-5 h-5" />
                <span>Servir a Mesa</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lista de huéspedes VIP */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 guests-list">
        <h4 className="text-white font-bold mb-4">Huéspedes VIP Activos</h4>
        <div className="guests-grid">
          {vipGuests.map((guest) => (
            <div
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              className={`guest-mini ${selectedGuest?.id === guest.id ? 'active' : ''}`}
              style={{ borderColor: guest.avatar_color }}
            >
              <div 
                className="guest-glow"
                style={{ backgroundColor: guest.avatar_color }}
              ></div>
              <div className="guest-mini-info">
                <div className="guest-mini-name">{guest.name.split(' ')[0]}</div>
                <div className="guest-mini-tier">{getTierIcon(guest.vip_tier)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-futuristas para VR Lounge espacial */}
      <style jsx>{`
        .lounge-title {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 231, 167, 0.1));
          backdrop-filter: blur(25px);
          border: 2px solid rgba(0, 231, 167, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 500px;
        }

        .space-text {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7, #A855F7, #FFD700);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: space-flow 6s ease-in-out infinite;
        }

        .ambient-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .ambient-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          color: white;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .ambient-btn:hover {
          background: rgba(0, 231, 167, 0.2);
          border-color: rgba(0, 231, 167, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 231, 167, 0.3);
        }

        .ambient-btn.active {
          background: rgba(0, 231, 167, 0.3);
          border-color: rgba(0, 231, 167, 0.8);
          box-shadow: 0 0 25px rgba(0, 231, 167, 0.5);
        }

        .vip-guest-panel {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(30px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 30px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-slide-up 0.5s ease;
        }

        .guest-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .guest-avatar {
          width: 80px;
          height: 80px;
          border: 3px solid;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: avatar-float 3s ease-in-out infinite;
        }

        .guest-info {
          flex: 1;
        }

        .tier-badge {
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          text-transform: uppercase;
        }

        .tier-badge.diamond {
          background: rgba(168, 85, 247, 0.3);
          color: #A855F7;
        }

        .tier-badge.platinum {
          background: rgba(59, 130, 246, 0.3);
          color: #3B82F6;
        }

        .tier-badge.gold {
          background: rgba(245, 158, 11, 0.3);
          color: #F59E0B;
        }

        .mood-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          text-transform: capitalize;
        }

        .current-service {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .guest-actions {
          display: flex;
          gap: 1rem;
        }

        .service-btn {
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

        .service-btn {
          background: linear-gradient(45deg, #00E7A7, #0EE7E7);
          color: black;
          border: none;
        }

        .service-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0, 231, 167, 0.4);
        }

        .service-btn.active {
          background: linear-gradient(45deg, #A855F7, #8B5CF6);
          color: white;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
        }

        .service-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .service-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .sommelier-panel {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 231, 167, 0.1));
          backdrop-filter: blur(30px);
          border: 2px solid rgba(0, 231, 167, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 350px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .sommelier-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .ai-avatar {
          width: 60px;
          height: 60px;
          background: rgba(0, 231, 167, 0.2);
          border: 2px solid rgba(0, 231, 167, 0.5);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ai-pulse 2s ease-in-out infinite;
        }

        .wine-recommendations {
          margin-bottom: 1.5rem;
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wine-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .wine-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 231, 167, 0.3);
          transform: translateX(5px);
        }

        .wine-item.selected {
          background: rgba(0, 231, 167, 0.2);
          border-color: rgba(0, 231, 167, 0.5);
          box-shadow: 0 0 20px rgba(0, 231, 167, 0.3);
        }

        .wine-rarity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .wine-details {
          flex: 1;
          color: white;
        }

        .wine-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .wine-vintage {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .wine-price {
          font-size: 0.75rem;
        }

        .btc-price {
          color: #F59E0B;
          font-weight: bold;
        }

        .wine-details-panel {
          padding: 1rem;
          background: rgba(0, 231, 167, 0.1);
          border: 1px solid rgba(0, 231, 167, 0.3);
          border-radius: 15px;
          margin-top: 1rem;
        }

        .order-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: linear-gradient(45deg, #00E7A7, #0EE7E7);
          color: black;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .order-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 231, 167, 0.4);
        }

        .guests-list {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 250px;
        }

        .guests-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .guest-mini {
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

        .guest-mini:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .guest-mini.active {
          background: rgba(168, 85, 247, 0.2);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }

        .guest-glow {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 15px currentColor;
          animation: guest-pulse 2s ease-in-out infinite;
        }

        .guest-mini-info {
          flex: 1;
          color: white;
        }

        .guest-mini-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .guest-mini-tier {
          display: flex;
          align-items: center;
        }

        @keyframes space-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes avatar-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-10px) scale(1.02);
          }
        }

        @keyframes ai-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 231, 167, 0.5);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 35px rgba(0, 231, 167, 0.8);
            transform: scale(1.05);
          }
        }

        @keyframes guest-pulse {
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
