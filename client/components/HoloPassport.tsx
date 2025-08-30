import React, { useMemo, useState } from "react";
import {
  TUNABLES,
  FALLBACK_AVATAR_SVG,
  hash,
  stringToHue,
  generateMRZ,
} from "../lib/immortal-utils";

// =========================================
// Holographic Passport (Immortality Edition)
// =========================================
export default function HoloPassport({
  title,
  subtitle,
  seed,
  photoUrl,
  variant,
}: {
  title: string;
  subtitle: string;
  seed: string;
  photoUrl?: string;
  variant: "REAL" | "META";
}) {
  const [adn, setAdn] = useState(seed);
  const hue = useMemo(() => stringToHue(adn), [adn]);
  const glow = useMemo(() => 0.35 + (hash(adn) % 50) / 100, [adn]);
  const ring = `conic-gradient(from 0deg, hsl(${hue},90%,70%), hsl(${(hue + 120) % 360},90%,70%), hsl(${(hue + 240) % 360},90%,70%), hsl(${hue},90%,70%))`;
  const grad = `linear-gradient(135deg, hsla(${(hue + 30) % 360},70%,45%,0.95), hsla(${(hue + 200) % 360},70%,30%,0.95))`;
  const chip = variant === "REAL" ? "Q-ID REAL" : "Q-ID META";
  const mrz = generateMRZ(variant, adn);

  // robust fallback for missing/invalid images
  const hasUrl = typeof photoUrl === "string" && photoUrl.trim().length > 0;
  const imgSrc = hasUrl ? photoUrl! : FALLBACK_AVATAR_SVG;

  return (
    <div
      className={`group relative isolate w-full ${TUNABLES.cardMaxW} select-none transform transition-transform duration-700 hover:scale-[1.03]`}
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-70 blur-lg transition-all duration-700 group-hover:opacity-100 animate-pulse"
        style={{
          background: ring,
          filter: `saturate(1.4) drop-shadow(0 0 45px hsla(${hue},100%,70%,${glow}))`,
        }}
        aria-hidden
      />
      <div className="relative rounded-2xl border border-white/20 bg-[#0b0f24]/70 p-4 shadow-[0_12px_40px_rgba(0,0,0,.55)] backdrop-blur-xl">
        <div
          className="rounded-xl p-4 border border-white/10 shadow-inner animate-[pulse_6s_infinite]"
          style={{ background: grad }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-center text-white/90">
              <div className="text-sm uppercase tracking-[0.2em] opacity-80">
                {subtitle}
              </div>
              <h3 className="text-lg font-bold leading-tight text-[#ffd369]">
                {title}
              </h3>
            </div>
            <div
              className="relative h-24 w-24 shrink-0 rounded-full border border-white/40 p-[2px] animate-[float_6s_ease-in-out_infinite]"
              style={{ background: ring }}
            >
              <div
                className="h-full w-full overflow-hidden rounded-full border border-white/30"
                style={{
                  filter: `hue-rotate(${hue}deg) saturate(1.4) contrast(1.2)`,
                }}
              >
                <img
                  src={imgSrc}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    if (
                      (e.currentTarget as HTMLImageElement).src !==
                      FALLBACK_AVATAR_SVG
                    ) {
                      (e.currentTarget as HTMLImageElement).src =
                        FALLBACK_AVATAR_SVG;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Immortality Statement */}
          <div className="mt-4 rounded-lg bg-black/30 p-3 text-center text-sm font-semibold text-[#78e1ff]">
            {variant === "REAL"
              ? "Tu legado en el mundo físico asegurado"
              : "Tu conciencia digital inmortal en el Metaverso"}
          </div>

          {/* MRZ */}
          <div className="mt-3 rounded-md bg-black/30 p-2 font-mono text-[11px] leading-[1.15] text-white/80 break-words">
            {mrz.line1}
            <br />
            {mrz.line2}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-[12px] text-white/80">
            <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[#ffd369]">
              {chip} ✦ IMMORTAL
            </div>
            <button
              className="rounded-md border border-white/20 bg-black/30 px-3 py-1 hover:bg-white/10"
              onClick={() =>
                setAdn(Math.random().toString(36).slice(2, 10).toUpperCase())
              }
              aria-label="Generar ADN aleatorio"
            >
              {"🎲 ADN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
