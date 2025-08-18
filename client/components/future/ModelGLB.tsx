import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

/** Carga un GLB ligero (50k-150k tris). */
export default function ModelGLB(props: GroupProps & { url: string; scaleAll?: number }) {
  const { scene } = useGLTF(props.url);
  return <primitive object={scene} scale={props.scaleAll ?? 0.5} {...props} />;
}

// Preload opcional:
// useGLTF.preload("/assets/models/villa.glb");
