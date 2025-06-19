
import React from 'react';
import Navbar from '@/components/Navbar';
import ProgressChart from '@/components/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart2, TrendingUp, Clock } from 'lucide-react';

const ProgressTrackerPage: React.FC = () => {
  const stats = {
    weeklyProgress: 75,
    monthlyProgress: 65,
    totalSessions: 24
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Progress Tracker</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weekly Progress</p>
                  <p className="text-2xl font-bold mt-1">{stats.weeklyProgress}%</p>
                </div>
                <div className="bg-therapy-purple-100 dark:bg-therapy-purple-500/20 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-therapy-purple-500" />
                </div>
              </div>
              <Progress value={stats.weeklyProgress} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Overview</p>
                  <p className="text-2xl font-bold mt-1">{stats.monthlyProgress}%</p>
                </div>
                <div className="bg-therapy-blue-50 dark:bg-therapy-blue-500/20 p-3 rounded-full">
                  <BarChart2 className="h-5 w-5 text-therapy-blue-500" />
                </div>
              </div>
              <Progress value={stats.monthlyProgress} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalSessions}</p>
                </div>
                <div className="bg-therapy-green-100 dark:bg-therapy-green-500/20 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Speech Improvement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart data={[
                { date: "Jan", value: 80, severity: 'severe' },
                { date: "Feb", value: 65, severity: 'mild' },
                { date: "Mar", value: 45, severity: 'none' }
              ]} title="Monthly Progress" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-therapy-purple-50 dark:bg-therapy-purple-500/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Consistent Practice</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Completed 5 sessions this week</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-therapy-blue-50 dark:bg-therapy-blue-500/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Improvement Milestone</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Reduced stuttering severity by 20%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
