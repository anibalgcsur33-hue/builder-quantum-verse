import { useState } from "react";
import { GlowPinDemo } from "../components/effects/GlowPinDemo";
import { MapPinCluster } from "../components/maps/MapPin";

const demoProperties = [
  {
    id: "1",
    lat: 28.1235,
    lng: -15.4362,
    label: "Luxury Villa",
    type: "premium" as const,
    price: "€2.5M"
  },
  {
    id: "2", 
    lat: 28.1180,
    lng: -15.4280,
    label: "Beachfront Resort",
    type: "exclusive" as const,
    price: "€8.9M"
  },
  {
    id: "3",
    lat: 28.1290,
    lng: -15.4410,
    label: "Modern Apartment",
    type: "property" as const,
    price: "€450K"
  },
  {
    id: "4",
    lat: 28.1150,
    lng: -15.4320,
    label: "Historic Landmark",
    type: "landmark" as const
  },
  {
    id: "5",
    lat: 28.1200,
    lng: -15.4380,
    label: "Penthouse Suite",
    type: "premium" as const,
    price: "€1.8M"
  }
];

export default function PinsDemo() {
  const [activePinId, setActivePinId] = useState<string>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-dark via-blue-900 to-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="heading-lg text-gradient mb-4">
            Premium Pin Collection
          </h1>
          <p className="text-white/70 text-lg">
            Interactive map pins with heartbeat animations and glow effects
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12">
          {/* Basic Pin Demo */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-neon-teal">
              Basic Pin Variations
            </h2>
            <GlowPinDemo />
          </section>

          {/* Map Integration Demo */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-neon-emerald">
              Map Integration Example
            </h2>
            <div className="relative h-96 bg-gradient-to-br from-blue-dark/50 to-blue-900/50 rounded-2xl overflow-hidden">
              {/* Mock map background */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />
                  
                  {/* Mock coastline */}
                  <path 
                    d="M50,200 Q100,180 150,190 T250,185 Q300,180 350,195" 
                    stroke="rgba(14,231,231,0.3)" 
                    strokeWidth="2" 
                    fill="none"
                  />
                </svg>
              </div>

              <MapPinCluster 
                pins={demoProperties}
                activePinId={activePinId}
                onPinClick={setActivePinId}
              />

              {/* Map legend */}
              <div className="absolute top-4 left-4 glass rounded-lg p-3 text-xs">
                <div className="font-semibold mb-2 text-white/90">Property Types</div>
                <div className="space-y-1 text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-teal"></div>
                    Standard Property
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald"></div>
                    Premium Property
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald"></div>
                    Exclusive Property
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    Landmark
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-4">
              Click on any pin to see detailed information. Premium pins have heartbeat animations.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Pin Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-neon-teal font-semibold mb-3">Heartbeat Animation</h3>
                <p className="text-white/70 text-sm">
                  Premium pins pulse with a realistic heartbeat pattern to draw attention
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-neon-emerald font-semibold mb-3">Glow Effects</h3>
                <p className="text-white/70 text-sm">
                  Dynamic glow shadows that match the pin color and animate with the pulse
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-blue-400 font-semibold mb-3">Multiple Variants</h3>
                <p className="text-white/70 text-sm">
                  Teal, emerald, blue, and premium gradient variants for different property types
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-neon-teal font-semibold mb-3">Responsive Labels</h3>
                <p className="text-white/70 text-sm">
                  Glass-morphism labels that adapt to content and display price information
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-neon-emerald font-semibold mb-3">Interactive States</h3>
                <p className="text-white/70 text-sm">
                  Active state management with detailed property information on click
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-blue-400 font-semibold mb-3">Performance Optimized</h3>
                <p className="text-white/70 text-sm">
                  Efficient CSS animations with minimal impact on performance
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
