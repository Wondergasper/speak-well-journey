
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import SeverityBadge from '@/components/SeverityBadge';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const analysisId = localStorage.getItem('lastAnalysisId');
        if (!analysisId) {
          navigate('/record');
          return;
        }

        const { analysisAPI } = await import('@/services/api');
        const result = await analysisAPI.getResults(parseInt(analysisId));
        
        // Transform backend data to match frontend interface
        const transformedResults = {
          severity: result.severity,
          score: result.score,
          previousScore: 52, // Could fetch from previous analysis
          details: {
            repetitions: { count: Math.floor(result.stutter_count * 0.5), examples: ["st-st-stairs", "w-w-water"] },
            blocks: { count: Math.floor(result.stutter_count * 0.2), examples: ["...table", "...phone"] },
            prolongations: { count: Math.floor(result.stutter_count * 0.3), examples: ["ssssunday", "mmmmountain"] },
          },
          recommendations: result.analysis_data?.recommendations || [
            "Practice slow, controlled speech exercises",
            "Focus on breath control techniques",
            "Try the guided relaxation exercises in our app"
          ],
          exercises: result.analysis_data?.exercises || [
            { id: 1, title: "Deep Breathing", severity: "mild" },
            { id: 2, title: "Gentle Onsets", severity: "mild" },
            { id: 3, title: "Paced Reading", severity: "mild" }
          ]
        };
        
        setAnalysisResults(transformedResults);
      } catch (err) {
        console.error('Failed to fetch results:', err);
        setError('Failed to load analysis results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-purple-500 mx-auto mb-4"></div>
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !analysisResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'No results found'}</p>
          <Button onClick={() => navigate('/record')}>Go Back to Recording</Button>
        </div>
      </div>
    );
  }

  const scoreChange = currentScore - previousScore;
  const scoreTrendIcon = scoreChange > 0 ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />;

  const handleTryAgain = () => {
    navigate('/record');
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/record" 
              className="text-gray-500 hover:text-therapy-purple-500 flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Recording
            </Link>

            <h1 className="text-3xl font-bold mt-4">Your Speech Analysis Results</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Based on your recent recording, we've analyzed your speech patterns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Results Card */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                  <div className="flex items-center justify-center bg-therapy-purple-100 dark:bg-therapy-purple-500/20 rounded-full h-24 w-24 flex-shrink-0">
                    <span className="text-3xl font-bold text-therapy-purple-500">
                      {analysisResults.score}
                    </span>
                  </div>
                  <div>
                    <div className="mb-2">
                      <SeverityBadge level={analysisResults.severity} size="lg" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Analysis Summary</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {analysisResults.severity === 'none' && (
                        "Your speech showed no significant stuttering patterns. Great job communicating fluently!"
                      )}
                      {analysisResults.severity === 'mild' && (
                        "Your speech showed some mild stuttering patterns. With targeted practice, you can make significant improvements."
                      )}
                      {analysisResults.severity === 'severe' && (
                        "Your speech showed several stuttering patterns. Don't worry - with consistent practice of the recommended exercises, you'll see improvement."
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex justify-between">
                    <span><strong>Previous Score:</strong> {analysisResults.previousScore}</span>
                    <span className="flex items-center gap-1">
                      {scoreTrendIcon}
                      <strong>{Math.abs(scoreChange)}</strong> point {scoreChange >= 0 ? 'improvement' : 'decline'}
                    </span>
                  </div>
                </div>

                
              </CardContent>
            </Card>

            {/* Recommendations Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-therapy-green-100 dark:bg-green-900/20 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold">Recommendations</h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {analysisResults.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-therapy-blue-50 dark:bg-blue-900/20 text-therapy-blue-500 rounded-full p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Recommended Exercises</h4>
                    <Link to="/exercises" className="text-sm text-therapy-purple-500 hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {analysisResults.exercises.map(exercise => (
                      <div key={exercise.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-therapy-purple-500" />
                          <span>{exercise.title}</span>
                        </div>
                        <span className="text-xs bg-therapy-blue-50 dark:bg-blue-900/20 text-therapy-blue-500 px-2 py-0.5 rounded">
                          {exercise.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center" 
                    onClick={handleTryAgain}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Another Recording
                  </Button>
                  <Button 
                    className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700 flex items-center justify-center"
                    onClick={handleContinue}
                  >
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-therapy-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-therapy-blue-300/30 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Remember:</strong> Speech therapy is a journey. Regular practice of the recommended exercises and consistent recording sessions will help track your progress over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
