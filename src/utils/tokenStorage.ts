import * as SecureStore from 'expo-secure-store'

const KEY = 'devs-social-token'

export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(KEY, token)
}

export const getToken = async (): Promise<string | null> => {
  let token = await SecureStore.getItemAsync(KEY)

  return token
}

export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(KEY)
}
