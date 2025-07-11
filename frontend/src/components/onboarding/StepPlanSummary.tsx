
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const StepPlanSummary = ({ onFinish, onBack, data }) => {
  const severity = data.severity || 'mild'; // Replace with actual ML logic later

  const plans = {
    mild: 'Daily fluency-building exercises and soft consonant drills.',
    moderate: 'Breathing exercises, rhythm training, and phrase repetition.',
    severe: 'Daily intensive coaching with visual/audio guidance.',
  };

  const handleFinish = () => {
    // Saved user data to localStorage 
    const payload = {
      name: data.name,
      age: data.age,
      severity: severity,
      goals: data.goals || [],
    };

    localStorage.setItem('userData', JSON.stringify(payload));

    // Navigate to dashboard after user completes onboarding step
    onFinish();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Step 4 of 4</p>
          <h2 className="text-3xl font-semibold text-gray-900">Speech Assessment Result</h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Based on your input, here’s the result of your speech assessment. 
          </p>
        </div>

            <div className="bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-50 border border-therapy-purple-200 rounded-2xl p-6 text-gray-800 shadow-md">
  <CheckCircle className="h-7 w-7 text-therapy-purple-600 mx-auto mb-4" />
  
  <h3 className="text-xl font-semibold text-therapy-purple-700 mb-2 text-center">
    Severity Level: <span className="capitalize">{severity}</span>
  </h3>

  <p className="text-base font-medium text-center text-gray-700 mb-4">
    Your personalized therapy recommendation:
  </p>

  <div className="bg-white border border-therapy-purple-100 rounded-lg px-4 py-3 mb-4 shadow-sm">
    <p className="text-sm text-gray-600 text-center font-medium">
      {plans[severity]}
    </p>
  </div>

  <div className="text-center text-sm text-gray-600 font-medium">
    ⏱️ <span className="font-semibold">Session Duration:</span> 10–15 minutes daily
  </div>
</div>




        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleFinish} className="bg-therapy-purple-500 hover:bg-therapy-purple-700 text-white">
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepPlanSummary;
