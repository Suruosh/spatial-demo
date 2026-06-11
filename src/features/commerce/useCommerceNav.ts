import { ExperienceState, useExperience } from '../../lib/experience';
import { useContentView } from '../../lib/ContentContext';
import { useCart } from './useCart';

// Coordinates cart actions with experience state and content panel views.
export function useCommerceNav() {
  const { setState } = useExperience();
  const { setView, setSelectedProductId } = useContentView();
  const { addItem } = useCart();

  const focusProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('product');
    setState(ExperienceState.ProductFocus);
  };

  const openCart = () => {
    setView('cart');
    setState(ExperienceState.Cart);
  };

  const openCheckout = () => {
    setView('checkout');
    setState(ExperienceState.Cart);
  };

  const continueExploring = () => {
    setSelectedProductId(null);
    setView('welcome');
    setState(ExperienceState.Explore);
  };

  const addToBag = (productId: string, quantity = 1) => {
    addItem(productId, quantity);
    openCart();
  };

  return {
    focusProduct,
    openCart,
    openCheckout,
    continueExploring,
    addToBag,
  };
}
