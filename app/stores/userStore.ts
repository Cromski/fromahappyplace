import { create } from 'zustand'
import { User } from 'firebase/auth'

interface UserStore {
  user: User | null | undefined
  setUser: (user: User | undefined | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
