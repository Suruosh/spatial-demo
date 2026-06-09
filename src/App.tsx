import { useRef, Suspense, useState, useEffect, Component, type ReactNode, type MouseEvent } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
import {
  Sun,
  Moon,
  Box,
  Home,
  Info,
  LayoutGrid,
  Mail,
  ShoppingBag
} from "lucide-react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Float, Center, ContactShadows } from "@react-three/drei";

class WebGLErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.error("WebGL Error:", error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="glass-panel p-6 rounded-[24px] text-center max-w-sm pointer-events-auto shadow-2xl">
            <h3 className="text-gray-900 dark:text-white font-bold mb-2">3D Context Blocked</h3>
            <p className="text-gray-800 dark:text-white/70 text-sm">The browser temporarily disabled WebGL rendering. Please click refresh to restore it.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-gray-900 dark:text-white text-sm transition-colors border border-gray-300 dark:border-white/20"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function PlaceholderModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.505, 1.505, 1.505]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ResponsiveCenter({ children, isMobile }: { children: ReactNode, isMobile: boolean }) {
  return (
    <Center position={[isMobile ? 0 : -1.5, isMobile ? 1.5 : -0.5, 0]}>
      {children}
    </Center>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse tracking for parallax rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a fluid 3D feel
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: MouseEvent) => {
    if (window.innerWidth < 1024) return; // Disable parallax on smaller screens
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-[100dvh] overflow-hidden relative transition-colors duration-700 ${isDarkMode ? "dark text-white bg-gradient-to-br from-neutral-900 to-black" : "text-gray-900 bg-gradient-to-br from-white to-gray-200"}`}
      style={{
        perspective: "2000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dimming overlay to make UI pop */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${isDarkMode ? "bg-black/40 mix-blend-multiply" : "bg-white/40 mix-blend-screen"}`} />

      {/* Background glow for 3D object */}
      <div className={`absolute top-[30%] lg:top-1/2 left-1/2 lg:left-[35%] -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] blur-[100px] rounded-full pointer-events-none z-0 transition-colors duration-700 ${isDarkMode ? "bg-white/10" : "bg-black/5"}`}></div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden absolute bottom-6 left-6 right-6 z-50 glass-panel rounded-[32px] h-[72px] flex items-center px-4 pointer-events-auto shadow-2xl">
        <div className="flex items-center justify-between flex-1">
          <button
            type="button"
            aria-label="Home"
            onClick={() => document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm dark:bg-white/20 text-gray-900 dark:text-white transition-all"
          >
            <Home className="w-[20px] h-[20px]" />
          </button>
          <button type="button" aria-label="Info" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
            <Info className="w-[20px] h-[20px]" />
          </button>
          <button type="button" aria-label="Grid" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
            <LayoutGrid className="w-[20px] h-[20px]" />
          </button>
          <button type="button" aria-label="Messages" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
            <Mail className="w-[20px] h-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Toggle Theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all"
          >
            {isDarkMode ? <Moon className="w-[20px] h-[20px]" /> : <Sun className="w-[20px] h-[20px]" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            shadows={{ type: THREE.PCFShadowMap }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
          <Suspense fallback={null}>
            <ResponsiveCenter isMobile={isMobile}>
              <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
                 {/* This is a placeholder model. Users can load their GLTF using useGLTF() hook */}
                 <PlaceholderModel />
              </Float>
            </ResponsiveCenter>
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            makeDefault
          />
        </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* Main Parallax / Scroll Container for UI */}
      <motion.div
        id="scroll-container"
        className="absolute inset-0 z-10 w-full h-full overflow-y-auto lg:overflow-hidden overflow-x-hidden no-scrollbar pointer-events-none"
        style={{
          rotateX,
          rotateY,
          rotateZ: isMobile ? 0 : -0.5,
        }}
      >
        {/* Top Header Elements */}
        <div className="absolute top-6 lg:top-12 left-0 right-0 px-6 lg:px-12 flex justify-between items-center pointer-events-none z-50">
          <div className="flex-1 hidden lg:block" />

          {/* Top Center Logo */}
          <div className="flex-1 flex justify-center">
            <button
              type="button"
              aria-label="Scroll to top"
              onClick={() => document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="pointer-events-auto cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-2xl tracking-tight text-gray-800 hover:text-black dark:text-white/80 dark:hover:text-white mb-1"
            >
              <span className="font-bold">Spatial</span>
              <span className="font-normal opacity-80">Commerce</span>
            </button>
          </div>

          {/* Top Right Bag */}
          <div className="flex-1 flex justify-end">
            <button type="button" aria-label="Shopping Bag" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-gray-800 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all pointer-events-auto">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="w-full min-h-full max-w-7xl mx-auto px-4 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center pt-[65vh] pb-[120px] lg:pt-0 lg:pb-0 pointer-events-none">

        {/* Desktop Left Sidebar */}
        <div className="hidden lg:flex w-[88px] h-[640px] glass-panel rounded-[44px] flex-col items-center py-6 justify-between relative shadow-2xl shrink-0 pointer-events-auto">
          {/* Top Logo */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              aria-label="Home"
              onClick={() => document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform bg-transparent"
            >
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=180,h=180,fit=crop,f=png/AR011XeLz8S08XZD/favi-mp84bX6L2wtL0M02.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-4 items-center">
            <button type="button" aria-label="Home" className="glass-button w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md dark:bg-transparent dark:shadow-lg transition-all hover:scale-105 active:scale-95">
              <Home className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <button type="button" aria-label="Info" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
              <Info className="w-6 h-6" />
            </button>
            <button type="button" aria-label="Grid" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
              <LayoutGrid className="w-6 h-6" />
            </button>
            <button type="button" aria-label="Messages" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
              <Mail className="w-6 h-6" />
            </button>
          </div>

          {/* Toggle */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              aria-label="Toggle Theme"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all"
            >
              {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Right Content Panel - Narrower and to the right */}
        <div className="w-full lg:w-[400px] glass-panel rounded-[32px] p-6 lg:p-8 flex flex-col shadow-2xl relative overflow-hidden pointer-events-auto">

          {/* Header Content Wrapper */}
          <div className="flex flex-col items-start mb-6 gap-2">
            <h1 className="text-3xl font-black tracking-wide text-gray-900 dark:text-white">Welcome</h1>
          </div>

          <div className="flex-1 py-4 text-gray-800 dark:text-white/80 text-sm font-light leading-relaxed">
            <p className="mb-4">
              This is a layout showcasing an elegant glassmorphic interface overlapping a dynamic 3D environment.
            </p>
            <p>
              Navigation is intuitively separated, ensuring the 3D canvas is always visible while keeping primary actions in reach.
            </p>
          </div>

          <div className="mt-8 space-y-6 pt-6 border-t border-gray-400 dark:border-white/10">
             {/* Actions */}
            <div className="flex items-center gap-4">
              <button type="button" aria-label="Box" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <Box className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <button type="button" aria-label="Grid" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <LayoutGrid className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <button type="button" aria-label="Messages" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
            </div>
          </div>

        </div>

        </div>
      </motion.div>
    </div>
  );
}
