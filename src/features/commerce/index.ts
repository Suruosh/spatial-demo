// Commerce feature — cart and checkout, embedded in the experience.
// Backend: Shopify Storefront API or JSON simulation (BRAIN.md → "Commerce").
export { CartProvider } from './CartProvider';
export type { CartContextValue } from './CartProvider';
export { useCart } from './useCart';
export { useCommerceNav } from './useCommerceNav';
export { formatPrice, buildCartLines, cartTotals } from './cart';
export type { CartItem, CartLine } from './cart';
