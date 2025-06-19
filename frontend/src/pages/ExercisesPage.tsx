
import React from 'react';
import { ArrowLeft, Book, Timer, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExercisesPage: React.FC = () => {
  const exercises = [
    {
      id: 1,
      title: "Breath Control",
      description: "Practice controlled breathing techniques",
      duration: "5 min",
      icon: Timer,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Word Prolongation",
      description: "Learn to extend sounds smoothly",
      duration: "10 min",
      icon: Book,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Vocal Exercises",
      description: "Strengthen your vocal cords",
      duration: "8 min",
      icon: Volume2,
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/dashboard" 
            className="text-gray-500 hover:text-therapy-purple-500 flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">Speech Exercises</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Choose from our collection of speech therapy exercises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Card key={exercise.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{exercise.title}</CardTitle>
                    <div className="p-2 rounded-full bg-therapy-purple-100 dark:bg-therapy-purple-500/20">
                      <Icon className="h-5 w-5 text-therapy-purple-500" />
                    </div>
                  </div>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {exercise.duration}
                    </span>
                    <span className="text-sm bg-therapy-blue-50 dark:bg-blue-900/20 text-therapy-blue-500 px-2 py-1 rounded">
                      {exercise.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700" asChild>
                    <Link to={`/exercises/${exercise.id}`}>
                      Start Exercise
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
