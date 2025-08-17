import { useState } from "react";
import {
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Reply,
  Send,
  User,
  Clock,
  CheckCircle,
  Shield,
  Award,
  Filter,
  TrendingUp,
  Eye,
  Crown,
  Heart,
  Share,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react";

interface PropertyQuestion {
  id: string;
  question: string;
  answer?: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    verified: boolean;
  };
  answeredBy?: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  timestamp: string;
  answeredAt?: string;
  likes: number;
  isLiked: boolean;
  category: 'general' | 'legal' | 'financial' | 'neighborhood' | 'technical';
  replies?: PropertyQuestion[];
}

interface PropertyReview {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    verified: boolean;
  };
  timestamp: string;
  visitDate: string;
  visitType: 'physical' | 'vr' | 'both';
  helpful: number;
  notHelpful: number;
  isHelpful?: boolean;
  isVerified: boolean;
  images?: string[];
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
}

interface PropertyCommunityProps {
  propertyId: string;
  questions: PropertyQuestion[];
  reviews: PropertyReview[];
  averageRating: number;
  totalReviews: number;
  canLeaveReview: boolean;
  hasVisited: boolean;
}

export default function PropertyCommunity({
  propertyId,
  questions,
  reviews,
  averageRating,
  totalReviews,
  canLeaveReview,
  hasVisited
}: PropertyCommunityProps) {
  const [activeTab, setActiveTab] = useState<'questions' | 'reviews'>('questions');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newQuestion, setNewQuestion] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

  const questionCategories = [
    { id: 'all', label: 'Todas', count: questions.length },
    { id: 'general', label: 'General', count: questions.filter(q => q.category === 'general').length },
    { id: 'legal', label: 'Legal', count: questions.filter(q => q.category === 'legal').length },
    { id: 'financial', label: 'Financiero', count: questions.filter(q => q.category === 'financial').length },
    { id: 'neighborhood', label: 'Vecindario', count: questions.filter(q => q.category === 'neighborhood').length },
    { id: 'technical', label: 'Técnico', count: questions.filter(q => q.category === 'technical').length },
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal': return 'text-red-400 bg-red-400/20';
      case 'financial': return 'text-green-400 bg-green-400/20';
      case 'neighborhood': return 'text-blue-400 bg-blue-400/20';
      case 'technical': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'agente-confiable': return Crown;
      case 'comprador-pro': return Award;
      default: return User;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'agente-confiable': return 'text-yellow-400';
      case 'comprador-pro': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const submitQuestion = () => {
    if (!newQuestion.trim()) return;
    
    // Implementation for submitting question
    console.log('Submitting question:', newQuestion);
    setNewQuestion('');
  };

  const likeQuestion = (questionId: string) => {
    // Implementation for liking question
    console.log('Liking question:', questionId);
  };

  const markHelpful = (reviewId: string, helpful: boolean) => {
    // Implementation for marking review as helpful
    console.log('Marking review:', reviewId, 'as helpful:', helpful);
  };

  const reportContent = (contentId: string, type: 'question' | 'review') => {
    // Implementation for reporting content
    console.log('Reporting content:', contentId, 'type:', type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Comunidad</h3>
          <p className="text-white/70">Preguntas, respuestas y reseñas de la comunidad</p>
        </div>
        
        {canLeaveReview && hasVisited && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Escribir Reseña
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 glass-card p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === 'questions'
              ? 'bg-purple-500 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Preguntas & Respuestas</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{questions.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === 'reviews'
              ? 'bg-purple-500 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Reseñas</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{reviews.length}</span>
        </button>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Ask Question Form */}
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-lg font-bold text-white mb-4">Hacer una pregunta</h4>
            <div className="space-y-4">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="¿Qué te gustaría saber sobre esta propiedad?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center">
                <div className="text-white/60 text-sm">
                  Obtén respuestas de expertos y otros miembros de la comunidad
                </div>
                <button
                  onClick={submitQuestion}
                  disabled={!newQuestion.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Preguntar
                </button>
              </div>
            </div>
          </div>

          {/* Question Categories */}
          <div className="flex flex-wrap gap-3">
            {questionCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question) => {
              const LevelIcon = getLevelIcon(question.author.level);
              const levelColor = getLevelColor(question.author.level);
              const categoryColor = getCategoryColor(question.category);

              return (
                <div key={question.id} className="glass-card p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={question.author.avatar}
                        alt={question.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{question.author.name}</span>
                          <LevelIcon className={`w-4 h-4 ${levelColor}`} />
                          {question.author.verified && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <div className="text-white/60 text-sm">
                          {new Date(question.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
                        {question.category}
                      </div>
                      <button
                        onClick={() => reportContent(question.id, 'question')}
                        className="text-white/40 hover:text-white/60"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white text-lg">{question.question}</p>
                  </div>

                  {question.answer && question.answeredBy && (
                    <div className="bg-white/5 p-4 rounded-lg mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={question.answeredBy.avatar}
                          alt={question.answeredBy.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">{question.answeredBy.name}</span>
                            <span className="text-purple-400 text-sm">{question.answeredBy.role}</span>
                            {question.answeredBy.verified && (
                              <Shield className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <div className="text-white/60 text-sm">
                            Respondió el {new Date(question.answeredAt!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/90">{question.answer}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => likeQuestion(question.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        question.isLiked
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{question.likes}</span>
                    </button>
                    
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm px-3 py-2 flex items-center gap-1">
                        <Reply className="w-4 h-4" />
                        Responder
                      </button>
                      <button className="btn-secondary text-sm px-3 py-2 flex items-center gap-1">
                        <Share className="w-4 h-4" />
                        Compartir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Reviews Summary */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-white/60">Basado en {totalReviews} reseñas</div>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-white/60 text-sm w-8">{stars}★</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-sm w-8">{count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">
                    {Math.round((reviews.filter(r => r.wouldRecommend).length / totalReviews) * 100)}%
                  </div>
                  <div className="text-white/60 text-sm">Lo recomendarían</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">
                    {reviews.filter(r => r.isVerified).length}
                  </div>
                  <div className="text-white/60 text-sm">Reseñas verificadas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {[
                { id: 'recent', label: 'Más recientes' },
                { id: 'helpful', label: 'Más útiles' },
                { id: 'rating', label: 'Mejor valoradas' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id as any)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    sortBy === option.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => {
              const LevelIcon = getLevelIcon(review.author.level);
              const levelColor = getLevelColor(review.author.level);

              return (
                <div key={review.id} className="glass-card p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.author.avatar}
                        alt={review.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{review.author.name}</span>
                          <LevelIcon className={`w-4 h-4 ${levelColor}`} />
                          {review.author.verified && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                          {review.isVerified && (
                            <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                              Visita verificada
                            </div>
                          )}
                        </div>
                        <div className="text-white/60 text-sm">
                          {new Date(review.timestamp).toLocaleDateString()} • 
                          Visitó el {new Date(review.visitDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => reportContent(review.id, 'review')}
                        className="text-white/40 hover:text-white/60"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3">{review.title}</h4>
                  <p className="text-white/80 mb-4">{review.content}</p>

                  {review.pros.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-green-400 font-semibold mb-2">Pros:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-white/70 text-sm">{pro}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {review.cons.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-red-400 font-semibold mb-2">Contras:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-white/70 text-sm">{con}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => markHelpful(review.id, true)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          review.isHelpful === true
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful}</span>
                      </button>
                      <button
                        onClick={() => markHelpful(review.id, false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          review.isHelpful === false
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{review.notHelpful}</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>Visita {review.visitType === 'physical' ? 'presencial' : review.visitType === 'vr' ? 'VR' : 'presencial + VR'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notice for non-visited users */}
      {!hasVisited && (
        <div className="glass-card p-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <h4 className="font-bold text-white">Visita la propiedad para dejar una reseña</h4>
              <p className="text-white/70">
                Para mantener la calidad de las reseñas, solo los usuarios que han visitado la propiedad
                (presencial o VR) pueden escribir reseñas verificadas.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
