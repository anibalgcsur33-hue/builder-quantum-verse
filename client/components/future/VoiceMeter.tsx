import { useEffect, useRef, useState } from "react";

export default function VoiceMeter() {
  const [on, setOn] = useState(false);
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt">(
    "prompt",
  );
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Check microphone permission on mount
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((result) => {
          setPermission(result.state);
          result.onchange = () => setPermission(result.state);
        });
    }
  }, []);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.3;
      src.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        if (!on) return;

        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length); // 0..1
        const level = Math.max(0.02, Math.min(1, rms * 8)); // amplify and clamp

        // Update each bar with different sensitivity
        barsRef.current.forEach((bar, i) => {
          if (bar) {
            const threshold = (i + 1) * 0.1; // each bar needs more volume
            const scale = Math.max(0.1, Math.min(1, (level - threshold) * 5));
            bar.style.transform = `scaleY(${scale})`;

            // Color based on intensity
            if (level > 0.7) {
              bar.style.background =
                "linear-gradient(to top, #ef4444, #f87171)"; // red
            } else if (level > 0.4) {
              bar.style.background =
                "linear-gradient(to top, #f59e0b, #fbbf24)"; // orange
            } else {
              bar.style.background =
                "linear-gradient(to top, #06b6d4, #67e8f9)"; // cyan
            }
          }
        });

        rafRef.current = requestAnimationFrame(loop);
      };
      loop();

      ctxRef.current = ctx;
      streamRef.current = stream;
      setOn(true);
      setPermission("granted");
    } catch (err) {
      console.error("Microphone access denied:", err);
      setPermission("denied");
    }
  }

  function stop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setOn(false);

    // Reset bars
    barsRef.current.forEach((bar) => {
      if (bar) {
        bar.style.transform = "scaleY(0.1)";
        bar.style.background =
          "linear-gradient(to top, #06b6d4/20, #67e8f9/70)";
      }
    });
  }

  useEffect(() => () => stop(), []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {!on ? (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={start}
            disabled={permission === "denied"}
            className={`rounded-xl px-6 py-3 border transition-all duration-300 ${
              permission === "denied"
                ? "border-red-400/30 bg-red-500/10 text-red-400 cursor-not-allowed"
                : "border-white/20 bg-white/10 hover:bg-white/20 hover:border-cyan-400/50 text-white"
            }`}
            title={
              permission === "denied"
                ? "Acceso al micrófono denegado"
                : "Activar visualizador de voz"
            }
          >
            <div className="flex items-center gap-2">
              <span>{permission === "denied" ? "🚫" : "🎙️"}</span>
              <span className="text-sm font-medium">
                {permission === "denied" ? "Sin micrófono" : "Activar VU"}
              </span>
            </div>
          </button>

          {permission === "prompt" && (
            <div className="text-xs text-white/50 text-center max-w-32">
              Se solicitará permiso de micrófono
            </div>
          )}
        </div>
      ) : (
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-end gap-1 h-20 mb-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (barsRef.current[i] = el)}
                className="w-3 rounded-sm transition-all duration-75"
                style={{
                  height: `${Math.max(20, (i + 1) * 7)}%`,
                  transformOrigin: "bottom",
                  transform: "scaleY(0.1)",
                  background: "linear-gradient(to top, #06b6d4/20, #67e8f9/70)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/70 font-medium">LIVE</span>
            </div>

            <button
              onClick={stop}
              className="text-xs text-white/60 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
              title="Desactivar visualizador"
            >
              🔴 Parar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
