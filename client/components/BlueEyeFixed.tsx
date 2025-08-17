import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const AVATAR_URLS = [
  "https://models.readyplayer.me/68a130cc6db44d17d10d931b.glb",
  "https://models.readyplayer.me/64c6aaeb0e6df2e7e3b8b2a6.glb"
];

interface BlueEyeFixedProps {
  height?: number;
  autoRotate?: boolean;
}

export default function BlueEyeFixed({ height = 520, autoRotate = true }: BlueEyeFixedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clock = useRef(new THREE.Clock());
  const speakingRef = useRef(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, height);
    renderer.shadowMap.enabled = true;
    root.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene & camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(35, root.clientWidth / height, 0.1, 100);
    camera.position.set(0, 1.55, 2.6);

    // Lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0x2a2a40, 0.8);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(2.2, 3.2, 1.6);
    key.castShadow = true;
    scene.add(key);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.28 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
    controls.target.set(0, 1.45, 0);
    controls.minDistance = 1.4;
    controls.maxDistance = 3.2;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.92;
    controlsRef.current = controls;

    // Helper function para buscar bones
    const byNameLike = (root: THREE.Object3D, ...parts: string[]) => {
      const p = parts.map(s => s.toLowerCase());
      let found: THREE.Object3D | null = null;
      root.traverse(o => {
        if (!o.name) return;
        const n = o.name.toLowerCase();
        if (p.every(s => n.includes(s)) && !found) found = o;
      });
      return found;
    };

    // Función para crear avatar de respaldo
    const createFallbackAvatar = () => {
      console.log("🤖 Creando avatar de respaldo...");
      
      const group = new THREE.Group();
      
      // Cabeza
      const headGeometry = new THREE.SphereGeometry(0.12, 16, 16);
      const headMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 1.65, 0);
      head.castShadow = true;
      group.add(head);
      
      // Cuerpo
      const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.6, 8);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B5CF6 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(0, 1.2, 0);
      body.castShadow = true;
      group.add(body);
      
      // Brazos con pose natural
      const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6);
      const armMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.22, 1.25, 0.05);
      leftArm.rotation.set(0.3, 0, -0.4);
      leftArm.castShadow = true;
      group.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.22, 1.25, 0.05);
      rightArm.rotation.set(0.2, 0, 0.3);
      rightArm.castShadow = true;
      group.add(rightArm);
      
      // Tablet y bolígrafo
      const tabletGeometry = new THREE.BoxGeometry(0.12, 0.015, 0.18);
      const tabletMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);
      tablet.position.set(0.32, 1.05, 0.12);
      tablet.rotation.set(-Math.PI / 6, 0, Math.PI / 12);
      group.add(tablet);
      
      // Pantalla de tablet
      const screenGeometry = new THREE.PlaneGeometry(0.11, 0.16);
      const screenMaterial = new THREE.MeshLambertMaterial({
        color: 0x0a0a0a,
        emissive: 0x003366,
        emissiveIntensity: 0.15
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0.32, 1.06, 0.12);
      screen.rotation.set(-Math.PI / 3, 0, Math.PI / 12);
      group.add(screen);
      
      const penGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.14);
      const penMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb });
      const pen = new THREE.Mesh(penGeometry, penMaterial);
      pen.position.set(-0.32, 1.05, 0.12);
      pen.rotation.set(0, 0, Math.PI / 6);
      group.add(pen);
      
      // Centrar el grupo en el suelo
      const box = new THREE.Box3().setFromObject(group);
      group.position.y -= box.min.y;
      
      scene.add(group);
    };

    // Función para manejar la carga exitosa del avatar
    const handleAvatarLoad = (gltf: any) => {
      console.log("✅ Avatar GLB cargado exitosamente");
      
      const avatar = gltf.scene;
      avatar.traverse((o: any) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = false;
          if (o.material) {
            o.material.envMapIntensity = 0.7;
            o.material.needsUpdate = true;
          }
        }
      });

      // Centrar en el suelo
      const box = new THREE.Box3().setFromObject(avatar);
      const center = new THREE.Vector3();
      box.getCenter(center);
      avatar.position.y += (avatar.position.y - box.min.y);
      avatar.position.y -= 0.01;
      avatar.position.x -= center.x;
      avatar.position.z -= center.z;
      scene.add(avatar);

      // Buscar bones y aplicar pose natural
      const lSh = byNameLike(avatar, "left", "shoulder") || byNameLike(avatar, "left", "arm");
      const rSh = byNameLike(avatar, "right", "shoulder") || byNameLike(avatar, "right", "arm");
      const lEl = byNameLike(avatar, "left", "forearm") || byNameLike(avatar, "left", "elbow");
      const rEl = byNameLike(avatar, "right", "forearm") || byNameLike(avatar, "right", "elbow");
      const rHand = byNameLike(avatar, "right", "hand");
      const lHand = byNameLike(avatar, "left", "hand");

      // Pose natural (quitar T-pose)
      if (lSh) lSh.rotation.z -= 0.9;
      if (rSh) rSh.rotation.z += 0.9;
      if (lEl) lEl.rotation.z += 0.25;
      if (rEl) rEl.rotation.z -= 0.25;

      // Crear y agregar props si encontramos las manos
      if (rHand) {
        // Tablet
        const tabletGeometry = new THREE.BoxGeometry(0.12, 0.015, 0.18);
        const tabletMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
        const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);

        const screenGeometry = new THREE.PlaneGeometry(0.11, 0.16);
        const screenMaterial = new THREE.MeshLambertMaterial({
          color: 0x0a0a0a,
          emissive: 0x003366,
          emissiveIntensity: 0.15
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.008, 0);
        screen.rotation.x = -Math.PI / 2;
        tablet.add(screen);

        tablet.position.set(0.02, 0.05, 0.08);
        tablet.rotation.set(-Math.PI / 6, 0, Math.PI / 12);
        rHand.add(tablet);

        // Ajustar brazo derecho
        if (rSh) {
          rSh.rotation.x = 0.1;
          rSh.rotation.z = 0.6;
        }
        if (rEl) {
          rEl.rotation.x = -0.4;
        }
      }

      if (lHand) {
        // Bolígrafo
        const penGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.14);
        const penMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb });
        const pen = new THREE.Mesh(penGeometry, penMaterial);
        
        pen.position.set(0, 0.06, 0.02);
        pen.rotation.set(0, 0, Math.PI / 6);
        lHand.add(pen);

        // Ajustar brazo izquierdo
        if (lSh) {
          lSh.rotation.x = 0.15;
          lSh.rotation.z = -0.7;
        }
        if (lEl) {
          lEl.rotation.x = -0.3;
        }
      }
    };

    // Sistema de carga con reintentos
    const loadAvatarWithRetry = (urls: string[], currentIndex: number = 0) => {
      if (currentIndex >= urls.length) {
        console.warn("⚠️ No se pudo cargar ningún modelo GLB, usando avatar de respaldo");
        createFallbackAvatar();
        return;
      }

      const currentUrl = urls[currentIndex];
      console.log(`🔄 Intentando cargar modelo ${currentIndex + 1}/${urls.length}`);
      
      const loader = new GLTFLoader();
      loader.load(
        currentUrl,
        handleAvatarLoad,
        (progress) => {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`📥 Cargando modelo: ${percent.toFixed(1)}%`);
        },
        (error) => {
          console.warn(`❌ Error cargando modelo ${currentIndex + 1}:`, error.message);
          setTimeout(() => {
            loadAvatarWithRetry(urls, currentIndex + 1);
          }, 1000);
        }
      );
    };

    // Iniciar carga
    loadAvatarWithRetry(AVATAR_URLS);

    // Render loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
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
      speak("¡Hola! Soy Blu-ai, tu asesora virtual inmobiliaria con herramientas profesionales.");
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
