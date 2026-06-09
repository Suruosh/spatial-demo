// JSON-simulation product data (BRAIN.md → "Commerce": Shopify or JSON sim).
// Replace with the Shopify Storefront API behind the same Product shape.

export interface Product {
  id: string;
  name: string;
  price: number;
  /** Stand-in visual until real .glb / imagery is wired. */
  emoji: string;
  /** Tailwind background utility for the product tile. */
  accent: string;
}

export const PRODUCTS: Product[] = [
  { id: 'aurora-vase', name: 'Aurora Vase', price: 240, emoji: '🏺', accent: 'bg-gradient-to-br from-amber-200/30 to-amber-500/10' },
  { id: 'halo-lamp', name: 'Halo Lamp', price: 380, emoji: '💡', accent: 'bg-gradient-to-br from-sky-200/30 to-indigo-500/10' },
  { id: 'monolith-speaker', name: 'Monolith Speaker', price: 520, emoji: '🔊', accent: 'bg-gradient-to-br from-zinc-200/30 to-zinc-600/10' },
  { id: 'orbit-chair', name: 'Orbit Chair', price: 1240, emoji: '🪑', accent: 'bg-gradient-to-br from-rose-200/30 to-rose-500/10' },
];
