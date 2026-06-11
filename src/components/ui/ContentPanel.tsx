import { Box, LayoutGrid, Mail } from 'lucide-react';
import { EXPERIENCE_LABELS, useExperience } from '../../lib/experience';
import { useContentView } from '../../lib/ContentContext';
import { Button3D } from './ThreeDButton';
import { TeamMembers } from './TeamMembers';
import { ProductCatalog } from './ProductCatalog';
import { ProductPanel } from './ProductPanel';
import { CartPanel } from './CartPanel';
import { CheckoutPanel } from './CheckoutPanel';

// The primary information surface. The world stays primary; this panel is
// secondary and updates based on navigation, selection, and tour stops.
export function ContentPanel() {
  const { state, advance } = useExperience();
  const { view, setView } = useContentView();

  const isCommerceView = view === 'product' || view === 'cart' || view === 'checkout';

  return (
    <div className="w-full lg:w-100 glass-panel rounded-4xl p-6 lg:p-8 flex flex-col shadow-2xl relative overflow-hidden pointer-events-auto min-h-[420px] lg:min-h-0">
      {view === 'welcome' && (
        <div className="flex flex-col flex-1">
          <div className="flex flex-col items-start mb-6 gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">
              {EXPERIENCE_LABELS[state]}
            </span>
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
            <div className="flex items-center gap-4">
              <button type="button" aria-label="Box" className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <Box className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <button type="button" aria-label="Collections" onClick={() => setView('catalog')} className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <LayoutGrid className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <button type="button" aria-label="Messages" onClick={() => setView('team')} className="glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
            </div>

            <Button3D type="button" onClick={advance} className="w-full rounded-2xl">
              Next Phase
            </Button3D>
          </div>
        </div>
      )}

      {view === 'catalog' && (
        <div className="flex lg:hidden flex-col flex-1 min-h-0">
          <ProductCatalog />
          <div className="mt-6 pt-6 border-t border-gray-400 dark:border-white/10 shrink-0">
            <Button3D type="button" onClick={() => setView('welcome')} className="w-full rounded-2xl">
              Back to Welcome
            </Button3D>
          </div>
        </div>
      )}

      {view === 'team' && (
        <>
          <TeamMembers />
          <div className="mt-6 pt-6 border-t border-gray-400 dark:border-white/10">
            <Button3D type="button" onClick={() => setView('welcome')} className="w-full rounded-2xl">
              Back to Welcome
            </Button3D>
          </div>
        </>
      )}

      {isCommerceView && (
        <>
          {view === 'product' && <ProductPanel />}
          {view === 'cart' && <CartPanel />}
          {view === 'checkout' && <CheckoutPanel />}
        </>
      )}
    </div>
  );
}
