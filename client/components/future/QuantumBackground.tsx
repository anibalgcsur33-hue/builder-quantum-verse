import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function QuantumMat() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const start = useMemo(() => performance.now(), []);
  useFrame(() => {
    if (mat.current) mat.current.uniforms.uTime.value = (performance.now() - start) / 1000;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#00e5ff") },
      uColorB: { value: new THREE.Color("#7c5cff") },
      uNoiseScale: { value: 1.5 },
    }),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={/* glsl */`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }`}
        fragmentShader={/* glsl */`
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
          }`}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function QuantumBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas orthographic camera={{ position:[0,0,1], zoom:1 }}>
        <QuantumMat />
      </Canvas>
      {/* sutil grain + bloom fake */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#00e5ff22,transparent_40%),radial-gradient(circle_at_80%_20%,#7c5cff22,transparent_45%)]" />
      </div>
    </div>
  );
}
