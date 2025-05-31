
import { useState } from "react";
import { Mic, Music, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceRecorder from "@/components/VoiceRecorder";
import SongRecommendation from "@/components/SongRecommendation";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [detectedScales, setDetectedScales] = useState<string[]>([]);

  const handleRecordingComplete = (scales: string[]) => {
    setDetectedScales(scales);
    setShowRecommendation(true);
    setIsRecording(false);
  };

  const resetApp = () => {
    setIsRecording(false);
    setShowRecommendation(false);
    setDetectedScales([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-yellow-400 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-400 rounded-full blur-md animate-ping"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {!isRecording && !showRecommendation ? (
          // Landing Page
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-pulse">
                Vibe<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">Alchemy</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                When the party mood dies, let the crowd's voice guide the vibe! 
                Shout your scales, get your perfect Bollywood mix.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto my-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Crowd Power</h3>
                <p className="text-gray-300">Everyone shouts their favorite scales together</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
                <p className="text-gray-300">Detects top 3 musical scales from the chaos</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <Music className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Perfect Match</h3>
                <p className="text-gray-300">Get Bollywood songs mixing those scales</p>
              </div>
            </div>

            <Button 
              onClick={() => setIsRecording(true)}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <Mic className="w-6 h-6 mr-3" />
              Start VibeAlchemy
            </Button>
          </div>
        ) : isRecording ? (
          // Recording Interface
          <VoiceRecorder 
            onRecordingComplete={handleRecordingComplete}
            onCancel={resetApp}
          />
        ) : (
          // Song Recommendation
          <SongRecommendation 
            detectedScales={detectedScales}
            onStartNew={resetApp}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
