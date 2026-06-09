import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ShowroomModel } from '../features/showroom/ShowroomModel';
import { ShowroomEnvironment } from '../features/showroom/ShowroomEnvironment';
import { TheatreCamera } from '../features/tour/TheatreCamera';

interface ShowroomSceneProps {
  isMobile: boolean;
  /** When true, Theatre.js drives the camera; otherwise cinematic orbit is active. */
  tourActive: boolean;
}

function SceneContents({ isMobile, tourActive }: ShowroomSceneProps) {
  return (
    <>
      <ShowroomEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow />

      <Suspense fallback={null}>
        {/* Centered between the sidebar (left) and content panel (right); x=0 sits
            in the gap. No <Float> — the room stays stable rather than bobbing. */}
        <Center position={[0, isMobile ? 1.5 : -0.5, 0]}>
          <ShowroomModel />
        </Center>
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Suspense>

      {tourActive ? (
        <TheatreCamera />
      ) : (
        <OrbitControls enableZoom enablePan={false} makeDefault />
      )}
    </>
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
