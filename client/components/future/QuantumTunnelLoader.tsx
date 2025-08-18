import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function TunnelGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[2, 0.1, 10, 32, 1, true]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uColorStart: { value: new THREE.Color("#00e5ff") },
          uColorEnd: { value: new THREE.Color("#7c5cff") },
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float uTime;
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            vec3 pos = position;
            float wave = sin(pos.y * 2.0 + uTime * 3.0) * 0.1;
            pos.x += wave;
            pos.z += wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColorStart;
          uniform vec3 uColorEnd;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float gradient = vUv.y;
            vec3 color = mix(uColorStart, uColorEnd, gradient);
            
            // Tunnel rings
            float rings = sin(vPosition.y * 8.0 - uTime * 4.0) * 0.5 + 0.5;
            color = mix(color, vec3(1.0), rings * 0.3);
            
            // Glow effect
            float glow = 1.0 - abs(vUv.x - 0.5) * 2.0;
            glow = pow(glow, 2.0);
            
            // Energy flow
            float flow = sin(vUv.y * 10.0 - uTime * 6.0) * 0.5 + 0.5;
            color += flow * glow * 0.5;
            
            gl_FragColor = vec4(color, glow * 0.8);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function QuantumParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = Math.random() * 10 - 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    const color = new THREE.Color();
    color.setHSL(0.5 + Math.random() * 0.3, 0.8, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= 0.02;
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation vertexColors transparent />
    </points>
  );
}

function TunnelScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#00e5ff" />
      <pointLight position={[0, 0, -5]} intensity={1} color="#7c5cff" />
      <TunnelGeometry />
      <QuantumParticles />
    </>
  );
}

export default function QuantumTunnelLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-dark via-purple-900 to-black flex items-center justify-center">
      {/* 3D Tunnel */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <TunnelScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading UI */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="mb-8"
        >
          <div className="text-4xl lg:text-6xl font-bold text-gradient mb-4">
            BlueEye Homes
          </div>
          <div className="text-white/60 text-lg">
            Iniciando portal cuántico...
          </div>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full mx-auto max-w-xs mb-4"
        />

        {/* Quantum Effects */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-neon-teal"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-white/40 text-sm"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Sincronizando realidad aumentada...
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,231,231,0.1),transparent_70%)]" />
    </div>
  );
}
