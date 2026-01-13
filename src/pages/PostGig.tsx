import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGigs } from '../context/GigContext'
import { toast } from 'react-toastify'
// import { useAuth } from '../provider/auth'

export default function PostGig() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // const { user } = useAuth()
  const { addGig } = useGigs()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !description.trim() || !budget) {
      setError('Please fill in all fields')
      return
    }

    const budgetNum = parseFloat(budget)
    if (isNaN(budgetNum) || budgetNum <= 0) {
      setError('Please enter a valid budget amount')
      return
    }

    setLoading(true)

    try {
      addGig({
        title: title.trim(),
        description: description.trim(),
        budget: budgetNum,
      })

      navigate('/dashboard')
      toast.success("Gig created successfully")
    } catch (err) {
      setError('Failed to post gig ' + err)
      toast.error("Failed to create gig")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#212121] mb-6">Post a New Gig</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Gig Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a responsive website with React"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project requirements, deliverables, and any specific skills needed..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget (USD) *
            </label>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 1500"
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

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tips for a great gig post:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be specific about your requirements</li>
              <li>• Include expected deliverables and timeline</li>
              <li>• Set a realistic budget</li>
              <li>• Mention any preferred skills or experience</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#212121] text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#212121] focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Gig'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}