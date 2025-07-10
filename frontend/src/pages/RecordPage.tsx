
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import AudioRecorder from '@/components/AudioRecorder';
import { useToast } from '@/components/ui/use-toast';

const RecordPage: React.FC = () => {
  const [step, setStep] = useState<'instructions' | 'recording' | 'processing'>('instructions');
  const [progress, setProgress] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);
  const { toast } = useToast();

  const startRecording = () => {
    setStep('recording');
  };

  const handleRecordingComplete = async (recording: Blob) => {
    setStep('processing');
    
    try {
      // Simulate upload progress
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        setProgress(Math.min(currentProgress, 90));
      }, 100);

      // Upload audio for analysis
      const { analysisAPI } = await import('@/services/api');
      const result = await analysisAPI.uploadAudio(recording);
      
      // Clear progress simulation
      clearInterval(progressInterval);
      setProgress(100);
      
      // Store analysis ID for results page
      localStorage.setItem('lastAnalysisId', result.analysis_id.toString());
      
      setProcessingComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Your speech has been analyzed. View your results.",
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error processing your audio. Please try again.",
        variant: "destructive"
      });
      setStep('recording');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/dashboard" 
              className="text-gray-500 hover:text-therapy-purple-500 flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <h1 className="text-3xl font-bold mt-4">Speech Recording Session</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Record your speech for analysis and personalized stuttering assessment
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            {step === 'instructions' && (
              <div className="flex flex-col items-center text-center">
                <div className="bg-therapy-blue-50 dark:bg-therapy-blue-500/10 p-6 rounded-full mb-6">
                  <Info className="h-10 w-10 text-therapy-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Recording Instructions</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
                  To get the most accurate analysis of your speech, please follow these guidelines:
                </p>
                <ul className="text-left text-gray-600 dark:text-gray-300 space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="inline-block bg-therapy-purple-100 dark:bg-therapy-purple-500/20 text-therapy-purple-500 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Find a <strong>quiet location</strong> with minimal background noise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-therapy-purple-100 dark:bg-therapy-purple-500/20 text-therapy-purple-500 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Position yourself about <strong>8-12 inches</strong> from your microphone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-therapy-purple-100 dark:bg-therapy-purple-500/20 text-therapy-purple-500 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Speak at your <strong>natural pace</strong> - don't try to hide your stutter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-therapy-purple-100 dark:bg-therapy-purple-500/20 text-therapy-purple-500 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Try to speak for <strong>at least 30 seconds</strong> for the best assessment</span>
                  </li>
                </ul>
                <Button onClick={startRecording} className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
                  Start Recording
                </Button>
              </div>
            )}

            {step === 'recording' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Record Your Speech</h2>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Read the following passage aloud at your natural speaking pace:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-8">
                  <p className="text-lg leading-relaxed">
                    "The rainbow is a beautiful display of colors that appears in the sky. 
                    It forms when sunlight shines through raindrops, causing the light to 
                    reflect and separate into its component colors. The main colors are 
                    red, orange, yellow, green, blue, indigo, and violet. Rainbows often 
                    appear after a rainstorm when the sun begins to shine again."
                  </p>
                </div>
                
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
              </div>
            )}

            {step === 'processing' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Analyzing Your Speech</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Our system is analyzing your speech patterns for stutter characteristics. This may take a moment.
                </p>
                
                <div className="w-full max-w-md mx-auto mb-8">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
                </div>
                
                {processingComplete && (
                  <div className="animate-fade-in">
                    <p className="text-green-600 font-medium mb-6">Analysis complete!</p>
                    <Link to="/results">
                      <Button className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
                        View Your Results
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-therapy-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-therapy-blue-300/30 text-sm text-gray-700 dark:text-gray-300">
            <p className="flex items-start">
              <Info className="h-5 w-5 text-therapy-blue-500 mr-2 flex-shrink-0" />
              <span>
                Having trouble with the recording? Make sure your browser has permission to access your microphone. 
                You can check this in your browser settings or by clicking the lock/info icon in your address bar.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
