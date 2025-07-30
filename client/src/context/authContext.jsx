import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      
      try {
        const { data } = await axios.get('/api/auth/user', {
          headers: { 'x-auth-token': token }
        })
        setCurrentUser(data)
      } catch (err) {
        console.error(err)
        localStorage.removeItem('token')
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  // Login function
  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setCurrentUser(data.user)
  }

  // Register function
  const register = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password })
    localStorage.setItem('token', data.token)
    setCurrentUser(data.user)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}