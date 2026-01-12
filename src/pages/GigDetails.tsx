import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGigs } from '../context/GigContext'
import { useAuth } from '../provider/auth'


export default function GigDetails() {
  const { id } = useParams<{ id: string }>()
  const { user, isAuthenticated } = useAuth()
  const { getGigById, addBid, hireBid } = useGigs()
  const navigate = useNavigate()

  const [bidMessage, setBidMessage] = useState('')
  const [bidPrice, setBidPrice] = useState('')
  const [showBidForm, setShowBidForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gig = getGigById(id!)

  if (!gig) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Gig not found</h1>
          <button
            onClick={() => navigate('/browse')}
            className="mt-4 text-[#212121] hover:text-gray-800"
          >
            ← Back to browse
          </button>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === gig.ownerId
  const userHasBid = gig.bids.some(bid => bid.freelancerId === user?.id)

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!bidMessage.trim() || !bidPrice) {
      setError('Please fill in all fields')
      return
    }

    const priceNum = parseFloat(bidPrice)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price')
      return
    }

    setLoading(true)

    try {
      addBid(gig.id, {
        gigId: gig.id,
        freelancerId: user!.id,
        freelancerName: user!.name,
        message: bidMessage.trim(),
        price: priceNum
      })

    

      setBidMessage('')
      setBidPrice('')
      setShowBidForm(false)
    } catch (err) {
      setError('Failed to submit bid '+err)
    } finally {
      setLoading(false)
    }
  }

  const handleHireBid = (bidId: string) => {
    const bid = gig.bids.find(b => b.id === bidId)
    if (bid && window.confirm(`Are you sure you want to hire ${bid.freelancerName}?`)) {
      hireBid(gig.id, bidId)
      
      
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <button
        onClick={() => navigate('/browse')}
        className="text-[#212121] hover:text-gray-800 mb-6 flex items-center"
      >
        ← Back to browse
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Gig Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#212121] mb-2">{gig.title}</h1>
              <p className="text-gray-600">
                Posted by <span className="font-medium">{gig.ownerName}</span> on {gig.createdAt}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#212121] mb-1">
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
        </div>

        {/* Gig Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#212121] mb-4">Project Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {gig.description}
          </p>
        </div>

        {/* Bidding Section */}
        {gig.status === 'open' && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            {!isAuthenticated ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You need to be logged in to place a bid</p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                  Login to Bid
                </button>
              </div>
            ) : isOwner ? (
              <div className="text-center py-4">
                <p className="text-gray-600">This is your gig</p>
              </div>
            ) : userHasBid ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium">You have already placed a bid on this gig</p>
              </div>
            ) : (
              <div>
                {!showBidForm ? (
                  <div className="text-center">
                    <button
                      onClick={() => setShowBidForm(true)}
                      className="bg-[#212121] text-white px-8 py-3 rounded-lg hover:bg-gray-800"
                    >
                      Place a Bid
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBid} className="space-y-4">
                    <h3 className="text-lg font-medium text-[#212121] mb-4">Submit Your Proposal</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Proposal
                      </label>
                      <textarea
                        value={bidMessage}
                        onChange={(e) => setBidMessage(e.target.value)}
                        rows={4}
                        placeholder="Explain why you're the best fit for this project..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Price (USD)
                      </label>
                      <input
                        type="number"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder="Enter your price"
                        min="1"
                        step="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                      >
                        {loading ? 'Submitting...' : 'Submit Bid'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBidForm(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bids Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-[#212121] mb-4">
            Proposals ({gig.bids.length})
          </h2>

          {gig.bids.length === 0 ? (
            <p className="text-gray-600">No proposals yet.</p>
          ) : (
            <div className="space-y-4">
              {gig.bids.map((bid) => (
                <div key={bid.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-[#212121]">{bid.freelancerName}</h3>
                      <p className="text-gray-600 text-sm">Submitted on {bid.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#212121] mb-1">
                        ${bid.price.toLocaleString()}
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        bid.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : bid.status === 'hired'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{bid.message}</p>

                  {isOwner && bid.status === 'pending' && gig.status === 'open' && (
                    <button
                      onClick={() => handleHireBid(bid.id)}
                      className="bg-[#212121] text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                      Hire This Freelancer
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}