
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProgressChart from '@/components/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart2, TrendingUp, Clock } from 'lucide-react';
import { progressAPI } from '@/services/api';

const ProgressTrackerPage: React.FC = () => {
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ weeklyProgress: 0, monthlyProgress: 0, totalSessions: 0 });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await progressAPI.getHistory();
        setProgress(data.history || []);
        // Calculate stats
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        const weekly = data.history.filter((p: any) => new Date(p.date) >= weekAgo);
        const monthly = data.history.filter((p: any) => new Date(p.date) >= monthAgo);
        setStats({
          weeklyProgress: weekly.length ? Math.round(weekly.reduce((a: number, b: any) => a + b.score, 0) / weekly.length) : 0,
          monthlyProgress: monthly.length ? Math.round(monthly.reduce((a: number, b: any) => a + b.score, 0) / monthly.length) : 0,
          totalSessions: data.history.length,
        });
      } catch (err) {
        setError('Failed to load progress data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Progress Tracker</h1>
        
        {loading ? (
          <div className="text-center py-12">Loading progress...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <>
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
                  <ProgressChart data={progress.map((p: any) => ({ date: p.date, value: p.score, severity: undefined }))} title="Monthly Progress" />
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
                        <p className="text-sm text-gray-600 dark:text-gray-300">Completed {stats.weeklyProgress > 0 ? 'sessions this week' : 'no sessions this week'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-therapy-blue-50 dark:bg-therapy-blue-500/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Improvement Milestone</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Reduced stuttering severity by {stats.monthlyProgress}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
