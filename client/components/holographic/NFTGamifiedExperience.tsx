import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Gem,
  Trophy,
  Star,
  Zap,
  Crown,
  Coins,
  Gamepad2,
  Target,
  Award,
  Sparkles,
} from "lucide-react";

interface NFTPropertyCollection {
  id: string;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythical";
  price_eth: number;
  gems_required: number;
  unlock_level: number;
  hologram_color: string;
  animation_speed: number;
  special_effects: string[];
  benefits: string[];
}

interface PlayerProgress {
  level: number;
  experience: number;
  total_gems: number;
  collections_owned: number;
  achievements_unlocked: number;
  vip_status: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

const nftCollections: NFTPropertyCollection[] = [
  {
    id: "nft-villa-cosmic",
    name: "Villa Cósmica Eterna",
    description:
      "Mansión flotante entre nebulosas estelares con jardines cuánticos",
    rarity: "mythical",
    price_eth: 12.5,
    gems_required: 10000,
    unlock_level: 50,
    hologram_color: "#B45AF2",
    animation_speed: 0.8,
    special_effects: ["cosmic_dust", "stellar_winds", "quantum_gardens"],
    benefits: [
      "Acceso VIP Metaverso",
      "10% descuento propiedades",
      "Tours exclusivos",
    ],
  },
  {
    id: "nft-penthouse-crystal",
    name: "Penthouse Cristal Líquido",
    description:
      "Ático de cristal líquido que cambia de forma según las mareas lunares",
    rarity: "legendary",
    price_eth: 8.9,
    gems_required: 7500,
    unlock_level: 35,
    hologram_color: "#0EE7E7",
    animation_speed: 0.6,
    special_effects: ["liquid_crystal", "lunar_tides", "morphing_walls"],
    benefits: [
      "Eventos exclusivos",
      "15% bonus gemas",
      "Colecciones limitadas",
    ],
  },
  {
    id: "nft-mansion-aurora",
    name: "Mansión Aurora Boreal",
    description:
      "Casa bajo aurora boreal permanente con piscina de luz líquida",
    rarity: "epic",
    price_eth: 5.2,
    gems_required: 5000,
    unlock_level: 20,
    hologram_color: "#00E7A7",
    animation_speed: 0.4,
    special_effects: ["aurora_lights", "liquid_light_pool", "polar_winds"],
    benefits: [
      "Invitaciones eventos",
      "5% descuento marketplace",
      "NFT trading priority",
    ],
  },
  {
    id: "nft-loft-neon",
    name: "Loft Neón Infinito",
    description:
      "Loft urbano con luces neón que bailan al ritmo de la música cósmica",
    rarity: "rare",
    price_eth: 2.8,
    gems_required: 2500,
    unlock_level: 10,
    hologram_color: "#FF6B9D",
    animation_speed: 0.3,
    special_effects: ["neon_dancing", "cosmic_music", "rhythm_lights"],
    benefits: ["Acceso beta features", "Comunidad VIP", "Eventos musicales"],
  },
  {
    id: "nft-apartment-holographic",
    name: "Apartamento Holográfico",
    description: "Estudio moderno con muebles holográficos personalizables",
    rarity: "common",
    price_eth: 1.2,
    gems_required: 1000,
    unlock_level: 5,
    hologram_color: "#FFD700",
    animation_speed: 0.2,
    special_effects: ["holographic_furniture", "customizable_spaces"],
    benefits: ["Herramientas básicas", "Comunidad general"],
  },
];

const achievements = [
  {
    name: "Primer Coleccionista",
    description: "Adquiere tu primer NFT",
    icon: <Trophy className="w-6 h-6" />,
    gems_reward: 500,
  },
  {
    name: "Maestro de Gemas",
    description: "Acumula 5000 gemas",
    icon: <Gem className="w-6 h-6" />,
    gems_reward: 1000,
  },
  {
    name: "Leyenda Metaverso",
    description: "Alcanza nivel 25",
    icon: <Crown className="w-6 h-6" />,
    gems_reward: 2500,
  },
  {
    name: "Comerciante Estelar",
    description: "Completa 10 intercambios",
    icon: <Star className="w-6 h-6" />,
    gems_reward: 750,
  },
  {
    name: "Arquitecto Cósmico",
    description: "Colecciona 5 NFTs únicos",
    icon: <Award className="w-6 h-6" />,
    gems_reward: 3000,
  },
];

export default function NFTGamifiedExperience() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const [selectedNFT, setSelectedNFT] = useState<NFTPropertyCollection | null>(
    null,
  );
  const [playerData, setPlayerData] = useState<PlayerProgress>({
    level: 12,
    experience: 7850,
    total_gems: 3250,
    collections_owned: 2,
    achievements_unlocked: 3,
    vip_status: "silver",
  });
  const [gameMode, setGameMode] = useState<
    "collection" | "marketplace" | "achievements"
  >("collection");
  const sceneRef = useRef<THREE.Scene | null>(null);
  const nftMeshes = useRef<
    Array<{ mesh: THREE.Mesh; nft: NFTPropertyCollection }>
  >([]);

  useEffect(() => {
    if (!experienceRef.current) return;

    // Configuración ultra-futurista para experiencia NFT gamificada
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
    renderer.toneMappingExposure = 2.2;

    experienceRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear plataforma flotante central para NFTs
    const platformGeometry = new THREE.CylinderGeometry(15, 15, 2, 32);
    const platformMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        cosmic_color: { value: new THREE.Color(0x1a1a2e) },
        energy_flow: { value: new THREE.Color(0x0ee7e7) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          // Ondulación sutil de la plataforma
          vec3 pos = position;
          pos.y += sin(time + length(position.xz) * 0.1) * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 cosmic_color;
        uniform vec3 energy_flow;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Patrón de energía radial
          float energy = sin(time * 2.0 + dist * 10.0) * 0.5 + 0.5;
          
          // Anillos de energía
          float rings = sin(dist * 20.0 - time * 3.0) * 0.3 + 0.7;
          
          vec3 final_color = mix(cosmic_color, energy_flow, energy * rings * 0.8);
          
          gl_FragColor = vec4(final_color, 0.9);
        }
      `,
      transparent: true,
    });

    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -1;
    scene.add(platform);

    // Crear gemas flotantes como sistema de recompensas
    const gemGeometry = new THREE.OctahedronGeometry(0.3, 0);
    const gemColors = ["#FFD700", "#0EE7E7", "#FF6B9D", "#00E7A7", "#A855F7"];

    for (let i = 0; i < 50; i++) {
      const gemMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          gem_color: {
            value: new THREE.Color(
              gemColors[Math.floor(Math.random() * gemColors.length)],
            ),
          },
        },
        vertexShader: `
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            vPosition = position;
            
            // Rotación y flotación de gemas
            vec3 pos = position;
            pos.y += sin(time * 2.0 + float(gl_VertexID)) * 0.5;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 gem_color;
          varying vec3 vPosition;
          
          void main() {
            // Brillo cristalino
            float crystal_shine = pow(abs(sin(time + length(vPosition) * 5.0)), 2.0);
            vec3 final_color = gem_color * (0.7 + crystal_shine * 0.3);
            
            gl_FragColor = vec4(final_color, 0.9);
          }
        `,
        transparent: true,
      });

      const gem = new THREE.Mesh(gemGeometry, gemMaterial);
      gem.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 15 + 5,
        (Math.random() - 0.5) * 40,
      );
      gem.userData = { rotationSpeed: Math.random() * 0.02 + 0.01 };
      scene.add(gem);
    }

    // Crear NFTs holográficos flotantes en formación circular
    nftMeshes.current = [];

    nftCollections.forEach((nft, index) => {
      // Crear cubo holográfico para el NFT
      const nftGeometry = new THREE.BoxGeometry(3, 4, 0.5);
      const nftMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          nft_color: { value: new THREE.Color(nft.hologram_color) },
          rarity_level: { value: getRarityLevel(nft.rarity) },
          unlock_status: {
            value: playerData.level >= nft.unlock_level ? 1.0 : 0.0,
          },
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float time;
          uniform float rarity_level;
          
          void main() {
            vPosition = position;
            vUv = uv;
            
            // Efecto de rareza - mayor movimiento para NFTs más raros
            vec3 pos = position;
            pos += sin(time * rarity_level + length(position)) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 nft_color;
          uniform float rarity_level;
          uniform float unlock_status;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Efecto holográfico base
            float hologram = sin(time + length(vPosition) * 3.0) * 0.3 + 0.7;
            
            // Border glow según rareza
            float edge_glow = 1.0 - length(vUv - 0.5) * 2.0;
            edge_glow = pow(max(edge_glow, 0.0), 2.0) * rarity_level;
            
            // Efecto de bloqueo si no está desbloqueado
            float lock_effect = unlock_status;
            vec3 base_color = nft_color * lock_effect + vec3(0.3, 0.3, 0.3) * (1.0 - lock_effect);
            
            vec3 final_color = base_color * hologram + edge_glow * 0.5;
            float alpha = 0.8 + hologram * 0.2;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
      });

      const nftCube = new THREE.Mesh(nftGeometry, nftMaterial);

      // Posicionar en círculo elevado
      const angle = (index / nftCollections.length) * Math.PI * 2;
      const radius = 12;
      nftCube.position.set(
        Math.cos(angle) * radius,
        2 + index * 0.5,
        Math.sin(angle) * radius,
      );
      nftCube.userData = {
        nft,
        originalAngle: angle,
        floatOffset: index * 0.5,
      };

      scene.add(nftCube);
      nftMeshes.current.push({ mesh: nftCube, nft });

      // Añadir partículas de rareza alrededor de NFTs épicos/legendarios
      if (nft.rarity === "legendary" || nft.rarity === "mythical") {
        const particleCount = 100;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 6;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }

        particleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );

        const particleMaterial = new THREE.PointsMaterial({
          color: nft.hologram_color,
          size: 0.08,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.position.copy(nftCube.position);
        scene.add(particles);
      }
    });

    // Crear constelación de fondo
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 300;
      starsPositions[i * 3 + 1] = Math.random() * 150;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3),
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Iluminación futurista
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0ee7e7, 3);
    mainLight.position.set(30, 40, 30);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0xff6b9d, 2, 40);
    accentLight1.position.set(-20, 20, 20);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x00e7a7, 2.5, 35);
    accentLight2.position.set(20, 25, -15);
    scene.add(accentLight2);

    // Posicionar cámara para vista cinematográfica
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 2, 0);

    // Controles de interacción para NFTs
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        nftMeshes.current.map((n) => n.mesh),
      );

      if (intersects.length > 0) {
        const clickedNFT = intersects[0].object.userData
          .nft as NFTPropertyCollection;
        setSelectedNFT(clickedNFT);
        console.log(`🎮 NFT seleccionado: ${clickedNFT.name}`);
      }
    };

    renderer.domElement.addEventListener("click", onMouseClick);

    // Loop de animación gamificada
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.015;

      // Actualizar shader de plataforma
      if (platformMaterial.uniforms) {
        platformMaterial.uniforms.time.value = time;
      }

      // Animar NFTs holográficos
      nftMeshes.current.forEach(({ mesh, nft }, index) => {
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.time.value = time;
        }

        // Flotación orbital de NFTs
        const angle = mesh.userData.originalAngle + time * nft.animation_speed;
        const radius = 12;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y =
          2 + Math.sin(time * 2 + mesh.userData.floatOffset) * 0.8;

        // Rotación sobre eje Y
        mesh.rotation.y += 0.008;
        mesh.rotation.x = Math.sin(time + index) * 0.1;
      });

      // Animar gemas flotantes
      scene.children.forEach((child) => {
        if (child.userData.rotationSpeed) {
          child.rotation.x += child.userData.rotationSpeed;
          child.rotation.y += child.userData.rotationSpeed * 0.8;
          child.rotation.z += child.userData.rotationSpeed * 0.6;

          // Actualizar shader de gemas
          if (child.material instanceof THREE.ShaderMaterial) {
            child.material.uniforms.time.value = time;
          }
        }
      });

      // Rotación sutil de constelación
      stars.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener("click", onMouseClick);
      if (experienceRef.current && renderer.domElement) {
        experienceRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [playerData.level]);

  function getRarityLevel(rarity: string): number {
    switch (rarity) {
      case "mythical":
        return 5.0;
      case "legendary":
        return 4.0;
      case "epic":
        return 3.0;
      case "rare":
        return 2.0;
      case "common":
        return 1.0;
      default:
        return 1.0;
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "mythical":
        return "text-purple-400 bg-purple-900/20";
      case "legendary":
        return "text-amber-400 bg-amber-900/20";
      case "epic":
        return "text-violet-400 bg-violet-900/20";
      case "rare":
        return "text-blue-400 bg-blue-900/20";
      case "common":
        return "text-gray-400 bg-gray-900/20";
      default:
        return "text-white bg-gray-900/20";
    }
  };

  const getVIPStatusIcon = (status: string) => {
    switch (status) {
      case "diamond":
        return <Crown className="w-5 h-5 text-purple-400" />;
      case "platinum":
        return <Star className="w-5 h-5 text-blue-400" />;
      case "gold":
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case "silver":
        return <Award className="w-5 h-5 text-gray-400" />;
      case "bronze":
        return <Coins className="w-5 h-5 text-amber-600" />;
      default:
        return <Gamepad2 className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black via-purple-dark to-blue-dark overflow-hidden">
      {/* Header gamificado */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
        <div className="player-dashboard">
          <div className="player-info">
            <div className="flex items-center gap-3 mb-2">
              {getVIPStatusIcon(playerData.vip_status)}
              <h1 className="text-2xl font-bold text-white">
                Jugador Nivel {playerData.level}
              </h1>
              <span className={`vip-badge ${playerData.vip_status}`}>
                {playerData.vip_status.toUpperCase()}
              </span>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <Gem className="w-4 h-4 text-neon-teal" />
                <span>{playerData.total_gems.toLocaleString()} Gemas</span>
              </div>
              <div className="stat-item">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{playerData.collections_owned} NFTs</span>
              </div>
              <div className="stat-item">
                <Star className="w-4 h-4 text-purple-400" />
                <span>{playerData.achievements_unlocked} Logros</span>
              </div>
            </div>

            {/* Barra de experiencia */}
            <div className="experience-bar">
              <div className="exp-info">
                <span className="text-sm text-white/70">Experiencia</span>
                <span className="text-sm text-neon-teal">
                  {playerData.experience} / {(playerData.level + 1) * 1000} XP
                </span>
              </div>
              <div className="exp-progress">
                <div
                  className="exp-fill"
                  style={{
                    width: `${(playerData.experience / ((playerData.level + 1) * 1000)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de modo de juego */}
        <div className="game-mode-controls">
          <button
            onClick={() => setGameMode("collection")}
            className={`mode-btn ${gameMode === "collection" ? "active" : ""}`}
          >
            <Gem className="w-5 h-5" />
            <span>Colección</span>
          </button>

          <button
            onClick={() => setGameMode("marketplace")}
            className={`mode-btn ${gameMode === "marketplace" ? "active" : ""}`}
          >
            <Coins className="w-5 h-5" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setGameMode("achievements")}
            className={`mode-btn ${gameMode === "achievements" ? "active" : ""}`}
          >
            <Trophy className="w-5 h-5" />
            <span>Logros</span>
          </button>
        </div>
      </div>

      {/* Escena 3D principal */}
      <div ref={experienceRef} className="absolute inset-0 z-10" />

      {/* Panel de NFT seleccionado */}
      {selectedNFT && (
        <div className="absolute bottom-8 left-8 z-20 nft-detail-panel">
          <div className="nft-header">
            <div className="nft-preview">
              <div
                className="nft-hologram"
                style={{
                  backgroundColor: selectedNFT.hologram_color + "20",
                  borderColor: selectedNFT.hologram_color,
                }}
              >
                <Sparkles
                  className="w-8 h-8"
                  style={{ color: selectedNFT.hologram_color }}
                />
              </div>
            </div>

            <div className="nft-info">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rarity-badge ${getRarityColor(selectedNFT.rarity)}`}
                >
                  {selectedNFT.rarity.toUpperCase()}
                </span>
                {playerData.level >= selectedNFT.unlock_level ? (
                  <span className="status-badge unlocked">DESBLOQUEADO</span>
                ) : (
                  <span className="status-badge locked">
                    NIVEL {selectedNFT.unlock_level} REQ.
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {selectedNFT.name}
              </h3>
              <p className="text-white/70 text-sm mb-3">
                {selectedNFT.description}
              </p>

              <div className="nft-pricing">
                <div className="price-item">
                  <span className="text-neon-teal font-bold">
                    {selectedNFT.price_eth} ETH
                  </span>
                </div>
                <div className="price-item">
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span>
                    {selectedNFT.gems_required.toLocaleString()} Gemas
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="nft-benefits">
            <h4 className="text-white font-semibold mb-2">
              Beneficios Exclusivos
            </h4>
            <div className="benefits-list">
              {selectedNFT.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <Zap className="w-3 h-3 text-neon-emerald" />
                  <span className="text-sm text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="nft-actions">
            {playerData.level >= selectedNFT.unlock_level ? (
              <>
                <button className="action-btn primary">
                  <Coins className="w-5 h-5" />
                  <span>Comprar con ETH</span>
                </button>

                <button className="action-btn secondary">
                  <Gem className="w-5 h-5" />
                  <span>Usar Gemas</span>
                </button>
              </>
            ) : (
              <button className="action-btn disabled">
                <Target className="w-5 h-5" />
                <span>Alcanza Nivel {selectedNFT.unlock_level}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Panel de logros */}
      {gameMode === "achievements" && (
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 achievements-panel">
          <h3 className="text-xl font-bold text-white mb-4">
            Logros del Metaverso
          </h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`achievement-item ${index < playerData.achievements_unlocked ? "unlocked" : "locked"}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{achievement.name}</h4>
                  <p className="achievement-desc">{achievement.description}</p>
                  <div className="achievement-reward">
                    <Gem className="w-3 h-3 text-purple-400" />
                    <span>{achievement.gems_reward} Gemas</span>
                  </div>
                </div>
                {index < playerData.achievements_unlocked && (
                  <div className="achievement-checkmark">
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de colecciones */}
      {gameMode === "collection" && (
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 collection-panel">
          <h3 className="text-xl font-bold text-white mb-4">
            Mi Colección NFT
          </h3>
          <div className="collection-grid">
            {nftCollections.map((nft) => (
              <div
                key={nft.id}
                onClick={() => setSelectedNFT(nft)}
                className={`collection-item ${selectedNFT?.id === nft.id ? "active" : ""} ${playerData.level >= nft.unlock_level ? "available" : "locked"}`}
              >
                <div
                  className="collection-preview"
                  style={{ borderColor: nft.hologram_color }}
                >
                  <div
                    className="preview-glow"
                    style={{ backgroundColor: nft.hologram_color + "30" }}
                  ></div>
                  <Sparkles
                    className="w-6 h-6"
                    style={{ color: nft.hologram_color }}
                  />
                </div>

                <div className="collection-details">
                  <span
                    className={`collection-rarity ${getRarityColor(nft.rarity)}`}
                  >
                    {nft.rarity}
                  </span>
                  <h4 className="collection-name">{nft.name}</h4>
                  <div className="collection-price">
                    <span>{nft.price_eth} ETH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estilos CSS gamificados ultra-avanzados */}
      <style jsx>{`
        .player-dashboard {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9),
            rgba(168, 85, 247, 0.1)
          );
          backdrop-filter: blur(25px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 20px;
          padding: 2rem;
          max-width: 400px;
        }

        .player-info {
          color: white;
        }

        .vip-badge {
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .vip-badge.diamond {
          background: rgba(168, 85, 247, 0.3);
          color: #a855f7;
        }

        .vip-badge.platinum {
          background: rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .vip-badge.gold {
          background: rgba(245, 158, 11, 0.3);
          color: #f59e0b;
        }

        .vip-badge.silver {
          background: rgba(156, 163, 175, 0.3);
          color: #9ca3af;
        }

        .vip-badge.bronze {
          background: rgba(180, 83, 9, 0.3);
          color: #b45309;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1rem 0;
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
          font-size: 0.875rem;
        }

        .experience-bar {
          margin-top: 1rem;
        }

        .exp-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .exp-progress {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .exp-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ee7e7, #00e7a7);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .game-mode-controls {
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 1rem;
        }

        .mode-btn {
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

        .mode-btn:hover {
          background: rgba(14, 231, 231, 0.2);
          border-color: rgba(14, 231, 231, 0.5);
          transform: translateY(-3px);
        }

        .mode-btn.active {
          background: rgba(14, 231, 231, 0.3);
          border-color: rgba(14, 231, 231, 0.8);
          box-shadow: 0 0 20px rgba(14, 231, 231, 0.4);
        }

        .nft-detail-panel {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95),
            rgba(14, 231, 231, 0.1)
          );
          backdrop-filter: blur(30px);
          border: 2px solid rgba(14, 231, 231, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 450px;
          animation: panel-slide-up 0.5s ease;
        }

        .nft-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .nft-preview {
          flex-shrink: 0;
        }

        .nft-hologram {
          width: 80px;
          height: 80px;
          border: 2px solid;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: hologram-pulse 2s ease-in-out infinite;
        }

        .nft-info {
          flex: 1;
        }

        .rarity-badge {
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          text-transform: uppercase;
        }

        .status-badge.unlocked {
          background: rgba(0, 231, 167, 0.2);
          color: #00e7a7;
        }

        .status-badge.locked {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .nft-pricing {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .price-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: white;
        }

        .nft-benefits {
          margin-bottom: 1.5rem;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nft-actions {
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
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7);
          color: black;
          border: none;
        }

        .action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(14, 231, 231, 0.4);
        }

        .action-btn.secondary {
          background: rgba(168, 85, 247, 0.2);
          color: white;
          border: 1px solid rgba(168, 85, 247, 0.5);
        }

        .action-btn.secondary:hover {
          background: rgba(168, 85, 247, 0.3);
          transform: translateY(-3px);
        }

        .action-btn.disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: not-allowed;
        }

        .achievements-panel,
        .collection-panel {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          max-width: 300px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .achievement-item.unlocked {
          background: rgba(0, 231, 167, 0.1);
          border: 1px solid rgba(0, 231, 167, 0.3);
        }

        .achievement-item.locked {
          opacity: 0.6;
          background: rgba(255, 255, 255, 0.02);
        }

        .achievement-icon {
          flex-shrink: 0;
          color: white;
        }

        .achievement-info {
          flex: 1;
          color: white;
        }

        .achievement-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .achievement-desc {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .achievement-reward {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #a855f7;
        }

        .achievement-checkmark {
          flex-shrink: 0;
        }

        .collection-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .collection-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .collection-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .collection-item.active {
          background: rgba(14, 231, 231, 0.2);
          border: 1px solid rgba(14, 231, 231, 0.5);
          box-shadow: 0 0 15px rgba(14, 231, 231, 0.3);
        }

        .collection-item.locked {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .collection-item.locked:hover {
          transform: none;
        }

        .collection-preview {
          width: 50px;
          height: 50px;
          border: 2px solid;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .preview-glow {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          animation: preview-pulse 2s ease-in-out infinite;
        }

        .collection-details {
          flex: 1;
          color: white;
        }

        .collection-rarity {
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.2rem 0.5rem;
          border-radius: 8px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.25rem;
        }

        .collection-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .collection-price {
          font-size: 0.75rem;
          color: #00e7a7;
          font-weight: bold;
        }

        @keyframes hologram-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px currentColor;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px currentColor;
            transform: scale(1.05);
          }
        }

        @keyframes preview-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes panel-slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
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
