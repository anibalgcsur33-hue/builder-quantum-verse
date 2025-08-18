import { motion } from "framer-motion";
import CountUp from "react-countup";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Star, 
  Award,
  Zap,
  Activity,
  BarChart3
} from "lucide-react";

interface AnimationShowcaseProps {
  title?: string;
}

export default function AnimationShowcase({ 
  title = "🚀 Showcase de Animaciones Implementadas" 
}: AnimationShowcaseProps) {
  const demoStats = [
    { title: "Usuarios", value: 15420, icon: Users, color: "text-neon-teal" },
    { title: "Ventas", value: 2500, suffix: "K€", icon: DollarSign, color: "text-neon-emerald" },
    { title: "ROI", value: 18.5, suffix: "%", icon: TrendingUp, color: "text-cyan-400" },
    { title: "Rating", value: 4.9, suffix: "/5", icon: Star, color: "text-yellow-400" },
    { title: "Tokens", value: 1247583, icon: Award, color: "text-purple-400" },
    { title: "Eficiencia", value: 97, suffix: "%", icon: Target, color: "text-green-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      }
    },
  };

  return (
    <div className="section-padding bg-gradient-dark">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-gradient mb-4">{title}</h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto">
            Demostración de animaciones <strong>CountUp</strong> y <strong>Staggered Animations</strong> 
            implementadas con Framer Motion + react-countup
          </p>
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 p-6 glass-card rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-neon-teal mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Características Implementadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-neon-teal rounded-full"></div>
              <span className="text-white/80">✅ <strong>CountUp</strong> con react-countup</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-neon-emerald rounded-full"></div>
              <span className="text-white/80">✅ <strong>Staggered Animation</strong> con delay escalonado</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-white/80">✅ <strong>Hover Effects</strong> con scale y rotación</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-white/80">✅ <strong>Spring Animations</strong> con física realista</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid con Animaciones */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {demoStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-card p-6 rounded-2xl group hover:glow-teal transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-neon-teal to-neon-emerald blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`inline-flex p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('400', '400/20')} mb-4 group-hover:shadow-lg transition-all`}
                  >
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </motion.div>

                  {/* Value with CountUp */}
                  <div className="mb-2">
                    <h3 className={`text-3xl font-bold ${stat.color} group-hover:scale-105 transition-transform origin-left`}>
                      <CountUp 
                        end={stat.value} 
                        duration={2.5 + (index * 0.2)} 
                        separator="," 
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                      {stat.suffix}
                    </h3>
                  </div>

                  {/* Title */}
                  <p className="text-white/70 group-hover:text-white/90 transition-colors font-medium">
                    {stat.title}
                  </p>

                  {/* Animated Progress Bar */}
                  <motion.div 
                    className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r from-${stat.color.split('-')[1]}-400 to-${stat.color.split('-')[1]}-600`}
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1.5, delay: (index * 0.1) + 0.5 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-6 glass-card rounded-2xl"
        >
          <h3 className="text-xl font-bold text-neon-emerald mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Código de Ejemplo - CountUp + Staggered Animation
          </h3>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-white/80 overflow-x-auto">
            <pre>{`// 1. Import
import CountUp from "react-countup";
import { motion } from "framer-motion";

// 2. Staggered Container
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.15 }
    }
  }}
>
  {stats.map((stat, i) => (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <h3>
        <CountUp end={stat.value} duration={2.5} separator="," />
      </h3>
    </motion.div>
  ))}
</motion.div>`}</pre>
          </div>
        </motion.div>

        {/* Components Actualizados */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 p-6 glass-card rounded-2xl"
        >
          <h3 className="text-xl font-bold text-gradient mb-4 flex items-center justify-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Componentes Actualizados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-neon-teal/10 rounded-lg">
              <strong className="text-neon-teal">✅ InvestorStats.tsx</strong>
              <p className="text-white/60 mt-1">Nuevo componente completo</p>
            </div>
            <div className="p-3 bg-neon-emerald/10 rounded-lg">
              <strong className="text-neon-emerald">✅ GamificationSystem.tsx</strong>
              <p className="text-white/60 mt-1">Números animados</p>
            </div>
            <div className="p-3 bg-cyan-400/10 rounded-lg">
              <strong className="text-cyan-400">✅ Dashboard.tsx</strong>
              <p className="text-white/60 mt-1">Stats con stagger</p>
            </div>
            <div className="p-3 bg-purple-400/10 rounded-lg">
              <strong className="text-purple-400">✅ Profile.tsx</strong>
              <p className="text-white/60 mt-1">Perfil animado</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
