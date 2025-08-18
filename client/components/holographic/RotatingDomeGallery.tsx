import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Home, Star, Eye, Expand, Gem, Crown } from "lucide-react";

interface LuxuryProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  luxury_tier: "diamond" | "platinum" | "gold";
  hologram_color: string;
  rotation_speed: number;
}

const premiumProperties: LuxuryProperty[] = [
  {
    id: "villa-marbella-01",
    title: "Villa Celestial Marbella",
    price: "€12.5M",
    location: "Marbella, Costa del Sol",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    bedrooms: 8,
    bathrooms: 10,
    sqm: 1200,
    luxury_tier: "diamond",
    hologram_color: "#E879F9",
    rotation_speed: 0.02,
  },
  {
    id: "penthouse-madrid-02",
    title: "Penthouse Quantum Madrid",
    price: "€8.9M",
    location: "Madrid, Salamanca",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    bedrooms: 6,
    bathrooms: 7,
    sqm: 850,
    luxury_tier: "platinum",
    hologram_color: "#0EE7E7",
    rotation_speed: 0.015,
  },
  {
    id: "mansion-barcelona-03",
    title: "Mansión Holográfica Barcelona",
    price: "€15.2M",
    location: "Barcelona, Eixample",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    bedrooms: 10,
    bathrooms: 12,
    sqm: 1500,
    luxury_tier: "diamond",
    hologram_color: "#FFD700",
    rotation_speed: 0.025,
  },
  {
    id: "villa-ibiza-04",
    title: "Villa Cristal Ibiza",
    price: "€6.7M",
    location: "Ibiza, Es Vedra",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    bedrooms: 5,
    bathrooms: 6,
    sqm: 680,
    luxury_tier: "gold",
    hologram_color: "#00E7A7",
    rotation_speed: 0.018,
  },
  {
    id: "castle-palma-05",
    title: "Castillo Futurista Palma",
    price: "€22.1M",
    location: "Palma, Mallorca",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    bedrooms: 12,
    bathrooms: 15,
    sqm: 2200,
    luxury_tier: "diamond",
    hologram_color: "#A855F7",
    rotation_speed: 0.01,
  },
  {
    id: "loft-valencia-06",
    title: "Loft Cuántico Valencia",
    price: "€4.3M",
    location: "Valencia, Ciudad de las Artes",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    bedrooms: 4,
    bathrooms: 5,
    sqm: 520,
    luxury_tier: "gold",
    hologram_color: "#F59E0B",
    rotation_speed: 0.022,
  },
];

export default function RotatingDomeGallery() {
  const domeRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<LuxuryProperty | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<"dome" | "expanded">("dome");
  const sceneRef = useRef<THREE.Scene | null>(null);
  const propertyMeshes = useRef<
    Array<{ mesh: THREE.Mesh; property: LuxuryProperty }>
  >([]);

  useEffect(() => {
    if (!domeRef.current) return;

    // Configuración ultra-futurista para domo cristalino
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    domeRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Crear domo de cristal suspendido
    const domeGeometry = new THREE.SphereGeometry(
      12,
      64,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    );
    const domeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        starlight: { value: new THREE.Color(0x0ee7e7) },
        crystal_intensity: { value: 0.3 },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          // Deformación sutil del cristal
          vec3 pos = position;
          pos += sin(time + length(position) * 0.1) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 starlight;
        uniform float crystal_intensity;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        // Función de ruido para cristal
        float crystal_noise(vec3 pos) {
          return sin(pos.x * 10.0) * cos(pos.y * 8.0) * sin(pos.z * 12.0);
        }
        
        void main() {
          vec3 pos = vPosition;
          
          // Efecto de cristal líquido
          float noise = crystal_noise(pos + time * 0.1) * 0.5 + 0.5;
          vec3 crystal_color = starlight * (noise * crystal_intensity + 0.1);
          
          // Reflejos prismáticos
          float fresnel = pow(1.0 - abs(dot(normalize(pos), vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 prismatic = vec3(
            sin(time + pos.x * 5.0) * 0.3 + 0.7,
            sin(time + pos.y * 4.0) * 0.3 + 0.7,
            sin(time + pos.z * 6.0) * 0.3 + 0.7
          );
          
          vec3 final_color = crystal_color + prismatic * fresnel * 0.2;
          float alpha = 0.15 + fresnel * 0.1;
          
          gl_FragColor = vec4(final_color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.set(0, 5, 0);
    scene.add(dome);

    // Crear miniaturas holográficas de propiedades
    propertyMeshes.current = [];

    premiumProperties.forEach((property, index) => {
      // Geometría de la miniatura
      const houseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
      const houseMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          property_color: { value: new THREE.Color(property.hologram_color) },
          luxury_tier: {
            value:
              property.luxury_tier === "diamond"
                ? 3.0
                : property.luxury_tier === "platinum"
                  ? 2.0
                  : 1.0,
          },
          texture_url: { value: null },
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float time;
          uniform float luxury_tier;
          
          void main() {
            vPosition = position;
            vUv = uv;
            
            // Pulsación según tier de lujo
            vec3 pos = position;
            pos *= 1.0 + sin(time * luxury_tier) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 property_color;
          uniform float luxury_tier;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Efecto holográfico base
            float hologram = sin(time * 2.0 + length(vPosition) * 5.0) * 0.3 + 0.7;
            
            // Intensidad según lujo
            float intensity = luxury_tier * 0.3 + 0.4;
            
            // Líneas de escaneo holográfico
            float scan_lines = sin(vUv.y * 20.0 + time * 3.0) * 0.1 + 0.9;
            
            vec3 final_color = property_color * hologram * intensity * scan_lines;
            
            // Efecto de transparencia holográfica
            float alpha = 0.8 + sin(time + length(vPosition)) * 0.1;
            
            gl_FragColor = vec4(final_color, alpha);
          }
        `,
        transparent: true,
      });

      const house = new THREE.Mesh(houseGeometry, houseMaterial);

      // Posicionar en círculo dentro del domo
      const angle = (index / premiumProperties.length) * Math.PI * 2;
      const radius = 8;
      house.position.set(
        Math.cos(angle) * radius,
        3 + Math.sin(time * property.rotation_speed) * 0.5,
        Math.sin(angle) * radius,
      );
      house.userData = { property, originalAngle: angle };

      scene.add(house);
      propertyMeshes.current.push({ mesh: house, property });

      // Añadir efectos de partículas alrededor de cada propiedad
      const particleCount = 50;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const particleMaterial = new THREE.PointsMaterial({
        color: property.hologram_color,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.position.copy(house.position);
      scene.add(particles);
    });

    // Huéspedes elegantes paseando (figuras simples)
    const guestGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
    const guestMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    for (let i = 0; i < 12; i++) {
      const guest = new THREE.Mesh(guestGeometry, guestMaterial);
      const angle = (i / 12) * Math.PI * 2;
      guest.position.set(Math.cos(angle) * 15, 1, Math.sin(angle) * 15);
      guest.userData = { angle, speed: 0.005 + Math.random() * 0.005 };
      scene.add(guest);
    }

    // Fondo estrellado
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = Math.random() * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Iluminación ultra-luxury
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0ee7e7, 2);
    mainLight.position.set(20, 30, 20);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0x00e7a7, 2, 30);
    accentLight1.position.set(-15, 15, 15);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xffd700, 1.5, 25);
    accentLight2.position.set(15, 20, -10);
    scene.add(accentLight2);

    // Posicionar cámara para vista cinematográfica
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 5, 0);

    // Controles de interacción
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        propertyMeshes.current.map((p) => p.mesh),
      );

      if (intersects.length > 0) {
        const clickedProperty = intersects[0].object.userData
          .property as LuxuryProperty;
        setSelectedProperty(clickedProperty);
        console.log(`🏰 Propiedad seleccionada: ${clickedProperty.title}`);
      }
    };

    renderer.domElement.addEventListener("click", onMouseClick);

    // Loop de animación cinematográfica
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Actualizar shader del domo
      if (domeMaterial.uniforms) {
        domeMaterial.uniforms.time.value = time;
      }

      // Rotación del domo si está habilitada
      if (isRotating) {
        dome.rotation.y += 0.003;
      }

      // Actualizar propiedades holográficas
      propertyMeshes.current.forEach(({ mesh, property }, index) => {
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.time.value = time;
        }

        // Rotación individual de propiedades
        if (isRotating) {
          const newAngle =
            mesh.userData.originalAngle + time * property.rotation_speed;
          const radius = 8;
          mesh.position.x = Math.cos(newAngle) * radius;
          mesh.position.z = Math.sin(newAngle) * radius;
          mesh.position.y = 3 + Math.sin(time * 2 + index) * 0.5;
        }

        // Rotación sobre su eje
        mesh.rotation.y += 0.01;
      });

      // Movimiento de huéspedes
      scene.children.forEach((child) => {
        if (child.userData.angle !== undefined) {
          child.userData.angle += child.userData.speed;
          child.position.x = Math.cos(child.userData.angle) * 15;
          child.position.z = Math.sin(child.userData.angle) * 15;
        }
      });

      // Efecto de estrellas parpadeantes
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener("click", onMouseClick);
      if (domeRef.current && renderer.domElement) {
        domeRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "diamond":
        return <Gem className="w-5 h-5" />;
      case "platinum":
        return <Crown className="w-5 h-5" />;
      case "gold":
        return <Star className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "diamond":
        return "text-purple-400";
      case "platinum":
        return "text-neon-teal";
      case "gold":
        return "text-yellow-400";
      default:
        return "text-white";
    }
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black via-blue-dark to-purple-dark overflow-hidden">
      {/* Header de galería ultra-futurista */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
        <div className="gallery-title">
          <h1 className="text-4xl font-bold holographic-text mb-2">
            Galería Domo Cristalino
          </h1>
          <p className="text-white/80 text-lg">
            Miniaturas holográficas flotantes • Huéspedes elegantes • Cielo
            estrellado
          </p>
        </div>

        {/* Controles de galería */}
        <div className="gallery-controls">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`control-btn ${isRotating ? "active" : ""}`}
          >
            <Eye className="w-5 h-5" />
            <span>{isRotating ? "Pausar" : "Rotar"}</span>
          </button>

          <button
            onClick={() =>
              setViewMode(viewMode === "dome" ? "expanded" : "dome")
            }
            className="control-btn"
          >
            <Expand className="w-5 h-5" />
            <span>Vista {viewMode === "dome" ? "Expandida" : "Domo"}</span>
          </button>
        </div>
      </div>

      {/* Domo 3D principal */}
      <div ref={domeRef} className="absolute inset-0 z-10" />

      {/* Panel de propiedad seleccionada */}
      {selectedProperty && (
        <div className="absolute bottom-8 left-8 z-20 luxury-property-panel">
          <div className="property-header">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="property-image"
            />
            <div className="property-info">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`tier-icon ${getTierColor(selectedProperty.luxury_tier)}`}
                >
                  {getTierIcon(selectedProperty.luxury_tier)}
                </div>
                <span className={`tier-badge ${selectedProperty.luxury_tier}`}>
                  {selectedProperty.luxury_tier.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {selectedProperty.title}
              </h3>
              <p className="text-white/70">{selectedProperty.location}</p>
              <div className="price-tag">{selectedProperty.price}</div>
            </div>
          </div>

          <div className="property-details">
            <div className="detail-grid">
              <div className="detail-item">
                <Home className="w-4 h-4 text-neon-teal" />
                <span>{selectedProperty.bedrooms} Habitaciones</span>
              </div>
              <div className="detail-item">
                <Star className="w-4 h-4 text-neon-emerald" />
                <span>{selectedProperty.bathrooms} Baños</span>
              </div>
              <div className="detail-item">
                <Expand className="w-4 h-4 text-yellow-400" />
                <span>{selectedProperty.sqm}m²</span>
              </div>
            </div>
          </div>

          <div className="property-actions">
            <button className="luxury-action-btn primary">
              <Eye className="w-5 h-5" />
              <span>Tour VR Inmersivo</span>
            </button>

            <button className="luxury-action-btn secondary">
              <Expand className="w-5 h-5" />
              <span>Expandir Holograma</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de propiedades en miniatura */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 property-miniatures">
        <h4 className="text-white font-bold mb-4">Propiedades en Domo</h4>
        <div className="miniature-list">
          {premiumProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className={`miniature-item ${selectedProperty?.id === property.id ? "active" : ""}`}
              style={{ borderColor: property.hologram_color }}
            >
              <div
                className="miniature-glow"
                style={{ backgroundColor: property.hologram_color }}
              ></div>
              <div className="miniature-info">
                <div className="miniature-title">{property.title}</div>
                <div className="miniature-price">{property.price}</div>
                <div
                  className={`miniature-tier ${getTierColor(property.luxury_tier)}`}
                >
                  {getTierIcon(property.luxury_tier)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS ultra-avanzados */}
      <style jsx>{`
        .gallery-title {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8),
            rgba(14, 231, 231, 0.1)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 231, 231, 0.3);
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
        }

        .holographic-text {
          background: linear-gradient(45deg, #0ee7e7, #00e7a7, #a855f7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic-flow 4s ease-in-out infinite;
        }

        .gallery-controls {
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

        .luxury-property-panel {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9),
            rgba(168, 85, 247, 0.1)
          );
          backdrop-filter: blur(25px);
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 25px;
          padding: 2rem;
          max-width: 450px;
          animation: panel-slide-up 0.5s ease;
        }

        .property-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .property-image {
          width: 100px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid rgba(168, 85, 247, 0.3);
        }

        .property-info {
          flex: 1;
        }

        .tier-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .tier-badge {
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .tier-badge.diamond {
          background: rgba(168, 85, 247, 0.2);
          color: #a855f7;
        }

        .tier-badge.platinum {
          background: rgba(14, 231, 231, 0.2);
          color: #0ee7e7;
        }

        .tier-badge.gold {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: bold;
          color: #00e7a7;
          margin-top: 0.5rem;
        }

        .property-details {
          margin-bottom: 1.5rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: center;
          font-size: 0.875rem;
          color: white;
        }

        .property-actions {
          display: flex;
          gap: 1rem;
        }

        .luxury-action-btn {
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

        .luxury-action-btn.primary {
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
          color: white;
          border: none;
        }

        .luxury-action-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(168, 85, 247, 0.4);
        }

        .luxury-action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .luxury-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .property-miniatures {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          max-width: 250px;
        }

        .miniature-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .miniature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid transparent;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .miniature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .miniature-item.active {
          background: rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.5);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        }

        .miniature-glow {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
          animation: miniature-pulse 2s ease-in-out infinite;
        }

        .miniature-info {
          flex: 1;
          color: white;
        }

        .miniature-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .miniature-price {
          font-size: 0.75rem;
          color: #00e7a7;
          font-weight: bold;
        }

        .miniature-tier {
          margin-top: 0.25rem;
        }

        @keyframes holographic-flow {
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

        @keyframes miniature-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}
