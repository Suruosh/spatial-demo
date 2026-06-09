import { useEffect } from 'react';
import { tourSheet } from '../../lib/theatre/project';

interface TourControllerProps {
  active: boolean;
}

// Plays the authored Theatre.js camera sequence while the guided tour is active.
// Lives outside the R3F Canvas — it controls the sheet; <TheatreCamera> applies
// the resulting values to the camera.
export function TourController({ active }: TourControllerProps) {
  useEffect(() => {
    if (!active) return;
    const sequence = tourSheet.sequence;
    void sequence.play({ iterationCount: 1, rate: 0.6 });
    return () => {
      sequence.pause();
    };
  }, [active]);

  return null;
}
