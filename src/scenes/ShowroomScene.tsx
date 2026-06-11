import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f';
import { tourSheet } from '../lib/theatre/project';
import type { CameraMode } from '../lib/experience/stateConfig';
import { ShowroomModel } from '../features/showroom/ShowroomModel';
import { ShowroomEnvironment } from '../features/showroom/ShowroomEnvironment';

interface ShowroomSceneProps {
  isMobile: boolean;
  /** Which system owns the camera (derived from STATE_CONFIG). */
  cameraMode: CameraMode;
}

// Picks the active camera/controls for the current mode. Keyed on cameraMode by
// the caller so React remounts cleanly on change (avoids stale makeDefault refs).
function CameraRig({ cameraMode }: { cameraMode: CameraMode }) {
  switch (cameraMode) {
    case 'theatre':
      // Theatre-controlled tour camera; authored in Studio, scrubbed by scroll.
      return <PerspectiveCamera theatreKey="Camera" makeDefault fov={45} position={[0, 1.6, 6]} />;
    case 'explore':
      // Seam for Phase 7 (WASD human-scale walk). Until then, allow manual orbit.
      return <OrbitControls enableZoom enablePan={false} makeDefault />;
    case 'orbit':
    default:
      return <OrbitControls enableZoom enablePan={false} autoRotate={false} makeDefault />;
  }
}

// Scene contents bound to the Theatre.js `Tour` sheet via <SheetProvider>.
// Objects wrapped in `editable` (e.*) appear in Studio with transform gizmos.
function SceneContents({ isMobile, cameraMode }: ShowroomSceneProps) {
  return (
    <SheetProvider sheet={tourSheet}>
      <ShowroomEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow />

      <CameraRig key={cameraMode} cameraMode={cameraMode} />

      <Suspense fallback={null}>
        {/* Centered between the sidebar (left) and content panel (right). */}
        <Center position={[0, isMobile ? 1.5 : -0.5, 0]}>
          <e.group theatreKey="ShowroomModel">
            <ShowroomModel />
          </e.group>
        </Center>
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Suspense>
    </SheetProvider>
  );
}

// The showroom world. The 3D scene is the application; UI overlays support it.
export function ShowroomScene({ isMobile, cameraMode }: ShowroomSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      shadows={{ type: THREE.PCFShadowMap }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <SceneContents isMobile={isMobile} cameraMode={cameraMode} />
    </Canvas>
  );
}
