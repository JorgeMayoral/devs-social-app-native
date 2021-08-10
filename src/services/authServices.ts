import axios from 'axios'
import Constants from 'expo-constants'
import { SignInData, SignUpData } from '../types'
import { saveToken } from '../utils/tokenStorage'

const extra = Constants.manifest?.extra

export const login = async (data: SignInData): Promise<boolean> => {
  const url = `${extra?.apiUrl}/v1/user/login`

  const response = await axios.post(url, data)

  if (response.status === 200) {
    await saveToken(response.data.token)
    return true
  }

  return false
}

export const register = async (data: SignUpData): Promise<boolean> => {
  const url = `${extra?.apiUrl}/v1/user/register`

  const response = await axios.post(url, data)

  if (response.status === 201) {
    await saveToken(response.data.token)
    return true
  }

  return false
}