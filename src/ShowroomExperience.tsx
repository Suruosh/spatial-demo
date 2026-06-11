import { useEffect, useRef, useState } from 'react';
import { ShowroomScene } from './scenes/ShowroomScene';
import { WebGLErrorBoundary } from './components/ui/WebGLErrorBoundary';
import { TopBar } from './components/ui/TopBar';
import { Sidebar } from './components/ui/Sidebar';
import { MobileBar } from './components/ui/MobileBar';
import { ContentPanel } from './components/ui/ContentPanel';
import { useTheme } from './lib/theme/ThemeProvider';
import { useExperience } from './lib/experience';
import { STATE_CONFIG } from './lib/experience/stateConfig';
import { usePointerParallax } from './hooks/usePointerParallax';
import { useLenis } from './hooks/useLenis';
import { useScrollJourney } from './hooks/useScrollJourney';

// Composition root: the showroom world (3D) with the spatial UI overlaid.
// Providers (theme + experience) live above this in <App>.
export function ShowroomExperience() {
  const { isDark } = useTheme();
  const { state, setState } = useExperience();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const parallax = usePointerParallax(!isMobile);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis(parallax.targetRef, contentRef);

  // Per-state behavior (camera authority, scroll journey, UI reveal).
  const behavior = STATE_CONFIG[state];

  // Scroll → cinematic journey: Lenis progress scrubs the Theatre playhead and
  // flips the state bucket. Suspended in Explore / ProductFocus / Cart.
  useScrollJourney(lenis, { enabled: behavior.scrollJourney, onState: setState });

  return (
    <div
      ref={parallax.boundsRef}
      className={`w-full h-[100dvh] overflow-hidden relative transition-colors duration-700 ${
        isDark
          ? 'dark text-white bg-gradient-to-br from-neutral-900 to-black'
          : 'text-gray-900 bg-gradient-to-br from-white to-gray-200'
      }`}
      style={{ perspective: '2000px' }}
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
    >
      {/* Dimming overlay to make UI pop */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-black/40 mix-blend-multiply' : 'bg-white/40 mix-blend-screen'
        }`}
      />

      {/* Background glow behind the 3D object */}
      <div
        className={`absolute top-[30%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] blur-[100px] rounded-full pointer-events-none z-0 transition-colors duration-700 ${
          isDark ? 'bg-white/10' : 'bg-black/5'
        }`}
      />

      <MobileBar />

      {/* The world */}
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary>
          <ShowroomScene isMobile={isMobile} cameraMode={behavior.cameraMode} />
        </WebGLErrorBoundary>
      </div>

      {/* Spatial UI surface — tilts with pointer parallax, scrolls with Lenis.
          The tall inner track gives the cinematic journey its scroll length on
          all viewports; the UI is pinned (sticky) over it so it stays attached to
          space while scrolling scrubs the Theatre camera (see useScrollJourney). */}
      <div
        ref={parallax.targetRef}
        id="scroll-container"
        className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={contentRef} className="relative w-full" style={{ height: '400dvh' }}>
          <div className="sticky top-0 h-[100dvh] w-full flex flex-col">
            <TopBar />
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center pt-[65vh] pb-[120px] lg:pt-0 lg:pb-0 pointer-events-none">
              <Sidebar />
              <ContentPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
