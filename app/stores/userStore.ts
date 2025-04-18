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
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data}),
  clearUser: () => set({ userData: null }),
}))
