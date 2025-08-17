import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// URL del avatar local - cambiar cuando tengas el archivo
const AVATAR_URL = "/assets/blueeye.glb";

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
  const avatarRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const root = containerRef.current;
    const scene = new THREE.Scene();

    // Camera optimizada para avatar femenino
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

    // Iluminación profesional
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(3, 4, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 10;
    scene.add(directionalLight);

    // Luz de relleno
    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
    fillLight.position.set(-2, 2, -2);
    scene.add(fillLight);

    // Suelo con sombras
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.25 })
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
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2;

    // Helper para buscar bones por nombre
    const findBoneByName = (object: THREE.Object3D, ...names: string[]) => {
      let foundBone: THREE.Object3D | null = null;
      object.traverse((child) => {
        if (child.isBone || child.type === 'Bone') {
          const boneName = child.name.toLowerCase();
          for (const name of names) {
            if (boneName.includes(name.toLowerCase()) && !foundBone) {
              foundBone = child;
              break;
            }
          }
        }
      });
      return foundBone;
    };

    // Cargar avatar
    const loader = new GLTFLoader();
    console.log("🔄 Cargando avatar desde:", AVATAR_URL);
    
    loader.load(
      AVATAR_URL,
      (gltf) => {
        console.log("✅ Avatar cargado exitosamente");
        
        const avatar = gltf.scene;
        avatarRef.current = avatar;

        // Configurar materiales y sombras
        avatar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Mejorar materiales
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat: any) => {
                  mat.envMapIntensity = 0.5;
                  mat.needsUpdate = true;
                });
              } else {
                (child.material as any).envMapIntensity = 0.5;
                child.material.needsUpdate = true;
              }
            }

            // Detectar mesh principal para blendshapes
            if (child.isSkinnedMesh && !meshRef.current) {
              meshRef.current = child as THREE.SkinnedMesh;
              
              // Buscar blendshape para mandíbula
              const morphTargets = child.morphTargetDictionary;
              if (morphTargets) {
                // Posibles nombres para apertura de boca
                const jawNames = ['jawOpen', 'jaw_open', 'mouth_open', 'A', 'aa'];
                for (const name of jawNames) {
                  if (morphTargets[name] !== undefined) {
                    jawIndexRef.current = morphTargets[name];
                    console.log(`📢 Blendshape encontrado: ${name} (index: ${jawIndexRef.current})`);
                    break;
                  }
                }
              }
            }
          }
        });

        // Centrar y posicionar avatar
        const box = new THREE.Box3().setFromObject(avatar);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Posicionar en el suelo
        avatar.position.y = -box.min.y;
        avatar.position.x = -center.x;
        avatar.position.z = -center.z;

        // Escala si es necesario
        const maxSize = Math.max(size.x, size.y, size.z);
        if (maxSize > 3) {
          const scale = 2.5 / maxSize;
          avatar.scale.setScalar(scale);
        }

        scene.add(avatar);

        // Configurar animaciones
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;

          // Buscar animación idle
          let idleAnimation = gltf.animations.find((anim: THREE.AnimationClip) => 
            anim.name.toLowerCase().includes('idle')
          ) || gltf.animations[0];

          const action = mixer.clipAction(idleAnimation);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.setEffectiveWeight(0.7);
          action.play();

          console.log(`🎭 Animación iniciada: ${idleAnimation.name}`);
        }

        // Buscar y anclar props si existen
        setTimeout(() => {
          const rightHand = findBoneByName(avatar, 'righthand', 'hand_r', 'mixamorig:righthand');
          
          if (rightHand) {
            // Buscar objetos que podrían ser props (tablet, phone, etc.)
            const props: THREE.Object3D[] = [];
            avatar.traverse((child) => {
              if (child.isMesh && !child.isSkinnedMesh) {
                const name = child.name.toLowerCase();
                if (name.includes('tablet') || name.includes('phone') || name.includes('prop')) {
                  props.push(child);
                }
              }
            });

            // Anclar el primer prop encontrado
            if (props.length > 0) {
              const prop = props[0];
              
              // Remover de su parent actual
              if (prop.parent) {
                prop.parent.remove(prop);
              }
              
              // Añadir a la mano con posición relativa
              prop.position.set(0, 0.05, 0.08);
              prop.rotation.set(-Math.PI / 6, 0, Math.PI / 12);
              rightHand.add(prop);
              
              console.log(`📱 Prop anclado a mano derecha: ${prop.name}`);
            }
          }
        }, 1000);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`📥 Progreso de carga: ${percent.toFixed(1)}%`);
      },
      (error) => {
        console.error("❌ Error cargando avatar:", error);
        console.log("💡 Verifica que el archivo blueeye.glb existe en /public/assets/");
        console.log("💡 Asegúrate de que el modelo tiene rig humanoide y escala correcta");
      }
    );

    // Loop de renderizado
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      
      // Actualizar animaciones
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Simular movimiento de boca al hablar
      if (
        speakingRef.current &&
        meshRef.current?.morphTargetInfluences &&
        jawIndexRef.current >= 0
      ) {
        const intensity = (Math.sin(performance.now() * 0.03) * 0.5 + 0.5) * 0.7;
        meshRef.current.morphTargetInfluences[jawIndexRef.current] = intensity;
      } else if (
        meshRef.current?.morphTargetInfluences &&
        jawIndexRef.current >= 0
      ) {
        // Cerrar boca cuando no habla
        meshRef.current.morphTargetInfluences[jawIndexRef.current] = 0;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
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
        speak("¡Hola! Soy Blu-ai, tu nueva asesora virtual inmobiliaria profesional.");
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
