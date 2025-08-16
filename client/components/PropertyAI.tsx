import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  MessageSquare,
  FileText,
  Download,
  Share2,
  Euro,
  Calculator,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Calendar,
  Shield,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Eye,
  Home,
  Zap,
} from "lucide-react";

interface PropertyAIProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    category: string;
    energyRating?: string;
    yearBuilt?: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  actionType?: "pdf" | "share" | "calculation" | "info";
  actionData?: any;
}

export default function PropertyAI({
  property,
  isOpen,
  onClose,
}: PropertyAIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      addAIMessage(
        `¡Hola! Soy tu asistente IA especializado en ${property.title}. Puedo ayudarte con:\n\n` +
          `🏠 Información detallada de la propiedad\n` +
          `💰 Cálculos financieros y rentabilidad\n` +
          `📋 Generar dossier PDF personalizado\n` +
          `📤 Compartir información\n` +
          `📍 Detalles de ubicación y servicios\n` +
          `⚖️ Aspectos legales y documentación\n\n` +
          `¿En qué puedo ayudarte específicamente?`,
      );
    }
  }, [isOpen, property]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    actionType?: string,
    actionData?: any,
  ) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "ai",
      content,
      timestamp: new Date(),
      actionType: actionType as any,
      actionData,
    };
    setMessages((prev) => [...prev, message]);
  };

  const processQuery = async (query: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerQuery = query.toLowerCase();

    // Property information queries
    if (
      lowerQuery.includes("precio") ||
      lowerQuery.includes("cuesta") ||
      lowerQuery.includes("vale")
    ) {
      const response =
        `💰 **Información de Precio:**\n\n` +
        `• Precio: €${property.price.toLocaleString()}\n` +
        `• Precio por m²: €${Math.round(property.price / property.sqm).toLocaleString()}/m²\n` +
        `• Superficie: ${property.sqm}m²\n\n` +
        `Este precio está **alineado con el mercado** según nuestro análisis. ¿Te gustaría que genere un **análisis financiero completo** con opciones de financiación?`;

      addAIMessage(response, "calculation", {
        price: property.price,
        sqm: property.sqm,
      });
    }

    // PDF generation queries
    else if (
      lowerQuery.includes("dossier") ||
      lowerQuery.includes("pdf") ||
      lowerQuery.includes("documentos")
    ) {
      const response =
        `📋 **Generación de Dossier PDF**\n\n` +
        `Puedo crear un dossier completo de ${property.title} que incluye:\n\n` +
        `✅ Ficha técnica detallada\n` +
        `✅ Galería de fotos en alta resolución\n` +
        `✅ Planos y distribución\n` +
        `✅ Análisis financiero y opciones de financiación\n` +
        `✅ Información legal y documentación\n` +
        `✅ Análisis del mercado local\n` +
        `✅ Información de la zona y servicios\n\n` +
        `¿Te gustaría que genere el dossier personalizado ahora?`;

      addAIMessage(response, "pdf", { propertyId: property.id });
    }

    // Sharing queries
    else if (
      lowerQuery.includes("compartir") ||
      lowerQuery.includes("enviar") ||
      lowerQuery.includes("share")
    ) {
      const response =
        `📤 **Compartir Propiedad**\n\n` +
        `Puedo ayudarte a compartir ${property.title} de varias formas:\n\n` +
        `🔗 **Enlace directo** - Para enviar por WhatsApp, email, etc.\n` +
        `📱 **Redes sociales** - Optimizado para Instagram, Facebook\n` +
        `📧 **Email profesional** - Con toda la información técnica\n` +
        `💼 **Presentación comercial** - Para presentar a clientes\n\n` +
        `¿Cómo te gustaría compartirla?`;

      addAIMessage(response, "share", {
        url: `${window.location.origin}/property/${property.id}`,
      });
    }

    // Location and area queries
    else if (
      lowerQuery.includes("ubicación") ||
      lowerQuery.includes("zona") ||
      lowerQuery.includes("servicios") ||
      lowerQuery.includes("transporte")
    ) {
      const response =
        `📍 **Información de Ubicación: ${property.location}**\n\n` +
        `🏥 **Servicios cercanos:**\n` +
        `• Hospital Universitario - 1.2 km\n` +
        `• Centro comercial - 800m\n` +
        `• Supermercados - 300m\n\n` +
        `🚌 **Transporte:**\n` +
        `• Parada de guagua - 150m\n` +
        `• Aeropuerto Sur - 15 min\n` +
        `• Centro Las Palmas - 25 min\n\n` +
        `🎓 **Educación:**\n` +
        `• Colegios públicos - 500m\n` +
        `• Instituto - 800m\n` +
        `• Universidad - 12 km\n\n` +
        `¿Te interesa información específica sobre algún servicio?`;

      addAIMessage(response);
    }

    // Investment and ROI queries
    else if (
      lowerQuery.includes("inversión") ||
      lowerQuery.includes("rentabilidad") ||
      lowerQuery.includes("roi") ||
      lowerQuery.includes("alquiler")
    ) {
      const estimatedROI = 7.5;
      const monthlyRental = Math.round(property.price * 0.005);

      const response =
        `📈 **Análisis de Inversión**\n\n` +
        `💰 **Rentabilidad estimada:**\n` +
        `• ROI anual: ~${estimatedROI}%\n` +
        `• Alquiler mensual estimado: €${monthlyRental.toLocaleString()}\n` +
        `• Ingresos anuales: €${(monthlyRental * 12).toLocaleString()}\n\n` +
        `🎯 **Potencial de revalorización:**\n` +
        `• Zona en crecimiento: +3-5% anual\n` +
        `• Demanda turística alta\n` +
        `• Infraestructuras en desarrollo\n\n` +
        `¿Te gustaría un **análisis financiero detallado** con diferentes escenarios?`;

      addAIMessage(response, "calculation", {
        roi: estimatedROI,
        rental: monthlyRental,
      });
    }

    // Legal and documentation queries
    else if (
      lowerQuery.includes("legal") ||
      lowerQuery.includes("documentos") ||
      lowerQuery.includes("escritura") ||
      lowerQuery.includes("notaría")
    ) {
      const response =
        `⚖️ **Aspectos Legales y Documentación**\n\n` +
        `📄 **Documentación disponible:**\n` +
        `✅ Escritura de propiedad al día\n` +
        `✅ Nota simple registral actualizada\n` +
        `✅ IBI y tasas municipales al corriente\n` +
        `✅ Certificado energético vigente\n` +
        `✅ Cédula de habitabilidad\n\n` +
        `🏛️ **Proceso de compra:**\n` +
        `• Arras/Señal: 10% del precio\n` +
        `• Notaría: ~1% del valor\n` +
        `• Registro: ~0.5% del valor\n` +
        `• Gestión: incluida\n\n` +
        `¿Necesitas información sobre algún documento específico?`;

      addAIMessage(response);
    }

    // General information queries
    else {
      const response =
        `🏠 **Información de ${property.title}**\n\n` +
        `📋 **Características principales:**\n` +
        `• ${property.bedrooms} dormitorios, ${property.bathrooms} baños\n` +
        `• ${property.sqm}m² construidos\n` +
        `• Tipo: ${property.category}\n` +
        `• Ubicación: ${property.location}\n` +
        `${property.energyRating ? `• Certificación energética: ${property.energyRating}\n` : ""}` +
        `${property.yearBuilt ? `• Año construcción: ${property.yearBuilt}\n` : ""}\n` +
        `💡 **Puedo ayudarte con:**\n` +
        `• Análisis financiero detallado\n` +
        `• Información de la zona\n` +
        `• Proceso de compra\n` +
        `• Generar dossier completo\n\n` +
        `¿Sobre qué aspecto específico te gustaría saber más?`;

      addAIMessage(response);
    }

    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue("");
    addUserMessage(userQuery);

    await processQuery(userQuery);
  };

  const handleActionClick = (actionType: string, actionData: any) => {
    switch (actionType) {
      case "pdf":
        // Simulate PDF generation
        addAIMessage(
          `🎉 ¡Dossier generado exitosamente!\n\nTu dossier personalizado de ${property.title} está listo para descargar. Incluye toda la información técnica, legal y financiera.`,
          "pdf",
          { ready: true },
        );
        break;
      case "share":
        // Copy to clipboard
        navigator.clipboard.writeText(actionData.url);
        addAIMessage(
          `📋 ¡Enlace copiado al portapapeles!\n\nYa puedes compartir ${property.title} pegando el enlace en WhatsApp, email o redes sociales.`,
        );
        break;
      case "calculation":
        addAIMessage(
          `📊 Generando análisis financiero detallado con simulaciones de financiación, cálculos de ROI a 5 y 10 años, y comparativas del mercado...`,
        );
        break;
    }
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInputValue("¿Cuál es la rentabilidad de esta propiedad?");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card border border-neon-teal/30 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2 shadow-lg">
                <Bot className="w-full h-full text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center gap-1">
                  IA Propiedad
                  <Sparkles className="w-4 h-4 text-neon-teal animate-pulse" />
                </h3>
                <p className="text-xs text-white/60">{property.title}</p>
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
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
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
                <p className="text-sm whitespace-pre-line">{message.content}</p>

                {/* Action Buttons */}
                {message.actionType && (
                  <div className="mt-3 flex gap-2">
                    {message.actionType === "pdf" && (
                      <button
                        onClick={() =>
                          handleActionClick("pdf", message.actionData)
                        }
                        className="btn-primary text-xs px-3 py-2 flex items-center gap-2"
                      >
                        <Download className="w-3 h-3" />
                        {message.actionData?.ready
                          ? "Descargar PDF"
                          : "Generar Dossier"}
                      </button>
                    )}
                    {message.actionType === "share" && (
                      <button
                        onClick={() =>
                          handleActionClick("share", message.actionData)
                        }
                        className="btn-secondary text-xs px-3 py-2 flex items-center gap-2"
                      >
                        <Share2 className="w-3 h-3" />
                        Copiar enlace
                      </button>
                    )}
                    {message.actionType === "calculation" && (
                      <button
                        onClick={() =>
                          handleActionClick("calculation", message.actionData)
                        }
                        className="btn-secondary text-xs px-3 py-2 flex items-center gap-2"
                      >
                        <Calculator className="w-3 h-3" />
                        Ver análisis completo
                      </button>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-white/40">
                    {message.timestamp.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
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
                placeholder="Pregunta sobre la propiedad..."
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

          <div className="flex justify-center mt-2 space-x-3">
            <button
              onClick={() =>
                setInputValue("¿Cuál es el precio y las condiciones de pago?")
              }
              className="text-xs text-neon-teal hover:text-neon-emerald transition-colors"
            >
              💰 Precio
            </button>
            <button
              onClick={() => setInputValue("Genera el dossier completo en PDF")}
              className="text-xs text-neon-teal hover:text-neon-emerald transition-colors"
            >
              📋 Dossier
            </button>
            <button
              onClick={() =>
                setInputValue("¿Cuál es la rentabilidad de inversión?")
              }
              className="text-xs text-neon-teal hover:text-neon-emerald transition-colors"
            >
              📈 ROI
            </button>
            <button
              onClick={() =>
                setInputValue("Información de la zona y servicios")
              }
              className="text-xs text-neon-teal hover:text-neon-emerald transition-colors"
            >
              📍 Zona
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
