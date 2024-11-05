"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

type AudioPlayerProps = {
  audioUrl: string;
};

export const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlayState = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', handlePlayState);
    audio.addEventListener('pause', handlePlayState);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', handlePlayState);
      audio.removeEventListener('pause', handlePlayState);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
      <audio ref={audioRef} src={audioUrl} />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
        disabled={isLoading}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
        ) : (
          <Play className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="flex-1">
        <input
          type="range"
          value={currentTime}
          min={0}
          max={duration || 100}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-600 dark:accent-neutral-400"
          style={{
            background: `linear-gradient(to right, 
              ${isPlaying ? 'rgb(82 82 82)' : 'rgb(115 115 115)'} ${(currentTime / duration) * 100}%, 
              rgb(229 229 229) ${(currentTime / duration) * 100}%)`
          }}
        />
      </div>
    </div>
  );
}; 