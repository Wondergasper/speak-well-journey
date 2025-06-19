
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-therapy-purple-500" />
            <span className="font-bold text-xl text-therapy-purple-500">SpeakWell</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-therapy-purple-500 dark:hover:text-therapy-purple-300">
              Dashboard
            </Link>
            <Link to="/exercises" className="text-gray-700 dark:text-gray-300 hover:text-therapy-purple-500 dark:hover:text-therapy-purple-300">
              Exercises
            </Link>
            <Link to="/record" className="text-gray-700 dark:text-gray-300 hover:text-therapy-purple-500 dark:hover:text-therapy-purple-300">
              Record Speech
            </Link>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="default" className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
                <Link to="/record">Start Session</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t mt-2 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/exercises" 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Exercises
              </Link>
              <Link 
                to="/record" 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Record Speech
              </Link>
              <Link 
                to="/profile" 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Button 
                asChild 
                className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/record">Start Session</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
