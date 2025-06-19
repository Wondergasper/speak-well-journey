
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, PlayCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Waveform from './Waveform';
import MicPermissionModal from './MicPermissionModal';
import { useToast } from '@/components/ui/use-toast';

interface AudioRecorderProps {
  onRecordingComplete?: (recording: Blob) => void;
  maxDuration?: number; // in seconds
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onRecordingComplete,
  maxDuration = 30 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    // Check for microphone permission status when component mounts
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        setPermissionGranted(true);
      })
      .catch(() => {
        setPermissionGranted(false);
      });

    return () => {
      stopMediaTracks();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  };

  const checkMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionGranted(true);
      return true;
    } catch (err) {
      setPermissionGranted(false);
      setShowPermissionModal(true);
      return false;
    }
  };
  
  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      setShowPermissionModal(false);
      startRecording();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Microphone access is required to record your speech."
      });
    }
  };

  const analyzeAudio = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average volume level
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const normalizedLevel = average / 255; // Normalize to 0-1 range
    
    setAudioLevel(normalizedLevel);
  };

  const startRecording = async () => {
    const hasAccess = await checkMicrophoneAccess();
    if (!hasAccess) return;

    setIsProcessing(true);
    
    try {
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analysis
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
        
        setIsProcessing(false);
        setIsRecording(false);
        setRecordingTime(0);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      // Set up timer for recording duration display
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
        
        // Update audio analysis
        analyzeAudio();
      }, 1000);

      // Start immediate audio analysis
      const analysisInterval = setInterval(analyzeAudio, 100);
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
      
      return () => {
        clearInterval(analysisInterval);
      };
    } catch (err) {
      console.error('Error starting recording:', err);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Recording Error",
        description: "Failed to start recording. Please try again."
      });
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      setIsProcessing(true);
      mediaRecorderRef.current.stop();
      stopMediaTracks();
    }
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    
    if (isPaused) {
      // Resume recording
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
        analyzeAudio();
      }, 1000);
    } else {
      // Pause recording
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="border rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <Waveform isRecording={isRecording && !isPaused} audioLevel={audioLevel} />
          </div>
          
          <div className="text-center">
            {isRecording ? (
              <div className="text-xl font-medium">{formatTime(recordingTime)}</div>
            ) : (
              <div className="text-xl font-medium text-gray-600">Ready to Record</div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                disabled={isProcessing}
                className="bg-therapy-purple-500 hover:bg-therapy-purple-700 h-14 w-14 rounded-full ripple-effect"
                aria-label="Start recording"
              >
                {isProcessing ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={togglePause}
                  disabled={isProcessing}
                  className="bg-amber-500 hover:bg-amber-600 h-12 w-12 rounded-full ripple-effect"
                  aria-label={isPaused ? "Resume recording" : "Pause recording"}
                >
                  <PlayCircle className="h-6 w-6" />
                </Button>
                
                <Button
                  onClick={stopRecording}
                  disabled={isProcessing}
                  className="bg-rose-500 hover:bg-rose-600 h-14 w-14 rounded-full ripple-effect"
                  aria-label="Stop recording"
                >
                  {isProcessing ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : (
                    <Square className="h-6 w-6" />
                  )}
                </Button>
              </>
            )}
          </div>
          
          {isRecording && (
            <div className="text-sm text-gray-500">
              {isPaused ? "Recording paused" : "Recording in progress..."}
            </div>
          )}
          
          {!isRecording && !isProcessing && (
            <div className="text-sm text-gray-500 max-w-xs text-center">
              Click the microphone button to start recording your speech. Try to speak naturally for best results.
            </div>
          )}
        </div>
      </div>
      
      <MicPermissionModal 
        open={showPermissionModal} 
        onOpenChange={setShowPermissionModal}
        onAllowMic={requestMicrophonePermission}
      />
    </div>
  );
};

export default AudioRecorder;
