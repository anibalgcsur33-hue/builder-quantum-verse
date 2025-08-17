import { useState, useEffect, useRef } from "react";
import {
  Users,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  Share2,
  MessageCircle,
  Hand,
  Eye,
  MapPin,
  Crown,
  Shield,
  User,
  Settings,
  PhoneCall,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  Headphones,
  Speaker,
  X,
  Plus,
  Link,
  Copy,
  CheckCircle,
} from "lucide-react";

interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  role: 'client' | 'agent' | 'admin' | 'expert';
  status: 'active' | 'idle' | 'away';
  position: {
    x: number;
    y: number;
    z: number;
    rotation: { x: number; y: number; z: number };
  };
  pointer?: {
    x: number;
    y: number;
    visible: boolean;
    color: string;
  };
  audio: {
    isMuted: boolean;
    isDeafened: boolean;
    volume: number;
    isVoiceActive: boolean;
  };
  video: {
    isEnabled: boolean;
    isScreenSharing: boolean;
  };
  permissions: {
    canControl: boolean;
    canAnnotate: boolean;
    canInvite: boolean;
  };
  joinedAt: string;
  lastActivity: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  type: 'text' | 'annotation' | 'system';
  target?: { x: number; y: number; z: number };
}

interface MultiplayerControllerProps {
  currentUser: ConnectedUser;
  connectedUsers: ConnectedUser[];
  chatMessages: ChatMessage[];
  sessionId: string;
  onUserUpdate: (user: Partial<ConnectedUser>) => void;
  onChatMessage: (message: string) => void;
  onAnnotate: (position: { x: number; y: number; z: number }, text: string) => void;
  onInviteUser: (email: string) => void;
  onEndSession: () => void;
  className?: string;
}

export default function MultiplayerController({
  currentUser,
  connectedUsers,
  chatMessages,
  sessionId,
  onUserUpdate,
  onChatMessage,
  onAnnotate,
  onInviteUser,
  onEndSession,
  className = "",
}: MultiplayerControllerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  
  const chatRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Scroll chat to bottom when new messages arrive
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    // Get available audio/video devices
    navigator.mediaDevices?.enumerateDevices().then(devices => {
      setAudioDevices(devices.filter(device => device.kind === 'audioinput'));
      setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
    });
  }, []);

  const getUserRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'agent': return Shield;
      case 'expert': return User;
      default: return User;
    }
  };

  const getUserRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-yellow-400';
      case 'agent': return 'text-purple-400';
      case 'expert': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'idle': return 'bg-yellow-400';
      case 'away': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const toggleMute = async () => {
    try {
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = currentUser.audio.isMuted;
        onUserUpdate({
          audio: { ...currentUser.audio, isMuted: !currentUser.audio.isMuted }
        });
      }
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  };

  const toggleDeafen = () => {
    onUserUpdate({
      audio: { ...currentUser.audio, isDeafened: !currentUser.audio.isDeafened }
    });
  };

  const toggleVideo = async () => {
    try {
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !currentUser.video.isEnabled;
        onUserUpdate({
          video: { ...currentUser.video, isEnabled: !currentUser.video.isEnabled }
        });
      }
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (currentUser.video.isScreenSharing) {
        // Stop screen sharing
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      } else {
        // Start screen sharing
        streamRef.current = await navigator.mediaDevices.getDisplayMedia({ video: true });
      }
      
      onUserUpdate({
        video: { ...currentUser.video, isScreenSharing: !currentUser.video.isScreenSharing }
      });
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      onChatMessage(chatInput.trim());
      setChatInput("");
    }
  };

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const copySessionLink = async () => {
    const sessionLink = `${window.location.origin}/metaverse-map?session=${sessionId}`;
    try {
      await navigator.clipboard.writeText(sessionLink);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const inviteUser = () => {
    if (inviteEmail.trim()) {
      onInviteUser(inviteEmail.trim());
      setInviteEmail("");
      setShowInvite(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed bottom-4 left-4 z-40 ${className}`}>
      {/* Main Control Panel */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Users className="w-6 h-6 text-neon-teal" />
                <div className="absolute -top-1 -right-1 bg-neon-teal text-blue-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {connectedUsers.length + 1}
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">Sesión Colaborativa</h3>
                <p className="text-white/60 text-sm">ID: {sessionId.slice(-8)}</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isExpanded ? <X size={20} /> : <Users size={20} />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Audio/Video Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-all ${
                  currentUser.audio.isMuted
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
                title={currentUser.audio.isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
              >
                {currentUser.audio.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <button
                onClick={toggleDeafen}
                className={`p-2 rounded-lg transition-all ${
                  currentUser.audio.isDeafened
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
                title={currentUser.audio.isDeafened ? 'Activar audio' : 'Silenciar audio'}
              >
                {currentUser.audio.isDeafened ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-2 rounded-lg transition-all ${
                  currentUser.video.isEnabled
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
                title={currentUser.video.isEnabled ? 'Desactivar cámara' : 'Activar cámara'}
              >
                {currentUser.video.isEnabled ? <Video size={16} /> : <VideoOff size={16} />}
              </button>

              <button
                onClick={toggleScreenShare}
                className={`p-2 rounded-lg transition-all ${
                  currentUser.video.isScreenSharing
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
                title={currentUser.video.isScreenSharing ? 'Detener compartir pantalla' : 'Compartir pantalla'}
              >
                {currentUser.video.isScreenSharing ? <ScreenShareOff size={16} /> : <ScreenShare size={16} />}
              </button>

              <div className="flex-1"></div>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-lg transition-all ${
                  showChat ? 'bg-neon-teal text-blue-dark' : 'bg-white/10 text-white/70'
                }`}
                title="Toggle chat"
              >
                <MessageCircle size={16} />
              </button>

              <button
                onClick={() => setShowInvite(!showInvite)}
                className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                title="Invitar usuarios"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Connected Users */}
            <div className="space-y-2">
              <h4 className="text-white/70 font-medium text-sm">Usuarios conectados:</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {/* Current User */}
                <div className="flex items-center space-x-3 p-2 bg-neon-teal/20 rounded-lg">
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-blue-dark ${getStatusColor(currentUser.status)}`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm">{currentUser.name}</span>
                      <span className="text-neon-teal text-xs">(Tú)</span>
                      {React.createElement(getUserRoleIcon(currentUser.role), {
                        className: `w-3 h-3 ${getUserRoleColor(currentUser.role)}`,
                      })}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {currentUser.audio.isVoiceActive && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                    {currentUser.video.isScreenSharing && (
                      <ScreenShare className="w-3 h-3 text-purple-400" />
                    )}
                  </div>
                </div>

                {/* Other Users */}
                {connectedUsers.map((user) => {
                  const RoleIcon = getUserRoleIcon(user.role);
                  return (
                    <div key={user.id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-blue-dark ${getStatusColor(user.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium text-sm">{user.name}</span>
                          <RoleIcon className={`w-3 h-3 ${getUserRoleColor(user.role)}`} />
                        </div>
                        <div className="text-white/60 text-xs">
                          Conectado {formatTime(user.joinedAt)}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {user.audio.isVoiceActive && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                        {user.video.isScreenSharing && (
                          <ScreenShare className="w-3 h-3 text-purple-400" />
                        )}
                        {user.audio.isMuted && (
                          <MicOff className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Session Controls */}
            <div className="flex space-x-2">
              <button
                onClick={copySessionLink}
                className={`flex-1 p-2 rounded-lg text-sm transition-all ${
                  isLinkCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {isLinkCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 inline mr-2" />
                    Copiar enlace
                  </>
                )}
              </button>
              <button
                onClick={onEndSession}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                title="Finalizar sesión"
              >
                <PhoneOff size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-4 w-80">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold">Chat Colaborativo</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="h-64 flex flex-col">
            {/* Messages */}
            <div ref={chatRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <img
                      src={message.userAvatar}
                      alt={message.userName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-white/90 font-medium text-sm">{message.userName}</span>
                    <span className="text-white/40 text-xs">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className={`text-sm p-2 rounded-lg ${
                    message.type === 'system'
                      ? 'bg-blue-500/20 text-blue-300'
                      : message.type === 'annotation'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-white/10 text-white/90'
                  }`}>
                    {message.message}
                    {message.target && (
                      <div className="flex items-center mt-1 text-xs text-white/60">
                        <MapPin size={12} className="mr-1" />
                        Anotación en mapa
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-neon-teal"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-lg bg-neon-teal text-blue-dark hover:bg-neon-emerald transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Panel */}
      {showInvite && (
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-4 w-80">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold">Invitar Usuarios</h3>
              <button
                onClick={() => setShowInvite(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Email del usuario:</label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-neon-teal"
                />
                <button
                  onClick={inviteUser}
                  disabled={!inviteEmail.trim()}
                  className="p-2 rounded-lg bg-neon-teal text-blue-dark hover:bg-neon-emerald transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-white/60 text-sm mb-2">O comparte el enlace directo:</p>
              <button
                onClick={copySessionLink}
                className="w-full p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all text-sm"
              >
                <Copy className="w-4 h-4 inline mr-2" />
                Copiar enlace de sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
