import { Music } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

export function MusicControl() {
  const { togglePlayPause, isPlaying } = useAudio('/audio/ambient.m4a', { loop: true, volume: 0.2 });

  return (
    <button
      type="button"
      aria-label="Toggle Music"
      onClick={togglePlayPause}
      className={`fixed right-4 bottom-20 lg:right-8 lg:top-8 lg:bottom-auto w-12 lg:w-14 h-12 lg:h-14 rounded-full flex items-center justify-center transition-all z-20 pointer-events-auto ${
        isPlaying
          ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-lg'
          : 'text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 shadow'
      }`}
    >
      <Music className="w-5 lg:w-6 h-5 lg:h-6" />
    </button>
  );
}
