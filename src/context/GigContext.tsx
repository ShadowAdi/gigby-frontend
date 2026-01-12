/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Gig {
  id: string
  title: string
  description: string
  budget: number
  ownerId: string
  ownerName: string
  status: 'open' | 'assigned'
  createdAt: string
  bids: Bid[]
}

export interface Bid {
  id: string
  gigId: string
  freelancerId: string
  freelancerName: string
  message: string
  price: number
  status: 'pending' | 'hired' | 'rejected'
  createdAt: string
}

interface GigContextType {
  gigs: Gig[]
  addGig: (gig: Omit<Gig, 'id' | 'createdAt' | 'bids' | 'status'>) => void
  addBid: (gigId: string, bid: Omit<Bid, 'id' | 'createdAt' | 'status'>) => void
  hireBid: (gigId: string, bidId: string) => void
  searchGigs: (query: string) => Gig[]
  getGigById: (id: string) => Gig | undefined
  getUserGigs: (userId: string) => Gig[]
  getUserBids: (userId: string) => Bid[]
}

const GigContext = createContext<GigContextType | undefined>(undefined)

// Mock data
const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Build E-commerce Website',
    description: 'Need a full-stack e-commerce website with payment integration and admin panel.',
    budget: 2500,
    ownerId: '1',
    ownerName: 'John Doe',
    status: 'open',
    createdAt: '2024-01-10',
    bids: [
      {
        id: '1',
        gigId: '1',
        freelancerId: '2',
        freelancerName: 'Jane Smith',
        message: 'I have 5+ years of experience in e-commerce development. I can deliver this in 3 weeks.',
        price: 2200,
        status: 'pending',
        createdAt: '2024-01-11'
      }
    ]
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Looking for a creative designer to create modern UI/UX for our fintech mobile app.',
    budget: 1500,
    ownerId: '2',
    ownerName: 'Jane Smith',
    status: 'open',
    createdAt: '2024-01-12',
    bids: []
  },
  {
    id: '3',
    title: 'Content Writing for Blog',
    description: 'Need 20 SEO-optimized blog posts about technology trends and digital marketing.',
    budget: 800,
    ownerId: '1',
    ownerName: 'John Doe',
    status: 'open',
    createdAt: '2024-01-13',
    bids: []
  },
  {
    id: '4',
    title: 'Python Data Analysis Script',
    description: 'Build a Python script to analyze sales data and generate reports with visualizations.',
    budget: 600,
    ownerId: '2',
    ownerName: 'Jane Smith',
    status: 'assigned',
    createdAt: '2024-01-09',
    bids: [
      {
        id: '2',
        gigId: '4',
        freelancerId: '1',
        freelancerName: 'John Doe',
        message: 'I can complete this within 1 week. I have extensive Python and data analysis experience.',
        price: 550,
        status: 'hired',
        createdAt: '2024-01-10'
      }
    ]
  }
]

export function GigProvider({ children }: { children: ReactNode }) {
  const [gigs, setGigs] = useState<Gig[]>(mockGigs)

  const addGig = (newGig: Omit<Gig, 'id' | 'createdAt' | 'bids' | 'status'>) => {
    const gig: Gig = {
      ...newGig,
      id: Date.now().toString(),
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      bids: []
    }
    setGigs(prev => [gig, ...prev])
  }

  const addBid = (gigId: string, newBid: Omit<Bid, 'id' | 'createdAt' | 'status'>) => {
    const bid: Bid = {
      ...newBid,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setGigs(prev => prev.map(gig => 
      gig.id === gigId 
        ? { ...gig, bids: [...gig.bids, bid] }
        : gig
    ))
  }

  const hireBid = (gigId: string, bidId: string) => {
    setGigs(prev => prev.map(gig => 
      gig.id === gigId
        ? {
            ...gig,
            status: 'assigned',
            bids: gig.bids.map(bid => ({
              ...bid,
              status: bid.id === bidId ? 'hired' : 'rejected'
            }))
          }
        : gig
    ))
  }

  const searchGigs = (query: string): Gig[] => {
    if (!query.trim()) return gigs
    return gigs.filter(gig => 
      gig.title.toLowerCase().includes(query.toLowerCase()) ||
      gig.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getGigById = (id: string): Gig | undefined => {
    return gigs.find(gig => gig.id === id)
  }

  const getUserGigs = (userId: string): Gig[] => {
    return gigs.filter(gig => gig.ownerId === userId)
  }

  const getUserBids = (userId: string): Bid[] => {
    const userBids: Bid[] = []
    gigs.forEach(gig => {
      gig.bids.forEach(bid => {
        if (bid.freelancerId === userId) {
          userBids.push(bid)
        }
      })
    })
    return userBids
  }

  return (
    <GigContext.Provider value={{
      gigs,
      addGig,
      addBid,
      hireBid,
      searchGigs,
      getGigById,
      getUserGigs,
      getUserBids
    }}>
      {children}
    </GigContext.Provider>
  )
}

export function useGigs() {
  const context = useContext(GigContext)
  if (context === undefined) {
    throw new Error('useGigs must be used within a GigProvider')
  }
  return context
}