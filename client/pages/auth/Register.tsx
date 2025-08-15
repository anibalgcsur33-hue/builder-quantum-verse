import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  MapPin,
  UserPlus, 
  ArrowLeft,
  Chrome,
  Github,
  Shield,
  CheckCircle,
  Building,
  Euro
} from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<'buyer' | 'agency'>('buyer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    acceptTerms: false,
    acceptMarketing: false,
    // Agency specific fields
    companyName: '',
    licenseNumber: '',
    websiteUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      console.log('Registration attempt:', { ...formData, accountType });
      setIsLoading(false);
      // Here you would typically handle the actual registration
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-blue-dark py-8 px-4">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold mb-2">Crear Cuenta</h1>
            <p className="text-white/70">
              Únete a la primera plataforma inmobiliaria del metaverso
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setAccountType('buyer')}
              className={`p-6 rounded-xl border-2 transition-all ${
                accountType === 'buyer' 
                  ? 'border-neon-teal bg-neon-teal/10' 
                  : 'border-white/10 glass-card hover:border-white/20'
              }`}
            >
              <User className={`mx-auto mb-3 ${accountType === 'buyer' ? 'text-neon-teal' : 'text-white/60'}`} size={32} />
              <h3 className="font-bold mb-2">Comprador/Inversor</h3>
              <p className="text-white/60 text-sm">
                Explora propiedades, guarda favoritos y conecta con la comunidad
              </p>
            </button>

            <button
              type="button"
              onClick={() => setAccountType('agency')}
              className={`p-6 rounded-xl border-2 transition-all ${
                accountType === 'agency' 
                  ? 'border-neon-emerald bg-neon-emerald/10' 
                  : 'border-white/10 glass-card hover:border-white/20'
              }`}
            >
              <Building className={`mx-auto mb-3 ${accountType === 'agency' ? 'text-neon-emerald' : 'text-white/60'}`} size={32} />
              <h3 className="font-bold mb-2">Inmobiliaria</h3>
              <p className="text-white/60 text-sm">
                Gestiona anuncios y accede a herramientas profesionales
              </p>
            </button>
          </div>

          {/* Social Registration */}
          <div className="space-y-3 mb-6">
            <button className="w-full glass-card p-4 rounded-lg hover-glow-teal flex items-center justify-center gap-3 transition-all">
              <Chrome className="text-neon-teal" size={20} />
              <span>Registrarse con Google</span>
            </button>
            <button className="w-full glass-card p-4 rounded-lg hover-glow-emerald flex items-center justify-center gap-3 transition-all">
              <Github className="text-neon-emerald" size={20} />
              <span>Registrarse con GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="mx-4 text-white/60 text-sm">o regístrate con email</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white/80 font-medium mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-white/80 font-medium mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Tus apellidos"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                />
              </div>
            </div>

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

            {/* Phone and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-white/80 font-medium mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 123 456 789"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-white/80 font-medium mb-2">
                  Ubicación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                  >
                    <option value="">Seleccionar país</option>
                    <option value="es">España</option>
                    <option value="de">Alemania</option>
                    <option value="fr">Francia</option>
                    <option value="uk">Reino Unido</option>
                    <option value="us">Estados Unidos</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Agency Specific Fields */}
            {accountType === 'agency' && (
              <div className="space-y-4 p-6 bg-neon-emerald/5 border border-neon-emerald/20 rounded-lg">
                <h3 className="font-bold text-neon-emerald mb-4 flex items-center gap-2">
                  <Building size={20} />
                  Información de la inmobiliaria
                </h3>
                
                <div>
                  <label htmlFor="companyName" className="block text-white/80 font-medium mb-2">
                    Nombre de la empresa
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required={accountType === 'agency'}
                    placeholder="Nombre de tu inmobiliaria"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-emerald focus:ring-1 focus:ring-neon-emerald transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="licenseNumber" className="block text-white/80 font-medium mb-2">
                      Número de licencia
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Licencia profesional"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-emerald focus:ring-1 focus:ring-neon-emerald transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="websiteUrl" className="block text-white/80 font-medium mb-2">
                      Sitio web (opcional)
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://tuinmobiliaria.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-emerald focus:ring-1 focus:ring-neon-emerald transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Mínimo 8 caracteres"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-white/80 font-medium mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repetir contraseña"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Marketing */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal focus:ring-offset-0 mt-1"
                />
                <span className="text-white/70 text-sm">
                  Acepto los{' '}
                  <Link to="/terminos" className="text-neon-teal hover:text-neon-emerald transition-colors">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link to="/privacidad" className="text-neon-teal hover:text-neon-emerald transition-colors">
                    política de privacidad
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-teal focus:ring-neon-teal focus:ring-offset-0 mt-1"
                />
                <span className="text-white/70 text-sm">
                  Quiero recibir noticias, ofertas especiales y actualizaciones sobre nuevas propiedades
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.acceptTerms}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-blue-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <UserPlus size={20} />
              )}
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/auth/login" 
                className="text-neon-teal hover:text-neon-emerald transition-colors font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 rounded-lg text-center hover-glow-teal">
            <CheckCircle className="text-neon-teal mx-auto mb-3" size={32} />
            <h3 className="font-bold mb-2">Gratis para siempre</h3>
            <p className="text-white/60 text-sm">
              Explora propiedades y únete a la comunidad sin coste
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center hover-glow-emerald">
            <Euro className="text-neon-emerald mx-auto mb-3" size={32} />
            <h3 className="font-bold mb-2">Token BlueEye</h3>
            <p className="text-white/60 text-sm">
              Gana tokens y obtén descuentos exclusivos
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center hover-glow-teal">
            <Shield className="text-neon-teal mx-auto mb-3" size={32} />
            <h3 className="font-bold mb-2">100% Seguro</h3>
            <p className="text-white/60 text-sm">
              Datos protegidos con encriptación bancaria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
