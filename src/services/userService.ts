import axios from 'axios'
import Constants from 'expo-constants'
import { getToken } from '../utils/tokenStorage'

const extra = Constants.manifest?.extra

export const fetchProfile = async (): Promise<any> => {
  const token = await getToken()
  const url = `${extra?.apiUrl}/v1/user/profile`

  const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})

  return response.data
}

export const fetchUser = async (userId: string): Promise<any> => {
  const url = `${extra?.apiUrl}/v1/user/${userId}`

  const response = await axios.get(url)
  console.log(response)

  return response.data
}