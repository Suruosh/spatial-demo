import { Box, ChevronLeft, ChevronRight, LayoutGrid, Mail, RotateCcw, X } from 'lucide-react';
import { EXPERIENCE_LABELS, useExperience } from '../../lib/experience';
import { useScrollNav } from '../../lib/scrollNav';
import { useProductSelection } from '../../lib/productSelection';
import { contentForStop } from '../../features/tour/stopContent';
import { JOURNEY_STOPS } from '../../features/tour/tourStops';

// The primary information surface. The world stays primary; this panel is
// secondary and narrates the current journey stop. Next/Back drive the SAME
// scroll as the wheel (useScrollNav), so the camera and panel never diverge.
// When a 3D item is clicked, its product details render below the icon row.
export function ContentPanel() {
  const { state } = useExperience();
  const { goToNextStop, goToPrevStop, endTour, stopIndex } = useScrollNav();
  const { selectedProduct, clearProduct } = useProductSelection();

  const content = contentForStop(stopIndex);
  const eyebrow = content?.eyebrow ?? EXPERIENCE_LABELS[state];
  const title = content?.title ?? 'Welcome';
  const body =
    content?.body ??
    'An elegant spatial interface overlapping a living 3D world. Scroll, or use Next, to move through the showroom.';

  const isFirst = stopIndex <= 0;
  const isLast = stopIndex >= JOURNEY_STOPS.length - 1;

  return (
    <div className="w-full lg:w-[400px] glass-panel rounded-[32px] p-6 lg:p-8 flex flex-col shadow-2xl relative overflow-hidden pointer-events-auto">
      {/* Navigation — glassmorphism circular buttons in the top-right corner. */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous stop"
          onClick={goToPrevStop}
          disabled={isFirst}
          className={`glass-button w-11 h-11 rounded-full flex items-center justify-center text-gray-900 dark:text-white transition-all hover:scale-105 active:scale-95 shadow-lg ${
            isFirst ? 'opacity-40 pointer-events-none' : ''
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label={isLast ? 'End tour — back to Welcome' : 'Next stop'}
          onClick={isLast ? endTour : goToNextStop}
          className="glass-button w-11 h-11 rounded-full flex items-center justify-center text-gray-900 dark:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          {isLast ? <RotateCcw className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Narrative — cross-fades on stop change (keyed remount + fade). */}
      <div key={stopIndex} className="animate-panel pr-24">
        <div className="flex flex-col items-start mb-6 gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">
            {eyebrow}
          </span>
          <h1 className="text-3xl font-black tracking-wide text-gray-900 dark:text-white">{title}</h1>
        </div>

        <div className="py-2 text-gray-800 dark:text-white/80 text-sm font-light leading-relaxed">
          <p>{body}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-400 dark:border-white/10">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Box" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
            <Box className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
          <button type="button" aria-label="Collections" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
            <LayoutGrid className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
          <button type="button" aria-label="Messages" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
            <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Selected item — set by clicking/tapping an item in the 3D scene. This
          area swaps as the user selects different items. */}
      {selectedProduct && (
        <div key={selectedProduct.id} className="animate-panel mt-6 pt-6 border-t border-gray-400 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${selectedProduct.accent}`}>
              <span className="text-3xl">{selectedProduct.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Selected item</p>
              <h3 className="text-lg font-black tracking-wide text-gray-900 dark:text-white truncate">{selectedProduct.name}</h3>
              <p className="text-sm text-gray-700 dark:text-white/70">${selectedProduct.price.toLocaleString()}</p>
            </div>
            <button
              type="button"
              aria-label="Clear selection"
              onClick={clearProduct}
              className="glass-button shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-white text-black font-bold uppercase text-[11px] tracking-widest py-3 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg"
          >
            Add to bag
          </button>
        </div>
      )}
    </div>
  );
}
