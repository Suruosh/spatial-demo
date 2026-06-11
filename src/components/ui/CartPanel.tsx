import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice, useCart, useCommerceNav } from '../../features/commerce';
import { Button3D } from './ThreeDButton';

const qtyButton =
  'glass-button w-9 h-9 rounded-xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors';

export function CartPanel() {
  const { lines, itemCount, total, updateQuantity, removeItem } = useCart();
  const { openCheckout, continueExploring } = useCommerceNav();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col items-start mb-4 gap-2 shrink-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 dark:text-white/80 font-semibold">
          Cart
        </span>
        <h2 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">
          Your Bag {itemCount > 0 ? `(${itemCount})` : ''}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 min-h-0">
        {lines.length === 0 ? (
          <p className="text-sm text-gray-800 dark:text-white/80 font-light">
            Your bag is empty. Explore the showroom to discover products.
          </p>
        ) : (
          lines.map((line) => (
            <div
              key={line.productId}
              className="p-3 rounded-2xl flex items-center gap-3 bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${line.product.accent}`}
              >
                {line.product.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {line.product.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-white/60">{formatPrice(line.lineTotal)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className={qtyButton}
                  onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm text-gray-900 dark:text-white">{line.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className={qtyButton}
                  onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Remove item"
                  className={`${qtyButton} ml-1`}
                  onClick={() => removeItem(line.productId)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-400 dark:border-white/10 shrink-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-white/70">Total</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(total)}</span>
        </div>
        <Button3D
          type="button"
          onClick={openCheckout}
          disabled={lines.length === 0}
          className="w-full rounded-2xl disabled:opacity-40 disabled:pointer-events-none"
        >
          Checkout
        </Button3D>
        <Button3D type="button" variant="gray" onClick={continueExploring} className="w-full rounded-2xl">
          Continue Exploring
        </Button3D>
      </div>
    </div>
  );
}
