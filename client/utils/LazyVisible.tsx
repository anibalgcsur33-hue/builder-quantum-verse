import { useEffect, useRef, useState } from "react";

export default function LazyVisible({
  children,
  rootMargin = "200px",
  once = true,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          if (once) io.disconnect();
        } else if (!once) setShow(false);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return <div ref={ref}>{show ? children : null}</div>;
}
