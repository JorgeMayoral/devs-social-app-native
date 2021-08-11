import { fetchProfile } from '../services/userService'
import create from 'zustand'

export const useUserStore = create<any>(set => ({
  user: undefined,
  fetch: async () => {
    const data = await fetchProfile()
    set({user: data})
  },
}))