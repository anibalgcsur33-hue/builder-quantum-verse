import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Avatar original que funcionaba
const AVATAR_URL = "https://models.readyplayer.me/68a130cc6db44d17d10d931b.glb";

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

        avatar.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            if (o instanceof THREE.SkinnedMesh && !meshRef.current) {
              meshRef.current = o;
            }
          }
        });

        scene.add(avatar);

        // Agregar tablet y bolígrafo para justificar la pose de los brazos
        setTimeout(() => {
          // Crear tablet
          const tabletGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.2);
          const tabletMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
          const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);

          // Crear pantalla de tablet
          const screenGeometry = new THREE.PlaneGeometry(0.14, 0.18);
          const screenMaterial = new THREE.MeshLambertMaterial({
            color: 0x1a1a2e,
            emissive: 0x0066cc,
            emissiveIntensity: 0.1
          });
          const screen = new THREE.Mesh(screenGeometry, screenMaterial);
          screen.position.set(0, 0.011, 0);
          screen.rotation.x = -Math.PI / 2;
          tablet.add(screen);

          // Crear bolígrafo
          const penGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.15);
          const penMaterial = new THREE.MeshLambertMaterial({ color: 0x0066ff });
          const pen = new THREE.Mesh(penGeometry, penMaterial);

          // Buscar las manos para colocar los objetos
          avatar.traverse((bone) => {
            if (bone.isBone) {
              // Tablet en mano izquierda
              if (bone.name === "LeftHand" || bone.name === "mixamorigLeftHand") {
                tablet.position.set(0, 0, 0.1);
                tablet.rotation.set(-Math.PI / 4, 0, 0);
                bone.add(tablet);
              }
              // Bolígrafo en mano derecha
              if (bone.name === "RightHand" || bone.name === "mixamorigRightHand") {
                pen.position.set(0, 0, 0.1);
                pen.rotation.set(0, 0, Math.PI / 4);
                bone.add(pen);
              }

              // Ajustar pose de brazos para sostener los objetos
              if (bone.name === "LeftArm" || bone.name === "mixamorigLeftArm") {
                bone.rotation.x = 0.3; // Brazo izquierdo sosteniendo tablet
                bone.rotation.z = -0.4;
              }
              if (bone.name === "RightArm" || bone.name === "mixamorigRightArm") {
                bone.rotation.x = 0.2; // Brazo derecho con bolígrafo
                bone.rotation.z = 0.3;
              }
              if (bone.name === "LeftForeArm" || bone.name === "mixamorigLeftForeArm") {
                bone.rotation.x = -0.5; // Antebrazo sostiene tablet
              }
              if (bone.name === "RightForeArm" || bone.name === "mixamorigRightForeArm") {
                bone.rotation.x = -0.3; // Antebrazo con bolígrafo
              }
            }
          });
        }, 1000);

        // Blendshape para mandíbula
        const dict = meshRef.current?.morphTargetDictionary || {};
        if (dict["jawOpen"] !== undefined) {
          jawIndexRef.current = dict["jawOpen"];
        }

        // Animación idle simple
        if (gltf.animations?.length) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.loop = THREE.LoopRepeat;
          idle.setEffectiveWeight(0.5); // Animación más sutil
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
