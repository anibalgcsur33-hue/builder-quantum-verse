import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-blue-dark text-white/90 flex items-center justify-center">
      <div className="container mx-auto container-padding text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
            <Construction className="text-blue-dark" size={48} />
          </div>
          
          <h1 className="heading-lg text-gradient mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-white/70 mb-8">
            {description}
          </p>
          
          <div className="glass-card p-6 rounded-xl mb-8">
            <p className="text-white/60">
              Esta página está en desarrollo. Continúa navegando para explorar las funcionalidades disponibles 
              o regresa al inicio para descubrir más sobre BlueEyeHomes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center gap-2">
              <ArrowLeft size={20} />
              Volver al Inicio
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              Página Anterior
            </button>
          </div>
          
          <div className="mt-12 p-6 glass-card rounded-xl">
            <h3 className="text-lg font-bold mb-4">¿Necesitas esta funcionalidad?</h3>
            <p className="text-white/70 text-sm">
              Estamos construyendo el futuro del real estate en el metaverso. 
              Si necesitas acceso a esta función específica, contáctanos y te mantendremos informado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
