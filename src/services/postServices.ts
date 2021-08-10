import axios from 'axios'
import Constants from 'expo-constants'
import { PostData } from '../types'
import { getToken } from '../utils/tokenStorage'

const extra = Constants.manifest?.extra

export const fetchAllPosts = async (): Promise<any[]> => {
  const url = `${extra?.apiUrl}/v1/post/all`

  const response = await axios.get(url)

  return response.data
}

export const publishPost = async (data: PostData): Promise<boolean> => {
  const token = await getToken()
  const url = `${extra?.apiUrl}/v1/post`

  const response = await axios.post(url, data, {headers: {Authorization: `Bearer ${token}`}})

  if (response.status === 200) {
    return true
  }

  return false
}