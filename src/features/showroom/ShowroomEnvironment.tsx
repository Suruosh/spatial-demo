import { Environment, Lightformer } from '@react-three/drei';

// Self-contained studio lighting — no network HDR (avoids CDN/CORS failures that
// leave metallic surfaces flat). Tuned for a calm, premium showroom (BRAIN.md):
// a soft key from above with cool/warm rim accents for reflective depth.
export function ShowroomEnvironment() {
  return (
    <Environment resolution={256}>
      {/* Key light overhead */}
      <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[12, 12, 1]} color="#ffffff" />
      {/* Cool rim, left */}
      <Lightformer intensity={1.4} position={[-6, 1, 1]} scale={[3, 8, 1]} color="#bcd4ff" />
      {/* Warm rim, right */}
      <Lightformer intensity={1.4} position={[6, 1, 1]} scale={[3, 8, 1]} color="#ffd9b3" />
      {/* Soft fill from below */}
      <Lightformer intensity={0.6} position={[0, -4, 2]} scale={[12, 5, 1]} color="#ffffff" />
    </Environment>
  );
}
