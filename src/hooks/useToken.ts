import { useEffect, useState } from "react"
import { getToken } from "../utils/tokenStorage"

export const useToken = () => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const readStorage = async () => {
      setLoading(true)
      const tokenValue = await getToken()

      if (tokenValue !== null) {
        setToken(tokenValue)
        setLoading(false)
      }
    }

    readStorage()
  }, [])

  return {loading, token}
}