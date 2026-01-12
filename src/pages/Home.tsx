import { Link } from 'react-router-dom'
import { useAuth } from '../provider/auth'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-linear-to-br from-[#212121] to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find the Perfect <span className="text-gray-300">Freelancer</span>
              <br />
              for Your Next Project
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              GigFlow connects talented freelancers with clients looking for quality work. 
              Post a job or find your next opportunity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-white text-[#212121] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Gigs
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/post-gig"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#212121] transition-colors"
                >
                  Post a Gig
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#212121] transition-colors"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}