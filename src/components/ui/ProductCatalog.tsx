import { PRODUCTS } from '../../data/products';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

export function ProductCatalog() {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="flex flex-col items-start mb-6 gap-2 shrink-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Collections</span>
        <h2 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">Product Catalog</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            type="button"
            className="w-full p-3 rounded-2xl flex items-center gap-3 text-left bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/10 transition-all"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${product.accent}`}
            >
              {product.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
              <p className="text-xs text-gray-600 dark:text-white/60">{formatPrice(product.price)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
