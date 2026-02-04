import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed selectors
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          
          if (existingItem) {
            // Check stock validation
            if (existingItem.quantity + 1 > product.stockCount) {
              return state;
            }
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        });
      },
      
      removeFromCart: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          const item = state.items.find((i) => i.id === productId);
          if (!item) return state;
          
          // Limits: min 1, max stock
          const newQuantity = Math.max(1, Math.min(quantity, item.stockCount));
          
          return {
            items: state.items.map((i) =>
              i.id === productId ? { ...i, quantity: newQuantity } : i
            ),
          };
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        // Free over Rs. 2,000, otherwise Rs. 200
        if (subtotal === 0) return 0;
        return subtotal >= 2000 ? 0 : 200;
      },
      
      getTotalPrice: () => {
        return get().getSubtotal() + get().getShippingCost();
      },
    }),
    {
      name: 'pakecom-cart-storage',
    }
  )
);
