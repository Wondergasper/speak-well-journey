// src/pages/SessionExercisePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Play, Clock, Target, Award, BookOpen, CheckCircle } from 'lucide-react';
import { Exercise } from '@/data/exercises';

const SessionExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [fluencyRating, setFluencyRating] = useState<number>(3);
  const [confidenceRating, setConfidenceRating] = useState<number>(3);

  useEffect(() => {
    if (location.state?.exercise) {
      setExercise(location.state.exercise as Exercise);
    } else if (id) {
      // Fallback: find exercise by ID from all exercises
      const allExercises = Object.values(require('@/data/exercises').exercisesBySeverity).flat();
      const foundExercise = allExercises.find((ex: Exercise) => ex.id === parseInt(id)) as Exercise | undefined;
      if (foundExercise) {
        setExercise(foundExercise);
      }
    }
  }, [id, location.state]);

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

  const handleComplete = async () => {
    if (!exercise) return;

    try {
      // Save completion data to localStorage (temporary until backend supports it)
      const completionData = {
        exerciseId: exercise.id,
        completedAt: new Date().toISOString(),
        fluencyRating,
        confidenceRating,
        notes,
        severity: exercise.severity
      };

      const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '[]');
      completedExercises.push(completionData);
      localStorage.setItem('completedExercises', JSON.stringify(completedExercises));

      setIsCompleted(true);
      
      // Navigate back to session page after a short delay
      setTimeout(() => {
        navigate('/session');
      }, 2000);
    } catch (error) {
      console.error('Error saving completion:', error);
    }
  };

  if (!exercise) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Exercise not found.</p>
          <Button onClick={() => navigate('/session')} className="mt-4">
            Back to Session
          </Button>
        </div>
      </div>
    );
  }

  const { title, description, videoUrl, instructions, duration_minutes, target_skills, prerequisites, progress_indicators, evidence_level } = exercise;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/session')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Session
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getSeverityColor(exercise.severity)}>
            {exercise.severity}
          </Badge>
          <Badge className={getEvidenceLevelColor(evidence_level)}>
            Level {evidence_level}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exercise Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Exercise Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
              
              {instructions && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Instructions</Label>
                  <p className="text-gray-600 mt-1">{instructions}</p>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Duration: {duration_minutes} minutes
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Target Skills</Label>
                <p className="text-gray-600 mt-1">{target_skills}</p>
              </div>
              
              {prerequisites && prerequisites !== 'None' && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Prerequisites</Label>
                  <p className="text-gray-600 mt-1">{prerequisites}</p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Progress Indicators</Label>
                <p className="text-gray-600 mt-1">{progress_indicators}</p>
              </div>
            </CardContent>
          </Card>

          {/* Video Section */}
          {videoUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Video Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
        <iframe
                    src={videoUrl}
          title={title}
                    className="w-full h-full rounded-lg"
          allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Practice Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Session</CardTitle>
              <CardDescription>
                Complete the exercise and rate your performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Fluency Rating */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  How fluent was your speech? (1-5)
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={fluencyRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFluencyRating(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Confidence Rating */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  How confident did you feel? (1-5)
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={confidenceRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setConfidenceRating(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Notes (optional)
                </Label>
                <Textarea
                  placeholder="How did the exercise feel? Any challenges or successes?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Complete Button */}
              <Button 
                onClick={handleComplete}
                disabled={isCompleted}
                className="w-full"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed!
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Complete Exercise
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionExercisePage;
