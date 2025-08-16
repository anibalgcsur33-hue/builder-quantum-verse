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
import Comprar from "./pages/properties/Comprar";
import Alquilar from "./pages/properties/Alquilar";
import ObraNueva from "./pages/properties/ObraNueva";
import Verificadas from "./pages/properties/Verificadas";
import Marketplace from "./pages/Marketplace";
import Reformas from "./pages/marketplace/Reformas";
import Seguros from "./pages/marketplace/Seguros";
import ServiciosLegales from "./pages/marketplace/ServiciosLegales";
import Mobiliario from "./pages/marketplace/Mobiliario";
import SmartHome from "./pages/marketplace/SmartHome";
import SolarEnergia from "./pages/marketplace/SolarEnergia";
import PiscinasSpa from "./pages/marketplace/PiscinasSpa";
import JardinesPaisajismo from "./pages/marketplace/JardinesPaisajismo";
import SistemasAgua from "./pages/marketplace/SistemasAgua";
import Telecomunicaciones from "./pages/marketplace/Telecomunicaciones";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";
import AgencyDashboard from "./pages/agency/Dashboard";
import CryptoToken from "./pages/CryptoToken";
import MetaverseMap from "./pages/MetaverseMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Properties Routes */}
          <Route path="/propiedades" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/property/:id/vr" element={<PropertyDetail />} />

          {/* Property Categories */}
          <Route path="/propiedades/comprar" element={<Comprar />} />
          <Route path="/propiedades/alquilar" element={<Alquilar />} />
          <Route
            path="/propiedades/alquilar/vacacional"
            element={<Alquilar />}
          />
          <Route
            path="/propiedades/alquilar/larga-temporada"
            element={<Alquilar />}
          />
          <Route path="/propiedades/obra-nueva" element={<ObraNueva />} />
          <Route path="/propiedades/verificadas" element={<Verificadas />} />

          {/* Community */}
          <Route path="/comunidad" element={<Community />} />

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/perfil" element={<Profile />} />
          <Route path="/agency/dashboard" element={<AgencyDashboard />} />

          {/* Crypto and Token */}
          <Route path="/criptomonedas-token" element={<CryptoToken />} />

          {/* Metaverse Map */}
          <Route path="/mapa-metaverso" element={<MetaverseMap />} />

          {/* Marketplace Routes */}
          <Route path="/marketplace/reformas" element={<Reformas />} />
          <Route path="/marketplace/seguros" element={<Seguros />} />
          <Route
            path="/marketplace/servicios-legales"
            element={<ServiciosLegales />}
          />
          <Route path="/marketplace/mobiliario" element={<Mobiliario />} />
          <Route path="/marketplace/smart-home" element={<SmartHome />} />
          <Route path="/marketplace/energia-solar" element={<SolarEnergia />} />

          {/* Other Routes */}
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
            path="/mapa-canarias"
            element={
              <PlaceholderPage
                title="Mapa 3D Canarias"
                description="Explora las Islas Canarias en nuestro mapa tridimensional interactivo."
              />
            }
          />
          <Route
            path="/como-funciona"
            element={
              <PlaceholderPage
                title="Cómo Funciona"
                description="Descubre cómo funciona el proceso de compra en BlueEyeHomes."
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
            path="/privacidad"
            element={
              <PlaceholderPage
                title="Política de Privacidad"
                description="Información sobre cómo protegemos y utilizamos tus datos personales."
              />
            }
          />
          <Route
            path="/terminos"
            element={
              <PlaceholderPage
                title="Términos y Condiciones"
                description="Términos de uso de la plataforma BlueEyeHomes."
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
