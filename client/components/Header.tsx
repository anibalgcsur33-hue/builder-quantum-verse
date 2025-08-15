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
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2 shadow-lg shadow-neon-teal/30 group-hover:shadow-neon-teal/50 transition-all duration-300">
                <Eye className="w-full h-full text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg lg:text-xl tracking-tight group-hover:text-neon-teal transition-colors duration-300">
                BlueEye
              </span>
              <span className="text-neon-teal text-xs lg:text-sm font-medium -mt-1">
                Homes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/properties"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium"
            >
              Propiedades
            </Link>
            <Link
              to="/community"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium"
            >
              Comunidad
            </Link>
            <Link
              to="/metaverse-map"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium"
            >
              Mapa 3D
            </Link>
            <Link
              to="/crypto-token"
              className="text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium"
            >
              BlueEye Token
            </Link>
            <Link
              to="/auth/login"
              className="bg-neon-teal/20 text-neon-teal border border-neon-teal/30 px-4 py-2 rounded-lg hover:bg-neon-teal hover:text-white transition-all duration-300 font-medium"
            >
              Entrar
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
                to="/community"
                className="block text-white/80 hover:text-neon-teal transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidad
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
