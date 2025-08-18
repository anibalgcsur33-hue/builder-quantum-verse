import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gem, Star, Plane, Utensils, Sunset, Camera, Trophy, Crown, Sparkles, Gift } from "lucide-react";

interface QuantumExperience {
  id: string;
  name: string;
  type: 'travel' | 'culinary' | 'luxury' | 'adventure' | 'entertainment' | 'exclusive';
  description: string;
  immersive_preview: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'quantum';
  token_color: string;
  reflection_count: number;
  experience_duration: string;
  location: string;
  price_btc: number;
  participants_limit: number;
  quantum_entangled: boolean;
  luxury_level: number; // 1-10
}

interface TokenVault {
  vault_id: string;
  security_level: 'standard' | 'premium' | 'ultra_secure' | 'quantum_protected';
  active_tokens: number;
  total_capacity: number;
  vault_material: string;
  holographic_display: boolean;
  auto_rotation: boolean;
}

interface UserCollection {
  owned_tokens: number;
  total_experiences: number;
  rarity_achievements: string[];
  vault_tier: string;
  quantum_signature: string;
  collection_value_btc: number;
}

const quantumExperiences: QuantumExperience[] = [
  {
    id: 'qe-private-jet-mediterranean',
    name: 'Jet Privado Mediterráneo',
    type: 'travel',
    description: 'Vuelo en jet privado sobre el Mediterráneo con champagne Dom Pérignon',
    immersive_preview: 'Cielos dorados, vistas del mar infinito, champagne burbujeando',
    rarity: 'legendary',
    token_color: '#FFD700',
    reflection_count: 1000,
    experience_duration: '4 horas',
    location: 'Costa Azul → Mallorca → Ibiza',
    price_btc: 5.2,
    participants_limit: 8,
    quantum_entangled: true,
    luxury_level: 9
  },
  {
    id: 'qe-michelin-star-space',
    name: 'Cena Michelin en el Espacio',
    type: 'culinary',
    description: 'Experiencia gastronómica de 12 platos en estación espacial orbital',
    immersive_preview: 'Gravedad cero, vista de la Tierra, cristalería flotante',
    rarity: 'quantum',
    token_color: '#A855F7',
    reflection_count: 2500,
    experience_duration: '6 horas',
    location: 'Estación Orbital Luxury',
    price_btc: 25.8,
    participants_limit: 4,
    quantum_entangled: true,
    luxury_level: 10
  },
  {
    id: 'qe-sunset-yacht-party',
    name: 'Sunset Party en Mega Yacht',
    type: 'entertainment',
    description: 'Fiesta exclusiva al atardecer en mega yacht de 100 metros',
    immersive_preview: 'Atardecer dorado, DJ mundial, champagne infinito',
    rarity: 'epic',
    token_color: '#FF6B9D',
    reflection_count: 500,
    experience_duration: '8 horas',
    location: 'Bahía de Mónaco',
    price_btc: 3.1,
    participants_limit: 50,
    quantum_entangled: false,
    luxury_level: 8
  },
  {
    id: 'qe-crystal-cave-spa',
    name: 'Spa en Cueva de Cristal',
    type: 'luxury',
    description: 'Tratamiento de relajación en cueva natural llena de cristales',
    immersive_preview: 'Cristales gigantes, aguas termales, aromaterapia cuántica',
    rarity: 'rare',
    token_color: '#0EE7E7',
    reflection_count: 200,
    experience_duration: '3 horas',
    location: 'Cuevas de Málaga',
    price_btc: 1.8,
    participants_limit: 12,
    quantum_entangled: false,
    luxury_level: 7
  },
  {
    id: 'qe-helicopter-volcano-tour',
    name: 'Tour Volcán en Helicóptero',
    type: 'adventure',
    description: 'Sobrevolar volcanes activos con aterrizaje en cráter seguro',
    immersive_preview: 'Lava burbujeante, vapores geotérmicos, aterrizaje épico',
    rarity: 'epic',
    token_color: '#FF4500',
    reflection_count: 750,
    experience_duration: '2.5 horas',
    location: 'Volcanes de Canarias',
    price_btc: 4.3,
    participants_limit: 6,
    quantum_entangled: true,
    luxury_level: 8
  },
  {
    id: 'qe-aurora-glass-igloo',
    name: 'Aurora Boreal en Iglú de Cristal',
    type: 'luxury',
    description: 'Noche completa observando auroras desde iglú térmico transparente',
    immersive_preview: 'Luces danzantes verdes, cielo estrellado, iglú cálido',
    rarity: 'legendary',
    token_color: '#00E7A7',
    reflection_count: 1200,
    experience_duration: '12 horas',
    location: 'Laponia Finlandesa',
    price_btc: 6.7,
    participants_limit: 2,
    quantum_entangled: true,
    luxury_level: 9
  },
  {
    id: 'qe-castle-wine-tasting',
    name: 'Cata en Castillo Medieval',
    type: 'culinary',
    description: 'Cata de vinos centenarios en castillo restaurado del siglo XII',
    immersive_preview: 'Salones de piedra, vinos de 1800s, banquete real',
    rarity: 'rare',
    token_color: '#8B5CF6',
    reflection_count: 300,
    experience_duration: '4 horas',
    location: 'Castillo de Segovia',
    price_btc: 2.4,
    participants_limit: 16,
    quantum_entangled: false,
    luxury_level: 7
  },
  {
    id: 'qe-submarine-coral-exploration',
    name: 'Exploración Submarina Coral',
    type: 'adventure',
    description: 'Inmersión en submarino personal para explorar arrecifes vírgenes',
    immersive_preview: 'Corales fluorescentes, peces tropicales, aguas cristalinas',
    rarity: 'epic',
    token_color: '#00CED1',
    reflection_count: 600,
    experience_duration: '5 horas',
    location: 'Aguas de Baleares',
    price_btc: 3.8,
    participants_limit: 10,
    quantum_entangled: false,
    luxury_level: 8
  }
];

const vaultConfigurations: TokenVault[] = [
  {
    vault_id: 'vault-crystal-standard',
    security_level: 'standard',
    active_tokens: 12,
    total_capacity: 25,
    vault_material: 'Crystal Templado',
    holographic_display: true,
    auto_rotation: true
  },
  {
    vault_id: 'vault-quantum-premium',
    security_level: 'quantum_protected',
    active_tokens: 8,
    total_capacity: 50,
    vault_material: 'Quantum Crystalline Matrix',
    holographic_display: true,
    auto_rotation: true
  }
];

export default function QuantumExperienceTokens() {
  const vaultRef = useRef<HTMLDivElement>(null);
  const [selectedToken, setSelectedToken] = useState<QuantumExperience | null>(null);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [currentVault, setCurrentVault] = useState<TokenVault>(vaultConfigurations[0]);
  const [viewMode, setViewMode] = useState<'vault' | 'collection' | 'market'>('vault');
  const [userCollection, setUserCollection] = useState<UserCollection>({
    owned_tokens: 5,
    total_experiences: 23,
    rarity_achievements: ['First Legendary', 'Quantum Collector', 'Experience Master'],
    vault_tier: 'Premium Quantum',
    quantum_signature: 'QE∞∑∫∆φ',
    collection_value_btc: 18.7
  });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const tokenMeshes = useRef<Array<{ mesh: THREE.Mesh, experience: QuantumExperience }>>([]);

  useEffect(() => {
    if (!vaultRef.current) return;

    // Configuración ultra-futurista para Tokens de Experiencias Cuánticas
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
    renderer.toneMappingExposure = 3.5;

    vaultRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear vault futurista para tokens
    const vaultGeometry = new THREE.CylinderGeometry(20, 25, 15, 12, 1, true);
    const vaultMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        vault_security: { value: getSecurityLevel(currentVault.security_level) },
        vault_open: { value: 0.0 },
        holographic_active: { value: currentVault.holographic_display ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        uniform float vault_open;
        
        void main() {
          vPosition = position;
          vUv = uv;
          vNormal = normal;
          
          // Apertura del vault con deformación
          vec3 pos = position;
          if (vault_open > 0.0) {
            float segment = floor(vUv.x * 12.0);
            float openAngle = vault_open * 0.5 * (segment / 12.0);
            float radius = length(pos.xz);
            pos.x = cos(atan(pos.z, pos.x) + openAngle) * radius;
            pos.z = sin(atan(pos.z, pos.x) + openAngle) * radius;
          }
          
          // Pulsación de seguridad
          pos += normal * sin(time * 2.0 + length(position) * 0.1) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float vault_security;
        uniform float vault_open;
        uniform float holographic_active;
        
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Patrón de seguridad cuántica
          float security_pattern = sin(vUv.x * 20.0 + time) * cos(vUv.y * 15.0 + time * 0.7) * 0.3 + 0.7;
          security_pattern *= vault_security * 0.3 + 0.5;
          
          // Sistema de rejillas holográficas
          float grid = step(0.95, sin(vUv.x * 30.0)) + step(0.95, sin(vUv.y * 25.0));
          grid *= holographic_active;
          
          // Color base del vault según nivel de seguridad
          vec3 base_color;
          if (vault_security < 1.5) {
            base_color = vec3(0.2, 0.6, 1.0); // Standard
          } else if (vault_security < 2.5) {
            base_color = vec3(0.8, 0.2, 1.0); // Premium
          } else {
            base_color = vec3(1.0, 0.2, 0.8); // Quantum
          }
          
          // Efecto de apertura
          float opening_glow = vault_open * (sin(time * 5.0) * 0.3 + 0.7);
          
          vec3 final_color = base_color * security_pattern + vec3(0.0, 1.0, 1.0) * grid * 0.5;
          final_color += base_color * opening_glow * 0.8;
          
          float alpha = 0.3 + security_pattern * 0.4 + grid * 0.3;
          
          gl_FragColor = vec4(final_color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const vault = new THREE.Mesh(vaultGeometry, vaultMaterial);
    vault.position.y = 0;
    scene.add(vault);

    // Crear tokens cuánticos cristalinos
    tokenMeshes.current = [];
    
    quantumExperiences.forEach((experience, index) => {
      // Geometría del token según rareza
      let tokenGeometry: THREE.BufferGeometry;
      
      switch (experience.rarity) {
        case 'quantum':
          tokenGeometry = new THREE.OctahedronGeometry(2, 2);
          break;
        case 'legendary':
          tokenGeometry = new THREE.DodecahedronGeometry(1.8, 0);
          break;
        case 'epic':
          tokenGeometry = new THREE.IcosahedronGeometry(1.6, 0);
          break;
        case 'rare':
          tokenGeometry = new THREE.TetrahedronGeometry(1.4, 0);
          break;
        default:
          tokenGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      }
      
      const tokenMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          token_color: { value: new THREE.Color(experience.token_color) },
          rarity_level: { value: getRarityLevel(experience.rarity) },
          reflection_count: { value: experience.reflection_count },
          quantum_entangled: { value: experience.quantum_entangled ? 1.0 : 0.0 },
          luxury_level: { value: experience.luxury_level },
          immersive_preview: { value: 0.0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float time;
          uniform float rarity_level;
          uniform float quantum_entangled;
          
          void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normal;
            
            // Rotación cuántica
            vec3 pos = position;
            if (quantum_entangled > 0.5) {
              float angle = time * rarity_level * 0.5;
              mat3 rotY = mat3(
                cos(angle), 0.0, sin(angle),
                0.0, 1.0, 0.0,
                -sin(angle), 0.0, cos(angle)
              );
              pos = rotY * pos;
            }
            
            // Pulsación según rareza
            pos *= 1.0 + sin(time * rarity_level + length(position)) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 token_color;
          uniform float rarity_level;
          uniform float reflection_count;
          uniform float quantum_entangled;
          uniform float luxury_level;
          uniform float immersive_preview;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          // Función de reflejo infinito
          vec3 infinite_reflections(vec3 pos, vec3 color, float count) {
            vec3 reflected = color;
            for (float i = 1.0; i <= 5.0; i++) {
              if (i > count / 500.0) break;
              float reflection = sin(time + length(pos) * i) * 0.2 + 0.8;
              reflected = mix(reflected, color * reflection, 0.3);
            }
            return reflected;
          }
          
          void main() {
            // Color base del token
            vec3 base_color = token_color;
            
            // Reflejo infinito según cantidad
            vec3 reflected_color = infinite_reflections(vPosition, base_color, reflection_count);
            
            // Brillo según nivel de lujo
            float luxury_glow = luxury_level * 0.1 + 0.5;
            luxury_glow *= sin(time * 3.0 + length(vPosition)) * 0.3 + 0.7;
            
            // Efecto cuántico entrelazado
            float quantum_effect = 1.0;
            if (quantum_entangled > 0.5) {
              quantum_effect = sin(time * 4.0 + vUv.x * 10.0) * sin(time * 3.0 + vUv.y * 8.0) * 0.3 + 0.7;
            }
            
            // Patrón de rareza
            float rarity_pattern = pow(rarity_level / 5.0, 2.0);
            
            // Vista previa inmersiva
            vec3 preview_overlay = vec3(1.0, 1.0, 1.0) * immersive_preview * 0.5;
            
            vec3 final_color = reflected_color * luxury_glow * quantum_effect * rarity_pattern;
            final_color += preview_overlay;
            
            // Transparencia cristalina
            float alpha = 0.8 + luxury_glow * 0.2;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true
      });
      
      const token = new THREE.Mesh(tokenGeometry, tokenMaterial);
      
      // Posicionar tokens en formación orbital dentro del vault
      const angle = (index / quantumExperiences.length) * Math.PI * 2;
      const radius = 12;
      const height = Math.sin(index * 0.5) * 5;
      
      token.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      token.userData = { experience, originalAngle: angle, floatOffset: index * 0.3 };
      
      scene.add(token);
      tokenMeshes.current.push({ mesh: token, experience });

      // Crear aura de experiencia alrededor del token
      const auraGeometry = new THREE.SphereGeometry(3, 16, 8);
      const auraMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          aura_color: { value: new THREE.Color(experience.token_color) },
          experience_type: { value: getExperienceTypeValue(experience.type) }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vPosition = position;
            vUv = uv;
            
            // Expansión del aura
            vec3 pos = position * (1.0 + sin(time + length(position)) * 0.1);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 aura_color;
          uniform float experience_type;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            float dist = length(vPosition);
            
            // Gradiente del aura
            float aura_intensity = 1.0 - smoothstep(0.0, 3.0, dist);
            aura_intensity *= sin(time + dist * 2.0) * 0.3 + 0.7;
            
            // Variación por tipo de experiencia
            float type_variation = sin(time * experience_type + dist) * 0.2 + 0.8;
            
            vec3 final_color = aura_color * aura_intensity * type_variation;
            float alpha = aura_intensity * 0.15;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const aura = new THREE.Mesh(auraGeometry, auraMaterial);
      aura.position.copy(token.position);
      scene.add(aura);
    });

    // Crear campo de estrellas premium para ambientación
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 4000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 600;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;
      
      // Colores variados para las estrellas
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.3 + Math.random() * 0.5, 0.5 + Math.random() * 0.5);
      starsColors[i * 3] = color.r;
      starsColors[i * 3 + 1] = color.g;
      starsColors[i * 3 + 2] = color.b;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 1.2,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Crear nebulosas de fondo para aumentar la inmersión
    const nebulaGeometry = new THREE.PlaneGeometry(300, 300);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        nebula_color1: { value: new THREE.Color(0x6366F1) },
        nebula_color2: { value: new THREE.Color(0x1E1B4B) },
        nebula_color3: { value: new THREE.Color(0x7C3AED) }
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
        uniform vec3 nebula_color3;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return sin(p.x * 12.0 + time * 0.1) * cos(p.y * 8.0 + time * 0.07) * 0.5 + 0.5;
        }
        
        void main() {
          vec2 pos = vUv + time * 0.01;
          
          float n1 = noise(pos * 2.0);
          float n2 = noise(pos * 4.0 + vec2(50.0));
          float n3 = noise(pos * 8.0 + vec2(100.0));
          
          vec3 nebula = mix(nebula_color2, nebula_color1, n1);
          nebula = mix(nebula, nebula_color3, n2 * 0.7);
          nebula *= n3 * 0.8 + 0.2;
          
          float alpha = (n1 * n2 * n3) * 0.4;
          
          gl_FragColor = vec4(nebula, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Añadir múltiples capas de nebulosa
    for (let i = 0; i < 4; i++) {
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial.clone());
      nebula.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 300,
        -150 - i * 100
      );
      nebula.rotation.z = Math.random() * Math.PI * 2;
      scene.add(nebula);
    }

    // Iluminación ultra-luxury para tokens cuánticos
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    const quantumLight = new THREE.PointLight(0xA855F7, 6, 120);
    quantumLight.position.set(0, 30, 0);
    scene.add(quantumLight);

    const luxuryLight1 = new THREE.DirectionalLight(0x0EE7E7, 4);
    luxuryLight1.position.set(50, 50, 50);
    scene.add(luxuryLight1);

    const luxuryLight2 = new THREE.DirectionalLight(0x00E7A7, 3.5);
    luxuryLight2.position.set(-50, 40, -50);
    scene.add(luxuryLight2);

    const accentLight = new THREE.PointLight(0xFFD700, 4, 80);
    accentLight.position.set(30, -20, 30);
    scene.add(accentLight);

    // Posicionar cámara para vista cinematográfica
    camera.position.set(40, 25, 40);
    camera.lookAt(0, 0, 0);

    // Controles de interacción para tokens
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(tokenMeshes.current.map(t => t.mesh));

      if (intersects.length > 0) {
        const clickedToken = intersects[0].object.userData.experience as QuantumExperience;
        setSelectedToken(clickedToken);
        
        // Activar preview inmersivo
        tokenMeshes.current.forEach(({ mesh, experience }) => {
          if (mesh.material instanceof THREE.ShaderMaterial) {
            mesh.material.uniforms.immersive_preview.value = 
              experience.id === clickedToken.id ? 1.0 : 0.0;
          }
        });
        
        console.log(`💎 Token seleccionado: ${clickedToken.name}`);
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Funciones auxiliares
    function getSecurityLevel(level: string): number {
      switch (level) {
        case 'standard': return 1.0;
        case 'premium': return 2.0;
        case 'ultra_secure': return 3.0;
        case 'quantum_protected': return 4.0;
        default: return 1.0;
      }
    }

    function getRarityLevel(rarity: string): number {
      switch (rarity) {
        case 'common': return 1.0;
        case 'rare': return 2.0;
        case 'epic': return 3.0;
        case 'legendary': return 4.0;
        case 'quantum': return 5.0;
        default: return 1.0;
      }
    }

    function getExperienceTypeValue(type: string): number {
      switch (type) {
        case 'travel': return 1.0;
        case 'culinary': return 2.0;
        case 'luxury': return 3.0;
        case 'adventure': return 4.0;
        case 'entertainment': return 5.0;
        case 'exclusive': return 6.0;
        default: return 1.0;
      }
    }

    // Loop de animación cuántica
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.015;

      // Actualizar vault
      if (vaultMaterial.uniforms) {
        vaultMaterial.uniforms.time.value = time;
        vaultMaterial.uniforms.vault_open.value = vaultOpen ? 1.0 : 0.0;
      }

      // Rotación del vault si está configurado
      if (currentVault.auto_rotation) {
        vault.rotation.y += 0.002;
      }

      // Actualizar tokens cuánticos
      tokenMeshes.current.forEach(({ mesh, experience }, index) => {
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.time.value = time;
        }

        // Movimiento orbital de tokens
        const angle = mesh.userData.originalAngle + time * 0.3;
        const radius = 12;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = Math.sin(time * 2 + mesh.userData.floatOffset) * 2;

        // Rotación individual según tipo cuántico
        if (experience.quantum_entangled) {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.008;
          mesh.rotation.z += 0.005;
        } else {
          mesh.rotation.y += 0.006;
        }
      });

      // Actualizar auras de experiencia
      scene.children.forEach((child) => {
        if (child.material instanceof THREE.ShaderMaterial && child.geometry instanceof THREE.SphereGeometry) {
          child.material.uniforms.time.value = time;
        }
      });

      // Actualizar nebulosas
      scene.children.forEach((child) => {
        if (child.material instanceof THREE.ShaderMaterial && child.geometry instanceof THREE.PlaneGeometry) {
          child.material.uniforms.time.value = time;
        }
      });

      // Movimiento del campo de estrellas
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // Luces dinámicas
      quantumLight.intensity = 6 + Math.sin(time * 2) * 2;
      accentLight.position.x = Math.cos(time * 0.5) * 30;
      accentLight.position.z = Math.sin(time * 0.5) * 30;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (vaultRef.current && renderer.domElement) {
        vaultRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [vaultOpen, currentVault]);

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'quantum': return <Crown className="w-5 h-5 text-purple-400" />;
      case 'legendary': return <Star className="w-5 h-5 text-amber-400" />;
      case 'epic': return <Gem className="w-5 h-5 text-violet-400" />;
      case 'rare': return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'common': return <Gift className="w-5 h-5 text-gray-400" />;
      default: return <Gem className="w-5 h-5" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'travel': return <Plane className="w-4 h-4 text-blue-400" />;
      case 'culinary': return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'luxury': return <Crown className="w-4 h-4 text-purple-400" />;
      case 'adventure': return <Camera className="w-4 h-4 text-green-400" />;
      case 'entertainment': return <Sunset className="w-4 h-4 text-pink-400" />;
      case 'exclusive': return <Trophy className="w-4 h-4 text-gold-400" />;
      default: return <Gem className="w-4 h-4" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'quantum': return 'text-purple-400 bg-purple-900/20 border-purple-500/30';
      case 'legendary': return 'text-amber-400 bg-amber-900/20 border-amber-500/30';
      case 'epic': return 'text-violet-400 bg-violet-900/20 border-violet-500/30';
      case 'rare': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'common': return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
      default: return 'text-white bg-gray-900/20 border-gray-500/30';
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Header de Tokens Cuánticos */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="tokens-title">
          <h1 className="text-4xl font-bold quantum-token-text mb-2">
            Tokens de Experiencias Cuánticas
          </h1>
          <p className="text-white/80 text-lg">
            Reflejo Infinito • Vault Cristalino • Experiencias Inmersivas • Lujo Cuántico
          </p>
        </div>

        {/* Controles del vault */}
        <div className="vault-controls">
          <button
            onClick={() => setVaultOpen(!vaultOpen)}
            className={`vault-btn ${vaultOpen ? 'open' : ''}`}
          >
            <Gem className="w-6 h-6" />
            <span>{vaultOpen ? 'Cerrar Vault' : 'Abrir Vault'}</span>
          </button>
          
          <button
            onClick={() => setViewMode(viewMode === 'vault' ? 'collection' : 'vault')}
            className="view-btn"
          >
            <Star className="w-6 h-6" />
            <span>{viewMode === 'vault' ? 'Mi Colección' : 'Vault'}</span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal */}
      <div ref={vaultRef} className="absolute inset-0 z-10" />

      {/* Panel de colección del usuario */}
      <div className="absolute bottom-8 left-8 z-20 collection-panel">
        <div className="collection-header">
          <div className="user-vault-preview">
            <div className="vault-hologram">
              <Crown className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="collection-info">
            <h3 className="text-xl font-bold text-white mb-1">
              {userCollection.vault_tier}
            </h3>
            <p className="text-white/70 text-sm mb-2">
              Signatura: {userCollection.quantum_signature}
            </p>
            
            <div className="collection-value">
              <span className="text-2xl font-bold text-amber-400">
                {userCollection.collection_value_btc} BTC
              </span>
              <span className="text-white/60 text-sm ml-2">Valor Total</span>
            </div>
          </div>
        </div>

        <div className="collection-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <Gem className="w-4 h-4 text-purple-400" />
              <span className="stat-value">{userCollection.owned_tokens}</span>
              <span className="stat-label">Tokens</span>
            </div>
            <div className="stat-item">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="stat-value">{userCollection.total_experiences}</span>
              <span className="stat-label">Experiencias</span>
            </div>
            <div className="stat-item">
              <Crown className="w-4 h-4 text-blue-400" />
              <span className="stat-value">{userCollection.rarity_achievements.length}</span>
              <span className="stat-label">Logros</span>
            </div>
          </div>
        </div>

        <div className="achievements">
          <h4 className="text-white font-semibold mb-2">Logros de Rareza</h4>
          <div className="achievements-list">
            {userCollection.rarity_achievements.map((achievement, index) => (
              <div key={index} className="achievement-badge">
                <Star className="w-3 h-3 text-amber-400" />
                <span className="text-sm text-white/80">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de token seleccionado */}
      {selectedToken && (
        <div className="absolute bottom-8 right-8 z-20 token-panel">
          <div className="token-header">
            <div 
              className="token-preview"
              style={{ backgroundColor: selectedToken.token_color + '30', borderColor: selectedToken.token_color }}
            >
              {getTypeIcon(selectedToken.type)}
            </div>
            
            <div className="token-info">
              <div className="flex items-center gap-2 mb-2">
                <span className={`rarity-badge ${getRarityColor(selectedToken.rarity)}`}>
                  {getRarityIcon(selectedToken.rarity)}
                  {selectedToken.rarity.toUpperCase()}
                </span>
                {selectedToken.quantum_entangled && (
                  <span className="quantum-badge">
                    <Sparkles className="w-3 h-3" />
                    CUÁNTICO
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{selectedToken.name}</h3>
              <p className="text-white/70 text-sm mb-3">{selectedToken.description}</p>
              
              <div className="token-pricing">
                <span className="text-2xl font-bold text-amber-400">
                  {selectedToken.price_btc} BTC
                </span>
                <span className="text-white/60 text-sm ml-2">
                  Límite: {selectedToken.participants_limit} personas
                </span>
              </div>
            </div>
          </div>

          <div className="immersive-preview">
            <h4 className="text-white font-semibold mb-2">Vista Previa Inmersiva</h4>
            <p className="text-white/80 text-sm italic mb-3">
              "{selectedToken.immersive_preview}"
            </p>
            
            <div className="experience-details">
              <div className="detail-row">
                <Plane className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/80">{selectedToken.location}</span>
              </div>
              <div className="detail-row">
                <Camera className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/80">{selectedToken.experience_duration}</span>
              </div>
              <div className="detail-row">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">
                  Lujo Nivel {selectedToken.luxury_level}/10
                </span>
              </div>
              <div className="detail-row">
                <Gem className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/80">
                  {selectedToken.reflection_count.toLocaleString()} reflejos
                </span>
              </div>
            </div>
          </div>

          <div className="token-actions">
            <button className="action-btn primary">
              <Gem className="w-5 h-5" />
              <span>Comprar Token</span>
            </button>
            
            <button className="action-btn secondary">
              <Camera className="w-5 h-5" />
              <span>Preview VR</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de tokens disponibles */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 tokens-list">
        <h4 className="text-white font-bold mb-4">Tokens Disponibles</h4>
        
        <div className="tokens-grid">
          {quantumExperiences.map((token) => (
            <div
              key={token.id}
              onClick={() => setSelectedToken(token)}
              className={`token-mini ${selectedToken?.id === token.id ? 'active' : ''}`}
              style={{ borderColor: token.token_color }}
            >
              <div 
                className="token-glow"
                style={{ backgroundColor: token.token_color }}
              ></div>
              <div className="token-mini-info">
                <div className="flex items-center gap-1 mb-1">
                  {getRarityIcon(token.rarity)}
                  {getTypeIcon(token.type)}
                </div>
                <div className="token-mini-name">{token.name}</div>
                <div className="token-mini-price">{token.price_btc} BTC</div>
                <div className="token-mini-luxury">
                  Lujo {token.luxury_level}/10
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-futuristas para Tokens Cuánticos */}
      <style jsx>{`
        .tokens-title {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(25px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 600px;
        }

        .quantum-token-text {
          background: linear-gradient(45deg, #A855F7, #8B5CF6, #7C3AED, #6D28D9);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: quantum-token-flow 6s ease-in-out infinite;
        }

        .vault-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .vault-btn, .view-btn {
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

        .vault-btn {
          background: linear-gradient(45deg, #A855F7, #8B5CF6);
        }

        .vault-btn.open {
          background: linear-gradient(45deg, #0EE7E7, #00E7A7);
          color: black;
          animation: vault-opening 2s ease-in-out infinite;
        }

        .view-btn {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.5);
        }

        .vault-btn:hover, .view-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
        }

        .collection-panel, .token-panel {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(30px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-slide-up 0.5s ease;
        }

        .collection-header, .token-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .user-vault-preview, .token-preview {
          width: 80px;
          height: 80px;
          border: 3px solid;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: crystal-pulse 3s ease-in-out infinite;
        }

        .vault-hologram {
          animation: hologram-shimmer 2s ease-in-out infinite;
        }

        .collection-info, .token-info {
          flex: 1;
        }

        .collection-value {
          margin-top: 1rem;
        }

        .collection-stats {
          margin-bottom: 1.5rem;
        }

        .stats-grid {
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

        .achievements {
          margin-bottom: 1.5rem;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .achievement-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
        }

        .rarity-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.3rem 0.8rem;
          border: 1px solid;
          border-radius: 15px;
          text-transform: uppercase;
        }

        .quantum-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          background: rgba(168, 85, 247, 0.2);
          color: #A855F7;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .token-pricing {
          margin-top: 1rem;
        }

        .immersive-preview {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 15px;
        }

        .experience-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .token-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
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

        .action-btn.primary {
          background: linear-gradient(45deg, #A855F7, #8B5CF6);
          color: white;
          border: none;
        }

        .action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(168, 85, 247, 0.4);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .tokens-list {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 280px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .tokens-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .token-mini {
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

        .token-mini:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .token-mini.active {
          background: rgba(168, 85, 247, 0.2);
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.3);
        }

        .token-glow {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 20px currentColor;
          animation: token-pulse 2s ease-in-out infinite;
        }

        .token-mini-info {
          flex: 1;
          color: white;
        }

        .token-mini-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .token-mini-price {
          font-size: 0.75rem;
          color: #F59E0B;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .token-mini-luxury {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
        }

        @keyframes quantum-token-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes vault-opening {
          0%, 100% { box-shadow: 0 0 20px rgba(14, 231, 231, 0.5); }
          50% { box-shadow: 0 0 40px rgba(14, 231, 231, 0.8); }
        }

        @keyframes crystal-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 25px currentColor;
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 40px currentColor;
          }
        }

        @keyframes hologram-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes token-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.3);
            opacity: 0.8;
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
