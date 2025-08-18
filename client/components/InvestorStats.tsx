import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  TrendingUp,
  Users,
  DollarSign,
  Home,
  Star,
  Target,
} from "lucide-react";

interface StatData {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: any;
  description: string;
  trend: number;
  color: string;
}

const stats: StatData[] = [
  {
    title: "Propiedades Verificadas",
    value: 2500,
    suffix: "+",
    icon: Home,
    description: "En toda España",
    trend: 12.5,
    color: "text-neon-teal",
  },
  {
    title: "Inversores Activos",
    value: 15000,
    suffix: "+",
    icon: Users,
    description: "Comunidad global",
    trend: 8.3,
    color: "text-neon-emerald",
  },
  {
    title: "Volumen Transaccional",
    value: 250,
    suffix: "M€",
    icon: DollarSign,
    description: "En 2024",
    trend: 23.7,
    color: "text-cyan-400",
  },
  {
    title: "ROI Promedio",
    value: 18.5,
    suffix: "%",
    icon: TrendingUp,
    description: "Anual garantizado",
    trend: 5.2,
    color: "text-purple-400",
  },
  {
    title: "Rating Satisfacción",
    value: 4.9,
    suffix: "/5",
    icon: Star,
    description: "De nuestros inversores",
    trend: 2.1,
    color: "text-yellow-400",
  },
  {
    title: "Objetivos Cumplidos",
    value: 97,
    suffix: "%",
    icon: Target,
    description: "Proyectos entregados",
    trend: 4.8,
    color: "text-green-400",
  },
];

interface InvestorStatsProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function InvestorStats({
  title = "Resultados que Hablan",
  subtitle = "Datos reales de nuestra plataforma de inversión inmobiliaria",
  compact = false,
}: InvestorStatsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (compact) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="glass-card p-4 rounded-xl text-center group hover:glow-teal transition-all duration-300"
            >
              <IconComponent
                className={`w-6 h-6 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}
              />
              <h3 className={`text-2xl font-bold ${stat.color}`}>
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
                {stat.suffix}
              </h3>
              <p className="text-white/70 text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

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
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { type: "spring" as const, stiffness: 300 },
                }}
                className="glass-card p-8 rounded-2xl group hover:glow-teal transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-neon-teal to-neon-emerald blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Trend */}
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-xl ${stat.color.replace("text-", "bg-").replace("400", "400/20")} group-hover:shadow-lg transition-all`}
                    >
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </motion.div>

                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />+{stat.trend}%
                    </div>
                  </div>

                  {/* Main Value */}
                  <div className="mb-4">
                    <h3
                      className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform origin-left`}
                    >
                      {stat.prefix}
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                      {stat.suffix}
                    </h3>
                    <h4 className="text-xl font-semibold text-white group-hover:text-neon-teal transition-colors">
                      {stat.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {stat.description}
                  </p>

                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-neon-teal to-neon-emerald group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg"
          >
            Únete a Nuestra Comunidad de Inversores
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// Export compact version for use in other components
export function CompactInvestorStats() {
  return <InvestorStats compact={true} />;
}
