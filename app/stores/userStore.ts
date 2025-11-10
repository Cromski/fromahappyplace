import { create } from 'zustand'

export interface cartInfo {
  clothingId: string,
  quantity: number,
  variantId: string,
};

export interface UserData {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  cart: {id: string, data: cartInfo}[],
};

interface UserStore {
  userData: UserData | null | undefined
  setUserData: (user: UserData | undefined | null) => void
  clearUser: () => void
  setCartQuantity: (clothingId: string, variantId: string, qty: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data}),
  clearUser: () => set({ userData: null }),
  setCartQuantity: (clothingId: string, variantId: string, qty: number) => 
    set((state) => {
      if (!state.userData) return state

      const newCart = state.userData?.cart.map(item => 
        item.data.clothingId === clothingId && item.data.variantId === variantId ? { ...item, data: { ...item.data, quantity: qty } } : item 
      )
      return { userData: { ...state.userData, cart: newCart } }
    })
}))
