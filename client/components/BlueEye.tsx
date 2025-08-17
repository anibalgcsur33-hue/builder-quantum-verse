import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
    camera.position.set(0, 1.55, 2.4);

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
    controls.target.set(0, 1.5, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;

    // Cargar avatar
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_URL,
      (gltf) => {
        const avatar = gltf.scene;
        avatar.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            if (o instanceof THREE.SkinnedMesh && !meshRef.current) {
              meshRef.current = o;
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
    utter.onstart = () => {
      speakingRef.current = true;
    };
    utter.onend = () => {
      speakingRef.current = false;
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Escuchar saludo automático desde el Hero
  useEffect(() => {
    const handleSaludo = (e: CustomEvent) => {
      const texto = e.detail;
      speak(texto);
    };
    window.addEventListener("blueeye-saludo", handleSaludo as EventListener);
    return () => window.removeEventListener("blueeye-saludo", handleSaludo as EventListener);
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
