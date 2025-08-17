import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface BlueEyeCustomProps {
  height?: number;
  autoRotate?: boolean;
}

export default function BlueEyeCustom({ height = 520, autoRotate = true }: BlueEyeCustomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clock = useRef(new THREE.Clock());
  const speakingRef = useRef(false);
  const avatarRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, root.clientWidth / height, 0.1, 100);
    camera.position.set(0, 1.6, 2.8);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
    fillLight.position.set(-3, 5, -3);
    scene.add(fillLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, 1.5, 0);
    controls.minDistance = 1.8;
    controls.maxDistance = 4.5;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.85;

    // Crear Avatar Custom
    const createCustomAvatar = () => {
      console.log("🎨 Creando avatar custom...");
      
      const avatar = new THREE.Group();
      avatarRef.current = avatar;

      // === CABEZA ===
      const headGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xfdbcb4,
        roughness: 0.7,
        metalness: 0.1
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 1.75, 0);
      head.castShadow = true;
      head.receiveShadow = true;
      avatar.add(head);
      headRef.current = head;

      // === CABELLO ===
      const hairGeometry = new THREE.SphereGeometry(0.16, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
      const hairMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.8
      });
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.set(0, 1.82, 0);
      hair.castShadow = true;
      avatar.add(hair);

      // === OJOS ===
      const eyeGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x1e40af });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.05, 1.78, 0.13);
      avatar.add(leftEye);
      
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.05, 1.78, 0.13);
      avatar.add(rightEye);

      // === NARIZ ===
      const noseGeometry = new THREE.ConeGeometry(0.015, 0.04, 6);
      const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 });
      const nose = new THREE.Mesh(noseGeometry, noseMaterial);
      nose.position.set(0, 1.73, 0.14);
      nose.rotation.x = Math.PI;
      avatar.add(nose);

      // === TORSO ===
      const torsoGeometry = new THREE.CylinderGeometry(0.18, 0.22, 0.8, 12);
      const torsoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B5CF6,
        roughness: 0.6,
        metalness: 0.2
      });
      const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
      torso.position.set(0, 1.2, 0);
      torso.castShadow = true;
      torso.receiveShadow = true;
      avatar.add(torso);

      // === BRAZOS (POSE NATURAL) ===
      const armGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.45, 8);
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xfdbcb4,
        roughness: 0.7 
      });

      // Brazo izquierdo (pose profesional sosteniendo tablet)
      const leftUpperArm = new THREE.Mesh(armGeometry, armMaterial);
      leftUpperArm.position.set(-0.25, 1.45, 0.1);
      leftUpperArm.rotation.set(0.4, 0, -0.3); // Pose natural hacia adelante
      leftUpperArm.castShadow = true;
      avatar.add(leftUpperArm);

      // Antebrazo izquierdo
      const leftForearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), 
        armMaterial
      );
      leftForearm.position.set(-0.35, 1.15, 0.25);
      leftForearm.rotation.set(-0.8, 0, -0.2); // Flexionado hacia arriba
      leftForearm.castShadow = true;
      avatar.add(leftForearm);

      // Brazo derecho (pose profesional con bolígrafo)
      const rightUpperArm = new THREE.Mesh(armGeometry, armMaterial);
      rightUpperArm.position.set(0.25, 1.45, 0.1);
      rightUpperArm.rotation.set(0.3, 0, 0.2); // Pose natural hacia adelante
      rightUpperArm.castShadow = true;
      avatar.add(rightUpperArm);

      // Antebrazo derecho
      const rightForearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), 
        armMaterial
      );
      rightForearm.position.set(0.35, 1.18, 0.22);
      rightForearm.rotation.set(-0.6, 0, 0.1); // Flexionado suavemente
      rightForearm.castShadow = true;
      avatar.add(rightForearm);

      // === MANOS ===
      const handGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const handMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 });

      // Mano izquierda
      const leftHand = new THREE.Mesh(handGeometry, handMaterial);
      leftHand.position.set(-0.42, 0.95, 0.35);
      leftHand.castShadow = true;
      avatar.add(leftHand);

      // Mano derecha
      const rightHand = new THREE.Mesh(handGeometry, handMaterial);
      rightHand.position.set(0.42, 1.0, 0.32);
      rightHand.castShadow = true;
      avatar.add(rightHand);

      // === PIERNAS ===
      const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
      const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b,
        roughness: 0.8 
      });

      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.12, 0.4, 0);
      leftLeg.castShadow = true;
      avatar.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.12, 0.4, 0);
      rightLeg.castShadow = true;
      avatar.add(rightLeg);

      // === ZAPATOS ===
      const shoeGeometry = new THREE.BoxGeometry(0.12, 0.06, 0.25);
      const shoeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

      const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
      leftShoe.position.set(-0.12, 0.03, 0.05);
      leftShoe.castShadow = true;
      avatar.add(leftShoe);

      const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
      rightShoe.position.set(0.12, 0.03, 0.05);
      rightShoe.castShadow = true;
      avatar.add(rightShoe);

      // === TABLET (en mano izquierda) ===
      const tabletGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.22);
      const tabletMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d3748,
        roughness: 0.3,
        metalness: 0.7
      });
      const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);
      tablet.position.set(-0.45, 0.98, 0.38);
      tablet.rotation.set(-0.3, 0.1, 0);
      tablet.castShadow = true;
      avatar.add(tablet);

      // Pantalla del tablet
      const screenGeometry = new THREE.PlaneGeometry(0.14, 0.2);
      const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        emissive: 0x0066cc,
        emissiveIntensity: 0.3
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(-0.45, 0.99, 0.38);
      screen.rotation.set(-0.3, 0.1, 0);
      avatar.add(screen);

      // === BOLÍGRAFO (en mano derecha) ===
      const penGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.18, 8);
      const penMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2563eb,
        roughness: 0.2,
        metalness: 0.8
      });
      const pen = new THREE.Mesh(penGeometry, penMaterial);
      pen.position.set(0.45, 1.03, 0.35);
      pen.rotation.set(0, 0, Math.PI / 6);
      pen.castShadow = true;
      avatar.add(pen);

      scene.add(avatar);
      
      console.log("✅ Avatar custom creado exitosamente");
    };

    // Crear el avatar
    createCustomAvatar();

    // Animación de respiración sutil
    let breathPhase = 0;

    // Render loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      
      // Animación de respiración
      breathPhase += 0.02;
      if (avatarRef.current) {
        avatarRef.current.scale.y = 1 + Math.sin(breathPhase) * 0.01;
      }

      // Parpadeo ocasional
      if (headRef.current && Math.random() < 0.002) {
        headRef.current.scale.y = 0.8;
        setTimeout(() => {
          if (headRef.current) headRef.current.scale.y = 1;
        }, 150);
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
    const es = voices.find((v) => /es-|Spanish/i.test(v.lang));
    if (es) utter.voice = es;

    utter.rate = 0.8;
    utter.pitch = 1.2;
    utter.volume = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Escuchar saludo automático
  useEffect(() => {
    const handleSaludo = (e: CustomEvent) => {
      const texto = e.detail;
      setTimeout(() => {
        speak(texto);
      }, 500);
    };

    window.addEventListener("blueeye-saludo", handleSaludo as EventListener);

    const fallbackTimeout = setTimeout(() => {
      speak("¡Hola! Soy Blu-ai, tu asesora virtual inmobiliaria. Ahora con brazos perfectamente normales y sin problemas de axilas.");
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
