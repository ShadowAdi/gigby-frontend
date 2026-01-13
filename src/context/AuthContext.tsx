/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from 'react'
import { registerUser } from '../services/auth.api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // Mock login logic
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email })
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerUser({ name, email, password });

      setUser({
        id: data.id,
        name,
        email,
      });
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };


  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}