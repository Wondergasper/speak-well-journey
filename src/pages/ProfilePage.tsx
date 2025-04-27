
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ProfilePage: React.FC = () => {
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
          
          <h1 className="text-3xl font-bold mt-4">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your account and preferences
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Profile management features will be available shortly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
