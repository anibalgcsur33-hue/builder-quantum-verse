import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const AVATAR_URL = "https://models.readyplayer.me/68a130cc6db44d17d10d931b.glb";

interface BlueEyeFixedProps {
  height?: number;
  autoRotate?: boolean;
}

export default function BlueEyeFixed({ height = 520, autoRotate = true }: BlueEyeFixedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clock = useRef(new THREE.Clock());
  const state = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    controls: null as OrbitControls | null,
    avatar: null as THREE.Group | null,
    head: null as THREE.Object3D | null,
    spine: null as THREE.Object3D | null,
    leftShoulder: null as THREE.Object3D | null,
    rightShoulder: null as THREE.Object3D | null,
    leftElbow: null as THREE.Object3D | null,
    rightElbow: null as THREE.Object3D | null,
    rightHand: null as THREE.Object3D | null,
    skinned: null as THREE.SkinnedMesh | null,
    propAttached: false
  });

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

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, root.clientWidth / height, 0.1, 100);
    camera.position.set(0, 1.55, 2.6);

    // Env light
    const hemi = new THREE.HemisphereLight(0xffffff, 0x2a2a40, 0.8);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(2.2, 3.2, 1.6);
    key.castShadow = true;
    scene.add(key);

    // Ground (shadow catcher)
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

    state.current.scene = scene;
    state.current.camera = camera;
    state.current.renderer = renderer;
    state.current.controls = controls;

    // Helpers
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

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_URL,
      (gltf) => {
        const avatar = gltf.scene;
        avatar.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = false;
            // materiales más vivos
            if (o.material) {
              (o.material as any).envMapIntensity = 0.7;
              o.material.needsUpdate = true;
            }
            if (o.isSkinnedMesh && !state.current.skinned) {
              state.current.skinned = o as THREE.SkinnedMesh;
            }
          }
        });

        // Centrar en el suelo
        const box = new THREE.Box3().setFromObject(avatar);
        const size = new THREE.Vector3(); 
        box.getSize(size);
        const center = new THREE.Vector3(); 
        box.getCenter(center);
        avatar.position.y += (avatar.position.y - box.min.y); // sube hasta tocar suelo
        avatar.position.y -= 0.01; // micro ajuste
        avatar.position.x -= center.x;
        avatar.position.z -= center.z;
        scene.add(avatar);

        // Bones comunes (Ready Player Me / Mixamo)
        const head = byNameLike(avatar, "head");
        const spine = byNameLike(avatar, "spine2") || byNameLike(avatar, "spine");
        const lSh = byNameLike(avatar, "left", "shoulder") || byNameLike(avatar, "left", "arm");
        const rSh = byNameLike(avatar, "right", "shoulder") || byNameLike(avatar, "right", "arm");
        const lEl = byNameLike(avatar, "left", "forearm") || byNameLike(avatar, "left", "elbow");
        const rEl = byNameLike(avatar, "right", "forearm") || byNameLike(avatar, "right", "elbow");
        const rHand = byNameLike(avatar, "right", "hand");

        // Pose natural (bajar brazos desde T)
        if (lSh) lSh.rotation.z -= 0.9;   // baja ~50°
        if (rSh) rSh.rotation.z += 0.9;
        if (lEl) lEl.rotation.z += 0.25;  // flexión ligera
        if (rEl) rEl.rotation.z -= 0.25;

        // Detectar "tablet/phone" suelto y anclarlo a la mano derecha
        let tablet: THREE.Object3D | null = null;
        let minArea = Infinity;
        avatar.traverse(o => {
          if (o.isMesh && !o.isSkinnedMesh) {
            const bb = new THREE.Box3().setFromObject(o);
            const s = new THREE.Vector3(); 
            bb.getSize(s);
            const area = s.x * s.y; // "rectangularidad" simple
            const likely = /tablet|phone|pad|prop/i.test(o.name) || (s.z < 0.06 && (s.x > 0.06 || s.y > 0.06));
            if (likely && area < minArea) { 
              minArea = area; 
              tablet = o; 
            }
          }
        });

        // Si no encuentra tablet existente, crear una nueva
        if (!tablet && rHand) {
          // Crear tablet profesional
          const tabletGeometry = new THREE.BoxGeometry(0.12, 0.015, 0.18);
          const tabletMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
          tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);

          // Pantalla de tablet
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
        }

        if (tablet && rHand && !state.current.propAttached) {
          // Mover el prop bajo la mano con un offset razonable
          const prop = tablet;
          
          // Limpiar cualquier parent anterior
          if (prop.parent) {
            prop.parent.remove(prop);
          }
          
          // Posicionar tablet en mano derecha de forma natural
          prop.position.set(0.02, 0.05, 0.08);
          prop.rotation.set(-Math.PI / 6, 0, Math.PI / 12); // Ligera inclinación natural
          rHand.add(prop);

          // Crear bolígrafo en la otra mano
          const lHand = byNameLike(avatar, "left", "hand");
          if (lHand) {
            const penGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.14);
            const penMaterial = new THREE.MeshLambertMaterial({ color: 0x2563eb });
            const pen = new THREE.Mesh(penGeometry, penMaterial);
            
            pen.position.set(0, 0.06, 0.02);
            pen.rotation.set(0, 0, Math.PI / 6);
            lHand.add(pen);
          }

          // Ajustar pose de brazos para sostener objetos de forma natural
          if (rSh) {
            rSh.rotation.x = 0.1; // Brazo derecho ligeramente adelante
            rSh.rotation.z = 0.6; // Bajar brazo de T-pose
          }
          if (lSh) {
            lSh.rotation.x = 0.15; // Brazo izquierdo ligeramente más adelante
            lSh.rotation.z = -0.7; // Bajar brazo de T-pose
          }
          if (rEl) {
            rEl.rotation.x = -0.4; // Flexionar antebrazo para sostener tablet
          }
          if (lEl) {
            lEl.rotation.x = -0.3; // Flexionar antebrazo para sostener bolígrafo
          }

          state.current.propAttached = true;
        }

        state.current.avatar = avatar;
        state.current.head = head;
        state.current.spine = spine;
        state.current.leftShoulder = lSh;
        state.current.rightShoulder = rSh;
        state.current.leftElbow = lEl;
        state.current.rightElbow = rEl;
        state.current.rightHand = rHand;
      },
      undefined,
      (err) => console.error("Error cargando GLB:", err)
    );

    // Render loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = clock.current.getDelta();

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

  // Escuchar saludo automático desde el Hero
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
