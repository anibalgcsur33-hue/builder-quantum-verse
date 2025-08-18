import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, MapPin, Star, ArrowRight, Play } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Villa Oceánica Premium",
    price: "€3.2M",
    location: "Costa Brava, España",
    image: "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=600&auto=compress&cs=tinysrgb",
    imageHD: "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=1200&auto=compress&cs=tinysrgb",
    rating: 4.9,
    views: "2.4K",
    bedrooms: 4,
    bathrooms: 3,
    area: "320m²",
    featured: true,
  },
  {
    id: 2,
    title: "Penthouse Modernista",
    price: "€2.8M",
    location: "Barcelona, España",
    image: "https://images.pexels.com/photos/8572163/pexels-photo-8572163.jpeg?w=600&auto=compress&cs=tinysrgb",
    imageHD: "https://images.pexels.com/photos/8572163/pexels-photo-8572163.jpeg?w=1200&auto=compress&cs=tinysrgb",
    rating: 4.7,
    views: "1.8K",
    bedrooms: 3,
    bathrooms: 2,
    area: "180m²",
    featured: false,
  },
  {
    id: 3,
    title: "Chalet Alpino Luxury",
    price: "€4.5M",
    location: "Pirineos, España",
    image: "https://images.pexels.com/photos/29874112/pexels-photo-29874112.jpeg?w=600&auto=compress&cs=tinysrgb",
    imageHD: "https://images.pexels.com/photos/29874112/pexels-photo-29874112.jpeg?w=1200&auto=compress&cs=tinysrgb",
    rating: 5.0,
    views: "3.1K",
    bedrooms: 5,
    bathrooms: 4,
    area: "450m²",
    featured: true,
  },
  {
    id: 4,
    title: "Mansion Mediterránea",
    price: "€6.7M",
    location: "Marbella, España",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    imageHD: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    rating: 4.8,
    views: "4.2K",
    bedrooms: 6,
    bathrooms: 5,
    area: "680m²",
    featured: true,
  },
  {
    id: 5,
    title: "Loft Industrial Chic",
    price: "€1.9M",
    location: "Madrid, España",
    image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?w=600&auto=compress&cs=tinysrgb",
    imageHD: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?w=1200&auto=compress&cs=tinysrgb",
    rating: 4.6,
    views: "1.5K",
    bedrooms: 2,
    bathrooms: 2,
    area: "140m²",
    featured: false,
  },
  {
    id: 6,
    title: "Casa Señorial Histórica",
    price: "€5.2M",
    location: "Sevilla, España",
    image: "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=600&auto=compress&cs=tinysrgb",
    imageHD: "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=1200&auto=compress&cs=tinysrgb",
    rating: 4.9,
    views: "2.8K",
    bedrooms: 7,
    bathrooms: 6,
    area: "750m²",
    featured: true,
  },
];

interface PropertyMarqueeProps {
  title?: string;
  autoplay?: boolean;
  speed?: number;
  showFilters?: boolean;
}

export default function PropertyMarquee({
  title = "Propiedades Premium Destacadas",
  autoplay = true,
  speed = 30,
  showFilters = true,
}: PropertyMarqueeProps) {
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [filter, setFilter] = useState<"all" | "featured" | "new">("all");

  const filteredProperties = properties.filter((property) => {
    if (filter === "featured") return property.featured;
    if (filter === "new") return property.id <= 3; // Mock "new" filter
    return true;
  });

  // Duplicate properties for seamless infinite scroll
  const duplicatedProperties = [...filteredProperties, ...filteredProperties];

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

  const cardVariants = {
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
    <div className="section-padding bg-gradient-dark overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-gradient mb-4">{title}</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Descubre nuestra selección exclusiva de propiedades de lujo con tours VR inmersivos
          </p>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              { key: "all", label: "Todas" },
              { key: "featured", label: "Destacadas" },
              { key: "new", label: "Nuevas" },
            ].map((filterOption) => (
              <motion.button
                key={filterOption.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  filter === filterOption.key
                    ? "bg-neon-teal text-blue-dark shadow-lg shadow-neon-teal/30"
                    : "glass-card text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {filterOption.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-dark to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-dark to-transparent z-10"></div>

          {/* Scrolling Container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex gap-6 overflow-hidden"
          >
            <motion.div
              className="flex gap-6 min-w-full"
              animate={{
                x: autoplay ? [0, -100 * filteredProperties.length + "%"] : 0,
              }}
              transition={{
                x: {
                  duration: speed,
                  repeat: autoplay ? Infinity : 0,
                  ease: "linear",
                },
              }}
            >
              {duplicatedProperties.map((property, index) => (
                <motion.div
                  key={`${property.id}-${index}`}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring" as const, stiffness: 300 }
                  }}
                  className="property-card min-w-[350px] lg:min-w-[400px] group cursor-pointer"
                  onClick={() => setSelectedProperty(property)}
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    {/* Main Image with Zoom Animation */}
                    <motion.img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                      whileHover={{ 
                        scale: 1.08,
                        transition: { type: "spring" as const, stiffness: 200, damping: 15 }
                      }}
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* VR Tour Button */}
                      <motion.button
                        className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-neon-teal text-blue-dark font-semibold rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        whileParent={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Play className="w-4 h-4" />
                        Tour VR
                      </motion.button>

                      {/* Property Stats */}
                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm"
                        initial={{ y: -20, opacity: 0 }}
                        whileParent={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Eye className="w-4 h-4" />
                        {property.views}
                      </motion.div>
                    </motion.div>

                    {/* Featured Badge */}
                    {property.featured && (
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-neon-emerald to-neon-teal text-blue-dark font-semibold rounded-full text-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" as const }}
                      >
                        Destacada
                      </motion.div>
                    )}
                  </div>

                  {/* Property Info */}
                  <div className="space-y-3">
                    {/* Title and Price */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white group-hover:text-neon-teal transition-colors">
                        {property.title}
                      </h3>
                      <span className="text-neon-emerald font-bold text-lg">
                        {property.price}
                      </span>
                    </div>

                    {/* Location and Rating */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{property.rating}</span>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex gap-4 text-sm text-white/60">
                      <span>{property.bedrooms} hab</span>
                      <span>{property.bathrooms} baños</span>
                      <span>{property.area}</span>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/20 transition-all group-hover:bg-neon-teal group-hover:text-blue-dark"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ver Detalles
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-neon-teal text-blue-dark font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-teal/30 transition-all"
          >
            Ver Todas las Propiedades
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass-card text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
          >
            Filtros Avanzados
          </motion.button>
        </motion.div>
      </div>

      {/* Property Detail Modal (placeholder) */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card p-8 rounded-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProperty.imageHD}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedProperty.title}
            </h3>
            <p className="text-neon-teal text-xl font-bold mb-4">
              {selectedProperty.price}
            </p>
            <p className="text-white/70 mb-6">
              Esta exclusiva propiedad ofrece vistas espectaculares y acabados de lujo. 
              Agenda una visita VR para explorar cada detalle.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 bg-neon-teal text-blue-dark py-3 px-6 rounded-xl font-semibold">
                Agendar Tour VR
              </button>
              <button
                onClick={() => setSelectedProperty(null)}
                className="px-6 py-3 glass-card text-white rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Export compact version for use in other components
export function CompactPropertyMarquee() {
  return (
    <PropertyMarquee
      title="Propiedades Destacadas"
      showFilters={false}
      speed={20}
    />
  );
}
