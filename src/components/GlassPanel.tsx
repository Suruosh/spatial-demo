import { motion } from "motion/react";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  style?: any;
}

export function GlassPanel({ children, className = "", style }: GlassPanelProps) {
  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-xl rounded-br-xl p-6 lg:p-8 ${className}`}
    >
      {/* Inner wrapper to pop content out in Z-space */}
      <div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="w-full h-full flex flex-col"
      >
        {children}
      </div>
    </motion.div>
  );
}
