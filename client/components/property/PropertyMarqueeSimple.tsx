import { motion } from "framer-motion";

const mockProperties = [
  { id: 1, name: "Villa Horizon", price: "€3.2M", location: "Costa Brava" },
  { id: 2, name: "Sky Penthouse", price: "€5.8M", location: "Barcelona" },
  { id: 3, name: "Oasis Retreat", price: "€2.1M", location: "Marbella" },
  { id: 4, name: "Azure Loft", price: "€1.9M", location: "Madrid" },
  { id: 5, name: "Coral Villa", price: "€4.3M", location: "Valencia" },
  { id: 6, name: "Diamond Suite", price: "€6.7M", location: "Sevilla" },
];

export default function PropertyMarqueeSimple() {
  // Duplicar propiedades para carrusel infinito
  const duplicatedProperties = [...mockProperties, ...mockProperties];

  return (
    <section className="relative py-12 overflow-hidden">
      <motion.h2 
        className="text-center text-3xl font-serif mb-8 text-cyan-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Propiedades Destacadas
      </motion.h2>
      
      <div className="flex animate-marquee gap-8 hover:pause-animation">
        {duplicatedProperties.map((property, index) => (
          <motion.div
            key={`${property.id}-${index}`}
            className="glass min-w-[220px] p-4 rounded-xl text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { type: "spring" as const, stiffness: 300 }
            }}
          >
            {/* Imagen placeholder con gradient animado */}
            <motion.div 
              className="h-32 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-lg mb-4 relative overflow-hidden"
              whileHover={{
                scale: 1.08,
                transition: { type: "spring" as const, stiffness: 200, damping: 15 }
              }}
            >
              {/* Efecto shimmer en hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Badge de precio flotante */}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-cyan-300 font-semibold">
                {property.price}
              </div>
            </motion.div>
            
            {/* Información de la propiedad */}
            <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {property.name}
            </h3>
            <p className="text-cyan-300 font-bold text-lg">
              {property.price}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {property.location}
            </p>
            
            {/* Botón de acción que aparece en hover */}
            <motion.button
              className="mt-3 w-full py-2 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Ver Detalles
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Indicadores de control */}
      <motion.div 
        className="mt-8 flex justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button className="w-3 h-3 bg-cyan-400/60 rounded-full hover:bg-cyan-400 transition-colors"></button>
        <button className="w-3 h-3 bg-white/30 rounded-full hover:bg-white/60 transition-colors"></button>
        <button className="w-3 h-3 bg-white/30 rounded-full hover:bg-white/60 transition-colors"></button>
      </motion.div>
    </section>
  );
}
