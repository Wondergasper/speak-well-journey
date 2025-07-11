import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercisesBySeverity } from '@/data/exercises';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SessionPage = () => {
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [completed, setCompleted] = useState({});

  const userId = JSON.parse(localStorage.getItem('userData'))?.id;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const severity = userData?.severity || 'mild';
    const all = exercisesBySeverity[severity];

    const shuffled = [...all].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    setSelectedExercises(selected);

    const completedByUser = JSON.parse(localStorage.getItem('completedExercises') || '{}');
    setCompleted(completedByUser[userId] || {});
  }, [userId]);

  useEffect(() => {
    const handleFocus = () => {
      const completedByUser = JSON.parse(localStorage.getItem('completedExercises') || '{}');
      setCompleted(completedByUser[userId] || {});
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [userId]);

  const handleStartExercise = (exercise) => {
    navigate('/session-exercise', { state: { exercise } });
  };

  const handleFinishSession = async () => {
    navigate('/dashboard')
    const userData = JSON.parse(localStorage.getItem('userData'));
    const today = new Date().toISOString().split('T')[0];

    const lastSessionDate = new Date(userData.lastSession);
    const todayDate = new Date();
    const difference = Math.floor((todayDate.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));

    const newStreak = userData.lastSession && difference === 1 ? userData.streak + 1 : 1;

    const updatedUserData = {
      ...userData,
      sessionsCompleted: (userData.sessionsCompleted || 0) + 1,
      lastSession: today,
      streak: newStreak
    };

    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    // Save to backend
    await fetch("http://localhost:5000/api/update-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.id, completedDate: today })
    });

    const completedByUser = JSON.parse(localStorage.getItem('completedExercises') || '{}');
    delete completedByUser[userId];
    localStorage.setItem('completedExercises', JSON.stringify(completedByUser));

    navigate('/dashboard');
  };

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
