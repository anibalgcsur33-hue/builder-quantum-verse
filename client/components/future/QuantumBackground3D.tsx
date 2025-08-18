import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, memo, useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * 3D Quantum Background with animated stars and shader nebula
 * Fallback version that works without external dependencies
 */
function QuantumMat() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const start = useMemo(() => performance.now(), []);
  useFrame(() => {
    if (mat.current)
      mat.current.uniforms.uTime.value = (performance.now() - start) / 1000;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#00e5ff") },
      uColorB: { value: new THREE.Color("#7c5cff") },
      uNoiseScale: { value: 1.5 },
    }),
    [],
  );

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={
          /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }`
        }
        fragmentShader={
          /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uNoiseScale;

          // simple hash noise
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float noise(in vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0,0.0));
            float c = hash(i + vec2(0.0,1.0));
            float d = hash(i + vec2(1.0,1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }

          void main(){
            vec2 uv = vUv;
            // radial depth
            float r = distance(uv, vec2(0.5));
            float vignette = smoothstep(0.9, 0.2, r);

            // flowing bands
            float q = noise(uv * 5.0 + uTime*0.1);
            float stripe = 0.5 + 0.5*sin( (uv.y*7.0 + q*1.5) - uTime*1.5 );

            // nebula
            float n = noise(uv*uNoiseScale + uTime*0.05);
            vec3 col = mix(uColorA, uColorB, stripe);
            col = mix(col, vec3(0.02,0.04,0.08), r*1.2);
            col += n*0.12;

            gl_FragColor = vec4(col * vignette, 1.0);
          }`
        }
        depthWrite={false}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Simple 3D stars fallback (without drei)
function SimpleStars() {
  const starsRef = useRef<THREE.Points>(null!);

  const { vertices, colors } = useMemo(() => {
    const vertices = [];
    const colors = [];
    const count = 1000;

    for (let i = 0; i < count; i++) {
      vertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
      );

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.3, 0.7, 0.5 + Math.random() * 0.5);
      colors.push(color.r, color.g, color.b);
    }

    return {
      vertices: new Float32Array(vertices),
      colors: new Float32Array(colors),
    };
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2} sizeAttenuation vertexColors />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <SimpleStars />
      <QuantumMat />
    </>
  );
}

function QuantumBackground3DInner() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 55 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Enhanced grain + bloom */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#00e5ff33,transparent_40%),radial-gradient(circle_at_80%_20%,#7c5cff33,transparent_45%)]" />
      </div>
    </div>
  );
}

export default memo(QuantumBackground3DInner);
