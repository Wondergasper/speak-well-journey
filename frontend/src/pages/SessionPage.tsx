import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Clock, Target, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { exercisesAPI } from '@/services/api';

const SessionPage: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]); // Changed type to any[] as Exercise type is removed
  const [userSeverity, setUserSeverity] = useState<string>('mild');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user severity from localStorage or default to mild
    const storedSeverity = localStorage.getItem('userSeverity') || 'mild';
    setUserSeverity(storedSeverity);

    // Fetch exercises for user's severity from backend
    const fetchExercises = async () => {
      try {
        const exercises = await exercisesAPI.getAll({ severity: storedSeverity });
        setExercises(exercises);
      } catch (err) {
        setExercises([]);
      }
    };
    fetchExercises();
  }, []);

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

  const handleExerciseClick = (exercise: any) => { // Changed type to any
    navigate(`/session/exercise/${exercise.id}`, { state: { exercise } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          to="/dashboard" 
          className="text-gray-500 hover:text-blue-600 flex items-center mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Speech Therapy Session
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Exercises tailored for {userSeverity} stuttering severity
        </p>
        
        <div className="flex items-center gap-2 mb-6">
          <Badge className={getSeverityColor(userSeverity)}>
            {userSeverity} severity
          </Badge>
          <span className="text-sm text-gray-500">
            {exercises.length} exercises available
          </span>
        </div>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No exercises available for your severity level.
          </p>
          <Link 
            to="/exercises" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Browse all exercises
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
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
      )}
    </div>
  );
};

export default SessionPage;
