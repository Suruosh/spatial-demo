import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Button3DProps {
  children: ReactNode;
  variant?: 'white' | 'blue' | 'red' | 'gray';
  className?: string;
}

export function Button3D({ children, variant = 'white', className = "" }: Button3DProps) {
  const baseClasses = "relative flex items-center justify-center font-bold uppercase text-[10px] tracking-widest px-8 py-3 transition-transform hover:scale-105";

  const variants = {
    white: "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]",
    blue: "bg-cyan-950/40 border border-cyan-400/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    red: "bg-black/40 border border-white/20 text-white shadow-none",
    gray: "bg-white/5 border border-white/5 text-zinc-400 shadow-none",
  };

  return (
    <motion.button
      whileHover={{ translateZ: 20 }}
      whileTap={{ scale: 0.95, translateZ: 0 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Volumetric edge illusion using an absolute pseudo-element styled layer */}
      <div className="absolute inset-0 border-t border-white/20 pointer-events-none" />
      {children}
    </motion.button>
  );
}

export function CircleBtn({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.button
      whileHover={{ translateZ: 20 }}
      whileTap={{ scale: 0.95, translateZ: 0 }}
      className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-black/40 text-cyan-400 text-xs font-bold shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      {children}
    </motion.button>
  );
}
