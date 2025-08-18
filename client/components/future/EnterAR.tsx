import { useState, useEffect } from "react";
import ARPlaceProperty from "./ARPlaceProperty";

function isARSupported() {
  // @ts-ignore
  return !!(navigator.xr && navigator.xr.isSessionSupported);
}

export default function EnterAR() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    // @ts-ignore
    if (navigator.xr && navigator.xr.isSessionSupported) {
      // @ts-ignore
      navigator.xr.isSessionSupported("immersive-ar").then((ok: boolean) => {
        if (mounted) setSupported(ok);
      });
    } else {
      setSupported(false);
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (supported === null) return null;

  return (
    <>
      {supported ? (
        <button className="btn-crystal" onClick={() => setOpen(true)}>
          Entrar en AR
        </button>
      ) : (
        <a className="btn-ghost" href="/metaverse">
          Abrir VR/3D
        </a>
      )}
      {open && <ARPlaceProperty />}
    </>
  );
}
