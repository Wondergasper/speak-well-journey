import React from 'react';

type WaveformProps = {
  isRecording?: boolean;
  audioLevel?: number;
};

const Waveform: React.FC<WaveformProps> = ({ isRecording = false, audioLevel = 0 }) => {
  const bars = 14; // Number of bars to display
  const getRandomHeight = () => Math.random() * 100;

  // If recording, generate random heights for each bar to simulate audio input
  // Otherwise, show a flat line with minimal height for visual interest
  const generateHeights = () => {
    if (!isRecording) return Array(bars).fill(5); // Flat line when not recording
    if (typeof audioLevel === 'number' && audioLevel > 0) {
      // Use actual audio level if provided
      return Array(bars).fill(0).map(() => audioLevel * 100);
    }
    return Array(bars).fill(0).map(() => getRandomHeight());
  };

  const [heights, setHeights] = React.useState(generateHeights());

  React.useEffect(() => {
    if (!isRecording) {
      setHeights(Array(bars).fill(5));
      return;
    }

    const interval = setInterval(() => {
      setHeights(generateHeights());
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording, audioLevel]);

  return (
    <div className="waveform w-full max-w-md mx-auto p-2">
      {heights.map((height, index) => (
        <div
          key={index}
          className="waveform-bar"
          style={{
            height: `${height}%`,
            opacity: isRecording ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;
