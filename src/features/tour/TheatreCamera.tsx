import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { tourSheet } from '../../lib/theatre/project';

// Camera choreography target, authored in Theatre.js Studio (dev) and played
// back as state. Position + lookAt are driven by the tour sequence.
const cameraObject = tourSheet.object('Camera', {
  position: { x: 0, y: 1.6, z: 6 },
  lookAt: { x: 0, y: 0.5, z: 0 },
});

// Applies the Theatre-authored camera values to the live R3F camera.
// Mounted only while the guided tour is active (OrbitControls owns the camera otherwise).
export function TheatreCamera() {
  const camera = useThree((state) => state.camera);
  const lookAt = useRef(new THREE.Vector3(0, 0.5, 0));

  useEffect(() => {
    const unsubscribe = cameraObject.onValuesChange((values) => {
      camera.position.set(values.position.x, values.position.y, values.position.z);
      lookAt.current.set(values.lookAt.x, values.lookAt.y, values.lookAt.z);
    });
    return unsubscribe;
  }, [camera]);

  useFrame(() => {
    camera.lookAt(lookAt.current);
  });

  return null;
}
