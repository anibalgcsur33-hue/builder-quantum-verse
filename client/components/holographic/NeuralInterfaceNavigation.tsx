import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Brain,
  Zap,
  Eye,
  Home,
  Crown,
  Star,
  Sparkles,
  Target,
  Cpu,
  Waves,
} from "lucide-react";

interface NeuralConnection {
  id: string;
  source_neuron: string;
  target_mansion: string;
  connection_strength: number;
  thought_pattern: "focus" | "desire" | "memory" | "imagination" | "emotion";
  signal_color: string;
  transmission_speed: number;
  bandwidth: number;
}

interface LuxuryMansion {
  id: string;
  name: string;
  architectural_style:
    | "modern_glass"
    | "classical_marble"
    | "futuristic_crystal"
    | "organic_flow"
    | "quantum_phase";
  location: THREE.Vector3;
  luxury_level: number;
  mental_accessibility: number;
  thought_requirement: string;
  holographic_detail: number;
  neural_resonance: number;
  activation_state: "dormant" | "activating" | "active" | "selected";
}

interface BrainActivity {
  region: "frontal" | "parietal" | "temporal" | "occipital" | "limbic";
  activity_level: number;
  dominant_frequency: number;
  neural_pattern: string;
  consciousness_state:
    | "focused"
    | "relaxed"
    | "creative"
    | "analytical"
    | "intuitive";
}

interface User {
  name: string;
  neural_implant_version: string;
  mental_bandwidth: number;
  navigation_skill: number;
  luxury_affinity: number;
  total_explorations: number;
  neural_signature: string;
}

const luxuryMansions: LuxuryMansion[] = [
  {
    id: "mansion-crystal-sky",
    name: "Mansión Cristal Celestial",
    architectural_style: "futuristic_crystal",
    location: new THREE.Vector3(15, 8, 0),
    luxury_level: 10,
    mental_accessibility: 0.9,
    thought_requirement: "Visualizar transparencia y luz infinita",
    holographic_detail: 95,
    neural_resonance: 8.7,
    activation_state: "dormant",
  },
  {
    id: "mansion-marble-palace",
    name: "Palacio Mármol Eterno",
    architectural_style: "classical_marble",
    location: new THREE.Vector3(-12, 6, 18),
    luxury_level: 9,
    mental_accessibility: 0.7,
    thought_requirement: "Evocar grandeza y elegancia clásica",
    holographic_detail: 88,
    neural_resonance: 7.9,
    activation_state: "dormant",
  },
  {
    id: "mansion-glass-infinity",
    name: "Casa Cristal Infinito",
    architectural_style: "modern_glass",
    location: new THREE.Vector3(8, 12, -15),
    luxury_level: 8,
    mental_accessibility: 0.8,
    thought_requirement: "Pensar en minimalismo y espacios abiertos",
    holographic_detail: 92,
    neural_resonance: 8.2,
    activation_state: "dormant",
  },
  {
    id: "mansion-organic-flow",
    name: "Villa Flujo Orgánico",
    architectural_style: "organic_flow",
    location: new THREE.Vector3(-8, 4, -12),
    luxury_level: 7,
    mental_accessibility: 0.6,
    thought_requirement: "Sentir conexión con la naturaleza",
    holographic_detail: 85,
    neural_resonance: 7.4,
    activation_state: "dormant",
  },
  {
    id: "mansion-quantum-phase",
    name: "Residencia Cuántica Multifase",
    architectural_style: "quantum_phase",
    location: new THREE.Vector3(0, 15, 12),
    luxury_level: 11,
    mental_accessibility: 0.95,
    thought_requirement: "Imaginar existencia en múltiples dimensiones",
    holographic_detail: 98,
    neural_resonance: 9.5,
    activation_state: "dormant",
  },
];

const neuralConnections: NeuralConnection[] = [
  {
    id: "nc-frontal-crystal",
    source_neuron: "Córtex Frontal",
    target_mansion: "mansion-crystal-sky",
    connection_strength: 0.9,
    thought_pattern: "focus",
    signal_color: "#0EE7E7",
    transmission_speed: 350,
    bandwidth: 1200,
  },
  {
    id: "nc-temporal-palace",
    source_neuron: "Lóbulo Temporal",
    target_mansion: "mansion-marble-palace",
    connection_strength: 0.7,
    thought_pattern: "memory",
    signal_color: "#A855F7",
    transmission_speed: 280,
    bandwidth: 950,
  },
  {
    id: "nc-parietal-glass",
    source_neuron: "Córtex Parietal",
    target_mansion: "mansion-glass-infinity",
    connection_strength: 0.8,
    thought_pattern: "imagination",
    signal_color: "#00E7A7",
    transmission_speed: 320,
    bandwidth: 1100,
  },
  {
    id: "nc-limbic-organic",
    source_neuron: "Sistema Límbico",
    target_mansion: "mansion-organic-flow",
    connection_strength: 0.6,
    thought_pattern: "emotion",
    signal_color: "#FFD700",
    transmission_speed: 250,
    bandwidth: 800,
  },
  {
    id: "nc-occipital-quantum",
    source_neuron: "Córtex Occipital",
    target_mansion: "mansion-quantum-phase",
    connection_strength: 0.95,
    thought_pattern: "desire",
    signal_color: "#FF6B9D",
    transmission_speed: 400,
    bandwidth: 1500,
  },
];

const currentUser: User = {
  name: "Dr. Elena Vásquez",
  neural_implant_version: "NeuroLink Quantum v3.7",
  mental_bandwidth: 2400,
  navigation_skill: 87,
  luxury_affinity: 94,
  total_explorations: 342,
  neural_signature: "ΨΩ∇∫∑∆φ",
};

export default function NeuralInterfaceNavigation() {
  const interfaceRef = useRef<HTMLDivElement>(null);
  const [selectedMansion, setSelectedMansion] = useState<LuxuryMansion | null>(
    null,
  );
  const [brainActivity, setBrainActivity] = useState<BrainActivity>({
    region: "frontal",
    activity_level: 0.7,
    dominant_frequency: 8.5,
    neural_pattern: "Alpha-Theta",
    consciousness_state: "focused",
  });
  const [mentalNavigation, setMentalNavigation] = useState(false);
  const [thoughtMode, setThoughtMode] = useState<
    "exploration" | "connection" | "immersion"
  >("exploration");
  const [mansions, setMansions] = useState<LuxuryMansion[]>(luxuryMansions);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const brainMesh = useRef<THREE.Group | null>(null);
  const mansionMeshes = useRef<
    Array<{ mesh: THREE.Group; mansion: LuxuryMansion }>
  >([]);
  const neuralStreamMeshes = useRef<THREE.Line[]>([]);

  useEffect(() => {
    if (!interfaceRef.current) return;

    // Configuración ultra-futurista para Neurointerfaz de Navegación Mental
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
    renderer.toneMappingExposure = 4.0;

    interfaceRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear cerebro central con interfaz neural
    const createBrainInterface = () => {
      const brainGroup = new THREE.Group();

      // Hemisferio cerebral principal
      const brainGeometry = new THREE.SphereGeometry(
        8,
        32,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI,
      );
      const brainMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          brain_activity: { value: brainActivity.activity_level },
          dominant_freq: { value: brainActivity.dominant_frequency },
          consciousness_state: {
            value: getConsciousnessValue(brainActivity.consciousness_state),
          },
          neural_navigation: { value: 0.0 },
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float time;
          uniform float brain_activity;
          
          void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normal;
            
            // Pulsación neuronal
            vec3 pos = position;
            pos += normal * sin(time * 3.0 + length(position) * 0.2) * brain_activity * 0.3;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float brain_activity;
          uniform float dominant_freq;
          uniform float consciousness_state;
          uniform float neural_navigation;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            // Patrón de ondas cerebrales
            float brain_waves = sin(vUv.x * dominant_freq + time * 4.0) * 
                               cos(vUv.y * dominant_freq * 0.7 + time * 3.0) * 0.3 + 0.7;
            
            // Actividad neural por regiones
            vec3 frontal_activity = vec3(0.2, 0.8, 1.0) * brain_activity;
            vec3 temporal_activity = vec3(0.8, 0.2, 1.0) * brain_activity;
            vec3 occipital_activity = vec3(1.0, 0.2, 0.8) * brain_activity;
            
            // Mezcla según posición en el cerebro
            vec3 neural_color = mix(frontal_activity, temporal_activity, vUv.x);
            neural_color = mix(neural_color, occipital_activity, vUv.y);
            
            // Estado de conciencia
            neural_color *= consciousness_state * 0.3 + 0.7;
            
            // Intensificación durante navegación mental
            neural_color += vec3(1.0, 1.0, 1.0) * neural_navigation * 0.4;
            
            // Ondas cerebrales visibles
            neural_color *= brain_waves;
            
            float alpha = 0.6 + brain_activity * 0.3;
            
            gl_FragColor = vec4(neural_color, alpha);
          }
        `,
        transparent: true,
      });

      const brain = new THREE.Mesh(brainGeometry, brainMaterial);
      brainGroup.add(brain);

      // Crear conexiones neuronales visibles
      for (let i = 0; i < 200; i++) {
        const synapseGeometry = new THREE.SphereGeometry(0.1, 8, 6);
        const synapseMaterial = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
          transparent: true,
          opacity: 0.8,
        });

        const synapse = new THREE.Mesh(synapseGeometry, synapseMaterial);
        synapse.position.set(
          (Math.random() - 0.5) * 15,
          Math.random() * 8,
          (Math.random() - 0.5) * 15,
        );
        synapse.userData = { pulseCycle: Math.random() * Math.PI * 2 };
        brainGroup.add(synapse);
      }

      // Interfaz neural external
      const interfaceGeometry = new THREE.TorusGeometry(12, 0.5, 16, 100);
      const interfaceMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          interface_active: { value: 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            
            vec3 pos = position;
            pos += normalize(position) * sin(time * 2.0 + length(position)) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float interface_active;
          varying vec2 vUv;
          
          void main() {
            // Patrón de circuitos neuronales
            float circuit = step(0.9, sin(vUv.x * 20.0 + time)) * step(0.9, sin(vUv.y * 15.0 + time * 0.7));
            
            vec3 interface_color = vec3(0.0, 1.0, 1.0) * circuit;
            interface_color += vec3(1.0, 0.0, 1.0) * interface_active * 0.8;
            
            float alpha = circuit * 0.8 + interface_active * 0.5;
            
            gl_FragColor = vec4(interface_color, alpha);
          }
        `,
        transparent: true,
      });

      const neuralInterface = new THREE.Mesh(
        interfaceGeometry,
        interfaceMaterial,
      );
      neuralInterface.rotation.x = Math.PI / 2;
      brainGroup.add(neuralInterface);

      return brainGroup;
    };

    const brain = createBrainInterface();
    brain.position.set(0, 0, 0);
    scene.add(brain);
    brainMesh.current = brain;

    // Crear mansiones holográficas flotantes
    mansionMeshes.current = [];

    mansions.forEach((mansion) => {
      const mansionGroup = new THREE.Group();

      // Geometría base según estilo arquitectónico
      let baseGeometry: THREE.BufferGeometry;

      switch (mansion.architectural_style) {
        case "futuristic_crystal":
          baseGeometry = new THREE.OctahedronGeometry(3, 2);
          break;
        case "classical_marble":
          baseGeometry = new THREE.BoxGeometry(5, 3, 5);
          break;
        case "modern_glass":
          baseGeometry = new THREE.CylinderGeometry(3, 3, 4, 12);
          break;
        case "organic_flow":
          baseGeometry = new THREE.DodecahedronGeometry(2.5, 1);
          break;
        case "quantum_phase":
          baseGeometry = new THREE.IcosahedronGeometry(3, 2);
          break;
        default:
          baseGeometry = new THREE.BoxGeometry(3, 3, 3);
      }

      const mansionMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          luxury_level: { value: mansion.luxury_level },
          holographic_detail: { value: mansion.holographic_detail },
          neural_resonance: { value: mansion.neural_resonance },
          activation_state: {
            value: getActivationValue(mansion.activation_state),
          },
          thought_connection: { value: 0.0 },
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float time;
          uniform float neural_resonance;
          uniform float activation_state;
          
          void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normal;
            
            // Resonancia neural
            vec3 pos = position;
            pos += normal * sin(time * neural_resonance + length(position)) * 0.2;
            
            // Expansión al activarse
            pos *= 1.0 + activation_state * 0.3;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float luxury_level;
          uniform float holographic_detail;
          uniform float neural_resonance;
          uniform float activation_state;
          uniform float thought_connection;
          
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            // Detalle holográfico
            float holo_pattern = sin(vUv.x * holographic_detail * 0.1) * 
                                cos(vUv.y * holographic_detail * 0.08) * 0.3 + 0.7;
            
            // Color base según nivel de lujo
            vec3 luxury_color;
            if (luxury_level >= 10.0) {
              luxury_color = vec3(1.0, 0.8, 1.0); // Quantum
            } else if (luxury_level >= 9.0) {
              luxury_color = vec3(1.0, 1.0, 0.8); // Crystal
            } else if (luxury_level >= 8.0) {
              luxury_color = vec3(0.8, 1.0, 1.0); // Glass
            } else {
              luxury_color = vec3(0.8, 1.0, 0.8); // Organic
            }
            
            // Resonancia neural visible
            float resonance_glow = sin(time * neural_resonance) * 0.3 + 0.7;
            
            // Estado de activación
            vec3 activation_glow = vec3(1.0, 1.0, 1.0) * activation_state * 0.6;
            
            // Conexión de pensamiento
            vec3 thought_stream = vec3(0.0, 1.0, 1.0) * thought_connection * 0.8;
            
            vec3 final_color = luxury_color * holo_pattern * resonance_glow + 
                              activation_glow + thought_stream;
            
            float alpha = 0.6 + holo_pattern * 0.3 + activation_state * 0.3;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
      });

      const mansionMesh = new THREE.Mesh(baseGeometry, mansionMaterial);
      mansionGroup.add(mansionMesh);

      // Añadir detalles arquitectónicos
      if (mansion.luxury_level >= 9) {
        // Spires para mansiones de alto lujo
        const spireGeometry = new THREE.ConeGeometry(0.5, 2, 8);
        const spireMaterial = new THREE.MeshPhongMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.8,
        });

        for (let i = 0; i < 4; i++) {
          const spire = new THREE.Mesh(spireGeometry, spireMaterial);
          spire.position.set(
            Math.cos((i * Math.PI) / 2) * 2,
            3,
            Math.sin((i * Math.PI) / 2) * 2,
          );
          mansionGroup.add(spire);
        }
      }

      // Posicionar mansion
      mansionGroup.position.copy(mansion.location);
      mansionGroup.userData = { mansion };

      scene.add(mansionGroup);
      mansionMeshes.current.push({ mesh: mansionGroup, mansion });
    });

    // Crear streams neuronales conectando cerebro con mansiones
    neuralStreamMeshes.current = [];

    neuralConnections.forEach((connection) => {
      const targetMansion = mansions.find(
        (m) => m.id === connection.target_mansion,
      );
      if (!targetMansion) return;

      // Crear curva neural desde cerebro a mansión
      const brainPos = new THREE.Vector3(0, 0, 0);
      const mansionPos = targetMansion.location.clone();

      const midPoint = new THREE.Vector3().lerpVectors(
        brainPos,
        mansionPos,
        0.5,
      );
      midPoint.y += 8; // Arco elevado

      const curve = new THREE.QuadraticBezierCurve3(
        brainPos,
        midPoint,
        mansionPos,
      );
      const points = curve.getPoints(50);

      const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const streamMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          stream_color: { value: new THREE.Color(connection.signal_color) },
          connection_strength: { value: connection.connection_strength },
          transmission_speed: { value: connection.transmission_speed },
          bandwidth: { value: connection.bandwidth },
        },
        vertexShader: `
          attribute float position_index;
          varying float vProgress;
          uniform float time;
          uniform float transmission_speed;
          
          void main() {
            vProgress = position.length() / 20.0;
            
            vec3 pos = position;
            
            // Ondas de transmisión
            float wave = sin(time * transmission_speed * 0.01 - vProgress * 10.0) * 0.2;
            pos += normalize(pos) * wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 stream_color;
          uniform float connection_strength;
          uniform float bandwidth;
          
          varying float vProgress;
          
          void main() {
            // Pulso de datos neuronales
            float data_pulse = sin(time * 5.0 - vProgress * 15.0) * 0.5 + 0.5;
            data_pulse *= connection_strength;
            
            // Ancho de banda visual
            float bandwidth_glow = bandwidth / 1500.0;
            
            vec3 final_color = stream_color * data_pulse * bandwidth_glow;
            float alpha = data_pulse * connection_strength * 0.8;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
        linewidth: 3,
      });

      const streamLine = new THREE.Line(streamGeometry, streamMaterial);
      scene.add(streamLine);
      neuralStreamMeshes.current.push(streamLine);
    });

    // Crear campo de partículas de conciencia
    const consciousnessGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    consciousnessGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    consciousnessGeometry.setAttribute(
      "velocity",
      new THREE.BufferAttribute(velocities, 3),
    );

    const consciousnessMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        consciousness_level: { value: brainActivity.activity_level },
      },
      vertexShader: `
        attribute vec3 velocity;
        varying float vIntensity;
        uniform float time;
        uniform float consciousness_level;
        
        void main() {
          vIntensity = consciousness_level;
          
          vec3 pos = position + velocity * time;
          
          // Orbital around brain
          float angle = time * 0.1 + length(position) * 0.01;
          pos.x += cos(angle) * consciousness_level;
          pos.z += sin(angle) * consciousness_level;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 3.0 * consciousness_level * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying float vIntensity;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 2.0);
          
          vec3 color = vec3(0.8, 0.9, 1.0) * vIntensity * glow;
          
          gl_FragColor = vec4(color, glow * vIntensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const consciousness = new THREE.Points(
      consciousnessGeometry,
      consciousnessMaterial,
    );
    scene.add(consciousness);

    // Iluminación neural ultra-futurista
    const ambientLight = new THREE.AmbientLight(0x404040, 3.5);
    scene.add(ambientLight);

    const neuralLight = new THREE.PointLight(0x0ee7e7, 8, 150);
    neuralLight.position.set(0, 20, 0);
    scene.add(neuralLight);

    const thoughtLight1 = new THREE.DirectionalLight(0xa855f7, 5);
    thoughtLight1.position.set(50, 50, 50);
    scene.add(thoughtLight1);

    const thoughtLight2 = new THREE.DirectionalLight(0x00e7a7, 4);
    thoughtLight2.position.set(-50, 40, -50);
    scene.add(thoughtLight2);

    const consciousnessLight = new THREE.PointLight(0xffd700, 6, 100);
    consciousnessLight.position.set(30, -30, 30);
    scene.add(consciousnessLight);

    // Posicionar cámara para vista inmersiva
    camera.position.set(35, 25, 35);
    camera.lookAt(0, 0, 0);

    // Controles de navegación mental
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        mansionMeshes.current.map((m) => m.mesh.children[0]),
      );

      if (intersects.length > 0) {
        const clickedMansion = intersects[0].object.parent?.userData
          ?.mansion as LuxuryMansion;
        if (clickedMansion) {
          setSelectedMansion(clickedMansion);

          // Activar conexión neural
          setMansions((prevMansions) =>
            prevMansions.map((m) => ({
              ...m,
              activation_state:
                m.id === clickedMansion.id ? "selected" : "dormant",
            })),
          );

          console.log(`🧠 Navegación mental hacia: ${clickedMansion.name}`);
        }
      }
    };

    renderer.domElement.addEventListener("click", onMouseClick);

    // Funciones auxiliares
    function getConsciousnessValue(state: string): number {
      switch (state) {
        case "focused":
          return 4.0;
        case "relaxed":
          return 2.0;
        case "creative":
          return 3.5;
        case "analytical":
          return 4.5;
        case "intuitive":
          return 3.0;
        default:
          return 2.5;
      }
    }

    function getActivationValue(state: string): number {
      switch (state) {
        case "dormant":
          return 0.0;
        case "activating":
          return 0.5;
        case "active":
          return 0.8;
        case "selected":
          return 1.0;
        default:
          return 0.0;
      }
    }

    // Loop de animación neural
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.02;

      // Actualizar cerebro e interfaz neural
      if (brainMesh.current) {
        brainMesh.current.children.forEach((child) => {
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
            child.material.uniforms.brain_activity.value =
              brainActivity.activity_level;
            child.material.uniforms.neural_navigation.value = mentalNavigation
              ? 1.0
              : 0.0;
          }
        });

        // Rotación sutil del cerebro
        brainMesh.current.rotation.y += 0.001;
      }

      // Actualizar mansiones holográficas
      mansionMeshes.current.forEach(({ mesh, mansion }) => {
        mesh.children.forEach((child) => {
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
            child.material.uniforms.activation_state.value = getActivationValue(
              mansion.activation_state,
            );
            child.material.uniforms.thought_connection.value =
              selectedMansion?.id === mansion.id ? 1.0 : 0.0;
          }
        });

        // Flotación mental
        mesh.position.y =
          mansion.location.y + Math.sin(time + mansion.neural_resonance) * 0.5;

        // Rotación según resonancia neural
        mesh.rotation.y += mansion.neural_resonance * 0.001;
      });

      // Actualizar streams neuronales
      neuralStreamMeshes.current.forEach((stream) => {
        if (stream.material instanceof THREE.ShaderMaterial) {
          stream.material.uniforms.time.value = time;
        }
      });

      // Actualizar partículas de conciencia
      if (consciousnessMaterial.uniforms) {
        consciousnessMaterial.uniforms.time.value = time;
        consciousnessMaterial.uniforms.consciousness_level.value =
          brainActivity.activity_level;
      }

      // Rotación orbital de partículas
      consciousness.rotation.y += 0.0005;

      // Luces dinámicas neuronales
      neuralLight.intensity = 8 + Math.sin(time * 2) * 3;
      consciousnessLight.position.x = Math.cos(time * 0.3) * 30;
      consciousnessLight.position.z = Math.sin(time * 0.3) * 30;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener("click", onMouseClick);
      if (interfaceRef.current && renderer.domElement) {
        interfaceRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [brainActivity, mentalNavigation, thoughtMode, selectedMansion, mansions]);

  const activateMentalNavigation = () => {
    setMentalNavigation(!mentalNavigation);

    // Simular cambio en actividad cerebral
    setBrainActivity((prev) => ({
      ...prev,
      activity_level: mentalNavigation ? 0.7 : 0.95,
      consciousness_state: mentalNavigation ? "focused" : "analytical",
    }));
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case "futuristic_crystal":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "classical_marble":
        return <Crown className="w-5 h-5 text-amber-400" />;
      case "modern_glass":
        return <Eye className="w-5 h-5 text-blue-400" />;
      case "organic_flow":
        return <Waves className="w-5 h-5 text-green-400" />;
      case "quantum_phase":
        return <Zap className="w-5 h-5 text-pink-400" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Header de Neurointerfaz */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="neural-title">
          <h1 className="text-4xl font-bold neural-text mb-2">
            Neurointerfaz Navegación Mental
          </h1>
          <p className="text-white/80 text-lg">
            Streams Neuronales • Mansiones Holográficas • Navegación Mental •
            Elegancia Infinita
          </p>
        </div>

        {/* Controles neurales */}
        <div className="neural-controls">
          <button
            onClick={activateMentalNavigation}
            className={`neural-btn ${mentalNavigation ? "active" : ""}`}
          >
            <Brain className="w-6 h-6" />
            <span>{mentalNavigation ? "Neural Activo" : "Activar Neural"}</span>
          </button>

          <button
            onClick={() =>
              setThoughtMode(
                thoughtMode === "exploration" ? "immersion" : "exploration",
              )
            }
            className="thought-btn"
          >
            <Target className="w-6 h-6" />
            <span>
              Modo {thoughtMode === "exploration" ? "Exploración" : "Inmersión"}
            </span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal */}
      <div ref={interfaceRef} className="absolute inset-0 z-10" />

      {/* Panel de usuario neural */}
      <div className="absolute bottom-8 left-8 z-20 user-neural-panel">
        <div className="neural-header">
          <div className="neural-avatar">
            <Cpu className="w-8 h-8 text-neon-teal" />
          </div>

          <div className="user-info">
            <h3 className="text-xl font-bold text-white mb-1">
              {currentUser.name}
            </h3>
            <p className="text-white/70 text-sm mb-2">
              {currentUser.neural_implant_version}
            </p>

            <div className="neural-signature">
              <span className="text-neon-teal font-mono text-lg">
                {currentUser.neural_signature}
              </span>
            </div>
          </div>
        </div>

        <div className="brain-activity">
          <h4 className="text-white font-semibold mb-2">Actividad Cerebral</h4>

          <div className="activity-stats">
            <div className="activity-item">
              <span className="activity-label">Región Dominante:</span>
              <span className="activity-value">{brainActivity.region}</span>
            </div>
            <div className="activity-item">
              <span className="activity-label">Frecuencia:</span>
              <span className="activity-value">
                {brainActivity.dominant_frequency} Hz
              </span>
            </div>
            <div className="activity-item">
              <span className="activity-label">Patrón:</span>
              <span className="activity-value">
                {brainActivity.neural_pattern}
              </span>
            </div>
            <div className="activity-item">
              <span className="activity-label">Estado:</span>
              <span className="activity-value">
                {brainActivity.consciousness_state}
              </span>
            </div>
          </div>

          <div className="activity-bar">
            <span className="text-sm text-white/60">Nivel de Actividad</span>
            <div className="activity-progress">
              <div
                className="activity-fill"
                style={{ width: `${brainActivity.activity_level * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-grid">
            <div className="stat-item">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="stat-value">{currentUser.mental_bandwidth}</span>
              <span className="stat-label">MB/s</span>
            </div>
            <div className="stat-item">
              <Target className="w-4 h-4 text-green-400" />
              <span className="stat-value">
                {currentUser.navigation_skill}%
              </span>
              <span className="stat-label">Navegación</span>
            </div>
            <div className="stat-item">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="stat-value">{currentUser.luxury_affinity}%</span>
              <span className="stat-label">Afinidad Lujo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de mansión seleccionada */}
      {selectedMansion && (
        <div className="absolute bottom-8 right-8 z-20 mansion-neural-panel">
          <div className="mansion-header">
            <div className="mansion-preview">
              {getStyleIcon(selectedMansion.architectural_style)}
            </div>

            <div className="mansion-info">
              <h3 className="text-xl font-bold text-white mb-1">
                {selectedMansion.name}
              </h3>
              <p className="text-white/70 text-sm mb-2">
                Estilo: {selectedMansion.architectural_style.replace("_", " ")}
              </p>

              <div className="luxury-rating">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < selectedMansion.luxury_level / 2 ? "text-amber-400" : "text-gray-600"}`}
                    />
                  ))}
                  <span className="text-amber-400 font-bold ml-2">
                    {selectedMansion.luxury_level}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="thought-requirement">
            <h4 className="text-white font-semibold mb-2">Requisito Mental</h4>
            <p className="text-white/80 text-sm italic mb-3">
              "{selectedMansion.thought_requirement}"
            </p>
          </div>

          <div className="neural-specs">
            <div className="spec-grid">
              <div className="spec-item">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="spec-label">Accesibilidad:</span>
                <span className="spec-value">
                  {Math.round(selectedMansion.mental_accessibility * 100)}%
                </span>
              </div>
              <div className="spec-item">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="spec-label">Detalle Holográfico:</span>
                <span className="spec-value">
                  {selectedMansion.holographic_detail}%
                </span>
              </div>
              <div className="spec-item">
                <Waves className="w-4 h-4 text-green-400" />
                <span className="spec-label">Resonancia Neural:</span>
                <span className="spec-value">
                  {selectedMansion.neural_resonance}/10
                </span>
              </div>
            </div>
          </div>

          <div className="neural-actions">
            <button className="neural-action-btn primary">
              <Brain className="w-5 h-5" />
              <span>Navegación Directa</span>
            </button>

            <button className="neural-action-btn secondary">
              <Eye className="w-5 h-5" />
              <span>Preview Mental</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de conexiones neuronales */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 connections-panel">
        <h4 className="text-white font-bold mb-4">Conexiones Neuronales</h4>

        <div className="connections-list">
          {neuralConnections.map((connection) => (
            <div key={connection.id} className="connection-item">
              <div
                className="connection-signal"
                style={{ backgroundColor: connection.signal_color }}
              ></div>

              <div className="connection-details">
                <div className="connection-source">
                  {connection.source_neuron}
                </div>
                <div className="connection-strength">
                  Fuerza: {Math.round(connection.connection_strength * 100)}%
                </div>
                <div className="connection-speed">
                  {connection.transmission_speed} Hz
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-futuristas para Neurointerfaz */}
      <style jsx>{`
        .neural-title {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9),
            rgba(14, 231, 231, 0.1)
          );
          backdrop-filter: blur(25px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 650px;
        }

        .neural-text {
          background: linear-gradient(
            45deg,
            #0ee7e7,
            #00e7a7,
            #a855f7,
            #ffd700
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neural-flow 5s ease-in-out infinite;
        }

        .neural-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .neural-btn,
        .thought-btn {
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

        .neural-btn {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7);
          color: black;
        }

        .neural-btn.active {
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
          color: white;
          animation: neural-pulse 2s ease-in-out infinite;
        }

        .thought-btn {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.5);
        }

        .neural-btn:hover,
        .thought-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(14, 231, 231, 0.4);
        }

        .user-neural-panel,
        .mansion-neural-panel {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95),
            rgba(14, 231, 231, 0.1)
          );
          backdrop-filter: blur(30px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 400px;
          animation: panel-slide-up 0.5s ease;
        }

        .neural-header,
        .mansion-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .neural-avatar,
        .mansion-preview {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(14, 231, 231, 0.5);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: neural-avatar-pulse 3s ease-in-out infinite;
        }

        .user-info,
        .mansion-info {
          flex: 1;
        }

        .neural-signature {
          font-family: "Courier New", monospace;
          padding: 0.5rem;
          background: rgba(14, 231, 231, 0.1);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 8px;
        }

        .brain-activity {
          margin-bottom: 1.5rem;
        }

        .activity-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .activity-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .activity-value {
          font-size: 0.875rem;
          color: white;
          font-weight: 600;
        }

        .activity-bar {
          margin-top: 1rem;
        }

        .activity-progress {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .activity-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ee7e7, #00e7a7);
          border-radius: 4px;
          transition: width 0.3s ease;
          animation: neural-activity 2s ease-in-out infinite;
        }

        .user-stats {
          margin-bottom: 1.5rem;
        }

        .stat-grid,
        .spec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-item,
        .spec-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: center;
        }

        .spec-item {
          flex-direction: row;
          text-align: left;
          gap: 0.5rem;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
        }

        .stat-label,
        .spec-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .spec-value {
          font-size: 0.875rem;
          color: white;
          font-weight: 600;
        }

        .luxury-rating {
          margin-top: 1rem;
        }

        .thought-requirement {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(14, 231, 231, 0.1);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 15px;
        }

        .neural-specs {
          margin-bottom: 1.5rem;
        }

        .neural-actions {
          display: flex;
          gap: 1rem;
        }

        .neural-action-btn {
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

        .neural-action-btn.primary {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7);
          color: black;
          border: none;
        }

        .neural-action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(14, 231, 231, 0.4);
        }

        .neural-action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .neural-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .connections-panel {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 280px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .connections-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .connection-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .connection-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .connection-signal {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 15px currentColor;
          animation: connection-pulse 2s ease-in-out infinite;
        }

        .connection-details {
          flex: 1;
          color: white;
        }

        .connection-source {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .connection-strength,
        .connection-speed {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        @keyframes neural-flow {
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

        @keyframes neural-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
          }
        }

        @keyframes neural-avatar-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 25px rgba(14, 231, 231, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(14, 231, 231, 0.8);
          }
        }

        @keyframes neural-activity {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(14, 231, 231, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(14, 231, 231, 0.8);
          }
        }

        @keyframes connection-pulse {
          0%,
          100% {
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
