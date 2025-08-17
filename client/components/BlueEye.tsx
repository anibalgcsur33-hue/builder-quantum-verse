import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Avatar con pose más natural (brazos relajados)
const AVATAR_URL = "https://models.readyplayer.me/64f7b1c47f374d8ebf859e5b650ba2ba.glb";

interface BlueEyeProps {
  height?: number;
  autoRotate?: boolean;
}

export default function BlueEye({ height = 520, autoRotate = true }: BlueEyeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const meshRef = useRef<THREE.SkinnedMesh | null>(null);
  const jawIndexRef = useRef(-1);
  const speakingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const root = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      35,
      root.clientWidth / height,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 2.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, height);
    renderer.shadowMap.enabled = true;
    root.appendChild(renderer.domElement);

    // Luces
    const hemi = new THREE.HemisphereLight(0xffffff, 0x303040, 0.8);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2, 3, 1.5);
    key.castShadow = true;
    scene.add(key);

    // Suelo
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.6, 0); // Enfocar más arriba para ver mejor la cara
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.4; // Rotación más lenta
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.minPolarAngle = Math.PI / 6; // Limitar ángulo vertical
    controls.maxPolarAngle = Math.PI / 2;

    // Cargar avatar
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_URL,
      (gltf) => {
        const avatar = gltf.scene;

        // Posicionar avatar para que mire al frente
        avatar.position.set(0, 0, 0);
        avatar.rotation.y = 0; // Mirar directamente al frente
        avatar.scale.setScalar(1);

        // Ajustar pose de brazos para que se vean más naturales
        avatar.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            if (o instanceof THREE.SkinnedMesh && !meshRef.current) {
              meshRef.current = o;
            }
          }

          // Ajustar brazos si encontramos los huesos
          if (o.isBone) {
            if (o.name.toLowerCase().includes('leftarm') || o.name.toLowerCase().includes('left_arm')) {
              o.rotation.z = 0; // Brazo izquierdo relajado
              o.rotation.x = 0.1;
            }
            if (o.name.toLowerCase().includes('rightarm') || o.name.toLowerCase().includes('right_arm')) {
              o.rotation.z = 0; // Brazo derecho relajado
              o.rotation.x = 0.1;
            }
            if (o.name.toLowerCase().includes('leftshoulder') || o.name.toLowerCase().includes('left_shoulder')) {
              o.rotation.z = 0.2; // Hombro izquierdo más natural
            }
            if (o.name.toLowerCase().includes('rightshoulder') || o.name.toLowerCase().includes('right_shoulder')) {
              o.rotation.z = -0.2; // Hombro derecho más natural
            }
          }
        });
        scene.add(avatar);

        // Blendshape para mandíbula
        const dict = meshRef.current?.morphTargetDictionary || {};
        if (dict["jawOpen"] !== undefined) {
          jawIndexRef.current = dict["jawOpen"];
        }

        // Animación idle
        if (gltf.animations?.length) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.loop = THREE.LoopRepeat;
          idle.play();
        }
      },
      undefined,
      (err) => console.error("Error cargando GLB:", err)
    );

    // Render loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = clockRef.current.getDelta();
      mixerRef.current && mixerRef.current.update(dt);

      // Simular boca
      if (
        speakingRef.current &&
        meshRef.current?.morphTargetInfluences &&
        jawIndexRef.current >= 0
      ) {
        meshRef.current.morphTargetInfluences[jawIndexRef.current] =
          (Math.sin(performance.now() * 0.03) * 0.5 + 0.5) * 0.6;
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

  // Síntesis de voz del navegador
  const speak = (line: string) => {
    if (!("speechSynthesis" in window)) return;

    // Reemplazar "BlueEye" con "Blu-ai" para mejor pronunciación en español
    const textToSpeak = line.replace(/BlueEye/gi, "Blu-ai");

    const utter = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();
    const es = voices.find((v) => /es-|Spanish/i.test(v.lang));
    if (es) utter.voice = es;

    // Configuración optimizada para voz femenina
    utter.rate = 0.8;
    utter.pitch = 1.2;
    utter.volume = 0.9;

    utter.onstart = () => {
      speakingRef.current = true;
      console.log("🗣️ BlueEye comenzó a hablar");
    };
    utter.onend = () => {
      speakingRef.current = false;
      console.log("🔇 BlueEye terminó de hablar");
    };
    utter.onerror = () => {
      speakingRef.current = false;
      console.log("❌ Error en síntesis de voz");
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Escuchar saludo automático desde el Hero
  useEffect(() => {
    const handleSaludo = (e: CustomEvent) => {
      const texto = e.detail;
      console.log("📢 Evento blueeye-saludo recibido:", texto);

      // Pequeño delay para asegurar que el avatar esté cargado
      setTimeout(() => {
        speak(texto);
      }, 500);
    };

    window.addEventListener("blueeye-saludo", handleSaludo as EventListener);

    // También intentar hablar si no se activó el evento
    const fallbackTimeout = setTimeout(() => {
      if (!speakingRef.current) {
        speak("¡Hola! Soy Blu-ai, tu asesora virtual inmobiliaria.");
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
