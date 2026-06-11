import { getProject, type ISheet, type IProject } from '@theatre/core';
import theatreProjectState from './state';

// Whether authored choreography has been exported from Studio and loaded.
// When false, the guided tour uses the code-defined placeholder (see tourStops.ts).
export const hasAuthoredTour = theatreProjectState != null;

// Single Theatre.js project for the showroom. Theatre owns camera choreography,
// guided-tour movement, scene transitions, and story reveals (see BRAIN.md).
// In production, authored keyframes are loaded from the saved state; in dev the
// Studio editor lets that state be (re)authored.
export const showroomProject: IProject = hasAuthoredTour
  ? getProject('Spatial Commerce Showroom', { state: theatreProjectState })
  : getProject('Spatial Commerce Showroom');

// Master sheet for the guided-tour camera sequence.
export const tourSheet: ISheet = showroomProject.sheet('Tour');
