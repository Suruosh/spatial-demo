import { ShoppingBag } from 'lucide-react';

// Floating top chrome: brand logo (center) and cart access (right).
// Constrained to the same max-w-7xl container as the sidebar/panel row so the
// bag aligns with the content panel's right edge — not the raw page edge.
export function TopBar() {
  return (
    <div className="absolute top-6 lg:top-12 left-0 right-0 z-50 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex justify-between items-center">
        <div className="flex-1 hidden lg:block" />

        <div className="flex-1 flex justify-center">
          <button
            type="button"
            aria-label="Reload — back to start"
            onClick={() => window.location.reload()}
            className="pointer-events-auto cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-2xl tracking-tight text-gray-800 hover:text-black dark:text-white/80 dark:hover:text-white mb-1"
          >
            <span className="font-bold">Spatial</span>
            <span className="font-normal opacity-80">Commerce</span>
          </button>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            type="button"
            aria-label="Shopping Bag"
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-gray-800 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all pointer-events-auto"
          >
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
