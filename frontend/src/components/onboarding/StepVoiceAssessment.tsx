
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

const StepVoiceAssessment = ({ onNext, onBack, updateData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioChunks = useRef<Blob[]>([]);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && waveRef.current) {
      interval = setInterval(() => {
        waveRef.current!.style.transform = `scaleY(${1 + Math.random() * 1.5})`;
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Simulated ML call
      setIsLoading(true);
      setTimeout(() => {
        updateData({ audioBlob, severity: 'moderate' }); // Placeholder
        setIsLoading(false);
      }, 2000);
    };

    recorder.start();
    setMediaRecorder(recorder);
    audioChunks.current = [];
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const passage = `
    When sunlight strikes raindrops in the air, they act as a prism and form a rainbow. 
    The rainbow is a division of white light into many beautiful colors. These take the shape of a long round arch, 
    with its path high above, and its two ends apparently beyond the horizon. There is, according to legend, a boiling pot of gold at one end. 
    People look, but no one ever finds it. When a man looks for something beyond reach, his friends say he is looking for the pot of gold at the end of the rainbow.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-therapy-purple-50 to-therapy-peach-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Step 2 of 4</p>
          <h2 className="text-3xl font-semibold text-gray-900">Voice Assessment</h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Please read the following passage aloud. This helps us evaluate your fluency, pacing, and articulation.
          </p>
        </div>

        <div className="bg-therapy-purple-50 border border-therapy-purple-200 text-therapy-purple-700 p-4 rounded-xl text-left mb-6 whitespace-pre-line">
          {passage}
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-24 w-24">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`h-full w-full flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                isRecording ? 'border-red-500 bg-red-100' : 'border-gray-300 bg-gray-100'
              }`}
            >
              <Mic className={`h-10 w-10 ${isRecording ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
            </button>
            {isRecording && (
              <div
                ref={waveRef}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-2 bg-therapy-purple-300 rounded-full origin-bottom transition-transform duration-200"
              />
            )}
          </div>
          <p className="text-gray-700 text-sm">
            {isRecording ? 'Recording...' : 'Click to start recording'}
          </p>

          {audioUrl && !isLoading && (
            <div className="text-center space-y-2">
              <audio controls src={audioUrl} className="w-full rounded" />
              <p className="text-sm text-gray-500">Recording complete. You can proceed.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center space-y-2 mt-4">
              <div className="animate-spin h-6 w-6 border-4 border-purple-400 border-t-transparent rounded-full" />
              <p className="text-sm text-gray-500">Analyzing your voice...</p>
            </div>
          )}
        </div>

        <div className="pt-10 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button
            onClick={onNext}
            className="bg-therapy-purple-500 hover:bg-therapy-purple-700 text-white"
            disabled={!audioUrl || isLoading}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepVoiceAssessment;
