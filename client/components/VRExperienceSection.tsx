import { motion } from "framer-motion";
import { Eye, CheckCircle, Globe, FileText, Play, Calendar } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "VR Hiperrealista",
    description: "Resolución 8K con detalles fotográficos",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/20",
  },
  {
    icon: CheckCircle,
    title: "Medidas Exactas",
    description: "Dimensiones precisas al centímetro",
    color: "text-emerald-400", 
    bgColor: "bg-emerald-400/20",
  },
  {
    icon: Globe,
    title: "Acceso 24/7",
    description: "Visita desde cualquier lugar del mundo",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/20",
  },
  {
    icon: FileText,
    title: "Docs Incluidos",
    description: "Planos, certificados y registros",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/20",
  },
];

export default function VRExperienceSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video/Demo Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-cyan-900/40 aspect-video">
              {/* Tour VR Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Tour VR Disponible
              </div>

              {/* Play Button */}
              <motion.button
                className="absolute inset-0 flex items-center justify-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                  whileHover={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderColor: "rgba(255, 255, 255, 0.5)"
                  }}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </motion.div>
              </motion.button>

              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,231,231,0.1)_0%,transparent_50%)] opacity-60"></div>
              
              {/* Simulated 3D Environment */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Property Title Overlay */}
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg">Tour Villa de Lujo</h3>
                <p className="text-white/70 text-sm">Click para reproducir</p>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div 
              className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="text-sm text-white/80">Tiempo promedio</div>
              <div className="text-2xl font-bold text-cyan-400">12 min</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <motion.h2 
                className="heading-lg text-gradient mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Vívela en VR antes de decidir
              </motion.h2>
              <motion.p 
                className="text-xl text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Cada detalle importa cuando eliges tu hogar. Nuestros tours VR te 
                permiten explorar cada habitación, sentir el espacio y tomar decisiones 
                informadas antes de la compra.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring" as const, stiffness: 300 }
                    }}
                    className="glass-card p-4 rounded-xl group cursor-pointer hover:glow-teal transition-all duration-300"
                  >
                    <motion.div
                      className={`w-10 h-10 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className={`w-5 h-5 ${feature.color}`} />
                    </motion.div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors mt-1">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="flex-1 btn-primary px-6 py-4 text-lg flex items-center justify-center gap-3"
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring" as const, stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Explorar Villa Demo
              </motion.button>
              
              <motion.button
                className="flex-1 btn-secondary px-6 py-4 text-lg flex items-center justify-center gap-3"
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring" as const, stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                Solicitar Tour Personalizado
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-dark" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Tecnología de Vanguardia</h4>
                <p className="text-sm text-white/70">
                  Compatible con gafas VR, móvil y navegador web
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
