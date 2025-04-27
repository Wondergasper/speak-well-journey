
import React from 'react';
import Navbar from '@/components/Navbar';
import { ProgressChart } from '@/components/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Progress Tracker</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Speech Improvement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart />
            </CardContent>
          </Card>
          {/* Additional progress-related cards can be added here */}
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
