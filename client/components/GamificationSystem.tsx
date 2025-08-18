import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Trophy,
  Star,
  Crown,
  Shield,
  Eye,
  MessageCircle,
  CheckCircle,
  UserPlus,
  Home,
  Award,
  TrendingUp,
  Zap,
  Gift,
  Coins,
  Target,
  Calendar,
} from "lucide-react";

interface UserLevel {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  icon: any;
  color: string;
  benefits: string[];
  description: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  points: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  achieved: boolean;
  achievedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: string;
  points: number;
  rank: number;
  totalUsers: number;
  behTokens: number;
  achievements: Achievement[];
  activities: {
    posts: number;
    comments: number;
    verifications: number;
    invites: number;
    operationsClosed: number;
    vrToursCompleted: number;
  };
}

interface GamificationSystemProps {
  userStats: UserStats;
  compact?: boolean;
}

export default function GamificationSystem({
  userStats,
  compact = false,
}: GamificationSystemProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const levels: UserLevel[] = [
    {
      id: "explorador",
      name: "Explorador",
      minPoints: 0,
      maxPoints: 999,
      icon: Eye,
      color: "text-blue-400",
      benefits: [
        "Acceso básico a tours VR",
        "Participación en foro",
        "5% descuento en servicios",
      ],
      description: "Nuevo en la comunidad, explorando las posibilidades",
    },
    {
      id: "comprador-pro",
      name: "Comprador Pro",
      minPoints: 1000,
      maxPoints: 4999,
      icon: Home,
      color: "text-purple-400",
      benefits: [
        "Tours VR premium",
        "Acceso prioritario a nuevos listados",
        "15% descuento en servicios",
        "50 BEH tokens mensuales",
      ],
      description: "Comprador experimentado con historial verificado",
    },
    {
      id: "agente-confiable",
      name: "Agente Confiable",
      minPoints: 5000,
      maxPoints: Infinity,
      icon: Crown,
      color: "text-yellow-400",
      benefits: [
        "Acceso VIP a todas las propiedades",
        "Listados prioritarios",
        "25% descuento en servicios",
        "200 BEH tokens mensuales",
        "Eventos exclusivos",
        "Verificación premium",
      ],
      description: "Miembro elite de la comunidad con máxima confianza",
    },
  ];

  const pointsActivities = [
    { action: "Publicar contenido", points: 10, icon: MessageCircle },
    { action: "Comentar en posts", points: 5, icon: MessageCircle },
    { action: "Verificar propiedad", points: 50, icon: CheckCircle },
    { action: "Invitar nuevo miembro", points: 100, icon: UserPlus },
    { action: "Cerrar operación", points: 500, icon: Home },
    { action: "Completar tour VR", points: 20, icon: Eye },
  ];

  const getCurrentLevel = () => {
    return (
      levels.find(
        (level) =>
          userStats.points >= level.minPoints &&
          (level.maxPoints === Infinity || userStats.points <= level.maxPoints),
      ) || levels[0]
    );
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const currentIndex = levels.findIndex((l) => l.id === currentLevel.id);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const getProgressToNextLevel = () => {
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;

    const currentLevel = getCurrentLevel();
    const progress =
      ((userStats.points - currentLevel.minPoints) /
        (nextLevel.minPoints - currentLevel.minPoints)) *
      100;
    return Math.min(progress, 100);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-400/10";
      case "rare":
        return "border-blue-400 bg-blue-400/10";
      case "epic":
        return "border-purple-400 bg-purple-400/10";
      case "legendary":
        return "border-yellow-400 bg-yellow-400/10";
      default:
        return "border-gray-400 bg-gray-400/10";
    }
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progress = getProgressToNextLevel();

  if (compact) {
    return (
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2 flex items-center justify-center`}
            >
              <currentLevel.icon
                className={`w-full h-full ${currentLevel.color}`}
              />
            </div>
            <div>
              <div className="font-bold text-white">{currentLevel.name}</div>
              <div className="text-sm text-white/60">
                <CountUp end={userStats.points} duration={2} separator="," /> puntos
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-yellow-400">
                <CountUp end={userStats.behTokens} duration={2.5} separator="," />
              </span>
            </div>
            <div className="text-xs text-white/60">BEH Tokens</div>
          </div>
        </div>

        {nextLevel && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">Progreso a {nextLevel.name}</span>
              <span className="text-white/60">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Level Status Header */}
      <div className="glass-card p-6 rounded-2xl border border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg`}
            >
              <currentLevel.icon
                className={`w-full h-full ${currentLevel.color}`}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {currentLevel.name}
              </h3>
              <p className="text-white/70">{currentLevel.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">
                    <CountUp end={userStats.points} duration={2} separator="," /> puntos
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span className="text-white/60">
                    Rango #<CountUp end={userStats.rank} duration={1.5} /> de <CountUp end={userStats.totalUsers} duration={2} separator="," />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="w-6 h-6 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">
                <CountUp end={userStats.behTokens} duration={2.5} separator="," />
              </span>
            </div>
            <div className="text-white/60">BEH Tokens</div>
          </div>
        </div>

        {nextLevel && (
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/70">Progreso a {nextLevel.name}</span>
              <span className="text-white/70">
                <CountUp end={userStats.points} duration={2} separator="," /> / <CountUp end={nextLevel.minPoints} duration={2} separator="," />
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-white/60">
              <CountUp end={nextLevel.minPoints - userStats.points} duration={2} separator="," /> puntos para el siguiente
              nivel
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 glass-card p-1 rounded-xl">
        {[
          { id: "overview", label: "Resumen", icon: Target },
          { id: "achievements", label: "Logros", icon: Award },
          { id: "rewards", label: "Recompensas", icon: Gift },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Points Activities */}
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-xl font-bold text-white mb-4">
              Cómo ganar puntos
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pointsActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-purple-400" />
                      <span className="text-white">{activity.action}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-purple-400">
                        +{activity.points}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-xl font-bold text-white mb-4">Tu actividad</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.posts} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Posts</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.comments} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Comentarios</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.verifications} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Verificaciones</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <UserPlus className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.invites} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Invitaciones</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <Home className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.operationsClosed} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Operaciones</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <CountUp end={userStats.activities.vrToursCompleted} duration={2} />
                </div>
                <div className="text-white/60 text-sm">Tours VR</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="glass-card p-6 rounded-2xl">
          <h4 className="text-xl font-bold text-white mb-6">
            Logros desbloqueados
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStats.achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 ${getRarityColor(achievement.rarity)} ${
                    achievement.achieved ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <IconComponent
                      className={`w-8 h-8 ${
                        achievement.rarity === "legendary"
                          ? "text-yellow-400"
                          : achievement.rarity === "epic"
                            ? "text-purple-400"
                            : achievement.rarity === "rare"
                              ? "text-blue-400"
                              : "text-gray-400"
                      }`}
                    />
                    <div>
                      <div className="font-bold text-white">
                        {achievement.name}
                      </div>
                      <div className="text-sm text-white/60">
                        {achievement.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">
                        {achievement.points}
                      </span>
                    </div>
                    {achievement.achieved && achievement.achievedAt && (
                      <div className="text-xs text-white/60">
                        {new Date(achievement.achievedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {achievement.progress !== undefined &&
                    achievement.maxProgress && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Progreso</span>
                          <span className="text-white/60">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "rewards" && (
        <div className="space-y-6">
          {/* Current Level Benefits */}
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-xl font-bold text-white mb-4">
              Beneficios de tu nivel actual
            </h4>
            <div className="space-y-3">
              {currentLevel.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Level Preview */}
          {nextLevel && (
            <div className="glass-card p-6 rounded-2xl border border-purple-500/20">
              <h4 className="text-xl font-bold text-white mb-4">
                Próximos beneficios en {nextLevel.name}
              </h4>
              <div className="space-y-3">
                {nextLevel.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-purple-400"></div>
                    <span className="text-white/70">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-500/20 rounded-lg">
                <div className="text-purple-400 font-medium">
                  ¡Faltan solo <CountUp end={nextLevel.minPoints - userStats.points} duration={2} separator="," /> puntos
                  para desbloquearlo!
                </div>
              </div>
            </div>
          )}

          {/* Token Marketplace */}
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-xl font-bold text-white mb-4">
              Canjear BEH Tokens
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">5% descuento adicional</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">50</span>
                  </div>
                </div>
                <button className="w-full btn-secondary text-sm py-2">
                  Canjear
                </button>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Acceso VR premium</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">100</span>
                  </div>
                </div>
                <button className="w-full btn-secondary text-sm py-2">
                  Canjear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
