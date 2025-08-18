import { motion } from "framer-motion";
import { useState } from "react";
import DemoModal from "../modals/DemoModal";

const properties = [
  {
    title: "Villa Atlántica — Tenerife",
    price: "€12.8M",
    image:
      "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=400&auto=compress&cs=tinysrgb",
    imageHD:
      "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg?w=800&auto=compress&cs=tinysrgb",
    location: "Santa Cruz",
  },
  {
    title: "Penthouse SkyLine — Barcelona",
    price: "€5.4M",
    image:
      "https://images.pexels.com/photos/8572163/pexels-photo-8572163.jpeg?w=400&auto=compress&cs=tinysrgb",
    imageHD:
      "https://images.pexels.com/photos/8572163/pexels-photo-8572163.jpeg?w=800&auto=compress&cs=tinysrgb",
    location: "Eixample",
  },
  {
    title: "Cliff Mansion — Ibiza",
    price: "€22.0M",
    image:
      "https://images.pexels.com/photos/29874112/pexels-photo-29874112.jpeg?w=400&auto=compress&cs=tinysrgb",
    imageHD:
      "https://images.pexels.com/photos/29874112/pexels-photo-29874112.jpeg?w=800&auto=compress&cs=tinysrgb",
    location: "Es Vedra",
  },
  {
    title: "Golden Mile Estate — Marbella",
    price: "€7.9M",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    imageHD:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    location: "Puerto Banús",
  },
];

export default function PropertyGrid() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<
    (typeof properties)[0] | null
  >(null);

  const openDemo = (property: (typeof properties)[0]) => {
    setSelectedProperty(property);
    setDemoOpen(true);
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Propiedades Premium
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Descubre nuestra exclusiva selección de propiedades de lujo en
            España
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {properties.map((property, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 12,
                  }
                },
              }}
              className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 cursor-pointer group transition-all duration-300"
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { type: "spring" as const, stiffness: 300 }
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={property.image}
                  alt={property.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                  whileHover={{
                    scale: 1.08,
                    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
                  }}
                  style={{ willChange: "transform" }}
                  onLoad={(e) => {
                    // Switch to HD after load
                    const img = e.target as HTMLImageElement;
                    img.src = property.imageHD;
                  }}
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                  {property.location}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white mb-2 leading-tight">
                  {property.title}
                </h3>
                <p className="text-cyan-400 font-bold text-lg mb-4">
                  {property.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openDemo(property)}
                    className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs py-2 px-3 rounded-lg transition-colors"
                  >
                    Ver en VR
                  </button>
                  <button className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs py-2 px-3 rounded-lg transition-colors">
                    Dossier IA
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <DemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title={
          selectedProperty ? `Tour VR — ${selectedProperty.title}` : "Tour VR"
        }
        imgUrl={selectedProperty?.imageHD}
      />
    </section>
  );
}
