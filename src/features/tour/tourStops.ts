import { ExperienceState } from '../../lib/experience';

// Tour stops — the spine of the guided interior tour (BRAIN.md → Pillar 4).
// Each stop maps a point on the Theatre.js sequence timeline to an experience
// state and a camera pose. This is the shared contract between the sequence
// playhead, the experience state machine, and the placeholder choreography.
//
// Camera narrative ownership: these poses are a calm, premium PLACEHOLDER so the
// tour works out of the box. They are superseded by Studio-authored keyframes
// once exported into `lib/theatre/state.ts` (suruosh / Creative Director).

export interface TourStop {
  /** Position on the Theatre sequence timeline, in seconds. */
  position: number;
  /** Experience state this stop represents (shared vocabulary). */
  state: ExperienceState;
  /** Camera world position at this stop. */
  camera: [x: number, y: number, z: number];
  /** Point the camera looks at, at this stop. */
  lookAt: [x: number, y: number, z: number];
  /** Human-readable label for UI / debugging. */
  label: string;
}

// Slow exterior sweep → interior entry → close product framing. Movement is
// gentle and continuous (no abrupt cuts), per the camera philosophy.
export const TOUR_STOPS: TourStop[] = [
  { position: 0, state: ExperienceState.ExteriorOrbit, camera: [4.5, 1.8, 4.5], lookAt: [0, 0.5, 0], label: 'Exterior — approach' },
  { position: 3, state: ExperienceState.ExteriorOrbit, camera: [0, 2.0, 6.0], lookAt: [0, 0.5, 0], label: 'Exterior — front' },
  { position: 6, state: ExperienceState.InteriorEntry, camera: [-3.5, 1.5, 4.0], lookAt: [0, 0.5, 0], label: 'Interior — entry' },
  { position: 9, state: ExperienceState.GuidedTour, camera: [-1.5, 1.2, 2.6], lookAt: [0.2, 0.5, 0], label: 'Tour stop 01' },
  { position: 12, state: ExperienceState.GuidedTour, camera: [1.6, 1.1, 2.4], lookAt: [0.3, 0.5, 0], label: 'Tour stop 02' },
  { position: 15, state: ExperienceState.ProductFocus, camera: [0, 1.4, 3.2], lookAt: [0, 0.5, 0], label: 'Product — focus' },
];

// Total timeline length, in seconds (last stop's position).
export const TOUR_LENGTH = TOUR_STOPS[TOUR_STOPS.length - 1].position;

// Sequence position for a given experience state — first stop tagged with it.
// Lets the state machine drive the playhead to the matching point on the tour.
export function sequencePositionForState(state: ExperienceState): number | undefined {
  return TOUR_STOPS.find((stop) => stop.state === state)?.position;
}
