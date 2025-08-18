import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Eye } from "lucide-react";

interface HeaderProps {
  isScrolled?: boolean;
  transparent?: boolean;
}

export default function Header({
  isScrolled = false,
  transparent = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent && !isScrolled
          ? "bg-transparent"
          : "bg-blue-dark/80 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300"
          >
            <img
              src="/assets/BLUEYELOGO.png"
              alt="BlueEye Homes"
              className="h-8 w-auto object-contain"
            />
            <span className="text-white font-semibold text-xl tracking-tight">
              BlueEye Homes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/propiedades"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium flex items-center gap-2"
            >
              🏠 Propiedades
            </Link>
            <Link
              to="/metaverso"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium flex items-center gap-2"
            >
              🌐 Metaverso
            </Link>
            <Link
              to="/comunidad"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium flex items-center gap-2"
            >
              👥 Comunidad
            </Link>
            <Link
              to="/inversion"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium flex items-center gap-2"
            >
              💎 Inversión
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("blueeye:assistant"))}
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium flex items-center gap-2"
            >
              🤖 Concierge IA
            </button>
            <Link
              to="/auth/login"
              className="bg-cyan-500/80 text-white px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all duration-300 font-medium"
            >
              Invitación
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-neon-teal hover:bg-white/10 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-dark/95 backdrop-blur-md border-b border-white/10">
            <nav className="px-4 py-6 space-y-4">
              <Link
                to="/properties"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Propiedades
              </Link>
              <Link
                to="/marketplace"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/community"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2 relative"
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidad
                <span className="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded-full ml-2 animate-pulse">
                  ¡Únete!
                </span>
              </Link>
              <Link
                to="/metaverse-map"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Mapa 3D
              </Link>
              <Link
                to="/crypto-token"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                BlueEye Token
              </Link>
              <Link
                to="/auth/login"
                className="block bg-neon-teal/20 text-neon-teal border border-neon-teal/30 px-4 py-2 rounded-lg hover:bg-neon-teal hover:text-white transition-all duration-300 font-medium text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
