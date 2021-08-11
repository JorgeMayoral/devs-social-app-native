import axios from 'axios'
import { config } from 'dotenv'
import Constants from 'expo-constants'
import { PostData } from '../types'
import { getToken } from '../utils/tokenStorage'

const extra = Constants.manifest?.extra

export const fetchAllPosts = async (offset: number = 0): Promise<any[]> => {
  const url = `${extra?.apiUrl}/v1/post/all?offset=${offset}`

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

export const fetchTimeline = async (offset: number = 0): Promise<any[]> => {
  const token = await getToken()
  const url = `${extra?.apiUrl}/v1/post/timeline?offset=${offset}`

  const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})

  return response.data
}

export const likePost = async (postId: string): Promise<boolean> => {
  const token = await getToken()
  const url = `${extra?.apiUrl}/v1/post/${postId}/like`

  const response = await axios.put(url, null, {headers: {Authorization: `Bearer ${token}`}})

  if (response) {
    return true
  }

  return false
}

export const fetchUserPosts = async (authorId: string, offset: number = 0): Promise<any[]> => {
  const url = `${extra?.apiUrl}/v1/post/user/${authorId}?offset=${offset}`

  const response = await axios.get(url)

  return response.data
}