import { useCallback, useEffect, useRef, useState } from 'react';
import type CameraControlsImpl from 'camera-controls';
import { ShowroomScene } from './scenes/ShowroomScene';
import { WebGLErrorBoundary } from './components/ui/WebGLErrorBoundary';
import { TopBar } from './components/ui/TopBar';
import { Sidebar } from './components/ui/Sidebar';
import { MobileBar } from './components/ui/MobileBar';
import { ContentPanel } from './components/ui/ContentPanel';
import { LandingOverlay } from './features/landing/LandingOverlay';
import { SceneLoader } from './features/landing/SceneLoader';
import { PRODUCTS } from './data/products';
import { useTheme } from './lib/theme/ThemeProvider';
import { useExperience } from './lib/experience';
import { JOURNEY_STOPS } from './features/tour/tourStops';
import { ScrollNavContext, type ScrollNav } from './lib/scrollNav';
import { ProductSelectionContext, type ProductSelection } from './lib/productSelection';
import { usePointerParallax } from './hooks/usePointerParallax';

// The stop the pre-landing "Enter" glides to (UI reveal).
const REVEAL_INDEX = Math.max(0, JOURNEY_STOPS.findIndex((s) => s.id === 'ui-reveal'));

// Composition root: the showroom world (3D) with the spatial UI overlaid.
// The 3D is directly controlled (orbit/zoom/pan, bounded); the cinematic tour is
// driven by the UI buttons gliding the camera between stops. Scroll lives on the
// UI/panels — it never drives the 3D camera (Chartogne-Taillet reference).
export function ShowroomExperience() {
  const { isDark } = useTheme();
  const { setState } = useExperience();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const parallax = usePointerParallax(!isMobile);
  const controlsRef = useRef<CameraControlsImpl | null>(null);

  const [stopIndex, setStopIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) ?? null;

  // Glide the controlled camera to a stop (smooth setLookAt) and sync state + panel.
  const goToStop = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(JOURNEY_STOPS.length - 1, index));
      const stop = JOURNEY_STOPS[i];
      const controls = controlsRef.current;
      if (controls) {
        void controls.setLookAt(
          stop.camera[0], stop.camera[1], stop.camera[2],
          stop.lookAt[0], stop.lookAt[1], stop.lookAt[2],
          true,
        );
      }
      setStopIndex(i);
      setState(stop.state);
    },
    [setState],
  );

  const goToNextStop = useCallback(() => goToStop(stopIndex + 1), [stopIndex, goToStop]);
  const goToPrevStop = useCallback(() => goToStop(stopIndex - 1), [stopIndex, goToStop]);

  // "Enter" from the pre-landing: reveal the UI and glide into the showroom.
  const handleEnter = useCallback(() => {
    setRevealed(true);
    goToStop(REVEAL_INDEX);
  }, [goToStop]);

  // "End tour": glide back to the Welcome / "Step inside" stop (UI stays revealed).
  const endTour = useCallback(() => {
    goToStop(REVEAL_INDEX);
  }, [goToStop]);

  const nav: ScrollNav = { goToNextStop, goToPrevStop, endTour, stopIndex };
  const productSelection: ProductSelection = {
    selectedProduct,
    clearProduct: () => setSelectedProductId(null),
  };

  // Smooth fade in/out (visibility flip delayed until the opacity fade finishes).
  const revealClass = (visible: boolean) => `fade-layer ${visible ? 'is-shown' : ''}`;

  return (
    <ScrollNavContext.Provider value={nav}>
    <ProductSelectionContext.Provider value={productSelection}>
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
        {/* The world — receives controlled orbit/zoom/pan; fills the viewport. */}
        <div className="absolute inset-0 z-0">
          <WebGLErrorBoundary>
            <ShowroomScene
              isDark={isDark}
              controlsRef={controlsRef}
              onSelectProduct={setSelectedProductId}
            />
          </WebGLErrorBoundary>
        </div>

        <div className={revealClass(revealed)}>
          <MobileBar />
        </div>

        {/* Spatial UI overlay — a scroll container (overall page scroll: the
            content/panel moves with the scroll), but pointer-events-none so drags
            on empty areas pass through to the 3D (orbit/zoom/pan + item click stay
            live). Scrolling happens by wheel/swipe over the UI widgets, which are
            pointer-events-auto and scroll this container. */}
        <div
          ref={parallax.targetRef}
          className={`absolute inset-0 z-10 overflow-y-auto no-scrollbar pointer-events-none ${revealClass(revealed)}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="min-h-full w-full flex flex-col">
            <TopBar />
            {/* 3D occupies the upper area on mobile; the panel sits below with
                bottom room so the fixed MobileBar never covers it. */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center pt-[65vh] pb-[120px] lg:pt-0 lg:pb-0 pointer-events-none">
              <Sidebar />
              <ContentPanel />
            </div>
          </div>
        </div>

        {/* Pre-landing — cinematic first screen (Pillar 1). Fades out on Enter.
            pointer-events-none so it never blocks the 3D; only Enter opts in. */}
        <div className={`absolute inset-0 z-30 pointer-events-none ${revealClass(!revealed)}`}>
          <LandingOverlay onEnter={handleEnter} />
        </div>

        {/* Cinematic loader — holds until the model is ready, then reveals. */}
        <SceneLoader />
      </div>
    </ProductSelectionContext.Provider>
    </ScrollNavContext.Provider>
  );
}
