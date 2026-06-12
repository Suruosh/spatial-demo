import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalWarn = console.warn;
console.warn = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock: This module has been deprecated')) return;
    if (args[0].includes('PCFSoftShadowMap has been deprecated')) return;
  }
  originalWarn(...args);
};

// The camera is driven by CameraControls (not Theatre.js), so the Theatre Studio
// editor is no longer initialised — its panels are kept out of the UI.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
