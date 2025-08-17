import { useState } from "react";
import {
  TrendingUp,
  Users,
  Euro,
  Info,
  Eye,
  EyeOff,
  BarChart3,
  Activity,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface HeatmapData {
  type: 'price' | 'tourism' | 'demand';
  visible: boolean;
  opacity: number;
  minValue: number;
  maxValue: number;
  currentValue?: number;
  unit: string;
  description: string;
  colors: {
    low: string;
    medium: string;
    high: string;
  };
}

interface HeatmapLegendProps {
  layers: HeatmapData[];
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  onLayerToggle: (type: string, visible: boolean) => void;
  onOpacityChange: (type: string, opacity: number) => void;
  onHover?: (type: string | null, value?: number) => void;
  className?: string;
}

export default function HeatmapLegend({
  layers,
  position = 'top-right',
  onLayerToggle,
  onOpacityChange,
  onHover,
  className = "",
}: HeatmapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right': return 'top-4 right-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-left': return 'top-4 left-4';
      default: return 'top-4 right-4';
    }
  };

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'price': return Euro;
      case 'tourism': return Users;
      case 'demand': return TrendingUp;
      default: return BarChart3;
    }
  };

  const getLayerTitle = (type: string) => {
    switch (type) {
      case 'price': return 'Precio por m²';
      case 'tourism': return 'Ocupación Turística';
      case 'demand': return 'Demanda del Mercado';
      default: return type;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '€') {
      return `${value.toLocaleString()}€`;
    } else if (unit === '%') {
      return `${Math.round(value)}%`;
    }
    return `${value}${unit}`;
  };

  const getGradientBackground = (colors: HeatmapData['colors']) => {
    return `linear-gradient(to right, ${colors.low}, ${colors.medium}, ${colors.high})`;
  };

  return (
    <div className={`absolute ${getPositionClasses()} z-30 ${className}`}>
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-w-64 max-w-80">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-neon-teal" />
              <h3 className="text-white font-bold">Capas de Calor</h3>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          <p className="text-white/60 text-sm mt-1">
            Visualización de datos en tiempo real
          </p>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-4 space-y-4">
            {layers.map((layer) => {
              const IconComponent = getLayerIcon(layer.type);
              
              return (
                <div
                  key={layer.type}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    layer.visible
                      ? 'border-neon-teal/50 bg-neon-teal/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                  onMouseEnter={() => onHover?.(layer.type, layer.currentValue)}
                  onMouseLeave={() => onHover?.(null)}
                >
                  {/* Layer Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent 
                        className={`w-4 h-4 ${layer.visible ? 'text-neon-teal' : 'text-white/60'}`} 
                      />
                      <span className={`font-medium text-sm ${layer.visible ? 'text-white' : 'text-white/60'}`}>
                        {getLayerTitle(layer.type)}
                      </span>
                    </div>
                    <button
                      onClick={() => onLayerToggle(layer.type, !layer.visible)}
                      className={`p-1 rounded transition-colors ${
                        layer.visible ? 'text-neon-teal' : 'text-white/40'
                      }`}
                    >
                      {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-xs mb-3">{layer.description}</p>

                  {layer.visible && (
                    <>
                      {/* Color Scale */}
                      <div className="space-y-2 mb-3">
                        <div
                          className="h-3 rounded-full"
                          style={{ background: getGradientBackground(layer.colors) }}
                        ></div>
                        <div className="flex justify-between text-xs text-white/60">
                          <span>{formatValue(layer.minValue, layer.unit)}</span>
                          <span>{formatValue((layer.minValue + layer.maxValue) / 2, layer.unit)}</span>
                          <span>{formatValue(layer.maxValue, layer.unit)}</span>
                        </div>
                      </div>

                      {/* Current Value */}
                      {layer.currentValue !== undefined && (
                        <div className="bg-white/10 rounded-lg p-2 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70 text-xs">Valor actual:</span>
                            <span className="text-neon-teal font-bold text-sm">
                              {formatValue(layer.currentValue, layer.unit)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Opacity Control */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-white/70 text-xs">Opacidad:</label>
                          <span className="text-white text-xs">{Math.round(layer.opacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={layer.opacity}
                          onChange={(e) => onOpacityChange(layer.type, parseFloat(e.target.value))}
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Advanced Controls */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <button
                          onClick={() => setSelectedLayer(selectedLayer === layer.type ? null : layer.type)}
                          className="text-neon-teal text-xs hover:text-neon-emerald transition-colors flex items-center gap-1"
                        >
                          <Info size={12} />
                          Más opciones
                        </button>
                        
                        {selectedLayer === layer.type && (
                          <div className="mt-2 space-y-2">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <div className="text-white font-medium">Min</div>
                                <div className="text-white/60">{formatValue(layer.minValue, layer.unit)}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-medium">Prom</div>
                                <div className="text-white/60">
                                  {formatValue((layer.minValue + layer.maxValue) / 2, layer.unit)}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-medium">Max</div>
                                <div className="text-white/60">{formatValue(layer.maxValue, layer.unit)}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Global Controls */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => layers.forEach(layer => onLayerToggle(layer.type, true))}
                  className="flex-1 btn-secondary text-xs py-2"
                >
                  Mostrar Todas
                </button>
                <button
                  onClick={() => layers.forEach(layer => onLayerToggle(layer.type, false))}
                  className="flex-1 btn-secondary text-xs py-2"
                >
                  Ocultar Todas
                </button>
              </div>
            </div>

            {/* Data Source Info */}
            <div className="bg-white/5 rounded-lg p-2">
              <div className="flex items-start space-x-2">
                <Info className="w-3 h-3 text-neon-teal mt-0.5 flex-shrink-0" />
                <div className="text-xs text-white/60">
                  Datos actualizados en tiempo real desde OpenStreetMap, INE y fuentes verificadas.
                  Última actualización: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Value Display */}
      {layers.some(layer => layer.visible && layer.currentValue !== undefined) && (
        <div className="absolute -bottom-2 left-0 transform translate-y-full">
          <div className="glass-card px-3 py-2 rounded-lg mt-2">
            {layers
              .filter(layer => layer.visible && layer.currentValue !== undefined)
              .map((layer) => {
                const IconComponent = getLayerIcon(layer.type);
                return (
                  <div key={layer.type} className="flex items-center space-x-2 text-sm">
                    <IconComponent className="w-4 h-4 text-neon-teal" />
                    <span className="text-white/70">{getLayerTitle(layer.type)}:</span>
                    <span className="text-white font-medium">
                      {formatValue(layer.currentValue!, layer.unit)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0ee7e7;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(14, 231, 231, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0ee7e7;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(14, 231, 231, 0.4);
        }

        .slider::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          height: 8px;
        }

        .slider::-moz-range-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          height: 8px;
          border: none;
        }
      `}</style>
    </div>
  );
}
