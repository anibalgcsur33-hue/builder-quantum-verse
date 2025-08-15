import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bitcoin, 
  Euro, 
  TrendingUp, 
  Shield, 
  Award, 
  Calculator,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Coins,
  Zap,
  Lock,
  Globe,
  FileText,
  Users,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function CryptoToken() {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [purchaseAmount, setPurchaseAmount] = useState(100000);

  const supportedCryptos = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: Bitcoin,
      rate: 43250.50,
      acceptance: 'Ampliamente aceptado',
      fees: '0.1%',
      color: 'text-orange-400'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: Euro, // Replace with ETH icon
      rate: 2650.75,
      acceptance: 'Contratos inteligentes',
      fees: '0.15%',
      color: 'text-blue-400'
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: Euro, // Replace with USDT icon
      rate: 0.92,
      acceptance: 'Stablecoin preferida',
      fees: '0.05%',
      color: 'text-green-400'
    },
    {
      id: 'blueeye',
      name: 'BlueEye Token',
      symbol: 'BEH',
      icon: Sparkles,
      rate: 1.25,
      acceptance: 'Token nativo',
      fees: '0%',
      color: 'text-neon-teal'
    }
  ];

  const blueEyeTokenBenefits = [
    {
      title: 'Descuentos Exclusivos',
      description: 'Hasta 15% de descuento en comisiones de compraventa',
      icon: Award,
      color: 'text-neon-teal'
    },
    {
      title: 'Acceso VIP',
      description: 'Propiedades exclusivas antes del lanzamiento público',
      icon: Users,
      color: 'text-neon-emerald'
    },
    {
      title: 'Staking Rewards',
      description: 'Gana recompensas del 8-12% anual por mantener tokens',
      icon: TrendingUp,
      color: 'text-neon-teal'
    },
    {
      title: 'Gobernanza',
      description: 'Vota en decisiones importantes de la plataforma',
      icon: Shield,
      color: 'text-neon-emerald'
    },
    {
      title: 'Cashback',
      description: '2% cashback en tokens por cada transacción',
      icon: Coins,
      color: 'text-neon-teal'
    },
    {
      title: 'Valor Creciente',
      description: 'Suministro limitado con quema automática de tokens',
      icon: BarChart3,
      color: 'text-neon-emerald'
    }
  ];

  const legalCompliance = [
    {
      title: 'Contratos Inteligentes',
      description: 'Código auditado por empresas de seguridad blockchain reconocidas',
      icon: FileText,
      features: ['Auditoría externa', 'Código público', 'Multi-signature']
    },
    {
      title: 'KYC/AML Certificado',
      description: 'Verificación de identidad cumpliendo normativas europeas',
      icon: Shield,
      features: ['GDPR compliant', 'Verificación biométrica', 'Seguimiento transacciones']
    },
    {
      title: 'Licencias Regulatorias',
      description: 'Autorizados por autoridades financieras competentes',
      icon: Award,
      features: ['Licencia CNMV', 'MiCA compliance', 'Banco de España']
    }
  ];

  const calculateCryptoAmount = (eurAmount: number, cryptoRate: number) => {
    return (eurAmount / cryptoRate).toFixed(6);
  };

  const calculateTokenDiscount = (amount: number) => {
    if (amount >= 1000000) return 15;
    if (amount >= 500000) return 10;
    if (amount >= 100000) return 5;
    return 0;
  };

  return (
    <div className="min-h-screen bg-blue-dark text-white/90 pt-20">
      <div className="container mx-auto container-padding">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald flex items-center justify-center animate-glow">
              <Sparkles className="text-blue-dark" size={32} />
            </div>
            <h1 className="heading-lg text-gradient">
              Criptomonedas y Token BlueEye
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Revolucionamos el sector inmobiliario con pagos en criptomonedas y nuestro token nativo BlueEye. 
            Transacciones más rápidas, seguras y con ventajas exclusivas para holders.
          </p>
        </div>

        {/* Payment Methods Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Traditional Payment */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Euro className="text-white/60" size={32} />
              <h2 className="text-2xl font-bold">Pago Tradicional en €</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Tiempo de transferencia</span>
                <span>3-5 días laborales</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Comisiones bancarias</span>
                <span>0.3% - 1.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Disponibilidad</span>
                <span>Horario bancario</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Límites</span>
                <span>Según entidad</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Documentación</span>
                <span>Extensa</span>
              </div>
            </div>
          </div>

          {/* Crypto Payment */}
          <div className="glass-card p-8 rounded-2xl border-2 border-neon-teal/30">
            <div className="flex items-center gap-3 mb-6">
              <Bitcoin className="text-neon-teal" size={32} />
              <h2 className="text-2xl font-bold">Pago en Criptomonedas</h2>
              <span className="bg-neon-teal/20 text-neon-teal px-3 py-1 rounded-full text-sm font-medium">
                Recomendado
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Tiempo de transferencia</span>
                <span className="text-neon-teal font-medium">10-60 minutos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Comisiones de red</span>
                <span className="text-neon-teal font-medium">0.05% - 0.15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Disponibilidad</span>
                <span className="text-neon-teal font-medium">24/7/365</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Límites</span>
                <span className="text-neon-teal font-medium">Sin límites</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Documentación</span>
                <span className="text-neon-teal font-medium">Mínima (KYC)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Cryptocurrencies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            Criptomonedas Aceptadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedCryptos.map((crypto) => {
              const IconComponent = crypto.icon;
              return (
                <div 
                  key={crypto.id}
                  className={`glass-card p-6 rounded-xl hover-glow-teal cursor-pointer transition-all ${
                    crypto.id === 'blueeye' ? 'border-2 border-neon-teal/50' : ''
                  }`}
                  onClick={() => setSelectedCrypto(crypto.id)}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 ${
                      crypto.id === 'blueeye' ? 'bg-gradient-to-r from-neon-teal to-neon-emerald' : ''
                    }`}>
                      <IconComponent className={crypto.color} size={32} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{crypto.name}</h3>
                    <div className="text-2xl font-bold text-neon-teal mb-2">
                      {crypto.symbol}
                    </div>
                    <div className="text-white/70 text-sm mb-3">
                      €{crypto.rate.toLocaleString()}
                    </div>
                    <div className="text-white/60 text-xs">
                      {crypto.acceptance}
                    </div>
                    <div className="text-neon-emerald text-xs mt-1">
                      Comisión: {crypto.fees}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BlueEye Token Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald flex items-center justify-center mx-auto mb-6 animate-glow">
              <Sparkles className="text-blue-dark" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Beneficios del Token BlueEye (BEH)
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Nuestro token nativo ofrece ventajas exclusivas y valor creciente para los holders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blueEyeTokenBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="glass-card p-6 rounded-xl hover-glow-teal">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-blue-dark" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Token Economics */}
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Tokenomics BlueEye</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-teal mb-2">100M</div>
                <div className="text-white/70">Suministro Total</div>
                <div className="text-white/60 text-sm mt-1">Fijo, no inflacionario</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-emerald mb-2">2%</div>
                <div className="text-white/70">Quema Automática</div>
                <div className="text-white/60 text-sm mt-1">Por cada transacción</div>
              </div>
              <div className="text-3xl font-bold text-neon-teal mb-2 text-center">12%</div>
              <div className="text-white/70 text-center">APY Staking</div>
              <div className="text-white/60 text-sm mt-1 text-center">Recompensas anuales</div>
            </div>
          </div>
        </div>

        {/* Purchase Calculator */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
            <Calculator className="text-neon-teal" size={28} />
            Calculadora de Pago Cripto
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-white/80 font-medium mb-3">
                Precio de la propiedad (€)
              </label>
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal"
              />
              
              <div className="mt-6">
                <label className="block text-white/80 font-medium mb-3">
                  Seleccionar criptomoneda
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {supportedCryptos.map((crypto) => {
                    const IconComponent = crypto.icon;
                    return (
                      <button
                        key={crypto.id}
                        onClick={() => setSelectedCrypto(crypto.id)}
                        className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          selectedCrypto === crypto.id
                            ? 'border-neon-teal bg-neon-teal/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <IconComponent className={crypto.color} size={20} />
                        <span className="font-medium">{crypto.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-bold mb-4">Resumen del Pago</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Precio propiedad:</span>
                    <span className="font-bold">€{purchaseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">
                      Cantidad en {supportedCryptos.find(c => c.id === selectedCrypto)?.symbol}:
                    </span>
                    <span className="font-bold text-neon-teal">
                      {calculateCryptoAmount(
                        purchaseAmount, 
                        supportedCryptos.find(c => c.id === selectedCrypto)?.rate || 1
                      )} {supportedCryptos.find(c => c.id === selectedCrypto)?.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Comisión de red:</span>
                    <span>{supportedCryptos.find(c => c.id === selectedCrypto)?.fees}</span>
                  </div>
                  {selectedCrypto === 'blueeye' && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Descuento BEH:</span>
                      <span className="text-neon-emerald font-bold">
                        -{calculateTokenDiscount(purchaseAmount)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedCrypto === 'blueeye' && (
                <div className="bg-neon-teal/10 border border-neon-teal/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-neon-teal flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h5 className="font-bold text-neon-teal mb-1">Ventajas adicionales</h5>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Sin comisiones de transacción</li>
                        <li>• {calculateTokenDiscount(purchaseAmount)}% descuento en el precio</li>
                        <li>• 2% cashback en tokens BEH</li>
                        <li>• Acceso VIP a nuevas propiedades</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <button className="w-full btn-primary text-lg py-4">
                Proceder con Pago Cripto
              </button>
            </div>
          </div>
        </div>

        {/* Legal Security */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            Seguridad Legal y Cumplimiento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalCompliance.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="glass-card p-8 rounded-xl hover-glow-teal">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-neon-teal/20 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-neon-teal" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-neon-emerald flex-shrink-0" size={16} />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Notice */}
        <div className="glass-card p-8 rounded-2xl border-2 border-neon-emerald/30 mb-16">
          <div className="flex items-start gap-4">
            <Shield className="text-neon-emerald flex-shrink-0" size={32} />
            <div>
              <h3 className="text-xl font-bold text-neon-emerald mb-4">
                Garantía de Seguridad Total
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Protección Técnica</h4>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Wallets multi-signature</li>
                    <li>• Auditorías de seguridad continuas</li>
                    <li>• Seguros contra hacks y errores</li>
                    <li>• Cold storage para fondos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Protección Legal</h4>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Contratos inteligentes auditados</li>
                    <li>• Cumplimiento regulatorio total</li>
                    <li>• Transparencia en transacciones</li>
                    <li>• Resolución de disputas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              ¿Listo para revolucionar tu inversión inmobiliaria?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Únete al futuro de las transacciones inmobiliarias con pagos cripto 
              y nuestro token BlueEye con beneficios exclusivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
                <Sparkles size={24} />
                Obtener Tokens BlueEye
              </Link>
              <Link to="/propiedades" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
                <Bitcoin size={24} />
                Explorar Propiedades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
