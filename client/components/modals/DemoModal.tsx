import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/components/ui/Portal";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string; // o imagen demo
  imgUrl?: string;
};

export default function DemoModal({ open, onClose, title="Demo VR/AR", videoUrl, imgUrl }: Props) {
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-16 w-[min(92vw,980px)] rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button onClick={onClose} className="btn-crystal px-3 py-1">Cerrar</button>
              </div>

              <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-black/50">
                {videoUrl ? (
                  <video
                    src={videoUrl} className="h-full w-full object-cover"
                    autoPlay muted playsInline loop
                  />
                ) : imgUrl ? (
                  <img src={imgUrl} alt="demo" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-white/60">
                    Demo placeholder — inserta captura VR/AR aquí
                  </div>
                )}
              </div>

              <p className="mt-4 text-white/70 text-sm">
                Esta es una vista previa funcional. La experiencia completa VR/AR se abre en visor compatible.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
