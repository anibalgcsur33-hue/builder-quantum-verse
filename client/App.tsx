import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Community from "./pages/Community";
import Reformas from "./pages/marketplace/Reformas";
import Seguros from "./pages/marketplace/Seguros";
import ServiciosLegales from "./pages/marketplace/ServiciosLegales";
import Mobiliario from "./pages/marketplace/Mobiliario";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/propiedades"
            element={
              <PlaceholderPage
                title="Explorar Propiedades"
                description="Descubre inmuebles únicos en el metaverso inmobiliario con tours VR y pagos en criptomonedas."
              />
            }
          />
          <Route
            path="/tour-vr"
            element={
              <PlaceholderPage
                title="Tours Virtuales VR"
                description="Experimenta recorridos inmersivos en realidad virtual por las propiedades más exclusivas."
              />
            }
          />
          <Route
            path="/mapa-3d"
            element={
              <PlaceholderPage
                title="Mapa 3D Interactivo"
                description="Explora Canarias y España en nuestro mapa tridimensional con filtros avanzados."
              />
            }
          />
          <Route
            path="/comunidad"
            element={
              <PlaceholderPage
                title="Comunidad Metaverso"
                description="Únete a la primera comunidad inmobiliaria del metaverso y conecta con otros usuarios."
              />
            }
          />
          <Route
            path="/contacto"
            element={
              <PlaceholderPage
                title="Contacto"
                description="¿Tienes preguntas? Nuestro equipo está aquí para ayudarte en tu experiencia inmobiliaria."
              />
            }
          />
          <Route
            path="/metaverso"
            element={
              <PlaceholderPage
                title="Entrar al Metaverso"
                description="Accede al mundo virtual inmobiliario y explora propiedades en un entorno 3D único."
              />
            }
          />
          <Route
            path="/property/:slug"
            element={
              <PlaceholderPage
                title="Detalle de Propiedad"
                description="Tour virtual detallado de la propiedad con información completa y opciones de compra."
              />
            }
          />
          <Route
            path="/privacidad"
            element={
              <PlaceholderPage
                title="Política de Privacidad"
                description="Información sobre cómo protegemos y utilizamos tus datos personales."
              />
            }
          />
          <Route
            path="/cookies"
            element={
              <PlaceholderPage
                title="Política de Cookies"
                description="Detalles sobre el uso de cookies en nuestra plataforma."
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
