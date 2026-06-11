import { useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export function useAudio(audioPath: string, options: UseAudioOptions = {}) {
  const { autoPlay = false, loop = true, volume = 0.5 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentVolume, setCurrentVolume] = useState(volume);

  useEffect(() => {
    const audio = new Audio(audioPath);
    audio.loop = loop;
    audio.volume = currentVolume;
    audioRef.current = audio;

    if (autoPlay) {
      audio.play().catch(() => {
        // Auto-play prevented by browser
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioPath]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setCurrentVolume(clampedVolume);
  };

  return {
    play,
    pause,
    togglePlayPause,
    isPlaying,
    volume: currentVolume,
    setVolume,
  };
}
