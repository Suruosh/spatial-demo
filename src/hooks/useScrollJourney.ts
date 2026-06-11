import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';
import type { ExperienceState } from '../lib/experience';
import { sequencePositionForProgress, stateForProgress } from '../lib/experience/journeySegments';
import { tourSheet } from '../lib/theatre/project';

interface UseScrollJourneyOptions {
  /** Active only during the cinematic spine; suspended in Explore / ProductFocus / Cart. */
  enabled: boolean;
  /** Called when scroll crosses into a new state bucket. */
  onState: (next: ExperienceState) => void;
}

// Bridges scroll → the cinematic journey, honoring the BRAIN.md responsibility
// split: Lenis owns scroll; this hook maps scroll progress to (1) the Theatre
// playhead (which drives the camera) and (2) the discrete ExperienceState bucket.
// It never touches the camera directly — Theatre interpolates the authored pose.
export function useScrollJourney(lenis: Lenis | null, { enabled, onState }: UseScrollJourneyOptions): void {
  // Avoids calling onState every scroll frame — only on bucket change (60fps guard).
  const lastState = useRef<ExperienceState | null>(null);

  useEffect(() => {
    if (!lenis || !enabled) return;

    const handleScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = limit > 0 ? scroll / limit : 0;
      tourSheet.sequence.position = sequencePositionForProgress(progress);
      const next = stateForProgress(progress);
      if (next !== lastState.current) {
        lastState.current = next;
        onState(next);
      }
    };

    lenis.on('scroll', handleScroll);
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, enabled, onState]);
}
