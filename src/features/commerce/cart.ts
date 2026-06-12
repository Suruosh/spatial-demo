import type { Product } from '../../data/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildCartLines(items: CartItem[], products: Product[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product || item.quantity <= 0) return [];
    return [{ ...item, product, lineTotal: product.price * item.quantity }];
  });
}

export function cartTotals(lines: CartLine[]) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  return { itemCount, subtotal, total: subtotal };
}
