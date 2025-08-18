import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

interface NavNode {
  id: string;
  x: number;
  y: number;
  label: string;
  href: string;
  category: "primary" | "secondary" | "special";
  icon?: string;
}

const NEURAL_NODES: NavNode[] = [
  { id: "home", x: 15, y: 50, label: "Inicio", href: "/", category: "primary", icon: "🏠" },
  { id: "props", x: 35, y: 30, label: "Propiedades", href: "/propiedades", category: "primary", icon: "🏘️" },
  { id: "vr", x: 55, y: 60, label: "VR & AR", href: "/metaverso", category: "special", icon: "🥽" },
  { id: "3d", x: 50, y: 25, label: "Mapa 3D", href: "/mapa-canarias", category: "secondary", icon: "🌐" },
  { id: "comm", x: 75, y: 45, label: "Comunidad", href: "/comunidad", category: "primary", icon: "👥" },
  { id: "market", x: 65, y: 70, label: "Marketplace", href: "/marketplace", category: "secondary", icon: "🛒" },
  { id: "inv", x: 85, y: 55, label: "Inversores", href: "#invest", category: "special", icon: "💎" },
  { id: "ai", x: 40, y: 75, label: "IA Concierge", href: "#ai", category: "special", icon: "🤖" },
];

// Dynamic connections based on categories and proximity
const generateConnections = (nodes: NavNode[]): [number, number][] => {
  const connections: [number, number][] = [];
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];
      
      // Calculate distance
      const distance = Math.sqrt(
        Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
      );
      
      // Connect close nodes or related categories
      if (distance < 35 || 
          (nodeA.category === "special" && nodeB.category === "special") ||
          (nodeA.category === "primary" && nodeB.category === "primary")) {
        connections.push([i, j]);
      }
    }
  }
  
  return connections;
};

export default function NeuralNavEnhanced() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pulseNodes, setPulseNodes] = useState<Set<string>>(new Set());
  
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const connections = generateConnections(NEURAL_NODES);

  useEffect(() => {
    // Create random neural activity
    const interval = setInterval(() => {
      const randomNode = NEURAL_NODES[Math.floor(Math.random() * NEURAL_NODES.length)];
      setPulseNodes(prev => new Set([...prev, randomNode.id]));
      
      setTimeout(() => {
        setPulseNodes(prev => {
          const next = new Set(prev);
          next.delete(randomNode.id);
          return next;
        });
      }, 1500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const getNodeVariant = (category: NavNode["category"]) => {
    switch (category) {
      case "primary": return "fill-neon-teal";
      case "secondary": return "fill-blue-400";
      case "special": return "fill-neon-emerald";
      default: return "fill-neon-teal";
    }
  };

  const getConnectionColor = (nodeA: NavNode, nodeB: NavNode) => {
    if (nodeA.category === "special" || nodeB.category === "special") {
      return "stroke-neon-emerald/60";
    }
    if (nodeA.category === "primary" && nodeB.category === "primary") {
      return "stroke-neon-teal/60";
    }
    return "stroke-blue-400/40";
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <motion.div 
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] overflow-hidden backdrop-blur-sm"
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Neural Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern id="neuralGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="0.5" fill="rgba(14,231,231,0.3)" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(14,231,231,0.1)" strokeWidth="0.5" />
                <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(14,231,231,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neuralGrid)" />
          </svg>
        </div>

        {/* Main SVG Navigation */}
        <svg viewBox="0 0 100 80" className="w-full h-56 relative z-10">
          {/* Dynamic Connections */}
          {connections.map(([a, b], i) => {
            const nodeA = NEURAL_NODES[a];
            const nodeB = NEURAL_NODES[b];
            const isActive = hoveredNode === nodeA.id || hoveredNode === nodeB.id;
            
            return (
              <motion.g key={`connection-${i}`}>
                <motion.line
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  className={getConnectionColor(nodeA, nodeB)}
                  strokeWidth={isActive ? "1.2" : "0.8"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isActive ? 1 : 0.6,
                    strokeWidth: isActive ? 1.2 : 0.8
                  }}
                  transition={{ 
                    delay: 0.1 + i * 0.05, 
                    duration: 0.8,
                    pathLength: { duration: 0.8 },
                    opacity: { duration: 0.3 },
                    strokeWidth: { duration: 0.3 }
                  }}
                />
                
                {/* Data flow animation on active connections */}
                {isActive && (
                  <motion.circle
                    r="0.8"
                    className="fill-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <animateMotion dur="1.5s" repeatCount="indefinite">
                      <mpath href={`#path-${i}`} />
                    </animateMotion>
                  </motion.circle>
                )}
                
                <path id={`path-${i}`} d={`M${nodeA.x},${nodeA.y} L${nodeB.x},${nodeB.y}`} fill="none" opacity="0" />
              </motion.g>
            );
          })}

          {/* Neural Nodes */}
          {NEURAL_NODES.map((node, i) => {
            const isActive = activeNode === node.id;
            const isHovered = hoveredNode === node.id;
            const isPulsing = pulseNodes.has(node.id);
            
            return (
              <motion.g key={node.id}>
                {/* Outer ring for special nodes */}
                {node.category === "special" && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="4.5"
                    className="fill-none stroke-neon-emerald/40"
                    strokeWidth="0.5"
                    animate={{ 
                      scale: isPulsing ? [1, 1.3, 1] : 1,
                      opacity: isPulsing ? [0.4, 0.8, 0.4] : 0.4
                    }}
                    transition={{ duration: 1.5 }}
                  />
                )}
                
                {/* Pulse ring */}
                {isPulsing && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="3"
                    className={`fill-none ${getNodeVariant(node.category).replace('fill-', 'stroke-')}`}
                    strokeWidth="1"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  />
                )}
                
                {/* Main Node */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.category === "special" ? "3.2" : "2.8"}
                  className={getNodeVariant(node.category)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isHovered ? 1.3 : 1, 
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    scale: { duration: 0.2 }
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setActiveNode(node.id)}
                  style={{ cursor: "pointer" }}
                />
                
                {/* Node Label on Hover */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={node.x - 15}
                      y={node.y - 15}
                      width="30"
                      height="8"
                      rx="4"
                      className="fill-black/80"
                    />
                    <text
                      x={node.x}
                      y={node.y - 10}
                      textAnchor="middle"
                      className="fill-white text-[3px] font-medium"
                    >
                      {node.icon} {node.label}
                    </text>
                  </motion.g>
                )}
              </motion.g>
            );
          })}

          {/* Dynamic Cursor Influence */}
          <motion.circle
            cx={springX}
            cy={springY}
            r="8"
            className="fill-white/5 stroke-white/20"
            strokeWidth="0.5"
          />
        </svg>

        {/* Bottom Navigation Links */}
        <div className="p-6 pt-2">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {NEURAL_NODES.map((node) => (
              <motion.a
                key={node.id}
                href={node.href}
                className={`
                  px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                  ${hoveredNode === node.id 
                    ? 'bg-white/20 text-white scale-105' 
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{node.icon}</span>
                <span>{node.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,231,231,0.05),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(124,92,255,0.05),transparent_40%)]" />
        </div>
      </motion.div>
    </div>
  );
}
