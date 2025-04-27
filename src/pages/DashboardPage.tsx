import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Calendar, 
  Book, 
  BarChart2, 
  Award, 
  TrendingUp, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import SeverityBadge from '@/components/SeverityBadge';
import ProgressChart from '@/components/ProgressChart';

const DashboardPage: React.FC = () => {
  const userData = {
    name: "Jamie Smith",
    currentSeverity: 'mild' as 'none' | 'mild' | 'severe',
    sessionsCompleted: 8,
    minutesPracticed: 47,
    lastSession: "2 days ago",
    streak: 4,
    nextGoal: "Complete 3 more sessions this week",
    progressPercent: 65,
    
    recentExercises: [
      { id: 1, name: "Breath Control", completedAt: "Today", duration: "5 min" },
      { id: 2, name: "Paced Reading", completedAt: "Yesterday", duration: "10 min" },
      { id: 3, name: "Gentle Onset", completedAt: "3 days ago", duration: "8 min" },
    ],
    
    upcomingExercises: [
      { id: 4, name: "Word Prolongation", difficulty: "Medium" },
      { id: 5, name: "Pausing Practice", difficulty: "Easy" },
      { id: 6, name: "Stress Reduction", difficulty: "Medium" },
    ],
    
    progressData: [
      { date: "Jan 1", value: 80, severity: 'severe' as const },
      { date: "Jan 8", value: 75, severity: 'severe' as const },
      { date: "Jan 15", value: 70, severity: 'severe' as const },
      { date: "Jan 22", value: 65, severity: 'mild' as const },
      { date: "Jan 29", value: 60, severity: 'mild' as const },
      { date: "Feb 5", value: 50, severity: 'mild' as const },
      { date: "Feb 12", value: 40, severity: 'mild' as const },
    ] as const,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userData.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's an overview of your speech therapy progress
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <Button asChild variant="outline">
              <Link to="/exercises">
                <Book className="mr-2 h-4 w-4" />
                Exercises
              </Link>
            </Button>
            <Button asChild className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
              <Link to="/record">
                <Mic className="mr-2 h-4 w-4" />
                New Recording
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
                  <div className="mt-2">
                    <SeverityBadge level={userData.currentSeverity} />
                  </div>
                </div>
                <div className="bg-therapy-purple-100 dark:bg-therapy-purple-500/20 p-3 rounded-full">
                  <BarChart2 className="h-5 w-5 text-therapy-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sessions Completed</p>
                  <p className="text-2xl font-bold mt-1">{userData.sessionsCompleted}</p>
                </div>
                <div className="bg-therapy-blue-50 dark:bg-therapy-blue-500/20 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-therapy-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Minutes Practiced</p>
                  <p className="text-2xl font-bold mt-1">{userData.minutesPracticed}</p>
                </div>
                <div className="bg-therapy-peach-100 dark:bg-amber-500/20 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold mt-1">{userData.streak} days</p>
                </div>
                <div className="bg-therapy-green-100 dark:bg-green-900/20 p-3 rounded-full">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Chart */}
            <ProgressChart data={userData.progressData} title="Your Stuttering Severity Over Time" />
            
            {/* Progress Toward Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Progress Toward Next Goal</CardTitle>
                <CardDescription>{userData.nextGoal}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Current Progress</span>
                    <span className="font-medium">{userData.progressPercent}%</span>
                  </div>
                  <Progress value={userData.progressPercent} className="h-2" />
                  
                  <div className="flex items-center bg-therapy-blue-50 dark:bg-therapy-blue-500/10 p-3 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-therapy-blue-500 mr-3" />
                    <div className="text-sm">
                      <p>You're making steady progress! Continue practicing regularly to reach your goal.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                <CardDescription>Your latest completed exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y dark:divide-gray-800">
                  {userData.recentExercises.map(exercise => (
                    <div key={exercise.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-gray-500">{exercise.completedAt}</p>
                      </div>
                      <span className="text-sm bg-therapy-purple-100 dark:bg-therapy-purple-500/20 text-therapy-purple-500 px-2 py-1 rounded">
                        {exercise.duration}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link to="/history">
                    View All Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                <CardDescription>Common tasks you can take</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700 justify-start" asChild>
                  <Link to="/record">
                    <Mic className="mr-2 h-4 w-4" />
                    New Recording Session
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/exercises">
                    <Book className="mr-2 h-4 w-4" />
                    Browse Exercises
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Practice
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Suggested Exercises */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recommended For You</CardTitle>
                <CardDescription>Based on your recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.upcomingExercises.map(exercise => (
                    <div key={exercise.id} className="border rounded-md p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{exercise.name}</p>
                        <span className="text-xs bg-therapy-blue-50 dark:bg-blue-900/20 text-therapy-blue-500 px-2 py-0.5 rounded">
                          {exercise.difficulty}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="w-full text-sm" asChild>
                        <Link to={`/exercises/${exercise.id}`}>
                          Start Exercise
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Tips and Motivation */}
            <Card className="bg-gradient-to-br from-therapy-purple-100 to-therapy-blue-50 dark:from-therapy-purple-700/20 dark:to-therapy-blue-500/10 border-none">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Tip of the Day</h3>
                <p className="mb-4 text-gray-800 dark:text-gray-300">
                  Practice controlling your breath before speaking. Take a deep breath, hold for 2 seconds, then slowly exhale while beginning to speak.
                </p>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4">
                  <p className="italic text-gray-700 dark:text-gray-300 text-sm">
                    "The voice is the first evidence of your confidence and competence."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
