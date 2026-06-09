import { motion } from "motion/react";

interface ProductCardProps {
  emoji: string;
  bgClass: string;
}

export function ProductCard({ emoji, bgClass }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, translateZ: 30 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative w-full h-40 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer ${bgClass}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      {/* 3D Item layer */}
      <motion.div
        style={{ transform: "translateZ(50px)" }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-[5rem] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] filter"
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}
