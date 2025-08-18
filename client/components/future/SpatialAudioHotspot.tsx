import { useEffect, useRef, useState } from "react";

/** Muestra un botón "Enable Audio". Al pasar el ratón por la zona,
 * hace cross-fade hacia un pad espacial suave (sin librerías).
 */
export default function SpatialAudioHotspot() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext>();
  const oscRef = useRef<OscillatorNode>();
  const gainRef = useRef<GainNode>();

  useEffect(() => () => ctxRef.current?.close(), []);

  const start = async () => {
    if (enabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";          // suave
    osc.frequency.value = 220;  // tono base
    gain.gain.value = 0.0;      // inicia muteado

    osc.connect(gain).connect(ctx.destination);
    osc.start();

    ctxRef.current = ctx; oscRef.current = osc; gainRef.current = gain;
    setEnabled(true);
  };

  const fadeTo = (v:number) => {
    if (!gainRef.current) return;
    const now = ctxRef.current!.currentTime;
    gainRef.current.gain.cancelScheduledValues(now);
    gainRef.current.gain.linearRampToValueAtTime(v, now + 0.25);
  };

  return (
    <div className="fixed left-4 bottom-4 z-40">
      {!enabled ? (
        <button onClick={start} className="px-4 py-2 rounded-lg border border-white/20 bg-black/40">
          Enable Audio
        </button>
      ) : (
        <div
          onMouseEnter={() => fadeTo(0.06)}
          onMouseLeave={() => fadeTo(0.0)}
          className="px-4 py-2 rounded-lg border border-cyan-300/30 bg-cyan-500/10 text-cyan-200"
        >
          Audio espacial activo (hover para oír)
        </div>
      )}
    </div>
  );
}
