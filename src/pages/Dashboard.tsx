import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGigs } from '../context/GigContext'
import { useAuth } from '../provider/auth'

export default function Dashboard() {
  const { user } = useAuth()
  const { getUserGigs, getUserBids, gigs } = useGigs()
  const [activeTab, setActiveTab] = useState<'posted' | 'bids'>('posted')

  const userGigs = getUserGigs(user!.id)
  const userBids = getUserBids(user!.id)

  const bidsWithGigInfo = userBids.map(bid => {
    const gig = gigs.find(g => g.id === bid.gigId)
    return { ...bid, gig }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#212121] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/post-gig"
            className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Post New Gig
          </Link>
          <Link
            to="/browse"
            className="border border-[#212121] text-[#212121] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Gigs
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('posted')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posted'
                  ? 'border-[#212121] text-[#212121]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Posted Gigs ({userGigs.length})
            </button>
            <button
              onClick={() => setActiveTab('bids')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bids'
                  ? 'border-[#212121] text-[#212121]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Bids ({userBids.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'posted' ? (
            <div>
              {userGigs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't posted any gigs yet.</p>
                  <Link
                    to="/post-gig"
                    className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Post Your First Gig
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {userGigs.map((gig) => (
                    <div key={gig.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#212121] mb-2">
                            {gig.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Posted on {gig.createdAt}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#212121] mb-1">
                            ${gig.budget.toLocaleString()}
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            gig.status === 'open' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {gig.status === 'open' ? 'Open' : 'Assigned'}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {gig.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          {gig.bids.length} proposal{gig.bids.length !== 1 ? 's' : ''}
                          {gig.bids.filter(b => b.status === 'hired').length > 0 && (
                            <span className="text-green-600 ml-2">
                              • {gig.bids.filter(b => b.status === 'hired').length} hired
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/gig/${gig.id}`}
                          className="text-[#212121] hover:text-gray-800 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {userBids.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't placed any bids yet.</p>
                  <Link
                    to="/browse"
                    className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Browse Gigs to Bid On
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {bidsWithGigInfo.map((bidInfo) => (
                    <div key={bidInfo.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#212121] mb-2">
                            {bidInfo.gig?.title || 'Unknown Gig'}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Bid submitted on {bidInfo.createdAt}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#212121] mb-1">
                            ${bidInfo.price.toLocaleString()}
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            bidInfo.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : bidInfo.status === 'hired'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {bidInfo.status.charAt(0).toUpperCase() + bidInfo.status.slice(1)}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {bidInfo.message}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Client: {bidInfo.gig?.ownerName || 'Unknown'}
                        </div>
                        <Link
                          to={`/gig/${bidInfo.gigId}`}
                          className="text-[#212121] hover:text-gray-800 font-medium"
                        >
                          View Gig →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}