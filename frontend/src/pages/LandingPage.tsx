
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart2, BookOpen, Check, Mic } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION ONE */}
      <section className="bg-gradient-to-br from-therapy-purple-100 to-therapy-peach-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left  order-1 lg:order-none">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-snug lg:leading-tight mb-6">
              Begin Your Journey<br /> to Confident Speech
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-md mx-auto lg:mx-0">
              SpeakWell uses advanced technology to help you overcome stuttering through personalized exercises, real-time feedback, and proven therapy techniques.
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
  <Button asChild className="bg-blue-500 hover:bg-therapy-purple-700 text-lg px-6 py-2 h-auto">
    <Link to="/signup">Get Started</Link>
  </Button>
  <Button asChild variant="outline" className="text-lg px-6 py-2 h-auto">
    <Link to="/login">Sign In</Link>
  </Button>
</div>

          </div>

          {/* Right Card Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
              <img
                src="/assets/girl-speaking.png"
                alt="Person speaking"
                className="w-full h-64 sm:h-72 object-contain mb-6"
              />
              <p className="text-base sm:text-lg font-normal text-gray-900 mb-3">
                Your speech analysis is ready
              </p>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-5">
                <Check className="mr-2 h-4 w-4" /> Mild Stutter Detected
              </div>
              <Button className="bg-therapy-blue-300 hover:bg-therapy-blue-500 rounded-full px-6 py-1 text-sm font-medium">
                View Recommended Exercises
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TWO */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How SpeakWell Helps You</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive approach combines modern technology with proven speech therapy techniques to help you overcome stuttering.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-pink-100">
              <div className="bg-therapy-purple-100 dark:bg-therapy-purple-500/20 p-3 rounded-full inline-block mb-4">
                <Mic className="h-6 w-6 text-therapy-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Speech Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced AI analyzes your speech patterns, identifying stutter triggers and severity to create personalized plans.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-pink-100">
              <div className="bg-therapy-blue-50 dark:bg-therapy-blue-500/20 p-3 rounded-full inline-block mb-4">
                <BookOpen className="h-6 w-6 text-therapy-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guided Exercises</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with proven speech exercises tailored to your specific needs, with real-time feedback to guide improvement.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-pink-100">
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Speech?</h2>
          <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who have improved their speech confidence with SpeakWell's personalized approach.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
  <div className="w-auto">
    <Button asChild className="bg-white text-therapy-purple-700 hover:bg-gray-100 text-sm px-4 py-2 h-auto whitespace-nowrap">
      <Link to="/signup">Create Free Account</Link>
    </Button>
  </div>
  <div className="w-auto">
    <Button asChild variant="outline" className="border-white text-gray-700 hover:bg-white/10 text-sm px-4 py-2 h-auto whitespace-nowrap">
      <Link to="/learn-more">Learn More</Link>
    </Button>
  </div>
</div>


        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
  <div className="container mx-auto px-4">
    
    {/* BRAND INFO CENTERED */}
    <div className="flex flex-col items-center text-center mb-12">
      <Link to="/" className="flex items-center gap-2">
        <Mic className="h-6 w-6 text-therapy-purple-300" />
        <span className="font-bold text-xl text-white">SpeakWell</span>
      </Link>
      <p className="mt-3 max-w-sm text-medium text-bold">
        Helping you overcome stuttering with modern technology and proven techniques.
      </p>
    </div>

    {/* GRID LINKS ALWAYS IN A ROW */}
    <div className="flex flex-wrap justify-between ml-20 gap-4  text-left">
      {/* Product */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="font-medium text-white mb-4">Product</h3>
        <ul className="space-y-2">
          <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
          <li><Link to="/testimonials" className="hover:text-white transition">Testimonials</Link></li>
          <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
          <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
        </ul>
      </div>

      {/* Legal */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="font-medium text-white mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          <li><Link to="/accessibility" className="hover:text-white transition">Accessibility</Link></li>
        </ul>
      </div>

      {/* Company */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="font-medium text-white mb-4">Company</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
          <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
          <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
          <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
        </ul>
      </div>
    </div>

    {/* BOTTOM BAR */}
    <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
      <p>© {new Date().getFullYear()} SpeakWell. All rights reserved.</p>
      <div className="mt-4 sm:mt-0 flex space-x-6">
        <a href="#" className="hover:text-white transition">Facebook</a>
        <a href="#" className="hover:text-white transition">Instagram</a>
        <a href="#" className="hover:text-white transition">Twitter</a>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
};

export default HeroSection;
