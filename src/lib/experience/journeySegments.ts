import { ExperienceState } from './states';
import { TOUR_LENGTH } from '../../features/tour/tourStops';

// Maps normalized scroll progress (0→1) to both an experience state and a
// position on the single Theatre.js timeline. This is the contract the scroll
// journey scrubs through: GSAP/Lenis read scroll → progress; Theatre maps
// progress → sequence.position → camera; React derives the state bucket.
//
// Only the cinematic spine (Landing → GuidedTour) is scroll-driven. Explore,
// ProductFocus, and Cart are entered explicitly, not by scrolling.

export interface JourneySegment {
  state: ExperienceState;
  progressStart: number;
  progressEnd: number;
  seqStart: number;
  seqEnd: number;
}

const JOURNEY_STATES: ExperienceState[] = [
  ExperienceState.Landing,
  ExperienceState.Descent,
  ExperienceState.ExteriorOrbit,
  ExperienceState.UiReveal,
  ExperienceState.InteriorEntry,
  ExperienceState.GuidedTour,
];

// Equal progress slices, mapped linearly onto the Theatre timeline [0, TOUR_LENGTH].
// (Slices can be re-weighted later without touching consumers.)
export const JOURNEY_SEGMENTS: JourneySegment[] = JOURNEY_STATES.map((state, i) => {
  const n = JOURNEY_STATES.length;
  return {
    state,
    progressStart: i / n,
    progressEnd: (i + 1) / n,
    seqStart: (i / n) * TOUR_LENGTH,
    seqEnd: ((i + 1) / n) * TOUR_LENGTH,
  };
});

const clamp01 = (p: number): number => Math.min(1, Math.max(0, p));

// The experience state for a given scroll progress (the active segment's state).
export function stateForProgress(progress: number): ExperienceState {
  const p = clamp01(progress);
  const segment = JOURNEY_SEGMENTS.find((s) => p < s.progressEnd);
  return (segment ?? JOURNEY_SEGMENTS[JOURNEY_SEGMENTS.length - 1]).state;
}

// The Theatre sequence position (seconds) for a given scroll progress.
// Linear across the whole timeline so the camera scrubs continuously.
export function sequencePositionForProgress(progress: number): number {
  return clamp01(progress) * TOUR_LENGTH;
}
