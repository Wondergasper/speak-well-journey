
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Award, Search } from 'lucide-react';

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Connect with others on their speech therapy journey
            </p>
          </div>
          <Button className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Discussion
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Discussions
              </CardTitle>
              <CardDescription>Join ongoing conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <h3 className="font-medium">Tips for Daily Practice</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Started by Alex • 2h ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <h3 className="font-medium">Success Stories</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Started by Maria • 5h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Members
              </CardTitle>
              <CardDescription>Connect with others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-therapy-purple-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-therapy-purple-500">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Online now</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Featured Content
              </CardTitle>
              <CardDescription>Highlighted resources and tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-therapy-purple-50 dark:bg-therapy-purple-500/10 rounded-lg">
                  <h3 className="font-medium">Weekly Challenge</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Practice breathing exercises daily</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
