import { useState, useEffect } from 'react';
import { 
  Zap, 
  Wrench, 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Lightbulb, 
  Gauge, 
  History, 
  BarChart3, 
  Eye, 
  Play, 
  Maximize2,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  sqm: number;
  energyRating: string;
}

interface DigitalTwinProps {
  property: Property;
  vrTourUrl?: string;
}

interface EnergyData {
  currentConsumption: number; // kWh
  monthlyAverage: number;
  yearlyEstimate: number;
  efficiency: number; // 0-100
  carbonFootprint: number; // kg CO2
  solarGeneration?: number;
  trend: 'up' | 'down' | 'stable';
}

interface CommunityData {
  monthlyCost: number;
  lastPaid: string;
  nextPayment: string;
  yearlyBudget: number;
  reserves: number;
  maintenanceRatio: number;
}

interface ReformHistory {
  id: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  energyImpact?: number;
  status: 'completed' | 'in-progress' | 'planned';
}

export default function DigitalTwin({ property, vrTourUrl }: DigitalTwinProps) {
  const [activeTab, setActiveTab] = useState<'energy' | 'reforms' | 'community'>('energy');
  const [isVRMode, setIsVRMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real-time data simulation
  const [energyData, setEnergyData] = useState<EnergyData>({
    currentConsumption: 2.4,
    monthlyAverage: 285,
    yearlyEstimate: 3420,
    efficiency: 85,
    carbonFootprint: 1250,
    solarGeneration: 180,
    trend: 'down'
  });

  const [communityData] = useState<CommunityData>({
    monthlyCost: 185,
    lastPaid: '2024-01-15',
    nextPayment: '2024-02-15',
    yearlyBudget: 2220,
    reserves: 15000,
    maintenanceRatio: 0.12
  });

  const [reformHistory] = useState<ReformHistory[]>([
    {
      id: '1',
      date: '2023-11-15',
      type: 'Eficiencia Energética',
      description: 'Instalación de sistema solar fotovoltaico 8kW',
      cost: 12500,
      energyImpact: 25,
      status: 'completed'
    },
    {
      id: '2',
      date: '2023-08-20',
      type: 'Climatización',
      description: 'Renovación sistema aire acondicionado A+++',
      cost: 4200,
      energyImpact: 15,
      status: 'completed'
    },
    {
      id: '3',
      date: '2023-05-10',
      type: 'Aislamiento',
      description: 'Mejora aislamiento térmico fachada',
      cost: 8900,
      energyImpact: 20,
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-03-01',
      type: 'Domótica',
      description: 'Sistema domótico integral smart home',
      cost: 6500,
      energyImpact: 10,
      status: 'planned'
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prev => ({
        ...prev,
        currentConsumption: Math.max(0.5, prev.currentConsumption + (Math.random() - 0.5) * 0.2),
        solarGeneration: Math.max(0, (prev.solarGeneration || 0) + (Math.random() - 0.5) * 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-400';
    if (efficiency >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-green-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const tabs = [
    { id: 'energy', label: 'Datos Energéticos', icon: Zap },
    { id: 'reforms', label: 'Historial Reformas', icon: Wrench },
    { id: 'community', label: 'Costes Comunidad', icon: Euro }
  ];

  return (
    <div className="glass-card border border-neon-teal/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2.5 shadow-lg shadow-neon-teal/30">
              <Activity className="w-full h-full text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Gemelo Digital</h3>
              <p className="text-white/60 text-sm">
                Datos en tiempo real • Última actualización: {new Date().toLocaleTimeString('es-ES')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshData}
              className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
            {vrTourUrl && (
              <button
                onClick={() => setIsVRMode(true)}
                className="btn-secondary flex items-center gap-2 px-4 py-2"
              >
                <Eye className="w-4 h-4" />
                Ver en VR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Status Indicators */}
      <div className="p-6 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <span className="text-white font-bold">22°C</span>
            </div>
            <div className="text-xs text-white/60 mt-1">Temperatura</div>
          </div>
          
          <div className="glass p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold">45%</span>
            </div>
            <div className="text-xs text-white/60 mt-1">Humedad</div>
          </div>
          
          <div className="glass p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{energyData.solarGeneration?.toFixed(1)}W</span>
            </div>
            <div className="text-xs text-white/60 mt-1">Solar</div>
          </div>
          
          <div className="glass p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Lightbulb className="w-5 h-5 text-neon-teal" />
              <span className="text-white font-bold">{energyData.currentConsumption.toFixed(1)}kW</span>
            </div>
            <div className="text-xs text-white/60 mt-1">Consumo</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-neon-teal border-b-2 border-neon-teal bg-neon-teal/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComponent className="w-4 h-4 inline mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'energy' && (
          <div className="space-y-6">
            {/* Energy Efficiency Score */}
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-white">Eficiencia Energética</h4>
                <div className="flex items-center space-x-2">
                  <div className={`text-2xl font-bold ${getEfficiencyColor(energyData.efficiency)}`}>
                    {energyData.efficiency}%
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold text-sm">{property.energyRating}</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-neon-teal to-neon-emerald h-2 rounded-full transition-all duration-500"
                  style={{ width: `${energyData.efficiency}%` }}
                ></div>
              </div>
            </div>

            {/* Energy Consumption */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="w-5 h-5 text-neon-teal" />
                  <span className="text-sm font-medium text-white/80">Consumo Actual</span>
                  {getTrendIcon(energyData.trend)}
                </div>
                <div className="text-2xl font-bold text-white">
                  {energyData.currentConsumption.toFixed(1)}
                  <span className="text-sm text-white/60 ml-1">kW</span>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-white/80">Promedio Mensual</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {energyData.monthlyAverage}
                  <span className="text-sm text-white/60 ml-1">kWh</span>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-neon-emerald" />
                  <span className="text-sm font-medium text-white/80">Estimado Anual</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {energyData.yearlyEstimate}
                  <span className="text-sm text-white/60 ml-1">kWh</span>
                </div>
              </div>
            </div>

            {/* Carbon Footprint & Solar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl">
                <h5 className="font-bold text-white mb-3">Huella de Carbono</h5>
                <div className="flex items-center justify-between">
                  <Wind className="w-8 h-8 text-green-400" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{energyData.carbonFootprint}</div>
                    <div className="text-sm text-white/60">kg CO₂/año</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-green-400">
                  ↓ 35% menos que la media nacional
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <h5 className="font-bold text-white mb-3">Generación Solar</h5>
                <div className="flex items-center justify-between">
                  <Sun className="w-8 h-8 text-yellow-400" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{energyData.solarGeneration?.toFixed(0)}</div>
                    <div className="text-sm text-white/60">W actuales</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-yellow-400">
                  ↑ Ahorro estimado: €850/año
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reforms' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white">Historial de Reformas</h4>
              <div className="text-sm text-white/60">
                Total invertido: {formatCurrency(reformHistory.reduce((sum, reform) => sum + reform.cost, 0))}
              </div>
            </div>

            <div className="space-y-3">
              {reformHistory.map((reform) => (
                <div key={reform.id} className="glass p-4 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          reform.status === 'completed' ? 'bg-green-400' :
                          reform.status === 'in-progress' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`}></div>
                        <h5 className="font-bold text-white">{reform.type}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reform.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          reform.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {reform.status === 'completed' ? 'Completado' :
                           reform.status === 'in-progress' ? 'En progreso' :
                           'Planificado'}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-2">{reform.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-white/60 text-sm">{reform.date}</span>
                        </div>
                        {reform.energyImpact && (
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-neon-teal" />
                            <span className="text-neon-teal text-sm">+{reform.energyImpact}% eficiencia</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{formatCurrency(reform.cost)}</div>
                      {reform.status === 'completed' && reform.energyImpact && (
                        <div className="text-sm text-green-400">ROI: 8-12 años</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            {/* Current Costs */}
            <div className="glass p-4 rounded-xl">
              <h4 className="font-bold text-white mb-4">Costes Actuales</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-neon-teal">{formatCurrency(communityData.monthlyCost)}</div>
                  <div className="text-sm text-white/60">Mensual</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(communityData.yearlyBudget)}</div>
                  <div className="text-sm text-white/60">Presupuesto anual</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{formatCurrency(communityData.reserves)}</div>
                  <div className="text-sm text-white/60">Reservas</div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold text-white">Último Pago</h5>
                </div>
                <div className="text-white/70">{communityData.lastPaid}</div>
                <div className="text-lg font-bold text-white mt-1">{formatCurrency(communityData.monthlyCost)}</div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <h5 className="font-bold text-white">Próximo Pago</h5>
                </div>
                <div className="text-white/70">{communityData.nextPayment}</div>
                <div className="text-lg font-bold text-white mt-1">{formatCurrency(communityData.monthlyCost)}</div>
              </div>
            </div>

            {/* Community Health */}
            <div className="glass p-4 rounded-xl">
              <h5 className="font-bold text-white mb-3">Salud Financiera de la Comunidad</h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Ratio mantenimiento/ingresos:</span>
                  <span className="text-white font-bold">{(communityData.maintenanceRatio * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Reservas vs. presupuesto anual:</span>
                  <span className="text-green-400 font-bold">
                    {(communityData.reserves / communityData.yearlyBudget * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Estado general:</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-bold">Excelente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VR Integration Modal */}
      {isVRMode && vrTourUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="w-full h-full max-w-6xl max-h-4xl bg-blue-dark rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-bold">Tour VR con Datos en Tiempo Real</h3>
              <button
                onClick={() => setIsVRMode(false)}
                className="text-white/70 hover:text-white"
              >
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full bg-white/5 flex items-center justify-center">
              <div className="text-center text-white/70">
                <Play className="w-16 h-16 mx-auto mb-4" />
                <p>Tour VR integrado con gemelo digital</p>
                <p className="text-sm mt-2">URL: {vrTourUrl}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
