import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

type Pin = { name: string; pos: [number, number, number]; color?: string };

const PINS: Pin[] = [
  { name: "Tenerife", pos: [-0.9, -0.3, 0.05], color: "#00e5ff" },
  { name: "Gran Canaria", pos: [-0.7, -0.28, 0.05], color: "#7c5cff" },
  { name: "La Palma", pos: [-1.05, -0.25, 0.05] },
  { name: "La Gomera", pos: [-0.98, -0.28, 0.05] },
  { name: "El Hierro", pos: [-1.1, -0.35, 0.05] },
  { name: "Lanzarote", pos: [-0.55, -0.22, 0.05] },
  { name: "Fuerteventura", pos: [-0.62, -0.27, 0.05] },
  { name: "La Graciosa", pos: [-0.53, -0.19, 0.05], color: "#46ffd1" },
];

function Island({ points, color="#1b2a41" }:{points:[number,number][]; color?:string}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    points.forEach(([x,y],i)=> i===0 ? s.moveTo(x,y) : s.lineTo(x,y));
    return s;
  },[points]);

  return (
    <mesh>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} emissive={"#0a1222"} emissiveIntensity={0.25}/>
    </mesh>
  );
}

function PinMesh({ pos, color="#00e5ff" }:{pos:[number,number,number]; color?:string}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = pos[1] + Math.sin(t*2)*0.01;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6+Math.sin(t*3)*0.4;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.015, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} roughness={0.2} metalness={0.8}/>
    </mesh>
  );
}

function RoundedPlaneGeometry({args:[w,h,r,seg]}:{args:[number,number,number,number]}) {
  const shape = useMemo(()=>{
    const s = new THREE.Shape();
    const hw = w/2, hh = h/2;
    const rr = Math.min(r, hw, hh);
    s.moveTo(-hw+rr,-hh);
    s.lineTo(hw-rr,-hh);
    s.quadraticCurveTo(hw,-hh,hw,-hh+rr);
    s.lineTo(hw,hh-rr);
    s.quadraticCurveTo(hw,hh,hw-rr,hh);
    s.lineTo(-hw+rr,hh);
    s.quadraticCurveTo(-hw,hh,-hw,hh-rr);
    s.lineTo(-hw,-hh+rr);
    s.quadraticCurveTo(-hw,-hh,-hw+rr,-hh);
    return s;
  },[w,h,r]);
  return <shapeGeometry args={[shape, seg ?? 8]} />;
}

function Scene() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.z += delta * 0.02;
  });

  // Polígonos simplificados (escala escena -1..1)
  const canarias: [number, number][][] = [
    [[-1.08,-0.22],[-1.0,-0.2],[-0.96,-0.26],[-1.02,-0.3],[-1.08,-0.22]], // La Palma (aprox)
    [[-0.97,-0.28],[-0.92,-0.26],[-0.94,-0.32],[-0.99,-0.34],[-0.97,-0.28]], // La Gomera
    [[-1.15,-0.33],[-1.07,-0.33],[-1.09,-0.38],[-1.17,-0.4],[-1.15,-0.33]], // El Hierro
    [[-0.88,-0.26],[-0.82,-0.24],[-0.8,-0.3],[-0.86,-0.32],[-0.88,-0.26]],   // Tenerife
    [[-0.73,-0.25],[-0.67,-0.25],[-0.68,-0.31],[-0.75,-0.31],[-0.73,-0.25]], // Gran Canaria
    [[-0.64,-0.25],[-0.56,-0.26],[-0.57,-0.33],[-0.65,-0.32],[-0.64,-0.25]], // Fuerteventura
    [[-0.57,-0.2],[-0.52,-0.2],[-0.53,-0.24],[-0.58,-0.24],[-0.57,-0.2]]     // Lanzarote
  ];

  return (
    <group ref={group}>
      {/* "placa" del mapa */}
      <mesh position={[0,0,-0.02]}>
        <RoundedPlaneGeometry args={[2.4, 1.4, 0.05, 12]} />
        <meshStandardMaterial color="#0b1220" metalness={0.6} roughness={0.4} />
      </mesh>

      {canarias.map((poly,i)=>(
        <Island key={i} points={poly} color="#142134" />
      ))}

      {PINS.map(p => <PinMesh key={p.name} pos={p.pos} color={p.color}/> )}
    </group>
  );
}

export default function CanaryMap3D() {
  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-black/30">
      <Canvas camera={{ position:[0,0,2.8], fov:50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2,2,3]} intensity={1.2}/>
        <Scene />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
      <div className="absolute left-4 top-4 text-white/70 text-sm">España & Canarias — demo 3D</div>
    </div>
  );
}
