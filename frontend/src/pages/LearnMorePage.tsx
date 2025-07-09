import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const LearnMorePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-therapy-purple-700 dark:text-white mb-4">
          What is SpeakWell?
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          SpeakWell is a free, non-profit digital platform designed to support individuals with stuttering in their speech therapy journey. It leverages technology and selected deep learning models to make speech therapy more accessible, affordable, and effective — especially for those who may not have access to traditional therapy.
        </p>

        <h2 className="text-2xl font-semibold text-therapy-purple-600 dark:text-white mb-2">
          How to Use the App
        </h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
          <li>Create an account to personalize your experience.</li>
          <li>Complete the multi-step onboarding process — including a voice recording for initial assessment.</li>
          <li>Explore your personalized exercise plan based on your fluency level.</li>
          <li>Practice daily using guided tasks, voice analysis, and fluency tracking tools.</li>
          <li>Review your progress over time through insightful analytics and motivation boosters.</li>
          <li>Access bonus resources like podcasts, videos, and worksheets for deeper support.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-therapy-purple-600 dark:text-white mb-2">
          Important Disclaimer
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          While SpeakWell is a powerful tool to aid fluency development, it is <strong>not a replacement for traditional speech therapy</strong>. It is meant to supplement professional guidance and offer support between or beyond therapy sessions.
        </p>

        <h2 className="text-2xl font-semibold text-therapy-purple-600 dark:text-white mb-2">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          SpeakWell is a non-profit initiative. Our mission is to make speech therapy accessible, affordable, and inclusive for everyone — especially individuals in under-resourced communities. We believe everyone deserves the chance to express themselves confidently.
        </p>

        <div className="flex justify-center mt-10">
          <Button asChild className="bg-therapy-purple-500 hover:bg-therapy-purple-600 text-white px-6 py-2 rounded-full">
            <Link to="/signup">Start Your Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
