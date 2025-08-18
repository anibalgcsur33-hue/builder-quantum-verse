export default function CanaryMap3DFallback() {
  const pins = [
    { name: "Tenerife", x: 15, y: 60, color: "#00e5ff" },
    { name: "Gran Canaria", x: 35, y: 58, color: "#7c5cff" },
    { name: "La Palma", x: 8, y: 55, color: "#00e5ff" },
    { name: "La Gomera", x: 12, y: 58, color: "#00e5ff" },
    { name: "El Hierro", x: 5, y: 65, color: "#00e5ff" },
    { name: "Lanzarote", x: 55, y: 52, color: "#00e5ff" },
    { name: "Fuerteventura", x: 48, y: 57, color: "#00e5ff" },
    { name: "La Graciosa", x: 57, y: 49, color: "#46ffd1" },
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-black/30">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-blue-900/30">
        {/* SVG Map */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background plate */}
          <rect
            x="10"
            y="40"
            width="80"
            height="40"
            rx="4"
            fill="#0b1220"
            stroke="#1b2a41"
            strokeWidth="0.5"
            opacity="0.8"
          />

          {/* Simplified island shapes */}
          <ellipse cx="15" cy="60" rx="3" ry="2" fill="#142134" />
          <ellipse cx="35" cy="58" rx="4" ry="3" fill="#142134" />
          <ellipse cx="8" cy="55" rx="2" ry="3" fill="#142134" />
          <ellipse cx="12" cy="58" rx="1.5" ry="2" fill="#142134" />
          <ellipse cx="5" cy="65" rx="1" ry="1.5" fill="#142134" />
          <ellipse cx="55" cy="52" rx="3" ry="2" fill="#142134" />
          <ellipse cx="48" cy="57" rx="4" ry="2.5" fill="#142134" />
          <ellipse cx="57" cy="49" rx="1" ry="1" fill="#142134" />
        </svg>

        {/* Animated pins */}
        {pins.map((pin, i) => (
          <div
            key={pin.name}
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              backgroundColor: pin.color,
              boxShadow: `0 0 10px ${pin.color}`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "2s",
            }}
          />
        ))}

        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      </div>

      <div className="absolute left-4 top-4 text-white/70 text-sm">
        España & Canarias — demo 3D
      </div>
    </div>
  );
}
