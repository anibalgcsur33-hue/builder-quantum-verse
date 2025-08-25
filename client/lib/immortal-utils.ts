// =========================================
// 🔧 Tunables (sizes/spacing you may tweak live)
// =========================================
export const TUNABLES = {
  heroPadTop: "pt-4 md:pt-6 lg:pt-8", // aún más reducido para eliminar espacio vacío arriba
  heroPadBottom: "pb-16 md:pb-20 lg:pb-24",
  heroGap: "gap-10 lg:gap-12",
  logoMaxW: "max-w-[360px] md:max-w-[480px] lg:max-w-[560px]",
  logoDropShadow: "drop-shadow-[0_0_90px_rgba(120,225,255,0.9)]",
  cardMaxW: "max-w-[300px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px]",
  logoShift: "ml-[-60px] md:ml-[-80px] lg:ml-[-100px]", // mover logo a la izquierda
};

// =========================================
// Assets / Fallbacks
// =========================================
export const FALLBACK_AVATAR_SVG =
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'>\n` +
      `<defs><radialGradient id='g' cx='50%' cy='40%' r='60%'><stop offset='0%' stop-color='#9feaff'/><stop offset='100%' stop-color='#0b0f24'/></radialGradient></defs>` +
      `<rect width='100%' height='100%' fill='url(#g)'/>` +
      `<circle cx='48' cy='36' r='16' fill='rgba(255,255,255,0.8)'/>` +
      `<rect x='22' y='58' width='52' height='20' rx='10' fill='rgba(255,255,255,0.6)'/>` +
    `</svg>`
  );

// =========================================
// Utils
// =========================================
export function hash(str: string) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

export function stringToHue(s: string) {
  const r = hash(s) / 0xffffffff;
  return Math.floor(r * 360);
}

export function generateMRZ(variant: "REAL" | "META", adn: string) {
  const line1 = `IMMORTAL<ID<${variant}<<<<<<<<<<<<<<<<`;
  const line2 = `${adn.toUpperCase()}<FOREVER>∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞`;
  return { line1, line2 };
}
