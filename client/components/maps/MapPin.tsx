import { GlowPin, PremiumGlowPin } from "../effects/GlowPin";
import { cn } from "@/lib/utils";

interface MapPinProps {
  lat: number;
  lng: number;
  label: string;
  type?: "property" | "landmark" | "premium" | "exclusive";
  price?: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function MapPin({
  lat,
  lng,
  label,
  type = "property",
  price,
  onClick,
  isActive = false,
  className,
}: MapPinProps) {
  // Convert lat/lng to percentage positions (simplified for demo)
  const position: [number, number] = [
    ((lng + 180) / 360) * 100,
    ((90 - lat) / 180) * 100,
  ];

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getVariant = () => {
    switch (type) {
      case "premium":
      case "exclusive":
        return "premium";
      case "landmark":
        return "blue";
      default:
        return "teal";
    }
  };

  const getSize = () => {
    switch (type) {
      case "exclusive":
        return "lg" as const;
      case "premium":
        return "md" as const;
      default:
        return "sm" as const;
    }
  };

  const displayLabel = price ? `${label} - ${price}` : label;

  if (type === "premium" || type === "exclusive") {
    return (
      <div
        className={cn("cursor-pointer", isActive && "z-30", className)}
        onClick={handleClick}
      >
        <PremiumGlowPin
          position={position}
          label={displayLabel}
          isPulsing={!isActive} // Stop pulsing when active
        />
        {isActive && (
          <div
            className="absolute pointer-events-none z-40"
            style={{ left: `${position[0]}%`, top: `${position[1]}%` }}
          >
            <div className="absolute -translate-x-1/2 translate-y-8 glass rounded-lg p-3 min-w-48 text-sm text-white/90">
              <div className="font-semibold mb-1">{label}</div>
              {price && (
                <div className="text-neon-emerald font-bold">{price}</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("cursor-pointer", isActive && "z-30", className)}
      onClick={handleClick}
    >
      <GlowPin
        position={position}
        label={displayLabel}
        variant={getVariant()}
        size={getSize()}
        isPulsing={!isActive}
      />
      {isActive && (
        <div
          className="absolute pointer-events-none z-40"
          style={{ left: `${position[0]}%`, top: `${position[1]}%` }}
        >
          <div className="absolute -translate-x-1/2 translate-y-8 glass rounded-lg p-3 min-w-48 text-sm text-white/90">
            <div className="font-semibold mb-1">{label}</div>
            {price && <div className="text-neon-teal font-bold">{price}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

interface MapPinClusterProps {
  pins: Array<{
    id: string;
    lat: number;
    lng: number;
    label: string;
    type?: MapPinProps["type"];
    price?: string;
  }>;
  activePinId?: string;
  onPinClick?: (id: string) => void;
  className?: string;
}

export function MapPinCluster({
  pins,
  activePinId,
  onPinClick,
  className,
}: MapPinClusterProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {pins.map((pin) => (
        <MapPin
          key={pin.id}
          lat={pin.lat}
          lng={pin.lng}
          label={pin.label}
          type={pin.type}
          price={pin.price}
          isActive={activePinId === pin.id}
          onClick={() => onPinClick?.(pin.id)}
        />
      ))}
    </div>
  );
}
