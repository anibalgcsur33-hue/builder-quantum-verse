import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  ArrowLeft,
  Chrome,
  Github,
  Shield,
  CheckCircle
} from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
      // Here you would typically handle the actual authentication
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-blue-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-neon-teal transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>

        {/* Main Card */}
        <div className="glass-card p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-gradient mb-4 block">
              BlueEyeHomes
            </Link>
            <h1 className="text-2xl font-bold mb-2">Iniciar Sesión</h1>
            <p className="text-white/70">
              Accede a tu cuenta para gestionar propiedades y participar en la comunidad
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full glass-card p-4 rounded-lg hover-glow-teal flex items-center justify-center gap-3 transition-all">
              <Chrome className="text-neon-teal" size={20} />
              <span>Continuar con Google</span>
            </button>
            <button className="w-full glass-card p-4 rounded-lg hover-glow-emerald flex items-center justify-center gap-3 transition-all">
              <Github className="text-neon-emerald" size={20} />
              <span>Continuar con GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="mx-4 text-white/60 text-sm">o continúa con email</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white/80 font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Tu contraseña"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal focus:ring-offset-0"
                />
                <span className="text-white/70 text-sm">Recordarme</span>
              </label>
              <Link 
                to="/auth/forgot-password" 
                className="text-neon-teal hover:text-neon-emerald transition-colors text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-blue-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogIn size={20} />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70">
              ¿No tienes una cuenta?{' '}
              <Link 
                to="/auth/register" 
                className="text-neon-teal hover:text-neon-emerald transition-colors font-medium"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-neon-teal/10 border border-neon-teal/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="text-neon-teal flex-shrink-0 mt-0.5" size={16} />
              <div className="text-sm">
                <p className="text-white/90 font-medium mb-1">Conexión segura</p>
                <p className="text-white/70">
                  Todos los datos están encriptados y protegidos con estándares bancarios.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="glass-card p-4 rounded-lg">
            <CheckCircle className="text-neon-teal mx-auto mb-2" size={24} />
            <div className="text-white font-medium text-sm">Favoritos</div>
            <div className="text-white/60 text-xs">Guarda propiedades</div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <CheckCircle className="text-neon-emerald mx-auto mb-2" size={24} />
            <div className="text-white font-medium text-sm">Comunidad</div>
            <div className="text-white/60 text-xs">Conecta con otros</div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <CheckCircle className="text-neon-teal mx-auto mb-2" size={24} />
            <div className="text-white font-medium text-sm">Alertas</div>
            <div className="text-white/60 text-xs">Notificaciones VIP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
