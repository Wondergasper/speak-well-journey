import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Calendar } from 'lucide-react';

const StepBasicInfo = ({ onNext, updateData, data }) => {
  const [name, setName] = useState(data.name || '');
  const [age, setAge] = useState(data.age || '');

  const handleNext = () => {
    if (!name || !age) return;
    updateData({ name, age });
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100 transition-all duration-300">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Step 1 of 4</p>
          <h2 className="text-3xl font-semibold text-gray-900">Let’s Get to Know You</h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Tell us a bit about yourself so we can personalize your experience.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Age</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 24"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-therapy-purple-500 hover:bg-therapy-purple-700 px-6 py-2 rounded-full text-white text-base font-medium"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepBasicInfo;
