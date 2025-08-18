import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Brain,
  Home,
  TrendingUp,
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "¿Qué propiedades tienen vista al mar?",
  "Opciones de inversión en Madrid",
  "Lifestyle premium en España",
  "Tours virtuales disponibles",
];

const aiResponses = [
  "¡Hola! Soy BlueEye Assistant, tu experto en propiedades premium de España. ¿En qué puedo ayudarte hoy?",
  "Tenemos increíbles propiedades con vista al mar en Costa del Sol y Baleares. ¿Te interesa alguna zona específica?",
  "Madrid ofrece excelentes oportunidades de inversión, especialmente en Salamanca y Chamberí. ¿Cuál es tu presupuesto?",
  "El lifestyle premium en España incluye golf, gastronomía Michelin y cultura. ¿Qué experiencias te interesan más?",
  "Nuestros tours VR te permiten explorar propiedades desde cualquier parte del mundo. ¿Quieres programar uno?",
];

export default function AIChatPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "¡Hola! Soy BlueEye Assistant, tu experto en propiedades premium de España. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Portal Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-neural rounded-full shadow-lg ring-glow flex items-center justify-center z-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>

        {/* Pulse indicator */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/30"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Portal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-[600px] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-neural rounded-full flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        BlueEye Assistant
                      </h3>
                      <p className="text-xs text-white/70">
                        Tu experto inmobiliario IA
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          : "glass text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-white/70"
                            : "text-white/50"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass p-3 rounded-2xl">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-white/10">
                  <p className="text-white/70 text-sm mb-3">
                    Preguntas sugeridas:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="p-2 text-xs text-left glass rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage(inputValue)
                    }
                    placeholder="Pregúntame sobre propiedades, inversión o lifestyle..."
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 pt-2 border-t border-white/10">
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleSuggestedQuestion("Mostrar propiedades disponibles")
                    }
                    className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-xs text-white hover:bg-white/10 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    Propiedades
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleSuggestedQuestion("Información de inversión")
                    }
                    className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-xs text-white hover:bg-white/10 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Inversión
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleSuggestedQuestion("Tours virtuales premium")
                    }
                    className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-xs text-white hover:bg-white/10 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Tours VR
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
