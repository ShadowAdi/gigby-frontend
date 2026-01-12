import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/auth'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-[#212121] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-white">Gig</span>
                <span className="text-gray-300">Flow</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/browse" 
                className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Browse Gigs
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    to="/post-gig" 
                    className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Post a Gig
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-white hover:bg-gray-100 text-[#212121] px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          <Link 
            to="/browse" 
            className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
          >
            Browse Gigs
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/post-gig" 
                className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Post a Gig
              </Link>
              <Link 
                to="/dashboard" 
                className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}