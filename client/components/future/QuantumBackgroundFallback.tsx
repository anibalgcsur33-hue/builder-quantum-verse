export default function QuantumBackgroundFallback() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* CSS-based quantum background fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black">
        {/* Animated nebula layers */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "8s", animationDelay: "1s" }}
          />
        </div>

        {/* Flowing stripes */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent transform rotate-12 animate-pulse"
            style={{ animationDuration: "5s" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent transform -rotate-12 animate-pulse"
            style={{ animationDuration: "7s", animationDelay: "1s" }}
          />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#00e5ff22,transparent_40%),radial-gradient(circle_at_80%_20%,#7c5cff22,transparent_45%)]" />
        </div>
      </div>
    </div>
  );
}
