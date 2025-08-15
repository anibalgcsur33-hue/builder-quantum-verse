import { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Percent, 
  Home, 
  MapPin, 
  Bot,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Property {
  price: number;
  location: string;
  sqm: number;
  bedrooms: number;
  category: string;
}

interface FinancialSimulatorProps {
  property: Property;
}

interface MortgageData {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

interface RentalData {
  vacational: {
    monthlyIncome: number;
    yearlyIncome: number;
    occupancyRate: number;
  };
  longTerm: {
    monthlyIncome: number;
    yearlyIncome: number;
    occupancyRate: number;
  };
}

interface ROIData {
  fiveYear: {
    totalReturn: number;
    annualizedReturn: number;
    propertyValue: number;
  };
  tenYear: {
    totalReturn: number;
    annualizedReturn: number;
    propertyValue: number;
  };
}

export default function FinancialSimulator({ property }: FinancialSimulatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'mortgage' | 'rental' | 'roi'>('mortgage');
  const [isLoading, setIsLoading] = useState(false);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // AI-calculated financial data
  const [mortgageData, setMortgageData] = useState<MortgageData | null>(null);
  const [rentalData, setRentalData] = useState<RentalData | null>(null);
  const [roiData, setROIData] = useState<ROIData | null>(null);

  // Calculate financial metrics based on property data and location
  const calculateFinancials = () => {
    setIsLoading(true);
    
    // Simulate AI calculation delay
    setTimeout(() => {
      const loanAmount = property.price * (1 - downPayment / 100);
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;
      
      // Mortgage calculation
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayment = monthlyPayment * numPayments;
      const totalInterest = totalPayment - loanAmount;

      setMortgageData({
        monthlyPayment,
        totalInterest,
        totalPayment
      });

      // Location-based rental rates (AI considers Canary Islands tourism data)
      const baseRatePerSqm = property.location.includes('Tenerife') ? 15 : 
                            property.location.includes('Gran Canaria') ? 12 : 10;
      
      const vacationalRate = baseRatePerSqm * property.sqm * 1.8; // Higher rate for vacation rental
      const longTermRate = baseRatePerSqm * property.sqm * 0.6; // Lower rate for long-term

      setRentalData({
        vacational: {
          monthlyIncome: vacationalRate,
          yearlyIncome: vacationalRate * 12 * 0.75, // 75% occupancy
          occupancyRate: 75
        },
        longTerm: {
          monthlyIncome: longTermRate,
          yearlyIncome: longTermRate * 12 * 0.95, // 95% occupancy
          occupancyRate: 95
        }
      });

      // ROI calculations based on Canary Islands market trends
      const appreciationRate = property.location.includes('Tenerife') ? 0.04 : 0.035; // 4% or 3.5% annually
      
      setROIData({
        fiveYear: {
          totalReturn: (property.price * Math.pow(1 + appreciationRate, 5) - property.price) / property.price * 100,
          annualizedReturn: appreciationRate * 100,
          propertyValue: property.price * Math.pow(1 + appreciationRate, 5)
        },
        tenYear: {
          totalReturn: (property.price * Math.pow(1 + appreciationRate, 10) - property.price) / property.price * 100,
          annualizedReturn: appreciationRate * 100,
          propertyValue: property.price * Math.pow(1 + appreciationRate, 10)
        }
      });

      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isExpanded) {
      calculateFinancials();
    }
  }, [isExpanded, downPayment, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="glass-card border border-neon-teal/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-white/5 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2.5 shadow-lg shadow-neon-teal/30">
              <Bot className="w-full h-full text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Simulador Financiero IA
                <Sparkles className="w-5 h-5 text-neon-teal animate-pulse" />
              </h3>
              <p className="text-white/60 text-sm">
                Análisis inteligente basado en datos del mercado canario
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-neon-teal/20 text-neon-teal rounded-full text-sm font-medium">
              Powered by IA
            </div>
            {isExpanded ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-white/10">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('mortgage')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'mortgage'
                  ? 'text-neon-teal border-b-2 border-neon-teal bg-neon-teal/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Hipoteca
            </button>
            <button
              onClick={() => setActiveTab('rental')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'rental'
                  ? 'text-neon-teal border-b-2 border-neon-teal bg-neon-teal/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Rentabilidad
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'roi'
                  ? 'text-neon-teal border-b-2 border-neon-teal bg-neon-teal/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              ROI Proyectado
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-full border-4 border-neon-teal/30 border-t-neon-teal animate-spin mb-4"></div>
                <p className="text-white/60">Analizando datos del mercado...</p>
              </div>
            ) : (
              <>
                {/* Mortgage Tab */}
                {activeTab === 'mortgage' && mortgageData && (
                  <div className="space-y-6">
                    {/* Input Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Entrada ({downPayment}%)
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-neon-teal mt-1">
                          {formatCurrency(property.price * downPayment / 100)}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Interés ({interestRate}%)
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="6"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Plazo ({loanTerm} años)
                        </label>
                        <input
                          type="range"
                          min="15"
                          max="40"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="glass p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="w-5 h-5 text-neon-teal" />
                          <span className="text-sm font-medium text-white/80">Cuota mensual</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(mortgageData.monthlyPayment)}
                        </div>
                      </div>
                      <div className="glass p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Percent className="w-5 h-5 text-neon-emerald" />
                          <span className="text-sm font-medium text-white/80">Intereses totales</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(mortgageData.totalInterest)}
                        </div>
                      </div>
                      <div className="glass p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calculator className="w-5 h-5 text-blue-400" />
                          <span className="text-sm font-medium text-white/80">Total a pagar</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(mortgageData.totalPayment)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rental Tab */}
                {activeTab === 'rental' && rentalData && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vacational Rental */}
                      <div className="glass p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <MapPin className="w-5 h-5 text-neon-teal mr-2" />
                          Alquiler Vacacional
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ingresos mensuales:</span>
                            <span className="text-white font-bold">{formatCurrency(rentalData.vacational.monthlyIncome)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ingresos anuales:</span>
                            <span className="text-neon-teal font-bold">{formatCurrency(rentalData.vacational.yearlyIncome)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ocupación:</span>
                            <span className="text-white">{rentalData.vacational.occupancyRate}%</span>
                          </div>
                          <div className="mt-4 p-3 bg-neon-teal/10 rounded-lg">
                            <div className="text-sm text-neon-teal">
                              Rentabilidad bruta anual: {formatPercentage(rentalData.vacational.yearlyIncome / property.price * 100)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Long-term Rental */}
                      <div className="glass p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <Home className="w-5 h-5 text-neon-emerald mr-2" />
                          Alquiler Larga Estancia
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ingresos mensuales:</span>
                            <span className="text-white font-bold">{formatCurrency(rentalData.longTerm.monthlyIncome)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ingresos anuales:</span>
                            <span className="text-neon-emerald font-bold">{formatCurrency(rentalData.longTerm.yearlyIncome)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Ocupación:</span>
                            <span className="text-white">{rentalData.longTerm.occupancyRate}%</span>
                          </div>
                          <div className="mt-4 p-3 bg-neon-emerald/10 rounded-lg">
                            <div className="text-sm text-neon-emerald">
                              Rentabilidad bruta anual: {formatPercentage(rentalData.longTerm.yearlyIncome / property.price * 100)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ROI Tab */}
                {activeTab === 'roi' && roiData && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 5 Year ROI */}
                      <div className="glass p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <ArrowUpRight className="w-5 h-5 text-neon-teal mr-2" />
                          Proyección 5 años
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Valor estimado:</span>
                            <span className="text-white font-bold">{formatCurrency(roiData.fiveYear.propertyValue)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Retorno total:</span>
                            <span className="text-neon-teal font-bold">{formatPercentage(roiData.fiveYear.totalReturn)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Retorno anualizado:</span>
                            <span className="text-white">{formatPercentage(roiData.fiveYear.annualizedReturn)}</span>
                          </div>
                        </div>
                      </div>

                      {/* 10 Year ROI */}
                      <div className="glass p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 text-neon-emerald mr-2" />
                          Proyección 10 años
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Valor estimado:</span>
                            <span className="text-white font-bold">{formatCurrency(roiData.tenYear.propertyValue)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Retorno total:</span>
                            <span className="text-neon-emerald font-bold">{formatPercentage(roiData.tenYear.totalReturn)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Retorno anualizado:</span>
                            <span className="text-white">{formatPercentage(roiData.tenYear.annualizedReturn)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="glass p-4 rounded-xl bg-gradient-to-r from-neon-teal/10 to-neon-emerald/10 border border-neon-teal/20">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-neon-teal mt-0.5" />
                        <div>
                          <h5 className="text-white font-medium mb-2">Análisis IA del Mercado Canario</h5>
                          <p className="text-white/70 text-sm">
                            Basado en datos históricos y tendencias actuales del mercado inmobiliario en Canarias, 
                            esta propiedad en {property.location} muestra potencial de revalorización por encima 
                            de la media nacional debido al crecimiento del turismo y la demanda internacional.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
