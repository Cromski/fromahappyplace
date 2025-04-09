import { create } from 'zustand';
import { ClothingItem } from '../page';

type CartItem = {
    id: string,
    item: ClothingItem,
    quantity: number,
  };
  
type CartState = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  };

export const useCartStore = create<CartState>((set) => ({
    cart: [],
  
    addToCart: (item) =>
      set((state) => {
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i),
          };
        }
        return { cart: [...state.cart, item] };
      }),
  
    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),
  
    clearCart: () => set({ cart: [] }),
  }));