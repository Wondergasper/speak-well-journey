
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const StepPlanSummary = ({ onFinish, onBack, data }) => {
  const severity = 'mild'; // simulate logic based on data

  const plans = {
    mild: 'Daily fluency-building exercises and soft consonant drills.',
    moderate: 'Breathing exercises, rhythm training, and phrase repetition.',
    severe: 'Daily intensive coaching with visual/audio guidance.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Step 4 of 4</p>
          <h2 className="text-3xl font-semibold text-gray-900">Your Personalized Plan</h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Based on your input, here’s a plan to begin your speech therapy journey:
          </p>
        </div>

        <div className="bg-therapy-purple-50 border border-therapy-purple-100 rounded-xl p-6 text-gray-800 text-center">
          <CheckCircle className="h-6 w-6 text-therapy-purple-500 mx-auto mb-3" />
          <p className="text-lg font-medium">{plans[severity]}</p>
          <p className="text-sm text-gray-600 mt-2">Recommended: 10 mins/day · 2–3 exercises</p>
        </div>

        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onFinish} className="bg-therapy-purple-500 hover:bg-therapy-purple-700 text-white">
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepPlanSummary;
