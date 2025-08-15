import { useState, useEffect } from "react";
import {
  Lock,
  Shield,
  Clock,
  Coins,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Download,
  Sparkles,
  Wallet,
  QrCode,
  FileText,
  Calendar,
  X,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
}

interface NFTReservationProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

interface ReservationData {
  nftId: string;
  expiryTime: Date;
  blockchainTxHash: string;
  legalDocument: string;
  reservationAmount: number;
}

export default function NFTReservation({
  property,
  isOpen,
  onClose,
}: NFTReservationProps) {
  const [step, setStep] = useState<
    "connect" | "confirm" | "processing" | "success"
  >("connect");
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Calculate reservation amount (0.5% of property price, minimum 5000€)
  const reservationAmount = Math.max(property.price * 0.005, 5000);

  useEffect(() => {
    if (reservation) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = reservation.expiryTime.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining("Expirado");
          clearInterval(timer);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [reservation]);

  const connectWallet = async () => {
    // Simulate wallet connection
    setStep("processing");
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0x1a2b...8f9e");
      setStep("confirm");
    }, 2000);
  };

  const confirmReservation = async () => {
    setStep("processing");

    // Simulate NFT minting and blockchain transaction
    setTimeout(() => {
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 48);

      const reservationData: ReservationData = {
        nftId: `BE-NFT-${Date.now()}`,
        expiryTime,
        blockchainTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        legalDocument: `LD-${property.id}-${Date.now()}`,
        reservationAmount,
      };

      setReservation(reservationData);
      setStep("success");
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadLegalDocument = () => {
    // Simulate legal document download
    console.log("Downloading legal document:", reservation?.legalDocument);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card border border-neon-teal/30 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-teal via-neon-emerald to-blue-600 p-2.5 shadow-lg shadow-neon-teal/30">
                <Shield className="w-full h-full text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Reserva NFT
                  <Sparkles className="w-5 h-5 text-neon-teal animate-pulse" />
                </h2>
                <p className="text-white/60 text-sm">
                  Bloqueo legal con tecnología blockchain
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Property Info */}
          <div className="glass p-4 rounded-xl mb-6">
            <h3 className="font-bold text-white mb-2">{property.title}</h3>
            <p className="text-white/70 text-sm mb-2">{property.location}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-neon-teal">
                €{property.price.toLocaleString()}
              </span>
              <div className="text-right">
                <div className="text-sm text-white/60">Señal NFT</div>
                <div className="font-bold text-white">
                  €{reservationAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === "connect" && (
            <div className="space-y-6">
              <div className="text-center">
                <Wallet className="w-16 h-16 text-neon-teal mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Conectar Wallet
                </h3>
                <p className="text-white/70 text-sm">
                  Conecta tu wallet para crear el NFT de reserva
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={connectWallet}
                  className="w-full glass-card p-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MM</span>
                    </div>
                    <span className="text-white font-medium">MetaMask</span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/60" />
                </button>

                <button className="w-full glass-card p-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">WC</span>
                    </div>
                    <span className="text-white font-medium">
                      WalletConnect
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="glass p-4 rounded-xl bg-gradient-to-r from-neon-teal/10 to-neon-emerald/10 border border-neon-teal/20">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-neon-teal mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      ¿Qué es una Reserva NFT?
                    </h4>
                    <p className="text-white/70 text-sm">
                      El NFT funciona como un comprobante legal inmutable de tu
                      señal. Te garantiza prioridad de compra durante 48 horas y
                      es válido ante notaría.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Wallet Conectado
                </h3>
                <p className="text-white/70 text-sm">{walletAddress}</p>
              </div>

              <div className="space-y-4">
                <div className="glass p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-3">
                    Detalles de la Reserva
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Duración:</span>
                      <span className="text-white font-medium">48 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Señal NFT:</span>
                      <span className="text-neon-teal font-bold">
                        €{reservationAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Gas fees (est.):</span>
                      <span className="text-white">~€15</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-white font-bold">
                        €{(reservationAmount + 15).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-1">
                        Condiciones Legales
                      </h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>
                          • La señal se descontará del precio final de compra
                        </li>
                        <li>• Válida por 48 horas desde la confirmación</li>
                        <li>• No reembolsable si no se completa la compra</li>
                        <li>• Comprobante legal válido ante notaría</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={confirmReservation}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Confirmar Reserva NFT
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 rounded-full border-4 border-neon-teal/30 border-t-neon-teal animate-spin mx-auto"></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Procesando NFT
                </h3>
                <p className="text-white/70 text-sm">
                  Creando tu reserva en blockchain...
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-white/60">
                  • Mintiendo NFT de reserva
                </div>
                <div className="text-sm text-white/60">
                  • Generando documento legal
                </div>
                <div className="text-sm text-white/60">
                  • Confirmando en blockchain
                </div>
              </div>
            </div>
          )}

          {step === "success" && reservation && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  ¡Reserva Confirmada!
                </h3>
                <p className="text-white/70 text-sm">
                  Tu NFT de reserva ha sido creado exitosamente
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="glass p-4 rounded-xl bg-gradient-to-r from-neon-teal/20 to-neon-emerald/20">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-neon-teal mx-auto mb-2" />
                  <div className="text-sm text-white/70 mb-1">
                    Tiempo restante:
                  </div>
                  <div className="text-2xl font-bold text-neon-teal">
                    {timeRemaining}
                  </div>
                </div>
              </div>

              {/* NFT Details */}
              <div className="space-y-4">
                <div className="glass p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-3">
                    Detalles del NFT
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">NFT ID:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">
                          {reservation.nftId}
                        </span>
                        <button
                          onClick={() => copyToClipboard(reservation.nftId)}
                          className="text-neon-teal hover:text-neon-emerald transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Tx Hash:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">
                          {reservation.blockchainTxHash.substring(0, 10)}...
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(reservation.blockchainTxHash)
                          }
                          className="text-neon-teal hover:text-neon-emerald transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={`https://etherscan.io/tx/${reservation.blockchainTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-teal hover:text-neon-emerald transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Documento Legal:</span>
                      <button
                        onClick={downloadLegalDocument}
                        className="flex items-center space-x-2 text-neon-teal hover:text-neon-emerald transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Descargar</span>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="glass-card p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5 text-neon-teal" />
                    <span className="text-white text-sm">QR Code</span>
                  </button>
                  <button className="glass-card p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5 text-neon-teal" />
                    <span className="text-white text-sm">Agendar</span>
                  </button>
                </div>

                <button onClick={onClose} className="w-full btn-secondary">
                  Continuar Navegando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
