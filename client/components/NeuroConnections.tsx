import { motion } from "framer-motion";

export default function NeuroConnections() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Neural connection lines */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 opacity-30 flow-line"
          initial={{ y: -200, opacity: 0 }}
          animate={{ 
            y: "120vh", 
            opacity: [0, 0.8, 0.8, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "linear"
          }}
          style={{ 
            left: `${Math.random() * 100}%`,
            height: `${120 + Math.random() * 80}px`
          }}
        />
      ))}

      {/* Diagonal neural pathways */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`diagonal-${i}`}
          className="absolute w-[1px] h-[200px] bg-gradient-to-br from-purple-400 via-blue-500 to-transparent opacity-20"
          initial={{ 
            x: -300, 
            y: Math.random() * window.innerHeight,
            rotate: 45 
          }}
          animate={{ 
            x: window.innerWidth + 300,
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Neural nodes/synapses */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full ring-glow opacity-60"
          initial={{ 
            scale: 0,
            x: `${20 + (i * 12)}%`,
            y: `${30 + Math.sin(i) * 40}%`
          }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pulsing energy waves */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
          initial={{ y: `${20 + i * 15}%` }}
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: i * 0.6,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating neural particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-50"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50
          }}
          animate={{ 
            y: -50,
            x: Math.random() * window.innerWidth,
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Central neural hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: 360,
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Neural hub rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className={`absolute border border-cyan-400 rounded-full opacity-20`}
            style={{
              width: `${(i + 1) * 40}px`,
              height: `${(i + 1) * 40}px`,
              top: `${50 - (i + 1) * 20}%`,
              left: `${50 - (i + 1) * 20}%`
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Neural data streams */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-[3px] h-16 bg-gradient-to-t from-purple-500 to-cyan-400 opacity-40 rounded-full"
          initial={{ 
            x: `${15 + i * 15}%`,
            y: "100%",
            scaleY: 0
          }}
          animate={{ 
            y: "-10%",
            scaleY: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: i * 1.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
