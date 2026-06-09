import { getProject, type ISheet } from '@theatre/core';

// Single Theatre.js project for the showroom. Theatre owns camera choreography,
// guided-tour movement, scene transitions, and story reveals (see BRAIN.md).
export const showroomProject = getProject('Spatial Commerce Showroom');

// Master sheet for the guided-tour camera sequence.
export const tourSheet: ISheet = showroomProject.sheet('Tour');

let studioInitialized = false;

// Initialise the Theatre.js Studio editor — development only.
// The authored choreography ships as state; the editor never loads in production.
export async function initTheatreStudio(): Promise<void> {
  if (studioInitialized || import.meta.env.PROD) return;
  studioInitialized = true;
  const studio = (await import('@theatre/studio')).default;
  studio.initialize();
}
