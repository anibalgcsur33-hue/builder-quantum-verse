import { GlowPin, PremiumGlowPin } from "./GlowPin";

export function GlowPinDemo() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-dark via-blue-900 to-black rounded-2xl overflow-hidden">
      {/* Background grid for reference */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Demo title */}
      <div className="absolute top-4 left-4 text-white/80 text-sm font-medium">
        Premium Pins Demo
      </div>

      {/* Standard pins */}
      <GlowPin position={[20, 25]} label="Teal Pin" variant="teal" size="sm" />

      <GlowPin
        position={[40, 35]}
        label="Emerald Pin"
        variant="emerald"
        size="md"
      />

      <GlowPin position={[65, 25]} label="Blue Pin" variant="blue" size="lg" />

      {/* Premium pins */}
      <PremiumGlowPin position={[25, 60]} label="Premium Property" />

      <PremiumGlowPin position={[55, 70]} label="Luxury Villa" />

      <PremiumGlowPin position={[75, 55]} label="Exclusive Resort" />

      {/* Non-pulsing pins for comparison */}
      <GlowPin
        position={[85, 80]}
        label="Static Pin"
        variant="premium"
        isPulsing={false}
      />

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass rounded-lg p-3 text-xs text-white/70">
        <div className="mb-1 font-medium text-white/90">Pin Types:</div>
        <div>• Standard: Teal, Emerald, Blue</div>
        <div>• Premium: Gradient with heartbeat</div>
        <div>• Static: No animation</div>
      </div>
    </div>
  );
}
