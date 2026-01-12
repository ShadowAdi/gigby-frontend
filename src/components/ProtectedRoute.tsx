import { Navigate } from 'react-router-dom'
import { useAuth } from '../provider/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}