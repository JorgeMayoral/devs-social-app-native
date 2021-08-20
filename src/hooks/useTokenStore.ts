import { getToken, removeToken, saveToken } from '../utils/tokenStorage'
import create from 'zustand'

export const useTokenStore = create<any>(set => ({
  token: undefined,
  load: async () => {
    const data = await getToken()
    set({token: data})
  },
  store: async (token: string) => await saveToken(token),
  delete: async () => {
    await removeToken()
    set({token: undefined})
  }
}))