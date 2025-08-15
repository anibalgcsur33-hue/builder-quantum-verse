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
            className="flex items-center group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb022b0ef6eaa47cba6348b0a48fcb095%2Fca2673d707a04c138fbacd2f23aa41ea?format=webp&width=800"
                alt="BlueEye Homes Logo"
                className="h-12 lg:h-14 w-auto object-contain group-hover:drop-shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
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
