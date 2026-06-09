/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from 'react';
import { ShowroomScene } from './scenes/ShowroomScene';
import { WebGLErrorBoundary } from './components/ui/WebGLErrorBoundary';
import { TopBar } from './components/ui/TopBar';
import { Sidebar } from './components/ui/Sidebar';
import { MobileBar } from './components/ui/MobileBar';
import { ContentPanel } from './components/ui/ContentPanel';
import { TourController } from './features/tour/TourController';
import { useTheme } from './lib/theme/ThemeProvider';
import { ExperienceState, useExperience } from './lib/experience';
import { usePointerParallax } from './hooks/usePointerParallax';
import { useLenis } from './hooks/useLenis';

interface ShowroomExperienceProps {
  onNavigate?: (page: string) => void;
}

// Composition root: the showroom world (3D) with the spatial UI overlaid.
// Providers (theme + experience) live above this in <App>.
export function ShowroomExperience({ onNavigate }: ShowroomExperienceProps) {
  const { isDark } = useTheme();
  const { state } = useExperience();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const parallax = usePointerParallax(!isMobile);
  const contentRef = useRef<HTMLDivElement>(null);
  useLenis(parallax.targetRef, contentRef);

  const tourActive = state === ExperienceState.GuidedTour;

  return (
    <div
      ref={parallax.boundsRef}
      className={`w-full h-dvh overflow-hidden relative transition-colors duration-700 ${
        isDark
          ? 'dark text-white bg-linear-to-br from-neutral-900 to-black'
          : 'text-gray-900 bg-linear-to-br from-white to-gray-200'
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
        className={`absolute top-[30%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 lg:w-125 h-75 lg:h-125 blur-[100px] rounded-full pointer-events-none z-0 transition-colors duration-700 ${
          isDark ? 'bg-white/10' : 'bg-black/5'
        }`}
      />

      <MobileBar onNavigate={onNavigate} />

      {/* The world */}
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary>
          <ShowroomScene isMobile={isMobile} tourActive={tourActive} />
        </WebGLErrorBoundary>
      </div>

      {/* Guided-tour playback (controls the Theatre sheet; camera applied in-scene) */}
      <TourController active={tourActive} />

      {/* Spatial UI surface — tilts with pointer parallax, scrolls with Lenis */}
      <div
        ref={parallax.targetRef}
        id="scroll-container"
        className="absolute inset-0 z-10 w-full h-full overflow-y-auto lg:overflow-hidden overflow-x-hidden no-scrollbar pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={contentRef} className="min-h-dvh w-full flex flex-col">
          <TopBar />
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center pt-[65vh] pb-30 lg:pt-0 lg:pb-0 pointer-events-none">
            <Sidebar onNavigate={onNavigate} />
            <ContentPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
