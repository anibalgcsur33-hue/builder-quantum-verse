import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  FileText,
  Globe,
  Download,
  Minimize2,
  Maximize2,
  Image,
  MapPin,
  Euro,
  Calendar,
  Phone,
  Mail,
  Eye,
  Sparkles,
} from "lucide-react";

interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "action" | "property" | "document";
  metadata?: any;
}

interface AIChatbotProps {
  propertyId?: string;
  context?: "home" | "property" | "community" | "marketplace";
}

export default function AIChatbot({
  propertyId,
  context = "home",
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content:
        context === "property"
          ? `¡Hola! Soy tu asistente IA especializado en esta propiedad. Puedo ayudarte con información detallada, generar un dossier PDF o publicar el anuncio en portales extranjeros. ¿En qué puedo ayudarte?`
          : `¡Hola! Soy tu asistente IA de BlueEyeHomes. Puedo ayudarte a encontrar propiedades, responder dudas, generar documentos y mucho más. ¿Cómo puedo asistirte hoy?`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, context, propertyId);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (
    userMessage: string,
    context: string,
    propertyId?: string,
  ): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();

    // Context-specific responses
    if (context === "property" && propertyId) {
      if (lowerMessage.includes("pdf") || lowerMessage.includes("dossier")) {
        return {
          id: Date.now(),
          content:
            "Perfecto, voy a generar un dossier PDF completo con todas las fotos, planos y detalles de esta propiedad. El documento incluirá información legal, características técnicas y opciones de financiación.",
          sender: "ai",
          timestamp: new Date(),
          type: "action",
          metadata: {
            actions: [
              {
                label: "Generar PDF Básico",
                icon: FileText,
                action: "generate_basic_pdf",
              },
              {
                label: "PDF Premium con Legal",
                icon: Download,
                action: "generate_premium_pdf",
              },
              {
                label: "PDF Personalizado",
                icon: FileText,
                action: "generate_custom_pdf",
              },
            ],
          },
        };
      }

      if (
        lowerMessage.includes("portal") ||
        lowerMessage.includes("publicar") ||
        lowerMessage.includes("extranjero")
      ) {
        return {
          id: Date.now(),
          content:
            "Excelente idea. Puedo publicar esta propiedad automáticamente en los principales portales inmobiliarios internacionales. Esto aumentará significativamente la visibilidad.",
          sender: "ai",
          timestamp: new Date(),
          type: "action",
          metadata: {
            actions: [
              {
                label: "Publicar en Europa",
                icon: Globe,
                action: "publish_europe",
              },
              {
                label: "Portales Globales",
                icon: Globe,
                action: "publish_global",
              },
              {
                label: "Configurar Idiomas",
                icon: Globe,
                action: "setup_languages",
              },
            ],
          },
        };
      }

      if (
        lowerMessage.includes("precio") ||
        lowerMessage.includes("financiación") ||
        lowerMessage.includes("hipoteca")
      ) {
        return {
          id: Date.now(),
          content:
            "Esta propiedad tiene un precio de €1.250.000. Puedo ayudarte con opciones de financiación, incluido el cálculo de hipoteca y pagos en criptomonedas. También ofrecemos condiciones especiales para inversores internacionales.",
          sender: "ai",
          timestamp: new Date(),
          type: "property",
          metadata: {
            property: {
              price: 1250000,
              monthlyPayment: 4800,
              cryptoOptions: ["Bitcoin", "Ethereum", "USDT"],
              financing: "70% financiación disponible",
            },
          },
        };
      }
    }

    // General responses
    if (
      lowerMessage.includes("buscar") ||
      lowerMessage.includes("propiedad") ||
      lowerMessage.includes("villa") ||
      lowerMessage.includes("apartamento")
    ) {
      return {
        id: Date.now(),
        content:
          "Te ayudo a encontrar la propiedad perfecta. ¿Qué tipo de inmueble buscas y en qué zona? Puedo filtrar por precio, características y mostrar solo propiedades con tours VR disponibles.",
        sender: "ai",
        timestamp: new Date(),
        type: "action",
        metadata: {
          actions: [
            { label: "Buscar Villas", icon: MapPin, action: "search_villas" },
            {
              label: "Apartamentos Lujo",
              icon: MapPin,
              action: "search_apartments",
            },
            { label: "Propiedades VR", icon: Eye, action: "search_vr" },
          ],
        },
      };
    }

    if (
      lowerMessage.includes("crypto") ||
      lowerMessage.includes("bitcoin") ||
      lowerMessage.includes("token")
    ) {
      return {
        id: Date.now(),
        content:
          "Somos pioneros en pagos cripto inmobiliarios. Aceptamos Bitcoin, Ethereum, USDT y nuestro token BlueEye. Los pagos en crypto ofrecen ventajas fiscales y transacciones más rápidas.",
        sender: "ai",
        timestamp: new Date(),
        type: "action",
        metadata: {
          actions: [
            {
              label: "Ver Tokens Aceptados",
              icon: Euro,
              action: "view_crypto_options",
            },
            {
              label: "Calculadora Crypto",
              icon: Euro,
              action: "crypto_calculator",
            },
            {
              label: "Info Token BlueEye",
              icon: Sparkles,
              action: "blueeye_token_info",
            },
          ],
        },
      };
    }

    if (
      lowerMessage.includes("visita") ||
      lowerMessage.includes("cita") ||
      lowerMessage.includes("agendar")
    ) {
      return {
        id: Date.now(),
        content:
          "Perfecto, puedo ayudarte a agendar una visita. Ofrecemos visitas presenciales con agente local y tours VR privados con guía en tiempo real. ¿Cuál prefieres?",
        sender: "ai",
        timestamp: new Date(),
        type: "action",
        metadata: {
          actions: [
            {
              label: "Visita Presencial",
              icon: Calendar,
              action: "schedule_physical",
            },
            { label: "Tour VR Privado", icon: Eye, action: "schedule_vr" },
            {
              label: "Llamada con Agente",
              icon: Phone,
              action: "schedule_call",
            },
          ],
        },
      };
    }

    // Default response
    const responses = [
      "¡Excelente pregunta! Como tu asistente IA especializado en real estate, puedo ayudarte con información detallada sobre cualquier propiedad, procesos de compra, financiación y mucho más.",
      "Estoy aquí para hacer tu experiencia inmobiliaria más fácil. Puedo generar documentos, buscar propiedades específicas, calcular hipotecas y conectarte con nuestros agentes humanos.",
      "Perfecto, puedo asistirte con eso. Tengo acceso a toda la base de datos de propiedades, información legal actualizada y herramientas de análisis de mercado.",
    ];

    return {
      id: Date.now(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    };
  };

  const handleActionClick = (action: string) => {
    console.log("AI Action:", action);

    // Simulate action execution
    const actionMessage: ChatMessage = {
      id: Date.now(),
      content: `Ejecutando: ${action}... Te notificaré cuando esté completo.`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, actionMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir chat con IA"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>

        {/* Main button */}
        <div className="relative w-16 h-16 rounded-full glass-card backdrop-blur-xl border border-white/20 flex items-center justify-center hover-glow-teal group-hover:scale-110 transition-all duration-300">
          <Bot
            className="text-neon-teal group-hover:text-white transition-colors"
            size={28}
          />

          {/* Floating sparkles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-emerald rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neon-teal rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-blue-dark/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Hablar con IA especializada
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-dark/90"></div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed right-6 z-50 transition-all duration-300 ${
        isMinimized ? "bottom-6 w-80 h-16" : "bottom-6 w-96 h-[600px]"
      }`}
    >
      {/* Main Chat Container */}
      <div className="h-full glass-card backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20 border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-teal to-neon-emerald flex items-center justify-center">
                  <Bot className="text-blue-dark" size={20} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-emerald rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-white">IA BlueEyeHomes</h3>
                <p className="text-white/70 text-sm">
                  {context === "property"
                    ? "Especialista en esta propiedad"
                    : "Asistente inmobiliario 24/7"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isMinimized ? "Maximizar" : "Minimizar"}
              >
                {isMinimized ? (
                  <Maximize2 size={16} />
                ) : (
                  <Minimize2 size={16} />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-neon-teal text-blue-dark rounded-2xl rounded-br-lg"
                        : "glass-card rounded-2xl rounded-bl-lg"
                    } p-4`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.sender === "ai" && (
                        <Bot
                          className="text-neon-teal flex-shrink-0 mt-1"
                          size={16}
                        />
                      )}
                      <div className="flex-1">
                        <p
                          className={`${msg.sender === "user" ? "text-blue-dark" : "text-white/90"}`}
                        >
                          {msg.content}
                        </p>

                        {/* Action Buttons */}
                        {msg.type === "action" && msg.metadata?.actions && (
                          <div className="mt-3 space-y-2">
                            {msg.metadata.actions.map(
                              (action: any, index: number) => {
                                const IconComponent = action.icon;
                                return (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      handleActionClick(action.action)
                                    }
                                    className="w-full flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left"
                                  >
                                    <IconComponent
                                      className="text-neon-teal"
                                      size={16}
                                    />
                                    <span className="text-white/90">
                                      {action.label}
                                    </span>
                                  </button>
                                );
                              },
                            )}
                          </div>
                        )}

                        {/* Property Info */}
                        {msg.type === "property" && msg.metadata?.property && (
                          <div className="mt-3 p-3 bg-white/10 rounded-lg">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-white/70">Precio:</span>
                                <div className="text-neon-teal font-bold">
                                  €
                                  {msg.metadata.property.price.toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <span className="text-white/70">Mensual:</span>
                                <div className="text-white/90">
                                  €{msg.metadata.property.monthlyPayment}/mes
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <p
                          className={`text-xs mt-2 ${
                            msg.sender === "user"
                              ? "text-blue-dark/70"
                              : "text-white/50"
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-bl-lg p-4">
                    <div className="flex items-center gap-2">
                      <Bot className="text-neon-teal" size={16} />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/20 p-4">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Pregunta sobre propiedades, precios, tours VR..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className="w-12 h-12 bg-gradient-to-r from-neon-teal to-neon-emerald rounded-xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="text-blue-dark" size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
