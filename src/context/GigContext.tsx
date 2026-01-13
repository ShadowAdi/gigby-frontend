/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { createGig, GetAllGigs } from '../services/gig.api';

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: {
    _id:string;
    name:string;
    email:string
  };
  status: "open" | "assigned";
  createdAt: string
}

export interface Bid {
  _id: string;
  gigId: string;
  freelancerId: string,
  message: string;
  status: "pending" | "hired" | "rejected"
  createdAt: string;
  price: number
}

interface GigContextType {
  gigs: Gig[]
  addGig: (gig: {
    title: string;
    description: string;
    budget: number;
  }) => void
  addBid: (gigId: string, bid: Omit<Bid, '_id' | 'createdAt' | 'status'>) => void
  hireBid: (gigId: string, bidId: string) => void
  searchGigs: (query: string) => Promise<Gig[]>
  getUserGigs: (userId: string) => Gig[]
  getUserBids: (userId: string) => Bid[]
}

const GigContext = createContext<GigContextType | undefined>(undefined)



export function GigProvider({ children }: { children: ReactNode }) {
  const [gigs, setGigs] = useState<Gig[]>([])

  const addGig = async (newGig: {
    title: string;
    description: string;
    budget: number;
  }) => {
    try {
      await createGig({ budget: newGig.budget, description: newGig.description, title: newGig.title })
    } catch (error) {
      console.error('Failed to create Gig:', error);
      throw error;
    }
  }

  const addBid = (gigId: string, newBid: Omit<Bid, '_id' | 'createdAt' | 'status'>) => {
    const bid: Bid = {
      ...newBid,
      _id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

  }

  const hireBid = (gigId: string, bidId: string) => {
    setGigs(prev => prev.map(gig =>
      gig._id === gigId
        ? {
          ...gig,
          status: 'assigned',
        }
        : gig
    ))
  }

  const searchGigs = async (query: string): Promise<Gig[]> => {
    try {
      const { gigs } = await GetAllGigs(query)
      return gigs
    } catch (error) {
      console.error('Failed to get all Gigs :', error);
      throw error;
    }

  }

  const getUserGigs = (userId: string): Gig[] => {
    return gigs.filter(gig => gig.ownerId === userId)
  }

  const getUserBids = (userId: string): Bid[] => {
    const userBids: Bid[] = []

    return userBids
  }

  return (
    <GigContext.Provider value={{
      gigs,
      addGig,
      addBid,
      hireBid,
      searchGigs,
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