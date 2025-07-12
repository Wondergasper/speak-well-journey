
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Play, 
  Clock, 
  Target, 
  Award, 
  Star,
  Filter,
  BookOpen,
  Mic,
  Brain,
  Heart,
  Zap,
  TrendingUp,
  CheckCircle,
  Bookmark,
  BookmarkPlus,
  Sparkles,
  Users,
  Timer,
  BarChart3
} from 'lucide-react';
import { exercisesBySeverity, Exercise } from '@/data/exercises';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const navigate = useNavigate();

  // Mock user progress data
  const userProgress = {
    completedExercises: 23,
    totalExercises: 47,
    currentStreak: 5,
    favoriteCategory: 'Breathing Techniques'
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const allExercises = Object.values(exercisesBySeverity).flat();
      setExercises(allExercises);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = exercises;

    if (searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.severity === severityFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === categoryFilter);
    }

    setFilteredExercises(filtered);
  }, [exercises, severityFilter, categoryFilter, searchTerm]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
      case 'mild':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
      case 'B':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'C':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/session-exercise`, { state: { exercise } });
  };

  const toggleFavorite = (exerciseId: string) => {
    setFavorites(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const categories = [
    { id: 'all', name: 'All Exercises', icon: BookOpen, color: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: 'breathing', name: 'Breathing Techniques', icon: Heart, color: 'bg-gradient-to-br from-green-500 to-emerald-600' },
    { id: 'fluency', name: 'Fluency Shaping', icon: TrendingUp, color: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 'confidence', name: 'Confidence Building', icon: Star, color: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
    { id: 'articulation', name: 'Articulation', icon: Mic, color: 'bg-gradient-to-br from-red-500 to-pink-600' },
    { id: 'cognitive', name: 'Cognitive Training', icon: Brain, color: 'bg-gradient-to-br from-indigo-500 to-blue-600' }
  ];

  const getUniqueCategories = () => Array.from(new Set(exercises.map(exercise => exercise.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading exercises...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-therapy-purple-500 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Speech Therapy Exercises
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Evidence-based exercises tailored to your stuttering severity level. 
              Start your journey to fluent speech today.
            </p>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{userProgress.completedExercises}/{userProgress.totalExercises}</div>
                <div className="text-white/80">Exercises Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{userProgress.currentStreak}</div>
                <div className="text-white/80">Day Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{Math.round((userProgress.completedExercises / userProgress.totalExercises) * 100)}%</div>
                <div className="text-white/80">Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exercise Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl text-center transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'ring-2 ring-therapy-purple-500 shadow-lg scale-105'
                    : 'hover:scale-105 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Filter Exercises</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueCategories().map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSeverityFilter('all');
                setCategoryFilter('all');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Exercises
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredExercises.length} of {exercises.length} exercises
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-therapy-purple-100 text-therapy-purple-800 dark:bg-therapy-purple-900/20 dark:text-therapy-purple-300">
              <Sparkles className="h-3 w-3 mr-1" />
              Evidence-Based
            </Badge>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-therapy-purple-200 dark:hover:border-therapy-purple-800 overflow-hidden"
              onClick={() => handleExerciseClick(exercise)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 group-hover:text-therapy-purple-600 transition-colors">
                      {exercise.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getSeverityColor(exercise.severity)}>
                        {exercise.severity.charAt(0).toUpperCase() + exercise.severity.slice(1)}
                      </Badge>
                      <Badge className={getEvidenceLevelColor(exercise.evidence_level)}>
                        Level {exercise.evidence_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {favorites.includes(exercise.id) ? (
                        <Bookmark className="h-4 w-4 text-therapy-purple-500 fill-current" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="sm" variant="ghost" className="group-hover:bg-therapy-purple-100 dark:group-hover:bg-therapy-purple-900/20">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                  {exercise.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2 text-therapy-purple-500" />
                    {exercise.duration_minutes} minutes
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Target className="h-4 w-4 mr-2 text-therapy-purple-500" />
                    {exercise.category}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 mr-2 text-therapy-purple-500" />
                    {exercise.target_skills}
                  </div>
                </div>

                {/* Progress indicator for completed exercises */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-therapy-purple-600 font-medium">Ready to Start</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExercises.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No exercises found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find the exercises you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSeverityFilter('all');
                setCategoryFilter('all');
              }}
              className="bg-therapy-purple-500 hover:bg-therapy-purple-700"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Recommended Section */}
        {filteredExercises.length > 0 && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-therapy-purple-50 to-blue-50 dark:from-therapy-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Recommended for You
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your progress and preferences
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-therapy-purple-100 dark:bg-therapy-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-therapy-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Daily Practice</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Maintain your streak with daily exercises
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skill Building</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Focus on your weakest areas
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Connect with others on similar journeys
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
