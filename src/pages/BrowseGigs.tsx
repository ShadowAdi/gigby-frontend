import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGigs } from '../context/GigContext'

export default function BrowseGigs() {
  const { gigs, searchGigs } = useGigs()
  const [searchQuery, setSearchQuery] = useState('')
  const [displayGigs, setDisplayGigs] = useState(gigs)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setDisplayGigs(gigs)
    } else {
      setDisplayGigs(searchGigs(query))
    }
  }

  const openGigs = displayGigs.filter(gig => gig.status === 'open')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#212121] mb-4">Browse Gigs</h1>
        <p className="text-gray-600 mb-6">Find your next freelance opportunity</p>
        
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search gigs by title or description..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
          />
        </div>
      </div>

      {openGigs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchQuery ? 'No gigs found matching your search.' : 'No open gigs available.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {openGigs.map((gig) => (
            <div key={gig.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#212121] mb-2">
                  {gig.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Posted by <span className="font-medium">{gig.ownerName}</span>
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {gig.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-[#212121]">
                  ${gig.budget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  {gig.createdAt}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {gig.bids.length} bid{gig.bids.length !== 1 ? 's' : ''}
                </div>
                <Link
                  to={`/gig/${gig.id}`}
                  className="bg-[#212121] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}