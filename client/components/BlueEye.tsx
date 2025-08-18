import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface BlueEyeProps {
  height?: number;
  autoRotate?: boolean;
}

export default function BlueEye({ height = 520, autoRotate = true }: BlueEyeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const speakingRef = useRef(false);
  const avatarRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const root = containerRef.current;
    const scene = new THREE.Scene();

    // Camera optimizada
    const camera = new THREE.PerspectiveCamera(
      35,
      root.clientWidth / height,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 2.5);

    // Renderer con mejor calidad
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    root.appendChild(renderer.domElement);

    // Iluminación profesional estilo neon
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0EE7E7, 2);
    directionalLight.position.set(3, 4, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Luz de relleno con color neon-emerald
    const fillLight = new THREE.DirectionalLight(0x00E7A7, 1);
    fillLight.position.set(-2, 2, -2);
    scene.add(fillLight);

    // Luz de acento
    const accentLight = new THREE.PointLight(0x0EE7E7, 1, 10);
    accentLight.position.set(0, 2, 1);
    scene.add(accentLight);

    // Suelo con efecto neon
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.3, color: 0x0EE7E7 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Controles de cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.6, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 1.8;
    controls.maxDistance = 4;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2;

    // Crear avatar profesional elegante con estilo neon
    const createProfessionalAvatar = () => {
      console.log("🎭 Creando BlueEye Avatar profesional...");
      
      const group = new THREE.Group();
      avatarRef.current = group;
      
      // === CABEZA ===
      const headGeometry = new THREE.SphereGeometry(0.13, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xfdbcb4,
        roughness: 0.4,
        metalness: 0.1,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.05
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 1.7, 0);
      head.castShadow = true;
      group.add(head);

      // === CABELLO PROFESIONAL ===
      const hairGeometry = new THREE.SphereGeometry(0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6);
      const hairMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a3e,
        roughness: 0.8,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.1
      });
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.set(0, 1.78, -0.02);
      hair.castShadow = true;
      group.add(hair);

      // === OJOS BRILLANTES ===
      const eyeGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0EE7E7,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.8
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.05, 1.72, 0.12);
      group.add(leftEye);
      
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.05, 1.72, 0.12);
      group.add(rightEye);

      // === TRAJE EJECUTIVO ===
      const torsoGeometry = new THREE.CylinderGeometry(0.18, 0.22, 0.8, 12);
      const torsoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a2e,
        roughness: 0.2,
        metalness: 0.3,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.02
      });
      const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
      torso.position.set(0, 1.3, 0);
      torso.castShadow = true;
      group.add(torso);

      // === CAMISA CON DETALLES NEON ===
      const shirtGeometry = new THREE.CylinderGeometry(0.17, 0.21, 0.5, 12);
      const shirtMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf8fafc,
        roughness: 0.6,
        emissive: 0x00E7A7,
        emissiveIntensity: 0.03
      });
      const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
      shirt.position.set(0, 1.45, 0);
      group.add(shirt);

      // === BRAZOS PROFESIONALES ===
      const armGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.35, 8);
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xfdbcb4,
        roughness: 0.6,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.02
      });

      // Brazo izquierdo en pose natural
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.26, 1.4, 0.08);
      leftArm.rotation.set(0.3, 0, -0.4);
      leftArm.castShadow = true;
      group.add(leftArm);

      // Antebrazo izquierdo
      const leftForearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), 
        armMaterial
      );
      leftForearm.position.set(-0.38, 1.15, 0.22);
      leftForearm.rotation.set(-0.7, 0, -0.3);
      leftForearm.castShadow = true;
      group.add(leftForearm);

      // Brazo derecho en pose natural
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.26, 1.4, 0.08);
      rightArm.rotation.set(0.3, 0, 0.4);
      rightArm.castShadow = true;
      group.add(rightArm);

      // Antebrazo derecho
      const rightForearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), 
        armMaterial
      );
      rightForearm.position.set(0.38, 1.15, 0.22);
      rightForearm.rotation.set(-0.7, 0, 0.3);
      rightForearm.castShadow = true;
      group.add(rightForearm);

      // === MANOS ===
      const handGeometry = new THREE.SphereGeometry(0.045, 8, 8);
      
      const leftHand = new THREE.Mesh(handGeometry, armMaterial);
      leftHand.position.set(-0.45, 0.95, 0.32);
      leftHand.castShadow = true;
      group.add(leftHand);

      const rightHand = new THREE.Mesh(handGeometry, armMaterial);
      rightHand.position.set(0.45, 0.95, 0.32);
      rightHand.castShadow = true;
      group.add(rightHand);

      // === TABLET HOLOGRÁFICO ===
      const tabletGeometry = new THREE.BoxGeometry(0.14, 0.02, 0.18);
      const tabletMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a2e,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.2
      });
      const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);
      tablet.position.set(-0.48, 0.99, 0.35);
      tablet.rotation.set(-0.3, 0.1, 0);
      tablet.castShadow = true;
      group.add(tablet);

      // Pantalla holográfica
      const screenGeometry = new THREE.PlaneGeometry(0.13, 0.16);
      const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        emissive: 0x0EE7E7,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(-0.48, 1.0, 0.35);
      screen.rotation.set(-0.3, 0.1, 0);
      group.add(screen);

      // === BOLÍGRAFO DIGITAL ===
      const penGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.16, 8);
      const penMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00E7A7,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x00E7A7,
        emissiveIntensity: 0.4
      });
      const pen = new THREE.Mesh(penGeometry, penMaterial);
      pen.position.set(0.48, 0.99, 0.35);
      pen.rotation.set(0, 0, Math.PI / 6);
      pen.castShadow = true;
      group.add(pen);

      // === FALDA PROFESIONAL ===
      const skirtGeometry = new THREE.CylinderGeometry(0.22, 0.24, 0.4, 12);
      const skirtMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a2e,
        roughness: 0.7,
        metalness: 0.1
      });
      const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
      skirt.position.set(0, 0.7, 0);
      skirt.castShadow = true;
      group.add(skirt);

      // === ZAPATOS ELEGANTES ===
      const shoeGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.28);
      const shoeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        roughness: 0.3,
        metalness: 0.8
      });

      const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
      leftShoe.position.set(-0.12, 0.04, 0.05);
      leftShoe.castShadow = true;
      group.add(leftShoe);

      const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
      rightShoe.position.set(0.12, 0.04, 0.05);
      rightShoe.castShadow = true;
      group.add(rightShoe);

      // Añadir efecto de brillo alrededor del avatar
      const glowGeometry = new THREE.SphereGeometry(2, 16, 16);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 color = mix(vec3(0.058, 0.906, 0.906), vec3(0.0, 0.906, 0.655), sin(time) * 0.5 + 0.5);
            gl_FragColor = vec4(color, intensity * 0.1);
          }
        `,
        transparent: true,
        side: THREE.BackSide
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      group.add(glow);

      scene.add(group);
      
      console.log("✨ BlueEye Avatar profesional creado con efectos neon");
    };

    // Crear el avatar
    createProfessionalAvatar();

    // Animaciones dinámicas
    let breathPhase = 0;
    let eyeBlink = 0;

    // Render loop con animaciones
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      
      // Animación de respiración sutil
      breathPhase += 0.01;
      if (avatarRef.current) {
        avatarRef.current.scale.y = 1 + Math.sin(breathPhase) * 0.008;
        
        // Rotación suave del avatar
        if (autoRotate) {
          avatarRef.current.rotation.y += 0.003;
        }
      }

      // Parpadeo ocasional de los ojos
      eyeBlink += 0.02;
      if (Math.sin(eyeBlink) > 0.98) {
        const eyes = avatarRef.current?.children.filter(child => 
          child.position.z > 0.1 && child.position.y > 1.6
        );
        eyes?.forEach(eye => {
          if (eye instanceof THREE.Mesh) {
            eye.scale.y = 0.1;
            setTimeout(() => {
              eye.scale.y = 1;
            }, 100);
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (root.contains(renderer.domElement)) {
        root.removeChild(renderer.domElement);
      }
    };
  }, [height, autoRotate]);

  // Síntesis de voz
  const speak = (line: string) => {
    if (!("speechSynthesis" in window)) return;

    const textToSpeak = line.replace(/BlueEye/gi, "Blu-ai");
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => /es-|Spanish/i.test(v.lang));
    if (spanishVoice) utter.voice = spanishVoice;

    utter.rate = 0.8;
    utter.pitch = 1.3;
    utter.volume = 0.9;

    utter.onstart = () => {
      speakingRef.current = true;
      console.log("🗣️ BlueEye comenzó a hablar");
    };
    
    utter.onend = () => {
      speakingRef.current = false;
      console.log("🔇 BlueEye terminó de hablar");
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Escuchar eventos de saludo
  useEffect(() => {
    const handleSaludo = (e: CustomEvent) => {
      const texto = e.detail;
      console.log("📢 Evento blueeye-saludo recibido:", texto);
      
      setTimeout(() => {
        speak(texto);
      }, 500);
    };

    window.addEventListener("blueeye-saludo", handleSaludo as EventListener);

    // Saludo de respaldo
    const fallbackTimeout = setTimeout(() => {
      if (!speakingRef.current) {
        speak("¡Hola! Soy BlueEye, tu asesora virtual inmobiliaria profesional. Bienvenido al futuro de los bienes raíces.");
      }
    }, 5000);

    return () => {
      window.removeEventListener("blueeye-saludo", handleSaludo as EventListener);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
        borderRadius: 16,
        overflow: "hidden",
        background: "transparent"
      }}
    />
  );
}
