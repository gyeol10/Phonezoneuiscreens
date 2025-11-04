import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, Droplet, Mountain, Package, TreePine } from 'lucide-react';
import { ResourceInfo } from '../App';

interface CallInProgressScreenProps {
  resourceInfo: ResourceInfo;
  onEnd: () => void;
}

const iconMap = {
  water: Droplet,
  metal: Mountain,
  plastic: Package,
  tree: TreePine,
};

const colorMap = {
  water: 'from-blue-400 to-blue-600',
  metal: 'from-gray-500 to-gray-700',
  plastic: 'from-green-400 to-green-600',
  tree: 'from-amber-600 to-amber-800',
};

const waveformColorMap = {
  water: 'bg-blue-400',
  metal: 'bg-gray-400',
  plastic: 'bg-green-400',
  tree: 'bg-amber-500',
};

export function CallInProgressScreen({ resourceInfo, onEnd }: CallInProgressScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAttemptedRef = useRef(false);

  const Icon = iconMap[resourceInfo.icon];
  const colorClass = colorMap[resourceInfo.icon];
  const waveformColor = waveformColorMap[resourceInfo.icon];

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Audio playback and auto-end on audio finish
  useEffect(() => {
    // Create audio element programmatically to avoid DOM removal issues
    if (!audioRef.current && !playAttemptedRef.current) {
      audioRef.current = new Audio(resourceInfo.audioFile);
      audioRef.current.volume = 1.0;
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;
    if (!audio || playAttemptedRef.current) return;

    playAttemptedRef.current = true;

    let fallbackTimer: NodeJS.Timeout | null = null;
    let hasEnded = false;

    // Handle audio end event
    const handleAudioEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      console.log('Audio ended successfully');
      
      // Wait 2 seconds after audio ends, then transition to ended screen
      setTimeout(() => {
        onEnd();
      }, 2000);
    };

    // Handle audio error (file not found or load failed)
    const handleAudioError = (e: Event) => {
      if (hasEnded) return;
      console.error('Audio error:', e);
      console.log('Using fallback timer (30 seconds)');
      // Use fallback timer (30 seconds)
      fallbackTimer = setTimeout(() => {
        if (!hasEnded) {
          hasEnded = true;
          onEnd();
        }
      }, 30000);
    };

    // Handle successful load
    const handleCanPlay = () => {
      console.log('Audio loaded successfully, starting playback...');
    };

    audio.addEventListener('ended', handleAudioEnd);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('canplay', handleCanPlay);

    // Try to play audio
    console.log('Attempting to play audio:', resourceInfo.audioFile);
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio playback started successfully');
        })
        .catch((error) => {
          console.error('Audio playback failed:', error);
          console.log('Error details:', {
            name: error.name,
            message: error.message,
            audioSrc: resourceInfo.audioFile,
          });
          // Use fallback timer if playback fails
          if (!hasEnded) {
            fallbackTimer = setTimeout(() => {
              if (!hasEnded) {
                hasEnded = true;
                onEnd();
              }
            }, 30000);
          }
        });
    }

    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('canplay', handleCanPlay);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // Don't pause on cleanup to avoid interrupting play
      // audio.pause();
    };
  }, [onEnd, resourceInfo.audioFile]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-between py-16 px-8">
      {/* Audio is created programmatically in useEffect to avoid DOM removal issues */}
      
      {/* Top section - Call info */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Profile picture / Icon */}
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-2xl`}>
          <Icon className="w-16 h-16 text-white" />
        </div>

        {/* Caller info */}
        <div className="text-center space-y-3">
          <h2 className="text-white">
            {resourceInfo.name}
          </h2>
          <p className="text-gray-400">
            통화 중...
          </p>
          
          {/* Timer */}
          <motion.div
            className="text-white text-3xl tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {formatTime(seconds)}
          </motion.div>
        </div>

        {/* Audio waveform animation */}
        <div className="flex items-center gap-1 h-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 ${waveformColor} rounded-full`}
              animate={{
                height: ['20%', '100%', '20%'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </div>

        {/* Instruction */}
        <p className="text-gray-500 text-sm text-center max-w-md">
          이어폰을 통해 자원의 목소리를 들어보세요
        </p>
      </div>

      {/* Bottom section - End call button */}
      <div className="w-full max-w-md flex justify-center">
        <button
          onClick={onEnd}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
            <Phone className="w-8 h-8 text-white rotate-[135deg]" />
          </div>
          <span className="text-white text-sm">통화 종료</span>
        </button>
      </div>
    </div>
  );
}
