import { useEffect } from 'react';
import { tourSheet } from '../../lib/theatre/project';
import { TOUR_LENGTH } from './tourStops';

interface TourControllerProps {
  active: boolean;
}

// Plays the Theatre.js camera sequence while the guided tour is active. Lives
// outside the R3F Canvas — it controls the sheet's playhead; the @theatre/r3f
// <PerspectiveCamera theatreKey="Camera"> in the scene applies the authored pose.
//
// The explicit range drives the playhead across the full tour timeline even
// before Studio keyframes exist (the placeholder choreography reads the playhead
// position). Rate is kept below 1 for slow, premium pacing (BRAIN.md).
export function TourController({ active }: TourControllerProps) {
  useEffect(() => {
    if (!active) return;
    const sequence = tourSheet.sequence;
    sequence.position = 0;
    void sequence.play({ iterationCount: 1, range: [0, TOUR_LENGTH], rate: 0.6 });
    return () => {
      sequence.pause();
    };
  }, [active]);

  return null;
}
