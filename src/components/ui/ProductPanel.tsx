import { PRODUCTS } from '../../data/products';
import { formatPrice, useCart, useCommerceNav } from '../../features/commerce';
import { useContentView } from '../../lib/ContentContext';
import { Button3D } from './ThreeDButton';

export function ProductPanel() {
  const { selectedProductId } = useContentView();
  const { addItem } = useCart();
  const { openCart, continueExploring } = useCommerceNav();

  const product = PRODUCTS.find((entry) => entry.id === selectedProductId);

  if (!product) {
    return (
      <div className="flex flex-col flex-1">
        <p className="text-sm text-gray-800 dark:text-white/80">Product not found.</p>
        <div className="mt-6 pt-6 border-t border-gray-400 dark:border-white/10">
          <Button3D type="button" onClick={continueExploring} className="w-full rounded-2xl">
            Continue Exploring
          </Button3D>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col items-start mb-4 gap-2 shrink-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 dark:text-white/80 font-semibold">
          Product Focus
        </span>
        <h2 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">{product.name}</h2>
      </div>

      <div
        className={`w-full h-40 rounded-2xl flex items-center justify-center text-5xl mb-4 shrink-0 ${product.accent}`}
      >
        {product.emoji}
      </div>

      <div className="flex-1 text-gray-800 dark:text-white/80 text-sm font-light leading-relaxed">
        <p className="mb-4">{formatPrice(product.price)}</p>
        <p>
          A curated piece from the spatial showroom collection. Select Add to Bag to continue your discovery
          without leaving the experience.
        </p>
      </div>

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-400 dark:border-white/10 shrink-0">
        <Button3D
          type="button"
          onClick={() => {
            addItem(product.id);
            openCart();
          }}
          className="w-full rounded-2xl"
        >
          Add to Bag
        </Button3D>
        <Button3D type="button" variant="gray" onClick={continueExploring} className="w-full rounded-2xl">
          Continue Exploring
        </Button3D>
      </div>
    </div>
  );
}
