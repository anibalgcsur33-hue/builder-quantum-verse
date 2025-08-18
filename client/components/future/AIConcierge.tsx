import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

const CAN_TTS = "speechSynthesis" in window;
const CAN_STT =
  "webkitSpeechRecognition" in (window as any) ||
  "SpeechRecognition" in (window as any);

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hola, soy BlueEye. ¿Qué propiedad te muestro en VR o AR?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recRef = useRef<any>(null);
  const speakingRef = useRef(false);

  // abrir desde otros componentes: window.dispatchEvent(new CustomEvent("blueeye:assistant"))
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("blueeye:assistant", onOpen);
    return () => window.removeEventListener("blueeye:assistant", onOpen);
  }, []);

  function speak(text: string) {
    if (!CAN_TTS) return;
    const utter = new SpeechSynthesisUtterance(text);
    const v = speechSynthesis
      .getVoices()
      .find((v) => /es|spanish/i.test(v.lang));
    if (v) utter.voice = v;
    utter.rate = 0.98;
    utter.pitch = 1.05;
    utter.volume = 0.9;
    utter.onstart = () => {
      speakingRef.current = true;
      setIsSpeaking(true);
    };
    utter.onend = () => {
      speakingRef.current = false;
      setIsSpeaking(false);
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }

  function fakeAI(answerTo: string) {
    // Aquí puedes llamar tu backend real (fetch('/api/ai', {body:JSON.stringify({q:answerTo})}))
    // Demo premium con heurística inmobiliaria:
    const q = answerTo.toLowerCase();
    if (q.includes("tener") || q.includes("tenerife"))
      return "Tengo 14 villas en Tenerife con VR listos. ¿Te muestro las vistas al mar primero o las de acantilado?";
    if (q.includes("marbella"))
      return "Marbella tiene 8 propiedades premium disponibles. ¿Prefieres villa con piscina infinita o penthouse con terraza?";
    if (q.includes("madrid"))
      return "En Madrid tengo 12 penthouses exclusivos en Salamanca y Chamberí. ¿Quieres ver el tour virtual 360°?";
    if (q.includes("barcelona"))
      return "Barcelona ofrece 6 lofts de lujo en Eixample. ¿Te interesa ver las vistas al Sagrada Familia?";
    if (q.includes("ar") || q.includes("realidad aumentada"))
      return "Pulsa 'Entrar en AR' y coloca la maqueta en tu mesa. Te acompaño paso a paso con instrucciones de voz.";
    if (q.includes("vr") || q.includes("virtual"))
      return "Activando portal VR inmersivo. ¿Tienes cascos VR o prefieres modo navegador 3D?";
    if (q.includes("dossier") || q.includes("información"))
      return "Puedo crear un dossier PDF premium con fotos 4K, mapa 3D interactivo y proyección de ROI a 5 y 10 años. ¿Para qué propiedad?";
    if (
      q.includes("hipoteca") ||
      q.includes("financi") ||
      q.includes("préstamo")
    )
      return "Puedo iniciar preaprobación bancaria express en 2 minutos. ¿País de residencia fiscal y rango presupuestario?";
    if (q.includes("metaverso"))
      return "Abriendo portal metaverso con tour guiado premium. Prepárate para una experiencia única.";
    if (q.includes("precio") || q.includes("cost"))
      return "Los precios van desde €850K hasta €12M. ¿Qué rango de inversión tienes en mente?";
    if (q.includes("canarias"))
      return "Las Islas Canarias tienen beneficios fiscales únicos. ¿Te interesa la Zona Especial Canaria para inversores?";
    if (q.includes("invertir") || q.includes("inversión"))
      return "Como experto en inversión inmobiliaria premium, puedo mostrarte propiedades con ROI del 8-12% anual. ¿Prefieres rentabilidad o plusvalía?";
    return "Entendido. ¿Quieres ver propiedades verificadas premium, iniciar un tour VR inmersivo o generar un dossier de inversión?";
  }

  function onAsk(text: string) {
    const t = text.trim();
    if (!t) return;
    setList((l) => [...l, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      const a = fakeAI(t);
      setList((l) => [...l, { role: "assistant", text: a }]);
      speak(a);
    }, 350);
  }

  function startSTT() {
    if (!CAN_STT || isListening) return;
    const R: any =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const rec = new R();
    rec.lang = "es-ES";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setIsListening(false);
      onAsk(text);
    };
    rec.onerror = () => {
      setIsListening(false);
    };
    rec.onend = () => {
      recRef.current = null;
      setIsListening(false);
    };
    recRef.current = rec;
    rec.start();
  }

  function stopSpeaking() {
    if (CAN_TTS) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      speakingRef.current = false;
    }
  }

  return (
    <>
      {/* botón flotante premium */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 transition-all duration-300 shadow-2xl border-2 ${
          open
            ? "bg-gradient-to-tr from-purple-500 to-cyan-400 border-white/30 scale-110"
            : "bg-gradient-to-tr from-cyan-400 to-violet-500 border-white/20 hover:scale-105"
        }`}
        title="Concierge IA BlueEye"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {isSpeaking && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping" />
          )}
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
          )}
          <span className="text-2xl">🤖</span>
          {(isSpeaking || isListening) && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          )}
        </div>
      </button>

      {/* panel premium */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,420px)] rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl shadow-2xl">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-sm">
                👁️
              </div>
              <div>
                <div className="font-bold text-white">BlueEye Concierge</div>
                <div className="text-xs text-white/60">
                  Asistente Premium IA
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-white/60 hover:text-white text-sm px-2 py-1 rounded"
                  title="Detener voz"
                >
                  🔇
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white w-6 h-6 flex items-center justify-center rounded"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-blue-900/10">
            {list.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-white/15 self-end ml-8 border border-white/20"
                    : "bg-gradient-to-r from-cyan-500/15 to-purple-500/15 mr-8 border border-cyan-400/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs opacity-60">
                    {m.role === "user" ? "👤" : "🤖"}
                  </span>
                  <span>{m.text}</span>
                </div>
              </div>
            ))}
            {isSpeaking && (
              <div className="text-center text-xs text-cyan-400 animate-pulse">
                🔊 Reproduciendo respuesta...
              </div>
            )}
          </div>

          <div className="p-4 bg-gradient-to-r from-black/40 to-blue-900/20">
            <div className="flex gap-2 mb-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onAsk(input)}
                placeholder="Pregúntame sobre propiedades premium..."
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none text-white placeholder-white/50 focus:border-cyan-400/50 focus:bg-white/15 transition-all"
                disabled={isListening}
              />
              <button
                onClick={() => onAsk(input)}
                disabled={!input.trim() || isListening}
                className="rounded-xl px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📤
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startSTT}
                disabled={!CAN_STT || isListening}
                className={`flex-1 rounded-xl px-4 py-3 border font-medium transition-all ${
                  isListening
                    ? "border-red-400 bg-red-500/20 text-red-300 animate-pulse"
                    : CAN_STT
                      ? "border-white/20 hover:border-cyan-400/50 hover:bg-white/10 text-white"
                      : "border-white/10 text-white/40 cursor-not-allowed"
                }`}
                title={
                  isListening
                    ? "Escuchando... (Habla ahora)"
                    : CAN_STT
                      ? "Activar micrófono"
                      : "STT no soportado en este navegador"
                }
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span>{isListening ? "🔴" : "🎙️"}</span>
                  <span>{isListening ? "Escuchando..." : "Hablar"}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  const examples = [
                    "Muéstrame villas en Tenerife",
                    "Quiero ver propiedades en Marbella",
                    "Necesito información de financiación",
                    "Activa el tour VR",
                  ];
                  const random =
                    examples[Math.floor(Math.random() * examples.length)];
                  setInput(random);
                }}
                className="rounded-xl px-4 py-3 border border-white/20 hover:border-purple-400/50 hover:bg-white/10 text-white font-medium transition-all"
                title="Pregunta de ejemplo"
              >
                🎲
              </button>
            </div>
          </div>

          {/* Indicadores de capacidades */}
          <div className="px-4 py-2 border-t border-white/10 bg-gradient-to-r from-black/60 to-blue-900/30">
            <div className="flex justify-center gap-4 text-xs text-white/50">
              <span className={CAN_TTS ? "text-green-400" : "text-red-400"}>
                🔊 {CAN_TTS ? "TTS ✓" : "TTS ✗"}
              </span>
              <span className={CAN_STT ? "text-green-400" : "text-red-400"}>
                🎙️ {CAN_STT ? "STT ✓" : "STT ✗"}
              </span>
              <span className="text-cyan-400">🤖 IA ✓</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
