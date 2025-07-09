
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const StepGoals = ({ onNext, onBack, updateData, data }) => {
  const [goals, setGoals] = useState(data.goals || '');

  const handleNext = () => {
    updateData({ goals });
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Step 3 of 4</p>
          <h2 className="text-3xl font-semibold text-gray-900">What Would You Like to Improve?</h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Tell us what goals you have for your speech — we’ll shape your plan around them.
          </p>
        </div>

        <div className="space-y-4">
          <Label>Your Goals</Label>
          <Textarea
            rows={4}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="I want to reduce repetition, speak more confidently..."
            className="resize-none"
            required
          />
        </div>

        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleNext} className="bg-therapy-purple-500 hover:bg-therapy-purple-700 text-white">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepGoals;