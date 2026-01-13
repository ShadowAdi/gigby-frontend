/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from 'react'
import { loginUser, registerUser } from '../services/auth.api'

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


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser({ email, password });

      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };


  const register = async (name: string, email: string, password: string) => {
    try {
      await registerUser({ name, email, password });


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