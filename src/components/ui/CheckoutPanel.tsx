import { useState } from 'react';
import { formatPrice, useCart, useCommerceNav } from '../../features/commerce';
import { Button3D } from './ThreeDButton';

export function CheckoutPanel() {
  const { lines, total, clearCart } = useCart();
  const { openCart, continueExploring } = useCommerceNav();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!name.trim() || !email.trim() || lines.length === 0) return;
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-col items-start mb-4 gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 dark:text-white/80 font-semibold">
            Checkout
          </span>
          <h2 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">Order Confirmed</h2>
        </div>
        <p className="text-sm text-gray-800 dark:text-white/80 font-light leading-relaxed flex-1">
          Thank you, {name}. Your order is confirmed. A receipt will be sent to {email}. Continue exploring
          the showroom.
        </p>
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
          Checkout
        </span>
        <h2 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">Complete Order</h2>
      </div>

      <div className="flex-1 space-y-4 min-h-0 overflow-y-auto no-scrollbar">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-600 dark:text-white/70 mb-2 block">
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 text-gray-900 dark:text-white text-sm outline-none focus:border-white/60"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-600 dark:text-white/70 mb-2 block">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 text-gray-900 dark:text-white text-sm outline-none focus:border-white/60"
            placeholder="you@example.com"
          />
        </label>
        <div className="pt-2">
          <p className="text-xs text-gray-600 dark:text-white/60 mb-2">
            {lines.length} item{lines.length === 1 ? '' : 's'}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatPrice(total)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-400 dark:border-white/10 shrink-0">
        <Button3D
          type="button"
          onClick={handlePlaceOrder}
          disabled={!name.trim() || !email.trim() || lines.length === 0}
          className="w-full rounded-2xl disabled:opacity-40 disabled:pointer-events-none"
        >
          Place Order
        </Button3D>
        <Button3D type="button" variant="gray" onClick={openCart} className="w-full rounded-2xl">
          Back to Bag
        </Button3D>
      </div>
    </div>
  );
}
