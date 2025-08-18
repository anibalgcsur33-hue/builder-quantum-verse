import { useEffect, useState } from "react";

export default function MotionSafe({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOk(!media.matches);
    const fn = () => setOk(!media.matches);
    media.addEventListener?.("change", fn);
    return () => media.removeEventListener?.("change", fn);
  }, []);

  return <>{ok ? children : null}</>;
}
