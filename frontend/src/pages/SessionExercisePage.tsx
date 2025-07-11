// src/pages/SessionExercisePage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { exercisesAPI } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const SessionExercisePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const exercise = location.state?.exercise;

  // ✅ Return early if exercise is not present
  if (!exercise || typeof exercise !== 'object') {
    return (
      <div className="p-8 text-red-600 font-semibold">
        Exercise data is missing or invalid.
      </div>
    );
  }

  const { id, title, description, videoUrl } = exercise;

  // ✅ Safe YouTube embed conversion
  const getEmbedUrl = (input: unknown): string => {
    if (typeof input !== 'string') return '';
    if (input.includes('youtube.com/watch?v=')) {
      return input.replace('watch?v=', 'embed/');
    } else if (input.includes('youtu.be/')) {
      const videoId = input.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return input;
  };

  const handleComplete = async () => {
    try {
      // Record completion in backend
      await exercisesAPI.complete(id, {
        duration: 300, // 5 minutes default
        notes: 'Completed via session'
      });

      // Also update localStorage for immediate UI feedback
      const allUsersProgress = JSON.parse(localStorage.getItem('completedExercises') || '{}');
      const currentUserProgress = allUsersProgress[id] || {};
      currentUserProgress[id] = true;
      allUsersProgress[id] = currentUserProgress;
      localStorage.setItem('completedExercises', JSON.stringify(allUsersProgress));

      toast({
        title: 'Exercise completed!',
        description: 'Great job! Your progress has been recorded.',
      });

      navigate('/session');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to record completion. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-therapy-purple-50">
      <h1 className="text-2xl font-bold text-therapy-purple-700 mb-4">{title}</h1>
      <div className="mb-6">
        <iframe
          width="100%"
          height="315"
          src={getEmbedUrl(videoUrl)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mb-6 text-gray-700">{description}</p>
      <Button className="bg-green-600 text-white" onClick={handleComplete}>
        Mark as Complete
      </Button>
    </div>
  );
};

export default SessionExercisePage;
