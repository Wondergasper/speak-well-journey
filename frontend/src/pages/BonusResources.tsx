import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Mic, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const bonusResources = [
  {
    id: 1,
    type: 'Podcast',
    title: 'The Science of Stuttering',
    description: 'Insights from speech therapists on fluency techniques.',
    icon: <Mic className="text-purple-500" />,
    link: '#',
  },
  {
    id: 2,
    type: 'PDF Guide',
    title: 'Daily Fluency Checklist',
    description: 'Printable guide to track your daily progress.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: '#',
  },
  {
    id: 3,
    type: 'Video',
    title: 'Breathing Techniques Explained',
    description: 'Learn simple breathing methods from a therapist.',
    icon: <Video className="text-amber-500" />,
    link: '#',
  },
];

const BonusResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-2">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-therapy-purple-700 dark:text-white">Bonus Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Curated tools to help you level up your speech therapy journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonusResources.map((res) => (
            <Card key={res.id} className="transition-shadow hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-800 dark:text-white">{res.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-300">{res.description}</CardDescription>
                </div>
                <div className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  {res.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-0 mt-2">
                <Button asChild className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-600 text-white">
                  <a href={res.link} target="_blank" rel="noopener noreferrer">
                    Access Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BonusResourcesPage;
