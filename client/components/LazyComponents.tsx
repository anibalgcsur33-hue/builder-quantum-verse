import { lazy, Suspense } from "react";
import LazyVisible from "@/utils/LazyVisible";
import MotionSafe from "@/utils/MotionSafe";

// Lazy load heavy components
const SpainMapTeaser = lazy(() => import("@/components/sections/SpainMapTeaser"));
const VRPortalTeaser = lazy(() => import("@/components/sections/VRPortalTeaser"));
const HolographicConcierge = lazy(() => import("@/components/sections/HolographicConcierge"));
const NeuralShowcase = lazy(() => import("@/components/sections/NeuralShowcase"));

// Loading fallback component
const LazyFallback = () => (
  <div className="flex items-center justify-center py-16">
    <div className="glass rounded-xl p-6 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-white/20 rounded w-32 mx-auto"></div>
        <div className="h-2 bg-white/10 rounded w-24 mx-auto"></div>
      </div>
    </div>
  </div>
);

// Performance optimized sections
export const LazySpainMap = () => (
  <LazyVisible>
    <Suspense fallback={<LazyFallback />}>
      <MotionSafe>
        <SpainMapTeaser />
      </MotionSafe>
    </Suspense>
  </LazyVisible>
);

export const LazyVRPortal = () => (
  <LazyVisible>
    <Suspense fallback={<LazyFallback />}>
      <MotionSafe>
        <VRPortalTeaser />
      </MotionSafe>
    </Suspense>
  </LazyVisible>
);

export const LazyHoloConcierge = () => (
  <LazyVisible>
    <Suspense fallback={<LazyFallback />}>
      <MotionSafe>
        <HolographicConcierge />
      </MotionSafe>
    </Suspense>
  </LazyVisible>
);

export const LazyNeuralShowcase = () => (
  <LazyVisible>
    <Suspense fallback={<LazyFallback />}>
      <MotionSafe>
        <NeuralShowcase />
      </MotionSafe>
    </Suspense>
  </LazyVisible>
);
