
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mic, BarChart2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-therapy-blue-50 via-therapy-purple-100 to-therapy-peach-100 py-24">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Begin Your Journey to <span className="text-therapy-purple-500">Confident Speech</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              SpeakWell uses advanced technology to help you overcome stuttering through personalized exercises, real-time feedback, and proven therapy techniques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-therapy-purple-500 hover:bg-therapy-purple-700 text-lg px-6 py-6 h-auto">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-6 py-6 h-auto">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md">
              <div className="wave-animation mb-6 justify-center">
                <div className="wave-bar h-16"></div>
                <div className="wave-bar h-20"></div>
                <div className="wave-bar h-12"></div>
                <div className="wave-bar h-24"></div>
                <div className="wave-bar h-10"></div>
                <div className="wave-bar h-16"></div>
                <div className="wave-bar h-20"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium mb-4">Your speech analysis is ready</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-therapy-green-100 text-green-800 mb-6">
                  <Check className="mr-1 h-4 w-4" /> Mild Stutter Detected
                </div>
                <div className="flex justify-center">
                  <Button className="bg-therapy-blue-300 hover:bg-therapy-blue-500 px-6">
                    View Recommended Exercises
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SpeakWell Helps You</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive approach combines modern technology with proven speech therapy techniques to help you overcome stuttering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="bg-therapy-purple-100 dark:bg-therapy-purple-500/20 p-3 rounded-full inline-block mb-4">
                <Mic className="h-6 w-6 text-therapy-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Speech Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced AI technology analyzes your speech patterns, identifying specific stutter triggers and severity to create personalized plans.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="bg-therapy-blue-50 dark:bg-therapy-blue-500/20 p-3 rounded-full inline-block mb-4">
                <BookOpen className="h-6 w-6 text-therapy-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guided Exercises</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with proven speech exercises tailored to your specific needs, with real-time feedback to guide improvement.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="bg-therapy-peach-100 dark:bg-amber-500/20 p-3 rounded-full inline-block mb-4">
                <BarChart2 className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your progress with detailed analytics and visualizations, celebrating milestones along your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-therapy-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Speech?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who have improved their speech confidence with SpeakWell's personalized approach.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-white text-therapy-purple-700 hover:bg-gray-100 text-lg px-6 py-6 h-auto">
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto">
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <Mic className="h-6 w-6 text-therapy-purple-300" />
                <span className="font-bold text-xl text-white">SpeakWell</span>
              </Link>
              <p className="mt-3 max-w-xs">
                Helping you overcome stuttering with modern technology and proven techniques.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
                  <li><Link to="/testimonials" className="hover:text-white transition">Testimonials</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
                  <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                  <li><Link to="/accessibility" className="hover:text-white transition">Accessibility</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} SpeakWell. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
