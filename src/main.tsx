import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const originalWarn = console.warn;
console.warn = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock: This module has been deprecated')) return;
    if (args[0].includes('PCFSoftShadowMap has been deprecated')) return;
  }
  originalWarn(...args);
};

// Bootstrap order matters: the Theatre.js Studio editor (dev only) must be
// initialised BEFORE the app loads, because the scene modules call getProject()
// at import time and Studio only attaches to projects created after init.
// App is imported dynamically so that ordering holds. In production the studio
// branch is dropped and @theatre/studio is tree-shaken out.
async function bootstrap(): Promise<void> {
  if (import.meta.env.DEV) {
    const { initStudio } = await import('./lib/theatre/studio-dev');
    initStudio();
  }
  const { default: App } = await import('./App.tsx');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
