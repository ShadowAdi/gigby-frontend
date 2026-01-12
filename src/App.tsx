import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { GigProvider } from './context/GigContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import BrowseGigs from './pages/BrowseGigs'
import Register from './pages/Register'
import GigDetails from './pages/GigDetails'
import Dashboard from './pages/Dashboard'
import PostGig from './pages/PostGig'


function App() {
  return (
    <AuthProvider>
      <GigProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/browse" element={<BrowseGigs />} />
              <Route path="/gig/:id" element={<GigDetails />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/post-gig" element={
                <ProtectedRoute>
                  <PostGig />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </GigProvider>
    </AuthProvider>
  )
}

export default App
