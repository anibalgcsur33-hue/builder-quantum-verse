import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { id: 1, label: "Miembros", value: 12400, suffix: "+" },
  { id: 2, label: "Volumen", value: 3.2, prefix: "€", suffix: "B" },
  { id: 3, label: "Eventos", value: 156, suffix: "" },
  { id: 4, label: "Propiedades", value: 2500, suffix: "+" },
  { id: 5, label: "Países", value: 25, suffix: "" },
  { id: 6, label: "ROI Promedio", value: 18.5, suffix: "%" },
];

export default function InvestorStatsSimple() {
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
    <section className="py-16 text-center">
      <motion.h2 
        className="text-3xl font-serif mb-12 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Nuestra Credibilidad
      </motion.h2>
      
      <motion.div 
        className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.id} 
            className="glass p-6 rounded-xl group hover:bg-white/10 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { type: "spring" as const, stiffness: 300 }
            }}
          >
            <motion.p 
              className="text-4xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {stat.prefix}
              <CountUp 
                end={stat.value} 
                duration={2.5} 
                separator="," 
                decimals={stat.value % 1 !== 0 ? 1 : 0}
              />
              {stat.suffix}
            </motion.p>
            <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors">
              {stat.label}
            </p>
            
            {/* Barra de progreso animada */}
            <motion.div 
              className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Texto adicional de credibilidad */}
      <motion.div 
        className="mt-12 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-gray-400 leading-relaxed">
          Más de <span className="text-cyan-300 font-semibold">12,000 inversores</span> confían 
          en nuestra plataforma para acceder a oportunidades inmobiliarias exclusivas con 
          <span className="text-violet-300 font-semibold"> certificación notarial</span> y 
          tecnología VR de vanguardia.
        </p>
        
        <motion.button
          className="mt-6 btn-crystal px-6 py-3 rounded-xl text-white font-semibold"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { type: "spring" as const, stiffness: 300 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Únete a la Comunidad
        </motion.button>
      </motion.div>
    </section>
  );
}
