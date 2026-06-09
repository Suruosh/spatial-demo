import { useEffect, useRef, type PointerEvent, type RefObject } from 'react';
import gsap from 'gsap';

interface PointerParallax {
  /** Element whose bounds define the parallax field (the full-screen stage). */
  boundsRef: RefObject<HTMLDivElement | null>;
  /** Element that tilts in 3D space. */
  targetRef: RefObject<HTMLDivElement | null>;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
}

// GSAP-driven 3D tilt on pointer move — the spatial replacement for Framer springs.
export function usePointerParallax(enabled: boolean): PointerParallax {
  const boundsRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const rotateX = useRef<gsap.QuickToFunc | null>(null);
  const rotateY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    rotateX.current = gsap.quickTo(target, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    rotateY.current = gsap.quickTo(target, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    return () => {
      gsap.killTweensOf(target);
      rotateX.current = null;
      rotateY.current = null;
    };
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const bounds = boundsRef.current;
    if (!bounds) return;
    const rect = bounds.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.current?.(x * 16);
    rotateX.current?.(-y * 10);
  };

  const onPointerLeave = () => {
    rotateX.current?.(0);
    rotateY.current?.(0);
  };

  return { boundsRef, targetRef, onPointerMove, onPointerLeave };
}
