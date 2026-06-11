// Authored Theatre.js project state — the saved choreography that ships to
// production. Theatre's Studio editor only loads in development; the keyframes
// you author there must be exported and loaded here so the guided tour plays
// back in production builds (see BRAIN.md → "Theatre.js Rules").
//
// HOW TO POPULATE (suruosh / Creative Director authoring flow):
//   1. Run the app in dev — the Theatre Studio panel loads automatically.
//   2. Author the camera choreography on the `Tour` sheet's `Camera` object.
//   3. In Studio: top-left project menu → "Export Project to JSON".
//   4. Paste the exported object below as the default export.
//
// Until authored state exists, this stays `null` and the app falls back to the
// code-defined placeholder choreography in `tourStops.ts`.
const theatreProjectState: unknown = null;

export default theatreProjectState;
