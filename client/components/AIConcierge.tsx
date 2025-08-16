import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Search,
  FileText,
  Download,
  Eye,
  Filter,
  MapPin,
  Euro,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap,
  Target,
  Brain,
  Wand2,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  propertyResults?: PropertyMatch[];
  dossierGenerated?: boolean;
  audioUrl?: string;
}

interface PropertyMatch {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  roi: number;
  matchScore: number;
  reasons: string[];
  image: string;
  seaView: boolean;
  verified: boolean;
}

interface SearchCriteria {
  location?: string;
  priceRange?: { min: number; max: number };
  bedrooms?: number;
  bathrooms?: number;
  sqmRange?: { min: number; max: number };
  roiMin?: number;
  seaView?: boolean;
  propertyType?: string;
  features?: string[];
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isProcessingSearch, setIsProcessingSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample property database
  const propertyDatabase: PropertyMatch[] = [
    {
      id: "1",
      title: "Ático Premium Ocean View",
      location: "Costa Adeje, Tenerife",
      price: 1950000,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 180,
      roi: 8.2,
      matchScore: 95,
      reasons: [
        "Vista al mar panorámica",
        "ROI superior al 8%",
        "Ubicación premium Tenerife",
        "Ático exclusivo",
      ],
      image: "/placeholder.svg",
      seaView: true,
      verified: true,
    },
    {
      id: "2",
      title: "Penthouse Marina Elite",
      location: "Puerto de la Cruz, Tenerife",
      price: 2200000,
      bedrooms: 4,
      bathrooms: 3,
      sqm: 220,
      roi: 7.8,
      matchScore: 88,
      reasons: [
        "Ático de lujo",
        "Vistas al océano",
        "ROI atractivo",
        "Zona exclusiva",
      ],
      image: "/placeholder.svg",
      seaView: true,
      verified: true,
    },
    {
      id: "3",
      title: "Ático Sunset Paradise",
      location: "Los Cristianos, Tenerife",
      price: 1750000,
      bedrooms: 3,
      bathrooms: 2,
      sqm: 165,
      roi: 9.1,
      matchScore: 92,
      reasons: [
        "ROI excepcional 9.1%",
        "Vista al mar directa",
        "Ubicación turística premium",
      ],
      image: "/placeholder.svg",
      seaView: true,
      verified: true,
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      addAIMessage(
        "¡Hola! Soy tu Concierge Inmobiliario IA. Puedo ayudarte a encontrar la propiedad perfecta. " +
          "Por ejemplo, puedes decirme: 'Quiero un ático de 2M€ en Tenerife, vistas al mar, ROI >7%' y " +
          "buscaré, filtraré y crearé un dossier personalizado para ti.",
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addAIMessage = (
    content: string,
    propertyResults?: PropertyMatch[],
    dossierGenerated?: boolean,
  ) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "ai",
      content,
      timestamp: new Date(),
      propertyResults,
      dossierGenerated,
      audioUrl: audioEnabled
        ? `/api/tts/${encodeURIComponent(content)}`
        : undefined,
    };
    setMessages((prev) => [...prev, message]);
  };

  const parseCriteria = (query: string): SearchCriteria => {
    const criteria: SearchCriteria = {};
    const lowerQuery = query.toLowerCase();

    // Enhanced price extraction with multiple formats
    const pricePatterns = [
      /(\d+(?:\.\d+)?)\s*(?:m|M|millones?)€?/,
      /(\d+(?:\.\d+)?)\s*€?\s*(?:m|M|millones?)/,
      /€\s*(\d+(?:\.\d+)?)\s*(?:m|M|millones?)/,
      /presupuesto\s+(?:de\s+)?(\d+(?:\.\d+)?)\s*(?:m|M|millones?)€?/
    ];

    for (const pattern of pricePatterns) {
      const match = query.match(pattern);
      if (match) {
        const price = parseFloat(match[1]) *
          (match[0].includes('M') || match[0].includes('millones') ? 1000000 : 1);
        criteria.priceRange = { min: price * 0.85, max: price * 1.15 };
        break;
      }
    }

    // Enhanced location detection
    const locationMap = {
      'tenerife': 'Tenerife',
      'tfe': 'Tenerife',
      'gran canaria': 'Gran Canaria',
      'las palmas': 'Gran Canaria',
      'lanzarote': 'Lanzarote',
      'fuerteventura': 'Fuerteventura',
      'la palma': 'La Palma',
      'el hierro': 'El Hierro',
      'la gomera': 'La Gomera',
      'canarias': 'Canarias',
      'islas canarias': 'Canarias'
    };

    for (const [key, value] of Object.entries(locationMap)) {
      if (lowerQuery.includes(key)) {
        criteria.location = value;
        break;
      }
    }

    // Enhanced property type detection
    const propertyTypes = {
      'ático': ['ático', 'atico', 'penthouse', 'última planta'],
      'villa': ['villa', 'chalet', 'casa independiente'],
      'apartamento': ['apartamento', 'piso', 'flat'],
      'estudio': ['estudio', 'studio'],
      'dúplex': ['dúplex', 'duplex'],
      'casa': ['casa', 'vivienda unifamiliar']
    };

    for (const [type, variants] of Object.entries(propertyTypes)) {
      if (variants.some(variant => lowerQuery.includes(variant))) {
        criteria.propertyType = type;
        break;
      }
    }

    // Extract bedrooms
    const bedroomMatch = query.match(
      /(\d+)\s*(?:habitaciones?|dormitorios?|bedrooms?)/i,
    );
    if (bedroomMatch) criteria.bedrooms = parseInt(bedroomMatch[1]);

    // Extract ROI
    const roiMatch = query.match(/roi\s*[>≥]\s*(\d+(?:\.\d+)?)/i);
    if (roiMatch) criteria.roiMin = parseFloat(roiMatch[1]);

    // Extract features
    criteria.features = [];
    if (
      query.toLowerCase().includes("vista al mar") ||
      query.toLowerCase().includes("vistas al mar")
    ) {
      criteria.seaView = true;
      criteria.features.push("Vista al mar");
    }
    if (query.toLowerCase().includes("piscina"))
      criteria.features.push("Piscina");
    if (query.toLowerCase().includes("garaje"))
      criteria.features.push("Garaje");

    return criteria;
  };

  const searchProperties = (criteria: SearchCriteria): PropertyMatch[] => {
    return propertyDatabase
      .filter((property) => {
        // Location filter
        if (criteria.location && !property.location.includes(criteria.location))
          return false;

        // Price range filter
        if (criteria.priceRange) {
          if (
            property.price < criteria.priceRange.min ||
            property.price > criteria.priceRange.max
          )
            return false;
        }

        // Bedrooms filter
        if (criteria.bedrooms && property.bedrooms !== criteria.bedrooms)
          return false;

        // ROI filter
        if (criteria.roiMin && property.roi < criteria.roiMin) return false;

        // Sea view filter
        if (criteria.seaView && !property.seaView) return false;

        // Property type filter
        if (
          criteria.propertyType &&
          !property.title.toLowerCase().includes(criteria.propertyType)
        )
          return false;

        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const processAIQuery = async (query: string) => {
    setIsTyping(true);
    setIsProcessingSearch(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const criteria = parseCriteria(query);
    const results = searchProperties(criteria);

    setIsProcessingSearch(false);

    if (results.length > 0) {
      // Generate intelligent, conversational response
      const topProperty = results[0];
      const criteriaUsed = [];
      if (criteria.priceRange) criteriaUsed.push(`presupuesto de €${(criteria.priceRange.min/1000000).toFixed(1)}M-${(criteria.priceRange.max/1000000).toFixed(1)}M`);
      if (criteria.location) criteriaUsed.push(criteria.location);
      if (criteria.propertyType) criteriaUsed.push(criteria.propertyType);
      if (criteria.seaView) criteriaUsed.push('vistas al mar');
      if (criteria.roiMin) criteriaUsed.push(`ROI >${criteria.roiMin}%`);

      let responseText = `🎯 ¡Excelente! He analizado ${results.length} propiedades basándome en tus criterios: ${criteriaUsed.join(', ')}.\n\n`;

      responseText += `✨ **Destacado**: ${topProperty.title} en ${topProperty.location}\n`;
      responseText += `💰 Precio: €${topProperty.price.toLocaleString()}\n`;
      responseText += `📈 ROI: ${topProperty.roi}% (${topProperty.roi >= 7 ? '¡Supera tus expectativas!' : 'Dentro del rango'})\n`;
      responseText += `🏆 Match: ${topProperty.matchScore}%\n\n`;

      if (results.length > 1) {
        responseText += `También he encontrado ${results.length - 1} alternativas adicionales que podrían interesarte.\n\n`;
      }

      responseText += `¿Te gustaría que genere un **dossier completo** con análisis financiero, documentación legal y cronograma de visitas?`;

      addAIMessage(responseText, results);
    } else {
      // Suggest alternatives and refinements
      let responseText = `🔍 He buscado exhaustivamente pero no he encontrado propiedades que coincidan exactamente con todos tus criterios.\n\n`;

      responseText += `💡 **Sugerencias para encontrar tu propiedad ideal:**\n`;
      if (criteria.priceRange) responseText += `• Ampliar el rango de precio (±10-15%)\n`;
      if (criteria.location) responseText += `• Considerar zonas cercanas a ${criteria.location}\n`;
      if (criteria.roiMin) responseText += `• Ajustar expectativas de ROI (actualmente >${criteria.roiMin}%)\n`;

      responseText += `\n¿Te gustaría que busque opciones similares con criterios más flexibles?`;

      addAIMessage(responseText);
    }

    setIsTyping(false);
  };

  const generateDossier = async (properties: PropertyMatch[]) => {
    setIsTyping(true);

    // Simulate comprehensive dossier generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
    const avgROI = properties.reduce((sum, p) => sum + p.roi, 0) / properties.length;

    let responseText = `📋 **Dossier Inmobiliario Generado Exitosamente**\n\n`;

    responseText += `🏆 **Resumen Ejecutivo:**\n`;
    responseText += `• ${properties.length} propiedades seleccionadas\n`;
    responseText += `• Valor total de cartera: €${totalValue.toLocaleString()}\n`;
    responseText += `• ROI promedio: ${avgROI.toFixed(1)}%\n`;
    responseText += `• Ubicaciones: ${[...new Set(properties.map(p => p.location.split(',')[1]?.trim() || p.location))].join(', ')}\n\n`;

    responseText += `📊 **Contenido del Dossier:**\n`;
    responseText += `✅ Fichas técnicas detalladas de cada propiedad\n`;
    responseText += `✅ Análisis financiero y proyecciones ROI 5-10 años\n`;
    responseText += `✅ Comparativa de rentabilidad por alquiler vacacional/residencial\n`;
    responseText += `✅ Documentación legal y verificaciones notariales\n`;
    responseText += `✅ Cronograma de visitas personalizadas\n`;
    responseText += `✅ Análisis de mercado local y tendencias\n`;
    responseText += `✅ Opciones de financiación y partners bancarios\n\n`;

    responseText += `🎯 **Próximos pasos sugeridos:**\n`;
    responseText += `1. Revisar el dossier detallado\n`;
    responseText += `2. Agendar visitas virtuales VR\n`;
    responseText += `3. Coordinar visitas presenciales\n`;
    responseText += `4. Consultar con nuestro equipo legal\n\n`;

    responseText += `El dossier personalizado (${Math.ceil(properties.length * 0.8 + 2)}MB) está listo para descargar.`;

    addAIMessage(responseText, undefined, true);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue("");
    addUserMessage(userQuery);

    // Process the query
    await processAIQuery(userQuery);
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputValue(
        "Quiero un ático de 2 millones en Tenerife con vistas al mar y ROI mayor a 7%",
      );
    }, 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 rounded-2xl shadow-2xl shadow-neon-teal/30 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
      >
        <Bot className="w-8 h-8 text-white group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-3 h-3 text-white animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] glass-card border border-neon-teal/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2 shadow-lg">
              <Brain className="w-full h-full text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-1">
                IA Concierge
                <Sparkles className="w-4 h-4 text-neon-teal animate-pulse" />
              </h3>
              <p className="text-xs text-white/60">
                Búsqueda inteligente avanzada
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                audioEnabled ? "text-neon-teal" : "text-white/40"
              }`}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isProcessingSearch && (
          <div className="mt-3 flex items-center space-x-2 text-neon-teal">
            <Target className="w-4 h-4 animate-spin" />
            <span className="text-sm">
              Analizando criterios y buscando propiedades...
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === "user"
                  ? "bg-neon-teal text-blue-dark"
                  : "glass border border-white/10"
              }`}
            >
              <p className="text-sm">{message.content}</p>

              {/* Property Results */}
              {message.propertyResults && (
                <div className="mt-4 space-y-3">
                  {message.propertyResults.map((property) => (
                    <div
                      key={property.id}
                      className="glass-card p-3 rounded-xl border border-neon-teal/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white text-sm">
                          {property.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400">
                            {property.matchScore}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white/70 mb-2">
                        {property.location}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className="flex items-center space-x-1">
                          <Euro className="w-3 h-3 text-neon-teal" />
                          <span className="text-white">
                            {formatCurrency(property.price)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">
                            {property.roi}% ROI
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bed className="w-3 h-3 text-white/60" />
                          <span className="text-white/80">
                            {property.bedrooms} dorm
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="w-3 h-3 text-white/60" />
                          <span className="text-white/80">
                            {property.sqm}m²
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {property.reasons.slice(0, 2).map((reason, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-white/80">
                              {reason}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <button className="text-xs text-neon-teal hover:text-neon-emerald transition-colors flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Ver detalles
                        </button>
                        {property.verified && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">
                              Verificada
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => generateDossier(message.propertyResults!)}
                    className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2 mt-3"
                  >
                    <Wand2 className="w-4 h-4" />
                    Generar Dossier Completo
                  </button>
                </div>
              )}

              {/* Dossier Generated */}
              {message.dossierGenerated && (
                <div className="mt-4 glass-card p-3 rounded-xl border border-green-500/30 bg-green-500/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold text-green-400">
                      Dossier Generado
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mb-3">
                    Documento completo con análisis financiero, comparativas y
                    cronograma de visitas
                  </p>
                  <button className="w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Descargar PDF (2.4 MB)
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-white/40">
                  {message.timestamp.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {message.audioUrl && audioEnabled && (
                  <button className="text-xs text-neon-teal hover:text-neon-emerald transition-colors">
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="glass border border-white/10 p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-neon-teal rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-neon-teal rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ej: Ático 2M€ en Tenerife, vista mar, ROI >7%"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-neon-teal pr-10"
            />
            <button
              onClick={startVoiceRecognition}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                isListening
                  ? "text-red-400 animate-pulse"
                  : "text-white/60 hover:text-neon-teal"
              }`}
            >
              {isListening ? (
                <Mic className="w-4 h-4" />
              ) : (
                <MicOff className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-neon-teal hover:bg-neon-emerald disabled:opacity-50 disabled:cursor-not-allowed text-blue-dark p-3 rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center mt-2 space-x-2">
          <button
            onClick={() => {
              setInputValue("Villa de €1.5M en Tenerife con vistas al mar y ROI >6%");
            }}
            className="text-xs text-neon-teal hover:text-neon-emerald transition-colors bg-neon-teal/10 px-2 py-1 rounded"
          >
            Villa €1.5M Tenerife
          </button>
          <button
            onClick={() => {
              setInputValue("Apartamento con ROI mayor a 8% en Gran Canaria, máximo €800k");
            }}
            className="text-xs text-neon-teal hover:text-neon-emerald transition-colors bg-neon-teal/10 px-2 py-1 rounded"
          >
            Apartamento ROI &gt;8%
          </button>
          <button
            onClick={() => {
              setInputValue("Ático de 2M€ en Tenerife, vistas al mar, ROI >7%");
            }}
            className="text-xs text-neon-teal hover:text-neon-emerald transition-colors bg-neon-teal/10 px-2 py-1 rounded"
          >
            Ático 2M€ vista mar
          </button>
        </div>
      </div>
    </div>
  );
}
