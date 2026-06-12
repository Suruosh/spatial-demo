import { createXRStore } from '@react-three/xr';

// Single XR store shared between the scene (<XR store={xrStore}>) and the VR
// button (xrStore.enterVR()). XR is an enhancement layered on the same world —
// the full experience works without a headset (BRAIN.md: web-first, XR-ready).
export const xrStore = createXRStore({
  // Calm defaults; the showroom is the content, not the controllers.
  controller: true,
  hand: true,
});
