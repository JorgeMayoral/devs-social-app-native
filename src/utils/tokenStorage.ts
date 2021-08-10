import * as SecureStore from 'expo-secure-store'

const KEY = 'devs-social-token'

const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(KEY, token)
}

const getToken = async (): Promise<string | null> => {
  let token = await SecureStore.getItemAsync(KEY)

  return token
}

const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(KEY)
}

export {saveToken, getToken, removeToken}