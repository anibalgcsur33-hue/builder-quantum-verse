// components/maps/CanaryMap3D.tsx
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Edges,
  Float,
  Environment,
} from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";

/** Paleta premium */
const COLORS = [
  "#7fd3ff", // agua highlight
  "#0b1220", // fondo
  "#1c2a3e", // mar
  "#89c2d9", // ribete
  "#b8e0f5", // label pill
];

type IslandDef = {
  name: string;
  /** Polígono 2D (en "unidades de maqueta"). Shape muy simplificado, bonito en low-poly */
  points: [number, number][];
  /** Altura de extrusión */
  h?: number;
  /** Color base */
  color?: string;
  /** Posición (x, y en el plano) */
  offset?: [number, number];
};

const ISLANDS: IslandDef[] = [
  // Nota: formas "poli-art" estilizadas (no geodesia real).
  // Orden aproximado de W→E para una composición agradable.
  {
    name: "La Palma",
    offset: [-8.2, 0.4],
    h: 0.32,
    color: "#8aa28f",
    points: [
      [-1.1, 0.8],
      [-1.6, 0.2],
      [-1.2, -0.7],
      [-0.4, -0.9],
      [0.6, -0.3],
      [0.9, 0.7],
      [0.2, 1.0],
    ],
  },
  {
    name: "El Hierro",
    offset: [-9.4, -1.2],
    h: 0.22,
    color: "#a5977c",
    points: [
      [-0.8, 0.4],
      [-1.0, -0.1],
      [-0.5, -0.6],
      [0.2, -0.5],
      [0.7, 0.0],
      [0.3, 0.5],
    ],
  },
  {
    name: "La Gomera",
    offset: [-6.1, -0.7],
    h: 0.24,
    color: "#a4b58f",
    points: [
      [-0.7, 0.6],
      [-1.0, 0.0],
      [-0.5, -0.7],
      [0.3, -0.6],
      [0.8, 0.0],
      [0.2, 0.7],
    ],
  },
  {
    name: "Tenerife",
    offset: [-3.8, -0.3],
    h: 0.38,
    color: "#b89b7a",
    points: [
      [-2.2, 0.4],
      [-1.0, -0.3],
      [0.6, -0.7],
      [1.8, -0.4],
      [2.2, 0.3],
      [1.2, 0.9],
      [-0.6, 1.0],
      [-1.8, 0.7],
    ],
  },
  {
    name: "Gran Canaria",
    offset: [-0.7, -0.1],
    h: 0.34,
    color: "#7f9f7a",
    points: [
      [-1.5, 0.8],
      [-2.0, -0.2],
      [-1.2, -1.0],
      [0.2, -1.0],
      [1.3, -0.2],
      [0.8, 0.9],
    ],
  },
  {
    name: "Fuerteventura",
    offset: [2.6, -0.2],
    h: 0.3,
    color: "#b5a07f",
    points: [
      [-2.0, 1.1],
      [-2.4, 0.3],
      [-1.6, -0.9],
      [-0.3, -1.4],
      [1.6, -0.7],
      [1.8, 0.4],
      [0.1, 1.3],
    ],
  },
  {
    name: "Lanzarote",
    offset: [5.4, 0.4],
    h: 0.26,
    color: "#8ea89f",
    points: [
      [-1.2, 0.9],
      [-1.5, 0.2],
      [-1.0, -0.7],
      [0.3, -0.9],
      [1.1, -0.3],
      [1.0, 0.6],
      [0.1, 1.0],
    ],
  },
  {
    name: "La Graciosa",
    offset: [6.3, 1.5],
    h: 0.18,
    color: "#a6c5d2",
    points: [
      [-0.7, 0.5],
      [-0.9, 0.1],
      [-0.4, -0.5],
      [0.3, -0.4],
      [0.6, 0.0],
      [0.2, 0.5],
    ],
  },
];

function WaterPlane() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const t = clock.getElapsedTime();
    // sutil shimmer
    mat.current.color.setHSL(210 / 360, 0.5, 0.16 + Math.sin(t * 0.35) * 0.01);
    mat.current.envMapIntensity = 0.15 + Math.sin(t * 0.5) * 0.05;
  });
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.02, 0]}>
      <planeGeometry args={[38, 18, 1, 1]} />
      <meshStandardMaterial
        ref={mat}
        color={COLORS[2]}
        metalness={0.2}
        roughness={0.9}
      />
    </mesh>
  );
}

function Island({ def }: { def: IslandDef }) {
  const [hover, setHover] = useState(false);
  const mesh = useRef<THREE.Mesh>(null!);

  const geom = useMemo(() => {
    const shape = new THREE.Shape();
    def.points.forEach(([x, y], i) => {
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    // extrusión sutil
    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: def.h ?? 0.28,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.06,
      bevelSize: 0.06,
    });
    extrude.rotateX(-Math.PI / 2);
    return extrude;
  }, [def]);

  // Latido leve al hacer hover
  useFrame(({ clock }) => {
    if (!hover) return;
    const t = clock.getElapsedTime();
    mesh.current.position.y = 0.05 + Math.sin(t * 4) * 0.015;
  });

  return (
    <group position={[def.offset?.[0] ?? 0, 0, def.offset?.[1] ?? 0]}>
      <mesh
        ref={mesh}
        geometry={geom}
        castShadow
        receiveShadow
        onPointerOver={() => setHover(true)}
        onPointerOut={() => {
          setHover(false);
          mesh.current.position.y = 0;
        }}
      >
        <meshStandardMaterial
          color={def.color ?? "#9bb3a1"}
          flatShading
          metalness={0.15}
          roughness={0.9}
          envMapIntensity={hover ? 0.35 : 0.2}
        />
        <Edges scale={1.001} threshold={15} color="#bfe9ff" />
      </mesh>

      {/* playa/puertos estilizados */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <shapeGeometry
          args={[
            (() => {
              const s = new THREE.Shape();
              s.moveTo(-0.9, 0);
              s.lineTo(0.9, 0);
              s.lineTo(0.7, -0.18);
              s.lineTo(-0.7, -0.18);
              s.closePath();
              return s;
            })(),
          ]}
        />
        <meshBasicMaterial color="#a9e7f7" opacity={0.6} transparent />
      </mesh>

      {/* etiqueta y pin */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <group position={[0, 0.55 + (def.h ?? 0.28), 0]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={COLORS[0]}
              emissive={COLORS[0]}
              emissiveIntensity={0.45}
            />
          </mesh>
          <Html
            className="pointer-events-none"
            center
            distanceFactor={12}
            style={{
              background:
                "linear-gradient(90deg,rgba(184,224,245,.8),rgba(137,194,217,.75))",
              color: "#0b1220",
              padding: "6px 10px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 12,
              boxShadow: "0 6px 24px rgba(137, 194, 217, .35)",
            }}
          >
            {def.name}
          </Html>
        </group>
      </Float>
    </group>
  );
}

function FitOnStart() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 8.5, 13.5);
    camera.lookAt(0, 0, 0);
    // @ts-ignore
    camera.updateProjectionMatrix?.();
  }, [camera]);
  return null;
}

export default function CanaryMap3D() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 rounded-3xl bg-[#0b1220] ring-1 ring-white/10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        España & Canarias — Mapa 3D Interactivo
      </h2>

      <div className="h-[520px] rounded-2xl overflow-hidden ring-1 ring-white/10">
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: [0, 9, 14], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={[COLORS[1]]} />
          <fog attach="fog" args={[COLORS[1], 18, 36]} />

          {/* Luces: key, fill y rim */}
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[8, 14, 6]}
            intensity={0.8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <hemisphereLight
            skyColor={"#a1c9ff"}
            groundColor={COLORS[1]}
            intensity={0.35}
          />

          {/* mar */}
          <WaterPlane />

          {/* grupo de islas */}
          <group position={[0, 0, 0]} scale={[1.8, 1.8, 1.8]}>
            {ISLANDS.map((def) => (
              <Island key={def.name} def={def} />
            ))}
          </group>

          {/* ambiente suave */}
          <Environment preset="city" resolution={64} />

          <FitOnStart />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI * 0.18}
            maxPolarAngle={Math.PI * 0.48}
            minDistance={9}
            maxDistance={24}
            zoomToCursor={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.6}
          />
        </Canvas>
      </div>
      <p className="mt-4 text-sm text-white/70">
        Vista estilizada low-poly con labels, pins y agua animada. Incluye{" "}
        <b>La Graciosa</b>.
      </p>
    </div>
  );
}
