import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercisesAPI, profileAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SessionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Get user profile to determine severity
        const profile = await profileAPI.getProfile();
        const severity = profile.severity || 'mild';
        
        // Fetch exercises filtered by severity
        const allExercises = await exercisesAPI.getAll(severity);
        
        // Randomly select 2 exercises for the session
        const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        setSelectedExercises(selected);
        
        // Get completion status from localStorage (temporary until backend supports it)
        const completedByUser = JSON.parse(localStorage.getItem('completedExercises') || '{}');
        setCompleted(completedByUser[profile.id] || {});
        
      } catch (err) {
        setError('Failed to load exercises. Please try again.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load exercises. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [toast]);

  const handleStartExercise = (exercise) => {
    navigate('/session-exercise', { state: { exercise } });
  };

  const handleFinishSession = async () => {
    try {
      // Get user profile
      const profile = await profileAPI.getProfile();
      
      // Record session completion in backend (you may want to add a sessions API)
      // For now, we'll just navigate to dashboard
      
      // Update local storage for session tracking
      const today = new Date().toISOString().split('T')[0];
      const lastSessionDate = profile.lastSession ? new Date(profile.lastSession) : null;
      const todayDate = new Date();
      const difference = lastSessionDate ? Math.floor((todayDate.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      const newStreak = lastSessionDate && difference === 1 ? (profile.streak || 0) + 1 : 1;

      // Clear completed exercises for this session
      const completedByUser = JSON.parse(localStorage.getItem('completedExercises') || '{}');
      delete completedByUser[profile.id];
      localStorage.setItem('completedExercises', JSON.stringify(completedByUser));

      toast({
        title: 'Session completed!',
        description: 'Great job! Your progress has been recorded.',
      });

      navigate('/dashboard');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to complete session. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-therapy-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-purple-500 mx-auto mb-4"></div>
          <p>Loading your personalized session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-therapy-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const allCompleted = selectedExercises.every((ex) => completed[ex.id]);

  return (
    <div className="min-h-screen p-8 bg-therapy-purple-50">
      {/* Back to Dashboard */}
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-therapy-purple-600 border-therapy-purple-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-therapy-purple-800 mb-6">Your Personalized Session</h1>

      <div className="space-y-4">
        {selectedExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg text-gray-800">{exercise.title}</h3>
            <p className="text-gray-600">{exercise.description}</p>
            <Button
              className="mt-3 bg-therapy-purple-500 text-white"
              onClick={() => handleStartExercise(exercise)}
              disabled={completed[exercise.id]}
            >
              {completed[exercise.id] ? "Completed" : "Start Exercise"}
            </Button>
          </div>
        ))}
      </div>

      {allCompleted && (
        <div className="mt-6">
          <Button className="bg-green-600 text-white" onClick={handleFinishSession}>
            Finish Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default SessionPage;
