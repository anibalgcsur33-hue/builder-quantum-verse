import { useEffect, useRef, useState } from "react";

/**
 * Advanced spatial audio with fallback for when Tone.js is not available
 * - Requires user gesture to start audio
 * - Spatial positioning based on cursor movement
 * - Soft volume to avoid annoyance
 */
export default function SpatialAudioAdvanced() {
  const [ready, setReady] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [panner, setPanner] = useState<PannerNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const lastTRef = useRef(0);

  async function startAudio() {
    try {
      // Try to use Tone.js if available, otherwise fallback to Web Audio API
      if (typeof window !== "undefined" && "AudioContext" in window) {
        const ctx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        // Create spatial audio setup
        const pannerNode = ctx.createPanner();
        pannerNode.panningModel = "HRTF";
        pannerNode.distanceModel = "inverse";
        pannerNode.refDistance = 1;
        pannerNode.maxDistance = 10000;
        pannerNode.rolloffFactor = 1;
        pannerNode.coneInnerAngle = 360;
        pannerNode.coneOuterAngle = 0;
        pannerNode.coneOuterGain = 0;
        pannerNode.setPosition(0, 0, -2);

        const gain = ctx.createGain();
        gain.gain.value = 0.1; // Very soft volume

        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 220;

        osc.connect(gain);
        gain.connect(pannerNode);
        pannerNode.connect(ctx.destination);

        osc.start();

        setAudioContext(ctx);
        setOscillator(osc);
        setPanner(pannerNode);
        setGainNode(gain);
        setReady(true);
      }
    } catch (error) {
      console.warn("Spatial audio not supported:", error);
    }
  }

  useEffect(() => {
    if (!ready || !panner || !gainNode) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      if (panner) {
        panner.setPosition(x * 2.0, y * 1.2, -2);
      }

      // Emit spatial notes occasionally (not every pixel)
      const now = performance.now();
      if (now - lastTRef.current > 300) {
        lastTRef.current = now;

        if (gainNode && audioContext) {
          // Create brief tone bursts
          const tempGain = audioContext.createGain();
          const tempOsc = audioContext.createOscillator();

          const frequencies = [261.63, 329.63, 392.0, 493.88, 587.33]; // C4, E4, G4, B4, D5
          const freq =
            frequencies[Math.floor(Math.random() * frequencies.length)];

          tempOsc.frequency.value = freq;
          tempOsc.type = "sine";
          tempGain.gain.value = 0.05;

          tempOsc.connect(tempGain);
          tempGain.connect(panner!);

          tempOsc.start();
          tempOsc.stop(audioContext.currentTime + 0.1);
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [ready, panner, gainNode, audioContext]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!ready ? (
        <button className="btn-crystal text-sm" onClick={startAudio}>
          🎧 Enable 3D Audio
        </button>
      ) : (
        <div className="text-xs text-white/70 px-3 py-2 rounded-lg bg-black/40 border border-cyan-300/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            3D Audio activo
          </div>
        </div>
      )}
    </div>
  );
}
