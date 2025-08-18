import { cn } from "@/lib/utils";

interface GlowPinProps {
  position: [number, number];
  label: string;
  variant?: "teal" | "emerald" | "blue" | "premium";
  size?: "sm" | "md" | "lg";
  className?: string;
  isPulsing?: boolean;
}

export function GlowPin({ 
  position, 
  label, 
  variant = "premium",
  size = "md",
  className,
  isPulsing = true
}: GlowPinProps) {
  const [x, y] = position;
  
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  };

  const glowClasses = {
    teal: "bg-neon-teal shadow-[0_0_24px_6px_rgba(14,231,231,0.6)]",
    emerald: "bg-neon-emerald shadow-[0_0_24px_6px_rgba(0,231,167,0.6)]", 
    blue: "bg-blue-400 shadow-[0_0_24px_6px_rgba(59,130,246,0.6)]",
    premium: "bg-gradient-to-r from-neon-teal to-neon-emerald shadow-[0_0_32px_8px_rgba(14,231,231,0.4)]"
  };

  const pulseClasses = {
    teal: "shadow-[0_0_40px_12px_rgba(14,231,231,0.8)]",
    emerald: "shadow-[0_0_40px_12px_rgba(0,231,167,0.8)]",
    blue: "shadow-[0_0_40px_12px_rgba(59,130,246,0.8)]", 
    premium: "shadow-[0_0_48px_16px_rgba(14,231,231,0.6)]"
  };

  return (
    <div 
      className={cn("absolute pointer-events-none z-20", className)}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Outer heartbeat ring */}
      {isPulsing && (
        <div 
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping",
            sizeClasses[size],
            pulseClasses[variant]
          )}
          style={{
            animationDuration: "2s",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)"
          }}
        />
      )}
      
      {/* Inner heartbeat ring */}
      {isPulsing && (
        <div 
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
            sizeClasses[size],
            glowClasses[variant]
          )}
          style={{
            animation: "heartbeat 2s ease-in-out infinite"
          }}
        />
      )}
      
      {/* Main pin */}
      <div 
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30",
          sizeClasses[size],
          glowClasses[variant],
          isPulsing && "animate-pulse"
        )}
        style={{
          animationDuration: isPulsing ? "2s" : undefined
        }}
      />
      
      {/* Label */}
      <div className="absolute -translate-x-1/2 translate-y-4 whitespace-nowrap">
        <div className="text-[10px] sm:text-[11px] px-2 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm text-white/90 font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}

export function PremiumGlowPin({ 
  position, 
  label, 
  className,
  ...props 
}: Omit<GlowPinProps, "variant">) {
  return (
    <GlowPin 
      position={position}
      label={label}
      variant="premium"
      size="lg"
      className={cn("premium-pin", className)}
      {...props}
    />
  );
}
