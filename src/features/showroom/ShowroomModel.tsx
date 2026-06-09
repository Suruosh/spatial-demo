import { useGLTF } from '@react-three/drei';

// Production showroom object loaded from `public/3d/scene.gltf`. The glTF and its
// `scene.bin` + textures live under public/ so the file's relative URIs resolve at
// a static URL (Vite won't rewrite a multi-file glTF's internal references).
//
// The source model sits far from origin and is authored in large units; the
// parent <Center> recenters it, and `scale` normalizes it to showroom size.
// Tweak `scale` to taste.
const MODEL_URL = '/3d/scene.gltf';

export function ShowroomModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} scale={0.5} castShadow receiveShadow />;
}

useGLTF.preload(MODEL_URL);
