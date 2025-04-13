import { create } from 'zustand'
import { User } from 'firebase/auth'

// export interface User {
//   uid: string
//   name: string
//   email: string
// }

interface UserStore {
  user: User | null | undefined
  setUser: (user: User | undefined | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
