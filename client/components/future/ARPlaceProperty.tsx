import { Canvas } from "@react-three/fiber";
import { XR, Controllers, useHitTest, useXR } from "@react-three/xr";
import { Html } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import ModelGLB from "./ModelGLB";

/** Retícula que sigue el plano detectado. */
function Reticle({ onPlace }: { onPlace: (pos: [number, number, number], rotY: number) => void }) {
  const ref = useRef<THREE.Group>(null!);
  const [visible, setVisible] = useState(false);

  useHitTest((hit) => {
    const pose = hit.getPose?.(XR.getReferenceSpace()!);
    if (!pose) return;
    const { position, rotation } = pose.transform;
    ref.current.position.set(position.x, position.y, position.z);
    // rotación Y aproximada
    const e = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
      rotation.x, rotation.y, rotation.z, rotation.w
    ));
    ref.current.rotation.set(0, e.y, 0);
    setVisible(true);
  });

  return (
    <group ref={ref} visible={visible} onClick={() => onPlace([ref.current.position.x, ref.current.position.y, ref.current.position.z], ref.current.rotation.y)}>
      <mesh rotation-x={-Math.PI/2}>
        <ringGeometry args={[0.18, 0.2, 32]} />
        <meshBasicMaterial color="#67e8f9" opacity={0.9} transparent />
      </mesh>
    </group>
  );
}

export default function ARPlaceProperty() {
  const [placed, setPlaced] = useState<{ pos: [number, number, number]; rotY: number } | null>(null);
  const modelURL = "/assets/models/villa.glb"; // <-- tu GLB

  return (
    <div className="fixed inset-0 z-40">
      <Canvas>
        <XR mode="immersive-ar" sessionInit={{ requiredFeatures: ["hit-test"], optionalFeatures: ["dom-overlay"], domOverlay: { root: document.body } }}>
          <ambientLight intensity={0.8} />
          <Controllers />
          
          <Suspense fallback={null}>
            {!placed ? (
              <>
                <Reticle onPlace={(pos, rotY) => setPlaced({ pos, rotY })} />
                <Html center style={{ color: "white", fontSize: 14 }}>
                  Toca la retícula para colocar
                </Html>
              </>
            ) : (
              <ModelGLB url={modelURL} position={placed.pos} rotation={[0, placed.rotY, 0]} scaleAll={0.6} />
            )}
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}
