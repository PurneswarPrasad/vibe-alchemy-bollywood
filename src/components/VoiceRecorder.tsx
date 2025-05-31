
import { useState, useEffect } from "react";
import { Mic, MicOff, Users, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VoiceRecorderProps {
  onRecordingComplete: (scales: string[]) => void;
  onCancel: () => void;
}

const VoiceRecorder = ({ onRecordingComplete, onCancel }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<'countdown' | 'recording' | 'analyzing'>('countdown');

  // Mock scales that could be detected
  const allScales = ['C Major', 'D Minor', 'E Minor', 'F Major', 'G Major', 'A Minor', 'B Minor', 'C# Minor', 'F# Major', 'Bb Major'];

  useEffect(() => {
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'countdown' && countdown === 0) {
      setPhase('recording');
      setIsRecording(true);
      simulateRecording();
    }
  }, [countdown, phase]);

  const simulateRecording = () => {
    // Simulate audio level changes
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
      setRecordingTime(prev => prev + 0.1);
    }, 100);

    // Auto-complete after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);
      setPhase('analyzing');
      
      // Analyze and return top 3 scales
      setTimeout(() => {
        const shuffled = [...allScales].sort(() => 0.5 - Math.random());
        const topScales = shuffled.slice(0, 3);
        onRecordingComplete(topScales);
      }, 2000);
    }, 10000);
  };

  if (phase === 'countdown') {
    return (
      <div className="text-center space-y-8">
        <h2 className="text-4xl font-bold text-white mb-8">Get Ready to Vibe!</h2>
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 animate-pulse">
          {countdown || "GO!"}
        </div>
        <p className="text-xl text-gray-200">Everyone shout your favorite musical scales!</p>
        <Button onClick={onCancel} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          Cancel
        </Button>
      </div>
    );
  }

  if (phase === 'analyzing') {
    return (
      <div className="text-center space-y-8">
        <div className="animate-spin w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full mx-auto"></div>
        <h2 className="text-4xl font-bold text-white">Analyzing the Vibe...</h2>
        <p className="text-xl text-gray-200">Processing crowd vocals and detecting musical scales</p>
        <div className="max-w-md mx-auto">
          <Progress value={75} className="h-3 bg-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <h2 className="text-4xl font-bold text-white mb-8">Recording Crowd Vibes!</h2>
      
      {/* Visual Audio Feedback */}
      <div className="relative">
        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center relative">
          <Mic className="w-16 h-16 text-white" />
          <div 
            className="absolute inset-0 rounded-full border-4 border-pink-400 animate-ping"
            style={{ animationDuration: `${2 - audioLevel/100}s` }}
          ></div>
        </div>
        
        {/* Audio Level Bars */}
        <div className="flex justify-center space-x-1 mt-8">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-4 bg-gradient-to-t from-pink-500 to-purple-600 rounded-full transition-all duration-100 ${
                audioLevel > i * 10 ? 'h-12' : 'h-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Recording Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4 text-white">
          <Volume2 className="w-6 h-6" />
          <span className="text-xl">Recording: {recordingTime.toFixed(1)}s</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-gray-200">
          <Users className="w-5 h-5" />
          <span>Crowd voices detected: {Math.floor(audioLevel/10) + 1}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <Progress value={recordingTime * 10} className="h-3 bg-white/20" />
        <p className="text-sm text-gray-300 mt-2">10 seconds of crowd vibes needed</p>
      </div>

      <Button 
        onClick={() => {
          setIsRecording(false);
          onCancel();
        }}
        variant="outline" 
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <MicOff className="w-4 h-4 mr-2" />
        Stop Recording
      </Button>
    </div>
  );
};

export default VoiceRecorder;
