import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StepBasicInfo from '@/components/onboarding/StepBasicInfo';
import StepVoiceAssessment from '@/components/onboarding/StepVoiceAssessment';
import StepGoals from '@/components/onboarding/StepGoals';
import StepPlanSummary from '@/components/onboarding/StepPlanSummary';
import { onboardingAPI } from '@/services/api'; // Assume onboardingAPI exists

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    audioBlob: null,
    goals: [],
    severity: 'mild', // default
  });

  const navigate = useNavigate(); 
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const updateData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleFinish = async () => {
    // Save onboarding data to backend before navigating
    try {
      await onboardingAPI.save(formData);
    } catch (err) {
      // Handle error (optional)
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-xl">
        {step === 1 && <StepBasicInfo onNext={next} updateData={updateData} data={formData} />}
        {step === 2 && <StepVoiceAssessment onNext={next} onBack={back} updateData={updateData} data={formData} />}
        {step === 3 && <StepGoals onNext={next} onBack={back} updateData={updateData} data={formData} />}
        {step === 4 && <StepPlanSummary onBack={back} onFinish={handleFinish} data={formData} />} 
      </div>
    </div>
  );
};

export default OnboardingPage;
