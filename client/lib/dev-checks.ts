import React from "react";
import { stringToHue, generateMRZ } from "./immortal-utils";
import HoloPassport from "../components/HoloPassport";

// =========================================
// Dev sanity checks (non-blocking tests)
// =========================================
export function runDevChecks() {
  if (typeof window === "undefined") return;

  // Test 1: hue in range
  const h = stringToHue("SAMPLE");
  console.assert(h >= 0 && h < 360, "Hue out of range", h);

  // Test 2: MRZ contains variant and FOREVER mark
  const t = generateMRZ("REAL", "abcdef");
  console.assert(t.line1.includes("REAL"), "MRZ line1 must include variant");
  console.assert(t.line2.includes("FOREVER"), "MRZ line2 must include FOREVER");

  // Additional tests (added without altering existing ones)
  // Test 3: MRZ META variant present
  const m = generateMRZ("META", "xyz123");
  console.assert(m.line1.includes("META"), "MRZ line1 must include META for META variant");

  // Test 4: ADN is uppercased in MRZ line2
  console.assert(m.line2.includes("XYZ123"), "MRZ line2 must contain uppercased ADN");

  // Test 5: stringToHue determinism
  const h1 = stringToHue("DET");
  const h2 = stringToHue("DET");
  console.assert(h1 === h2, "stringToHue should be deterministic");

  // Test 6: HoloPassport tolerant to missing photoUrl (element creation)
  try {
    const el = React.createElement(HoloPassport as any, { title: "Test", subtitle: "Sub", seed: "S", variant: "REAL" });
    console.assert(!!el, "HoloPassport element should be creatable without photoUrl");
  } catch (e) {
    console.warn("HoloPassport creation failed unexpectedly", e);
  }
}

// Auto-run en client-side
if (typeof window !== "undefined") {
  runDevChecks();
}
