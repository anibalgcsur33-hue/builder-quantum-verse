import ARSmartButton from "./ARSmartButton";

export default function DemoBar() {
  return (
    <div className="mx-auto max-w-7xl px-6 mt-6 flex gap-3">
      <ARSmartButton />
      <a
        href="#vr"
        className="rounded-xl px-5 py-3 border border-white/15 hover:bg-white/10 transition"
      >
        Ver demo VR
      </a>
      <a
        href="#props"
        className="rounded-xl px-5 py-3 border border-white/15 hover:bg-white/10 transition"
      >
        Propiedades
      </a>
    </div>
  );
}
