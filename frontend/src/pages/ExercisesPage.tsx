
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Play, Clock, Target, Award } from 'lucide-react';
import { exercisesBySeverity, Exercise } from '@/data/exercises';
import { useNavigate } from 'react-router-dom';

const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const navigate = useNavigate();

  useEffect(() => {
    // Get all exercises from all severities
    const allExercises = Object.values(exercisesBySeverity).flat();
    setExercises(allExercises);
  }, []);

  useEffect(() => {
    let filtered = exercises;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (severityFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.severity === severityFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === categoryFilter);
    }

    setFilteredExercises(filtered);
  }, [exercises, severityFilter, categoryFilter, searchTerm]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'mild':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'severe':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'B':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'C':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/session/exercise/${exercise.id}`, { state: { exercise } });
  };

  // Get unique categories
  const categories = Array.from(new Set(exercises.map(exercise => exercise.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Speech Therapy Exercises
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Evidence-based exercises tailored to your stuttering severity level
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Severity" />
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
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredExercises.length} of {exercises.length} exercises
          </p>
        </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{exercise.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getSeverityColor(exercise.severity)}>
                      {exercise.severity}
                    </Badge>
                    <Badge className={getEvidenceLevelColor(exercise.evidence_level)}>
                      Level {exercise.evidence_level}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="ml-2">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
                </CardHeader>
                <CardContent>
              <CardDescription className="mb-4 line-clamp-3">
                {exercise.description}
              </CardDescription>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {exercise.duration_minutes} minutes
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Target className="h-4 w-4 mr-2" />
                  {exercise.category}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Award className="h-4 w-4 mr-2" />
                  {exercise.target_skills}
                </div>
                  </div>
                </CardContent>
              </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No exercises found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;
