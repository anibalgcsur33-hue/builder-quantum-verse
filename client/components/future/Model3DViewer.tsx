interface Model3DViewerProps {
  sketchfabId: string;
  title: string;
  fallbackImage?: string;
  className?: string;
}

export default function Model3DViewer({
  sketchfabId,
  title,
  fallbackImage,
  className = "",
}: Model3DViewerProps) {
  return (
    <div
      className={`relative w-full h-72 rounded-xl overflow-hidden bg-black/20 ${className}`}
    >
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={`https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0`}
        className="w-full h-full"
        loading="lazy"
      />

      {/* Overlay with holographic effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* hologram lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_96%,#00ffff22_100%)] bg-[length:100%_4px] mix-blend-screen" />
        {/* sheen effect */}
        <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_30%_10%,#00e5ff22,transparent_30%,#7c5cff22_60%,transparent_75%)] animate-[spin_8s_linear_infinite] opacity-20" />
      </div>

      {/* Loading fallback */}
      {fallbackImage && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <img
            src={fallbackImage}
            alt={title}
            className="w-full h-full object-cover opacity-50"
            style={{ display: "none" }}
            onError={(e) => {
              e.currentTarget.style.display = "block";
            }}
          />
        </div>
      )}
    </div>
  );
}
