
import { useState } from "react";
import { Music, Play, RotateCcw, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SongRecommendationProps {
  detectedScales: string[];
  onStartNew: () => void;
}

// Mock Bollywood songs database
const bollywoodSongs = [
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    movie: "Aashiqui 2",
    year: "2013",
    scales: ["C Major", "A Minor", "F Major"],
    vibe: "Romantic",
    tempo: "Slow",
    energy: "Emotional"
  },
  {
    title: "Kal Ho Naa Ho",
    artist: "Sonu Nigam",
    movie: "Kal Ho Naa Ho", 
    year: "2003",
    scales: ["D Minor", "G Major", "E Minor"],
    vibe: "Inspirational",
    tempo: "Medium",
    energy: "Uplifting"
  },
  {
    title: "Nagada Sang Dhol",
    artist: "Shreya Ghoshal",
    movie: "Goliyon Ki Raasleela Ram-Leela",
    year: "2013",
    scales: ["B Minor", "F# Major", "C# Minor"],
    vibe: "Festive",
    tempo: "Fast",
    energy: "High Energy"
  },
  {
    title: "Ilahi",
    artist: "Arijit Singh",
    movie: "Yeh Jawaani Hai Deewani",
    year: "2013",
    scales: ["Bb Major", "G Major", "D Minor"],
    vibe: "Adventure",
    tempo: "Medium",
    energy: "Feel Good"
  }
];

const SongRecommendation = ({ detectedScales, onStartNew }: SongRecommendationProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // Find best matching song based on detected scales
  const findBestMatch = () => {
    let bestMatch = bollywoodSongs[0];
    let maxMatches = 0;

    bollywoodSongs.forEach(song => {
      const matches = song.scales.filter(scale => detectedScales.includes(scale)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = song;
      }
    });

    return { song: bestMatch, matchCount: maxMatches };
  };

  const { song, matchCount } = findBestMatch();
  const matchPercentage = Math.round((matchCount / 3) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">Perfect Match Found! 🎵</h2>
        <p className="text-xl text-gray-200">Based on your crowd's vibe, here's your song</p>
      </div>

      {/* Detected Scales */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Music className="w-5 h-5 mr-2" />
            Detected Scales from Crowd
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {detectedScales.map((scale, index) => (
              <Badge 
                key={index}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1"
              >
                {scale}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Song Recommendation */}
      <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 p-1">
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{song.title}</h3>
                <p className="text-lg text-gray-200">{song.artist}</p>
                <p className="text-gray-300">{song.movie} • {song.year}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`${isLiked ? 'text-red-400' : 'text-white'} hover:bg-white/20`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Match Info */}
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Vibe Match</span>
                <span className="text-green-400 font-bold">{matchPercentage}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Song Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Vibe</p>
                <p className="text-white font-medium">{song.vibe}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Tempo</p>
                <p className="text-white font-medium">{song.tempo}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Energy</p>
                <p className="text-white font-medium">{song.energy}</p>
              </div>
            </div>

            {/* Matching Scales */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm mb-2">Matching scales in this song:</p>
              <div className="flex flex-wrap gap-2">
                {song.scales.map((scale, index) => (
                  <Badge 
                    key={index}
                    variant={detectedScales.includes(scale) ? "default" : "secondary"}
                    className={detectedScales.includes(scale) 
                      ? "bg-green-500 text-white" 
                      : "bg-white/20 text-gray-300"
                    }
                  >
                    {scale}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Play on Spotify
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Start New Session */}
      <div className="text-center">
        <Button 
          onClick={onStartNew}
          variant="outline"
          size="lg"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New VibeCheck
        </Button>
      </div>
    </div>
  );
};

export default SongRecommendation;
