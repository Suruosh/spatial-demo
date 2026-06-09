interface ProductCardProps {
  emoji: string;
  bgClass: string;
}

// Floating-product tile. Hover lift + idle float are pure CSS (see index.css).
export function ProductCard({ emoji, bgClass }: ProductCardProps) {
  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative w-full h-40 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 ${bgClass}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="text-[5rem] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] filter animate-floaty"
      >
        {emoji}
      </div>
    </div>
  );
}
