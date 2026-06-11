import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f';
import { tourSheet } from '../lib/theatre/project';
import { ShowroomModel } from '../features/showroom/ShowroomModel';
import { ShowroomEnvironment } from '../features/showroom/ShowroomEnvironment';

interface ShowroomSceneProps {
  isMobile: boolean;
  /** When true, Theatre.js drives the camera; otherwise cinematic orbit is active. */
  tourActive: boolean;
}

// Scene contents bound to the Theatre.js `Tour` sheet via <SheetProvider>.
// Objects wrapped in `editable` (e.*) appear in Studio with transform gizmos and
// keyframeable position/rotation/scale; the <PerspectiveCamera> is authored in
// Studio and drives the guided tour.
function SceneContents({ isMobile, tourActive }: ShowroomSceneProps) {
  return (
    <SheetProvider sheet={tourSheet}>
      <ShowroomEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow />

      {/* Theatre-controlled tour camera. Active (makeDefault) only during the
          guided tour; OrbitControls owns the camera otherwise. */}
      {tourActive && (
        <PerspectiveCamera theatreKey="Camera" makeDefault fov={45} position={[0, 1.6, 6]} />
      )}

      <Suspense fallback={null}>
        {/* Centered between the sidebar (left) and content panel (right). */}
        <Center position={[0, isMobile ? 1.5 : -0.5, 0]}>
          <e.group theatreKey="ShowroomModel">
            <ShowroomModel />
          </e.group>
        </Center>
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Suspense>

      {!tourActive && (
        <OrbitControls enableZoom enablePan={false} autoRotate={false} makeDefault />
      )}
    </SheetProvider>
  );
}

// The showroom world. The 3D scene is the application; UI overlays support it.
export function ShowroomScene({ isMobile, tourActive }: ShowroomSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      shadows={{ type: THREE.PCFShadowMap }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <SceneContents isMobile={isMobile} tourActive={tourActive} />
    </Canvas>
  );
}
